'use client'
import { ReactNode } from "react";
// Icons
import { FaStar } from "react-icons/fa";
// Slide
import "swiper/css";
import { Swiper } from "swiper/react";

interface PropsSlider {
    title: string;
    children: ReactNode;
}

export const SliderHorizontal = (props: PropsSlider) => {
    const { title, children } = props;

    return (
        <div className="w-[85%] max-w-[1920px] lg:w-[75%]">
            <h2 className="text-2xl font-bold inline-flex items-center text-[#220f3d]">
                <FaStar color="#6800ff" className="mr-2" />
                {title}
            </h2>

            <div className="w-[95%] border border-[#6800ff]" />

            <Swiper
                freeMode={true}
                loop={true}
                className="mt-4"
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    '@1.00': {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    '@1.50': {
                        slidesPerView: 3,
                        spaceBetween: 280,
                    },
                    '@2.00': {
                        slidesPerView: 4,
                        spaceBetween: 320,
                    },
                }}
            >
                {children}
            </Swiper>
        </div>
    )
}