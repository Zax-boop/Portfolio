import { Pie } from "react-chartjs-2";
import { ChartOptions, ChartEvent, ActiveElement } from "chart.js";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenrePieChart({
    genresList,
    excludedGenres,
    genreMap,
    setSearchQuery,
    genreColors = {},
}: {
    genresList?: string[][];
    excludedGenres?: string[];
    genreMap?: Record<string, string>;
    setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
    genreColors?: Record<string, string>;
}) {
    const genreCounts: Record<string, number> = {};

    if (!genresList || !Array.isArray(genresList)) {
        return <div className="text-center">No genres data available</div>;
    }

    const returnColor = (genre: string) => {
        if (genre == "Action-Adventure") genre = "action";
        if (genre == "Soulsborne/Soulslikes") genre = "soulsborne";
        const formattedGenre = genre.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/&/g, 'and')
            .replace(/-/g, '');
        return genreColors[formattedGenre] || "#D1D5DB";
    };


    genresList.forEach((genres) => {
        genres?.forEach((genre) => {
            if (excludedGenres && excludedGenres.includes(genre)) return;
            const mappedGenre = genreMap?.[genre] || genre;
            genreCounts[mappedGenre] = (genreCounts[mappedGenre] || 0) + 1;
        });
    });

    const colors = Object.keys(genreCounts).map((genre) => returnColor(genre));

    const data = {
        labels: Object.keys(genreCounts),
        datasets: [
            {
                data: Object.values(genreCounts),
                backgroundColor: colors,
            },
        ],
    };

    const options: ChartOptions<"pie"> = {
        plugins: {
            legend: {
                display: false,
            },
        },
        onClick: (evt: ChartEvent, elements: ActiveElement[], chart) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const label = chart.data.labels?.[index] as string;
                const el = document.getElementById(label);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                if (setSearchQuery) {
                    setSearchQuery(label);
                }
            }
        },
    };

    return (
        <div className="flex justify-center items-center w-full md:h-[35rem] xs:h-[16rem] gap-4 xs:text-[0.4rem] md:text-base">
            <div className="xs:w-1/5 md:w-1/5 xs:max-h-[13rem] md:max-h-[30rem] overflow-y-auto bg-gray-800 rounded-lg xs:p-1.5 md:p-4 text-gray-200">
                <ul className="space-y-2">
                    {data.labels
                        .map((label, i) => ({
                            label,
                            count: data.datasets[0].data[i],
                            color: returnColor(label), 
                        }))
                        .sort((a, b) => b.count - a.count)
                        .map((item) => (
                            <li
                                key={item.label}
                                className="flex items-center cursor-pointer xs:gap-0.5 md:gap-2 hover:text-white"
                                onClick={() => {
                                    const el = document.getElementById(item.label);
                                    if (el) {
                                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }
                                    if (setSearchQuery) {
                                        setSearchQuery(item.label);
                                    }
                                }}
                            >
                                <span
                                    className="inline-block xs:w-2 md:w-4 xs:h-2 md:h-4 xs:rounded-sm md:rounded"
                                    style={{ backgroundColor: item.color }}
                                />
                                {item.label} ({item.count})
                            </li>
                        ))}
                </ul>
            </div>
            <div className="xs:w-3/5 xs:h-auto md:h-[30rem] md:w-1/2 flex justify-center">
                <Pie data={data} options={options} key={JSON.stringify(data)} />
            </div>
        </div>
    );
}
