import { FaBookmark } from "react-icons/fa"
import CircularProgressBar from "./circularBarProgress"
// Utils
import { InfoMovie } from "@/utils/movie";

type CardsInfoProps = {
    movie: InfoMovie | null;
}

export const CardsInfo = ({ movie }: CardsInfoProps) => {

    const formatScore = (score: number | undefined): number => {
        if (score === undefined) return 0;
        // Multiplicar por 10 y truncar (eliminar decimales)
        const truncatedScore = Math.floor(score * 10);

        // Asegurarse de que el resultado esté en el rango [0, 100]
        return Math.min(100, Math.max(0, truncatedScore));
    };

    const formatCurrency = (amount: number | undefined): string => {
        if (amount === undefined || amount === 0) return "$0.00"
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <section className="border rounded-md w-[240px] pl-6 pr-4 py-4">
            <h2 className="text-2xl text-[#220f3d]">Details</h2>
            <div className="w-[95%] border border-[#6800ff]" />
            <article className="mt-2">
                <p className="text-lg font-bold text-[#220f3d] mt-4">Status</p>
                <span className="text-base">{movie?.status || 'Released'}</span>

                <p className="text-lg font-bold text-[#220f3d] mt-4">Original Language</p>
                <span>{movie?.original_language || 'EN'}</span>

                <p className="text-lg font-bold text-[#220f3d] mt-4">Budget</p>
                <span>{formatCurrency(movie?.budget)}</span>

                <p className="text-lg font-bold text-[#220f3d] mt-4">Revenue</p>
                <span>{formatCurrency(movie?.revenue)}</span>
            </article>
            <div className="mt-6 flex justify-around items-center">
                <CircularProgressBar
                    selectedValue={formatScore(movie?.vote_average)}
                    maxValue={100}
                    radius={22}
                    valueFontSize={12}
                    activeStrokeColor='#6800ff'
                    withGradient
                />
                <button
                    className="max-w-max transition-all duration-200 text-[#3d1b6d] hover:text-[#6800ff] hover:scale-105 cursor-pointer"
                    aria-label="Agregar a mis favoritos"
                >
                    <FaBookmark size={25} />
                </button>
            </div>
        </section>
    )
}