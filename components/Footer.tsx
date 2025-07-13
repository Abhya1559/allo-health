export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-[1320px] mx-auto">
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold text-purple-600">
              Allo Health care
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Empowering individuals to take charge of their sexual health with
              trusted care and technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              Email:{" "}
              <a
                href="mailto:support@allohealth.in"
                className="text-purple-600 hover:underline"
              >
                support@allohealth.in
              </a>
              <br />
              Phone: <span className="text-gray-700">+91 98765 43210</span>
              <br />
              Address: Bengaluru, India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Allo Health. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
