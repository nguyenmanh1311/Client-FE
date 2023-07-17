import React, { useEffect, useRef, useState } from "react";

import "../../styles/Style.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { CartService } from "../../services/cart.service";
import { GlobalUtil } from "../../utils/GlobalUtil";

import { Link, useNavigate } from "react-router-dom";
import { ImEye, ImTruck } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import GHN from "../../assets/images/delivery/GHN.png";
import MOMO from "../../assets/images/payment/momo.png";
import COD from "../../assets/images/payment/cod.png";
import VNPAY from "../../assets/images/payment/vnpay.png";
import { InvoiceService } from "../../services/invoice.service";
import useDeliveryData from "../../hooks/useDeliveryData";
import { AddressService } from "../../services/address.service";

const CheckMethod = () => {
  const [cartDetail, setCartDetail] = useState([]);
  const [cartId, setCartId] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState();
  const [deliveryMethodName, setDeliveryMethodName] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [address, setAddress] = useState([]);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const { services, getService, deliveryFee, calculateFee } =
    useDeliveryData(true);

  let total = 0;

  const deliveryMethodChange = (e) => {
    calculateFee(Number(e.target.value), total);
  };

  const placeOrder = () => {
    const addressId = JSON.parse(localStorage.getItem("address-id"));
    const paymentData = {
      shipping_fee: Number(deliveryFee?.total),
      address_id: addressId,
    };
    if (paymentId === 3) {
      InvoiceService.placeOrderCOD(paymentData).then((res) => {
        if (res.status_code === 200) {
          navigate("/success");
        }
      });
      localStorage.removeItem("address-id");
    }

    if (paymentId === 2) {
      InvoiceService.placeOrderMomo(paymentData).then((res) => {
        if (res.status_code === 200) {
          window.location.href = res.data.pay_url;
        }
      });
      localStorage.removeItem("address-id");
    }

    if (paymentId === 1) {
      InvoiceService.placeOrderVNPay(paymentData).then((res) => {
        if (res.status_code === 200) {
          window.location.href = res.data.pay_url;
        }
      });
      localStorage.removeItem("address-id");
    }
  };

  const selectAddress = () => {
    navigate("/check-address");
  };

  const fetchCart = () => {
    CartService.getCart().then((res) => {
      setCartId(res.data.id);
      CartService.getAllCartDetailByCartID(cartId).then((res) => {
        if (res.data == null) {
          navigate("/basket");
        }
        if (res.data != null) {
          setCartDetail(res.data ? res.data : []);
        }
      });
    });
  };

  const getDefaultAddress = () => {
    AddressService.getDefaultAddress().then((res) => {
      setDefaultAddress(res.data);
      localStorage.setItem("address-id", JSON.stringify(res.data.id));
    });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    getDefaultAddress();
  }, []);

  const getAddressByID = (data) => {
    AddressService.getAddressByID(data).then((res) => {
      setAddress(res.data);
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("address-id");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data) {
      getAddressByID(data);
    }
  }, [data]);

  useEffect(() => {
    fetchCart();
  }, [paymentId]);
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
                      Tổng quan và phương thức
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-lg-12">
                <div className="box">
                  <div
                    className="font-weight-bold text-danger d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <ImTruck className="mr-2" />
                    ĐỊA CHỈ NHẬN HÀNG
                  </div>
                  <div className="col-lg-12 d-flex">
                    <div className="col-lg-10">
                      <strong>Họ tên người nhận:</strong>{" "}
                      {address?.fullname || defaultAddress?.fullname} -{" "}
                      {address?.phone_number || defaultAddress?.phone_number}
                      <br />
                      <strong>Địa chỉ nhận hàng:</strong>{" "}
                      {address?.address_string ||
                        defaultAddress?.address_string}
                      , {address?.ward_name || defaultAddress?.ward_name},{" "}
                      {address?.district_name || defaultAddress?.district_name},{" "}
                      {address?.province_name || defaultAddress?.province_name}
                      {address?.is_default === true && (
                        <div className="default-address">Mặc định</div>
                      )}
                    </div>
                    <div className="col-lg-2">
                      <div
                        className="btn btn-danger btn-blue"
                        onClick={selectAddress}
                      >
                        Thay đổi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="box">
                  <div
                    className="font-weight-bold text-danger d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <ImEye className="mr-2" />
                    TỔNG QUAN ĐƠN HÀNG
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th
                            colSpan="2"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            Tên sản phẩm
                          </th>
                          <th
                            style={{
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            Số lượng
                          </th>
                          <th
                            style={{
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            Đơn giá
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                            }}
                          >
                            Tổng
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartDetail.length > 0 &&
                          cartDetail?.map((item) => {
                            {
                              deliveryFee?.total
                                ? (total =
                                    total +
                                    Number(item?.product?.price) *
                                      Number(item.quantity) +
                                    deliveryFee?.total)
                                : (total =
                                    total +
                                    Number(item?.product?.price) *
                                      Number(item.quantity));
                            }
                            return (
                              <tr key={item.id}>
                                <td>
                                  <Link to={`/product-detail`}>
                                    <img
                                      src={
                                        "https://" +
                                        item?.product?.product_images[0].uri
                                      }
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                      }}
                                      alt=""
                                    />
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  <Link to={`/product-detail`}>
                                    {item?.product?.name}
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {item.quantity}
                                </td>
                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {GlobalUtil.commas(
                                    Number(item?.product?.price) + ""
                                  ) + "₫"}
                                </td>

                                <td
                                  style={{
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {GlobalUtil.commas(
                                    Number(item?.product?.price) *
                                      Number(item.quantity) +
                                      ""
                                  ) + "₫"}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th
                            colSpan="4"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            Phí vận chuyển
                          </th>
                          <th
                            colSpan="2"
                            style={{
                              textAlign: "center",
                            }}
                          >
                            {deliveryFee?.total
                              ? GlobalUtil.commas(deliveryFee.total + "") + "₫"
                              : "0₫"}
                          </th>
                        </tr>
                        {total !== 0 && (
                          <tr>
                            <th
                              colSpan="4"
                              style={{
                                textAlign: "center",
                              }}
                            >
                              Tổng tiền
                            </th>
                            <th
                              colSpan="2"
                              style={{
                                textAlign: "center",
                              }}
                            >
                              {GlobalUtil.commas(total + "") + "₫"}
                            </th>
                          </tr>
                        )}
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="box"
                  onChange={(e) => {
                    setDeliveryId(Number(e.target.value));
                  }}
                >
                  <div
                    className="font-weight-bold text-danger d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <ImTruck className="mr-2" />
                    PHƯƠNG THỨC VẬN CHUYỂN
                  </div>
                  <div onChange={deliveryMethodChange}>
                    {services?.map((item) => {
                      return (
                        <label key={item.service_id} className="d-flex gap-3">
                          <div className="row d-flex align-items-center">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value={item.service_id}
                              className="mr-2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setDeliveryMethodName(item.short_name);
                                }
                              }}
                            />
                            <div className="uppercase gap-3">
                              {item.short_name}
                            </div>
                            <div className="">
                              <img
                                style={{ width: "60px", height: "30px" }}
                                src={GHN}
                                alt=""
                              />
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div
                  className="box"
                  onChange={(e) => {
                    setPaymentId(Number(e.target.value));
                  }}
                >
                  <div
                    className="font-weight-bold text-danger d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <MdPayment className="mr-2" />
                    PHƯƠNG THỨC THANH TOÁN
                  </div>
                  <label className="d-flex gap-3" htmlFor="cod">
                    <div className="row d-flex align-items-center ">
                      <div className="">
                        <input
                          type="radio"
                          name="payment"
                          className="mr-2"
                          id="cod"
                          value="3"
                        />
                        THANH TOÁN KHI NHẬN HÀNG (COD)
                      </div>
                      <div className="">
                        <img
                          style={{ width: "70px", height: "60px" }}
                          src={COD}
                          alt=""
                        />
                      </div>
                    </div>
                  </label>
                  <label className="d-flex gap-3" htmlFor="momo">
                    <div className="row d-flex align-items-center ">
                      <div className="">
                        <input
                          type="radio"
                          name="payment"
                          className="mr-2"
                          id="momo"
                          value="2"
                        />
                        THANH TOÁN BẰNG MOMO
                      </div>
                      <div className="">
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={MOMO}
                          alt=""
                        />
                      </div>
                    </div>
                  </label>
                  <label className="d-flex gap-3" htmlFor="vnpay">
                    <div className="row d-flex align-items-center ">
                      <div className="">
                        <input
                          type="radio"
                          name="payment"
                          className="mr-2"
                          id="vnpay"
                          value="1"
                        />
                        THANH TOÁN BẰNG VNPAY
                      </div>
                      <div className="">
                        <img
                          style={{ width: "50px", height: "50px" }}
                          src={VNPAY}
                          alt=""
                        />
                      </div>
                    </div>
                  </label>
                </div>

                <button
                  type="button"
                  className="d-flex justify-content-center btn btn-danger gradient"
                  style={{
                    margin: "auto",
                    marginTop: "10px",
                    marginBottom: "30px",
                  }}
                  onClick={placeOrder}
                >
                  <div style={{ fontSize: "14px" }}>ĐẶT HÀNG</div>
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

export default CheckMethod;
