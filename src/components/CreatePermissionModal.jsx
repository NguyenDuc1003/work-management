"use client";

import { useState } from "react";

const CreatePermissionModal = ({ modules, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "CREATE", // giá trị mặc định
    moduleId: "",   // giữ dạng string để dễ bind với select
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.code.trim()) newErrors.code = "Permission code is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.moduleId) newErrors.moduleId = "Module is required";
    if (!formData.type) newErrors.type = "Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Gửi dữ liệu lên API, moduleId bắt buộc kiểu số
    onSubmit({
      ...formData,
      moduleId: Number(formData.moduleId),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Nếu lỗi trước đó ở trường này, xoá lỗi ngay khi người dùng chỉnh sửa
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Thêm quyền mới cho người dùng</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* Permission Code */}
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Mã quyền *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="nhập mã quyền..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.code ? "border-red-500" : "border-gray-300"
                }`}
              aria-invalid={!!errors.code}
              aria-describedby="code-error"
            />
            {errors.code && (
              <p id="code-error" className="text-red-500 text-sm mt-1">
                {errors.code}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="nhập mô tả..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"
                }`}
              aria-invalid={!!errors.description}
              aria-describedby="description-error"
            />
            {errors.description && (
              <p id="description-error" className="text-red-500 text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Module Select */}
          <div className="mb-4">
            <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700 mb-2">
              Module *
            </label>
            <select
              id="moduleId"
              name="moduleId"
              value={formData.moduleId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.moduleId ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Chọn module</option>
              {modules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>


            {errors.moduleId && (
              <p id="moduleId-error" className="text-red-500 text-sm mt-1">
                {errors.moduleId}
              </p>
            )}
          </div>

          {/* Permission Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Kiểu quyền *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.type ? "border-red-500" : "border-gray-300"
                }`}
              aria-invalid={!!errors.type}
              aria-describedby="type-error"
            >
              <option value="">Select type</option>
              
              <option value="CREATE">CREATE</option>
              <option value="READ">READ</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="VIEW">VIEW</option>
            </select>
            {errors.type && (
              <p id="type-error" className="text-red-500 text-sm mt-1">
                {errors.type}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
             Tạo quyền
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePermissionModal;
