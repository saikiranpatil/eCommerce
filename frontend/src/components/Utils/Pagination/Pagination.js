import React from 'react'

const Pagination = ({ totalPages, currentPage, setThisPage }) => {

    const paginationPageNumber = () => {
        var result = [];
        for (let i = 1; i <= totalPages; i++) {
            result.push(
                <li key={i} className={"page-item" + (currentPage === i ? " active" : "")}>
                    <span className="page-link">
                        {i}
                        {currentPage === i ? (<span className="sr-only">(current)</span>) : ""}
                    </span>
                </li>
            )
        }
        return result
    }

    const setThisPageFunction = (page) => {
        if (page >= 1 && page <= totalPages) {
            setThisPage(page);
        }
    }

    return (
        <nav aria-label="..." className="my-3">
            <ul className="pagination justify-content-center">
                <li className={"page-item" + (currentPage === 1 ? ' disabled' : "")} onClick={() => { setThisPageFunction(currentPage - 1) }}>
                    <span className="page-link">Previous</span>
                </li>
                {paginationPageNumber()}
                <li className={"page-item" + (currentPage === totalPages ? ' disabled' : "")} onClick={() => { setThisPageFunction(currentPage + 1) }}>
                    <span className="page-link" href="#">Next</span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination