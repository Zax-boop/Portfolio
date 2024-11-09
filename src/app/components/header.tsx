"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
    const pathname = usePathname()
    return <header className={`flex flex-row justify-between mt-4 w-4/5 border-[0.5px] border-[#333] py-3 px-6 rounded-full ${pathname === "/" && `animate-borderTransition`} hover:border-white/[0.3] transition-all duration-500 ease-in`}>
    <Link href={"/"} className="font-semibold text-xl">RA</Link>
    <div className="flex flex-row gap-[2rem]">
      <Link href={"/experience"} className="relative group">
        <p className="font-semibold">Work Experience</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <div className="relative group">
        <p className="font-semibold">Projects</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </div>
      <div className="relative group">
        <p className="font-semibold">Extracurriculars</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </div>
      <div className="relative group">
        <p className="font-semibold">Contact Me</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </div>
    </div>
  </header>;
}

export default Header;