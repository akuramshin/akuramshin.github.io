let metadataBridgeData = [];
let currentPageBridgeData = 0;
let metadataLibero = [];
let currentPageLibero = 0;
const itemsPerPage = 20; // 4x5 grid

async function loadMetadata(dataset, gridId, paginationId) {
    try {
        const response = await fetch(`/tread_site/static/gifs/${dataset}/metadata.json`);
        if (!response.ok) throw new Error(`Failed to load metadata for ${dataset}`);
        const data = await response.json();

        if (dataset === 'motion_gifs_bridge') {
            metadataBridgeData = data;
            currentPageBridgeData = 0; // Reset to first page on load
            renderGrid(dataset, gridId, metadataBridgeData, currentPageBridgeData);
            renderPagination(dataset, paginationId, metadataBridgeData, currentPageBridgeData);
        } else if (dataset === 'motion_gifs_libero') {
            metadataLibero = data;
            currentPageLibero = 0; // Reset to first page on load
            renderGrid(dataset, gridId, metadataLibero, currentPageLibero);
            renderPagination(dataset, paginationId, metadataLibero, currentPageLibero);
        }
    } catch (error) {
        document.getElementById(gridId).innerHTML =
            `<div class="error">Error loading metadata for ${dataset}: ${error.message}</div>`;
    }
}

function renderGrid(dataset, gridId, metadataVar, currentPageVar) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    
    const startIdx = currentPageVar * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, metadataVar.length);
    
    for (let i = startIdx; i < endIdx; i++) {
        const item = metadataVar[i];
        const card = createPreviewCard(dataset, item);
        grid.appendChild(card);
    }
}

function createPreviewCard(dataset, item) {
    const card = document.createElement('div');
    card.className = 'preview-card';
    
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.textContent = 'Loading...';
    card.appendChild(loading);
    
    const img = document.createElement('img');
    img.src = `/tread_site/static/gifs/${dataset}/${item.gif_filename}`;
    img.alt = item.sub_task;
    img.style.display = 'none';
    
    img.onload = () => {
        loading.style.display = 'none';
        img.style.display = 'block';
    };
    
    img.onerror = () => {
        loading.textContent = 'Failed to load';
        loading.style.color = '#d32f2f';
    };
    
    card.appendChild(img);
    
    // Add hover events
    card.addEventListener('mouseenter', (e) => showTooltip(e, item));
    card.addEventListener('mousemove', (e) => moveTooltip(e));
    card.addEventListener('mouseleave', hideTooltip);
    
    return card;
}

function showTooltip(e, item) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
        <div class="task-label">${item.sub_task}</div>
        <div class="video-name">${item.video_name}</div>
        <div class="time-range">Time: ${item.time_range}</div>
    `;
    tooltip.classList.add('show');
    moveTooltip(e);
}

function moveTooltip(e) {
    const tooltip = document.getElementById('tooltip');
    const x = e.pageX + 10;
    const y = e.pageY + 10;
    
    // Adjust position to keep tooltip on screen
    const rect = tooltip.getBoundingClientRect();
    let adjustedX = x;
    let adjustedY = y;
    
    if (x + rect.width > window.innerWidth - 20) {
        adjustedX = e.pageX - rect.width - 10;
    }
    
    if (y + rect.height > window.innerHeight - 20) {
        adjustedY = e.pageY - rect.height - 10;
    }
    
    tooltip.style.left = adjustedX + 'px';
    tooltip.style.top = adjustedY + 'px';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('show');
}

function renderPagination(dataset, paginationId, metadataVar, currentPageVar) {
    const pagination = document.getElementById(paginationId);
    const totalPages = Math.ceil(metadataVar.length / itemsPerPage);
    
    pagination.innerHTML = `
        <button onclick="changePage('${dataset}', -1)" ${currentPageVar === 0 ? 'disabled' : ''}>
            Previous
        </button>
        <span class="page-info">
            Page ${currentPageVar + 1} of ${totalPages} 
            (${metadataVar.length} total items)
        </span>
        <button onclick="changePage('${dataset}', 1)" ${currentPageVar === totalPages - 1 ? 'disabled' : ''}>
            Next
        </button>
    `;
}

function changePage(dataset, direction) {
    let metadataVar, currentPageVar;
    if (dataset === 'motion_gifs_bridge') {
        metadataVar = metadataBridgeData;
        currentPageVar = currentPageBridgeData;
    } else if (dataset === 'motion_gifs_libero') {
        metadataVar = metadataLibero;
        currentPageVar = currentPageLibero;
    }
    
    const totalPages = Math.ceil(metadataVar.length / itemsPerPage);
    currentPageVar = Math.max(0, Math.min(currentPageVar + direction, totalPages - 1));
    
    if (dataset === 'motion_gifs_bridge') {
        currentPageBridgeData = currentPageVar;
        renderGrid('motion_gifs_bridge', 'grid-bridgedata', metadataBridgeData, currentPageBridgeData);
        renderPagination('motion_gifs_bridge', 'pagination-bridgedata', metadataBridgeData, currentPageBridgeData);
    } else if (dataset === 'motion_gifs_libero') {
        currentPageLibero = currentPageVar;
        renderGrid('motion_gifs_libero', 'grid-libero', metadataLibero, currentPageLibero);
        renderPagination('motion_gifs_libero', 'pagination-libero', metadataLibero, currentPageLibero);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMetadata('motion_gifs_bridge', 'grid-bridgedata', 'pagination-bridgedata');
    loadMetadata('motion_gifs_libero', 'grid-libero', 'pagination-libero');
});
