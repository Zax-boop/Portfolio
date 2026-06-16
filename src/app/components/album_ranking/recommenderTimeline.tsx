import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";

type Album = {
  name: string;
  artist: string;
  image: string;
  Rank: number;
  recommender: string;
  created_at: string;
};

type Props = {
  albums: Album[];
  recommender: string;
  maxRank: number;
};

type TimelinePoint = {
  x: string;
  y: number;
  delta: number;
  album: Album;
};

type TimelineSeries = {
  id: string;
  data: TimelinePoint[];
};

export default function RecommenderTrendChart({
  albums,
  recommender,
  maxRank,
}: Props) {

  const computeScore = (albums: Album[]) => {
    if (!albums.length) return 0;

    const alpha = 5;

    const scores = albums.map((a) => {
      const normalized =
        maxRank === 1 ? 0 : (a.Rank - 1) / (maxRank - 1);

      return Math.exp(-alpha * normalized);
    });

    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / scores.length;

    const confidence = scores.length / (scores.length + 5);
    const qualityScore = avg * (0.4 + 0.6 * confidence);

    const topHalf = albums.filter((a) => a.Rank <= maxRank / 2);
    const volumeBonus = 0.03 * Math.log(topHalf.length + 1);

    return qualityScore + volumeBonus;
  };

  const buildTimeline = (albums: Album[], recommender: string): TimelineSeries[] => {
    const sorted = albums
      .filter((a) => a.recommender === recommender)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );

    if (!sorted.length) {
      return [];
    }

    const timeline: TimelinePoint[] = [];

    let prev = 0;

    for (let i = 0; i < sorted.length; i++) {
      const subset = sorted.slice(0, i + 1);

      const score = computeScore(subset);

      timeline.push({
        x: sorted[i].created_at.split("T")[0],
        y: score,
        delta: score - prev,
        album: sorted[i],
      });

      prev = score;
    }

    return [
      {
        id: recommender,
        data: timeline,
      },
    ];
  };

  const data = useMemo(() => {
    return buildTimeline(albums, recommender);
  }, [albums, recommender]);

  return (
    <div className="w-full h-[250px]">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: 0, max: 1 }}
        axisBottom={{ legend: "Time", legendOffset: 30 }}
        axisLeft={{ legend: "ELO", legendOffset: -30 }}
        pointSize={6}
        useMesh={true}
        theme={{
          text: { fill: "#fff" },
          axis: {
            ticks: { text: { fill: "#fff" } },
            legend: { text: { fill: "#fff" } },
          },
          grid: { line: { stroke: "#333" } },
        }}

        tooltip={({ point }) => {
          const d = point.data as TimelinePoint;

          const delta = d.delta ?? 0;
          const isUp = delta >= 0;

          return (
            <div className="bg-white text-black p-3 rounded shadow-lg max-w-[240px]">
              <div className="font-semibold break-words">
                {d.album.name}
              </div>
              <div className="text-sm break-words">
                {d.album.artist}
              </div>

              <div className="text-xs mt-1">
                Rank #{d.album.Rank}
              </div>

              <div className="text-xs mt-1 font-mono">
                ELO: {d.y.toFixed(3)}
              </div>

              <div
                className={`text-xs mt-2 font-semibold ${isUp ? "text-green-600" : "text-red-600"
                  }`}
              >
                {isUp ? "▲" : "▼"} {Math.abs(delta).toFixed(3)} change
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}