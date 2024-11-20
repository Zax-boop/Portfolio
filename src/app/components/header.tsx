"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
const Header = () => {
    const pathname = usePathname()
    return <header className={`flex flex-row justify-between items-center mt-4 xs:w-[90%] sm:w-4/5 border-[0.5px] border-[#333] py-2 sm:py-3 xs:px-3 sm:px-6 rounded-full ${pathname === "/" && `animate-borderTransition`} hover:border-white/[0.3] transition-all duration-500 ease-in`}>
    <Link href={"/"} className="font-semibold xs:text-md sm:text-xl">RA</Link>
    <div className="flex flex-row gap-2 sm:gap-[1rem]">
      <Link href={"/album_ranking"} className="relative group">
        <p className="font-semibold xs:text-[0.5rem] sm:text-base">Albums</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/anime"} className="relative group">
        <p className="font-semibold xs:text-[0.5rem] sm:text-base">Anime</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/books"} className="relative group">
        <p className="font-semibold xs:text-[0.5rem] sm:text-base">Books</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/climbing"} className="relative group">
        <p className="font-semibold xs:text-[0.5rem] sm:text-base">Climbing</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/tv"} className="relative group">
        <p className="font-semibold xs:text-[0.5rem] sm:text-base">TV Shows</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/games"} className="relative group">
        <p className="font-semibold xs:text-[0.5rem] sm:text-base">Video Games</p>
        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
    </div>
  </header>;
}

export default Header;