import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";
import SidebarProduct from "../components/Sidebar/SidebarProduct";
import { ProductService } from "../services/product.service";
import { CartService } from "../services/cart.service";
import { ImageService } from "../services/image.service";

import StarsRating from "react-star-rate";
import { ReactionBarSelector } from "@charkour/react-reactions";

import { FaShoppingCart } from "react-icons/fa";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";
import { SiGmail } from "react-icons/si";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import { RatingService } from "../services/rating.service";
import { useDataContext } from "../context/DataProvider";
import Comment from "../components/Comment/Comment";
import { GlobalUtil } from "../utils/GlobalUtil";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [productRelattionship, setProductRelationship] = useState([]);
  const [currentImgUp, setCurrentImgUp] = useState("");
  let [count, setCount] = useState(1);
  const [rating, setRating] = useState([]);

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
        }
      });
    }
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
      ProductService.get4RelateProduct(id).then((res) => {
        if (isFetched) {
          setProductRelationship(res.data);
        }
      });
    };

    const fetchRating = () => {
      const input = {
        product_id: id,
      };
      RatingService.getAllRating(input).then((res) => {
        if (isFetched) {
          setRating(res.data);
        }
      });
    };

    window.scrollTo(0, 0);
    fetchRating();
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
              <SidebarProduct />
              <div className="col-lg-9 order-1 order-lg-2">
                <div id="productMain" className="row">
                  <div className="col-md-6 content-left">
                    <div className="img-up">
                      <img src={currentImgUp} className="img-fluid" />
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
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="box">
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
                          className="col-md-2"
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
                        {GlobalUtil.commas(Number(product.price) + "₫")}
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

                <div className="comment">
                  {rating.map((item) => {
                    return <Comment {...item} key={item.id} />;
                  })}
                </div>
                <div style={{ marginBottom: "30px", marginTop: "60px" }}>
                  <h3>Sản phẩm liên quan</h3>
                </div>
                <div className="row same-height-row">
                  {productRelattionship?.map((item) => {
                    return (
                      <div className="col-md-3 col-sm-6">
                        <Gallery
                          key={item.id}
                          id={item.id}
                          image={
                            "http://localhost:8080/api/v1/image_product/" +
                            item.image
                          }
                          name={item.name}
                          price={item.price}
                        />
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginBottom: "30px", marginTop: "60px" }}>
                  <h3>Sản phẩm đã xem cần đây</h3>
                </div>
                <div className="row same-height-row">
                  {productRelattionship.map((item) => {
                    return (
                      <div className="col-md-3 col-sm-6">
                        <Gallery
                          key={item.id}
                          id={item.id}
                          image={
                            "http://localhost:8080/api/v1/image_product/" +
                            item.image
                          }
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
