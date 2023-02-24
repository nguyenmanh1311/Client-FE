import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../styles/Style.scss";
import { InvoiceDetailService } from "../../services/invoiceDetail.service";
import { AddressService } from "../../services/address.service";
import { InvoiceService } from "../../services/invoice.service";

const Order = () => {
  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, "$&.");
  };

  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [address, setAddress] = useState();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const { id } = useParams();
  let total = 0;

  useEffect(() => {
    let isFetched = true;
    const fetchInvoiceDetail = () => {
      InvoiceDetailService.getInvoiceDetailByInvoiceId(id).then((res) => {
        if (isFetched) {
          setInvoiceDetail(res.data);
        }
      });
    };
    const fetchInvoice = () => {
      InvoiceService.getInvoiceByInvoiceId(id).then((res) => {
        if (isFetched) {
          AddressService.getAddressByID(res.data.addressId ?? 0).then((res) => {
            setAddress(res.data);
          });
        }
      });
    };
    fetchInvoice();

    fetchInvoiceDetail();
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
                    <li aria-current="page" className="breadcrumb-item">
                      <Link to="">Tất cả đơn đặt hàng</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Đơn hàng #{id}
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div id="customer-order" className="col-lg-9">
                <div className="box">
                  <form>
                    <h1>Đơn hàng #{id}</h1>
                    <p className="lead">
                      Đơn hàng số {id} đã được đặt vào ngày 22/06/2013 và hiện
                      đang được chuẩn bị.
                    </p>
                    <p className="text-muted">
                      Nếu bạn có thắc mắc, vui lòng{" "}
                      <Link to={`/contact`}>
                        <i>liên hệ chúng tôi</i>
                      </Link>
                      , dịch vụ chăm sóc khách hàng của chúng tôi hoạt động 24/7
                    </p>
                    <hr />
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr style={{ textAlign: "center" }}>
                            <th colspan="2">Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Khuyến mãi</th>
                            <th>Tổng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceDetail.map((item) => {
                            total = total + item.price * item.quantity;
                            return (
                              <tr key={item.id} style={{ textAlign: "center" }}>
                                <td>
                                  <Link to={`/product-detail/${item.id}`}>
                                    <img
                                      src={
                                        "http://localhost:8080/api/v1/image_product/" +
                                        item.productImage
                                      }
                                      alt={item.productName}
                                    />
                                  </Link>
                                </td>
                                <td style={{ textAlign: "left" }}>
                                  <Link to={`/product-detail/${item.id}`}>
                                    {item.productName}
                                  </Link>
                                </td>
                                <td>{item.quantity}</td>
                                <td>{commas(Number(item.price) + "") + "₫"}</td>
                                <td>0</td>
                                <td>
                                  {" "}
                                  {commas(
                                    Number(item.price) * Number(item.quantity) +
                                      ""
                                  ) + "₫"}
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <th style={{ textAlign: "center" }} colSpan="5">
                              Chi phí vận chuyển
                            </th>
                            <th style={{ textAlign: "center" }} colSpan="2">
                              {commas(50000 + "") + "₫"}
                            </th>
                          </tr>
                          ;
                        </tbody>
                        <tfoot>
                          {total !== 0 && (
                            <tr>
                              <th style={{ textAlign: "center" }} colSpan="5">
                                Tổng tiền
                              </th>
                              <th style={{ textAlign: "center" }} colSpan="2">
                                {commas(total + "") + "₫"}
                              </th>
                            </tr>
                          )}
                        </tfoot>
                      </table>
                    </div>
                    <div className="row addresses">
                      <div className="col-lg-6"></div>
                      <div className="col-lg-6">
                        <br />
                        <br />
                        <br />
                        <h2>Địa chỉ nhận hàng</h2>
                        <p style={{ textAlign: "left" }}>
                          {address?.addressLine},
                          <br />
                          {address?.ward},
                          <br />
                          {address?.district},
                          <br />
                          {address?.province},
                        </p>
                      </div>
                    </div>
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

export default Order;
