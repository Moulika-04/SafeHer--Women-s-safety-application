// ======================================
// SafeHer - Complete Script
// ======================================

let currentLat = null;
let currentLng = null;

// ======================================
// Page Navigation
// ======================================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    if (pageId === "dashboard") {
        loadProfile();
    }
}

// ======================================
// Profile Functions
// ======================================

function saveProfile() {

    const name = document.getElementById("name");
    const age = document.getElementById("age");
    const phone = document.getElementById("phone");
    const emergency = document.getElementById("emergency");

    localStorage.setItem(
        "name",
        name ? name.value : ""
    );

    localStorage.setItem(
        "age",
        age ? age.value : ""
    );

    localStorage.setItem(
        "phone",
        phone ? phone.value : ""
    );

    localStorage.setItem(
        "emergency",
        emergency ? emergency.value : ""
    );

    alert("✅ Profile Saved Successfully");
}

function loadProfile() {

    const name = document.getElementById("name");
    const age = document.getElementById("age");
    const phone = document.getElementById("phone");
    const emergency = document.getElementById("emergency");

    if (name) {
        name.value = localStorage.getItem("name") || "";
    }

    if (age) {
        age.value = localStorage.getItem("age") || "";
    }

    if (phone) {
        phone.value = localStorage.getItem("phone") || "";
    }

    if (emergency) {
        emergency.value =
            localStorage.getItem("emergency") || "";
    }
}

// ======================================
// Location Functions
// ======================================

function getLocation() {

    const locationText =
        document.getElementById("locationText");

    const mapFrame =
        document.getElementById("mapFrame");

    if (!navigator.geolocation) {
        locationText.innerHTML =
            "Geolocation not supported";
        return;
    }

    locationText.innerHTML =
        "Getting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position){

            currentLat =
                position.coords.latitude;

            currentLng =
                position.coords.longitude;

            locationText.innerHTML =
                `📍 Latitude: ${currentLat}<br>
                 📍 Longitude: ${currentLng}`;

            mapFrame.src =
                `https://www.google.com/maps?q=${currentLat},${currentLng}&z=16&output=embed`;
        },

        function(error){

            locationText.innerHTML =
                "Location permission denied";

            console.log(error);
        },

        {
            enableHighAccuracy:true,
            timeout:10000,
            maximumAge:0
        }
    );
}
// ======================================
// Nearby Services
// ======================================

function searchPolice() {

    window.open(
        "https://www.google.com/maps/search/police+station+near+me",
        "_blank"
    );
}

function searchHospital() {

    window.open(
        "https://www.google.com/maps/search/hospital+near+me",
        "_blank"
    );
}

// ======================================
// SOS Feature
// ======================================

function sendSOS() {

    if (
        currentLat === null ||
        currentLng === null
    ) {

        alert(
            "Please enable location first."
        );

        return;
    }

    const msg =
        `🚨 EMERGENCY! I need help.

My Live Location:
https://maps.google.com/?q=${currentLat},${currentLng}`;

    window.open(
        "https://wa.me/?text=" +
        encodeURIComponent(msg),
        "_blank"
    );
}

// ======================================
// Ride Booking
// ======================================

function findDrivers() {

    const pickup =
        document.getElementById("pickup").value;

    const drop =
        document.getElementById("drop").value;

    const members =
        parseInt(
            document.getElementById("members").value
        );

    const vehicle =
        document.getElementById("vehicleType").value;

    if (
        pickup.trim() === "" ||
        drop.trim() === "" ||
        !members ||
        vehicle === ""
    ) {

        alert(
            "Please fill all ride details."
        );

        return;
    }

    let fare = 0;
    let recommendation = "";

    const distance = 10;

    if (vehicle === "scooty") {

        fare = distance * 6;
        recommendation =
            "🛵 Best for 1 passenger";
    }

    if (vehicle === "auto") {

        fare = distance * 10;
        recommendation =
            "🛺 Best for up to 3 passengers";
    }

    if (vehicle === "car") {

        fare = distance * 14;
        recommendation =
            "🚗 Best for up to 4 passengers";
    }

    if (members === 1) {

        recommendation +=
            "<br><b>Recommended:</b> Scooty";
    }
    else if (members <= 3) {

        recommendation +=
            "<br><b>Recommended:</b> Auto";
    }
    else {

        recommendation +=
            "<br><b>Recommended:</b> Cab";
    }

    const driverBox =
        document.getElementById(
            "availableDriversBox"
        );

    const driverList =
        document.getElementById(
            "availableDrivers"
        );

    if (!driverBox || !driverList) return;

    driverBox.style.display = "block";

    driverList.innerHTML = `
        <p><b>Pickup:</b> ${pickup}</p>
        <p><b>Drop:</b> ${drop}</p>
        <p><b>Passengers:</b> ${members}</p>
        <p><b>Estimated Fare:</b> ₹${fare}</p>

        <p>${recommendation}</p>

        <hr>

        <h4>👩 Available Female Drivers</h4>

        <p>⭐ Priya Sharma | 1.2 km away</p>
        <p>⭐ Kavya Reddy | 2.1 km away</p>
        <p>⭐ Sneha Patel | 3.0 km away</p>

        <button
            class="btn primary"
            onclick="bookRide()">
            Book Ride
        </button>
    `;
}

// ======================================
// Ride Tracking
// ======================================

function bookRide() {

    const rideCard =
        document.getElementById("rideCard");

    const rideStatus =
        document.getElementById("rideStatus");

    const rideProgress =
        document.getElementById("rideProgress");

    if (
        !rideCard ||
        !rideStatus ||
        !rideProgress
    ) return;

    rideCard.style.display = "block";

    rideStatus.innerHTML =
        "👩 Female Driver Assigned";

    let progress = 0;

    const timer =
        setInterval(() => {

            progress += 10;

            rideProgress.value =
                progress;

            rideStatus.innerHTML =
                `🚕 Driver arriving... ${100 - progress}%`;

            if (progress >= 100) {

                clearInterval(timer);

                rideStatus.innerHTML =
                    "✅ Driver Arrived";
            }

        }, 1000);
}

function completeRide() {

    const feedbackCard =
        document.getElementById(
            "feedbackCard"
        );

    if (feedbackCard) {
        feedbackCard.style.display =
            "block";
    }
}

// ======================================
// Feedback
// ======================================

function submitFeedback() {

    const rating =
        document.getElementById(
            "rating"
        ).value;

    const feedback =
        document.getElementById(
            "feedback"
        ).value;

    alert(
        `⭐ Rating: ${rating}

📝 Feedback:
${feedback}

Thank you for your feedback!`
    );
}

// ======================================
// Startup
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "SafeHer Loaded Successfully"
        );

        loadProfile();
    }
);