document.addEventListener("DOMContentLoaded", function () {

    function capitalizeWords(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    fetch('/get_profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'dheeraj' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("profile-container").innerHTML = `<p class="text-danger">${data.error}</p>`;
      } else {
        const p = data.response;

        document.getElementById("profile-container").innerHTML = `
          <div class="profile-header">
            <img src="${p.profile_image_url}" alt="Profile" class="profile-image">
            <div class="profile-info">
              <h2>${capitalizeWords(p.username)}</h2>
              <p class="text-muted">${p.role}</p>
            </div>
          </div>

          <div class="info-card">
            <div class="section-title"><i class="fas fa-user-circle me-2"></i>Personal Information</div>
            <div class="row info-row">
              <div class="col-md-6">
                <p><span class="info-label">Email:</span> ${p.email}</p>
                <p><span class="info-label">Phone:</span> ${p.phone}</p>
                <p><span class="info-label">DOB:</span> ${p.dob}</p>
              </div>
              <div class="col-md-6">
                <p><span class="info-label">Gender:</span> ${p.gender}</p>
                <p><span class="info-label">Teacher:</span> ${p.teacher}</p>
                <p><span class="info-label">Joined On:</span> ${new Date(p.joined_on).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="section-title"><i class="fas fa-graduation-cap me-2"></i>Academic Information</div>
            <div class="row info-row">
              <div class="col-md-6">
                <p><span class="info-label">Class:</span> ${p.academic_info.current_class}</p>
                <p><span class="info-label">School:</span> ${p.academic_info.school_name}</p>
              </div>
              <div class="col-md-6">
                <p><span class="info-label">Board:</span> ${p.academic_info.board}</p>
                <p><span class="info-label">Subjects:</span> ${p.academic_info.subjects.join(', ')}</p>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="section-title"><i class="fas fa-cogs me-2"></i>Preferences</div>
            <div class="row info-row">
              <div class="col-md-6">
                <p><span class="info-label">Language:</span> ${p.preferences.language_preference}</p>
                <p><span class="info-label">Theme:</span> ${p.preferences.theme_mode}</p>
              </div>
              <div class="col-md-6">
                <p><span class="info-label">Notifications:</span> ${p.preferences.notifications_enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
          </div>
        `;
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("profile-container").innerHTML = `<p class="text-danger">Something went wrong while fetching the profile.</p>`;
    });
  });