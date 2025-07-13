"use client";

import { useEffect, useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  gender: string;
  location: string;
  available_time: string;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    gender: "",
    location: "",
    available_time: "",
  });

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      setError("Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDoctors();
  }, []);

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Add failed");

      await fetchDoctors();
      setFormData({
        name: "",
        specialization: "",
        gender: "",
        location: "",
        available_time: "",
      });
      setShowAddForm(false);
    } catch (err) {
      alert("Failed to add doctor");
    }
  };

  const handleEditDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;

    try {
      const res = await fetch(`/api/doctors/${editingDoctor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Edit failed");

      await fetchDoctors();
      setEditingDoctor(null);
      setFormData({
        name: "",
        specialization: "",
        gender: "",
        location: "",
        available_time: "",
      });
    } catch (err) {
      alert("Failed to update doctor");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/doctors/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      await fetchDoctors();
    } catch (err) {
      alert("Failed to delete doctor");
    }
  };

  const startEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      gender: doctor.gender,
      location: doctor.location,
      available_time: doctor.available_time,
    });
  };

  return (
    <div className="mt-15 min-h-screen bg-gray-50 py-10 px-6 sm:px-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-3xl font-bold text-purple-800">
          Doctors Directory
        </h2>

        {loading && <p>Loading doctors...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
            All Doctors
          </h3>
          {doctors.length === 0 ? (
            <p className="text-gray-500 italic">No doctors available.</p>
          ) : (
            <ul className="divide-y">
              {doctors.map((doc) => (
                <li
                  key={doc.id}
                  className="py-3 flex justify-between items-center hover:bg-gray-50 px-2 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <p className="text-sm text-gray-500">
                      {doc.specialization} • {doc.gender} • {doc.location} •{" "}
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                        {doc.available_time}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => startEdit(doc)}
                      className="text-purple-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add Button */}
        {!showAddForm && !editingDoctor && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow-sm"
          >
            + Add Doctor
          </button>
        )}

        {/* Add Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddDoctor}
            className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-700">Add Doctor</h3>
            {["name", "specialization", "gender", "location"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="w-full px-4 py-2 border rounded-md"
                value={(formData as any)[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
              />
            ))}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Available Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.available_time}
                onChange={(e) =>
                  setFormData({ ...formData, available_time: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Edit Form */}
        {editingDoctor && (
          <form
            onSubmit={handleEditDoctor}
            className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              Edit Doctor #{editingDoctor.id}
            </h3>
            {["name", "specialization", "gender", "location"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field[0].toUpperCase() + field.slice(1)}
                className="w-full px-4 py-2 border rounded-md"
                value={(formData as any)[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
              />
            ))}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Available Time
              </label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-md"
                value={formData.available_time}
                onChange={(e) =>
                  setFormData({ ...formData, available_time: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingDoctor(null);
                  setFormData({
                    name: "",
                    specialization: "",
                    gender: "",
                    location: "",
                    available_time: "",
                  });
                }}
                className="text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
