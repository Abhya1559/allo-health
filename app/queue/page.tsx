"use client";

import { useEffect, useState } from "react";

interface QueueEntry {
  id: number;
  patient_name: string;
  queue_number: number;
  status: "waiting" | "with doctor" | "completed";
  priority?: boolean;
  updatedAt?: string;
}

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [formData, setFormData] = useState({ patient_name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(autoCompleteDoctorSessions, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/queue");
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      setError("Failed to fetch queue data.");
    } finally {
      setLoading(false);
    }
  };

  const addToQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    const queue_number = queue.length + 1;

    try {
      const res = await fetch("/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: formData.patient_name,
          queue_number,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setQueue((prev) => [...prev, result.queue]);
        setFormData({ patient_name: "" });
      } else {
        setError(result.error || "Error adding to queue");
      }
    } catch (err) {
      setError("Server error while adding to queue");
    }
  };

  const updateStatus = async (id: number, status: QueueEntry["status"]) => {
    try {
      const res = await fetch(`/api/queue/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (res.ok) {
        setQueue((prev) =>
          prev.map((entry) => (entry.id === id ? { ...entry, status } : entry))
        );
      } else {
        setError(result.error || "Error updating status");
      }
    } catch (err) {
      setError("Server error while updating status");
    }
  };

  const removeEntry = async (id: number) => {
    try {
      const res = await fetch(`/api/queue/serve/${id}`, { method: "DELETE" });
      if (res.ok) {
        setQueue((prev) => prev.filter((entry) => entry.id !== id));
      } else {
        const result = await res.json();
        setError(result.message || "Failed to delete entry");
      }
    } catch (err) {
      setError("Server error while removing patient");
    }
  };

  const autoCompleteDoctorSessions = async () => {
    const now = new Date();
    for (const entry of queue) {
      if (entry.status === "with doctor" && entry.updatedAt) {
        const updatedAt = new Date(entry.updatedAt);
        const diff = (now.getTime() - updatedAt.getTime()) / 1000 / 60; // in minutes
        if (diff >= 15) {
          await updateStatus(entry.id, "completed");
        }
      }
    }
  };

  const getStatusBadge = (status: QueueEntry["status"]) => {
    const base = "px-3 py-0.5 text-sm rounded-full font-semibold";
    switch (status) {
      case "waiting":
        return `${base} bg-yellow-100 text-yellow-800`;
      case "with doctor":
        return `${base} bg-blue-100 text-blue-800`;
      case "completed":
        return `${base} bg-green-100 text-green-800`;
    }
  };

  return (
    <div className="mt-15 min-h-screen bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          🩺 Patient Queue Management
        </h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md shadow-sm text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={addToQueue}
          className="flex gap-4 bg-white p-6 rounded-lg shadow-md"
        >
          <input
            type="text"
            placeholder="Enter patient name..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-purple-500"
            value={formData.patient_name}
            onChange={(e) => setFormData({ patient_name: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500 italic">Loading queue...</p>
        ) : (
          <div className="space-y-4">
            {queue.length === 0 ? (
              <p className="text-center text-gray-500 italic">
                No patients in the queue.
              </p>
            ) : (
              queue.map((entry) => (
                <div
                  key={entry.id}
                  className="flex justify-between items-center bg-white shadow-sm p-5 rounded-md hover:shadow-md transition"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      #{entry.queue_number} - {entry.patient_name}
                    </h4>
                    <p className={getStatusBadge(entry.status)}>
                      {entry.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {entry.status === "waiting" && (
                      <button
                        onClick={() => updateStatus(entry.id, "with doctor")}
                        className="text-blue-600 cursor-pointer hover:underline font-medium"
                      >
                        With Doctor
                      </button>
                    )}
                    {entry.status === "with doctor" && (
                      <button
                        onClick={() => updateStatus(entry.id, "completed")}
                        className="text-green-600 cursor-pointer hover:underline font-medium"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => removeEntry(entry.id)}
                      className="text-red-500 cursor-pointer hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
