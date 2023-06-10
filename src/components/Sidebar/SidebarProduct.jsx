import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { BrandService } from "../../services/brand.service";
import { CategoryService } from "../../services/category.service";
// import "../../styles/Style.scss";
import "./Sidebar.scss";

const SidebarProduct = ({ category_id, brand_id }) => {
  const [allBrand, setAllBrand] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const { color, setColor } = useDataContext();
  const { categories, setCategories } = useDataContext();
  const { brands, setBrands } = useDataContext();
  const { minPrice, setMinPrice } = useDataContext();
  const { maxPrice, setMaxPrice } = useDataContext();
  const { currentPageNumber } = useDataContext();
  const { orderBy } = useDataContext();
  const { pageCount } = useDataContext();

  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  let isFetched = true;

  useEffect(() => {
    return () => {
      isFetched = false;
    };
  }, [
    categories,
    brands,
    color,
    minPrice,
    maxPrice,
    currentPageNumber,
    orderBy,
    pageCount,
  ]);

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

  const applyFilterPriceHandleClick = () => {
    setMinPrice(
      Number(minPriceRef.current.value) == 0
        ? null
        : Number(minPriceRef.current.value)
    );
    setMaxPrice(
      Number(maxPriceRef.current.value) == 0
        ? null
        : Number(maxPriceRef.current.value)
    );
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
                          defaultChecked={item.id === category_id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCategories((pre) => {
                                return [...pre, e.target.value];
                              });
                            } else {
                              setCategories((pre) => {
                                return pre.filter(
                                  (item) => item !== e.target.value
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
                Màu sắc
              </Link>
              <div className="form-group" style={{ paddingLeft: "16px" }}>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={101}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Đen</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={102}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Xám</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={103}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Trắng</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={104}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Đỏ</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={105}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Vàng</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={106}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Cam</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={107}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Xanh dương</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={108}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Xanh lá</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={109}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Nâu</div>
                  </label>
                </div>
                <div className="checkbox d-flex justify-content-start">
                  <label className="container d-flex align-items-center">
                    <input
                      type="checkbox"
                      value={110}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColor((pre) => {
                            return [...pre, e.target.value];
                          });
                        } else {
                          setColor((pre) => {
                            return pre.filter(
                              (item) => item !== e.target.value
                            );
                          });
                        }
                      }}
                    />{" "}
                    <span className="checkmark"></span>
                    <div>Hồng</div>
                  </label>
                </div>
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
                          defaultChecked={item.id === brand_id}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBrands((pre) => {
                                return [...pre, e.target.value];
                              });
                            } else {
                              setBrands((pre) => {
                                return pre.filter(
                                  (item) => item !== e.target.value
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
            <div className="apply-container">
              <Link to={``} className="nav-link d-flex justify-content-center">
                Giá
              </Link>
              <div className="d-flex flex-column d-flex justify-content-center align-items-center">
                <div className="d-flex justify-content-between align-items-center ml-2 mr-2">
                  Từ
                  <input className="col-lg-9" type="number" ref={minPriceRef} />
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarProduct;
