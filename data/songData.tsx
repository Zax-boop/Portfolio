import care from "../public/care.jpg"
import dummy from "../public/dummy.jpg"
import sweet from "../public/sweet.jpg"
import ror2 from "../public/ror2.jpg"
import nbt from "../public/nbt.png"
import kay from "../public/kay.jpg"
import hfoas from "../public/hfoas.jpg"

export const songs = [
    {
        name: "Care for You",
        artist: "The Marías",
        image: care,
        bg: "from-red-950  via-pink-900/80 to-fuchsia-900/50",
        text_color: "from-pink-400 via-yellow-300 to-red-400",
        mini_text_color: "text-pink-300",
        hover: "shadow-pink-500/30 hover:shadow-pink-500/50",
        description: (
            <>
                The Marías is my favorite artist and <em>"Care for You"</em> is the perfect intro song as it has everything I love about them. Her voice has that light, jazzy feel like she has in the band's <em>Superclean</em> EPs. It also has that smooth trumpet solo at the end which is only used in the best of their songs. If you like this song, you will probably like albums leaning towards Dream Pop, Psychedelic, or Jazz.
            </>
        ),
        genres: [{ "Dream Pop": "bg-pink-500" }, { "Indie Pop": "bg-red-400" }, { "Jazz": "bg-blue-700" }, { "Latin": "bg-yellow-400" }, { "Psychedelic": "bg-green-600" }, { "R&B": "bg-orange-500" }],
        recs: ["CINEMA", "Submarine", "Superclean, Vol. II", "Superclean, Vol. 1", "Flower of the Soul (Full Bloom)", "Tamale", "Ice Melt", "assisted memories", "Heaven Knows", "Fancy That", "to hell with it", "All the Same All Ok", "MADRA", "Duality", "When a Thought Grows Wings", "INTUITION"]
    },
    {
        name: "Glory Box",
        artist: "Portishead",
        image: dummy,
        bg: "from-purple-900/60 via-slate-900/80 to-gray-950",
        text_color: "from-purple-300 via-gray-200 to-pink-200",
        mini_text_color: "text-purple-300",
        hover: "shadow-purple-900/40 hover:shadow-amber-600/40",
        description: (
            <>
                One of my favorite songs, <em>"Glory Box"</em> is a defining track of the trip-hop era, blending
                sultry vocals, jazzy undertones, and hypnotic beats. Beth Gibbons’ voice feels
                both intimate and haunting, while the production layers smoky atmospheres over
                slow-burning grooves. If you connect with this song, you’ll likely enjoy other
                works in the trip-hop and downtempo space that carry the same moody, cinematic
                energy.
            </>
        ),
        genres: [
            { "Trip-Hop": "bg-purple-700" },
            { "Downtempo": "bg-slate-600" },
            { "Electronic": "bg-indigo-700" },
            { "Jazz": "bg-blue-800" },
            { "Soul": "bg-rose-700" }
        ],
        recs: [
            "Dummy",
            "Portishead",
            "Mezzanine",
            "Black Cherry",
            "The Mating Game",
            "Felt Mountain",
            "Vespertine",
            "Supernature",
            "Debut",
            "The Break Up",
            "Who Can You Trust?",
            "Becoming X"
        ]
    },
    {
        name: "Air Supply",
        artist: "Sweet Trip",
        image: sweet,
        bg: "from-sky-900/60 via-cyan-800/70 to-indigo-950",
        text_color: "from-cyan-300 via-sky-200 to-indigo-300",
        mini_text_color: "text-cyan-300",
        hover: "shadow-cyan-700/40 hover:shadow-indigo-500/50",
        description: (
            <>
                <em>"Air Supply"</em> is one of Sweet Trip’s most iconic tracks, balancing glitchy
                electronica with dreamy shoegaze textures. The song feels like it’s constantly
                disintegrating and rebuilding itself, pulling you into an otherworldly swirl of
                noise, melody, and beauty. It’s chaotic and soothing at the same time — a perfect
                example of their experimental sound. Experimental and electronic songs will probably match your vibe.
            </>
        ),
        genres: [
            { "Shoegaze": "bg-indigo-600" },
            { "IDM": "bg-cyan-700" },
            { "Dream Pop": "bg-sky-500" },
            { "Electronic": "bg-teal-600" },
            { "Experimental": "bg-fuchsia-700" },
        ],
        recs: [
            "Velocity: Design: Comfort.",
            "You Will Never Know Why (2021 Remaster)",
            "Seratonin II",
            "Evangelical Girl is a Gun",
            "how i'm feeling now",
            "Mercurial World",
            "brat",
            "Imaginal Disk",
            "A little Rhythm and a Wicked Feeling",
            "Mini Mix Vol. 3",
            "The Dark Side of the Moon"
        ]
    },
    {
        name: "The Rain Formerly Known as Purple",
        artist: "Chris Christodoulou",
        image: ror2,
        bg: "from-indigo-200/70 via-violet-300/60 to-purple-400/70",
        text_color: "from-violet-900 via-purple-950 to-indigo-950",
        mini_text_color: "text-violet-700",
        hover: "shadow-violet-400/40 hover:shadow-indigo-500/60",
        description: (
            <>
                <em>"The Rain Formerly Known as Purple"</em> is a lush, atmospheric piece that
                captures both the grandeur and melancholy of the world of <em>Risk of Rain 2 </em>. Chris Christodoulou
                layers sweeping melodies over intricate rhythms, creating something that feels
                cosmic yet grounded, playful yet emotional. It’s a perfect example of his ability
                to balance prog-rock energy with cinematic ambience. If you like this song, you will probably also like albums with a electronic rock or video game feel.
            </>
        ),
        genres: [
            { "Video Game": "bg-indigo-400" },
            { "Progressive Rock": "bg-purple-500" },
            { "Electronic": "bg-violet-400" },
            { "Ambient": "bg-blue-400" },
            { "Jazz Fusion": "bg-pink-500" },
            { "Electronic": "bg-teal-600" },
        ],
        recs: [
            "Risk of Rain 2",
            "Risk of Rain Returns",
            "Deadbolt",
            "Risk of Rain 2: Survivors of the Void",
            "Risk of Rain 2: Seekers of the Storm",
            "Katana Zero (Original Soundtrack)",
            "Age of the Synth: Elden Ring (Synthwave Arrangement)",
            "Age of the Synth: Bloodborne",
            "Age of the Synth: Dark Souls III",
            "Balatro (Original Game Soundtrack)",
            "Trilogy",
            "198XAD",
            "Dangerous Days",
            "Pseudoregalia OST",
            "Furi (Original Game Sountrack)",
            "Neon White Soundtrack Part 1"
        ]
    },
    {
        name: "Life's Coming in Slow",
        artist: "Nothing But Thieves",
        image: nbt,
        bg: "from-gray-900/80 via-slate-900/90 to-black",
        text_color: "from-red-600 via-rose-700 to-amber-700",
        mini_text_color: "text-red-500",
        hover: "shadow-red-800/40 hover:shadow-rose-600/50",
        description: (
            <>
                <em>"Life's Coming in Slow"</em> is a driving alt-rock anthem with pulsing riffs,
                restless percussion, and urgent vocals that capture the chaos of modern life.
                Nothing But Thieves channel raw emotion and energy into a sound that’s both
                anthemic and claustrophobic, making this track perfect for fans of dark,
                high-octane rock.
            </>
        ),
        genres: [
            { "Alternative Rock": "bg-red-700" },
            { "Indie Rock": "bg-gray-700" },
            { "Post-Punk": "bg-slate-800" },
            { "Electronic Rock": "bg-indigo-800" }
        ],
        recs: [
            "Broken Machine (Deluxe)",
            "Moral Panic",
            "Moral Panic II",
            "What Did You Think When You Made Me This Way?",
            "Nirvana",
            "Nevermind",
            "In Utero",
            "Excess",
            "Signal",
            "How To Be A Human Being",
            "AM",
            "Favourite Worst Nightmares (Standard Version)",
            "Demon Days",
            "Song Machine, Season One: Strange Timez (Deluxe)",
            "Plastic Beach",
            "The Now Now",
            "BPM: Bullets Per Minute (Original Game Soundtrack)",
            "Robocream (Original Roboquest Soundtrack), Pt. 1",
            "Robocream (Original Roboquest Soundtrack), Pt. 2",
            "Robocream (Original Roboquest Soundtrack), Pt. 3"
        ]
    },
    {
        name: "Witchy",
        artist: "Kaytranada",
        image: kay,
        bg: "from-indigo-950 via-purple-900/80 to-fuchsia-900/50",
        text_color: "to-violet-300 via-fuchsia-200 from-indigo-200",
        mini_text_color: "text-fuchsia-300",
        hover: "shadow-fuchsia-700/30 hover:shadow-indigo-600/50",
        description: (
            <>
                Kaytranada’s <em>"Witchy"</em> embodies his signature blend of lush electronic
                production, hypnotic beats, and funky undertones. The track feels both sultry
                and otherworldly, wrapping you in a hazy late-night groove. If you like this,
                you’ll likely connect with other electronic, house, and R&B-inspired tracks
                that balance rhythm with atmosphere.
            </>
        ),
        genres: [
            { "Electronic": "bg-indigo-700" },
            { "House": "bg-purple-700" },
            { "Future Funk": "bg-fuchsia-700" },
            { "R&B": "bg-rose-700" },
            { "Hip-Hop": "bg-blue-800" }
        ],
        recs: [
            "99.9%",
            "BUBBA",
            "Timeless",
            "Swimming",
            "Circles",
            "The Divine Feminine",
            "GO:OD AM",
            "CTRL",
            "SOS Deluxe: LANA",
            "Lifetime",
            "Essentials",
            "Flower Boy",
            "IGOR",
            "Random Access Memories",
            "Dawn FM",
            "Tamale",
            "Nothing much has changed, I don't feel the same",
            "Freudian",
        ]
    },
    {
        name: "Hfoas",
        artist: "Mei Semones",
        image: hfoas,
        bg: "from-rose-200 via-orange-100 to-amber-100",
        text_color: "from-rose-700 via-amber-700 to-orange-800",
        mini_text_color: "text-rose-500",
        hover: "shadow-rose-300/40 hover:shadow-amber-400/50",
        description: (
            <>
                Mei Semones’ <em>"Hfoas"</em> is tender and luminous, blending soft jazz chords,
                bossa nova rhythms, and intimate vocals. The track feels like sunlight spilling
                through a window on a quiet afternoon — understated, warm, and deeply
                heartfelt. If you love this, you’ll likely connect with other artists who merge
                indie pop and jazz with gentle, emotional storytelling as well as albums from asian languages.
            </>
        ),
        desc_text: "text-black",
        genres: [
            { "Indie Pop": "bg-rose-400" },
            { "Jazz": "bg-amber-400" },
            { "Bossa Nova": "bg-orange-300" },
            { "Dream Pop": "bg-pink-300" },
            { "J-Pop": "bg-yellow-300" }
        ],
        recs: [
            "Tsukino",
            "Animaru",
            "For Lovers",
            "Soyokaze Apartment Room 201",
            "ランプ幻想",
            "Windswept Adan",
            "Chet Baker Sings",
            "we should've killed each other",
            "Yume",
            "マホロボシヤ",
            "Kyōgen",
            "LOST CORNER",
            "ANNA TSUCHIYA inspi' NANA (BLACK STONES)"
        ]
    },
]