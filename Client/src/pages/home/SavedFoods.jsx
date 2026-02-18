import React, { useEffect, useRef, useState } from "react";
import { Bookmark, VolumeOff, Volume2 } from "lucide-react";
import { Link } from "react-router";
import api from "../../lib/axios";

const SavedReelCard = ({ item, muted, setMuted }) => {
  const videoRef = useRef(null);
  const [showIcon, setShowIcon] = useState(false);

  const handleTap = () => {
    setMuted((prev) => !prev);
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 1000);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="relative h-screen w-full snap-start bg-black">
      <video
        ref={videoRef}
        src={item.video}
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
              <Volume2 className="h-10 w-10" />
            )}
          </div>
        </div>
      )}

      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 text-white">
        <h1 className="text-lg font-semibold">Saved Reels</h1>
      </div>

      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-6 text-white z-20">
        <Bookmark className="h-7 w-7" fill="white" />
      </div>

      <div className="absolute bottom-28 left-0 right-0 px-4 text-white">
        <p className="text-sm font-semibold">
          <Link to={`/foodPartner/${item?.foodPartner?._id}`}>
            @{item?.foodPartner?.name || "user"}
          </Link>
        </p>
        <p className="text-sm opacity-90 mt-1">{item.name}</p>
        <p className="text-sm opacity-60 mt-1">{item.description}</p>
      </div>
    </div>
  );
};

export default function SavedFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const fetchSavedFoods = async () => {
      try {
        const res = await api.get("/food/saved-foods");
        setFoods(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedFoods();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        Loading saved reels...
      </div>
    );
  }

  if (!foods.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-gray-400">
        <Bookmark size={50} />
        <p className="mt-4 text-lg">No saved reels yet</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      {foods.map((item) => (
        <SavedReelCard
          key={item._id}
          item={item}
          muted={muted}
          setMuted={setMuted}
        />
      ))}
    </div>
  );
}
