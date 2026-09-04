


document.addEventListener("DOMContentLoaded", () => {
  
  initSearchFilters();
});


function initSearchFilters() {
  
  const searchInput = document.getElementById("searchBusNumber");
  
  const sourceSelect = document.getElementById("searchSource");
  
  const destSelect = document.getElementById("searchDestination");
  
  const searchBtn = document.getElementById("searchBtn");
  
  const searchResultsContainer = document.getElementById("searchResultsContainer") || document.getElementById("liveBusStatusBody");
  
  const searchResultCount = document.getElementById("searchResultCount");

  
  populateDropdownOptions(sourceSelect, destSelect);

  
  if (searchInput) searchInput.addEventListener("input", filterBuses);
  
  if (sourceSelect) sourceSelect.addEventListener("change", filterBuses);
  
  if (destSelect) destSelect.addEventListener("change", filterBuses);
  
  if (searchBtn) {
    searchBtn.addEventListener("click", (e) => {
      
      e.preventDefault();
      
      filterBuses();
    });
  }

  
  if (searchResultsContainer) {
    filterBuses();
  }
}


function populateDropdownOptions(sourceSelect, destSelect) {
  
  if (!sourceSelect || !destSelect) return;

  
  const sources = [...new Set(busData.map(b => b.source))];
  
  const destinations = [...new Set(busData.map(b => b.destination))];

  
  sources.forEach(src => {
    
    const opt = document.createElement("option");
    
    opt.value = src;
    
    opt.textContent = src;
    
    sourceSelect.appendChild(opt);
  });

  
  destinations.forEach(dest => {
    
    const opt = document.createElement("option");
    
    opt.value = dest;
    
    opt.textContent = dest;
    
    destSelect.appendChild(opt);
  });
}


function filterBuses() {
  
  const searchInput = document.getElementById("searchBusNumber");
  
  const sourceSelect = document.getElementById("searchSource");
  
  const destSelect = document.getElementById("searchDestination");
  
  const searchResultsContainer = document.getElementById("searchResultsContainer") || document.getElementById("liveBusStatusBody");
  
  const searchResultCount = document.getElementById("searchResultCount");

  
  if (!searchResultsContainer) return;

  
  const numQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
  
  const sourceQuery = sourceSelect ? sourceSelect.value : "";
  
  const destQuery = destSelect ? destSelect.value : "";

  
  const filtered = busData.filter(bus => {
    
    const matchesNum = !numQuery || bus.busNumber.toLowerCase().includes(numQuery) || bus.routeName.toLowerCase().includes(numQuery);
    
    const matchesSource = !sourceQuery || bus.source === sourceQuery;
    
    const matchesDest = !destQuery || bus.destination === destQuery;
    
    return matchesNum && matchesSource && matchesDest;
  });

  
  if (searchResultCount) {
    searchResultCount.textContent = `Showing ${filtered.length} matching ${filtered.length === 1 ? 'bus' : 'buses'}`;
  }

  
  if (filtered.length === 0) {
    
    searchResultsContainer.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 40px; color: var(--secondary);">
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">No Buses Found</div>
          <p style="font-size: 14px;">Try searching for a different bus number or clearing your route filters.</p>
        </td>
      </tr>
    `;
    
    return;
  }

  
  searchResultsContainer.innerHTML = filtered.map(bus => `
    <tr>
      <td class="bus-num-cell">Bus #${bus.busNumber}</td>
      <td>${bus.routeName}</td>
      <td>${bus.currentStop}</td>
      <td>${bus.status === 'Cancelled' ? '--' : bus.etaMinutes + ' min'}</td>
      <td>${getStatusBadge(bus.status)}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openBusModal('${bus.id}')">View Details</button>
      </td>
    </tr>
  `).join('');
}
