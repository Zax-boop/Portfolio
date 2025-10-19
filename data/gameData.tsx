import exp33 from "../public/exp33.jpg"
import u4 from "../public/u4.webp"
import gow from "../public/gow.jpg"
import rdr2 from "../public/rdr2.jpg"
import crab from "../public/crab.webp"
import er from "../public/er.webp"
import sekiroRec from "../public/sekiroRec.webp"
import pseudo from "../public/pseudo.jpg"
import hk from "../public/hk.jpg"
import sols from "../public/sols.webp"
import balatro from "../public/balatro.png"
import hades from "../public/hades.png"
import ror2 from "../public/ror2.webp"
import crosscode from "../public/crosscode.jpg"
import ff7 from "../public/ff7.jpg"
import paper from "../public/paper.webp"
import slay from "../public/slay.jpg"
import worldless from "../public/worldless.jpg"
import neon_white from "../public/neon_white.jpg"
import mullet from "../public/mullet.jpg"
import doom from "../public/doom.jpg"
import mimic from "../public/mimic.webp"
import last from "../public/last.webp"
import bloodborne from "../public/bloodborne.webp"
import cuphead from "../public/cuphead.jpeg"
import celeste from "../public/celeste.webp"
import ghost from "../public/ghost.jpg"
import mc from "../public/mc.jpg"
import val from "../public/val.jpg"
import overcooked from "../public/overcooked.jpg"

export const actionAdventure = [
    {
        name: "Uncharted 4: A Thief's End",
        color: "bg-orange-900",
        image: u4,
        description: `For a casual experience, I recommend the third-person shooter 
    <span class="font-bold">Uncharted 4: A Thief's End</span>. 
    A cinematic action-adventure that’s easy to pick up and incredibly engaging. 
    Explore stunning environments, solve light puzzles, and enjoy thrilling set pieces without steep difficulty.`,
        recs: ["The Last of Us", "The Last of Us Part II", "Jak II", "Jak III"]
    },
    {
        name: "God of War",
        color: "bg-blue-950",
        image: gow,
        description: `For an action-oriented experience, I recommend 
    <span class="font-bold">God of War (2018)</span>. 
    A thrilling action-adventure leaning heavily into intense, satisfying combat with epic visuals and Norse-inspired worlds. 
    You follow Kratos and his son Atreus on a deeply emotional journey filled with challenging battles and rich storytelling.`,
        recs: ["God of War Ragnarök", "Dark Souls 3",]
    },
    {
        name: "Red Dead Redemption II",
        color: "bg-red-950",
        image: rdr2,
        description: `For an immersive experience, I recommend 
    <span class="font-bold">Red Dead Redemption 2</span>. 
    A sprawling open-world adventure with rich storytelling, shootouts, and atmospheric exploration. 
    Regarded as one of the best games ever made, it offers a deep narrative and a living world to get lost in. 
    You play as Arthur Morgan, an outlaw navigating the decline of the Wild West, struggling with loyalty, survival, and morality.`,
        recs: ["Horizon Zero Dawn", "Ghost of Tsushima"]
    }
];
export const soulsLikes = [
    {
        name: "Another Crab's Treasure",
        color: "bg-blue-900",
        image: crab,
        reverse: false,
        description: (
            <>
                For a casual experience, I recommend{" "}
                <span className="font-bold">Another Crab's Treasure</span>. A charming
                soulslike with an adorable crab protagonist and a vibrant underwater
                world, it balances accessibility with challenge. Its lighthearted tone
                makes it a perfect entry point into the genre. The music is also
                fantastic with a jazzy, bossa nova style that fits the underwater theme
                perfectly. <span className="italic">"The Lower Crust"</span> is a
                personal favorite.
            </>
        ),
        recs: ["Bloodborne", "Hollow Knight"]
    },
    {
        name: "Elden Ring",
        color: "bg-green-950",
        image: er,
        reverse: true,
        description: (
            <>
                For an intro into FromSoftware's games,{" "}
                <span className="font-bold">Elden Ring</span> is ideal. It merges
                open-world exploration with the studio’s signature challenge, while
                weaving in rich lore and stunning landscapes. A must-play for both
                curious newcomers and seasoned fans. The main wall stopping people from
                playing souls games I noticed is the difficulty spike. People often have
                described these games as "banging your head against a wall". Elden Ring
                is great because it gives you the freedom to explore and level up
                elsewhere if you get stuck on a boss, giving a shift in the mentality of
                "I have to beat this boss" to "I can come back later when I'm stronger".
            </>
        ),
        recs: ["Dark Souls 1 Remastered", "Dark Souls 3", "Elden Ring Nightreign"]
    },
    {
        name: "Sekiro: Shadows Die Twice",
        color: "bg-pink-950",
        image: sekiroRec,
        reverse: false,
        description: (
            <>
                For a challenging experience,{" "}
                <span className="font-bold">Sekiro: Shadows Die Twice</span> offers
                unmatched precision combat. If Elden Ring's mentality is "explore and
                conquer", Sekiro is "master the combat and conquer". The combat is very
                precise and unforgiving, but once you get the hang of it, it's
                incredibly satisfying. Also, the only way to level up your character's
                attack and health is by defeating bosses, so you really have to master
                the combat to progress. This ideology is what makes Sekiro my favorite
                game.
            </>
        ),
        recs: ["Nine Sols", "Lies of P", "Kannagi Usagi"]
    },
];
export const metroidvanias = [
    {
        name: "Pseudoregalia",
        color: "bg-amber-900",
        image: pseudo,
        description: (
            <>
                For a casual experience, I recommend{" "}
                <span className="font-bold">Pseudoregalia</span>. A charming metroidvania
                with an adorable protagonist and vibrant world, its accessible gameplay
                makes it a great entry point into the genre. The music is also fantastic
                with a chill electric style. Metroidvania's are normally 2D games, but
                Pseudoregalia is a 3D metroidvania which is pretty unique. There are also
                not many enemies in the game, making it more about exploration and
                platforming.
            </>
        ),
        recs: ["Gris", "Celeste", "Katana Zero", "Ghostrunner", "Worldless", "Neva"],
    },
    {
        name: "Hollow Knight",
        color: "bg-indigo-950",
        image: hk,
        description: (
            <>
                For an intro into Metroidvania games,{" "}
                <span className="font-bold">Hollow Knight</span> blends hand-drawn art
                with challenging gameplay. Its rich lore, stunning visuals, and
                intricate level design make it essential for newcomers and veterans
                alike.
            </>
        ),
        recs: ["Blasphemous", "Blasphemous 2", "9 Years of Shadows", "Voidwrought", "Another Crab's Treasure"],
    },
    {
        name: "Nine Sols",
        color: "bg-red-900",
        image: sols,
        description: (
            <>
                For a challenging experience,{" "}
                <span className="font-bold">Nine Sols</span> combines action and
                platforming with precise controls and intricate design. Its beautiful
                visuals and engaging gameplay make it a standout title. It also follows
                Sekiro's parry-focused combat system, so if you like that, you'll love
                Nine Sols. The bosses are incredible as well, many of which I replay
                often.
            </>
        ),
        recs: ["Sekiro: Shadows Die Twice", "Worldless"],
    },
];

export const roguelikes = [
    {
        name: "Balatro",
        image: balatro,
        description: (
            <>
                For a casual experience, <span className="font-bold">Balatro</span>{" "}
                offers a charming roguelike twist with accessible gameplay and a
                lighthearted tone. Its a poker-themed roguelike where you create poker hands to score points. The art style is also fantastic, with a hand-drawn aesthetic
                that adds to the game's charm. Also, the soundtrack is incredible, with a
                jazzy, carnival-inspired style that fits the game's theme perfectly.
            </>
        ),
        recs: ["Slay the Spire", "Monster Train"],
    },
    {
        name: "Hades",
        image: hades,
        description: (
            <>
                <span className="font-bold">Hades</span> blends fast-paced action with a
                rich narrative, stunning visuals, and deep lore — a must-play for
                roguelike fans. Hades is my number one recommendation for video games in
                general. The combat is fast-paced and satisfying, the story is engaging
                and well-written, and the characters are memorable and lovable. The game
                also has a fantastic soundtrack that perfectly complements the action. If
                you haven't played Hades yet, I highly recommend it. The chamber system
                is the best form of roguelike build crafting in my opinion. If you like
                this game you must play the sequel Hades 2 after.
            </>
        ),
        recs: ["Hades II", "Astral Ascent", "Wizard of Legend", "BlazBlue Entropy Effect", "Kill Knight", "Sworn", "Ravenswatch", "Oblivion Override", "Dead Cells", "Spiritfall"],
    },
    {
        name: "Risk of Rain 2",
        image: ror2,
        description: (
            <>
                <span className="font-bold">Risk of Rain 2</span> is another personal
                favorite of mine. It combines third-person shooting with roguelike
                elements, creating a unique and thrilling experience. The game features a
                variety of characters, each with their own unique abilities and
                playstyles, and the procedurally generated levels ensure that no two runs
                are the same. The game also has my favorite soundtrack of any game, with
                a mix of electronic and rock music that perfectly complements the action.
                The artist Chris Christodoulou is a genius and I highly recommend
                checking out his other works. Risk of Rain 2 also offers co-op
                multiplayer, allowing you to team up with friends for even more fun.
            </>
        ),
        recs: ["Risk of Rain Returns", "Enter the Gungeon"],
    },
];
export const rpgs = [
    {
        name: "Clair Obscur: Expedition 33",
        color: "bg-gray-300",
        image: exp33,
        alt: "Clair Obscur: Expedition 33",
        description:
            "A story-driven RPG with painterly visuals and an atmospheric soundtrack. Taking place in a French-inspired world, the game follows a group of explorers as they uncover the mysteries of their world outside the island that they inhabit. Clair Obscur was created by a small studio comprised of a few people who used to work at Ubisoft. They were unsatisfied with the games they were creating and wanted to make something truly special. The game is truly a modern classic with its incredible story, production, and parry-focused, turn-based gameplay.",
        recs: ["Paper Mario: The Thousand-Year Door", "Pokémon XD: Gale of Darkness", "Worldless"],
    },
    {
        name: "Crosscode",
        color: "bg-blue-200",
        image: crosscode,
        alt: "Crosscode",
        description:
            "A modern pixel-art RPG that mixes action combat with puzzle-filled exploration. Its world is vibrant, charming, and approachable, making it an easy pick for newcomers. You play as Lea, a mute girl who becomes embroiled in a mysterious adventure. The game features a unique combat system that combines real-time action with RPG elements, allowing for a dynamic and engaging experience. One of the most emotional games I've ever played.",
        recs: ["Terraria", "Hades", "Hades II"],
    },
    {
        name: "Final Fantasy VII",
        color: "bg-green-200",
        image: ff7,
        alt: "Final Fantasy VII",
        description:
            "Considered one of the greatest games of all time, Final Fantasy VII set the standard for RPGs with its deep narrative, complex characters, and innovative gameplay mechanics. The game's world is vast and immersive, filled with memorable locations and a rich lore that has captivated players for decades. The gameplay is pretty traditional turned-based combat, but the story, message, and characters are what make this game a must-play.",
        recs: ["Final Fantasy X"],
    },
];
export const turns = [
    {
        name: "Paper Mario: The Thousand-Year Door",
        color: "bg-red-200",
        image: paper,
        alt: "Paper Mario: The Thousand-Year Door",
        description:
            "A charming RPG that combines traditional turn-based combat with unique paper-themed mechanics. Its witty writing and memorable characters make it a beloved classic in the genre. One of the first games I ever played and still one of my favorites.",
        recs: ["Clair Obscur: Expedition 33", "Darkest Dungeon"],
    },
    {
        name: "Slay the Spire",
        color: "bg-orange-200",
        image: slay,
        alt: "Slay the Spire",
        description:
            "A modern roguelike deck-building game that combines strategic card play with dungeon crawling. Its challenging gameplay and unique mechanics make it a favorite among the roguelike and strategy communities. I am horrible at it though but still love it.",
        recs: ["Balatro", "Darkest Dungeon", "Monster Train"],
    },
    {
        name: "Worldless",
        color: "bg-blue-200",
        image: worldless,
        alt: "Worldless",
        description:
            "A unique RPG that emphasizes exploration and environmental storytelling. Its hand-drawn art style and atmospheric world create a captivating experience for players. Honestly, I spent most of my time getting lost in the world's beauty even though the gameplay was amazing. The battle system is very unique in a sense that you have to string together combos to do more damage in your turn and parry enemy attacks during their turn.",
        recs: ["Clair Obscur: Expedition 33", "Gris"],
    },
];
export const shooters = [
    {
        name: "Neon White",
        image: neon_white,
        alt: "Neon White",
        description:
            "A fast-paced first-person shooter that combines parkour mechanics with card-based abilities. Its unique gameplay loop and stylish visuals make it a standout title in the genre. The dialogue is suspicious though...",
        recs: ["BPM: Bullets Per Minute", "Cyber Hook"],
    },
    {
        name: "Mullet Madjack",
        image: mullet,
        alt: "Mullet Madjack",
        description:
            "An anime-styled first-person shooter that combines roguelike elements with fast-paced action. One of the most exhilarating games I've ever played. Another game I can't recommend enough.",
        recs: ["Call of Juarez: Slinger"],
    },
    {
        name: "Doom Eternal",
        image: doom,
        alt: "Doom Eternal",
        description:
            "A fast-paced first-person shooter that emphasizes movement and combat. Probably the best fps game ever made. Its brutal gameplay and stunning visuals make it a must-play for fans of the genre.",
        recs: ["Severed Steel", "Doom", "Titanfall 2"],
    },
];
export const horrors = [
    {
        name: "The Mimic",
        image: mimic,
        alt: "The Mimic",
        description:
            "A roblox horror game that's genuinely scary and fun to play with friends.",
        recs: ["Slay the Princess - The Pristine Cut", "Judy"]
    },
    {
        name: "The Last of Us",
        image: last,
        alt: "The Last of Us",
        description:
            "One of the best story-driven games ever made. It has a fantastic narrative, incredible characters, and a hauntingly beautiful world. The gameplay is also great with a mix of stealth, combat, and exploration.",
        recs: ["The Last of Us Part II", "Uncharted 4: A Thief's End"]
    },
    {
        name: "Bloodborne",
        image: bloodborne,
        alt: "Bloodborne",
        description:
            "A very special game to me. It was my intro into FromSoftware's games and I fell in love with it. The gothic horror setting is incredibly atmospheric, and the fast-paced combat is both challenging and rewarding. It taught me how rewarding it is to overcome overwhelming odds, a high I export constantly chase.",
        recs: ["Blasphemous", "Blasphemous 2", "Nightmare Kart", "Hollow Knight", "Lies of P", "Another Crab's Treasure", "Dark Souls 3", "Sekiro: Shadows Die Twice", "Elden Ring", "Elden Ring Nightreign"]
    }
];
export const platformers = [
    {
        name: "Cuphead",
        image: cuphead,
        alt: "Cuphead",
        description:
            (
                <>
                    For a casual experience, I recommend <span className="font-bold">Cuphead</span>. A charming soulslike with an adorable cup protagonist and a vibrant cartoon world, it balances accessibility with challenge. Playing Cuphead is like playing a 1930s cartoon. The art style is incredible, with hand-drawn animation and watercolor backgrounds that bring the world to life. The music is also fantastic, with a jazzy, big band style that fits the game's theme perfectly. Co-op is also done really well in this game.
                </>
            ),
        color: "text-yellow-300",
        layout: "normal",
        recs: ["Blasphemous", "Blasphemous 2", "Hollow Knight"],
    },
    {
        name: "Celeste",
        image: celeste,
        alt: "Celeste",
        description:
            (
                <>
                    <span className="font-bold">Celeste</span> is an indie platformer that combines tight controls with a heartfelt narrative. Its challenging levels and emotional story make it a standout title in the genre. The game follows Madeline as she climbs Celeste Mountain, facing both physical and mental challenges along the way. The soundtrack is also incredible, with a mix of electronic and acoustic music that perfectly complements the game's themes of perseverance and self-discovery. I love the song 'Resurrections' from the soundtrack.
                </>
            ),
        color: "text-orange-400",
        layout: "reverse",
        recs: ["Cyber Hook", "Pseudoregalia"],
    },
    {
        name: "Ghostrunner",
        image: ghost,
        alt: "Ghostrunner",
        description:
            (
                <>
                    <span className="font-bold">Ghostrunner</span> offers unmatched precision combat. The gameplay is incredibly fast-paced and requires quick reflexes and precise timing. The parkour mechanics are also incredibly satisfying, allowing you to seamlessly traverse the game's vertical environments. The cyberpunk aesthetic is stunning, with neon-lit cityscapes and futuristic technology that create a captivating world to explore. The soundtrack is also fantastic, with a mix of electronic and industrial music that perfectly complements the game's themes of speed and agility. The story is pretty basic, but the gameplay and world make up for it.
                </>
            ),
        color: "text-red-400",
        layout: "normal",
        recs: ["Katana Zero", "Neon White"],
    },
];
export const multiplayer = [
    {
        name: "Minecraft",
        image: mc,
        alt: "Minecraft",
        description:
            (
                <>
                    For a casual experience, <span className='font-bold'>Minecraft</span> offers a charming sandbox with endless creativity. Its balance of freedom and challenge makes it a perfect entry point into gaming. The game allows players to build and explore their own worlds, making it a great way to express creativity and imagination. The game's blocky art style is iconic, and the soundtrack is also fantastic, with a mix of ambient and melodic music that perfectly complements the game's themes of exploration and adventure. Minecraft also offers multiplayer modes, allowing you to play with friends and explore together.
                </>
            ),
        color: "text-green-400",
        recs: ["Terraria", "Starbound"],
    },
    {
        name: "Valorant",
        image: val,
        alt: "Valorant",
        description:
            (
                <>
                    <span className='font-bold'>Valorant</span> combines precise gunplay with unique agent abilities. A tactical shooter that emphasizes teamwork, strategy, and clutch moments. The community is very toxic though, so be prepared for that.
                </>
            ),
        color: "text-pink-400",
        recs: ["Cuphead", "Call of Duty Black Ops II", "Titanfall 2", "Call of Juarez: Slinger", "BPM: Bullets Per Minute", "Doom Eternal", "Mullet Madjack"],
    },
    {
        name: "Overcooked! 2",
        image: overcooked,
        alt: "Overcooked 2",
        description:
            (
                <>
                    <span className='font-bold'>Overcooked! 2</span> delivers chaotic and hilarious co-op action. Its kitchens demand coordination and quick thinking, rewarding true teamwork. Despite appearances, this game is not for the faint of heart.
                </>
            ),
        color: "text-yellow-400",
        recs: ["Cuphead"],
    },
];