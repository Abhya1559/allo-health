import { ShieldCheck, Users, ClipboardList } from "lucide-react";

const features = [
  {
    title: "Secure Check-ins",
    description:
      "Replace insecure paper logs with a secure digital system to track visitor and patient entries.",
    icon: <ShieldCheck className="text-purple-600 w-8 h-8" />,
  },
  {
    title: "Real-Time Visitor Management",
    description:
      "Track, approve, and monitor all hospital visitors in real time from a centralized dashboard.",
    icon: <Users className="text-purple-600 w-8 h-8" />,
  },
  {
    title: "Contactless Experience",
    description:
      "Enable QR-based or OTP-based contactless check-in to reduce queues and enhance safety.",
    icon: <ClipboardList className="text-purple-600 w-8 h-8" />,
  },
];

export default function Features() {
  return (
    <section className="px-6 py-20 sm:px-12 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Key Features
        </h2>
        <p className="text-gray-600 mb-12">
          Simplifying reception workflows and enhancing visitor experience.
        </p>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
