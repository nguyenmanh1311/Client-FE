import React, { useEffect, useState } from "react";
import "../ProductDetail/SelectRating.scss";
import { RatingService } from "../../services/rating.service";
import { useParams } from "react-router-dom";

const SelectRating = ({ onClickNav }) => {
  const { id } = useParams();

  const [select, setSelect] = useState(1);
  const [quantityRating, setQuantityRating] = useState([]);

  useEffect(() => {
    let isFetched = true;

    const fetchQuantityRating = () => {
      RatingService.getQuantityRating(id).then((res) => {
        if (isFetched) {
          setQuantityRating(res.data);
        }
      });
    };

    fetchQuantityRating();
    return () => {
      isFetched = false;
    };
  }, [id]);

  return (
    <div className="select-rating-container">
      <ul className="nav-container">
        <li>
          <a
            onClick={() => {
              onClickNav(1);
              setSelect(1);
            }}
            className={select === 1 ? "active" : undefined}
          >
            Tất cả ({quantityRating.total})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(2);
              setSelect(2);
            }}
            className={select === 2 ? "active" : undefined}
          >
            5 sao ({quantityRating.total_rate5})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(3);
              setSelect(3);
            }}
            className={select === 3 ? "active" : undefined}
          >
            4 sao ({quantityRating.total_rate4})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(4);
              setSelect(4);
            }}
            className={select === 4 ? "active" : undefined}
          >
            3 sao ({quantityRating.total_rate3})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(5);
              setSelect(5);
            }}
            className={select === 5 ? "active" : undefined}
          >
            2 sao ({quantityRating.total_rate2})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(6);
              setSelect(6);
            }}
            className={select === 6 ? "active" : undefined}
          >
            1 sao ({quantityRating.total_rate1})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(7);
              setSelect(7);
            }}
            className={select === 7 ? "active" : undefined}
          >
            Có hình ảnh ({quantityRating.total_had_image})
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              onClickNav(8);
              setSelect(8);
            }}
            className={select === 8 ? "active" : undefined}
          >
            Có bình luận ({quantityRating.total_had_content})
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SelectRating;
