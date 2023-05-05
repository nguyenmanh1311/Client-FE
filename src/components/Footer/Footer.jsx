import React, { useEffect, useState } from "react";
import "../../styles/Style.scss";
import logo from "../../assets/images/logo/baloshop-w.png";

import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import { BrandService } from "../../services/brand.service";

import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const [allBrand, setAllBrand] = useState([]);

  useEffect(() => {
    let isFetched = true;

    const fetchshowAllBrand = () => {
      BrandService.getAllBrand().then((res) => {
        if (isFetched) {
          setAllBrand(res.data);
        }
      });
    };

    fetchshowAllBrand();
    return () => {
      isFetched = false;
    };
  }, []);

  return (
    <div>
      <div id="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 other-page">
              <h4 className="mb-3">Về chúng tôi</h4>
              <p>
                BaloShop - Chuyên cung cấp Balo, Cặp, Túi cao cấp hàng đầu Việt
                Nam! Để Tận tâm Phục vụ Quý Khách Hàng. BaloShop đưa ra 8 Cam
                kết:
              </p>
              <br />
              <p>1. Hàng Hiệu Chính Hãng 100%</p>
              <p>2. Free Ship COD Toàn Quốc</p>
              <p>3. Được kiểm hàng trước khi nhận</p>
              <p>4. Đổi Trả 90 Ngày Miễn Phí!</p>
              <p>5. Bảo Hành Trọn Đời Sản Phẩm!</p>
              <p>6. Hoàn Tiền 100% Nếu không hài lòng</p>
              <p>7. Gói Quà, Viết Thiệp theo lời Chúc của Bạn</p>
              <p>8. Đổi cũ lấy mới sau 3 năm sử dụng (dịch vụ)</p>
            </div>

            <div className="col-lg-2 col-md-6 brand">
              <h4 className="mb-3">Thương hiệu</h4>
              <ul className="list-unstyled">
                {allBrand.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link to={`/product/brand/${item.id}`}>{item.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 contact">
              <h4 className="mb-3">Liên hệ</h4>
              <address>
                <div className="location">
                  <FontAwesomeIcon icon={faLocationDot} size="lg" />
                </div>
                1 Võ Văn Ngân , phường Linh Chiểu , Thành phố Thủ Đức , Thành
                phố Hồ Chí Minh
              </address>
              <div>
                <div className="location">
                  <FontAwesomeIcon icon={faPhone} size="lg" />
                </div>
                <a href="tel:0866926213">0866926213</a> (8h - 21h)
              </div>
              <hr className="d-block d-md-none" />
            </div>
            <div className="col-lg-3 col-md-6 social">
              <h4 className="mb-3">Mạng xã hội</h4>
              <p className="social">
                <a
                  href="https://www.facebook.com/mlcl.2007"
                  className="facebook external"
                >
                  <BsFacebook
                    className="fa fa-facebook"
                    style={{ marginBottom: "-4px", marginRight: "-1px" }}
                  ></BsFacebook>
                </a>
                <Link to="" className="twitter external">
                  <BsTwitter
                    className="fa fa-twitter"
                    style={{ marginBottom: "-4px", marginRight: "-1px" }}
                  ></BsTwitter>
                </Link>
                <Link to="" className="instagram external">
                  <BsInstagram
                    className="fa fa-instagram"
                    style={{ marginBottom: "-4px", marginRight: "-1px" }}
                  ></BsInstagram>
                </Link>
                <Link to="" className="gplus external">
                  <ImGooglePlus
                    className="fa fa-google-plus"
                    style={{ marginBottom: "-4px", marginRight: "-1px" }}
                  ></ImGooglePlus>
                </Link>
                <Link to="" className="email external">
                  <SiGmail
                    className="fa fa-envelope"
                    style={{ marginBottom: "-4px", marginRight: "-1px" }}
                  ></SiGmail>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="copyright">
        <div className="container">
          <p className="text-center text-lg-left">©2023 Mạnh & Thắng.</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
