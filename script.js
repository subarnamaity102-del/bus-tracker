const busData = [
    {
        id: "201",
        busNumber: "201",
        route: "City Center to Airport",
        source: "City Center",
        destination: "Airport",
        currentStop: "Main Street",
        nextStop: "VIP Road",
        departureTime: "10:30 AM",
        arrival: "11:15 AM",
        platform: "Platform A",
        etaMinutes: 5,
        status: "On Time",
        driverName: "Rahul Sharma",
        availableSeats: 14,
        totalSeats: 40,
        frequency: "Every 15 Minutes"
    },

    {
        id: "115",
        busNumber: "115",
        route: "Railway to Mall",
        source: "Railway",
        destination: "Mall",
        currentStop: "Bus Terminal",
        nextStop: "Market Square",
        departureTime: "09:45 AM",
        arrival: "10:30 AM",
        platform: "Platform B",
        etaMinutes: 8,
        status: "On Time",
        driverName: "Amit Kumar",
        availableSeats: 18,
        totalSeats: 40,
        frequency: "Every 20 Minutes"
    },

    {
        id: "78",
        busNumber: "78",
        route: "University to Station",
        source: "University",
        destination: "Station",
        currentStop: "College Gate",
        nextStop: "Library Stop",
        departureTime: "08:50 AM",
        arrival: "09:25 AM",
        platform: "Platform C",
        etaMinutes: 3,
        status: "On Time",
        driverName: "Sanjay Das",
        availableSeats: 10,
        totalSeats: 35,
        frequency: "Every 10 Minutes"
    },

    {
        id: "42",
        busNumber: "42",
        route: "Airport to Hospital",
        source: "Airport",
        destination: "Hospital",
        currentStop: "VIP Road",
        nextStop: "Medical College",
        departureTime: "11:00 AM",
        arrival: "11:50 AM",
        platform: "Platform D",
        etaMinutes: 12,
        status: "Delayed",
        driverName: "Rakesh Singh",
        availableSeats: 22,
        totalSeats: 45,
        frequency: "Every 30 Minutes"
    },

    {
        id: "305",
        busNumber: "305",
        route: "Downtown to West End",
        source: "Downtown",
        destination: "West End",
        currentStop: "Central Park",
        nextStop: "River Bridge",
        departureTime: "01:15 PM",
        arrival: "02:00 PM",
        platform: "Platform E",
        etaMinutes: 7,
        status: "On Time",
        driverName: "Vikram Roy",
        availableSeats: 12,
        totalSeats: 40,
        frequency: "Every 15 Minutes"
    },

    {
        id: "88",
        busNumber: "88",
        route: "North Gate to South Hub",
        source: "North Gate",
        destination: "South Hub",
        currentStop: "Lake View",
        nextStop: "City Hospital",
        departureTime: "03:00 PM",
        arrival: "03:55 PM",
        platform: "Platform F",
        etaMinutes: 15,
        status: "On Time",
        driverName: "Anil Verma",
        availableSeats: 20,
        totalSeats: 42,
        frequency: "Every 25 Minutes"
    }

];

function getStatusBadge(status) {
    let badgeClass = "badge-success";
    if (status === "Delayed") badgeClass = "badge-warning";
    if (status === "Cancelled") badgeClass = "badge-danger";
    return `<span class="badge ${badgeClass}">${status}</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initLiveClock();
    initFAQAccordion();
    renderLiveBusStatusTable();
    renderBusScheduleTable();
    startLiveStatusSimulation();
});

function initMobileMenu() {
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navlinks = document.getElementById("navLinks");
    if (menuBtn && navlinks) {
        menuBtn.addEventListener("click", () => {
            navlinks.classList.toggle("show");
        });
        navlinks.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navlinks.classList.remove("show");
            });
        });
    }
}

function initLiveClock() {
    const clockElement = document.getElementById("liveClock");
    if(!clockElement) return;
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // HH:MM:SS format
        clockElement.textContent = timeString;
    }
    updateClock();
    setInterval(updateClock, 1000);
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        if (questionBtn) {
            questionBtn.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                faqItems.forEach(other => other.classList.remove("active"));
                if (!isActive) {
                    item.classList.add("active");
                }   
        });
        }
    });
}


function renderLiveBusStatusTable() {
    const tableBody = document.getElementById("liveBusStatusBody");
    if (!tableBody) return;
    tableBody.innerHTML = busData.map(bus => `
        <tr>
           <td class="bus-num-cell">${bus.busNumber}</td>
              <td>${bus.route}</td>
                <td>${bus.currentStop}</td>
                <td>${bus.status === 'Canclled' ? '--' : bus.etaMinutes + ' min'}</td>
                <td>${getStatusBadge(bus.status)}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="showBusModal('${bus.id}')">View Details</button>
            </td>
        </tr>
    `).join("");
}


function renderBusScheduleTable() {
    const tableBody = document.getElementById("busScheduleBody");
    if (!tableBody) return;
    tableBody.innerHTML = busData.map(bus => `
        <tr>
            <td class="bus-num-cell">${bus.busNumber}</td>
            <td>${bus.departureTime}</td>
            <td>${bus.arrival}</td>
            <td>${bus.platform}</td>
            <td>${getStatusBadge(bus.status)}</td>
            </tr>
    `).join("");
}

function startLiveStatusSimulation() {
    setInterval(() => {
       const randomBusIndex = Math.floor(Math.random() * busData.length);
       const bus = busData[randomBusIndex];
        if (bus.status !== "Cancelled") {
            if (bus.etaMinutes > 1) {
                bus.etaMinutes = Math.max(1, bus.etaMinutes + (Math.random() > 0.6 ? 1 : -1));
            } else {
                bus.etaMinutes = Math.floor(Math.random() * 12) + 2;
             } 
             
            if (Math.random() < 0.15) {
                const statuses = ["On Time", "Delayed",];
                bus.status = statuses[Math.floor(Math.random() * statuses.length)];
            }   
        }

        renderLiveBusStatusTable();
        renderBusScheduleTable();
        if (typeof filterBuses === "function") {
            filterBuses();
        }
    }, 10000);
}