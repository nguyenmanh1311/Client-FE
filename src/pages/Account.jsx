import React, { useEffect, useState } from "react";
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

  const [selectedGender, setselectedGender] = useState();
  const [fullname, setFullname] = useState();
  const [birthday, setBirthday] = useState();

  const [user, setUser] = useState([]);
  const [changed, setChanged] = useState(true);
  let genderFetch;

  // fetch data
  const [fetchedDate, setFetchedDate] = useState(null);
  const [dateInput, setDateInput] = useState(null);

  const navigate = useNavigate();

  const savePassOnClick = () => {
    if (newPass === confirmPass) {
      AuthService.changePassword(oldPass, newPass)
        .then((response) => {
          if (response.data.status_code === 200) {
            swal.fire("Thông báo", "Đổi mật khẩu thành công", "success");
          }
        })
        .catch(() => {
          swal.fire("Thông báo", "Mật khẩu không đúng", "error");
        });
    } else {
      swal.fire("Thông báo", "Mật khẩu không trùng khớp", "warning");
    }
  };

  const saveInfoOnClick = () => {
    const data = {
      fullname: fullname,
      date_of_birth: birthday,
      gender: Number(selectedGender),
    };

    AuthService.updateProfile(data)
      .then((response) => {
        if (response.data.status_code === 200) {
          swal.fire(
            "Thông báo",
            "Cập nhật thông tin cá nhân thành công",
            "success"
          );
          setChanged(!changed);
        }
      })
      .catch(() => {
        swal.fire("Thông báo", "Cập nhật thông tin cá nhân thất bại", "error");
      });
  };

  if (localStorage.getItem("accessToken") === null) {
    navigate("/login");
  }

  console.log(genderFetch);

  const handleFetchBirthday = (fetchedDateStr) => {
    const parsedDate = new Date(fetchedDateStr);
    const value =
      parsedDate.getFullYear() +
      "-" +
      (parsedDate.getMonth() < 9
        ? "0" + String(parsedDate.getMonth() + 1)
        : parsedDate.getMonth() + 1) +
      "-" +
      parsedDate.getDate();
    setFetchedDate(value);
  };

  useEffect(() => {
    const fetchUser = () => {
      AuthService.getProfile().then((res) => {
        if (res.status_code === 200) {
          setUser(res.data);
          console.log(res.data.gender);
          const fetchedDateStr = res.data.date_of_birth;
          handleFetchBirthday(fetchedDateStr);
          genderFetch = res.data.gender;
        }
      });
    };

    fetchUser();
    if (fetchedDate) {
      setDateInput(fetchedDate);
    }
  }, [changed, fetchedDate]);

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

                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="fullname">Họ và tên</label>
                          <input
                            id="fullname"
                            type="text"
                            className="form-control"
                            defaultValue={user.fullname}
                            onChange={(e) => {
                              setFullname(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="birthday">Ngày sinh</label>
                          <div className="d-flex justify-content-between">
                            <input
                              id="birthday"
                              type="date"
                              value={dateInput || ""}
                              onChange={(e) => setBirthday(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row gender-container">
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label>Giới tính</label>
                          <br />
                          <label className="choose">
                            Nam
                            <input
                              type="radio"
                              name="radio"
                              value="1"
                              defaultChecked={genderFetch === 1}
                              onChange={(e) => {
                                setselectedGender(e.target.value);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="choose">
                            Nữ
                            <input
                              type="radio"
                              name="radio"
                              value="2"
                              defaultChecked={genderFetch === 2}
                              onChange={(e) => {
                                setselectedGender(e.target.value);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="choose">
                            Khác
                            <input
                              type="radio"
                              name="radio"
                              value="3"
                              defaultChecked={genderFetch === 3}
                              onChange={(e) => {
                                setselectedGender(e.target.value);
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-success gradient"
                        onClick={saveInfoOnClick}
                      >
                        <RiSave3Fill
                          className="fa fa-save"
                          style={{ marginBottom: "-2px" }}
                        ></RiSave3Fill>{" "}
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>

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
                        onClick={savePassOnClick}
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
