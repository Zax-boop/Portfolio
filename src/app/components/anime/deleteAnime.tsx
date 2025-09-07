"use client";

import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import deleteAnime from "../../../../utils/anime/deleteAnime";
import { User } from "@supabase/supabase-js";
import supabase from "../../../../utils/general/supabaseclient";

export default function DeleteAnime({ id, rank }: { id: string; rank: number }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user || null);
        };

        getSession();
    }, []);
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteAnime(id, rank);
            setModalOpen(false);
        } catch (error) {
            console.log("Error deleting anime:", error);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };
    return (
        <div className="xs:hidden sm:block">
            <div
                onClick={() => setModalOpen(true)}
                className="hover:bg-red-400 transition duration-300 ease-in-out p-1 rounded-lg self-start"
            >
                <Trash2 />
            </div>
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-black w-full max-w-[30rem] p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <div className="flex flex-col w-full items-center gap-2">
                            <p className={`text-xl ${!user && `text-red-600`}`}>{!user ? `You are not authenticated and cannot delete this album!` : `Are you sure you want to delete this anime?`}</p>
                            <div className="flex flex-row gap-2">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-white hover:opacity-80 transition duration-300 ease-in-out px-2 py-1.5 rounded-lg text-black"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className={`bg-red-400 px-2 py-1.5 hover:opacity-80 transition duration-300 ease-in-out rounded-lg text-black flex items-center justify-center ${!user && `opacity-70`}`}
                                    disabled={loading || !user}
                                >
                                    {loading ? (
                                        <svg
                                            className="animate-spin h-5 w-5 text-black"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        "Delete"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
