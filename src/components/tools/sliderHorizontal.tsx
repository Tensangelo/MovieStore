'use client'
import { ReactNode } from "react";
// Icons
import { FaStar } from "react-icons/fa";
// Slide
import "swiper/css";
import { Swiper } from "swiper/react";

interface PropsSlider {
    title: string;
    spaceBetween: number;
    slidesPerView: number;
    children: ReactNode;
}

export const SliderHorizontal = (props: PropsSlider) => {
    const { title, spaceBetween, slidesPerView, children } = props;

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
                {children}
            </Swiper>
        </div>
    )
}