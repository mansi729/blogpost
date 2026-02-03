import "./Pagination.css";

const Pagination=({currentPage,totalPages,onPrev,onNext,postsPerPage,onPostsPerPageChange})=> {
    return (
      <div className="pagination">
        <select
        value={postsPerPage}
        onChange={(e) => onPostsPerPageChange(e.target.value)}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>75</option>
          <option>100</option>
        </select>
        <button className="page-btn"
        onClick={onPrev}
        disabled={currentPage == 1}
        >
          PREV
        </button>
  
        <label className="page-info">
         {currentPage} of {totalPages}
        </label>
  
        <button className="page-btn"
         onClick={onNext}
         disabled={currentPage === totalPages}
        >
          NEXT
        </button>
      </div>
    );
  }
  export default Pagination;
  