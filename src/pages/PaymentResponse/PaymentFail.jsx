import "../PaymentResponse/payment.scss";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const PaymentFail = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="background">
        <div className="box">
          <IoCloseCircle
            className="icon"
            style={{
              color: "rgb(197 56 42)",
              fontSize: "100px",
              marginBottom: "30px",
            }}
          />
          <h2>
            <strong>Thanh toán thất bại</strong>
          </h2>
          <p>Vui lòng kiểm tra lại thông tin.</p>
          <div className="row">
            <button
              className="again"
              onClick={() => {
                navigate("/check-address");
              }}
            >
              Thanh toán lại
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFail;
