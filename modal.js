


document.addEventListener("DOMContentLoaded", () => {
  
  initModalListeners();
});


function initModalListeners() {
  
  const modalOverlay = document.getElementById("busModalOverlay");
  
  const closeBtn = document.getElementById("busModalClose");
  
  const closeFooterBtn = document.getElementById("busModalFooterClose");

  
  if (closeBtn) closeBtn.addEventListener("click", closeBusModal);
  
  if (closeFooterBtn) closeFooterBtn.addEventListener("click", closeBusModal);

  
  if (modalOverlay) {
    
    modalOverlay.addEventListener("click", (e) => {
      
      if (e.target === modalOverlay) {
        closeBusModal();
      }
    });
  }

  
  document.addEventListener("keydown", (e) => {
    
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
      closeBusModal();
    }
  });
}


function openBusModal(busId) {
  
  const bus = busData.find(b => b.id === busId);
  
  if (!bus) return;

  
  const modalOverlay = document.getElementById("busModalOverlay");
  
  const modalTitle = document.getElementById("modalBusTitle");
  
  const modalBody = document.getElementById("modalBusBody");

  
  if (modalTitle) {
    modalTitle.textContent = `Bus #${bus.busNumber} Details`;
  }

  
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="modal-info-grid">
        <div class="info-item">
          <label>Bus Number</label>
          <span>Bus #${bus.busNumber}</span>
        </div>
        <div class="info-item">
          <label>Driver Name</label>
          <span>${bus.driverName}</span>
        </div>
        <div class="info-item">
          <label>Route</label>
          <span>${bus.routeName}</span>
        </div>
        <div class="info-item">
          <label>Current Stop</label>
          <span>${bus.currentStop}</span>
        </div>
        <div class="info-item">
          <label>Next Stop</label>
          <span>${bus.nextStop}</span>
        </div>
        <div class="info-item">
          <label>Estimated Arrival</label>
          <span>${bus.status === 'Cancelled' ? 'N/A (Cancelled)' : bus.etaMinutes + ' Minutes'}</span>
        </div>
        <div class="info-item">
          <label>Available Seats</label>
          <span>${bus.availableSeats} / ${bus.totalSeats} Seats</span>
        </div>
        <div class="info-item">
          <label>Live Status</label>
          <div>${getStatusBadge(bus.status)}</div>
        </div>
      </div>
      
      <div style="background-color: var(--bg); padding: 14px; border-radius: 6px; border: 1px solid var(--border);">
        <div style="font-size: 13px; font-weight: 600; color: var(--secondary); margin-bottom: 6px;">SERVICE SCHEDULE & PLATFORM</div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: var(--text);">
          <span><strong>Departure:</strong> ${bus.departure}</span>
          <span><strong>Arrival:</strong> ${bus.arrival}</span>
          <span><strong>Platform:</strong> ${bus.platform}</span>
        </div>
      </div>
    `;
  }

  
  if (modalOverlay) {
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}


function closeBusModal() {
  
  const modalOverlay = document.getElementById("busModalOverlay");
  
  if (modalOverlay) {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}
