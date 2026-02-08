import React, { useEffect, useState } from "react";
import api from "../../lib/axios";
import { User } from "lucide-react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const FoodPartnerProfile = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState({});
  const [reels, setReels] = useState([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/food/food-partner/${id}`);
      setPartner(res.data?.foodPartner);
      setReels(res.data?.foodItems);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [id]);

  return (
    <div className="min-h-screen relative bg-black text-white">
      {/* // * Top Back Button */}
      <div className="absolute top-1 left-1 z-10">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/60 backdrop-blur-md p-2 rounded-full text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* // ? Profile Header */}
      <div className="px-4 pt-8 pb-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center shadow-lg">
            <User className="h-12 w-12 text-gray-300" />
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {partner?.name || "Food Partner"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">{partner?.email}</p>
            <p className="text-sm text-gray-400">{partner?.phone}</p>
          </div>
        </div>

        {/* Address Card */}
        <div className="mt-6 bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
          <p className="text-xs text-gray-400">Address</p>
          <p className="text-sm mt-1">{partner?.address}</p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-around mt-6 text-center">
          <div>
            <p className="text-lg font-semibold">{reels.length}</p>
            <p className="text-xs text-gray-400">Reels</p>
          </div>
          <div>
            <p className="text-lg font-semibold">8</p>
            <p className="text-xs text-gray-400">Followers</p>
          </div>
          <div>
            <p className="text-lg font-semibold">10</p>
            <p className="text-xs text-gray-400">Following</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Reels grid (same as tumne rakha hai) */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {reels?.map((reel) => (
          <video
            key={reel._id}
            src={reel.video}
            className="w-full h-40 object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default FoodPartnerProfile;
