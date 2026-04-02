import { useState, useEffect, useRef, ChangeEvent } from "react";
import { getAccessToken } from "../../../../utils/album_ranking/getAccessToken";

interface Album {
    id: string;
    name: string;
    artists: string;
    image: string;
    genres: string[];
}

interface AlbumSearchInputProps {
    onSelect?: (album: Album) => void;
    name: string;             // controlled input value
    setName: (name: string) => void;
}

// Spotify API types (partial, only what we need)
interface SpotifyArtist {
    name: string;
}

interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

interface SpotifyAlbum {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    images: SpotifyImage[];
}

interface SpotifySearchResponse {
    albums?: {
        items: SpotifyAlbum[];
    };
}

export default function AlbumSearchInput({ onSelect, name, setName }: AlbumSearchInputProps) {
    const [nameFocus, setNameFocus] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<Album[]>([]);
    const [token, setToken] = useState<string>("");
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Get token once
    useEffect(() => {
        getAccessToken().then(setToken);
    }, []);

    // Search albums function
    const searchAlbums = async (query: string): Promise<SpotifyAlbum[]> => {
        if (!token || !query) return [];

        const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=5`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const data: SpotifySearchResponse = await res.json();
        return data.albums?.items || [];
    };

    // Handle input changes with debounce
    useEffect(() => {
        if (!name) return setDropdown([]);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            const results = await searchAlbums(name);

            const detailed: Album[] = results.map((album: SpotifyAlbum) => ({
                id: album.id,
                name: album.name,
                artists: album.artists.map((a: SpotifyArtist) => a.name).join(", "),
                image: album.images[0]?.url || "",
                genres: [],
            }));

            setDropdown(detailed);
        }, 300);
    }, [name, token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    return (
        <div className="relative w-full">
            <div className="relative group">
                <input
                    type="text"
                    className="w-full bg-transparent text-xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                    placeholder="Album Name"
                    value={name}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                    onChange={handleChange}
                />
                <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${
                        nameFocus || name ? "w-full" : "w-0"
                    }`}
                />
            </div>

            {/* Dropdown */}
            {dropdown.length > 0 && nameFocus && (
                <ul className="absolute z-50 mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg max-h-72 overflow-auto">
                    {dropdown.map((album) => (
                        <li
                            key={album.id}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-800"
                            onMouseDown={() => {
                                setName(album.name);
                                setDropdown([]);
                                if (onSelect) onSelect(album);
                            }}
                        >
                            {album.image && (
                                <img
                                    src={album.image}
                                    alt={album.name}
                                    className="w-12 h-12 object-cover mr-3 rounded"
                                />
                            )}
                            <div>
                                <div className="font-semibold">{album.name}</div>
                                <div className="text-sm text-gray-300">{album.artists}</div>
                                {album.genres.length > 0 && (
                                    <div className="text-xs text-gray-400">{album.genres.join(", ")}</div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}