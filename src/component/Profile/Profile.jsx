import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate from react-router-dom
import { FiUser, FiShoppingCart, FiSettings, FiLogOut } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { IoMdMail } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation
  const { userProfile, updateProfile } = useAuth();

  const [profile, setProfile] = useState(userProfile);
  const [image, setImage] = useState(null);
  const [editingProfile, setEditingProfile] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfile(userProfile);
    setEditingProfile(userProfile);
  }, [userProfile]);

  const handleUpdate = (field, value) => {
    setEditingProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile(editingProfile);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditingProfile(profile);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = {
          ...editingProfile,
          profileImage: reader.result
        };
        setEditingProfile(updatedProfile);
        if (!isEditing) {
          updateProfile(updatedProfile);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Updated Navigation Handler with useNavigate
  const handleNavigation = (path) => {
    if (path === "/logout") {
      navigate("/"); // ✅ Redirect to homepage after logout
    } else {
      navigate(path); // ✅ Navigate to internal pages
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not Set";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mt-32 flex flex-col md:flex-row min-h-screen bg-white dark:bg-black">
      <aside className="w-full md:w-80 lg:w-96 p-6 bg-white dark:bg-black/90 shadow-2xl rounded-b-lg md:rounded-r-lg md:rounded-b-none border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <label htmlFor="profile-file-upload" className="cursor-pointer relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-black/70 dark:bg-white/70">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FiUser className="text-gray-500 w-20 h-20" />
              )}
            </div>
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Edit
            </span>
          </label>
          <input id="profile-file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <h2 className="mt-3 text-lg font-semibold dark:text-white text-gray-900">{profile.name}</h2>
        </div>

        <nav className="mt-6 space-y-4">
          <MenuItem icon={<FiShoppingCart />} label="Orders" onClick={() => handleNavigation("/services")} />
          <MenuItem icon={<MdOutlineMedicalServices />} label="Medical Records" onClick={() => handleNavigation("/Labtests")} />
          <MenuItem icon={<FiUser />} label="Your Workout plans" onClick={() => handleNavigation("/todolist")} />
          <MenuItem icon={<HiOutlineTicket />} label="Redeem Voucher" onClick={() => handleNavigation("/redeem-voucher")} />
          <MenuItem icon={<IoMdMail />} label="Support" onClick={() => handleNavigation("/contact_us")} />
          <MenuItem icon={<FiLogOut />} label="Logout" onClick={() => handleNavigation("/logout")} />
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 bg-white dark:bg-black shadow-lg rounded-t-lg md:rounded-l-lg md:rounded-t-none">
        <div className="text-center mb-6 relative flex flex-col items-center">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900 dark:text-primary mb-4">
            Your
            <span className="ml-2 text-4xl sm:text-5xl md:text-6xl font-serif dark:text-white text-primary">
              Profile
            </span>
          </h2>

          {/* Profile Image with Hover Edit Overlay */}
          <label htmlFor="profile-file-upload" className="relative group cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-gray-700 shadow-lg">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FiUser className="text-gray-500 w-20 h-20" />
              )}
            </div>

            {/* Hover Edit Overlay */}
            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Edit
            </span>
          </label>

          <input id="profile-file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProfileField label="Name" value={profile.name} newValue={editingProfile.name} onUpdate={handleUpdate} field="name" isEditing={isEditing} />
          <ProfileField label="Phone Number" value={profile.phone} newValue={editingProfile.phone} onUpdate={handleUpdate} field="phone" isEditing={isEditing} />
          <GenderField label="Gender" value={profile.gender} newValue={editingProfile.gender} onUpdate={handleUpdate} isEditing={isEditing} />
          <ProfileField
            label="Date Of Birth"
            value={formatDate(profile.dob)}
            newValue={editingProfile.dob}
            onUpdate={handleUpdate}
            field="dob"
            isEditing={isEditing}
            type="date"
          />
          <ProfileField label="Email" value={profile.email} newValue={editingProfile.email} onUpdate={handleUpdate} field="email" isEditing={isEditing} />
          <ProfileField label="Work Email" value={profile.workEmail} newValue={editingProfile.workEmail} onUpdate={handleUpdate} field="workEmail" isEditing={isEditing} />
        </div>

        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <button onClick={handleSave} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
              Save
            </button>
          ) : (
            <button onClick={handleEdit} className="px-6 py-3 bg-primary dark:text-white font-serif rounded-md hover:shadow-md transition duration-300">
              Edit
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

function MenuItem({ icon, label, onClick }) {
  return (
    <div
      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-lg cursor-pointer hover:translate-x-1 transition-transform duration-300"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function ProfileField({ label, value, newValue, onUpdate, field, isEditing, type = "text" }) {
  return (
    <div>
      <h3 className="text-lg dark:text-white text-black font-serif mb-1">{label}</h3>
      {isEditing ? (
        <input
          type={type}
          className="mt-1 text-md font-medium border border-gray-200 dark:border-white p-2 w-full rounded-md focus:ring-2 focus:ring-primary focus:outline-none dark:bg-white/80 dark:text-black shadow-lg dark:shadow-primary"
          value={newValue}
          onChange={(e) => onUpdate(field, e.target.value)}
        />
      ) : (
        <p className="text-md font-medium text-gray-900 dark:text-white">{value}</p>
      )}
    </div>
  );
}

function GenderField({ label, value, newValue, onUpdate, isEditing }) {
  return (
    <div className="mb-4"> {/* Add bottom margin for spacing */}
      <label className="font-serif text-lg text-gray-900 dark:text-white block mb-2"> {/* Label aligned properly */}
        {label}
      </label>

      {isEditing ? (
        <select
          className="text-md font-medium border shadow-lg border-gray-300 dark:border-white p-3 w-full rounded-md dark:shadow-primary focus:ring-2 focus:ring-primary focus:outline-none dark:bg-white/80 dark:text-black transition duration-300"
          value={newValue}
          onChange={(e) => onUpdate("gender", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      ) : (
        <p className="text-md font-medium text-gray-900 dark:text-white">{value || "Not Set"}</p>
      )}
    </div>
  );
}

export default ProfilePage;
