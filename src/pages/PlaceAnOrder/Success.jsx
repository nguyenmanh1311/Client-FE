import "../../pages/PaymentResponse/payment.scss";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="background">
        <div className="box">
          <BsCheckCircleFill
            className="icon"
            style={{
              color: "rgb(42 197 111)",
              fontSize: "100px",
              marginBottom: "30px",
            }}
          />
          <h2>
            <strong>Đặt hàng thành công</strong>
          </h2>
          <p>Mã số đơn hàng của bạn là</p>
          <p>
            Bạn có thể xem chi tiết đơn hàng này trong{" "}
            <Link to={`/all-order`} className="orders">
              Tất cả đơn hàng.
            </Link>
          </p>
          <button
            style={{
              marginTop: "30px",
            }}
            className="continue"
            onClick={() => {
              navigate("/collections");
            }}
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Success;
