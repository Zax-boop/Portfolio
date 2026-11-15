"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
    <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5" aria-labelledby="recently-played-heading">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 id="recently-played-heading" className="text-xl font-semibold sm:text-2xl">
            Recently played
          </h2>
          <p className="mt-1 text-sm text-white/60">A snapshot of what I&apos;ve been listening to</p>
        </div>
        <Image src="/spotify.png" alt="Spotify" width={28} height={28} />
      </div>

      {trackState.status === "loading" && (
        <p className="text-sm text-white/60" role="status">Loading recent tracks…</p>
      )}

      {trackState.status === "not_configured" && (
        <p className="text-sm text-white/60">
          Spotify isn&apos;t connected yet.{" "}
          <a className="underline underline-offset-4 hover:text-white" href="/api/spotify/auth">
            Set it up
          </a>
        </p>
      )}

      {trackState.status === "error" && (
        <p className="text-sm text-white/60" role="status">
          Recent tracks are temporarily unavailable.
        </p>
      )}

      {trackState.status === "ready" && trackState.tracks.length === 0 && (
        <p className="text-sm text-white/60">No recent Spotify plays to show.</p>
      )}

      {trackState.status === "ready" && trackState.tracks.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trackState.tracks.map((track) => (
            <li key={`${track.id}-${track.playedAt}`}>
              <a
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10"
              >
                {track.image ? (
                  <Image
                    src={track.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded bg-white/10" aria-hidden="true" />
                )}
                <span className="min-w-0">
                  <span className="block truncate font-medium">{track.name}</span>
                  <span className="block truncate text-xs text-white/60">{track.artists}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
