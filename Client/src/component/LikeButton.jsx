import { Heart } from "lucide-react";
import React, { useState } from "react";
import api from "../lib/axios";

function LikeButton({ item, currentUserId }) {
  const [isLiked, setIsLiked] = useState(item.likes?.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(item.likes.length);
  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
      const res = await api.post(`/food/foodItem/${item?._id}/like`);
      // console.log(res);
    } catch (error) {
      console.error("like error : ", error);
    }
  };
  return (
    <button onClick={handleLike} className="flex flex-col items-center">
      {isLiked ? (
        <Heart className="h-7 w-7" fill="#ff0000" stroke="#ff0000" />
      ) : (
        <Heart className="h-7 w-7" />
      )}
      <span className="text-xs mt-1">{likeCount || 0}</span>
    </button>
  );
}

export default LikeButton;
