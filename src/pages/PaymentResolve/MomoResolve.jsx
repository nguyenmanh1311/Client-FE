import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { InvoiceService } from "../../services/invoice.service";
// import { axiosInstance } from "../../../Admin/src/api/axios.config";

const MomoResolve = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const invoiceId = searchParams.get("extraData");
    if (Number(searchParams.get("resultCode")) === 0) {
      const input = {
        invoice_id: invoiceId,
        is_payment: true,
      };
      InvoiceService.updatePaymentStatus(input).then(() => {
        setTimeout(navigate("/payment/success"), 1000);
      });
    } else {
      const input = {
        invoice_id: invoiceId,
        status: 4,
      };
      InvoiceService.updatePaymentStatus(input);
      setTimeout(navigate("/payment/fail"), 1000);
    }
  }, []);
};
//localhost:3000/checkout_result
//?partnerCode=MOMO5RGX20191128
// &orderId=c5fe2526-4cb1-4d8c-bad8-ce7a75e3aa17
// &requestId=a1b1e927-3071-4b54-96ab-c59588986136
// &amount=840000
// &orderInfo=infor
// &orderType=momo_wallet
// &transId=2998268138
//&resultCode=0
// &message=Successful.
// &payType=qr
// &responseTime=1684663976800&extraData=NjM4MjAyNjA3MzIzOTI4Mzc0LWMyMTg3YjJjOTM0
// &signature=669dfe312f3fb4c1fb9a7ad5b5dbc74b7cd029633751a207298d69bf48e96070

// http://localhost:3000/checkout_result?vnp_Amount=202899000&
// ?vnp_BankCode=NCB&vnp_BankTranNo=VNP14061308&
// vnp_CardType=ATM&
// vnp_OrderInfo=Thanh+toan+don+hang%3ANjM4MjQ0MjA4Njc5MTA4MjIzLWFhMDNjOWRiMDVh&
// vnp_PayDate=20230708204834&
// vnp_ResponseCode=00&
// vnp_TmnCode=5AKIGB37&
// vnp_TransactionNo=14061308&
// vnp_TransactionStatus=00&
// vnp_TxnRef=NjM4MjQ0MjA4Njc5MTA4MjIzLWFhMDNjOWRiMDVh&
// vnp_SecureHash=161dd87a48e3c25bbe3bad2b11442f2daf3d0360afb1912dcd14d39d1ae9ae19fea7728758997cdc6f9f008d6040bba5e0454c83bb6159cbd9ec783649903879

export default MomoResolve;
