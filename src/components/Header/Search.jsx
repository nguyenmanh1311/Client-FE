import React, { useEffect, useState } from "react";
import "../../styles/Style.scss";
import Footer from "../Footer/Footer";
import Header from "./Header";
import SidebarProduct from "../Sidebar/SidebarProduct";
import { Link, useParams } from "react-router-dom";
import { ProductService } from "../../services/product.service";
import Gallery from "../Gallery/Gallery";
import Error from "../../pages/Error";

const Search = () => {
  const { input } = useParams();
  const [searchProducts, setSearchProducts] = useState([]);
  useEffect(() => {
    let isFetched = true;
    const fetchSearchProduct = () => {
      ProductService.getProductByName(input).then((res) => {
        if (isFetched) {
          setSearchProducts(res.data);
        }
      });
    };

    fetchSearchProduct();
    return () => {
      isFetched = false;
    };
  }, [input]);
  return (
    <>
      <Header />
      {searchProducts.length == 0 && <Error />}
      {searchProducts.length != 0 && (
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
                  <div className="box info-bar">
                    <div className="row">
                      <div className="col-md-12 col-lg-4 products-showing">
                        Hiện <strong>12</strong> trên <strong>25</strong> sản
                        phẩm
                      </div>
                      <div className="col-md-12 col-lg-7 products-number-sort">
                        <form className="form-inline d-block d-lg-flex justify-content-between flex-column flex-md-row">
                          <div className="products-number">
                            <strong>Hiện</strong>
                            <a href="#" className="btn btn-sm btn-primary">
                              12
                            </a>
                            <a
                              href="#"
                              className="btn btn-outline-secondary btn-sm"
                            >
                              24
                            </a>
                            <a
                              href="#"
                              className="btn btn-outline-secondary btn-sm"
                            >
                              All
                            </a>
                            <span>sản phẩm</span>
                          </div>
                          <div className="products-sort-by mt-2 mt-lg-0">
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

                  <div className="row products">
                    {searchProducts.map((item) => {
                      return (
                        <div className="col-lg-4 col-md-6" key={item.id}>
                          <Gallery
                            key={item.id}
                            id={item.id}
                            image={
                              "http://localhost:8080/api/v1/image_product/" +
                              item.image
                            }
                            name={item.name}
                            price={item.price}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="pages">
                    <nav
                      aria-label="Page navigation example"
                      className="d-flex justify-content-center"
                    >
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            href="#"
                            aria-label="Previous"
                            className="page-link"
                          >
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Trước</span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a href="#" className="page-link">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            4
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" className="page-link">
                            5
                          </a>
                        </li>
                        <li className="page-item">
                          <a href="#" aria-label="Next" className="page-link">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Sau</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
