import React, { useEffect, useState } from "react";
import { InvoiceService } from "../services/invoice.service";

const useOrderData = (status) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState(status);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const fetchData = () => {
    let data1 = {
      page: page,
      page_count: 5,
      order_by: "CreatedAt desc",
      status: type,
    };
    InvoiceService.getAllInvoice(data1).then((res) => {
      setData(res.data);
      const pageCountRounded = Math.ceil(res.total_count / res.page_size);
      setPageCount(pageCountRounded);
    });
  };
  useEffect(() => {
    fetchData(type);
  }, [type, page]);
  return { data, setType, setPage, pageCount };
};

export default useOrderData;
