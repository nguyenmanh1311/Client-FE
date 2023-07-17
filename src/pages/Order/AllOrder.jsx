import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import { InvoiceService } from "../../services/invoice.service";
import { GlobalUtil } from "../../utils/GlobalUtil";
import Navigation from "./Nav/Navigation";
import useOrderData from "../../hooks/useOrderData";
import emptyOrder from "../../assets/images/don-hang-trong.png";
import ReactPaginate from "react-paginate";

const AllOrder = () => {
  const navigate = useNavigate();
  const { data, setType, setPage, pageCount } = useOrderData(null);

  const clickNav = (status) => {
    setType(status);
    setPage(1);
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      navigate("/login");
    }
  });

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
                <Navigation onClickNav={clickNav} />
                <div className="box">
                  {data.length === 0 && (
                    <div className="empty-order d-flex justify-content-center align-items-center flex-column">
                      <img src={emptyOrder} />
                      <div>Chưa có đơn hàng</div>
                    </div>
                  )}
                  {data.length != 0 &&
                    data.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className="order-container d-flex justify-content-between align-items-center">
                            <div className="info-container d-flex justify-content-center align-items-start flex-column">
                              <div>
                                <strong>
                                  {item.fullname} - {item.phone_number}
                                </strong>
                              </div>

                              {item.address}
                              <div className="status-payment-container">
                                Trạng thái thanh toán :
                                {item.is_payment === true && (
                                  <span className=""> Đã thanh toán</span>
                                )}
                                {item.is_payment === false && (
                                  <span className=""> Chưa thanh toán </span>
                                )}
                              </div>
                              <div className="status-payment-container">
                                Phương thức thanh toán :
                                {item.payment_method === 0 && (
                                  <span className=""> MOMO</span>
                                )}
                                {item.payment_method === 1 && (
                                  <span className=""> VNPAY</span>
                                )}
                                {item.payment_method === 3 && (
                                  <span className=""> COD</span>
                                )}
                              </div>
                              <div className="status-invoice-container">
                                Trạng thái đơn hàng:
                                {item.status === 1 && (
                                  <span className=""> Đang chờ xác nhận</span>
                                )}
                                {item.status === 2 && (
                                  <span className=""> Đang giao hàng</span>
                                )}
                                {item.status === 3 && (
                                  <span className=""> Hoàn thành</span>
                                )}
                                {item.status === 4 && (
                                  <span className=""> Đã hủy</span>
                                )}
                              </div>
                              <div>
                                Ngày đặt hàng:{" "}
                                {GlobalUtil.dateConvert(item.created_at)}
                              </div>
                              <div>
                                Tổng tiền:{" "}
                                {GlobalUtil.commas(
                                  item.total + item.shipping_fee + ""
                                ) + "₫"}
                              </div>
                            </div>
                            <div className="button-container d-flex flex-column ">
                              <Link
                                to={`/order-detail/${item.id}`}
                                className="btn btn-blue "
                              >
                                Xem Chi Tiết
                              </Link>
                              {item.status === 1 && (
                                <button
                                  className="btn btn-rating gradient"
                                  onClick={() => {
                                    const input = {
                                      invoice_id: item.id,
                                      status: 4,
                                    };
                                    InvoiceService.updatePaymentStatus(input);
                                    window.location.reload();
                                  }}
                                >
                                  Hủy Đơn
                                </button>
                              )}
                              {item.status === 2 && (
                                <button
                                  className="btn btn-green"
                                  onClick={() => {
                                    const input = {
                                      invoice_id: item.id,
                                      status: 3,
                                    };
                                    InvoiceService.updatePaymentStatus(input);
                                    window.location.reload();
                                  }}
                                >
                                  Đã Nhận Hàng
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <br />
                  {pageCount > 1 && (
                    <ReactPaginate
                      className="pagination-item"
                      breakLabel="..."
                      nextLabel="►"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="◄"
                      renderOnZeroPageCount={null}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
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
