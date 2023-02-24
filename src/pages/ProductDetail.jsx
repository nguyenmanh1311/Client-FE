import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/Style.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Gallery from "../components/Gallery/Gallery";
import SidebarProduct from "../components/Sidebar/SidebarProduct";
import { ProductService } from "../services/product.service";
import { CartService } from "../services/cart.service";
import { ImageService } from "../services/image.service";

import { FaShoppingCart } from "react-icons/fa";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";
import { SiGmail } from "react-icons/si";

import Carousel from "nuka-carousel/lib/carousel";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { id } = useParams();
  const [imageProduct, setImageProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [productRelattionship, setProductRelationship] = useState([]);
  const quantityRef = useRef();
  const navigate = useNavigate();

  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, "$&.");
  };

  const AddToCart = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (userId === null) {
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
      CartService.getCartId(userId).then((res) => {
        const data = {
          cartId: res.data.id,
          productId: id,
          quantity: Number(quantityRef.current.value),
        };
        CartService.addToCart(data).then((res) => {
          if (res.status === "OK") {
            Swal.fire(
              "Thông báo",
              "Thêm sản phẩm vào giỏ hàng thành công!",
              "success"
            );
          }
        });
      });
    }
  };

  useEffect(() => {
    let isFetched = true;
    const fetchProduct = () => {
      ProductService.getProductById(id).then((res) => {
        if (isFetched) {
          setProduct(res.data);
        }
      });
    };

    const fetchImage = () => {
      ImageService.getAllImageByProductId(id).then((res) => {
        if (isFetched) {
          setImageProduct(res.data);
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

    window.scrollTo(0, 0);
    fetchImage();
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
                      White Blouse Armani
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarProduct />
              <div className="col-lg-9 order-1 order-lg-2">
                <div id="productMain" className="row">
                  <div className="col-md-6">
                    <Carousel
                      renderCenterLeftControls={false}
                      renderCenterRightControls={false}
                      renderCenterBottomControls={true}
                      data-slider-id="1"
                      className="owl-carousel shop-detail-carousel"
                    >
                      {imageProduct.map((item) => {
                        return (
                          <div className="item" key={item}>
                            <img
                              src={
                                "http://localhost:8080/api/v1/image_product/" +
                                item
                              }
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                  <div className="col-md-6">
                    <div className="box">
                      <h1 className="text-center">{product.name}</h1>
                      <p className="goToDescription">
                        <a href="#details" className="scroll-to">
                          Bấm vào đây cuộn xuống để xem chi tiết sản phẩm.
                        </a>
                      </p>
                      <div className="row-center">
                        <h6 className="col-md-4">Số lượng: </h6>
                        <input
                          ref={quantityRef}
                          type="number"
                          defaultValue="1"
                          min={1}
                          className="form-control col-md-2"
                        />
                      </div>
                      <p className="price">
                        {commas(Number(product.price) + "")}
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
                    <div className="row">
                      <div className="col-lg-6">
                        <p>{product.description}</p>
                      </div>
                      <div className="col-lg-6">
                        <p>{product.specifications}</p>
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
