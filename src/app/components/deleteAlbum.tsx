"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import deleteAlbum from "../../../utils/deleteAlbum";

export default function DeleteAlbum({ id, Rank }: { id: any; Rank: any }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await deleteAlbum(id, Rank);
            console.log(result); 
            setModalOpen(false); 
        } catch (error) {
            console.error("Error deleting album:", error);
        } finally {
            setLoading(false); 
            window.location.reload(); 
        }
    };
    return (
        <div>
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
                            <p className="text-xl">Are you sure you want to delete this album?</p>
                            <div className="flex flex-row gap-2">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-white hover:opacity-80 transition duration-300 ease-in-out px-2 py-1.5 rounded-lg text-black"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-red-400 px-2 py-1.5 hover:opacity-80 transition duration-300 ease-in-out rounded-lg text-black flex items-center justify-center"
                                    disabled={loading} 
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
                                        "Yes"
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