import { useState } from "react";
import InputOTP from "./InputOTP";
import "./OTP.scss";
import Swal from "sweetalert2";
import { useDataContext } from "../../context/DataProvider";
import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [userOTPParent, setUserOTPParent] = useState("");
  const [newPasswordParent, setNewPasswordParent] = useState("");
  const [newPasswordConfirmParent, setNewPasswordConfirmParent] = useState("");
  const [isDisableBtn, setIsDisableBtn] = useState(false);
  const { phoneForgetPass } = useDataContext();

  const navigate = useNavigate();

  const handleSubmitOTP = () => {
    if (!userOTPParent) {
      Swal.fire("Thông báo", "Vui lòng nhập OTP", "warning");
      return;
    }

    const data = {
      username: phoneForgetPass,
      otp: userOTPParent,
      password: newPasswordParent,
    };

    AuthService.confirmPassword(data)
      .then((response) => {
        if (response.data.status_code === 200) {
          Swal.fire("Thông báo", "Khôi phục mật khẩu thành công.", "success");
          navigate("/login");
        }
        if (response.data.status_code === 400) {
          Swal.fire(
            "Thông báo",
            "OTP không đúng, vui lòng kiểm tra lại.",
            "error"
          );
        }
        if (response.data.status_code === 404) {
          Swal.fire("Thông báo", "OTP hết hạn, vui lòng nhập lại", "error");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="otp-parent-container">
      <div className="form-box">
        <InputOTP
          setUserOTPParent={setUserOTPParent}
          handleSubmitOTP={handleSubmitOTP}
          isDisableBtn={isDisableBtn}
          setIsDisableBtn={setIsDisableBtn}
          setNewPasswordParent={setNewPasswordParent}
          setNewPasswordConfirmParent={setNewPasswordConfirmParent}
        />
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

export default OTP;
