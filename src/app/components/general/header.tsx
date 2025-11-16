"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname()
  return <header className={`flex flex-row justify-between items-center mt-4 xs:w-[90%] sm:w-4/5 border-[0.5px] border-[#333] py-2 sm:py-3 xs:px-3 sm:px-6 rounded-full ${pathname === "/" && `animate-borderTransition`} hover:border-white/[0.3] transition-all duration-500 ease-in`}>
    <Link href={"/"} className="font-semibold xs:text-md sm:text-xl p-1 rounded-md hover:bg-white hover:text-black transition-all ease-in-out duration-300">RA</Link>
    <div className="flex flex-row gap-2 sm:gap-[1rem]">
      <Link href={"/album_ranking"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">Albums</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/anime"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">Anime</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/art"} className="relative group">
        <div className="flex flex-row gap-1 items-center">
          <p className="font-semibold xs:text-[0.45rem] sm:text-base">Art</p>
          <img src={"./shroom.gif"} className="xs:w-2 md:w-4" alt="gif"/>
        </div>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/books"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">Books</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/movies"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">Movies</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/sports"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">Sports</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/tv"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">TV Shows</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
      <Link href={"/games"} className="relative group">
        <p className="font-semibold xs:text-[0.45rem] sm:text-base">Video Games</p>
        <span className="absolute xs:-bottom-[0.1rem] sm:-bottom-1 left-0 w-0 xs:h-[0.1rem] sm:h-1 bg-white transition-all group-hover:w-full"></span>
      </Link>
    </div>
  </header>;
}

export default Header;