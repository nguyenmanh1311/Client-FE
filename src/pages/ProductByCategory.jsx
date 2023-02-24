import React, { useEffect, useState } from "react";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import img1 from "../assets/images/products/agva_blue.jpg";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";
import { FaChevronDown } from "react-icons/fa";
import SidebarProduct from "../components/Sidebar/SidebarProduct";
import { Link, useParams } from "react-router-dom";
import { ProductService } from "../services/product.service";
import { useDataContext } from "../context/DataProvider";
import Pagination from "../components/Pagination/Pagination";

const ProductByCategory = () => {
  const { id } = useParams();
  const { productData, setProductData } = useDataContext();

  useEffect(() => {
    let isFetched = true;
    const fetchshowAllProduct = () => {
      ProductService.getProductByCategory(id).then((res) => {
        if (isFetched) {
          setProductData(res.data);
        }
      });
    };

    fetchshowAllProduct();
    return () => {
      isFetched = false;
    };
  }, [id]);

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
              <SidebarProduct cateId={id} />

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

export default ProductByCategory;
