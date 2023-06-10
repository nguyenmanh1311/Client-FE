import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import StarsRating from "react-star-rate";
import swal2 from "sweetalert2";
import { ImageService } from "../../services/image.service";
import { RatingService } from "../../services/rating.service";

const FeedbackModel = ({ handleShowForm, feedback }) => {
  const [star, setStar] = useState();
  const [arrFile, setArrFile] = useState([]);
  const [arrId, setArrId] = useState([]);
  const [content, setContent] = useState();

  const submitForm = () => {
    const data = {
      file_upload_ids: arrId,
      content: content,
      rate: star,
      product_id: feedback.product.id,
    };

    RatingService.postRating(data).then((res) => {
      if (res.status_code === 200) {
        swal2
          .fire({
            title: "Thông báo",
            icon: "success",
            text: "Đánh giá sản phẩm thành công",
            confirmButtonText: "Đồng ý",
          })
          .then((result) => {
            if (result.isConfirmed) {
              handleShowForm();
              window.location.reload();
            }
          });
      } else {
        swal2.fire("Thông báo", "Đánh giá sản phẩm thất bại", "warning");
      }
    });
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "0%",
        zIndex: 2,
      }}
      className="form-rating-container "
    >
      <div className="form-rate"></div>
      <div className="title">Đánh Giá Sản Phẩm</div>
      {feedback && (
        <div className="container d-flex flex-column align-items-start">
          <div className="product-container d-flex align-items-center">
            <div className="img-product">
              <img
                src={"https://" + feedback?.product?.product_images[0].uri}
                style={{ width: "80px" }}
              />
            </div>
            <div className="d-flex flex-column align-items-start">
              <div className="name">
                <strong>{feedback?.product?.name}</strong>
              </div>
              <div className="cate">Phân loại: </div>
            </div>
          </div>
          <div className="rating-container d-flex align-items-center">
            <div className="title">Chất lượng sản phẩm </div>
            <StarsRating
              value={star}
              allowHalf={false}
              onChange={(value) => {
                setStar(value);
              }}
            />
            {star == 1 && <div className="star-1">Tệ</div>}
            {star > 1 && star <= 2 && (
              <div className="star-2">Không hài lòng</div>
            )}
            {star > 2 && star <= 3 && <div className="star-3">Bình thường</div>}
            {star > 3 && star <= 4 && <div className="star-4">Hài lòng</div>}
            {star > 4 && <div className="star-5">Tuyệt vời</div>}
          </div>
          <div className="comment-container d-flex flex-column align-items-start">
            <div>Đánh giá</div>
            <textarea
              placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
              style={{
                width: "100%",
                minHeight: "100px",
                color: "rgba(0, 0, 0, 0.87)",
                outline: "none",
              }}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
            <br />
          </div>
          <div className="img-container d-flex flex-column">
            <div className="add-img">
              <label
                htmlFor="file"
                className="d-flex align-items-center justify-content-center pt-1"
              >
                <FontAwesomeIcon icon={faCamera} />
                <div className="pl-2">Thêm Hình ảnh</div>
              </label>
              <input
                type="file"
                id="file"
                onChange={async (e) => {
                  setArrFile((currentFile) => {
                    return [...currentFile, ...e.target.files];
                  });
                  for (let i = 0; i < e.target.files.length; i++) {
                    var form = new FormData();
                    form.append("image", e.target.files[i]);

                    const res = await ImageService.uploadImage(form);
                    if (res.status_code === 200) {
                      setArrId((prev) => {
                        return [...prev, res.data.id];
                      });
                    }
                  }
                }}
                style={{ display: "none" }}
                multiple
              />
            </div>
            {arrFile.length > 0 && (
              <div className="imgcontent">
                {arrFile.map((item, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(item)}
                    alt=""
                    onClick={() => {
                      swal2
                        .fire({
                          title: "Bạn có muốn xóa ảnh này không?",
                          showDenyButton: true,
                          confirmButtonText: "Có",
                          denyButtonText: "Không",
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            setArrId((prev) => {
                              return prev.filter((e, i) => i !== index);
                            });
                            setArrFile((currentFile) => {
                              return currentFile.filter((e) => e !== item);
                            });
                          } else if (result.isDenied) {
                          }
                        });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="button-container d-flex justify-content-end align-items-end">
        <button className="btn btn-again" onClick={handleShowForm}>
          Trở Lại
        </button>
        <button className="btn btn-rating gradient" onClick={submitForm}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default FeedbackModel;
