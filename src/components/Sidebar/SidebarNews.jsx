import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { BrandService } from "../../services/brand.service";
import { CategoryService } from "../../services/category.service";
// import "../../styles/Style.scss";
import "./Sidebar.scss";
import { PostService } from "../../services/post.service";

const SidebarNews = () => {
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

  return (
    <div className="col-lg-3">
      <div className="card sidebar-menu mb-4">
        <div className="card-header">
          <h3 className="h4">Bài viết nổi bật</h3>
        </div>
        <div className="card-body">
          {posts.length > 0 &&
            posts.map((item, index) => {
              return <div key={index}>{item.title}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default SidebarNews;
