
import { useState } from "react";

function WelcomePage({ onComplete }) {
  const [mode, setMode] = useState("create");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    focusArea: "",
    dailyTarget: "5",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = profile.email.trim().toLowerCase();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    // CREATE NEW PROFILE
    if (mode === "create") {
      const newProfile = {
        name: profile.name.trim(),
        email,
        role: profile.role.trim(),
        focusArea: profile.focusArea,
        dailyTarget: Number(profile.dailyTarget),
      };

      if (!newProfile.name) {
        alert("Please enter your full name.");
        return;
      }

      try {
        // Save the profile before opening the dashboard.
        localStorage.setItem(
          "taskbuddy-user-profile-v2",
          JSON.stringify(newProfile)
        );

        onComplete(newProfile);
      } catch (error) {
        alert(
          "Unable to save your profile. Please check your browser storage."
        );
      }

      return;
    }

    // RETURNING USER: FIND SAVED PROFILE BY EMAIL
    const savedProfile = localStorage.getItem(
      "taskbuddy-user-profile-v2"
    );

    if (!savedProfile) {
      alert(
        "No saved profile found. Please create your profile first."
      );
      return;
    }

    try {
      const existingProfile = JSON.parse(savedProfile);

      const savedEmail = existingProfile.email
        ?.trim()
        .toLowerCase();

      if (!savedEmail || savedEmail !== email) {
        alert("No account found with this email address.");
        return;
      }

      // Restore the saved profile and open the dashboard.
      onComplete(existingProfile);
    } catch {
      alert(
        "Unable to load your saved profile. Please try again."
      );
    }
  };

  return (
    <main className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-icon">✓</div>

        <p className="welcome-eyebrow">
          YOUR PERSONAL PRODUCTIVITY SPACE
        </p>

        <h1 className="welcome-title">
          Welcome to TaskBuddy! ✨
        </h1>

        <p className="welcome-tagline">
          Your goals, your pace, your success.
        </p>

        <p className="welcome-description">
          Create a profile or return to your saved workspace.
        </p>

        <div className="welcome-mode-switch">
          <button
            type="button"
            className={mode === "create" ? "active" : ""}
            onClick={() => setMode("create")}
          >
            Create Profile
          </button>

          <button
            type="button"
            className={mode === "returning" ? "active" : ""}
            onClick={() => setMode("returning")}
          >
            Returning User
          </button>
        </div>

        <form className="welcome-form" onSubmit={handleSubmit}>
          <h2>
            {mode === "create"
              ? "👤 Create Your Profile"
              : "👋 Welcome Back"}
          </h2>

          {mode === "create" && (
            <div className="welcome-field">
              <label htmlFor="welcome-name">Full Name *</label>

              <input
                id="welcome-name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                maxLength={60}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="welcome-field">
            <label htmlFor="welcome-email">
              Email Address *
            </label>

            <input
              id="welcome-email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="you@example.com"
              maxLength={254}
              autoComplete="email"
              required
            />
          </div>

          {mode === "create" && (
            <>
              <div className="welcome-field">
                <label htmlFor="welcome-role">
                  Occupation / Role
                </label>

                <input
                  id="welcome-role"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  placeholder="e.g. Developer, Student"
                  maxLength={80}
                />
              </div>

              <div className="welcome-field">
                <label htmlFor="welcome-focus">
                  Main Focus Area
                </label>

                <select
                  id="welcome-focus"
                  name="focusArea"
                  value={profile.focusArea}
                  onChange={handleChange}
                >
                  <option value="">
                    Select your focus area
                  </option>
                  <option value="Learning">Learning</option>
                  <option value="Career">Career</option>
                  <option value="Work">Work</option>
                  <option value="Personal Growth">
                    Personal Growth
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="welcome-field">
                <label htmlFor="welcome-target">
                  Daily Task Target
                </label>

                <select
                  id="welcome-target"
                  name="dailyTarget"
                  value={profile.dailyTarget}
                  onChange={handleChange}
                >
                  <option value="3">3 tasks per day</option>
                  <option value="5">5 tasks per day</option>
                  <option value="8">8 tasks per day</option>
                  <option value="10">10 tasks per day</option>
                </select>
              </div>
            </>
          )}

          <button className="welcome-submit" type="submit">
            {mode === "create" ? "Create Profile" : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default WelcomePage;
