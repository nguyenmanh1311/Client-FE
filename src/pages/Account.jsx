import React, { useState } from "react";
import "../styles/Style.scss";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

import { RiSave3Fill } from "react-icons/ri";
import SidebarCustomer from "../components/Sidebar/SidebarCustomer";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";
import swal from "sweetalert2";

const Account = () => {
  const [oldPass, setOldPasss] = useState("");
  const [newPass, setNewPasss] = useState("");
  const [confirmPass, setConfirmPasss] = useState("");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const saveOnClick = () => {
    if (newPass === confirmPass) {
      AuthService.changePassword(userId, oldPass, newPass).then((res) => {
        if (res.status === "OK") {
          swal.fire("Thông báo", "Đổi mật khẩu thành công", "success");
          window.location.reload();
        } else {
          swal.fire("Thông báo", "Mật khẩu cũ không chính xác", "error");
        }
      });
    } else {
      swal.fire("Thông báo", "Nhập lại mật khẩu không chính xác", "warning");
    }
  };

  if (localStorage.getItem("accessToken") === null) {
    navigate("/login");
  }

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
                      Tài khoản của bạn
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div className="col-lg-9">
                <div className="box">
                  <h1>Tài khoản của bạn</h1>
                  <h3 className="mt-5">Thông tin chi tiết</h3>

                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="fullname">Họ và tên</label>
                          <input
                            id="fullname"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">Số điện thoại</label>
                          <input
                            id="phone"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-success gradient"
                      >
                        <RiSave3Fill
                          className="fa fa-save"
                          style={{ marginBottom: "-2px" }}
                        ></RiSave3Fill>{" "}
                        Lưu thay đổi
                      </button>
                    </div>
                  </form>

                  <br />
                  <hr />
                  <br />

                  <h3>Thay đổi mật khẩu</h3>
                  <div>
                    <div className="row mid">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password_old">
                            Mật khẩu hiện tại
                          </label>
                          <input
                            id="password_old"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              setOldPasss(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mid">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password_1">Mật khẩu mới</label>
                          <input
                            id="password_1"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              setNewPasss(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mid">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="password_2">
                            Nhập lại mật khẩu mới
                          </label>
                          <input
                            id="password_2"
                            type="password"
                            className="form-control"
                            onChange={(e) => {
                              setConfirmPasss(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-success gradient"
                        onClick={saveOnClick}
                      >
                        <RiSave3Fill
                          className="fa fa-save"
                          style={{ marginBottom: "-2px" }}
                        ></RiSave3Fill>{" "}
                        Lưu xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
