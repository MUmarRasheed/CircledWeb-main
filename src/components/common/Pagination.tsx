import "./pagination.scss";

function getPageNumbers(count: number, current: number, resultSetSize = 12) {
  let pageNumbers: number[] = [];

  let i = 1;
  let lastPage = Math.ceil(count / resultSetSize);

  for (; i <= Math.min(lastPage, 3); i++) {
    pageNumbers.push(i);
  }

  if (i < current) pageNumbers.push(-1);

  i = Math.max(i, current);
  if (i === current) {
    pageNumbers.push(i);
    i++;
  }

  if (i + 2 < lastPage) pageNumbers.push(-1);

  i = Math.max(i, lastPage - 2);

  for (; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
}

function Pagination({
  totalPages,
  currentPage,
  totalDocs,
  setSize = 12,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  totalDocs: number;
  onPageChange: (page: number) => void;
  setSize?: number;
}) {
  return (
    <div className="pagination-container flex ">
      {currentPage > 1 && (
        <button
          type="button"
          className="outline-btn "
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}

      {getPageNumbers(totalDocs, currentPage, setSize).map((page, i) => {
        if (page === -1) {
          return <span key={"page-btn-" + i}>...</span>;
        }
        return (
          <button
            key={"page-btn-" + i}
            onClick={() => onPageChange(parseInt(page.toString()))}
            className={"outline-btn " + (page === currentPage ? "active" : "")}
          >
            {page}
          </button>
        );
      })}

      {currentPage < totalPages && (
        <button
          type="button"
          className="outline-btn "
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
