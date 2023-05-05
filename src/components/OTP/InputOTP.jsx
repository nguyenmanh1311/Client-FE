import React, { useRef, useState } from "react";
import OtpInput from "react-otp-input";
import Swal from "sweetalert2";
import { useDataContext } from "../../context/DataProvider";
import { AuthService } from "../../services/auth.service";
import CountDown from "./CountDown";
import CountDownAnimation from "./CountDownAnimation";

const InputOTP = (props) => {
  const childRef = useRef();
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { phoneForgetPass } = useDataContext();

  const handleChange = (otp) => {
    setOtp(otp);
    props.setUserOTPParent(otp);
  };

  const handleConfirmOTP = () => {
    props.handleSubmitOTP();
  };

  const validatePasswords = () => {
    if (
      newPassword !== newPasswordConfirm &&
      newPassword.length != 0 &&
      newPasswordConfirm.length != 0
    ) {
      return "Mật khẩu không khớp";
    } else {
      return "";
    }
  };

  const validateInput = () => {
    if (newPassword.length < 8 && newPassword.length != 0) {
      return "Mật khẩu phải có ít nhất 8 ký tự";
    } else {
      return "";
    }
  };

  const handleClearBtn = () => {
    childRef.current.restTimer();
    AuthService.resetPassword(phoneForgetPass)
      .then((response) => {
        if (response.data.status_code === 200) {
          Swal.fire(
            "Thông báo",
            "Đã gửi lại OTP,vui lòng kiểm tra email của bạn",
            "success"
          );
        }
      })
      .catch(function (error) {
        if (error.response.data.status_code === 409) {
          Swal.fire(
            "Thông báo",
            "OTP đã được gửi, vui lòng đợi 1 phút sau để gửi lại",
            "error"
          );
        }

        if (error.response.data.status_code === 404) {
          Swal.fire("Thông báo", "Số điện thoại không hợp lệ", "error");
        }
      });
  };
  return (
    <div className="input-otp-container">
      <div className="timer">
        <CountDownAnimation
          setIsDisableBtn={props.setIsDisableBtn}
          ref={childRef}
        />
      </div>
      <div className="title">Nhập mã OTP</div>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={<span>-</span>}
        inputStyle={"input-customize"}
      />
      <div className="input-newpassword-container">
        <input
          type="password"
          className="input-field"
          placeholder="Nhập mật khẩu mới"
          required
          minLength="8"
          onChange={(event) => {
            setNewPassword(event.target.value);
            props.setNewPasswordParent(newPassword);
          }}
          value={newPassword}
        />
        <div>
          {validateInput() && (
            <div style={{ color: "red" }}>{validateInput()}</div>
          )}
        </div>
        <input
          type="password"
          className="input-field"
          placeholder="Nhập lại mật khẩu mới"
          required
          minLength="8"
          onChange={(event) => {
            setNewPasswordConfirm(event.target.value);
            props.setNewPasswordConfirmParent(newPasswordConfirm);
          }}
          value={newPasswordConfirm}
        />

        <div>
          {validatePasswords() && (
            <div style={{ color: "red" }}>{validatePasswords()}</div>
          )}
        </div>
      </div>
      <div className="action">
        <button
          className="clear"
          onClick={() => handleClearBtn()}
          disabled={!props.isDisableBtn}
        >
          Nhận lại mã OTP
        </button>
        <button
          className="confirm"
          disabled={props.isDisableBtn}
          onClick={() => handleConfirmOTP()}
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default InputOTP;
