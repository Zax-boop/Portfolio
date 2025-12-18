'use client'
import React, { useState, useEffect, useMemo } from 'react'
import AddScrap from '../components/scrapbook/addScrap'
import Header from '../components/general/header'
import { PlusIcon } from "lucide-react"
import { useMediaQuery } from "react-responsive";
import supabase from '../../../utils/general/supabaseclient'
import Loading from '../components/general/loading'
import PoppingLetters from '../components/general/poppingLetters'
import Image from 'next/image'
import VideoWithPlaceholder from '../components/general/placeholderVideo'

type Scrap = {
    id: string
    created_at: string | null
    description: string | null
    file_path: string | undefined
    source: string | null
    date: string | null
}

export default function Scrapbook() {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const [showAddScrapModal, setShowAddScrapModal] = useState(false)
    const [scrap, setScrap] = useState<Scrap[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

    const fetchAllScrapAndAlbums = async () => {
        const { data: scrapData, error: scrapError } = await supabase
            .from("scrapbook")
            .select("*")
            .order("date", { ascending: false });

        const { data: albumData, error: albumError } = await supabase
            .from("album_rankings")
            .select("*")
            .gte("created_at", "2025-02-01")
            .order("created_at", { ascending: false });

        const { data: animeData, error: animeError } = await supabase
            .from("anime_rankings")
            .select("*")
            .gte("created_at", "2025-02-01")
            .order("created_at", { ascending: false });

        const { data: artData, error: artError } = await supabase
            .from("art")
            .select("*")
            .gte("date_drawn", "2025-02-01")
            .order("created_at", { ascending: false });

        const { data: bookData, error: bookError } = await supabase
            .from("books_list")
            .select("*")
            .gte("created_at", "2025-02-01")
            .order("created_at", { ascending: false });

        const { data: climbingFiles, error: climbingError } = await supabase
            .storage
            .from("climbing")
            .list("", {
                sortBy: { column: "created_at", order: "desc" },
            });

        const { data: tvFiles, error: tvError } = await supabase
            .from("tv_rankings")
            .select("*")
            .gte("created_at", "2025-02-01")
            .order("created_at", { ascending: false });

        const { data: gameData, error: gameError } = await supabase
            .from("video_game_rankings")
            .select("*")
            .gte("created_at", "2025-02-01")
            .order("created_at", { ascending: false });

        if (scrapError || albumError || animeError || artError || bookError || climbingError || tvError || gameError) {
            console.error("Fetch error:", scrapError || albumError || animeError || artError || bookError || climbingError || tvError || gameError);
            return;
        }

        const normalizedAlbums: Scrap[] = (albumData || []).map((album) => {
            const dateOnly = album.created_at?.split("T")[0] ?? null;
            return {
                id: album.id,
                created_at: dateOnly,
                description: `Rank ${album.Rank}\n${album.name}\n${album.artist}\n${album.comment ?? ""}`,
                file_path: album.image,
                date: dateOnly,
                source: "album"
            };
        });

        const normalizedAnime: Scrap[] = (animeData || []).map((anime) => {
            const dateOnly = anime.created_at?.split("T")[0] ?? null;
            return {
                id: anime.id,
                created_at: dateOnly,
                description: `Rank ${anime.rank}\n${anime.name}\n${anime.studio}\n${anime.comments ?? ""}`,
                file_path: anime.image,
                date: dateOnly,
                source: "anime"
            };
        });

        const normalizedArt: Scrap[] = (artData || []).map((art) => {
            const dateOnly = art.date_drawn?.split("T")[0] ?? null;
            return {
                id: art.id,
                created_at: dateOnly,
                description: ``,
                file_path: art.image,
                date: dateOnly,
                source: "art"
            };
        });

        const normalizedBooks: Scrap[] = (bookData || []).map((book) => {
            const dateOnly = book.created_at?.split("T")[0] ?? null;
            return {
                id: book.id,
                created_at: dateOnly,
                description: `${book.name}\n${book.author}\n${book.comments ?? ""}`,
                file_path: book.image,
                date: dateOnly,
                source: "book"
            };
        });

        const filteredFiles = (climbingFiles || []).filter((file) => {
            if (!file.created_at) return false;
            const fileDate = new Date(file.created_at);
            const cutoff = new Date("2025-02-01");
            return fileDate >= cutoff;
        });

        const climbingMedia: Scrap[] = (filteredFiles || []).map((file) => ({
            id: file.id || file.name,
            created_at: file.created_at || null,
            date: file.created_at ? file.created_at.split("T")[0] : null,
            file_path: supabase.storage.from("climbing").getPublicUrl(file.name).data.publicUrl,
            description: ``,
            source: "sports"
        }));

        const normalizedTv: Scrap[] = (tvFiles || []).map((tv) => {
            const dateOnly = tv.created_at?.split("T")[0] ?? null;
            return {
                id: tv.id,
                created_at: dateOnly,
                description: `Rank ${tv.rank}\n${tv.name}\n${tv.director}\n${tv.comments ?? ""}`,
                file_path: tv.image,
                date: dateOnly,
                source: "tv"
            };
        });

        const normalizedGames: Scrap[] = (gameData || []).map((game) => {
            const dateOnly = game.created_at?.split("T")[0] ?? null;
            return {
                id: game.id,
                created_at: dateOnly,
                description: `Rank ${game.rank}\n${game.name}\n${game.studio}\n${game.comments ?? ""}`,
                file_path: game.image,
                date: dateOnly,
                source: "game"
            };
        });

        const combined = [...(scrapData ?? []), ...normalizedAlbums, ...normalizedAnime, ...normalizedArt, ...normalizedBooks, ...climbingMedia, ...normalizedTv, ...normalizedGames];

        combined.sort((a, b) => {
            const da = a.date ? new Date(a.date).getTime() : 0;
            const db = b.date ? new Date(b.date).getTime() : 0;
            return db - da;
        });

        setScrap(combined);
    };


    useEffect(() => {
        fetchAllScrapAndAlbums()
        setLoading(false)
    }, [])

    const uniqueMonths = Array.from(
        new Set(
            scrap
                .filter((row): row is Scrap & { date: string } => !!row.date)
                .map((row) => {
                    const [year, month] = row.date!.split("-");
                    const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                        new Date(Number(year), Number(month) - 1)
                    );
                    return `${monthName} ${year}`;
                })
        )
    );

    uniqueMonths.sort((a, b) => {
        const [monthA, yearA] = a.split(" ");
        const [monthB, yearB] = b.split(" ");
        const monthMap: Record<string, number> = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        const dateA = new Date(Number(yearA), monthMap[monthA]);
        const dateB = new Date(Number(yearB), monthMap[monthB]);
        return dateB.getTime() - dateA.getTime();
    });

    const getMonthYear = (dateStr: string) => {
        const [year, month] = dateStr.split("-"); // YYYY-MM-DD or YYYY-MM
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            new Date(Number(year), Number(month) - 1)
        );
        return `${monthName} ${year}`;
    };

    const imagesToShow = useMemo(() => {
        if (!selectedMonth) return [];
        return scrap.filter(
            (row) =>
                row.file_path &&
                row.date &&
                getMonthYear(row.date) === selectedMonth
        );
    }, [selectedMonth, scrap]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col w-full min-h-screen items-center">
            <Header />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] xs:mt-4 sm:mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className="w-1/3 h-full">
                        <div className="w-full flex flex-row h-1/2">
                            <img src="/climbing_ex.jpg" alt="alucard" className="w-1/2 h-full object-cover" />
                            <img src="/hk.gif" alt="hk" className="w-1/2 h-full object-cover" />
                        </div>
                        <div className="w-full h-1/2">
                            <video src="/cb.mp4"
                                autoPlay
                                loop
                                muted
                                controls={false}
                                playsInline
                                className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="w-1/3 h-full">
                        <img src="/collage.jpeg" alt="Collage" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/3 h-full">
                        <div className="w-full h-1/2">
                            <video src="/cloud_mp4.mp4"
                                autoPlay
                                loop
                                muted
                                controls={false}
                                playsInline
                                className="w-full h-full object-cover" />
                        </div>
                        <div className="w-full flex flex-row h-1/2">
                            <img src="/climbing_alt.jpg" alt="Dash Face" className="w-1/2 h-full object-cover" />
                            <img src="/sos_event.jpg" alt="Fuu" className="w-1/2 h-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <PoppingLetters
                    text="Scrapbook"
                    className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-20 text-center"
                />
            </div>            <div className="xs:mt-6 md:mt-12 flex flex-col items-center text-center xs:w-11/12 md:w-4/5">
                {(!isMobile) && (
                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => setShowAddScrapModal(true)}
                            className="flex items-center gap-2 pl-3 mr-2 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                        >
                            Add Scrap
                            <PlusIcon className="w-5 h-5 mr-2" />
                        </button>
                    </div>
                )}
                {showAddScrapModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative">
                            <button
                                onClick={() => setShowAddScrapModal(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                            <AddScrap
                                onUpload={() => {
                                    fetchAllScrapAndAlbums()
                                    setShowAddScrapModal(false)
                                }}
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                    {[...uniqueMonths].reverse().map((month) => (
                        <button
                            key={month}
                            className={`px-3 py-1 rounded-md ${month === selectedMonth ? "bg-blue-600" : "bg-gray-800"
                                } text-white`}
                            onClick={() => setSelectedMonth(month)}
                        >
                            {month}
                        </button>
                    ))}
                </div>
                <div className="xs:p-2 xs:gap-2 xs:space-y-2 sm:p-4 xs:columns-2 sm:columns-4 sm:gap-4 sm:space-y-4">
                    {[...imagesToShow].reverse().map((row, index) => {
                        const filePath = row.file_path;
                        if (!filePath) return null;

                        const isVideo = filePath.toLowerCase().endsWith(".mp4");

                        const key = `${row.source}-${row.id}`;

                        return (
                            <div
                                key={key}
                                className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-500 ease-out transform hover:scale-105"
                                style={{
                                    opacity: 0,
                                    animation: `fadeIn 0.5s forwards`,
                                    animationDelay: `${index * 150}ms`,
                                }}
                            >
                                <div className="relative group">
                                    {!isVideo ? (
                                        <Image
                                            src={filePath}
                                            alt={row.description || "Scrap media"}
                                            width={500}
                                            height={500}
                                            layout="responsive"
                                            objectFit="cover"
                                            className="rounded-lg cursor-pointer"
                                        />
                                    ) : (
                                        <button className="w-full h-full p-0 border-0 bg-transparent">
                                            <VideoWithPlaceholder
                                                aspect="aspect-[9/19.5]"
                                                src={filePath}
                                                className="rounded-lg w-full h-full object-cover pointer-events-none cursor-pointer"
                                            />
                                        </button>
                                    )}
                                    <div className="
                                        absolute inset-0 
                                        bg-black/0 
                                        group-hover:bg-black/60 
                                        transition-all 
                                        duration-300 
                                        flex 
                                        items-center 
                                        justify-center 
                                        text-center
                                        opacity-0 
                                        group-hover:opacity-100
                                        rounded-lg
                                        p-4
                                    ">
                                        <div className="overflow-y-auto max-h-full text-white text-sm p-2">
                                            {row.date && <p>{row.date}</p>}
                                            {row.description && <p className="font-medium whitespace-pre-line">{row.description}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
