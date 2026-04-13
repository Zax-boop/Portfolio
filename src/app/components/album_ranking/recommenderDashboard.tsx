import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useEffect, useState } from "react";

type Album = {
  name: string;
  image: string;
  Rank: number;
  artist: string;
};

type RecommenderStats = {
  name: string;
  score: number;
  count: number;
  bestRank: number;
  recommendedAlbums: Album[];
};

export default function RecommenderDashboard({
  albums, recSelect
}: {
  albums: Array<{
    name: string;
    artist: string;
    comment: string;
    image: string;
    Rank: number;
    genres: string[];
    recommender: string;
    id: string;
  }>,
  recSelect: (name: string) => void
}) {
  const [sortedData, setSortedData] = useState<RecommenderStats[]>([]);

  const computeRecommenderElo = (
    albums: {
      name: string;
      artist: string;
      comment: string;
      image: string;
      Rank: number;
      genres: string[];
      recommender: string;
      id: string;
    }[]
  ): RecommenderStats[] => {
    const alpha = 5;

    if (!albums.length) return [];

    const maxRank = Math.max(...albums.map((a) => a.Rank));

    const recommenderScores: Record<
      string,
      { scores: number[]; bestRank: number }
    > = {};

    // 🔹 Build base scores
    for (const album of albums) {
      if (!album.recommender) continue;

      const normalizedRank =
        maxRank === 1 ? 0 : (album.Rank - 1) / (maxRank - 1);

      const score = Math.exp(-alpha * normalizedRank);

      if (!recommenderScores[album.recommender]) {
        recommenderScores[album.recommender] = {
          scores: [],
          bestRank: album.Rank,
        };
      }

      recommenderScores[album.recommender].scores.push(score);

      if (album.Rank < recommenderScores[album.recommender].bestRank) {
        recommenderScores[album.recommender].bestRank = album.Rank;
      }
    }

    // 🔹 Median count (50th percentile)
    const counts = Object.values(recommenderScores).map(
      (r) => r.scores.length
    );

    const sortedCounts = [...counts].sort((a, b) => a - b);
    const median =
      sortedCounts[Math.floor(sortedCounts.length / 2)] || 1;

    const result: Record<string, RecommenderStats> = {};

    for (const [name, data] of Object.entries(recommenderScores)) {
      const n = data.scores.length;

      const sum = data.scores.reduce((a, b) => a + b, 0);
      const avg = sum / n;

      // -----------------------------
      // 1. QUALITY (core signal)
      // -----------------------------
      const quality = avg;

      // -----------------------------
      // 2. VOLUME BONUS (only if above median)
      // -----------------------------
      let volumeBonus = 0;

      if (n > median) {
        const excessRatio = (n - median) / median; // how far above median

        // tie volume bonus to quality so spam doesn't win
        const qualityWeight = avg;

        volumeBonus =
          Math.log(1 + excessRatio * 2) * qualityWeight;
      }

      // -----------------------------
      // FINAL SCORE
      // -----------------------------
      const finalScore = quality + volumeBonus;

      result[name] = {
        name,
        score: finalScore,
        count: n,
        bestRank: data.bestRank,

        recommendedAlbums: albums
          .filter((a) => a.recommender === name)
          .sort((a, b) => a.Rank - b.Rank)
          .map((a) => ({
            name: a.name,
            image: a.image,
            Rank: a.Rank,
            artist: a.artist,
          })),
      };
    }
    return Object.values(result).sort((a, b) => b.score - a.score);
  };

  useEffect(() => {
    setSortedData(computeRecommenderElo(albums));
  }, [albums]);

  const scatterData = [
    {
      id: "recommenders",
      data: sortedData.map((d) => ({
        x: d.count,
        y: d.score,
        name: d.name,
        bestRank: d.bestRank,
      })),
    },
  ];

  const [showTechnical, setShowTechnical] = useState(false);

  const simpleDescription = (
    <p className="text-sm text-gray-400 mt-2">
      This ranking uses a custom <span className="font-semibold">ELO-style scoring system</span> to evaluate how strong each recommender’s picks are. Albums ranked higher on the list contribute more value, with a steep curve that heavily rewards top placements while still giving some credit to lower-ranked picks. Each recommender’s score is calculated by converting album ranks into weighted scores, then applying a smoothing factor so users with only a few recommendations aren’t unfairly boosted. Finally, the score is scaled slightly based on how many albums a person has recommended, rewarding both quality and consistency. The result is a balanced metric that highlights people who consistently recommend high-ranking albums—not just those with a single standout pick.
    </p>
  );

  const technicalDescription = (
    <p className="text-sm text-gray-400 mt-2">
      This ranking uses a custom <span className="font-semibold">ELO-inspired scoring system</span> designed to reward both quality and consistency of recommendations. Each album’s rank is converted into a weighted score using an exponential decay function, meaning top-ranked albums contribute significantly more than lower-ranked ones. These scores are aggregated per recommender and adjusted using a Bayesian smoothing factor to prevent small sample sizes from skewing results. A logarithmic scaling is then applied based on the number of recommendations, giving additional weight to users who consistently contribute strong picks. This produces a balanced score that favors sustained high-quality recommendations over isolated successes.
    </p>
  );

  return (
    <div className="p-6 space-y-2 w-full">
      <h1 className="text-2xl font-bold">Recommender Ranking</h1>
      <button
        onClick={() => setShowTechnical(prev => !prev)}
        className="text-xs px-2 py-1 border border-white/20 rounded-md hover:bg-white hover:text-black transition"      >
        {showTechnical ? "Simple" : "Technical"}
      </button>
      {showTechnical ? technicalDescription : simpleDescription}

      {/* SCATTER */}
      <div className="w-full h-[500px] mt-6">
        <ResponsiveScatterPlot
          data={scatterData}
          margin={{ top: 40, right: 40, bottom: 60, left: 60 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: 1 }}
          nodeSize={12}
          colors={{ scheme: "category10" }}
          useMesh={true}
          axisBottom={{
            legend: "Recommendations",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            legend: "Score",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          theme={{
            background: "transparent",
            text: { fill: "#ffffff" },
            axis: {
              ticks: { text: { fill: "#ffffff" } },
              legend: { text: { fill: "#ffffff" } },
            },
            grid: { line: { stroke: "#333" } },
          }}
          tooltip={({ node }) => (
            <div style={{ background: "black", color: "white", padding: 8 }}>
              <strong>{node.data.name}</strong>
              <div>Count: {node.data.x}</div>
              <div>Score: {node.data.y}</div>
            </div>
          )}
        />
      </div>

      {/* LEADERBOARD */}
      <div className="grid gap-4">
        {sortedData.map((r, i) => (
          <Card key={r.name} className="p-4 rounded-2xl border border-white/30 overflow-visible">
            <CardContent className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium">
                  {i + 1}. {r.name}
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {r.recommendedAlbums.map((a) => (
                    <div key={a.name} className="relative group">
                      <img
                        onClick={() => recSelect(a?.name || "")}
                        src={a.image}
                        className="w-10 h-10 rounded-md object-cover cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-2"
                      />

                      {/* TOOLTIP */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      pointer-events-none">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs rounded px-3 py-2
                          z-[9999] pointer-events-none shadow-lg w-max max-w-[150px] whitespace-normal break-words text-left">
                          <div className="font-semibold">{a.name}</div>
                          <div className="text-gray-300">{a.artist}</div>
                          <div className="text-gray-400">Rank #{a.Rank}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm opacity-70 mt-1">
                  {r.count} recommendation{r.count > 1 && "s"} | Best Rank: #{r.bestRank} | Score: {r.score.toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}