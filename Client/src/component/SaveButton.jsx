import React, { useState } from "react";
import api from "../lib/axios";
import { Bookmark } from "lucide-react";

function SaveButton({ item, userId }) {
  const [isSaved, setIsSaved] = useState(item?.savedBy?.includes(userId));
  const handleSave = async () => {
    setIsSaved(!isSaved);
    try {
      await api.post(`food/foodItem/${item?._id}/save`);
    } catch (error) {
      console.log("error in saved: ", error?.response?.data);
    }
  };
  return (
    <button onClick={handleSave}>
      {isSaved ? (
        <Bookmark className="h-7 w-7" color="#ffffff" fill="#fff" />
      ) : (
        <Bookmark className="h-7 w-7" color="#ffffff" />
      )}
    </button>
  );
}

export default SaveButton;
