import React, { useState } from "react";
import InsertNewImages from "../../API's/GalleryAPI/InsertNewImages";

export default function ImageUploadModal({ isOpen, onClose }) {
  const [images, setImages] = useState([]);
  const [loading,setloading]=useState(false)
  // Handle image selection
  const handleImageChange = (index, file) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB.");
        return;
      }

      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  // Add new image input field
  const handleAddImage = () => {
    setImages([...images, null]);
  };

  // Remove image input field
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handle submit
  const handleSubmit = async() => {
    // You can handle file upload here
    setloading(true)
    console.log("Submitted images:", images);
    const formData = new FormData();
    formData.append("folder","gallery");
    images.forEach((imgObj) => {
  formData.append('images', imgObj);
});
const res=await InsertNewImages(formData);
// console.log(res);
if(res?.success && res?.message==="Gallery images uploaded successfully"){
    alert("Images uploaded successfully");
    setloading(false)
}
else{
    alert("Failed to upload images");
    setloading(false)
}
    setImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        {/* X Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upload Multiple Images
        </h2>

        {/* Image Inputs */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {images.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-0 md:border p-2 rounded-md"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(index, e.target.files[0])
                }
                className="flex-1 border-0 md:border rounded-md px-3 py-2 text-sm"
              />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-12 h-12 object-cover rounded"
                />
              )}
              <button
                onClick={() => handleRemoveImage(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Image Button */}
        <button
          onClick={handleAddImage}
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          + Add Image
        </button>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
           {loading?"Uploading...":"Upload Images"}
          </button>
        </div>
      </div>
    </div>
  );
}
