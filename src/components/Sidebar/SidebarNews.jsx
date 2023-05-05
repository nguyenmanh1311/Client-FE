import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { BrandService } from "../../services/brand.service";
import { CategoryService } from "../../services/category.service";
// import "../../styles/Style.scss";
import "./Sidebar.scss";

const SidebarNews = ({ category_id, brand_id }) => {
  const [allBrand, setAllBrand] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const { color, setColor } = useDataContext();
  const { categories, setCategories } = useDataContext();
  const { brands, setBrands } = useDataContext();
  const { minPrice, setMinPrice } = useDataContext();
  const { maxPrice, setMaxPrice } = useDataContext();
  const { currentPageNumber } = useDataContext();
  const { orderBy } = useDataContext();
  const { pageCount } = useDataContext();

  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  let isFetched = true;
  useEffect(() => {
    return () => {
      isFetched = false;
    };
  }, [
    categories,
    brands,
    color,
    minPrice,
    maxPrice,
    currentPageNumber,
    orderBy,
    pageCount,
  ]);

  useEffect(() => {
    const fetchshowAllCategory = () => {
      CategoryService.getAllCategory().then((res) => {
        setAllCategory(res.data);
      });
    };

    const fetchshowAllBrand = () => {
      BrandService.getAllBrand().then((res) => {
        setAllBrand(res.data);
      });
    };
    if (isFetched) {
      fetchshowAllBrand();
      fetchshowAllCategory();
    }

    return () => {
      isFetched = false;
    };
  }, []);

  const applyFilterPriceHandleClick = () => {
    setMinPrice(
      Number(minPriceRef.current.value) == 0
        ? null
        : Number(minPriceRef.current.value)
    );
    setMaxPrice(
      Number(maxPriceRef.current.value) == 0
        ? null
        : Number(maxPriceRef.current.value)
    );
  };
  return (
    <div className="col-lg-3">
      <div className="card sidebar-menu mb-4">
        <div className="card-header">
          <h3 className="h4 ">Bài viết nổi bật</h3>
        </div>
        <div className="card-body"></div>
      </div>
    </div>
  );
};

export default SidebarNews;
