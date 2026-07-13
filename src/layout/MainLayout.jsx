import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Trending from "../components/Trending";

export default function MainLayout({
  darkMode,
  toggleDarkMode,
  profile,
  posts,
  onLogout,
}) {
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-950" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6">

          
          <div className="lg:col-span-3">
            <div className="sticky top-5 h-[calc(100vh-40px)] overflow-y-auto">
              <Sidebar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                profile={profile}
                onLogout={onLogout}
              />
            </div>
          </div>

          <div className="lg:col-span-6 min-h-screen">
            <Outlet />
          </div>

        
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-5">
              <Trending
                darkMode={darkMode}
                posts={posts}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}