import React from "react";
import "../../styles/Style.scss";
import { Link } from "react-router-dom";

const Gallery = ({ id, image, name, price, discount }) => {
  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, "$&.");
  };
  return (
    <div className="item">
      <div className="product ">
        <div className="flip-container">
          <div className="flipper">
            <div className="front">
              <Link to={`/product-detail/${id}`}>
                <img src={image} alt="" className="img-fluid" />
              </Link>
            </div>
            <div className="back">
              <Link to={`/product-detail/${id}`}>
                <img src={image} alt="" className="img-fluid" />
              </Link>
            </div>
          </div>
        </div>
        <Link to={`/product-detail/${id}`} className="invisible">
          <img src={image} alt="" className="img-fluid" />
        </Link>
        <div className="text">
          <h3>
            <Link to={`/product-detail/${id}`}>{name}</Link>
          </h3>
          <p className="price">
            <del></del>
            <font color="red">{commas(price + "") + "₫"}</font>
          </p>
        </div>
        {discount && <span className="percent">{discount}</span>}
      </div>
    </div>
  );
};

export default Gallery;
