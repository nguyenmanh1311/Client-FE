import React from "react";
import Gallery from "../components/Gallery/Gallery";

import { Link } from "react-router-dom";
import SidebarCustomer from "../components/Sidebar/SidebarCustomer";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Wishlist = () => {
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
                      <a href="#">Trang chủ</a>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      Danh mục ưu thích
                    </li>
                  </ol>
                </nav>
              </div>
              <SidebarCustomer />
              <div id="wishlist" className="col-lg-9">
                <div className="box">
                  <h1>Danh mục ưu thích</h1>
                </div>
                <div className="row products">
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <Gallery />
                  </div>
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

export default Wishlist;
