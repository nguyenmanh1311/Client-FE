import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import logo from "../assets/images/logo/baloshop-black.png";

import "../styles/Style.scss";

import { Link } from "react-router-dom";
import SidebarNews from "../components/Sidebar/SidebarNews";

const News = () => {
  return (
    <>
      <Header />
      <div id="all" className="news-page">
        <div id="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Tin tức
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-lg-9">
                <div className="box">
                  <h1>Tin tức</h1>
                  <div className="row">
                    <div className="col-lg-3">
                      <img
                        src={logo}
                        alt="BaloSG"
                        className="d-none d-md-inline-block logo"
                      />
                    </div>
                    <div className="col-lg-9 d-flex justify-content-center flex-column">
                      <p class="title">Nội dung ở đây</p>
                      <p>Mô tả ngắn</p>
                      <a>Xem thêm</a>
                    </div>
                  </div>
                </div>
              </div>
              <SidebarNews />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
