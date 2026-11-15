"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ItemType = "artists" | "tracks";
type TimeRange = "short_term" | "medium_term" | "long_term";

interface TopItem {
  id: string;
  name: string;
  details: string;
  image: string;
  url: string;
}

type ItemsState =
  | { status: "loading" }
  | { status: "ready"; items: TopItem[] }
  | { status: "not_configured" }
  | { status: "needs_reauthorization" }
  | { status: "error" };

const timeRanges: Array<{ value: TimeRange; label: string }> = [
  { value: "short_term", label: "About 4 weeks" },
  { value: "medium_term", label: "About 6 months" },
  { value: "long_term", label: "About 1 year" },
];

export default function SpotifyTopItems() {
  const [type, setType] = useState<ItemType>("tracks");
  const [timeRange, setTimeRange] = useState<TimeRange>("medium_term");
  const [itemsState, setItemsState] = useState<ItemsState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      setItemsState({ status: "loading" });
      try {
        const query = new URLSearchParams({ type, time_range: timeRange });
        const response = await fetch(`/api/spotify/top-items?${query}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();

        if (response.status === 503 && data.error === "not_configured") {
          setItemsState({ status: "not_configured" });
        } else if (response.status === 403 && data.error === "spotify_scope_missing") {
          setItemsState({ status: "needs_reauthorization" });
        } else if (!response.ok || !Array.isArray(data.items)) {
          setItemsState({ status: "error" });
        } else {
          setItemsState({ status: "ready", items: data.items });
        }
      } catch {
        if (!controller.signal.aborted) {
          setItemsState({ status: "error" });
        }
      }
    };

    loadItems();
    return () => controller.abort();
  }, [type, timeRange]);

  return (
    <section className="mt-4 mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5" aria-labelledby="spotify-top-heading">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="spotify-top-heading" className="text-xl font-semibold sm:text-2xl">
            Your Spotify favorites
          </h2>
          <p className="mt-1 text-sm text-white/60">Ranked by Spotify&apos;s listening affinity</p>
        </div>
        <label className="text-sm text-white/70">
          <span className="sr-only">Listening period</span>
          <select
            value={timeRange}
            onChange={(event) => setTimeRange(event.target.value as TimeRange)}
            className="rounded-md border border-white/15 bg-black px-2 py-1.5 text-white"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-3 flex gap-2" role="group" aria-label="Favorite type">
        {(["tracks", "artists"] as const).map((itemType) => (
          <button
            key={itemType}
            type="button"
            aria-pressed={type === itemType}
            onClick={() => setType(itemType)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize transition-colors ${
              type === itemType ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Top {itemType}
          </button>
        ))}
      </div>

      {itemsState.status === "loading" && (
        <p className="text-sm text-white/60" role="status">Loading your Spotify favorites…</p>
      )}
      {itemsState.status === "not_configured" && (
        <p className="text-sm text-white/60">
          Spotify isn&apos;t connected yet.{" "}
          <a className="underline underline-offset-4 hover:text-white" href="/api/spotify/auth">
            Set it up
          </a>
        </p>
      )}
      {itemsState.status === "needs_reauthorization" && (
        <p className="text-sm text-white/60">
          Authorize top-item access, then replace the refresh token in your deployment settings.{" "}
          <a className="underline underline-offset-4 hover:text-white" href="/api/spotify/auth">
            Reconnect Spotify
          </a>
        </p>
      )}
      {itemsState.status === "error" && (
        <p className="text-sm text-white/60" role="status">
          Spotify favorites are temporarily unavailable.
        </p>
      )}
      {itemsState.status === "ready" && itemsState.items.length === 0 && (
        <p className="text-sm text-white/60">Spotify hasn&apos;t ranked any {type} for this period yet.</p>
      )}
      {itemsState.status === "ready" && itemsState.items.length > 0 && (
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {itemsState.items.map((item, index) => (
            <li key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10"
              >
                <span className="w-5 shrink-0 text-right text-sm text-white/40">{index + 1}</span>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 shrink-0 rounded bg-white/10" aria-hidden="true" />
                )}
                <span className="min-w-0">
                  <span className="block truncate font-medium">{item.name}</span>
                  {item.details && (
                    <span className="block truncate text-xs text-white/60">{item.details}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
