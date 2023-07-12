import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { InvoiceService } from "../../services/invoice.service";

const VNPayResolve = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const invoiceId = searchParams.get("vnp_TxnRef");

    if (searchParams.get("vnp_ResponseCode") == "00") {
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
export default VNPayResolve;
