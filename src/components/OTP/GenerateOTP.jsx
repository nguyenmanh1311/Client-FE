import { useState } from "react";

const GenerateOTP = (props) => {
  const [orgOTP, setOrgOTP] = useState("");

  const handleClickBtn = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOrgOTP(otp);
    props.setOrgOTPParent(otp);
  };
  return (
    <div className="generate-otp-container">
      <button onClick={() => handleClickBtn()}>Nhận mã OTP</button>
      {/* <div className="title">Mã OTP là: {orgOTP}</div> */}
    </div>
  );
};

export default GenerateOTP;
