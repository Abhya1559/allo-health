import Image from "next/image";

export default function Hero() {
  return (
    <div className="mt-20 mx-auto px-4 ">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-16 md:gap-36">
        <div className="flex-1 space-y-4 text-left">
          <span className="inline-block bg-amber-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            India's #1 sexual health provider
          </span>
          <div className="text-left">
            <h1 className="text-xl tracking-tighter md:text-5xl font-bold text-gray-900">
              Reception Management System for{" "}
              <span className="text-purple-700">Allo Healthcare</span>
            </h1>
          </div>
          <p className="text-gray-600 text-pretty">
            Hospitals have complex security and operational needs. Hospital
            premises serve hundreds and thousands of patients and their visitors
            every day. Managing these visitors and patients at the reception
            area with the paper-based system is tedious and nonsecure. The
            reception management is one way to manage these visitors in the
            reception area. With technological advancement, reception management
            systems enable a contactless visitor check-in experience by
            replacing paper logbooks. This hospital reception software makes
            managing visitor check-ins easy and secure for Hospitals.
          </p>

          <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 cursor-pointer transition">
            Get Started
          </button>
        </div>
        <div className="w-full md:w-auto">
          <Image
            className="rounded-xl w-full h-auto"
            src="/img.jpg"
            alt="Hero Image"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>
    </div>
  );
}
