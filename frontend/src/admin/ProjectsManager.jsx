import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
// Toast removed per request; using alerts instead
import WebsiteLoader from "../Loader/WebsiteLoader";
import GetProjects from "../API's/ProjectAPI/GetProjects";
import CreateProject from "../API's/ProjectAPI/CreateProject";
import UpdateProject from "../API's/ProjectAPI/UpdateProject";
import DeleteProject from "../API's/ProjectAPI/DeleteProject";
import { API_URL } from "../NwConfig";
import ImageCropper from "./Modals/ImageCropper";

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState(null);
  const [cropTargetProjectId, setCropTargetProjectId] = useState(null);

  // Simple alert-based notifications (toast removed per request)
  const notifySuccess = (message) => {
    alert(message);
  };

  const notifyError = (message) => {
    alert(message);
  };

  const toViewModel = (project) => ({
    ...project,
    image_url: project.image,
    file: null,
    changes: false
  });

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const res = await GetProjects();
      if (res?.success) {
        setProjects(res.data.map((p) => toViewModel(p)));
      } else {
        notifyError(res?.message || "Failed to load projects");
      }
      setLoading(false);
    };
    loadProjects();
  }, []);

  const handleChange = (id, field, value) => {
    setProjects((prev) =>
      prev.map((project) =>
        project._id === id ? { ...project, [field]: value, changes: true } : project
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
    if (file.size > 4 * 1024 * 1024) {
      notifyError("Image size should be less than 4MB");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith("image/")) {
      notifyError("Please select a valid image file (jpg, png, etc.)");
      return;
    }
    
    try {
      const dataUrl = await fileToDataUrl(file);
      setSelectedImageSrc(dataUrl);
      setCropTargetProjectId(id);
      setCropperOpen(true);
    } catch (error) {
      notifyError("Failed to read image");
    }
  };

  // Build an absolute image URL for previews (supports relative API paths, blob URLs, or full URLs)
  const buildImageSrc = (path) => {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("blob:")) return path;
    const base = import.meta.env.VITE_API_URL || API_URL || "http://localhost:3000";
    return `${base}/${path.replace(/^\//, "")}`;
  };

  const handleCropComplete = (croppedBlob) => {
    const dataUrl = URL.createObjectURL(croppedBlob);
    setProjects((prev) =>
      prev.map((project) =>
        project._id === cropTargetProjectId
          ? { ...project, image_url: dataUrl, file: croppedBlob, changes: true }
          : project
      )
    );
    setCropperOpen(false);
    setSelectedImageSrc(null);
    setCropTargetProjectId(null);
  };

  const addProject = () => {
    const newProject = {
      _id: `temp-${Date.now()}`,
      name: "",
      description: "",
      image_url: "",
      file: null,
      changes: true
    };
    // Prepend so newest project appears at the top of the list
    setProjects((prev) => [newProject, ...prev]);
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    const project = projects.find((p) => p._id === id);
    // remove unsaved project locally only
    if (!project || `${project._id}`.startsWith("temp")) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
      notifySuccess("Project deleted");
      return;
    }

    setLoading(true);
    const res = await DeleteProject(id);
    setLoading(false);

    if (res?.success) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
      notifySuccess("Project deleted");
    } else {
      notifyError(res?.message || "Failed to delete project");
    }
  };

  const uploadImage = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("image", blob, "cropped-image.png");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/upload`,
        {
          method: "POST",
          body: formData,
          // include auth cookie for protected upload route
          credentials: "include"
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

  const saveProject = async (id) => {
    const project = projects.find((p) => p._id === id);
    if (!project?.name || !project?.description || !project?.image_url) {
      notifyError("Please fill all fields");
      return;
    }

    setLoading(true);
    let imageUrl = project.image_url;

    try {
      // If there's a blob file (from cropper), upload it first
      if (project.file instanceof Blob) {
        imageUrl = await uploadImage(project.file);
      }

      let res;
      if (`${project._id}`.startsWith("temp")) {
        res = await CreateProject({
          name: project.name,
          description: project.description,
          image: imageUrl
        });
      } else {
        res = await UpdateProject(project._id, {
          name: project.name,
          description: project.description,
          image: imageUrl
        });
      }

      setLoading(false);

      if (res?.success) {
        const saved = toViewModel(res.data);
        setProjects((prev) =>
          prev.map((p) => (p._id === id || `${p._id}` === `${id}` ? { ...saved } : p))
        );
        notifySuccess("Project saved successfully");
      } else {
        notifyError(res?.message || "Failed to save project");
      }
    } catch (error) {
      setLoading(false);
      notifyError(error.message || "Failed to save project");
    }
  };

  return (
    <div>
      {loading && <WebsiteLoader />}

      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
        <p className="text-gray-600">Manage your software projects and showcase</p>
      </div>

      <button
        onClick={addProject}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#267E5A] text-white rounded-lg hover:bg-[#1F6449] transition"
      >
        <Plus className="h-4 w-4" />
        Add New Project
      </button>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white border border-gray-300 rounded-lg p-6 space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <div className="relative group">
                  {project.image_url ? (
                    <img
                      src={buildImageSrc(project.image_url)}
                      alt={project.name}
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
                    onChange={(e) => handleImageUpload(project._id, e)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleChange(project._id, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#267E5A]"
                    placeholder="Enter project name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      handleChange(project._id, "description", e.target.value)
                    }
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#267E5A]"
                    placeholder="Enter project description"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => deleteProject(project._id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
              <button
                onClick={() => saveProject(project._id)}
                disabled={!project.changes}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  project.changes
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

      <ImageCropper
        isOpen={cropperOpen}
        imageSrc={selectedImageSrc}
        onCropComplete={handleCropComplete}
        onClose={() => {
          setCropperOpen(false);
          setSelectedImageSrc(null);
          setCropTargetProjectId(null);
        }}
      />
    </div>
  );
}
