import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface PropsStyle {
    widthLoading?: string;
    heightLoading?: string;
}

export const Loading = ({ widthLoading = '98.5%', heightLoading = '20vh' }: PropsStyle) => {
    return (
        <div
            className={`flex justify-center items-center w-[98.5%] h-[20vh] bg-gray-50 rounded-2xl`}
            style={{ width: widthLoading, height: heightLoading }}
        >
            <AiOutlineLoading3Quarters className="text-4xl animate-spin" color="#6800ff" />
        </div>
    )
}