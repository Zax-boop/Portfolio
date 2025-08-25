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

export default function GenrePieChart({
    games,
    excludedGenres,
    genreMap,
    height,
}: {
    games?: Game[];
    excludedGenres?: string[];
    genreMap?: Record<string, string>;
    height?: string;
}) {
    const genreCounts: Record<string, number> = {};
    if (!games || !Array.isArray(games)) {
        return <div className="text-center">No games data available</div>;
    }

    games.forEach((game) => {
        game.genres.forEach((genre) => {
            if (excludedGenres && excludedGenres.includes(genre)) return;
            const mappedGenre = genreMap?.[genre] || genre;
            genreCounts[mappedGenre] = (genreCounts[mappedGenre] || 0) + 1;
        });
    });

    const colors = Object.keys(genreCounts).map(
        (_, i) =>
            [
                "#6366F1",
                "#EC4899",
                "#10B981",
                "#F59E0B",
                "#3B82F6",
                "#EF4444",
                "#8B5CF6",
            ][i % 7]
    );

    const data = {
        labels: Object.keys(genreCounts),
        datasets: [
            {
                data: Object.values(genreCounts),
                backgroundColor: colors,
            },
        ],
    };


    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className={`${height ? height : "md:h-[35rem] xs:h-[20rem]"} rounded-2xl shadow-md flex flex-row items-center justify-center gap-4 xs:text-[0.4rem] md:text-base xs:w-full md:w-auto`}>
            <div className="xs:w-1/5 md:w-1/3 xs:max-h-[13rem] md:max-h-[30rem] overflow-y-auto bg-gray-800 rounded-lg xs:p-1.5 md:p-4 text-gray-200">
                <ul className="space-y-2">
                    {data.labels.map((label, i) => (
                        <li key={label} className="flex items-center xs:gap-0.5 md:gap-2">
                            <span
                                className="inline-block xs:w-2 md:w-4 xs:h-2 md:h-4 xs:rounded-sm md:rounded"
                                style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
                            />
                            {label} ({data.datasets[0].data[i]})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="xs:w-3/5 xs:h-auto md:h-[30rem] md:w-2/3">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}
