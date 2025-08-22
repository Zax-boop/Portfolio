import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Game = {
    name: string;
    studio: string;
    image: string;
    comments: string;
    rank: number;
    genres: string[];
    id: string;
};

export default function GenrePieChart({ games, excludedGenres, genreMap }: { games?: Game[]; excludedGenres: string[]; genreMap: Record<string, string> }) {
    const genreCounts: Record<string, number> = {};
    if (!games || !Array.isArray(games)) {
        return <div className="text-center">No games data available</div>;
    }

    games.forEach(game => {
        game.genres.forEach(genre => {
            if (excludedGenres.includes(genre)) return;
            const mappedGenre = genreMap[genre] || genre;
            genreCounts[mappedGenre] = (genreCounts[mappedGenre] || 0) + 1;
        });
    });

    const data = {
        labels: Object.keys(genreCounts),
        datasets: [
            {
                data: Object.values(genreCounts),
                backgroundColor: [
                    "#6366F1",
                    "#EC4899",
                    "#10B981",
                    "#F59E0B",
                    "#3B82F6",
                    "#EF4444",
                    "#8B5CF6",
                ],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "left" as const, // 👈 Move labels to the left
                labels: {
                    boxWidth: 20,
                    padding: 15,
                    color: "#F3F4F6",
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-[48rem] rounded-2xl shadow-md flex flex-col items-center justify-center">
            <Pie data={data} options={options} />
        </div>
    );
}

