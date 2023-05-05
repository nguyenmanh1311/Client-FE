import React, { useEffect, useState } from "react";
import "../../styles/Style.scss";
import Footer from "../Footer/Footer";
import Header from "./Header";
import SidebarProduct from "../Sidebar/SidebarProduct";
import { Link, useParams } from "react-router-dom";
import { ProductService } from "../../services/product.service";
import Gallery from "../Gallery/Gallery";
import Error from "../../pages/Error";
import { useDataContext } from "../../context/DataProvider";
import Pagination from "../Pagination/Pagination";

const Search = () => {
  const { input } = useParams();
  const { productData, setProductData } = useDataContext();
  const { currentPageNumber, setCurrentPageNumber } = useDataContext();
  const { orderBy, setOrderBy } = useDataContext();
  const { pageCount, setPageCount } = useDataContext();

  const onChangeFilter = (event) => {
    var value = event.target.value;
    if (value === "1") {
      setOrderBy("Price");
      setCurrentPageNumber(1);
    } else if (value === "2") {
      setOrderBy("Price desc");
      setCurrentPageNumber(1);
    } else if (value === "3") {
      setOrderBy("Name");
      setCurrentPageNumber(1);
    } else if (value === "4") {
      setOrderBy("Name desc");
      setCurrentPageNumber(1);
    }
  };

  useEffect(() => {
    let isFetched = true;
    const fetchSearchProduct = () => {
      const data = {
        page_count: 9,
        order_by: orderBy,
        page: currentPageNumber,
        name: input,
      };
      ProductService.getProductByName(data).then((res) => {
        if (isFetched) {
          setProductData(res.data);
          const pageCountRounded = Math.ceil(res.total_count / res.page_size);
          setPageCount(pageCountRounded);
        }
      });
    };

    fetchSearchProduct();
    return () => {
      isFetched = false;
    };
  }, [input, currentPageNumber, orderBy]);
  return (
    <>
      <Header />
      {productData.length == 0 && <Error />}
      {productData.length != 0 && (
        <div id="all">
          <div id="content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={`/`}>Trang chủ</Link>
                      </li>
                      <li
                        aria-current="page"
                        className="breadcrumb-item active"
                      >
                        Sản phẩm
                      </li>
                    </ol>
                  </nav>
                </div>
                <SidebarProduct />
                <div className="col-lg-9">
                  <div className="info-bar">
                    <div className="sort">
                      <div className="products-number-sort">
                        <form className="form-inline">
                          <div className="products-sort-by">
                            <strong>Sắp xếp theo</strong>
                            <select
                              name="sort-by"
                              className="form-control"
                              onChange={onChangeFilter}
                            >
                              <option value="1">Giá tăng dần</option>
                              <option value="2">Giá giảm dần</option>
                              <option value="3">Tên A - Z</option>
                              <option value="4">Tên Z - A</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <Pagination pageCount={pageCount} productData={productData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Search;
