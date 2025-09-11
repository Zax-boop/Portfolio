"use client"

import React, { useEffect, useState } from "react"
import Header from "../components/general/header"
import SignInForm from "../components/general/signIn"
import supabase from "../../../utils/general/supabaseclient"
import AddArt from "../components/art/addArt"
import { PlusIcon } from "lucide-react"
import { useMediaQuery } from "react-responsive";
import Loading from "../components/general/loading"
import { User } from "@supabase/supabase-js"

export default function Page() {
  type Art = {
    id: string
    created_at: string | null
    description: string | null
    image: string | undefined
    date_drawn: string | null
    gif: boolean | null
  }
  const isMobile = useMediaQuery({ query: '(max-width: 650px)' })
  const [art, setArt] = useState<Art[]>([])
  const [showAddArtModal, setShowAddArtModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();
  }, []);

  const fetchArt = async () => {
    const { data, error } = await supabase
      .from("art")
      .select("*")
      .order("date_drawn", { ascending: false })
    if (!error && data) setArt(data)
  }

  useEffect(() => {
    fetchArt()
    setLoading(false)
  }, [])

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col w-full min-h-screen items-center">
      <Header />
      <SignInForm />
      <div className="xs:mt-6 md:mt-12 flex flex-col items-center text-center xs:w-11/12 md:w-4/5">
        <h1 className="xs:text-2xl md:text-4xl font-bold xs:mb-2 md:mb-4">Art Gallery</h1>
        <p className="text-gray-400 xs:mb-2 md:mb-6 md:w-[32rem] xs:text-sm md:text-base">
          Welcome to my art gallery! I love looking at art and creating my own amateur drawings and pixel art. Here&apos;s a collection of some of my best (and some suspicious) pieces that I&apos;ve created over the years.
        </p>
        {(!isMobile && user) && (
          <div className="w-full flex justify-end">
            <button
              onClick={() => setShowAddArtModal(true)}
              className="flex items-center gap-2 pl-3 mr-2 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer"
            >
              Add Art
              <PlusIcon className="w-5 h-5 mr-2" />
            </button>
          </div>
        )}
        {showAddArtModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md relative">
              <button
                onClick={() => setShowAddArtModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <AddArt
                onUpload={() => {
                  fetchArt()
                  setShowAddArtModal(false)
                }}
              />
            </div>
          </div>
        )}
        {art.length > 0 ? (
          <div className="xs:mt-2 md:mt-6 w-full">
            {Object.entries(
              art
                .sort((a, b) => {
                  const dateA = a.date_drawn ? new Date(a.date_drawn).getTime() : 0
                  const dateB = b.date_drawn ? new Date(b.date_drawn).getTime() : 0
                  return dateB - dateA
                })
                .reduce((acc: Record<string, typeof art>, piece) => {
                  if (!piece.date_drawn) return acc
                  const monthKey = piece.date_drawn.slice(0, 7)
                  if (!acc[monthKey]) acc[monthKey] = []
                  acc[monthKey].push(piece)
                  return acc
                }, {})
            ).map(([monthKey, pieces]) => (
              <div key={monthKey} className="xs:mb-4 md:mb-8">
                <h2 className="xs:text-xl md:text-2xl font-bold text-left mb-4 pl-2 text-white">
                  {(() => {
                    const [yearStr, monthStr] = monthKey.split("-")
                    const year = parseInt(yearStr, 10)
                    const monthIndex = parseInt(monthStr, 10) - 1
                    return `${monthNames[monthIndex]} ${year}`
                  })()}
                </h2>
                <div className="xs:p-2 xs:gap-2 xs:space-y-2 sm:p-4 xs:columns-3 sm:columns-4 sm:gap-4 sm:space-y-4">
                  {pieces.map((piece) => (
                    <div key={piece.id} className="break-inside-avoid flex flex-col items-center mb-4 hover:scale-[1.02] transition-transform duration-300">
                      <img
                        src={piece.image}
                        alt={piece.description || "Art"}
                        className={`w-full h-auto object-cover rounded-xl shadow-md ${piece.gif ? "border border-purple-200" : ""}`}
                      />
                      {piece.date_drawn && (
                        <p className="text-gray-400 text-sm mt-1">
                          {piece.date_drawn.slice(0, 10)}
                        </p>
                      )}
                      {/* {piece.description && (
                        <p className="text-white mt-1 text-center">{piece.description}</p>
                      )} */}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading art...</p>
        )}

      </div>
    </div>
  )
}
