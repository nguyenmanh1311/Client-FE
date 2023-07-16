import React, { useEffect, useState } from "react";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { GlobalUtil } from "../utils/GlobalUtil";

import { FaTrashAlt } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { ImGift } from "react-icons/im";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";

import { CartService } from "../services/cart.service";
import { useDataContext } from "../context/DataProvider";

const Basket = () => {
  const [cartDetail, setCartDetail] = useState([]);
  const [statusCart, setStatusCart] = useState(true);
  const { quantityBasket, setQuantityBasket } = useDataContext();

  let data = {};
  let total = 0;
  const navigate = useNavigate();

  const fetchCart = () => {
    CartService.getCart().then((res) => {
      if (res.total_count === 0) {
        setStatusCart(false);
      } else {
        setCartDetail(res.data ?? []);
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const onChangeQuantity = (value, e) => {
    const dataUpdate = { quantity: Number(value.quantity) };
    const id = value.id;
    if (dataUpdate.quantity > 0) {
      CartService.updateQuantity(id, dataUpdate).then(() => {
        fetchCart();
      });
    }
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
                    <li aria-current="page" className="breadcrumb-item active">
                      Giỏ hàng
                    </li>
                  </ol>
                </nav>
              </div>
              {!statusCart ? (
                <div id="basket" className="col-lg-12">
                  <div className="box">
                    <h1>Giỏ hàng</h1>
                    <FaCartPlus
                      style={{
                        fontSize: "150px",
                        marginTop: "30px",
                        color: "#191313ad",
                      }}
                    />
                    <p
                      style={{
                        marginTop: "30px",
                        fontSize: "20px",
                      }}
                    >
                      Không có sản phẩm nào trong giỏ hàng
                    </p>
                    <button
                      style={{
                        marginTop: "20px",
                        fontSize: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                      className="btn btn-secondary"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Quay lại mua sắm
                    </button>
                  </div>
                </div>
              ) : (
                <div id="basket" className="col-lg-12">
                  <div className="box">
                    <form>
                      <div
                        className="font-weight-bold text-danger"
                        style={{ fontSize: "30px", marginBottom: "10px" }}
                      >
                        GIỎ HÀNG
                      </div>
                      <h3
                        className="font-weight-bold text-info"
                        style={{ marginBottom: "20px" }}
                      >
                        Hiện tại, bạn có {cartDetail.length ?? null} sản phẩm
                        trong giỏ.
                      </h3>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th></th>
                              <th style={{ width: "200px" }}>Tên sản phẩm</th>
                              <th style={{ width: "100px" }}>Số lượng</th>
                              <th style={{ width: "200px" }}>Đơn giá</th>
                              <th style={{ width: "200px" }}>Tổng</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartDetail.map((item) => {
                              total =
                                total + item.product.price * item.quantity;
                              return (
                                <tr key={item.product_id}>
                                  <td>
                                    <Link to={`/product-detail`}>
                                      <img
                                        src={
                                          "https://" +
                                          item?.product?.product_images[0].uri
                                        }
                                        alt=""
                                      />
                                    </Link>
                                  </td>
                                  <td>
                                    <Link to={`/product-detail`}>
                                      {item?.product?.name}
                                    </Link>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      defaultValue={item?.quantity}
                                      min="0"
                                      className="form-control"
                                      onChange={(e) =>
                                        onChangeQuantity(
                                          (data = {
                                            id: item.id,
                                            quantity: e.target.value,
                                          }),
                                          e
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    {GlobalUtil.commas(
                                      Number(item?.product?.price) + ""
                                    ) + "₫"}
                                  </td>
                                  <td>
                                    {" "}
                                    {GlobalUtil.commas(
                                      Number(item?.product?.price) *
                                        Number(item?.quantity) +
                                        ""
                                    ) + "₫"}
                                  </td>
                                  <td>
                                    <div
                                      onClick={(e) => {
                                        Swal.fire({
                                          title:
                                            "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không ?",
                                          showDenyButton: true,
                                          confirmButtonText: "Có",
                                          denyButtonText: "Không",
                                          customClass: {
                                            actions: "my-actions",
                                            confirmButton: "order-2",
                                            denyButton: "order-3",
                                          },
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            Swal.fire(
                                              "Xóa thành công",
                                              "",
                                              "success"
                                            );
                                            CartService.deleteCartDetailById(
                                              item.id
                                            ).then((res) => {
                                              if (res.status_code === 200) {
                                                fetchCart();
                                                // window.location.reload();
                                                setQuantityBasket(
                                                  !quantityBasket
                                                );
                                              }
                                            });
                                          } else if (result.isDenied) {
                                            Swal.fire(
                                              "Sản phẩm chưa được xóa",
                                              "",
                                              "info"
                                            );
                                          }
                                        });
                                      }}
                                    >
                                      <Link to="">
                                        <FaTrashAlt className="fa fa-trash-o"></FaTrashAlt>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot>
                            {total !== 0 && (
                              <tr>
                                <th colSpan="5">Tổng tiền</th>
                                <th colSpan="2">
                                  {GlobalUtil.commas(total + "") + "₫"}
                                </th>
                              </tr>
                            )}
                          </tfoot>
                        </table>
                      </div>
                      <div className="d-flex justify-content-between flex-column flex-lg-row">
                        <div className="left">
                          <Link
                            to={`/product`}
                            className="btn btn-outline-secondary"
                            style={{ fontSize: "14px" }}
                          >
                            <GrPrevious
                              className="fa fa-chevron-left"
                              style={{ marginBottom: "-2px" }}
                            ></GrPrevious>{" "}
                            Tiếp tục mua hàng
                          </Link>
                        </div>

                        <div className="right">
                          <Link
                            to={`/check-address`}
                            className="btn btn-outline-secondary"
                            style={{ fontSize: "14px" }}
                          >
                            Tiến hành thanh toán{" "}
                            <GrNext
                              className="fa fa-chevron-right"
                              style={{ marginBottom: "-2px" }}
                            ></GrNext>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* <div className="col-lg-3">
                <div className="box">
                  <div className="box-header">
                    <h4 className="mb-0">Mã giảm giá</h4>
                  </div>
                  <p className="text-muted">
                    Nếu bạn có mã giảm giá, vui lòng nhập vào ô bên dưới.
                  </p>
                  <form>
                    <div className="d-flex justify-content-center">
                      <input type="text" className="border-dark rounded-left" />
                      <span className="input-group-append ">
                        <button
                          type="button"
                          className="btn-secondary rounded-right"
                        >
                          <ImGift className="fa fa-gift"></ImGift>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Basket;
