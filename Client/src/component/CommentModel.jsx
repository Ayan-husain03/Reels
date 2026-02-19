import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../lib/axios";

export default function CommentModal({
  foodId,
  onClose,
  increaseCommentCount,
}) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    try {
      const res = await api.get(`food/comment/${foodId}`);
      console.log(res.data.data);
      console.log(res.data);
      setComments(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  const handleAddComment = async () => {
    if (!text.trim()) return;
    try {
      setPosting(true);
      const res = await api.post(`food/comment/${foodId}`, { text });
      console.log(res.data);

      // Optimistic UI update
      setComments((prev) => [res.data.data, ...prev]);
      increaseCommentCount(foodId);
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md h-[80vh] rounded-t-3xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800">
          <h2 className="font-semibold text-lg text-white">Comments</h2>
          <button className="text-white" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : comments.length === 0 ? (
            <p className="text-center text-gray-500">No comments yet</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 text-white">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  {comment?.user?.avatar && (
                    <img
                      src={comment.user.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {comment?.user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-3 mb-13 border-t border-gray-800 flex gap-2 z-20">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 rounded-full text-white bg-gray-100 dark:bg-zinc-800 outline-none text-sm"
          />
          <button
            onClick={handleAddComment}
            disabled={posting}
            className="px-4 py-2 bg-black text-white rounded-full text-sm disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
