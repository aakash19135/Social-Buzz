import { useState } from "react";

export default function Profile({
  darkMode,
  profile,
  setProfile,
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className={`rounded-2xl shadow-xl p-6 ${
        darkMode
          ? "bg-slate-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col items-center">

       <img
  src={
    profile.profilePic ||
    profile.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}`
  }
          alt="profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
        />
        <label className="mt-4 inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
  Change Avatar

  <input
    type="file"
    hidden
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];

     if (file) {
  const imageUrl = URL.createObjectURL(file);

  const updatedProfile = {
    ...profile,
    avatar: imageUrl,
    profilePic: imageUrl,
  };

  setProfile(updatedProfile);

  localStorage.setItem(
    "profile",
    JSON.stringify(updatedProfile)
  );
}
    }}
    />
      
</label>

        {editing && (
          <input
            type="text"
            placeholder="Image URL"
            value={profile.profilePic||profile.avatar}
            onChange={(e) =>
              setProfile({
                ...profile,
               profilePic : e.target.value,
              })
            }
            className={`mt-4 w-full p-3 rounded-xl border ${
              darkMode
                ? "bg-slate-700 border-slate-600"
                : "bg-gray-100 border-gray-300"
            }`}
          />
        )}

        {editing ? (
          <>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className={`mt-5 w-full p-3 rounded-xl border ${
                darkMode
                  ? "bg-slate-700 border-slate-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            />

            <textarea
              rows="4"
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              className={`mt-3 w-full p-3 rounded-xl border resize-none ${
                darkMode
                  ? "bg-slate-700 border-slate-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            />
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mt-5">
              {profile.name}
            </h2>

            <p className="mt-3 text-center text-gray-500">
              {profile.bio}
            </p>
          </>
        )}

        <div className="grid grid-cols-3 gap-6 mt-8 text-center w-full">

          <div>
            <h2 className="text-2xl font-bold text-blue-500">
              120
            </h2>
            <p>Posts</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-500">
              450
            </h2>
            <p>Followers</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-blue-500">
              180
            </h2>
            <p>Following</p>
          </div>

        </div>

        <button
  onClick={() => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setEditing(!editing);
  }}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          {editing ? "Save Profile" : "Edit Profile"}
        </button>

      </div>
    </div>
  );
}