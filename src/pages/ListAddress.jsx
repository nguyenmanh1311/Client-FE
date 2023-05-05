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
  const [addressList, setAddressList] = useState([]);
  const navigate = useNavigate();

  const fetchAddressList = () => {
    AddressService.getAddress().then((res) => {
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
                      Địa chỉ của tôi
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div id="customer-address" className="col-lg-9">
                <div className="box">
                  <div className="title-address d-flex justify-content-between align-items-center">
                    <h4 className="d-flex align-items-center">
                      Danh sách địa chỉ
                    </h4>
                    <button
                      style={{ fontSize: "16px" }}
                      className="btn btn-success gradient"
                      onClick={() => {
                        navigate("/account/address/add");
                      }}
                    >
                      Thêm địa chỉ mới
                    </button>
                  </div>
                  <br />
                  {addressList.province_id}
                  {addressList?.map((address) => {
                    return <AddressItem {...address} key={address.id} />;
                  })}
                </div>
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
