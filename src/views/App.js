import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Error from "../pages/Error";
import Basket from "../pages/Basket";

import Category from "../pages/Category";
import ProductDetail from "../pages/ProductDetail";
import Contact from "../pages/Contact";
import Account from "../pages/Account";
import Wishlist from "../pages/Wishlist";
import Login from "../components/Login/Login";
import ProductByBrand from "../pages/ProductByBrand";
import ProductByCategory from "../pages/ProductByCategory";

import PaymentResolve from "../pages/PaymentResolve";
import PaymentSuccess from "../pages/PaymentResponse/PaymentSuccess";
import PaymentFail from "../pages/PaymentResponse/PaymentFail";

import Address from "../pages/ListAddress";
import AddressAdd from "../components/Address/AddressAdd";
import AddressEdit from "../components/Address/AddressEdit";

import CheckAddress from "../pages/Checkout/CheckAddress";
import CheckMethod from "../pages/Checkout/CheckMethod";
import Search from "../components/Header/Search";
import Success from "../pages/PlaceAnOrder/Success";
import Product from "../pages/Product";

import AllOrder from "../pages/Order/AllOrder";
import OrderDetail from "../pages/Order/OrderDetail";
import OTP from "../components/OTP/OTP";
import ChangePassword from "../components/Login/ChangePassword";

function App() {
  return (
    <div className="App">
      <div className="Content-App">
        <BrowserRouter basename="/ClientFE">
          <Routes>
            <Route path="/payment">
              <Route path="success" element={<PaymentSuccess />} />
              <Route path="fail" element={<PaymentFail />} />
            </Route>
            <Route path="/success" element={<Success />} />
            <Route exact path="/ClientFE" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/error" element={<Error />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/check-address" element={<CheckAddress />} />
            <Route path="/check-method" element={<CheckMethod />} />
            <Route path="/collections" element={<Category />} />
            <Route path="/checkout_result" element={<PaymentResolve />} />
            <Route path="/search">
              <Route path=":input" element={<Search />} />
            </Route>

            <Route path="/product">
              <Route index element={<Product />} />
              <Route path="brand">
                <Route path=":id" element={<ProductByBrand />} />
              </Route>
              <Route path="category">
                <Route path=":id" element={<ProductByCategory />} />
              </Route>
            </Route>

            <Route path="/product-detail">
              <Route path=":id" element={<ProductDetail />} />
            </Route>

            <Route path="/contact" element={<Contact />} />

            <Route path="/account">
              <Route index element={<Account />} />
              <Route path="address">
                <Route index element={<Address />} />
                <Route path="add" element={<AddressAdd />} />
                <Route path="edit">
                  <Route path=":id" element={<AddressEdit />} />
                </Route>
              </Route>
            </Route>
            <Route path="/order-detail">
              <Route path=":id" element={<OrderDetail />} />
            </Route>
            <Route path="/all-order" element={<AllOrder />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
