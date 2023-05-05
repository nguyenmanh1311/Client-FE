import React, { useEffect, useState, useRef } from "react";
import "../../styles/Style.scss";
import logo from "../../assets/images/logo/baloshop.png";

import { BsListTask, BsPersonFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import { FaAddressBook } from "react-icons/fa";

import { Link } from "react-router-dom";
import { ImageService } from "../../services/image.service";
import { AuthService } from "../../services/auth.service";

const SidebarCustomer = () => {
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState();

  const uploadBtnRef = useRef();

  const mouseEnter = () => {
    uploadBtnRef.current.style.display = "block";
  };

  const mouseLeave = () => {
    uploadBtnRef.current.style.display = "none";
  };

  const updateAvatar = (e) => {
    setAvatar(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    ImageService.uploadImage(formData).then((res) => {
      if (res.status_code === 200) {
        const data = { avatar: res.data.uri };
        ImageService.uploadAvatar(data);
      }
    });
  };

  useEffect(() => {
    const fetchUser = () => {
      AuthService.getProfile().then((res) => {
        if (res.status_code === 200) {
          setUser(res.data);
        }
      });
    };
    fetchUser();
  }, []);
  return (
    <div className="sidebar-customer col-lg-3 mt-2 d-flex align-items-center flex-column">
      <div
        className="profile-pic-div"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <img
          src={user.length === 0 ? "" : "http://" + user.avatar}
          className="rounded-circle "
          style={{ height: "180px", width: "180px" }}
        />
        <input type="file" id="input-file" onChange={updateAvatar} />
        <label htmlFor="input-file" id="uploadBtn" ref={uploadBtnRef}>
          Chọn ảnh đại diện
        </label>
      </div>
      <div className="name">{user.fullname}</div>
      <ul className="nav nav-pills d-flex align-items-center ">
        <Link to={`/all-order`} className="nav-link d-flex align-items-center">
          <BsListTask className="order fa fa-list mr-2"></BsListTask>
          Tất cả đơn hàng
        </Link>

        <Link to={`/account`} className="nav-link d-flex align-items-center">
          <BsPersonFill className="account fa fa-user mr-2"></BsPersonFill> Tài
          khoản của bạn
        </Link>

        <Link
          to={`/account/address`}
          className="nav-link d-flex align-items-center"
        >
          <FaAddressBook className="address fa fa-user mr-2"></FaAddressBook>{" "}
          Danh sách địa chỉ
        </Link>
      </ul>
    </div>
  );
};

export default SidebarCustomer;
