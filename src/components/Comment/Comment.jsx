import { ReactionBarSelector } from "@charkour/react-reactions";
import React, { useState } from "react";
import StarsRating from "react-star-rate";
import { GlobalUtil } from "../../utils/GlobalUtil";

const Comment = (item) => {
  const [selectedReaction, setSelectedReaction] = useState();
  const [reactionId, setReactionId] = useState();
  const [isHidden, setIsHidden] = useState(true);

  function handleReactionSelect(reactions) {
    setSelectedReaction(reactions);
    setIsHidden(!isHidden);

    if (reactions === "Thích") {
      setReactionId(1);
    }
    if (reactions === "Yêu thích") {
      setReactionId(2);
    }
    if (reactions === "Phẫn nộ") {
      setReactionId(3);
    }
    if (reactions === "Haha") {
      setReactionId(4);
    }
    if (reactions === "Wow") {
      setReactionId(5);
    }
  }

  const handleMouseEnter = () => {
    setIsHidden(false);
  };

  return (
    <div className="row d-flex justify-content-start align-items-start">
      <img src={"https://" + item?.creator.avatar} alt="Avatar" />
      <div className="comment-text">
        <div className="d-flex justify-content-start">
          {item?.creator?.fullname}
        </div>
        <StarsRating defaultValue={item?.rate} disabled="false" />

        <div className="datetime d-flex justify-content-start">
          {GlobalUtil.dateTimeConvert(item?.created_at)}
        </div>
        <br />
        <p>{item?.content}</p>
        <div className="img-down d-flex justify-content-start">
          {item?.product_review_images?.map((item) => {
            return (
              <div className="img-small" key={item?.file_upload_id}>
                <img src={"https://" + item?.uri} />
              </div>
            );
          })}
        </div>

        <div className="comment-actions">
          {selectedReaction && reactionId === 1 && (
            <div className="d-flex" onMouseUp={handleMouseEnter}>
              👍{" "}
              <div style={{ color: "rgb(62 60 165)" }}>{selectedReaction}</div>
            </div>
          )}
          {selectedReaction && reactionId === 2 && (
            <div className="d-flex" onMouseUp={handleMouseEnter}>
              ❤️{" "}
              <div style={{ color: "rgb(243, 62, 88)" }}>
                {selectedReaction}
              </div>
            </div>
          )}{" "}
          {selectedReaction && reactionId === 3 && (
            <div className="d-flex" onMouseUp={handleMouseEnter}>
              😠{" "}
              <div style={{ color: "rgb(233, 113, 15)" }}>
                {selectedReaction}
              </div>
            </div>
          )}{" "}
          {selectedReaction && reactionId === 4 && (
            <div className="d-flex" onMouseUp={handleMouseEnter}>
              😂{" "}
              <div style={{ color: "rgb(247, 177, 37)" }}>
                {selectedReaction}
              </div>
            </div>
          )}{" "}
          {selectedReaction && reactionId === 5 && (
            <div className="d-flex" onMouseUp={handleMouseEnter}>
              😲
              <div style={{ color: "rgb(247, 177, 37)" }}>
                {selectedReaction}
              </div>
            </div>
          )}{" "}
          {!selectedReaction && (
            <div
              className="d-flex"
              style={{ filter: "grayscale(100%)" }}
              onMouseUp={handleMouseEnter}
            >
              👍 Thích
            </div>
          )}
          {isHidden ? null : (
            <ReactionBarSelector
              reactions={[
                {
                  label: "like",
                  node: <div>👍</div>,
                  key: "Thích",
                },
                {
                  label: "love",
                  node: <div>❤️</div>,
                  key: "Yêu thích",
                },
                {
                  label: "haha",
                  node: <div>😂</div>,
                  key: "Haha",
                },
                {
                  label: "wow",
                  node: <div>😲</div>,
                  key: "Wow",
                },
                {
                  label: "angry",
                  node: <div>😠</div>,
                  key: "Phẫn nộ",
                },
              ]}
              style={{ position: "absolute", width: "250px" }}
              onSelect={(reactions) => handleReactionSelect(reactions)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
