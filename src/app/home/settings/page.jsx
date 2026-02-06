"use client";

import { useEffect, useState, useRef } from "react";
import {
  getCurrentUser,
  updateUserProfile,
  uploadProfilePicture,
  rollbackProfilePicture,
} from "@/utils/axios/userEndPoints";
import { changePassword } from "@/utils/axios/authEndPoints";
import useAuthStore from "@/utils/store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";



export default function ProfilePage() {
  const { user, error, message, setUser, setError, setMessage } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    role:"",
    countryOfResidence: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();


  useEffect(() => {
    setError("");
    setMessage("");

    async function fetchUser() {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
        setForm({
          fullName: res.user.fullName || "",
          username: res.user.username || "",
          phoneNumber: res.user.phoneNumber || "",
          role: res.user.role || "",
          countryOfResidence: res.user.countryOfResidence || "",
          bio: res.user.bio || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [setUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      setSaving(true);
      await updateUserProfile(form);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleUploadPhoto(e) {
    e.preventDefault();
    if (!selectedFile) return;
    try {
      setUploading(true);
      await uploadProfilePicture(selectedFile);
      setSelectedFile(null);
      setPreviewUrl(null);
      fileInputRef.current.value = "";
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  }

  async function handleRollback() {
    if (!user?.profilePics?.public_id) return;
    if (!confirm("Delete current profile image?")) return;
    try {
      await rollbackProfilePicture(user.profilePics.public_id);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setPasswordLoading(true);
      await changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setPasswordLoading(false);
    }
  }


  return (
    <div className="min-h-screen container lg:max-w-[80%] xl:max-w-[85%] max-w-full lg:ml-auto pb-20">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      <div className="flex items-center">
        <span>Switch Themes</span>
        <ThemeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left: Profile photo */}
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center h-fit">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="object-cover w-full h-full" />
            ) : user?.profilePics?.url ? (
              <img src={user.profilePics.url} alt="avatar" className="object-cover w-full h-full" />
            ) : (
              <div className="text-gray-400">No photo</div>
            )}
          </div>

          <form onSubmit={handleUploadPhoto} className="w-full mt-4">
            <input
              ref={fileInputRef}
              onChange={handleFileSelect}
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 hover:file:bg-gray-200"
            />
            <div className="mt-3 flex gap-2">
              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className={`px-4 py-2 rounded-md text-white w-full ${
                  uploading || !selectedFile ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
              {selectedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    fileInputRef.current.value = "";
                  }}
                  className="px-4 py-2 rounded-md border text-black"
                >
                  Cancel
                </button>
              )}
            </div>

            {user?.profilePics?.public_id && (
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={handleRollback}
                  className="text-sm text-red-600 underline"
                >
                  Delete current photo
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Right: Profile form and Change Password */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium text-black mb-4">Edit Profile</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" className="w-full border rounded px-3 py-2 text-black"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full border rounded px-3 py-2 text-black"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone number" className="w-full border rounded px-3 py-2 text-black"/>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="w-full border rounded px-3 py-2 text-black"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country of Residence</label>
                  <input name="countryOfResidence" value={form.countryOfResidence} onChange={handleChange} placeholder="Country" className="w-full border rounded px-3 py-2 text-black"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Bio" className="w-full border rounded px-3 py-2 text-black"></textarea>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={saving} className={`px-2 md:px-4 py-2 rounded-md text-white text-sm md:text-lg ${saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button type="button" onClick={() => setForm({
                  fullName: user?.fullName || "",
                  username: user?.username || "",
                  phoneNumber: user?.phoneNumber || "",
                  role: user?.role || "",
                  countryOfResidence: user?.countryOfResidence || "",
                  bio: user?.bio || "",
                })} className="px-4 py-2 rounded-md border text-black">
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-medium text-black mb-4">Change Password</h2>
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error + " " + "Please try again."}
              </div>
            )}
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                <input 
                  type={showOldPassword ? "text" : "password"}
                  value={passwordForm.oldPassword} 
                  onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})} 
                  placeholder="Old Password" 
                  className="w-full border rounded px-3 py-2 text-black pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-8 text-gray-500"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword} 
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} 
                    placeholder="New Password" 
                    className="w-full border rounded px-3 py-2 text-black pr-10"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-8 text-gray-500"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input 
                    type="password"
                    value={passwordForm.confirmPassword} 
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} 
                    placeholder="Confirm New Password" 
                    className="w-full border rounded px-3 py-2 text-black"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={passwordLoading} 
                className={`px-4 py-2 rounded-md text-white ${passwordLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
              >
                {passwordLoading ? "Updating…" : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
