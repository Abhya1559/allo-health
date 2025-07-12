"use client";

import { useEffect, useState } from "react";

interface Doctor {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  patientName: string;
  doctor: Doctor;
  time_slot: string;
  status: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorId: "",
    time_slot: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/appointment");
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isConflict = appointments.some(
        (apt) =>
          apt.doctor.id === parseInt(formData.doctorId) &&
          new Date(apt.time_slot).toISOString() ===
            new Date(formData.time_slot).toISOString()
      );

      if (isConflict) {
        setErrorMessage("This doctor already has an appointment at that time.");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      if (editingId !== null) {
        const res = await fetch(`/api/appointment/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientName: formData.patientName,
            doctorId: parseInt(formData.doctorId),
            time_slot: formData.time_slot,
          }),
        });

        if (!res.ok) throw new Error("Failed to update appointment");

        setSuccessMessage("Appointment updated successfully.");
        setEditingId(null);
      } else {
        const res = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientName: formData.patientName,
            doctorId: parseInt(formData.doctorId),
            time_slot: formData.time_slot,
          }),
        });

        const result = await res.json();

        if (res.status === 201) {
          setAppointments((prev) => [...prev, result.appointment]);
          setSuccessMessage("Appointment booked successfully.");
        } else {
          throw new Error(result.error);
        }
      }

      setFormData({ patientName: "", doctorId: "", time_slot: "" });
      setTimeout(() => setSuccessMessage(""), 3000);
      fetchAppointments();
    } catch (error: any) {
      setErrorMessage(error.message || "Error booking appointment");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const startEdit = (apt: Appointment) => {
    setEditingId(apt.id);
    setFormData({
      patientName: apt.patientName,
      doctorId: apt.doctor.id.toString(),
      time_slot: apt.time_slot.slice(0, 16),
    });
    setSuccessMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ patientName: "", doctorId: "", time_slot: "" });
    setSuccessMessage("");
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/appointment/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete appointment");
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
      setSuccessMessage("Appointment deleted successfully.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setErrorMessage("Error deleting appointment");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="mt-15  min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 py-12 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-purple-800 text-center">
          All Appointments
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 animate-pulse">
            Loading appointments...
          </div>
        ) : (
          <>
            {successMessage && (
              <div className="bg-green-100 text-green-800 p-3 rounded-md shadow-sm text-center">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md shadow-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-700 border-b pb-3">
                Scheduled Appointments
              </h3>
              {appointments.length === 0 ? (
                <p className="text-gray-500 italic">No appointments yet.</p>
              ) : (
                <ul className="divide-y">
                  {appointments.map((apt) => (
                    <li
                      key={apt.id}
                      className="py-4 flex justify-between items-center hover:bg-gray-50 px-3 rounded transition duration-150"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {apt.patientName}{" "}
                          <span className="text-sm text-gray-500">with</span>{" "}
                          {apt.doctor.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          📅{" "}
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                            {new Date(apt.time_slot).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => startEdit(apt)}
                          className="text-indigo-600 cursor-pointer hover:underline font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="text-red-600 cursor-pointer hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-xl rounded-xl p-6 space-y-5 max-w-lg mx-auto"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {editingId
                  ? `Edit Appointment #${editingId}`
                  : "Book Appointment"}
              </h3>

              <input
                type="text"
                placeholder="Patient Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
                value={formData.patientName}
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
                required
              />

              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
                value={formData.doctorId}
                onChange={(e) =>
                  setFormData({ ...formData, doctorId: e.target.value })
                }
                required
              >
                <option value="" disabled>
                  Select Doctor
                </option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-col space-y-2">
                <label className="text-sm text-gray-700 font-medium">
                  Appointment Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-purple-500"
                  value={formData.time_slot}
                  onChange={(e) =>
                    setFormData({ ...formData, time_slot: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  type="submit"
                  className="bg-purple-600 cursor-pointer text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
                >
                  {editingId ? "Update Appointment" : "Book Appointment"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-gray-500 cursor-pointer hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
