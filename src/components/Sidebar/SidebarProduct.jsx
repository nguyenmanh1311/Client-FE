import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { BrandService } from "../../services/brand.service";
import { CategoryService } from "../../services/category.service";
import { ProductService } from "../../services/product.service";
// import "../../styles/Style.scss";
import "./Sidebar.scss";

const SidebarProduct = ({ cateId }) => {
  let isFetched = true;
  const [allBrand, setAllBrand] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const { setProductData } = useDataContext();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999999999);
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const fetchshowAllProduct = () => {
    const data = {
      brandIds: brands,
      categoryIds: categories,
      maxPrice: maxPrice,
      minPrice: minPrice,
    };
    ProductService.getProductByFilter(data).then((res) => {
      if (res?.status === "OK") {
        setProductData(res.data);
      }
    });
  };
  useEffect(() => {
    if (isFetched) {
      fetchshowAllProduct();
    }
    return () => {
      isFetched = false;
    };
  }, [categories, brands]);

  useEffect(() => {
    const fetchshowAllCategory = () => {
      CategoryService.getAllCategory().then((res) => {
        setAllCategory(res.data);
      });
    };

    const fetchshowAllBrand = () => {
      BrandService.getAllBrand().then((res) => {
        setAllBrand(res.data);
      });
    };
    if (isFetched) {
      fetchshowAllBrand();
      fetchshowAllCategory();
    }

    return () => {
      isFetched = false;
    };
  }, []);
  let input = {
    categoryId: Number(cateId),
    branchId: null,
  };

  const applyFilterPriceHandleClick = () => {
    setMinPrice(Number(minPriceRef.current.value));
    setMaxPrice(Number(maxPriceRef.current.value));
    const data = {
      brandIds: brands,
      categoryIds: categories,
      maxPrice: Number(maxPriceRef.current.value),
      minPrice: Number(minPriceRef.current.value),
    };
    ProductService.getProductByFilter(data).then((res) => {
      if (res?.status === "OK") {
        setProductData(res.data);
      }
    });
  };
  return (
    <div className="col-lg-3">
      <div className="card sidebar-menu mb-4">
        <div className="card-header">
          <h3 className="h4 card-title">Bộ lọc</h3>
        </div>
        <div className="card-body">
          <ul className="nav nav-pills flex-column category-menu">
            <li>
              <Link to={``} className="nav-link">
                Loại balo
              </Link>
              <div className="form-group" style={{ paddingLeft: "16px" }}>
                {allCategory.map((item) => {
                  return (
                    <div
                      className="checkbox d-flex justify-content-start"
                      key={item.id}
                    >
                      <label className="container d-flex align-items-center">
                        <input
                          type="checkbox"
                          value={item.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCategories((pre) => {
                                return [...pre, Number(e.target.value)];
                              });
                            } else {
                              setCategories((pre) => {
                                return pre.filter(
                                  (item) => item !== Number(e.target.value)
                                );
                              });
                            }
                          }}
                        />{" "}
                        <span className="checkmark"></span>
                        <div>{item.name}</div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </li>
            <hr width="100%" size="5px" />
            <li>
              <Link to={``} className="nav-link">
                Thương hiệu{" "}
              </Link>
              <div className="form-group" style={{ paddingLeft: "16px" }}>
                {allBrand.map((item) => {
                  return (
                    <div
                      className="checkbox d-flex justify-content-between"
                      key={item.id}
                    >
                      <label className="container d-flex align-items-center">
                        <input
                          type="checkbox"
                          value={item.id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBrands((pre) => {
                                return [...pre, Number(e.target.value)];
                              });
                            } else {
                              setBrands((pre) => {
                                return pre.filter(
                                  (item) => item !== Number(e.target.value)
                                );
                              });
                            }
                          }}
                        />{" "}
                        <span className="checkmark"></span>
                        <div>{item.name}</div>
                      </label>
                    </div>
                  );
                })}
              </div>
              <hr width="100%" size="5px" />
              <div className="apply-container">
                <Link
                  to={``}
                  className="nav-link d-flex justify-content-center"
                >
                  Giá
                </Link>
                <div className="d-flex flex-column d-flex justify-content-center align-items-center">
                  <div className="d-flex justify-content-between align-items-center ml-2 mr-2">
                    Từ
                    <input
                      className="col-lg-9"
                      type="number"
                      ref={minPriceRef}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center ml-2 mr-2">
                    Đến
                    <input
                      className="col-lg-9 mt-2"
                      type="number"
                      ref={maxPriceRef}
                    />
                  </div>
                </div>
                <br />
                <button className="btn" onClick={applyFilterPriceHandleClick}>
                  <FaPenFancy
                    className="fa fa-pencil"
                    style={{ marginBottom: "-2px" }}
                  ></FaPenFancy>{" "}
                  Áp dụng
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarProduct;
