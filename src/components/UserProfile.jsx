import { useEffect, useState } from "react";

function UserProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("taskbuddy-profile")
      ) || {
        name: "",
        email: ""
      };
    } catch {
      return {
        name: "",
        email: ""
      };
    }
  });

  const [savedProfile, setSavedProfile] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("taskbuddy-profile")
      ) || null;
    } catch {
      return null;
    }
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value
    }));

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = profile.name.trim();
    const trimmedEmail = profile.email.trim();

    if (!trimmedName) {
      alert("Please enter your display name.");
      return;
    }

    if (
      trimmedEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    const updatedProfile = {
      name: trimmedName,
      email: trimmedEmail
    };

    localStorage.setItem(
      "taskbuddy-profile",
      JSON.stringify(updatedProfile)
    );

    setProfile(updatedProfile);
    setSavedProfile(updatedProfile);
    setSaved(true);
  };

  return (
    <section className="user-profile">
      <div className="profile-header">
        <h2>User Profile</h2>
        <p>Manage your personal details.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          <label htmlFor="profile-name">
            Display Name
          </label>

          <input
            id="profile-name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
            maxLength={60}
            required
          />
        </div>

        <div className="profile-field">
          <label htmlFor="profile-email">
            Email Address
          </label>

          <input
            id="profile-email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email (optional)"
            maxLength={100}
          />
        </div>

        <button
          className="save-profile-button"
          type="submit"
        >
          Save Profile
        </button>

        {saved && (
          <p className="profile-success" role="status">
            Profile saved successfully!
          </p>
        )}
      </form>

      {savedProfile && (
        <div className="saved-profile-card">
          <h3>Saved Profile</h3>

          <div className="saved-profile-details">
            <p>
              <strong>Display Name:</strong>{" "}
              {savedProfile.name}
            </p>

            <p>
              <strong>Email Address:</strong>{" "}
              {savedProfile.email || "Not provided"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserProfile;