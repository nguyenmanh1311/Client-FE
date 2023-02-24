import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import { InvoiceService } from "../../services/invoice.service";

const AllOrder = () => {
  const [allInvoice, setAllInvoice] = useState([]);
  const navigate = useNavigate();

  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, "$&.");
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    let isFetched = true;
    const fetchAllInvoice = () => {
      InvoiceService.getAllInvoiceByUserId(userId).then((res) => {
        if (isFetched) {
          setAllInvoice(res.data);
        }
      });
    };
    fetchAllInvoice();
    return () => {
      isFetched = false;
    };
  }, []);

  if (localStorage.getItem("accessToken") === null) {
    navigate("/login");
  }
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
                      Tất cả đơn hàng
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div id="customer-orders" className="col-lg-9 mt-1">
                <div className="box">
                  <h1>Tất cả đơn hàng</h1>
                  <p className="lead">
                    Nếu có bất kỳ thắc mắc nào, vui lòng{" "}
                    <Link to={`/contact`}>
                      <i>liên hệ với chúng tôi</i>
                    </Link>
                    , dịch vụ chăm sóc khách hàng của chúng tôi làm việc 24/7.
                  </p>
                  {allInvoice.length === 0 && (
                    <p className="lead">
                      {" "}
                      Hiện tại chưa có đơn hàng nào. Quý khách vui lòng{" "}
                      <Link to={`/product`}>
                        <i>đặt hàng.</i>
                      </Link>
                    </p>
                  )}
                  {allInvoice.length !== 0 && (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead style={{ textAlign: "center" }}>
                          <tr>
                            <th>Mã đặt hàng</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thanh toán</th>
                            <th>Xem chi tiết</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {allInvoice.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.createdDate}</td>
                                <td>{commas(item.grandTotal + "") + "₫"}</td>
                                <td>
                                  {item.status === "Đang chuẩn bị hàng" && (
                                    <span className="badge badge-warning">
                                      {item.status}
                                    </span>
                                  )}
                                  {item.status === "Đang giao hàng" && (
                                    <span className="badge badge-info">
                                      {item.status}
                                    </span>
                                  )}
                                  {item.status === "Đã đặt hàng" && (
                                    <span className="badge badge-success">
                                      {item.status}
                                    </span>
                                  )}
                                  {item.status === "Đã hủy" && (
                                    <span className="badge badge-danger">
                                      {item.status}
                                    </span>
                                  )}
                                </td>
                                <td>
                                  {item.isPayment == false && (
                                    <span className="badge badge-danger">
                                      Chưa thanh toán
                                    </span>
                                  )}
                                  {item.isPayment == true && (
                                    <span className="badge badge-success">
                                      Đã thanh toán
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <Link
                                    to={`/order-detail/${item.id}`}
                                    className="btn btn-info btn-sm gradient"
                                  >
                                    Xem
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
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

export default AllOrder;
