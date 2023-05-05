import React, { useEffect, useRef, useState } from "react";
import useLocationForm from "../../components/Address/useLocationForm";

import "../../styles/Style.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { CartService } from "../../services/cart.service";
import { GlobalUtil } from "../../utils/GlobalUtil";

import { Link, useNavigate } from "react-router-dom";
import { AddressService } from "../../services/address.service";
import { ImEye, ImTruck } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import GHN from "../../assets/images/delivery/GHN.png";
import MOMO from "../../assets/images/payment/momo.png";
import COD from "../../assets/images/payment/cod.png";
import { InvoiceService } from "../../services/invoice.service";
import { PaymentService } from "../../services/payment.service";

const CheckMethod = () => {
  const [cartDetail, setCartDetail] = useState([]);
  const [cartId, setCartId] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);

  let total = 0;

  const addressLine = useRef();
  const fullName = useRef();
  const phone = useRef();
  const navigate = useNavigate();

  const placeOrder = () => {
    const addressId = JSON.parse(localStorage.getItem("address-id"));
    if (paymentId === 3) {
      const paymentData = {
        payment_method: 3,
        address_id: addressId,
      };
      InvoiceService.placeOrderByPayMethodAndAddress(paymentData).then(
        (res) => {
          if (res.status_code === 200) {
            navigate("/success");
          }
        }
      );
    }

    // InvoiceService.placeOrderByCartIdAndAddress(cartId, addressId).then(
    //   (res) => {
    //     if (res.status === 200) {
    //       if (paymentId === 3) {
    //         const paymentData = {
    //           payment_method: 3,
    //           address_id: addressId,
    //         };
    //         PaymentService.createPayment(paymentData).then((res) => {
    //           if (res.status_code === 200) {
    //             window.location.href = res.data;
    //           }
    //         });
    //       } else {
    //         navigate("/success");
    //       }
    //     }
    //   }
    // );
  };

  useEffect(() => {
    let isFetched = true;

    const fetchCart = () => {
      CartService.getCart().then((res) => {
        setCartId(res.data.id);
        if (isFetched) {
          CartService.getAllCartDetailByCartID(cartId).then((res) => {
            if (isFetched) {
              if (res.data == null) {
                navigate("/basket");
              }
              if (res.data != null) {
                setCartDetail(res.data ? res.data : []);
              }
            }
          });
        }
      });
    };

    fetchCart();
    return () => {
      isFetched = false;
    };
  }, []);
  useEffect(() => {}, [paymentId]);
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
              <div className="col-lg-7">
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
                        {cartDetail.map((item) => {
                          total =
                            total +
                            item?.product?.price * item?.product?.quantity;
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
                                      width: "50px",
                                      height: "50px",
                                    }}
                                    alt=""
                                  />
                                </Link>
                              </td>
                              <td>
                                <Link to={`/product-detail`}>
                                  {item?.product?.name}
                                </Link>
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                {item.quantity}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                {GlobalUtil.commas(
                                  Number(item?.product?.price) + ""
                                ) + "₫"}
                              </td>

                              <td
                                style={{
                                  textAlign: "center",
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
              <div className="col-lg-5">
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
                  <label className="d-flex gap-3" htmlFor="fast">
                    <div className="row d-flex align-items-center ">
                      <div className="">
                        <input
                          type="radio"
                          name="delivery"
                          className="mr-2"
                          id="fast"
                          value="1"
                        />
                        GIAO HÀNG NHANH
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
                  <label className="d-flex gap-3" htmlFor="tietkiem">
                    <div className="row d-flex align-items-center ">
                      <div className="">
                        <input
                          type="radio"
                          name="delivery"
                          className="mr-2"
                          id="tietkiem"
                          value="2"
                        />
                        GIAO HÀNG TIẾT KIỆM
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
                </div>

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
                </div>

                <button
                  type="button"
                  className="d-flex justify-content-center btn btn-danger"
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
