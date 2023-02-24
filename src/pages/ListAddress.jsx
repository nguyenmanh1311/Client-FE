import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddressItem from "../components/Address/AddressItem";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SidebarCustomer from "../components/Sidebar/SidebarCustomer";
import { AddressService } from "../services/address.service";

const Address = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [addressList, setAddressList] = useState([]);
  const navigate = useNavigate();

  const fetchAddressList = () => {
    AddressService.getAddressByUserID(userId).then((res) => {
      setAddressList(res.data);
    });
  };
  useEffect(() => {
    fetchAddressList();
  }, []);
  return (
    <div>
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
                      Danh sách địa chỉ
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div id="customer-orders" className="col-lg-9">
                <div className="box">
                  <h1>Danh sách địa chỉ</h1>
                  <br />
                  {addressList?.map((address) => {
                    return <AddressItem {...address} key={address.id} />;
                  })}
                </div>
                <button
                  style={{ fontSize: "16px" }}
                  className="btn btn-success mb-4 gradient"
                  onClick={() => {
                    navigate("/account/address/add");
                  }}
                >
                  Thêm địa chỉ mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Address;
