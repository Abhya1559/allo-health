import Link from "next/link";
import { headerData } from "@/app/constants";
import { Button } from "./ui/button";
export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-purple-600">Allo Health </h1>
      <nav className="flex gap-5">
        {headerData.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 font-semibold hover:text-purple-600 transition"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <div>
        <Button
          variant={"link"}
          className=" text-md font-semibold cursor-pointer hover:text-purple-900"
        >
          Login
        </Button>
        <Button className="font-bold rounded-xl cursor-pointer bg-purple-700 hover:bg-purple-900">
          Sign up
        </Button>
      </div>
    </div>
  );
}
