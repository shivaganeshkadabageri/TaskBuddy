import { useState } from "react";

function Header({ darkMode, toggleTheme, userProfile }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-brand">
          <h1>TaskBuddy</h1>
          <p>Simple and smart task management</p>
        </div>

        <div className="header-actions">
          {userProfile?.name && (
            <div className="profile-dropdown-container">
              <button
                type="button"
                className="header-user"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                aria-expanded={profileOpen}
                aria-label="Toggle user profile details"
              >
                <span className="user-avatar">
                  {userProfile.name.trim().charAt(0).toUpperCase()}
                </span>

                <span className="header-user-name">
                  {userProfile.name}
                </span>

                <span
                  className={`profile-chevron ${
                    profileOpen ? "profile-chevron-open" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <h3>👤 User Profile</h3>

                  <div className="profile-dropdown-item">
                    <span>Full Name</span>
                    <strong>{userProfile.name}</strong>
                  </div>

                  <div className="profile-dropdown-item">
                    <span>Occupation / Role</span>
                    <strong>
                      {userProfile.role || "Not provided"}
                    </strong>
                  </div>

                  <div className="profile-dropdown-item">
                    <span>Main Focus Area</span>
                    <strong>
                      {userProfile.focusArea || "Not selected"}
                    </strong>
                  </div>

                  <div className="profile-dropdown-item">
                    <span>Daily Task Target</span>
                    <strong>
                      {userProfile.dailyTarget ?? 5} tasks per day
                    </strong>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              darkMode
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;