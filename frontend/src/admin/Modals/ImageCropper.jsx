import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X } from "lucide-react";

export default function ImageCropper({ isOpen, imageSrc, onCropComplete, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropChange = (location) => {
    setCrop(location);
  };

  const handleZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels) {
      alert("Please adjust the crop area");
      return;
    }

    try {
      // Create a canvas and crop the image
      const image = new Image();
      image.src = imageSrc;
      
      image.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to final dimensions (450x350)
        canvas.width = 450;
        canvas.height = 350;

        // Draw the cropped portion scaled to final size
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          450,
          350
        );

        // Convert canvas to blob and call callback
        canvas.toBlob((blob) => {
          if (blob) {
            onCropComplete(blob);
            onClose();
            alert("Image cropped successfully");
          }
        }, "image/jpeg", 0.95);
      };

      image.onerror = () => {
        alert("Failed to load image");
      };
    } catch (error) {
      console.error("Cropping error:", error);
      alert("Failed to crop image");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Crop Image</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Crop Preview */}
        <div className="mb-6 relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ height: "400px" }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={450 / 350}
            cropShape="rect"
            showGrid={true}
            onCropChange={handleCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={handleZoomChange}
            restrictPosition={true}
          />
        </div>

        {/* Zoom Slider */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zoom: {(zoom * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Preview of Final Result */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Final image will be: 450px × 350px
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveCrop}
            className="px-4 py-2 bg-[#267E5A] text-white rounded-lg hover:bg-[#1F6449] transition"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
}
