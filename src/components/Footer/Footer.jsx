import React, { useEffect, useState } from "react";
import "../../styles/Style.scss";

import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { ImGooglePlus } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import { BrandService } from "../../services/brand.service";

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
  }, [allBrand]);

  return (
    <div>
      <div id="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <h4 className="mb-3">Trang khác</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to={`/contact`}>Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="">Điều khoản và chính sách</Link>
                </li>
                <li>
                  <Link to="">FAQ</Link>
                </li>
                <li>
                  <Link to={`/contact`}>Liên hệ</Link>
                </li>
              </ul>
              <hr />
              <h4 className="mb-3">Phía người dùng</h4>
              <ul className="list-unstyled">
                <li>
                  <a data-toggle="modal" data-target="#login-modal">
                    Đăng ký
                  </a>
                </li>
                <li>
                  <Link to={`/login`}>Đăng nhập</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
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

            <div className="col-lg-3 col-md-6">
              <h4 className="mb-3">Nơi làm việc</h4>
              <p>
                <strong>SPKT</strong>
                <br />1 Võ Văn Ngân
                <br />
                phường Linh Chiểu
                <br />
                Thành phố Thủ Đức
                <br />
                Thành phố Hồ Chí Minh
                <br />
              </p>
              <hr className="d-block d-md-none" />
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="mb-3">Liên hệ tại</h4>
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
          <p className="text-center text-lg-left">©2022 Mạnh & Thắng.</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
