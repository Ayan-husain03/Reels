import React from "react";
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";

// Dummy data (later API se aayega)
const reels = [
  {
    id: 1,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    username: "foodie_ayan",
    caption: "Best street food in town 🍔🔥",
    likes: 1200,
    comments: 210,
  },
  {
    id: 2,
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    username: "spicyhub",
    caption: "Spicy challenge 🌶️😋",
    likes: 980,
    comments: 150,
  },
];

const ReelCard = ({ reel }) => {
  return (
    <div className="relative h-screen w-full snap-start bg-black">
      {/* Video */}
      <video
        src={reel.videoUrl}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 text-white">
        <h1 className="text-lg font-semibold">Reels</h1>
        <MoreVertical className="h-5 w-5" />
      </div>

      {/* Right actions */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 text-white">
        <div className="flex flex-col items-center">
          <Heart className="h-7 w-7" />
          <span className="text-xs mt-1">{reel.likes}</span>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle className="h-7 w-7" />
          <span className="text-xs mt-1">{reel.comments}</span>
        </div>
        <Share2 className="h-7 w-7" />
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-6 left-0 right-0 px-4 text-white">
        <p className="text-sm font-semibold">@{reel.username}</p>
        <p className="text-sm opacity-90 mt-1">{reel.caption}</p>
      </div>
    </div>
  );
};

const Home= () => {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  );
};

export default Home;
