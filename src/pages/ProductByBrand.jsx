import React, { useEffect } from "react";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SidebarProduct from "../components/Sidebar/SidebarProduct";
import { Link, useParams } from "react-router-dom";
import { ProductService } from "../services/product.service";
import Pagination from "../components/Pagination/Pagination";
import { useDataContext } from "../context/DataProvider";

const ProductByBrand = () => {
  const { id } = useParams();
  const { productData, setProductData } = useDataContext();
  const { currentPageNumber, setCurrentPageNumber } = useDataContext();
  const { categories } = useDataContext();
  const { brands, setBrands } = useDataContext();

  const { minPrice } = useDataContext();
  const { maxPrice } = useDataContext();
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
    setBrands(() => {
      return [id];
    });
  }, []);
  useEffect(() => {
    let isFetched = true;
    const fetchshowAllProduct = () => {
      const data = {
        page_count: 9,
        order_by: orderBy,
        page: currentPageNumber,
        brand_id: brands.join(","),
        category_id: categories.join(","),
        max_price: maxPrice,
        min_price: minPrice,
      };
      ProductService.getAllProduct(data).then((res) => {
        if (isFetched) {
          setProductData(res.data);
          const pageCountRounded = Math.ceil(res.total_count / res.page_size);
          setPageCount(pageCountRounded);
        }
      });
    };

    fetchshowAllProduct();
    return () => {
      isFetched = false;
    };
  }, [currentPageNumber, categories, brands, maxPrice, minPrice, id, orderBy]);

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
              <SidebarProduct brand_id={id} />

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
      <Footer />
    </>
  );
};

export default ProductByBrand;
