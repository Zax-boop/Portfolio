import { Card, CardContent } from "@/components/ui/card";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { useEffect, useState } from "react";

type Album = {
  name: string;
  image: string;
  Rank: number;
};

type RecommenderStats = {
  name: string;
  score: number;
  count: number;
  bestRank: number;
  recommendedAlbums: Album[];
};

export default function RecommenderDashboard({
  albums,
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
  }>;
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
  ) => {
    const alpha = 5;
    const C = 5;

    const maxRank = Math.max(...albums.map((a: Album) => a.Rank));

    const recommenderScores: Record<
      string,
      { scores: number[]; bestRank: number }
    > = {};

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

    const allScores = Object.values(recommenderScores).flatMap(
      (r) => r.scores
    );

    const globalAvg =
      allScores.reduce((sum, s) => sum + s, 0) / allScores.length;

    const result: Record<string, RecommenderStats> = {};

    for (const [name, data] of Object.entries(recommenderScores)) {
      const n = data.scores.length;
      const sum = data.scores.reduce((a, b) => a + b, 0);

      const adjusted = (sum + C * globalAvg) / (n + C);
      const finalScore = adjusted * Math.log(n + 1);

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

  return (
    <div className="p-6 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Recommender Dashboard</h1>

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
        {sortedData.map((r) => (
          <Card key={r.name} className="p-4 rounded-2xl border border-white/30">
            <CardContent className="flex justify-between items-center">
              <div>
                <div className="text-lg font-medium">
                  {r.name}
                </div>
                <div className="flex gap-2 mt-2n flex-wrap">
                  {r.recommendedAlbums.map((a) => (
                    <img
                      key={a.name}
                      src={a.image}
                      className="w-10 h-10 rounded-md object-cover"
                    />
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