import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingSpinnerSmall = () => {
    return (
        <div className={`flex justify-center items-center w-[98.5%] h-[20vh] bg-gray-50 rounded-lg`}>
            <AiOutlineLoading3Quarters className="text-4xl animate-spin" color="#6800ff" />
        </div>
    )
}

export const LoadingSpinnerBig = () => {
    return (
        <div className={`flex justify-center items-center w-[98.5%] h-[65.5vh] bg-gray-50 rounded-lg`}>
            <AiOutlineLoading3Quarters className="text-4xl animate-spin" color="#6800ff" />
        </div>
    )
}