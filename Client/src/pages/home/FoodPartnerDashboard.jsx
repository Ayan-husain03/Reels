import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PageWrapper } from "../../component/PageWrapper";
import api from "../../lib/axios";

const FoodPartnerDashboard = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    video: null,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.video) {
      toast.error("Food name and video are required");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("video", form.video);

      await api.post("/food-items", data);

      toast.success("Food reel published 🎉");

      setForm({
        name: "",
        description: "",
        video: null,
      });
    } catch (err) {
      toast.error("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      <Toaster position="top-center" />

      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Create Food Reel 🍕
        </h1>
        <p className="mt-1 text-sm text-slate-100">
          Upload a short food video for users
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5">
        {/* Video Upload */}
        <label className="group relative flex h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl text-center transition hover:border-orange-500">
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className="hidden"
          />

          <div className="space-y-2">
            <div className="text-4xl">🎥</div>
            <p className="text-sm font-medium">
              {form.video ? form.video.name : "Upload food video"}
            </p>
            <p className="text-xs text-slate-100">MP4, MOV • Max 30s</p>
          </div>
        </label>

        {/* Glass Card */}
        <div className="rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Food name (e.g. Cheese Burger)"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Short description (optional)"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Publish Button */}
        <button
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 py-3 text-white font-medium transition active:scale-95 disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Food Reel 🚀"}
        </button>
      </form>
    </PageWrapper>
  );
};

export { FoodPartnerDashboard };
