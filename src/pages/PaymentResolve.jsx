import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { InvoiceService } from "../services/invoice.service";
// import { axiosInstance } from "../../../Admin/src/api/axios.config";

const PaymentResolve = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const invoiceId = Number(searchParams.get("extraData"));
    if (Number(searchParams.get("resultCode")) === 0) {
      InvoiceService.updatePaymentStatus(invoiceId).then(() => {
        setTimeout(navigate("/payment/success"), 1000);
      });
    } else {
      InvoiceService.cancelInvoice(invoiceId);
      setTimeout(navigate("/payment/fail"), 1000);
    }
  }, []);
};

export default PaymentResolve;
