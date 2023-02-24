import React from "react";
import "../../styles/Style.scss";

const SidebarPayment = () => {
  return (
    <div className="col-lg-3">
      <div id="order-summary" className="card">
        <div className="card-header">
          <h3 className="mt-4 mb-4">Tóm tắt dơn hàng</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr>
                  <td>Chi phí tổng sản phẩm</td>
                  <th>$446.00</th>
                </tr>
                <tr>
                  <td>CHi phí vận chuyển</td>
                  <th>$10.00</th>
                </tr>
                <tr>
                  <td>Tax</td>
                  <th>$0.00</th>
                </tr>
                <tr className="total">
                  <td>Tổng cộng</td>
                  <th>$456.00</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPayment;
