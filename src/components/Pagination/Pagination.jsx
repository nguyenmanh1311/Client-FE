import ReactPaginate from "react-paginate";
import { useState } from "react";
import ItemPerPage from "./ItemPerPage";

const Pagination = ({ itemsPerPage, allProduct }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = allProduct.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(allProduct.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allProduct.length;

    setItemOffset(newOffset);
  };
  return (
    <>
      <ItemPerPage currentItems={currentItems} />
      {allProduct.length > 8 && (
        <ReactPaginate
          className="pagination-item"
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
