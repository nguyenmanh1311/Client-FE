import React, { useEffect, useRef, useState } from "react";

import "../../styles/Style.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import { GiPositionMarker } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { AddressService } from "../../services/address.service";
import AddressItem from "../../components/Address/AddressItem";
import Select from "react-select";
import useLocationForm from "../../components/Address/useLocationForm";
import Swal from "sweetalert2";

const CheckAddress = () => {
  const [addressList, setAddressList] = useState([]);
  const [addressId, setAddressId] = useState(null);
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

  const validateForm = (obj) => {
    if (String(obj.addressLine) === "") {
      Swal.fire("Thông báo", "Vui lòng nhập số nhà, tên đường", "warning");
      return false;
    }
    if (obj.provinceId === undefined) {
      Swal.fire("Thông báo", "Vui lòng chọn thành phố / tỉnh", "warning");
      return false;
    }
    if (obj.districtId === undefined) {
      Swal.fire("Thông báo", "Vui lòng chọn quận / huyện", "warning");
      return false;
    }
    if (obj.wardId === undefined) {
      Swal.fire("Thông báo", "Vui lòng chọn xã / phường", "warning");
      return false;
    }
    return true;
  };

  const onClickConfirm = () => {
    const user = JSON.parse(localStorage.getItem("userId"));
    const createData = {
      fullName: fullName.current.value,
      phone: phone.current.value,
      addressLine: addressLine.current.value,
      province: province?.label ? province?.label : selectedCity?.label,
      district: district?.label ? district?.label : selectedDistrict?.label,
      ward: ward?.label ? ward?.label : selectedWard?.label,
      provinceId: selectedCity?.value,
      districtId: selectedDistrict?.value,
      wardId: selectedWard?.value,
      userId: user,
    };
    if (validateForm(createData)) {
      AddressService.createAddress(createData).then((response) => {
        if (response.status === "OK") {
          localStorage.setItem("address", JSON.stringify(response.data));
          navigate("/check-method");
        }
      });
    }
  };

  const chooseAddressClickHandle = () => {
    AddressService.getAddressByID(addressId).then((response) => {
      if (response.status === "OK") {
        localStorage.setItem("address", JSON.stringify(response.data));
        navigate("/check-method");
      } else {
        Swal.fire("Thông báo", "Vui lòng chọn vào 1 địa chỉ", "warning");
      }
    });
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    let isFetched = true;
    const fetchAddressList = () => {
      AddressService.getAddressByUserID(userId).then((res) => {
        setAddressList(res.data);
      });
    };
    fetchAddressList();
    return () => {
      isFetched = false;
    };
  }, []);
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
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Địa chỉ
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-lg-12">
                <div
                  className="font-weight-bold text-danger"
                  style={{ fontSize: "28px", marginBottom: "20px" }}
                >
                  <GiPositionMarker /> ĐỊA CHỈ
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  className="box"
                  onChange={(e) => {
                    setAddressId(Number(e.target.value));
                  }}
                >
                  <h3 className="font-weight-bold text-info">
                    Chọn địa chỉ đã lưu
                  </h3>
                  {addressList.map((item) => {
                    return (
                      <>
                        <label className="d-flex gap-3 " key={item.id}>
                          <input
                            type="radio"
                            name="address"
                            className="w-[30px]"
                            value={item.id}
                          />{" "}
                          <AddressItem {...item} />
                        </label>
                      </>
                    );
                  })}

                  {addressList.length > 0 && addressId != null ? (
                    <button
                      type="button"
                      style={{ margin: "auto" }}
                      className="d-flex justify-content-center btn btn-danger"
                      onClick={chooseAddressClickHandle}
                    >
                      <div style={{ fontSize: "14px" }}>
                        GIAO ĐẾN ĐỊA CHỈ ĐÃ CHỌN
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{ margin: "auto" }}
                      className="d-flex justify-content-center btn btn-outline-danger"
                    >
                      <div style={{ fontSize: "14px" }}>
                        GIAO ĐẾN ĐỊA CHỈ ĐÃ CHỌN
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="box">
                  <form method="get">
                    <h3 className="font-weight-bold text-info">
                      Nhập địa chỉ mới
                    </h3>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            className="font-weight-bold"
                            htmlFor="fullname"
                          >
                            Họ và tên
                          </label>
                          <input
                            name="name"
                            ref={fullName}
                            id="fullname"
                            type="text"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="font-weight-bold" htmlFor="phone">
                            Điện thoại
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            ref={phone}
                            className="form-control"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label
                            className="font-weight-bold"
                            htmlFor="province"
                          >
                            Thành phố / Tỉnh
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
                          <label
                            className="font-weight-bold"
                            htmlFor="district"
                          >
                            Quận / Huyện
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
                          <label className="font-weight-bold" htmlFor="ward">
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
                      <div className="col-md-12">
                        <div className="form-group">
                          <label className="font-weight-bold" htmlFor="street">
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
                    </div>
                    <button
                      type="button"
                      className="d-flex justify-content-center btn btn-danger"
                      onClick={onClickConfirm}
                      style={{ margin: "auto", marginTop: "10px" }}
                    >
                      <div style={{ fontSize: "14px" }}>
                        XÁC NHẬN GIAO ĐẾN ĐỊA CHỈ NÀY
                      </div>
                    </button>

                    {/* <div className="d-flex justify-content-between">
                      <Link
                        to={`/basket`}
                        className="btn btn-outline-secondary"
                      >
                        <GrPrevious
                          className="fa fa-chevron-left"
                          style={{ marginTop: "5px" }}
                        ></GrPrevious>{" "}
                        Trở về giỏ hàng
                      </Link>
                      <Link to={`/delivery-method`}>
                        <button
                          type="submit"
                          className="btn btn-outline-secondary"
                        >
                          Tiếp tục{" "}
                          <GrNext
                            className="fa fa-chevron-right"
                            style={{ marginTop: "5px" }}
                            color="white"
                          ></GrNext>
                        </button>
                      </Link>
                    </div> */}
                  </form>
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

export default CheckAddress;
