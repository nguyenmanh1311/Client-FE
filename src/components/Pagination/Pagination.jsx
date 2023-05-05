import ReactPaginate from "react-paginate";
import ItemPerPage from "./ItemPerPage";
import { useDataContext } from "../../context/DataProvider";
import "./Pagination.scss";

const Pagination = ({ pageCount, productData }) => {
  const { setCurrentPageNumber } = useDataContext();

  const handlePageClick = (event) => {
    setCurrentPageNumber(event.selected + 1);
  };
  return (
    <>
      <ItemPerPage currentItems={productData} />
      {pageCount > 1 && (
        <ReactPaginate
          className="pagination-item "
          breakLabel="..."
          nextLabel="►"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="◄"
          renderOnZeroPageCount={null}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </>
  );
};
export default Pagination;
