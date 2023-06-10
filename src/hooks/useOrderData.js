import React, { useEffect, useState } from "react";
import { InvoiceService } from "../services/invoice.service";

const useOrderData = (status) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState(status);
  const fetchData = (status) => {
    if (status === 1) {
      InvoiceService.getAllInvoice().then((res) => {
        setData(res.data);
      });
    }
    if (status === 2) {
      InvoiceService.getAllInvoice({ status: 1 }).then((res) => {
        setData(res.data);
      });
    }
    if (status === 3) {
      InvoiceService.getAllInvoice({ status: 2 }).then((res) => {
        setData(res.data);
      });
    }
    if (status === 4) {
      InvoiceService.getAllInvoice({ status: 3 }).then((res) => {
        setData(res.data);
      });
    }
    if (status === 5) {
      InvoiceService.getAllInvoice({ status: 4 }).then((res) => {
        setData(res.data);
      });
    }
  };
  useEffect(() => {
    fetchData(type);
  }, [type]);
  return { data, setType };
};

export default useOrderData;
