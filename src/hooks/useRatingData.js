import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RatingService } from "../services/rating.service";

const useRatingData = (select) => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [type, setType] = useState(select);

  const fetchData = (select) => {
    //All
    if (select === 1) {
      const input = {
        product_id: id,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //5 star
    if (select === 2) {
      const input = {
        product_id: id,
        rate: 5,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //4 star
    if (select === 3) {
      const input = {
        product_id: id,
        rate: 4,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //3 star
    if (select === 4) {
      const input = {
        product_id: id,
        rate: 3,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //2 star
    if (select === 5) {
      const input = {
        product_id: id,
        rate: 2,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //1 star
    if (select === 6) {
      const input = {
        product_id: id,
        rate: 1,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //has image
    if (select === 7) {
      const input = {
        product_id: id,
        is_had_image: true,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }

    //has content
    if (select === 8) {
      const input = {
        product_id: id,
        is_had_content: true,
      };
      RatingService.getAllRating(input).then((res) => {
        setData(res.data);
      });
    }
  };
  useEffect(() => {
    fetchData(type);
  }, [type]);
  return { data, setType };
};

export default useRatingData;
