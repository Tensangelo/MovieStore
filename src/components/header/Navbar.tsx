'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Íconos e imágenes
import { FaClipboardList } from "react-icons/fa6";
import LogoMovie from '../../../public/movie.png';
import { RiMovie2AiFill } from "react-icons/ri";

// Estilos reutilizables
const StylesTextNavbar = 'block py-2 px-3 rounded hover:bg-[#3d1b6d] w-full text-center text-[#ffffff] h-[4rem] md:hover:bg-transparent md:p-0 w-[10rem]';
const StylesList = 'hover:bg-[#3d1b6d] w-[10rem]';
const IconSize = 30;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoviesSubmenuOpen, setIsMoviesSubmenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement | null>(null);
    const submenuRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }

            if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
                setIsMoviesSubmenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsMoviesSubmenuOpen(false);
    };

    return (
        <nav className="bg-[#220f3d] w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto relative">
                {/* Logo y enlace a la página principal */}
                <Link href="/" passHref className="text-2xl text-white flex justify-center items-center p-8 hover:bg-[#3d1b6d] rounded-md">
                    <Image
                        src={LogoMovie}
                        width={45}
                        height={45}
                        priority
                        alt="Logo tienda de películas"
                        className="mr-2"
                    />
                    Movie Store
                </Link>

                {/* Botón para abrir el menú en dispositivos móviles */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg text-white md:hidden"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen ? 'true' : 'false'}
                    >
                        <span className="sr-only">Abrir el menú principal</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Enlaces de la barra de navegación */}
                <div ref={menuRef} className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col items-center justify-center p-4 md:p-0 font-medium rounded-lg z-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        {/* Menú desplegable de Películas */}
                        <li className={`${StylesList} relative rounded-md`}>
                            <button
                                onClick={() => setIsMoviesSubmenuOpen(!isMoviesSubmenuOpen)}
                                className={`${StylesTextNavbar} flex justify-center items-center text-xl`}
                                aria-haspopup="true"
                                aria-expanded={isMoviesSubmenuOpen ? 'true' : 'false'}
                            >
                                <RiMovie2AiFill fontSize={IconSize} className="mr-2" />
                                Movies
                            </button>
                            {isMoviesSubmenuOpen && (
                                <ul ref={submenuRef} className="absolute left-0 w-full rounded-bl-lg rounded-br-lg bg-[#220f3d] z-10 md:w-auto">
                                    <li className={`${StylesList}`}>
                                        <Link
                                            href="/movies/popular"
                                            passHref
                                            className={`${StylesTextNavbar} flex justify-center items-center px-4`}
                                            onClick={handleLinkClick}
                                        >
                                            Popular
                                        </Link>
                                    </li>
                                    <li className={`${StylesList}`}>
                                        <Link
                                            href="/movies/now_playing"
                                            passHref
                                            className={`${StylesTextNavbar} flex justify-center items-center px-4`}
                                            onClick={handleLinkClick}
                                        >
                                            Now Playing
                                        </Link>
                                    </li>
                                    <li className={`${StylesList}`}>
                                        <Link
                                            href="/movies/upcoming"
                                            passHref
                                            className={`${StylesTextNavbar} flex justify-center items-center px-4`}
                                            onClick={handleLinkClick}
                                        >
                                            Upcoming
                                        </Link>
                                    </li>
                                    <li className={`${StylesList} rounded-bl-lg rounded-br-lg`}>
                                        <Link
                                            href="/movies/top_rated"
                                            passHref
                                            className={`${StylesTextNavbar} flex justify-center items-center px-4`}
                                            onClick={handleLinkClick}
                                        >
                                            Top Rated
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className={`${StylesList} rounded-md`}>
                            <Link
                                href="/saved"
                                passHref
                                className={`${StylesTextNavbar} flex justify-center items-center text-xl`}
                                onClick={handleLinkClick}
                            >
                                <FaClipboardList className="mr-2" fontSize={IconSize} />
                                Saved (+9)
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
