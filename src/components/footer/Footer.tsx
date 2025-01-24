import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { TbUfo } from "react-icons/tb";

const Footer = () => {
    return (
        <footer className="bg-[#220f3d] text-white pt-8">
            <article className="flex justify-center items-center flex-col">
                <p className="font-semibold">Prueba tecnica realizada por: </p>
                <Link
                    href='https://portfolio-ang.vercel.app/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className="text-lg mt-2 mb-4 underline font-bold flex items-center justify-center transition ease-in-out hover:italic hover:scale-110"
                >
                    <TbUfo className="text-3xl mr-2" />
                    Angelo Gaona Ramirez
                </Link>
            </article>
            <div className="flex justify-center items-center flex-col">
                <Link
                    href="https://github.com/Tensangelo/Technical-Jelou/tree/main"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex justify-center items-center'
                >
                    <p className="text-2xl transition ease-in-out hover:italic hover:underline hover:scale-110 flex items-center justify-center my-2">
                        <FaGithub className='mr-2' />
                        GitHub
                    </p>
                </Link>
                <p className="mt-4 mb-2">Todos los derechos reservados</p>
            </div>
        </footer>
    )
}

export default Footer;