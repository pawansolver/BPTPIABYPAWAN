"use client";

import { useState, useEffect, useCallback } from "react";
import type { Download } from "@/services/downloadApi";
import {
  getDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
  trackDownload,
  reorderDownloads,
} from "@/services/downloadApi";
import {
  FileText,
  BookOpen,
  BadgeCheck,
  MonitorCheck,
  Megaphone,
  Image as ImageIcon,
  Video,
  Contact,
  Briefcase,
  Download as DownloadIcon,
  Link,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  X,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

const ICONS = [
  { name: "FileText", component: FileText },
  { name: "BookOpen", component: BookOpen },
  { name: "BadgeCheck", component: BadgeCheck },
  { name: "MonitorCheck", component: MonitorCheck },
  { name: "Megaphone", component: Megaphone },
  { name: "ImageIcon", component: ImageIcon },
  { name: "Video", component: Video },
  { name: "Contact", component: Contact },
  { name: "Briefcase", component: Briefcase },
  { name: "Download", component: DownloadIcon },
  { name: "Link", component: Link },
  { name: "ExternalLink", component: ExternalLink },
];

const TYPES = [
  { value: "STUDENT_DOWNLOAD", label: "Student Download" },
  { value: "SUPPORT_LINK", label: "Support Link" },
  { value: "QUICK_LINK", label: "Quick Link" },
];

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDownload, setEditingDownload] = useState<Download | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    type: "STUDENT_DOWNLOAD" | "SUPPORT_LINK" | "QUICK_LINK";
    externalUrl: string;
    icon: string;
    displayOrder: number;
    isActive: boolean;
  }>({
    title: "",
    description: "",
    type: "STUDENT_DOWNLOAD",
    externalUrl: "",
    icon: "FileText",
    displayOrder: 0,
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchDownloads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {};
      if (filterType) params.type = filterType;
      if (searchTerm) params.search = searchTerm;
      
      const response = await getDownloads(params);
      if (response.success) {
        setDownloads(response.data);
      } else {
        setError(response.message || "Failed to fetch downloads");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [filterType, searchTerm]);

  useEffect(() => {
    fetchDownloads();
  }, [fetchDownloads]);

  const handleOpenModal = (download?: Download) => {
    if (download) {
      setEditingDownload(download);
      setFormData({
        title: download.title,
        description: download.description || "",
        type: download.type,
        externalUrl: download.externalUrl || "",
        icon: download.icon,
        displayOrder: download.displayOrder,
        isActive: download.isActive,
      });
    } else {
      setEditingDownload(null);
      setFormData({
        title: "",
        description: "",
        type: "STUDENT_DOWNLOAD",
        externalUrl: "",
        icon: "FileText",
        displayOrder: downloads.length,
        isActive: true,
      });
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDownload(null);
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const data = {
        ...formData,
        file: selectedFile || undefined,
      };
      
      if (editingDownload) {
        await updateDownload(editingDownload.id, data);
      } else {
        await createDownload(data);
      }
      
      handleCloseModal();
      fetchDownloads();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save download");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await deleteDownload(id);
      fetchDownloads();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete download");
    }
  };

  const handleMoveOrder = async (id: number, direction: "up" | "down") => {
    const index = downloads.findIndex((d) => d.id === id);
    if (index === -1) return;
    
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= downloads.length) return;
    
    const newDownloads = [...downloads];
    [newDownloads[index], newDownloads[newIndex]] = [newDownloads[newIndex], newDownloads[index]];
    
    // Update display orders
    const orders = newDownloads.map((d, i) => ({ id: d.id, displayOrder: i }));
    
    try {
      await reorderDownloads(orders);
      setDownloads(newDownloads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reorder");
    }
  };

  const handleDownload = async (download: Download) => {
    try {
      const response = await trackDownload(download.id);
      if (response.success && response.data.downloadUrl) {
        window.open(response.data.downloadUrl, "_blank");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download");
    }
  };

  const getIconComponent = (iconName: string) => {
    const icon = ICONS.find((i) => i.name === iconName);
    return icon ? icon.component : FileText;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Downloads Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage PDFs, forms, prospectuses and support links
              </p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Download
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search downloads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Downloads List */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : downloads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No downloads found. Click "Add New" to create one.
            </div>
          ) : (
            <div className="divide-y">
              {downloads.map((download, index) => {
                const IconComponent = getIconComponent(download.icon);
                return (
                  <div
                    key={download.id}
                    className={`p-4 flex items-center gap-4 hover:bg-gray-50 ${
                      !download.isActive ? "opacity-60" : ""
                    }`}
                  >
                    {/* Drag Handle & Order Controls */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleMoveOrder(download.id, "up")}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-medium text-gray-500 w-6 text-center">
                        {download.displayOrder}
                      </span>
                      <button
                        onClick={() => handleMoveOrder(download.id, "down")}
                        disabled={index === downloads.length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Icon */}
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">
                          {download.title}
                        </h3>
                        {!download.isActive && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                          {TYPES.find((t) => t.value === download.type)?.label}
                        </span>
                        {download.fileUrl && (
                          <span>{formatFileSize(download.fileSize)}</span>
                        )}
                        {download.externalUrl && (
                          <span className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            External Link
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <DownloadIcon className="w-3 h-3" />
                          {download.downloadCount} downloads
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {download.fileUrl && (
                        <button
                          onClick={() => handleDownload(download)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Download"
                        >
                          <DownloadIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleOpenModal(download)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(download.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingDownload ? "Edit Download" : "Add New Download"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Download Polytechnic Form 2025-26"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as any })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {ICONS.map((icon) => {
                    const IconComponent = icon.component;
                    return (
                      <button
                        key={icon.name}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, icon: icon.name })
                        }
                        className={`p-2 rounded-lg border flex flex-col items-center gap-1 ${
                          formData.icon === icon.name
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-[10px]">{icon.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* External URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  External URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.externalUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, externalUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/form.pdf"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload PDF/File (optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
                {editingDownload?.fileUrl && !selectedFile && (
                  <p className="text-sm text-gray-500 mt-1">
                    Current: {editingDownload.fileUrl.split("/").pop()}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description..."
                />
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayOrder: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active (visible on website)
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingDownload ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
