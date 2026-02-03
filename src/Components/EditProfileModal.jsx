import { useEffect, useState } from "react";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, userId, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    role: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserById();
    }
  }, [userId]);

  const fetchUserById = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://696b4ad3624d7ddccaa0b925.mockapi.io/user/${userId}`
      );
      const data = await response.json();

      setFormData({
        name: data?.name || "",
        mobileNumber: data?.mobileNumber || "",
        role: data?.role || "",
        otp: data?.otp || "",
      });
    } catch (error) {
      console.error("Fetch user error:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
      };
      console.log("Payload being sent:", payload); 
      await fetch(
        `https://696b4ad3624d7ddccaa0b925.mockapi.io/user/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const storedUser =
        JSON.parse(localStorage.getItem("loginData")) || {};

      const updatedUser = {
        ...storedUser,
        ...payload,
      };

      localStorage.setItem("loginData", JSON.stringify(updatedUser));

      onSave(updatedUser);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
      onClose(); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Profile</h2>

        <input
            type="text"
            name="name" 
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
        />
        <input
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number"
          minLength={10}
          maxLength={10}
          value={formData.mobileNumber}
          onChange={handleChange}
        />

        <select name="role" disabled value={formData.role}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <input
          type="text"
          name="otp"
          disabled
          placeholder="Enter OTP"
          value={formData.otp}
        />

        <div className="modal-buttons">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="save"
            onClick={handleSave}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
