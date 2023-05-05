import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import { InvoiceService } from "../../services/invoice.service";
import { GlobalUtil } from "../../utils/GlobalUtil";
import FeedbackModel from "./FeedbackModel";
import Navigation from "./Nav/Navigation";

const AllOrder = () => {
  const [allInvoice, setAllInvoice] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    let isFetched = true;
    const fetchAllInvoice = () => {
      InvoiceService.getAllInvoice().then((res) => {
        if (isFetched) {
          setAllInvoice(() => {
            const onResult = res.data.map((item, index) => {
              return {
                index: ++index,
                ...item,
              };
            });
            return onResult;
          });
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
                <Navigation />

                <div className="box">
                  {allInvoice.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="order-container d-flex justify-content-between align-items-center">
                          <div className="info-container d-flex justify-content-center align-items-start flex-column">
                            {item.address}
                            <div className="status-payment-container">
                              Thanh toán :
                              {item.isPayment === false && (
                                <span className="badge badge-danger">
                                  Chưa thanh toán
                                </span>
                              )}
                              {item.isPayment === true && (
                                <span className="badge badge-success">
                                  Đã thanh toán
                                </span>
                              )}
                            </div>
                            <div>
                              Ngày đặt hàng:{" "}
                              {GlobalUtil.dateConvert(item.created_at)}
                            </div>
                            <div>
                              Tổng tiền:{" "}
                              {GlobalUtil.commas(item.total + "") + "₫"}
                            </div>
                            <br />
                          </div>
                          <div className="button-container">
                            <Link
                              to={`/order-detail/${item.id}`}
                              className="btn btn-rating gradient"
                            >
                              Xem Chi Tiết
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
