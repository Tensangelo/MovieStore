import Image from "next/image";
import Link from "next/link";
// Hooks
import { useBookmark } from "@/hooks/useBookmark";
// Icons
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import CircularProgressBar from "./circularBarProgress";

interface ContainerProps {
    children: React.ReactNode;
}

interface PropsCards {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}

export const ContainerCards = (props: ContainerProps) => {
    const { children } = props;

    return (
        <section className="w-full grid grid-cols-1 relative sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {children}
        </section>
    )
}

export const CardsMovies = (props: PropsCards) => {
    const { id, title, release_date, poster_path, vote_average } = props;

    const { isInWatchlist, handleBookmarkClick } = useBookmark({
        id,
        title,
        release_date,
        poster_path,
        vote_average,
    });

    // Ajustes de fechas para ser mas legible
    const date: Date = new Date(release_date);
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    const formatterDate: string = formatter.format(date);

    // Ajuste de score por puntuacion
    const formatScore = (score: number): number => {
        // Eliminar decimales)
        const truncatedScore = Math.floor(score * 10);

        // Asegurarse de que el resultado esté en el rango [0, 100]
        return Math.min(100, Math.max(0, truncatedScore));
    };

    return (
        <div className="border-solid border-2 rounded-2xl max-w-[180px] shadow-lg mb-8 relative">
            <Link href={`/movies/info/${id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`}
                    width={180}
                    height={273}
                    alt='picture of the movie'
                    className="rounded-t-xl"
                />
            </Link>
            <div className="max-w-max relative">
                <div className="bg-black rounded-full max-w-max p-[3px] absolute top-[-25px] left-2">
                    <CircularProgressBar
                        selectedValue={formatScore(vote_average)}
                        maxValue={100}
                        radius={22}
                        valueFontSize={12}
                        activeStrokeColor='#6800ff'
                        withGradient
                    />
                </div>
            </div>
            <article className="mt-8 pl-2 pb-3">
                <Link
                    className="font-bold text-[#220f3d] hover:text-[#6800ff] cursor-pointer"
                    href={`/movies/info/${id}`}
                >
                    {title}
                </Link>
                <p className="font-light text-sm text-gray-500">{formatterDate}</p>
            </article>
            <div className="flex justify-end w-[95%] absolute bottom-[-10px]">
                <button
                    onClick={handleBookmarkClick}
                    className="max-w-max transition-all duration-200 text-[#3d1b6d] hover:text-[#6800ff] hover:scale-105 cursor-pointer"
                    aria-label="Add whachlist"
                >
                    {isInWatchlist ? <FaBookmark size={30} /> : <FaRegBookmark size={30} />}
                </button>
            </div>
        </div>
    )
}