interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const ComponentPagination = (props: PaginationProps) => {
    const { currentPage, totalPages, onPageChange } = props;

    // Generar los números de las páginas
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    // Manejadores de cambio de página
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center items-center space-x-4">
            {/* Botón de página anterior */}
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
            >
                Anterior
            </button>

            {/* Páginas */}
            <div className="flex space-x-2">
                {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-md ${
                    currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {page}
                </button>
                ))}
            </div>

            {/* Botón de página siguiente */}
            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md disabled:bg-gray-200"
            >
                Siguiente
            </button>
        </div>
    )
}