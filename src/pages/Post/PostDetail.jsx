import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostService } from "../../services/post.service";
import Header from "../../components/Header/Header";
import SidebarNews from "../../components/Sidebar/SidebarNews";
import Footer from "../../components/Footer/Footer";

const PostDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchPosts = () => {
      PostService.getPostsDetailById(id).then((res) => {
        if (res.status_code === 200) {
          setPosts(res.data);
          const container = document.getElementById("content-post");
          container.innerHTML = res.data.content;
        }
      });
    };

    fetchPosts();
  }, [id]);
  return (
    <>
      <Header />
      <div id="all" className="news-detail-page">
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
                      <Link to="/posts">Tin tức</Link>
                    </li>
                    <li aria-current="page" className="breadcrumb-item active">
                      {posts?.title}
                    </li>
                  </ol>
                </nav>
              </div>

              <div className="col-lg-9">
                <div className="box">
                  <div className="title">{posts?.title}</div>
                  <img
                    src={"https://" + posts?.post_images[0]?.uri}
                    alt="BaloSG"
                    className="img"
                  />
                  <div id="content-post"></div>
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

export default PostDetail;
