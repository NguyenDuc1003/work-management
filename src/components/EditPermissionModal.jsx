"use client";

import { useState } from "react";

const EditPermissionModal = ({ permission, modules, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    code: permission.code,
    description: permission.description,
    moduleId: permission.moduleId.toString(),
    type: permission.type || "CREATE",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.code.trim()) newErrors.code = "Permission code is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.moduleId) newErrors.moduleId = "Module is required";
    if (!formData.type) newErrors.type = "Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      moduleId: Number.parseInt(formData.moduleId),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Edit Permission</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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

        <form onSubmit={handleSubmit}>
          {/* Code */}
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Permission Code *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.code ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., USER_CREATE"
            />
            {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Create User"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Module */}
          <div className="mb-4">
            <label htmlFor="moduleId" className="block text-sm font-medium text-gray-700 mb-2">
              Module *
            </label>
            <select
  id="moduleId"
  name="moduleId"
  value={formData.moduleId}
  onChange={handleChange}
  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    errors.moduleId ? "border-red-500" : "border-gray-300"
  }`}
>
  <option value="">Select a module</option>
  {modules.map((module) => (
    <option key={module.id} value={module.id}>
      {module.name}
    </option>
  ))}
</select>

            {errors.moduleId && <p className="text-red-500 text-sm mt-1">{errors.moduleId}</p>}
          </div>

          {/* Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Permission Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select type</option>
              <option value="VIEW_BOARDS">VIEW_BOARDS</option>
              <option value="CREATE_BOARDS">CREATE_BOARDS</option>
              <option value="UPDATE_BOARDS">UPDATE_BOARDS</option>
              <option value="DELETE_BOARDS">DELETE_BOARDS</option>
              <option value="VIEW_GROUPS">VIEW_GROUPS</option>
              <option value="ADD_GROUPS">ADD_GROUPS</option>
              <option value="UPDATE_GROUPS">UPDATE_GROUPS</option>
              <option value="DELETE_GROUPS">DELETE_GROUPS</option>
              <option value="VIEW_TASKS">VIEW_TASKS</option>
              <option value="ADD_TASKS">ADD_TASKS</option>
              <option value="UPDATE_TASKS">UPDATE_TASKS</option>
              <option value="DELETE_TASKS">DELETE_TASKS</option>
              <option value="CREATE">CREATE</option>
              <option value="READ">READ</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
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
              Update Permission
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPermissionModal;
