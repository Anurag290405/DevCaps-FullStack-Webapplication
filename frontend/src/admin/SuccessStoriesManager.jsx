import { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import { toast } from "sonner";
import InsertSuccessData from "../API's/SuccessStoriesAPI/InsertSuccessData";
import GetSuccessData from "../API's/SuccessStoriesAPI/GetSuccessData";
import parseImagePath from "./Modals/parseImagePath";
import WebsiteLoader from "../Loader/WebsiteLoader";
import ImageCropper from "./Modals/ImageCropper";

export default function SuccessStoriesManager() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [cropTargetStoryId, setCropTargetStoryId] = useState(null);

  const toViewModel = (story) => ({
    ...story,
    image_url: story.image_url,
    file: null,
    changes: false
  });

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      const res = await GetSuccessData();
      if (res?.success) {
        setStories(res.data.map((s) => toViewModel(s)));
      } else {
        toast.error(res?.message || "Failed to load success stories");
      }
      setLoading(false);
    };
    loadStories();
  }, []);

  const handleChange = (id, field, value) => {
    setStories((prev) =>
      prev.map((story) =>
        story._id === id ? { ...story, [field]: value, changes: true } : story
      )
    );
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image size should be less than 4MB");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImageSrc(reader.result);
        setCropTargetStoryId(id);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Failed to read image");
    }
  };

  const handleCropComplete = (blob) => {
    if (blob && cropTargetStoryId) {
      const url = URL.createObjectURL(blob);
      setStories((prev) =>
        prev.map((story) =>
          story._id === cropTargetStoryId
            ? { ...story, image_url: url, file: blob, changes: true }
            : story
        )
      );
      setCropperOpen(false);
      setSelectedImageSrc("");
      setCropTargetStoryId(null);
      toast.success("Image cropped successfully");
    }
  };

  const addStory = () => {
    const newStory = {
      _id: `temp-${Date.now()}`,
      name: "",
      title: "",
      description: "",
      image_url: "",
      file: null,
      changes: true
    };
    setStories((prev) => [...prev, newStory]);
  };

  const deleteStory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    const story = stories.find((s) => s._id === id);
    if (!story || `${story._id}`.startsWith("temp")) {
      setStories((prev) => prev.filter((s) => s._id !== id));
      toast.success("Story deleted");
      return;
    }

    setLoading(true);
    setStories((prev) => prev.filter((s) => s._id !== id));
    toast.success("Story deleted");
    setLoading(false);
  };

  const uploadImage = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("image", blob, "cropped-image.png");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.filePath;
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const saveStory = async (id) => {
    const story = stories.find((s) => s._id === id);
    if (!story?.name || !story?.title || !story?.description || !story?.image_url) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const storiesWithImages = await Promise.all(
        stories.map(async (s) => {
          if (s.file instanceof Blob) {
            const imageUrl = await uploadImage(s.file);
            return { ...s, image_url: imageUrl, file: null };
          }
          return s;
        })
      );

      const payload = {
        stories: storiesWithImages.map(({ file, _id, ...rest }) => ({ ...rest }))
      };
      const res = await InsertSuccessData(payload);
      setLoading(false);

      if (res?.success) {
        const updated = res.data.map((s) => toViewModel(s));
        setStories(updated);
        toast.success("Story saved successfully");
      } else {
        toast.error(res?.message || "Failed to save story");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Failed to save story");
    }
  };

  return (
    <div>
      {loading && <WebsiteLoader />}

      <ImageCropper
        isOpen={cropperOpen}
        imageSrc={selectedImageSrc}
        onCropComplete={handleCropComplete}
        onClose={() => {
          setCropperOpen(false);
          setSelectedImageSrc("");
          setCropTargetStoryId(null);
        }}
      />

      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Success Stories Management</h1>
        <p className="text-gray-600">Manage your success stories and showcase</p>
      </div>

      <button
        onClick={addStory}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#267E5A] text-white rounded-lg hover:bg-[#1F6449] transition"
      >
        <Plus className="h-4 w-4" />
        Add New Success Story
      </button>

      <div className="grid gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white border border-gray-300 rounded-lg p-6 space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Story Image
                </label>
                <div className="relative group">
                  {story.image_url ? (
                    <img
                      src={story.image_url}
                      alt={story.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(story._id, e)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={story.name}
                    onChange={(e) => handleChange(story._id, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#267E5A]"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={story.title}
                    onChange={(e) => handleChange(story._id, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#267E5A]"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={story.description}
                    onChange={(e) => handleChange(story._id, "description", e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#267E5A]"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => deleteStory(story._id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button
                onClick={() => saveStory(story._id)}
                disabled={!story.changes}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  story.changes
                    ? "bg-[#267E5A] text-white hover:bg-[#1F6449]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
