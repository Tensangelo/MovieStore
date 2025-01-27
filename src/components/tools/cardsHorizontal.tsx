import Image from "next/image";

interface CardsHorizontalProps {
    idMovie: number;
    image: string;
    title: string;
    subtitle: string;
    infoAlt: string;
}

export const CardsHorizontal = (infoProps: CardsHorizontalProps) => {
    const {
        image,
        title,
        subtitle,
        infoAlt,
    } = infoProps;

    return (
        <div className={`w-[220px] h-max flex justify-center items-center flex-wrap flex-col m-auto my-8 py-4 border rounded-lg shadow-md shadow-[#6800ff] relative lg:flex-nowrap lg:shadow md:flex-row lg:p-0 lg:w-[350px] lg:h-[175px] lg:justify-start`}>
            <picture className="w-[138px] h-[175px]">
                <Image
                    src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${image}`}
                    width={138}
                    height={175}
                    alt={infoAlt}
                    className="h-full rounded-tl-lg rounded-bl-lg"
                />
            </picture>
            <article className="ml-4 mr-8 py-5 w-[175px]">
                <p className="text-lg font-bold text-[#220f3d] truncate">
                    {title}
                </p>
                <p className="text-base text-gray-500 truncate">{subtitle}</p>
            </article>
        </div>
    )
}