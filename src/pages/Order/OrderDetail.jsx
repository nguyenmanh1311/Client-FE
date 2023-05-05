import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../styles/Style.scss";
import { InvoiceDetailService } from "../../services/invoiceDetail.service";
import { AddressService } from "../../services/address.service";
import { InvoiceService } from "../../services/invoice.service";
import { GlobalUtil } from "../../utils/GlobalUtil";
import FeedbackModel from "./FeedbackModel";

const OrderDetail = () => {
  const [invoiceDetail, setInvoiceDetail] = useState([]);
  const [address, setAddress] = useState();
  const { id } = useParams();
  let total = 0;

  const [showFormRating, setShowFormRating] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const handleShowForm = (pro) => {
    setShowFormRating(!showFormRating);
    setFeedback(pro);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let isFetched = true;

    const fetchInvoice = () => {
      InvoiceService.getInvoiceByInvoiceId(id).then((res) => {
        if (isFetched) {
          setInvoiceDetail(res.data);
        }
      });
    };
    fetchInvoice();
    return () => {
      isFetched = false;
    };
  }, [id]);
  return (
    <>
      {showFormRating && <div className="fullscreen"></div>}

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
                  <div className="description-conatainer">
                    <h1>Đơn hàng </h1>
                    <p className="lead">Đơn hàng hiện đang được chuẩn bị.</p>
                    <p className="text-muted">
                      Nếu bạn có thắc mắc, vui lòng{" "}
                      <Link to={`/contact`}>
                        <i>liên hệ chúng tôi</i>
                      </Link>
                      , dịch vụ chăm sóc khách hàng của chúng tôi hoạt động 24/7
                    </p>

                    <div className="row addresses">
                      <div className="col-lg-6"></div>
                      <div className="col-lg-6">
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
                  </div>
                  {invoiceDetail.invoice_details &&
                    invoiceDetail?.invoice_details.map((pro, index) => {
                      return (
                        <div>
                          <div
                            className="container d-flex align-items-center justify-content-between"
                            key={index}
                          >
                            <div className="product-container d-flex">
                              <div className="img-product">
                                <img
                                  src={
                                    "https://" +
                                    pro?.product.product_images[0].uri
                                  }
                                />
                              </div>
                              <div className="info-product d-flex flex-column align-items-start">
                                <div className="name">
                                  <strong>{pro?.product?.name}</strong>
                                </div>
                                <div className="color">Màu sắc: </div>
                                <div className="price">
                                  {GlobalUtil.commas(pro?.sold_price + "") +
                                    "₫"}
                                </div>
                                <div className="quantity">x{pro?.quantity}</div>
                              </div>
                            </div>
                            <div className="button-container">
                              <button
                                className="btn btn-rating gradient"
                                onClick={() => handleShowForm(pro)}
                              >
                                Đánh giá
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}

                  <div className="price-detail-container ">
                    <div className="row-detail d-flex justify-content-end align-items-center">
                      <div className="title">Tổng tiền hàng</div>
                      <div className="price col-3 d-flex justify-content-end">
                        200000
                      </div>
                    </div>
                    <div className="row-detail d-flex justify-content-end align-items-center">
                      <div className="title">Phí vận chuyển</div>
                      <div className="price col-3 d-flex justify-content-end">
                        ₫24.700
                      </div>
                    </div>
                    <div className="row-detail d-flex justify-content-end align-items-center">
                      <div className="title">Thành tiền</div>
                      <div className="price col-3 d-flex justify-content-end">
                        <div className="big-size">₫93.000</div>
                      </div>
                    </div>
                    <div className="row-detail d-flex justify-content-end align-items-center">
                      <div className="title">Phương thức Thanh toán</div>
                      <div className="price col-3 d-flex justify-content-end">
                        Ví ShopeePay
                      </div>
                    </div>
                  </div>
                </div>
                {showFormRating && (
                  <FeedbackModel
                    handleShowForm={handleShowForm}
                    feedback={feedback}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
