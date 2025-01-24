import { JSX } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

// Estilos base para los textos
const stylesTextFilters = "font-bold text-base text-[#220f3d]";
const stylesSeprator = "bg-gray-200 w-full h-[1px] block my-2";

const FilterCard = ({ title, icon }: { title: string, icon: JSX.Element }) => (
    <div className="border rounded-lg shadow-md w-full px-3 py-4 flex justify-between items-center">
        <p className={stylesTextFilters}>{title}</p>
        {icon}
    </div>
);

const GenreTags = () => (
    <div className="mt-4 flex flex-wrap gap-2">
        {['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Tv Movie', 'Thriller', 'War', 'Western'].map((genre) => (
            <span key={genre} className="border border-[#220f3d] text-[#220f3d] rounded-full px-4 py-2">
                {genre}
            </span>
        ))}
    </div>
);

const FilterForm = () => (
    <article>
        <p className="text-gray-500">Show Me</p>
        <form>
            {['Everything', 'Movies I Haven\'t Seen', 'Movies I Have Seen'].map((option, index) => (
                <div key={index} className="mt-1 flex items-center">
                    <input className="mr-2" type="radio" defaultChecked={index === 0} readOnly aria-label={option} />
                    <span>{option}</span>
                </div>
            ))}
            <span className={stylesSeprator} />

            <p className="text-gray-500">Availabilities</p>
            <div className="mt-1 flex items-center">
                <input className="mr-2" type="checkbox" defaultChecked aria-label="Search all availabilities" />
                <span>Search all availabilities?</span>
            </div>
            <span className={stylesSeprator} />

            <p className="text-gray-500">Release Dates</p>
            <div className="mt-1 flex items-center">
                <input className="mr-2" type="checkbox" defaultChecked readOnly aria-label="Search all releases" />
                <span>Search all releases?</span>
            </div>
        </form>
    </article>
);

export const SqueletonFilter = () => {
    return (
        <section className="space-y-4 w-[260px] hidden xl:block">
            <div className="flex flex-col gap-4 justify-start">
                <FilterCard title="Sort" icon={<MdArrowForwardIos size={20} color="#220f3d" />} />
                <FilterCard title="Where to watch" icon={<MdArrowForwardIos size={20} color="#220f3d" />} />
            </div>
            <div className="border rounded-lg shadow-md w-full px-3 py-4">
                <div className="flex justify-between items-center">
                    <p className={stylesTextFilters}>Filters</p>
                    <IoIosArrowDown size={22} color="#220f3d" />
                </div>
                <span className={stylesSeprator} />

                <FilterForm />

                <span className={stylesSeprator} />
                <p className="text-gray-500 mt-2">Genres</p>

                <GenreTags />
            </div>
        </section>
    );
};
