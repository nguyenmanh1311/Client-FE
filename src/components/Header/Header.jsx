import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import "../../styles/Style.scss";
import "./Header.scss";
import logo from "../../assets/images/logo/baloshop-black.png";

import { FaShoppingCart } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { GoPerson } from "react-icons/go";
import { CategoryService } from "../../services/category.service";
import { BrandService } from "../../services/brand.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal2 from "sweetalert2";
import { AuthService } from "../../services/auth.service";
import SearchList from "../Search/SearchList";

const Header = () => {
  const navigate = useNavigate();
  const [allBrand, setAllBrand] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [user, setUser] = useState([]);
  const logoutOnclick = async () => {
    swal2
      .fire({
        title: "Bạn có chắc không?",
        showDenyButton: true,
        confirmButtonText: "Có",
        denyButtonText: "Không",
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          AuthService.logout();
          window.location.reload();
        } else if (result.isDenied) {
        }
      });
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      searchInput.toString().trim() !== "" &&
      searchInput.toString().trim() !== null
    ) {
      navigate(`/search/${searchInput}`);
    }
  };

  const onClickSearch = () => {
    if (
      searchInput.toString().trim() !== "" &&
      searchInput.toString().trim() !== null
    ) {
      navigate(`/search/${searchInput}`);
    }
  };

  const onClickBasket = () => {
    if (localStorage.getItem("accessToken") == null) {
      navigate("/login");
    } else {
      navigate("/basket");
    }
  };

  useEffect(() => {
    let isFetched = true;
    const fetchshowAllCategory = () => {
      CategoryService.getAllCategory().then((res) => {
        if (isFetched) {
          setAllCategory(res.data);
        }
      });
    };

    const fetchshowAllBrand = () => {
      BrandService.getAllBrand().then((res) => {
        if (isFetched) {
          setAllBrand(res.data);
        }
      });
    };

    const accessToken = localStorage?.getItem("accessToken");
    if (accessToken) {
      const fetchProfile = () => {
        AuthService.getProfile().then((res) => {
          if (res.status_code === 200) {
            setUser(res.data);
          }
        });
      };
      fetchProfile();
    }

    fetchshowAllBrand();
    fetchshowAllCategory();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand home">
            <img
              src={logo}
              alt="BaloSG"
              className="d-none d-md-inline-block logo"
            />
          </Link>

          <div id="navigation" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link ">
                  Trang chủ
                </Link>
              </li>

              <li className="nav-item dropdown menu-large">
                <Link
                  to="/product"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-delay="200"
                  className="dropdown-toggle nav-link"
                >
                  Loại Balo<b className="caret"></b>
                </Link>
                <ul className="dropdown-menu menu-product megamenu">
                  <li>
                    <div className="row">
                      <ul className="list-unstyled">
                        {allCategory.map((item) => {
                          return (
                            <li className="nav-item" key={item.id}>
                              <a
                                href={`/product/category/${item.id}`}
                                className="nav-link"
                              >
                                {item.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown menu-large">
                <Link
                  to="/product"
                  data-toggle="dropdown"
                  data-hover="dropdown"
                  data-delay="200"
                  className="dropdown-toggle nav-link"
                >
                  Thương Hiệu<b className="caret"></b>
                </Link>
                <ul className="dropdown-menu menu-brand megamenu ">
                  <li>
                    <div className="row">
                      <ul className="list-unstyled">
                        {allBrand.map((item) => {
                          return (
                            <li className="nav-item" key={item.id}>
                              <a
                                href={`/product/brand/${item.id}`}
                                className="nav-link"
                              >
                                {item.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/posts" className="nav-link">
                  Tin tức
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Liên hệ
                </Link>
              </li>
            </ul>
            <div className="navbar-buttons d-flex justify-content-end">
              {/* <div className="d-flex flex-column"> */}
              <div className="input-form">
                <input
                  id="input-search"
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Tìm kiếm"
                  onChange={(e) => searchItems(e.target.value)}
                />

                <button
                  id="btn-search"
                  className="btn navbar-btn d-flex justify-content-center align-items-center"
                  onClick={onClickSearch}
                >
                  <ImSearch
                    size={16}
                    style={{ textAlign: "center" }}
                    color="white"
                    className="fa fa-search"
                  ></ImSearch>
                </button>

                {/* <Search /> */}
              </div>
              {/* {searchInput.length !== 0 && <SearchList />} */}
              {/* </div> */}

              <div
                id="basket-overview"
                className="navbar-collapse collapse d-none d-lg-block"
                onClick={onClickBasket}
              >
                <Link to={""} className="btn btn-lg navbar-btn">
                  <FaShoppingCart className="fa fa-shopping-cart d-flex align-items-center" />{" "}
                  <span></span>
                </Link>
              </div>
              {!localStorage.getItem("accessToken") && (
                <>
                  <div className="dropdown navbar-collapse collapse d-none d-lg-block">
                    <div
                      className="btn btn-lg navbar-btn"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <GoPerson
                        className="fa fa-person d-flex align-items-center"
                        style={{ marginBottom: "-2px" }}
                      />
                    </div>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link to={"/login"} className="dropdown-item">
                        Đăng nhập
                      </Link>
                    </div>
                  </div>
                </>
              )}
              {localStorage.getItem("accessToken") && (
                <div className="text-white d-flex align-items-center">
                  <div className="dropdown">
                    <div
                      className="rounded-circle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={user.avatar ? "https://" + user.avatar : ""}
                        className="rounded-circle "
                        style={{ height: "25px" }}
                        alt="..."
                      />
                    </div>
                    <div
                      className="dropdown-menu menu-account megamenu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link to={"/account"} className="dropdown-item">
                        Thông tin tài khoản
                      </Link>
                      <hr width="100%" size="1px" />
                      <Link
                        to={""}
                        className="d-flex align-items-center dropdown-item"
                      >
                        <div onClick={logoutOnclick}>Đăng xuất</div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
