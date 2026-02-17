import React, { useEffect, useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  User,
  VolumeOff,
  LucideVolume2,
  BookMarked,
  Bookmark,
} from "lucide-react";
import api from "../../lib/axios";
import { Link } from "react-router";
import useAuthStore from "../../store/userAuthStore";
import LikeButton from "../../component/LikeButton";

const ReelCard = ({ reel, muted, setMuted }) => {
  const [showIcon, setShowIcon] = useState(false);
  const { user } = useAuthStore();
  const videoRef = useRef(null);

  const handleTap = () => {
    setMuted((prev) => !prev); // 🔥 GLOBAL TOGGLE
    setShowIcon(true);
    setTimeout(() => {
      setShowIcon(false);
    }, 1200);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted; // 🔥 Important
    }
  }, [muted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.7 },
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen w-full snap-start bg-black">
      <video
        src={reel.video}
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        loop
        playsInline
        onClick={handleTap}
      />

      {showIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md p-6 rounded-full text-white">
            {muted ? (
              <VolumeOff className="h-10 w-10" />
            ) : (
              <LucideVolume2 className="h-10 w-10" />
            )}
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 text-white">
        <h1 className="text-lg font-semibold">Reels</h1>
      </div>

      <div className="absolute right-3 bottom-30 flex flex-col items-center gap-6 text-white">
        {/* <div className="flex flex-col items-center">
          <Heart className="h-7 w-7" fill="#ff0000" stroke="#ff0000" />
          <span className="text-xs mt-1">{reel.likes || 10}</span>
        </div> */}
        <LikeButton currentUserId={user?.user?._id} item={reel} />
        <div className="flex flex-col items-center">
          <MessageCircle className="h-7 w-7" />
          <span className="text-xs mt-1">{reel.comments || 20}</span>
        </div>
        {/* <Share2 className="h-7 w-7" /> */}
        <Bookmark className="h-7 w-7" color="#ffffff" />
      </div>

      <div className="absolute bottom-30 left-0 right-0 px-4 text-white">
        <p className="text-sm font-semibold">
          <Link to={`/foodPartner/${reel?.foodPartner?._id}`}>
            @{reel?.foodPartner?.name || "user"}
          </Link>
        </p>
        <p className="text-sm opacity-90 mt-1">{reel.name}</p>
        <p className="text-sm opacity-60 mt-1">{reel.description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [muted, setMuted] = useState(true); // 🔥 GLOBAL STATE

  async function getReels() {
    try {
      const res = await api.get("/food/all", {
        withCredentials: true,
      });
      setData(res.data?.data);
    } catch (err) {
      console.error(err);
    }
  }
  // console.log(data)

  useEffect(() => {
    getReels();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      {data?.map((reel) => (
        <ReelCard
          key={reel?._id}
          reel={reel}
          muted={muted}
          setMuted={setMuted}
        />
      ))}
    </div>
  );
};

export default Home;
