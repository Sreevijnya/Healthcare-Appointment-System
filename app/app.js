document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const specialty = document.getElementById("specialty").value;
    const location = document.getElementById("location").value;

    fetch(
      `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&location=${location}&skip=0&limit=10&user_key=YOUR_API_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        const doctorList = document.getElementById("doctorList");
        doctorList.innerHTML = "";

        data.data.forEach((doctor) => {
          const doctorCard = document.createElement("div");
          doctorCard.className = "doctor-card";
          doctorCard.innerHTML = `
                    <h3>${doctor.profile.first_name} ${doctor.profile.last_name}</h3>
                    <p>${doctor.specialties[0].name}</p>
                    <p>${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state}</p>
                    <button onclick="selectDoctor('${doctor.profile.first_name} ${doctor.profile.last_name}')">Select</button>
                `;
          doctorList.appendChild(doctorCard);
        });
      })
      .catch((error) => console.error("Error:", error));
  });

function selectDoctor(doctorName) {
  localStorage.setItem("selectedDoctor", doctorName);
  window.location.href = "booking.html";
}
