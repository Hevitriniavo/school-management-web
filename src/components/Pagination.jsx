import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function Pagination({
                        totalPage,
                        currentPage,
                        onChangePage,
                        onChangeSize,
                        sizes = [5, 10, 20],
                        sides = 1,
                        btnClassName = "",
                        sizeClassName = "",
                        btnCurrentClass = "bg-gray-300 dark:bg-[#424242] shadow-lg",
                        btnSearchClass = ""
                    }) {
    const [pageInput, setPageInput] = useState(currentPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPage) {
            onChangePage(newPage);
            setPageInput(newPage);
        }
    };

    const handleSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        onChangeSize(newSize);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlePageChange(Number(pageInput));
        }
    };

    const handleInputBlur = () => {
        handlePageChange(Number(pageInput));
    };

    const handleInputChange = (event) => {
        const value = Math.min(Math.max(parseInt(event.target.value, 10), 1), totalPage);
        setPageInput(value);
    };

    const getVisiblePages = () => {
        const pageArray = [];
        const leftSide = Math.max(1, currentPage - sides);
        const rightSide = Math.min(totalPage, currentPage + sides);

        if (leftSide > 1) {
            pageArray.push(1);
            if (leftSide > 2) {
                pageArray.push("...");
            }
        }

        for (let i = leftSide; i <= rightSide; i++) {
            pageArray.push(i);
        }

        if (rightSide < totalPage) {
            if (rightSide < totalPage - 1) {
                pageArray.push("...");
            }
            pageArray.push(totalPage);
        }

        return pageArray;
    };

    const renderPageButtons = () => {
        return getVisiblePages().map((page, index) => (
            <button
                key={index}
                className={`px-3 py-2 border rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${page === currentPage ? btnCurrentClass : 'bg-gray-200 dark:bg-[#1b1b1f] hover:bg-gray-300 text-gray-700 dark:text-gray-300'} ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                disabled={page === '...'}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
            >
                {page}
            </button>
        ));
    };

    const renderPagination = () => {
        return (
            <div className="flex items-center justify-between space-x-4 p-4 bg-white dark:bg-transparent rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                    <button
                        className={`dark:bg-[#161618] px-3 py-2 bg-gray-200 dark:hover:bg-[#202127] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${btnClassName}`}
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <ArrowLeft />
                    </button>

                   <div className="flex flex-row gap-2">
                       {renderPageButtons()}
                   </div>

                    <button
                        className={`dark:bg-[#161618] px-3 py-2 bg-gray-200 dark:hover:bg-[#202127] rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${btnClassName}`}
                        disabled={currentPage === totalPage}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <ArrowRight />
                    </button>
                </div>

                <div className="flex items-center">
                    <select
                        className={`p-2 border rounded-md dark:bg-[#202127] outline-none ${sizeClassName}`}
                        onChange={handleSizeChange}
                        defaultValue={sizes[0]}
                    >
                        {sizes.map((size) => (
                            <option key={size} value={size}>
                                {size} / page
                            </option>
                        ))}
                    </select>

                    <span className="text-gray-700 dark:text-gray-300 mx-2">Allez à</span>

                    <input
                        type="number"
                        className={`dark:bg-[#202127] border outline-none p-2 rounded-md w-16 text-center ${btnSearchClass}`}
                        value={pageInput}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyPress}
                        min={1}
                        max={totalPage}
                    />
                </div>
            </div>
        );
    };

    return renderPagination();
}

export default Pagination;
