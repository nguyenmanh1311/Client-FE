import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/baloshop-w.png";
import { AuthService } from "../../services/auth.service";
import "../Login/Login.scss";
import swal2 from "sweetalert2";
import OTP from "../OTP/OTP";

const Login = () => {
  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const forgetPasswordRef = useRef(null);
  const btnRef = useRef(null);

  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailForgetPW, setEmailForgetPW] = useState("");
  const [email, setEmail] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [isHide, setHide] = useState(true);

  const navigate = useNavigate();
  const loginOnclick = async () => {
    await AuthService.login(usernameLogin, passwordLogin).then((response) => {
      if (
        response.status === "UNAUTHORIZED" ||
        response.status === "BAD_REQUEST"
      ) {
        swal2.fire(
          "Thông báo",
          "Thông tin đăng nhập không chính xác!",
          "warning"
        );
      }
      if (!response.data.enable) {
        {
          localStorage.clear();
          swal2.fire("Thông báo", "Tài khoản đã dừng hoạt động!", "error");
        }
      }
      if (localStorage.getItem("accessToken")) {
        navigate("/");
      }
    });
  };

  const registerOnClick = () => {
    if (isChecked) {
      AuthService.register(
        phone,
        passwordRegister,
        confirmPassword,
        email
      ).then((res) => {
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
  const agree = () => {
    setIsChecked(!isChecked);
  };

  const register = () => {
    registerRef.current.style.left = "50px";
    loginRef.current.style.left = "450px";
    btnRef.current.style.left = "0";
  };
  const login = () => {
    loginRef.current.style.left = "50px";
    registerRef.current.style.left = "-400px";
    btnRef.current.style.left = "110px";
  };

  const fogetPassword = () => {
    setHide(false);
    forgetPasswordRef.current.style.left = "50px";
    loginRef.current.style.left = "-400px";
    registerRef.current.style.left = "-850px";
  };

  const backLogin = async () => {
    loginRef.current.style.left = "50px";
    registerRef.current.style.left = "-400px";
    forgetPasswordRef.current.style.left = "450px";
    await setHide(true);
    btnRef.current.style.left = "110px";
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
          {isHide && (
            <div className="button-box">
              <div id="btn" ref={btnRef}></div>
              <button
                type="button"
                className="toogle-btn"
                onClick={() => register()}
              >
                Đăng Ký
              </button>
              <button
                type="button"
                className="toogle-btn"
                onClick={() => login()}
              >
                Đăng Nhập
              </button>
            </div>
          )}
          {!isHide && <h3>Quên mật khẩu</h3>}

          <div id="login" ref={loginRef} className="input-group-login">
            <input
              type="text"
              className="input-field"
              placeholder="Nhập số điện thoại "
              required
              onChange={(event) => {
                setUsernameLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Nhập mật khẩu"
              required
              onChange={(event) => {
                setPasswordLogin(event.target.value);
              }}
            />
            <div className="d-flex align-items-center">
              <input id="remember" type="checkbox" className="check-box" />
              <label style={{ marginBottom: 0 }} htmlFor="remember">
                Ghi nhớ mật khẩu
              </label>
            </div>
            <div className="submit-btn" onClick={() => loginOnclick()}>
              Đăng nhập
            </div>
            <a
              type="button"
              className="toogle-btn forget-btn"
              onClick={() => fogetPassword()}
            >
              Quên mật khẩu?
            </a>
          </div>
          <div id="register" ref={registerRef} className="input-group-login">
            <input
              type="text"
              className="input-field"
              placeholder="Nhập số điện thoại"
              required
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
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

            <div className="d-flex align-items-center" onChange={() => agree()}>
              <input id="agree" type="checkbox" className="check-box" />
              <label style={{ marginBottom: 0 }} htmlFor="agree">
                Tôi đồng ý với các chính sách và điều khoản
              </label>
            </div>
            <div className="submit-btn" onClick={() => registerOnClick()}>
              Đăng ký
            </div>
          </div>
          <div
            id="forgetPassword"
            ref={forgetPasswordRef}
            className="input-group-login"
          >
            <input
              type="text"
              className="input-field"
              placeholder="Nhập email "
              required
              onChange={(event) => {
                setEmailForgetPW(event.target.value);
              }}
            />
            <br />
            <br />

            <div className="submit-btn" onClick={() => otp()}>
              Tiếp tục
            </div>

            <a
              type="button"
              className="toogle-btn back-btn"
              onClick={() => backLogin()}
            >
              Đăng nhập
            </a>
          </div>
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

export default Login;
