'use client'
import Image from "next/image";
// Icons
import { FaStar } from "react-icons/fa";
// Slide
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// Utils
import { CastMovie } from "@/utils/movie";

interface PropsSlider {
    title: string;
    spaceBetween: number;
    slidesPerView: number;
}

interface PropsCast {
    cast: CastMovie | null;
}

export const SliderHorizontal = (props: PropsSlider & PropsCast) => {
    const { title, spaceBetween, slidesPerView, cast } = props;

    console.log(cast?.cast);

    return (
        <div className="max-w-[70%]">
            <h2 className="text-2xl font-bold inline-flex items-center text-[#220f3d]">
                <FaStar color="#6800ff" className="mr-2" />
                {title}
            </h2>

            <div className="w-[95%] border border-[#6800ff]" />

            <Swiper
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                freeMode={true}
                loop={true}
                className="mt-4"
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    }
                }}
            >
                {cast?.cast.slice(0, 9).map((info) => {
                    return (
                        <SwiperSlide key={info.id}>
                            <div className="flex justify-start items-center mt-4 border rounded-lg shadow-md w-[350px]">
                                <picture>
                                    <Image
                                        src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${info.profile_path}`}
                                        width={138}
                                        height={175}
                                        alt="Photo actor"
                                        className="h-[175px] rounded-tl-lg rounded-bl-lg"
                                    />
                                </picture>
                                <div className="ml-4 mr-8 max-w-[170px]">
                                    <p className="text-lg font-bold">
                                        {info.name}
                                    </p>
                                    <span className="text-base font-light">{info.character}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}