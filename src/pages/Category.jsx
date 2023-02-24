import React, { useEffect, useState } from "react";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import img1 from "../assets/images/products/agva_blue.jpg";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";
import { FaChevronDown } from "react-icons/fa";
import SidebarProduct from "../components/Sidebar/SidebarProduct";
import { Link } from "react-router-dom";
import { ProductService } from "../services/product.service";
import Pagination from "../components/Pagination/Pagination";
import { useDataContext } from "../context/DataProvider";

const Category = () => {
  const [allProduct, setAllProduct] = useState([]);
  const { productData, setProductData } = useDataContext();

  useEffect(() => {
    let isFetched = true;
    const fetchshowAllProduct = () => {
      ProductService.getAllProduct().then((res) => {
        if (isFetched) {
          setAllProduct(res.data);
        }
      });
    };

    fetchshowAllProduct();
    return () => {
      isFetched = false;
    };
  }, []);

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
                {/* <div className="row products">
                  {allProduct.map((item) => {
                    return (
                      <div className="col-lg-4 col-md-6" key={item.id}>
                        <Gallery
                          id={item.id}
                          image={
                            "http://localhost:8080/api/v1/image_product/" +
                            item.image
                          }
                          name={item.name}
                          price={item.price}
                          discount={item.discount}
                        />
                      </div>
                    );
                  })}
                </div> */}
                <Pagination itemsPerPage={9} allProduct={allProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;
