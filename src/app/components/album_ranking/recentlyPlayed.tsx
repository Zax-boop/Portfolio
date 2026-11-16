"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import SpotifyTopItems from "./spotifyTopItems";

interface RecentTrack {
  id: string;
  name: string;
  artists: string;
  album: string;
  image: string;
  url: string;
  playedAt: string;
}

type TrackState =
  | { status: "loading" }
  | { status: "ready"; tracks: RecentTrack[] }
  | { status: "not_configured" }
  | { status: "error" };

export default function RecentlyPlayed() {
  const [trackState, setTrackState] = useState<TrackState>({ status: "loading" });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const loadTracks = async () => {
      try {
        const response = await fetch("/api/spotify/recently-played", { cache: "no-store" });
        const data = await response.json();

        if (!active) return;
        if (response.status === 503 && data.error === "not_configured") {
          setTrackState({ status: "not_configured" });
        } else if (!response.ok || !Array.isArray(data.tracks)) {
          setTrackState({ status: "error" });
        } else {
          setTrackState({ status: "ready", tracks: data.tracks });
        }
      } catch {
        if (active) setTrackState({ status: "error" });
      }
    };

    loadTracks();
    const intervalId = setInterval(loadTracks, 60_000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      className={`spotify-ambient ml-auto mt-4 mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition-[width] duration-500 ease-in-out ${
        isOpen ? "w-full" : "w-[min(100%,20rem)]"
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="spotify-favorites-panel"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex w-full items-center text-left transition-colors hover:bg-white/[0.06] ${
          isOpen ? "gap-3 p-3 sm:p-4" : "gap-2 p-2"
        }`}
      >
        {trackState.status === "ready" && trackState.tracks[0]?.image ? (
          <Image
            src={trackState.tracks[0].image}
            alt=""
            width={isOpen ? 48 : 32}
            height={isOpen ? 48 : 32}
            className={`${isOpen ? "h-12 w-12" : "h-8 w-8"} shrink-0 rounded object-cover`}
          />
        ) : (
          <Image
            src="/spotify.png"
            alt=""
            width={isOpen ? 28 : 20}
            height={isOpen ? 28 : 20}
            className="mx-1 shrink-0"
          />
        )}

        {trackState.status === "ready" && trackState.tracks[0] ? (
          <span className="flex min-w-0 flex-1 items-center">
            <span className="min-w-0 flex-1">
              <span className={`block truncate font-medium ${isOpen ? "" : "text-sm"}`}>
                {trackState.tracks[0].name}
              </span>
              <span className="block truncate text-xs text-white/60">
                {trackState.tracks[0].artists}
              </span>
            </span>
            <span className="spotify-equalizer ml-3 shrink-0" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </span>
        ) : (
          <span className="flex-1 text-sm text-white/60">
            {trackState.status === "loading" && "Loading your latest listen…"}
            {trackState.status === "not_configured" && "Spotify isn’t connected"}
            {trackState.status === "error" && "Latest listen unavailable"}
            {trackState.status === "ready" && "No recent Spotify plays"}
          </span>
        )}

        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id="spotify-favorites-panel"
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {isOpen && (
            <div className="border-t border-white/10 p-3 sm:p-4">
              {trackState.status === "not_configured" && (
                <p className="mb-3 text-sm text-white/60">
                  Spotify isn&apos;t connected yet.{" "}
                  <a className="underline underline-offset-4 hover:text-white" href="/api/spotify/auth">
                    Set it up
                  </a>
                </p>
              )}
              <SpotifyTopItems />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
