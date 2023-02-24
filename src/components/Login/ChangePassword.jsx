import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/baloshop-w.png";
import { AuthService } from "../../services/auth.service";
import "../Login/Login.scss";
import swal2 from "sweetalert2";

const ChangePassword = () => {
  const registerRef = useRef(null);

  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const confirmOnClick = () => {
    if (isChecked) {
      AuthService.register(passwordRegister, confirmPassword).then((res) => {
        if (res.status === "OK") {
          swal2.fire("Thông báo", res.message, "success");
          navigate("/login");
        } else {
          swal2.fire("Thông báo", res.message, "error");
        }
      });
    } else {
      swal2.fire("Thông báo", "Bạn phải đồng ý với điều khoản", "warning");
    }
  };

  const otp = () => {
    navigate("/otp");
  };

  return (
    <div>
      <div className="hero">
        <div className="form-box">
          <div className="social-icons">
            <img src={logo} alt="" />
          </div>

          <h3>Vui lòng đổi lại mật khẩu</h3>

          <form id="register" ref={registerRef} className="input-group-login">
            <input
              type="password"
              className="input-field"
              placeholder="Nhập mật khẩu"
              required
              onChange={(event) => {
                setPasswordRegister(event.target.value);
              }}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Nhập lại mật khẩu"
              required
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <br />
            <br />
            <div className="submit-btn" onClick={() => confirmOnClick()}>
              Xác nhận đổi mật khẩu
            </div>
          </form>
        </div>
      </div>
      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ChangePassword;
