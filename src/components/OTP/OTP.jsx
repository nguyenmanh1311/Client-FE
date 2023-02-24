import { useState } from "react";
import CountDownAnimation from "./CountDownAnimation";
import GenerateOTP from "./GenerateOTP";
import InputOTP from "./InputOTP";
import "./OTP.scss";
import Swal from "sweetalert2";

const OTP = () => {
  const [orgOTPParent, setOrgOTPParent] = useState("");
  const [userOTPParent, setUserOTPParent] = useState("");
  const [isDisableBtn, setIsDisableBtn] = useState(false);

  const handleSubmitOTP = () => {
    if (!orgOTPParent) {
      Swal.fire("Thông báo", "Vui lòng nhập OTP", "warning");
      return;
    }
    if (!userOTPParent) {
      Swal.fire("Thông báo", "Vui lòng nhập OTP", "warning");
      return;
    }

    if (+orgOTPParent === +userOTPParent) {
      Swal.fire("Thông báo", "Mã OTP hợp lệ", "success");
      // setInterval(() => {
      //   navigate("/change-password");
      // }, 1000);
    } else {
      Swal.fire("Thông báo", "Mã OTP không đúng", "error");
    }
  };

  return (
    <div className="otp-parent-container">
      <div className="form-box">
        <GenerateOTP setOrgOTPParent={setOrgOTPParent} />
        <InputOTP
          setUserOTPParent={setUserOTPParent}
          handleSubmitOTP={handleSubmitOTP}
          isDisableBtn={isDisableBtn}
          setIsDisableBtn={setIsDisableBtn}
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
