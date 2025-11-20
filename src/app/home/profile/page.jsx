"use client";

import { useEffect, useState, useRef } from "react";
import {
  getCurrentUser,
  updateUserProfile,
  uploadProfilePicture,
  rollbackProfilePicture,
} from "@/utils/axios/userEndPoints";
import useAuthStore from "@/utils/store/useAuthStore";



export default function ProfilePage() {
  const { user, error, message, setUser, setError, setMessage } = useAuthStore();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    countryOfResidence: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getCurrentUser();
        setUser(res.user);
        setForm({
          fullName: res.user.fullName || "",
          username: res.user.username || "",
          phoneNumber: res.user.phoneNumber || "",
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
  }, []);

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

  if (loading) return <p>Loading profile…</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Profile photo */}
        <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
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
                className={`px-4 py-2 rounded-md text-white ${
                  uploading || !selectedFile ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  fileInputRef.current.value = "";
                }}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
            </div>

            {user?.profilePics?.public_id && (
              <div className="mt-3">
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

        {/* Right: Profile form */}
        <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" className="w-full border rounded px-3 py-2"/>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full border rounded px-3 py-2"/>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone number" className="w-full border rounded px-3 py-2"/>
            <input name="countryOfResidence" value={form.countryOfResidence} onChange={handleChange} placeholder="Country" className="w-full border rounded px-3 py-2"/>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Bio" className="w-full border rounded px-3 py-2"></textarea>

            <div className="flex gap-3">
              <button type="submit" disabled={saving} className={`px-4 py-2 rounded-md text-white ${saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button type="button" onClick={() => setForm({
                fullName: user?.fullName || "",
                username: user?.username || "",
                phoneNumber: user?.phoneNumber || "",
                countryOfResidence: user?.countryOfResidence || "",
                bio: user?.bio || "",
              })} className="px-4 py-2 rounded-md border">
                Reset
              </button>
            </div>

            {/* {error && <p className="text-red-600">{error}</p>}
            {message && <p className="text-green-600">{message}</p>} */}
          </form>
        </div>
      </div>
    </div>
  );
}
