import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import useLocationForm from "./useLocationForm";
import SidebarCustomer from "../Sidebar/SidebarCustomer";
import { AddressService } from "../../services/address.service";

const AddressAdd = () => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false, null);
  const navigate = useNavigate();
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const addressLine = useRef();
  const fullName = useRef();
  const phone = useRef();
  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const onCancel = () => {
    navigate(-1);
  };

  const onSave = () => {
    const user = JSON.parse(localStorage.getItem("userId"));
    const createData = {
      fullName: fullName.current.value,
      phone: phone.current.value,
      addressLine: addressLine.current.value,
      province: province?.label ? province?.label : selectedCity?.label,
      district: district?.label ? district?.label : selectedDistrict?.label,
      ward: ward?.label ? ward?.label : selectedWard?.label,
      provinceId: province?.value ? province?.value : selectedCity?.value,
      districtId: district?.value ? district?.value : selectedDistrict?.value,
      wardId: ward?.value ? ward?.value : selectedWard?.value,
      userId: user,
    };
    AddressService.createAddress(createData).then((response) => {
      if (response.status === "OK") {
        navigate(-1);
      } else {
        Swal.fire("Tạo địa chỉ không thành công", "Thông báo", "warning");
      }
    });
  };
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
                    <li className="breadcrumb-item">
                      <Link to={`/address`}>Danh sách địa chỉ</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Thêm địa chỉ mới
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div id="customer-orders" className="col-lg-9">
                <div className="box">
                  <h1>Thêm địa chỉ mới</h1>
                  <br />
                  <form>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="fullname" className="font-weight-bold">
                          Họ và tên
                        </label>
                        <input
                          name="name"
                          ref={fullName}
                          id="fullname"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="phone" className="font-weight-bold">
                          Số điện thoại
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          ref={phone}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="street" className="font-weight-bold">
                          Số nhà, tên đường
                        </label>
                        <input
                          name="address"
                          type="text"
                          ref={addressLine}
                          id="street"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="province" className="font-weight-bold">
                          Tỉnh / Thành phố
                        </label>
                        <Select
                          name="cityId"
                          key={`cityId_${selectedCity?.value}`}
                          isDisabled={cityOptions.length === 0}
                          options={cityOptions}
                          onChange={(option) => {
                            setProvince(option);
                            onCitySelect(option);
                          }}
                          placeholder="Tỉnh/Thành"
                          defaultValue={selectedCity}
                          className={`mt-1 w-full focus:outline-none text-[15px] border-gray-300 shadow-sm sm:text-[15px] `}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="district" className="font-weight-bold">
                          Huyện / Quận
                        </label>
                        <Select
                          name="districtId"
                          key={`districtId_${selectedDistrict?.value}`}
                          isDisabled={districtOptions.length === 0}
                          options={districtOptions}
                          onChange={(option) => {
                            setDistrict(option);
                            onDistrictSelect(option);
                          }}
                          placeholder="Quận/Huyện"
                          defaultValue={selectedDistrict}
                          className={`mt-1 w-full focus:outline-none text-[15px] border-gray-300 shadow-sm sm:text-[15px] `}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="ward" className="font-weight-bold">
                          Xã / Phường
                        </label>
                        <Select
                          name="wardId"
                          key={`wardId_${selectedWard?.value}`}
                          isDisabled={wardOptions.length === 0}
                          options={wardOptions}
                          placeholder="Phường/Xã"
                          onChange={(option) => {
                            setWard(option);
                            onWardSelect(option);
                          }}
                          defaultValue={selectedWard}
                          classNamePrefix="react-select"
                          className={`react-select-container mt-1 w-full focus:outline-none border-gray-300 shadow-sm text-[15px] `}
                          size="5"
                        />
                      </div>
                    </div>

                    <br />
                  </form>
                </div>
                <button
                  onClick={onSave}
                  style={{ fontSize: "16px" }}
                  className="btn btn-success mb-4 "
                >
                  Lưu
                </button>
                <button
                  onClick={onCancel}
                  style={{ fontSize: "16px" }}
                  className="btn btn-danger mb-4 "
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AddressAdd;
