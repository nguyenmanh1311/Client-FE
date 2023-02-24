import React from "react";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import logo from "../assets/images/logo/baloshop-w.png";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div id="all">
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Sản phẩm không tìm thấy
                    </li>
                  </ol>
                </nav>
                <div id="error-page" className="row">
                  <div className="col-md-6 mx-auto">
                    <div className="box text-center py-5">
                      <p className="text-center">
                        <img src={logo} alt="Obaju template" />
                      </p>
                      <h3>Chúng tôi xin lỗi, sản phẩm không tìm thấy.</h3>
                      <p className="text-center">
                        Vui lòng tiếp tục dùng <strong>form Tìm kiếm</strong>{" "}
                        hoặc <strong>Menu</strong> bên dưới.
                      </p>
                      <p className="buttons">
                        <Link to="/" className="btn btn-primary">
                          <FaHome
                            className="fa fa-home"
                            style={{ marginBottom: "-2px" }}
                          ></FaHome>{" "}
                          Trở về trang chủ
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
