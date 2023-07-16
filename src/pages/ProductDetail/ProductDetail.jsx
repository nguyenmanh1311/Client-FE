import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/Style.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Gallery from "../../components/Gallery/Gallery";
import nocomment from "../../assets/images/nocmt.png";

import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";

import { FaShoppingCart } from "react-icons/fa";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import Comment from "../../components/Comment/Comment";
import { GlobalUtil } from "../../utils/GlobalUtil";
import StarRatings from "react-star-ratings";
import SelectRating from "./SelectRating";
import useRatingData from "../../hooks/useRatingData";
import { useDataContext } from "../../context/DataProvider";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [productRelattionship, setProductRelationship] = useState([]);
  const [currentImgUp, setCurrentImgUp] = useState("");
  const { quantityBasket, setQuantityBasket } = useDataContext();
  let [count, setCount] = useState(1);

  const { data, setType } = useRatingData(1);

  const quantityRef = useRef();
  const navigate = useNavigate();

  const incrementCount = () => {
    count = count + 1;
    setCount(count);
  };
  const decrementCount = () => {
    if (count > 0) {
      count = count - 1;
      setCount(count);
    }
  };

  const AddToCart = () => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));
    if (accessToken === null) {
      Swal.fire({
        title: "🔊 Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng!!!",
        showDenyButton: true,
        confirmButtonText: "Đăng nhập",
        denyButtonText: "Tiếp tục xem sản phẩm",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.isDenied) {
        }
      });
    } else {
      const data = {
        product_id: id,
        quantity: Number(quantityRef.current.value),
      };
      CartService.addToCart(data).then((res) => {
        if (res.status_code === 200) {
          Swal.fire(
            "Thông báo",
            "Thêm sản phẩm vào giỏ hàng thành công!",
            "success"
          );
          setQuantityBasket(!quantityBasket);
        }
      });
    }
  };

  const clickNav = (status) => {
    setType(status);
  };

  useEffect(() => {
    let isFetched = true;
    const fetchProduct = () => {
      ProductService.getProductById(id).then((res) => {
        if (isFetched) {
          setProduct(res.data);
          setCurrentImgUp(`https://${res.data.product_images[0].uri}`);
        }
      });
    };

    const fetchProductRelationship = () => {
      const input = {
        category_id: product.category_id,
        brand_id: product.brand_id,
        order_by: "CreatedAt desc",
        page_count: 3,
      };
      ProductService.getAllProduct(input).then((res) => {
        if (isFetched) {
          setProductRelationship(res.data);
        }
      });
    };

    window.scrollTo(0, 0);
    fetchProductRelationship();
    fetchProduct();
    return () => {
      isFetched = false;
    };
  }, [id]);

  return (
    <>
      <Header />
      <div id="all">
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="">Sản phẩm</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="#">Balo Laptop</a>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      {product.name}
                    </li>
                  </ol>
                </nav>
              </div>
              {/* <SidebarProduct /> */}
              <div className="col-lg-12 order-1 order-lg-2">
                <div id="productMain" className="row">
                  <div className="col-md-5 content-left">
                    <div className="img-up">
                      <img
                        style={{ height: "450px", width: "450px" }}
                        src={currentImgUp}
                        className="img-fluid"
                      />
                    </div>
                    <div className="img-down d-flex justify-content-between">
                      {product?.product_images?.map((item) => {
                        return (
                          <div className="img-small" key={item.file_upload_id}>
                            <img
                              src={"https://" + item?.uri}
                              onClick={() =>
                                setCurrentImgUp(`https://${item?.uri}`)
                              }
                              className={
                                currentImgUp === `https://${item?.uri}`
                                  ? "active"
                                  : undefined
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="box" style={{ height: "100%" }}>
                      <h1 className="text-center">{product.name}</h1>
                      <p className="goToDescription">
                        <a href="#details" className="scroll-to">
                          Bấm vào đây cuộn xuống để xem chi tiết sản phẩm.
                        </a>
                      </p>
                      <div className="row-center quantity-container d-flex align-items-center justify-content-center">
                        <div className="col-md-4 d-flex align-items-center justify-content-center">
                          Số lượng:{" "}
                        </div>
                        <button className="button-quantity">
                          <FontAwesomeIcon
                            icon={faMinus}
                            style={{ color: "#000000" }}
                            onClick={() => decrementCount()}
                          />
                        </button>
                        <input
                          ref={quantityRef}
                          type="number"
                          defaultValue="1"
                          value={count}
                          min={1}
                          className="col-md-1"
                        />
                        <button className="button-quantity">
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ color: "#000000" }}
                            onClick={() => incrementCount()}
                          />
                        </button>
                      </div>
                      <p className="price">
                        {GlobalUtil.commas(product.price + "") + "₫"}
                      </p>
                      <p className="text-center buttons">
                        <button
                          className="btn btn-primary gradient"
                          onClick={AddToCart}
                        >
                          <FaShoppingCart
                            className="fa fa-shopping-cart"
                            style={{ marginBottom: "-2px" }}
                          />{" "}
                          Thêm vào giỏ hàng
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div id="details" className="box">
                  <div className="grid">
                    <h1>{product.name}</h1>
                    <div className="row">
                      <div className="col-lg-6">
                        <p className="description">{product.description}</p>
                      </div>
                      <div className="col-lg-6">
                        <ul className="technical-data">
                          {product.material && (
                            <li>
                              <strong>Chất liệu:</strong> {product.material}
                            </li>
                          )}
                          {product.size && (
                            <li>
                              <strong>Kích thước:</strong> {product.size}
                            </li>
                          )}
                          {product.compartment_number && (
                            <li>
                              <strong>Số ngăn:</strong>{" "}
                              {product.compartment_number}
                            </li>
                          )}
                          {product.capacity && (
                            <li>
                              <strong>Thể tích:</strong> {product.capacity}
                            </li>
                          )}
                          {product.weight && (
                            <li>
                              <strong>Trọng lượng:</strong> {product.weight}
                            </li>
                          )}
                          {product.color && (
                            <li>
                              <strong>Màu sắc:</strong> {product.color}
                            </li>
                          )}
                          {product.warranty_period && (
                            <li>
                              <strong>Bảo hành:</strong>{" "}
                              {product.warranty_period}
                            </li>
                          )}
                          {product.laptop_size && (
                            <li>
                              <strong>Đựng được laptop:</strong>{" "}
                              {product.laptop_size}
                            </li>
                          )}
                          {product.water_resistance && (
                            <li>
                              <strong>Khả năng chống nước:</strong>{" "}
                              {product.water_resistance}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* <hr />
                  <div className="social">
                    <h4>Chia sẻ cho bạn bè</h4>
                    <p className="d-flex justify-content-center">
                      <a href="#" className="external facebook">
                        <BsFacebook
                          className="fa fa-facebook"
                          style={{ marginBottom: "-2px", marginRight: "-1px" }}
                        ></BsFacebook>
                      </a>
                      <a href="#" className="external gplus">
                        <ImGooglePlus
                          className="fa fa-google-plus"
                          style={{ marginBottom: "-2px", marginRight: "-1px" }}
                        ></ImGooglePlus>
                      </a>
                      <a href="#" className="external twitter">
                        <BsTwitter
                          className="fa fa-twitter"
                          style={{ marginBottom: "-2px", marginRight: "-1px" }}
                        ></BsTwitter>
                      </a>
                      <a href="#" className="email">
                        <SiGmail
                          className="fa fa-envelope"
                          style={{ marginBottom: "-2px", marginRight: "-1px" }}
                        ></SiGmail>
                      </a>
                    </p>
                  </div> */}
                </div>

                <div className="comment box">
                  <h2>ĐÁNH GIÁ SẢN PHẨM</h2>
                  <div className="star-box d-flex">
                    <div className="col-2">
                      <div className="star-number d-flex align-items-center justify-content-center">
                        <div className="bigger">{product?.avg_star}</div>trên 5
                      </div>
                      <StarRatings
                        rating={product?.avg_star}
                        starRatedColor="rgb(238, 77, 45)"
                        starDimension="25px"
                        starSpacing="0px"
                      />
                    </div>
                    <SelectRating onClickNav={clickNav} />
                  </div>
                  {data.length > 0 && (
                    <div>
                      {data.map((item) => {
                        return <Comment {...item} key={item.id} />;
                      })}
                    </div>
                  )}
                  {data.length === 0 && (
                    <div className="d-flex align-items-center justify-content-center">
                      <img src={nocomment} />
                      <h3>Chưa có đánh giá</h3>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "30px", marginTop: "60px" }}>
                  <h3>Sản Phẩm Liên Quan</h3>
                </div>
                <div className="row">
                  {productRelattionship?.map((item) => {
                    return (
                      <div className="col-md-4 col-sm-6">
                        <Gallery
                          key={item.id}
                          id={item.id}
                          image={"https://" + item.product_images[0].uri}
                          name={item.name}
                          price={item.price}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
