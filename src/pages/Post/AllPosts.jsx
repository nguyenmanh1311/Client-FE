import React, { useEffect, useState } from "react";
import "../../styles/Style.scss";

import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import SidebarNews from "../../components/Sidebar/SidebarNews";
import Footer from "../../components/Footer/Footer";
import { PostService } from "../../services/post.service";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = () => {
      PostService.getAllPosts().then((res) => {
        if (res.status_code === 200) {
          setPosts(res.data);
        }
      });
    };

    fetchPosts();
  }, []);
  const htmlContent = (
    <span style={{ color: "#ff0033" }}>
      <strong>
        <span style={{ fontSize: "12pt" }}>
          A) GIẢM GIÁ ĐỊNH KỲ VÀ GIẢM GIÁ KHÔNG BÁO TRƯỚC
        </span>
      </strong>
    </span>
  );
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
                  {posts.length > 0 &&
                    posts.map((item, index) => {
                      return (
                        <div className="row" key={index}>
                          <div className="col-lg-3">
                            <img
                              src={"https://" + item?.post_images[0]?.uri}
                              alt="BaloSG"
                              className="d-none d-md-inline-block logo"
                            />
                          </div>
                          <div className="col-lg-9 d-flex justify-content-center flex-column">
                            <p className="title">{item.title}</p>
                            <Link to={`/posts/${item.id}`}>
                              <p className="more">{">>Xem Chi Tiết"}</p>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
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

export default AllPosts;
