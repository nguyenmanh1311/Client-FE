import React, { useEffect, useState } from "react";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SidebarProduct from "../components/Sidebar/SidebarProduct";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import { useDataContext } from "../context/DataProvider";

const Product = () => {
  const { productData, setProductData } = useDataContext();

  return (
    <>
      <Header />
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
                    <li aria-current="page" className="breadcrumb-item active">
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
                          <select name="sort-by" className="form-control">
                            <option>Giá</option>
                            <option>Tên</option>
                            <option>Đang sale</option>
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <Pagination itemsPerPage={9} allProduct={productData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
