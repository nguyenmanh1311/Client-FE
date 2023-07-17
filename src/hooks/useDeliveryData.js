import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddressService } from "../services/address.service";

const SHOP_ID = 3474658;
const SHOP_WARD_CODE = "90742";
const SHOP_DISTRICT_CODE = 3695;
const SHOP_PROVINCE_CODE = 202;

const useDeliveryData = () => {
  const [services, setServices] = useState([]);
  const [deliveryFee, setFee] = useState({});
  const [addressObj, setAddressObj] = useState(null);
  const address = JSON.parse(localStorage.getItem("address-id"));
  async function getService(
    shopId = 3474658,
    fromDistrict = SHOP_DISTRICT_CODE,
    to_district = 1486
  ) {
    try {
      const service = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=${shopId}&from_district=${fromDistrict}&to_district=${to_district}`,
        { headers: { token: "3c8a5816-6990-11ed-be76-3233f989b8f3" } }
      );
      if (service.data.code === 200) {
        setServices(service.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAddressByID = () => {
    AddressService.getAddressByID(address).then((res) => {
      setAddressObj(res.data);
    });
  };

  function calculateFee(service_id, insurance_value) {
    var data = JSON.stringify({
      service_id: Number(service_id),
      insurance_value: insurance_value,
      coupon: null,
      from_district_id: SHOP_DISTRICT_CODE,
      to_district_id: addressObj.district_id,
      to_ward_code: String(addressObj.ward_id),
      height: 45,
      length: 30,
      weight: 1000,
      width: 15,
    });

    var config = {
      method: "post",
      url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      headers: {
        token: "3c8a5816-6990-11ed-be76-3233f989b8f3",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setFee(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    (async function () {
      if (addressObj !== null) {
        getService(SHOP_ID, 3695, addressObj?.district_id);
      }
    })();
  }, [addressObj]);

  useEffect(() => {
    fetchAddressByID();
  }, []);

  return { services, getService, deliveryFee, calculateFee };
};

export default useDeliveryData;
