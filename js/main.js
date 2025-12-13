
document.addEventListener('DOMContentLoaded', function () {
    // --- 1. Map Initialization ---
    const map = L.map('italyMap', {
        zoomControl: true,
        scrollWheelZoom: false
    }).setView([42.0, 12.5], 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    let geojsonLayer;
    const info = L.control();

    // Custom Info Control
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info-legend');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        const regionName = props ? (props.reg_name || props.name || props.NOME_REG) : null;
        const data = regionName ? DataService.getRegionData(regionName) : null;

        let content = '<h4>Dettagli Regione</h4>';
        if (regionName) {
            content += `<b>${regionName}</b><br/>`;
            content += `Vendite: ${data.count}%<br/>`;
            content += `Tipico: ${data.bestSeller}`;
        } else {
            content += 'Passa sopra una regione';
        }
        this._div.innerHTML = content;
    };

    info.addTo(map);

    function getColor(d) {
        return d > 20 ? '#4338ca' : // Indigo 700
            d > 15 ? '#6366f1' : // Indigo 500
                d > 12 ? '#818cf8' : // Indigo 400
                    d > 10 ? '#a5b4fc' : // Indigo 300
                        d > 5 ? '#c7d2fe' : // Indigo 200
                            '#e0e7ff';  // Indigo 100
    }

    function style(feature) {
        const regionName = feature.properties.reg_name || feature.properties.name || feature.properties.NOME_REG;
        const count = DataService.getRegionData(regionName).count;
        return {
            fillColor: getColor(count),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
        const layer = e.target;
        layer.setStyle({
            weight: 3,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.9
        });
        layer.bringToFront();
        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
        info.update();
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: (e) => {
                const regionName = feature.properties.reg_name || feature.properties.name;
                alert(`Hai selezionato: ${regionName}. I dati verrebbero filtrati per questa regione.`);
                // In a real app, call updateDashboard(regionfilter) here
            }
        });
    }

    // Load GeoJSON
    fetch('https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson')
        .then(response => response.json())
        .then(data => {
            geojsonLayer = L.geoJson(data, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);
            map.fitBounds(geojsonLayer.getBounds());
        })
        .catch(console.error);


    // --- 2. Charts Initialization ---
    // Common Chart Options
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#6b7280';

    // Best Sellers Chart
    const bestSellersCtx = document.getElementById('bestSellersChart').getContext('2d');
    const bestSellersChart = new Chart(bestSellersCtx, {
        type: 'bar',
        data: {
            labels: DataService.charts.bestSellers.labels,
            datasets: [{
                label: 'Quantità',
                data: DataService.charts.bestSellers.values,
                backgroundColor: DataService.charts.bestSellers.colors,
                borderRadius: 6,
                barThickness: 30
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { display: false, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: DataService.charts.revenue.labels,
            datasets: [{
                label: 'Ricavi (€)',
                data: DataService.charts.revenue.values,
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { borderDash: [5, 5] } },
                x: { grid: { display: false } }
            }
        }
    });

    // Ingredients Chart
    const ingredientsCtx = document.getElementById('ingredientsChart').getContext('2d');
    new Chart(ingredientsCtx, {
        type: 'bar',
        data: {
            labels: DataService.charts.ingredients.labels,
            datasets: [{
                label: 'Utilizzo %',
                data: DataService.charts.ingredients.values,
                backgroundColor: '#ec4899',
                borderRadius: 4,
                barThickness: 20
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { max: 100, display: false },
                y: { grid: { display: false } }
            }
        }
    });

    // Difficulty Chart
    const diffCtx = document.getElementById('difficultyChart').getContext('2d');
    new Chart(diffCtx, {
        type: 'doughnut',
        data: {
            labels: DataService.charts.difficulty.labels,
            datasets: [{
                data: DataService.charts.difficulty.values,
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: { position: 'right' }
            }
        }
    });

    // Price Chart
    const priceCtx = document.getElementById('priceChart').getContext('2d');
    new Chart(priceCtx, {
        type: 'line',
        data: {
            labels: DataService.charts.price.labels,
            datasets: [{
                label: 'Prezzo (€)',
                data: DataService.charts.price.values,
                borderColor: '#6366f1',
                borderWidth: 2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#6366f1',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { min: 0 }
            }
        }
    });


    // --- 3. Dashboard Interaction Logic ---

    // Initialize KPIs
    updateKPIs('month');

    // Time Filter Listener
    document.getElementById('timeFilter').addEventListener('change', function (e) {
        const period = e.target.value;
        updateDashboard(period);
    });

    function updateDashboard(period) {
        // Get new mock data
        const data = DataService.getFilteredData(period);

        // Update KPIs with animation
        animateValue('kpi-revenue', data.summary.totalRevenue, '€');
        animateValue('kpi-orders', data.summary.orders, '');

        // Update Revenue Chart
        revenueChart.data.datasets[0].data = data.revenue;
        revenueChart.update();

        // Update Best Seller Chart
        bestSellersChart.data.datasets[0].data = data.bestSellers;
        bestSellersChart.update();
    }

    function updateKPIs(period) {
        const data = DataService.getFilteredData(period);
        document.getElementById('kpi-revenue').textContent = '€' + data.summary.totalRevenue.toLocaleString();
        document.getElementById('kpi-orders').textContent = data.summary.orders.toLocaleString();
        document.getElementById('kpi-avg').textContent = '€' + data.summary.avgOrder;
        document.getElementById('kpi-satisfaction').textContent = data.summary.satisfaction;
    }

    function animateValue(id, value, prefix) {
        const element = document.getElementById(id);
        const start = 0;
        const end = value;
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (end - start) * ease);
            element.textContent = prefix + current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
    // --- 4. Gallery & Navigation Logic ---

    // View titles mapping
    const viewTitles = {
        'dashboard': 'Panoramica Vendite',
        'gallery': 'Galleria Dolci Regionali',
        'map': 'Mappa Regioni',
        'orders': 'Gestione Ordini',
        'clients': 'Gestione Clienti',
        'inventory': 'Gestione Inventario'
    };

    // Simple SPA Router
    const navLinks = document.querySelectorAll('.nav-link[data-view]');
    const views = document.querySelectorAll('.view-section');
    const pageTitle = document.querySelector('.page-title'); // Select by class as ID isn't set
    const dashboardControls = document.querySelector('.filter-group'); // Select by class

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Handle Navigation State
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Handle View State
            const viewName = this.getAttribute('data-view');
            const targetViewId = 'view-' + viewName;

            views.forEach(view => {
                if (view.id === targetViewId) {
                    view.classList.remove('hidden');
                } else {
                    view.classList.add('hidden');
                }
            });

            // Update Header
            pageTitle.textContent = viewTitles[viewName] || 'SugarDashboard';
            
            // Show/Hide dashboard controls
            if (viewName === 'dashboard') {
                dashboardControls.classList.remove('hidden');
            } else {
                dashboardControls.classList.add('hidden');
            }

            // Render views on demand
            switch(viewName) {
                case 'gallery':
                    renderGallery();
                    break;
                case 'map':
                    renderMapView();
                    break;
                case 'orders':
                    renderOrders();
                    break;
                case 'clients':
                    renderClients();
                    break;
                case 'inventory':
                    renderInventory();
                    break;
            }
        });
    });

    function renderGallery() {
        const container = document.getElementById('gallery-container');
        if (container.children.length > 0) return; // Already rendered

        const allRegions = DataService.getAllRegions();

        // Sort: Items with images first
        const sortedKeys = Object.keys(allRegions).sort((a, b) => {
            const hasImgA = !!allRegions[a].imagePath;
            const hasImgB = !!allRegions[b].imagePath;
            return hasImgB - hasImgA; // true(1) comes before false(0)
        });

        sortedKeys.forEach(regionName => {
            const item = allRegions[regionName];
            const card = document.createElement('div');
            card.className = 'dessert-card';

            // Use placeholder if no image
            // We use a nice sophisticated placeholder gradient or a generic placeholder service
            const imgSrc = item.imagePath || 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=600';

            card.innerHTML = `
                <img src="${imgSrc}" class="dessert-img" alt="${item.bestSeller}">
                <div class="dessert-info">
                    <div class="dessert-header">
                        <span class="dessert-region">${regionName}</span>
                    </div>
                    <div class="dessert-name">${item.bestSeller}</div>
                    <p class="dessert-desc">${item.desc}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // --- 5. Map View ---
    let fullMap = null;

    function renderMapView() {
        const mapContainer = document.getElementById('fullRegionMap');
        const statsContainer = document.getElementById('region-stats-container');
        
        // Initialize map only once
        if (!fullMap) {
            fullMap = L.map('fullRegionMap', {
                zoomControl: true,
                scrollWheelZoom: true
            }).setView([42.0, 12.5], 6);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(fullMap);

            // Load GeoJSON for full map
            fetch('https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson')
                .then(response => response.json())
                .then(data => {
                    L.geoJson(data, {
                        style: function(feature) {
                            const regionName = feature.properties.reg_name || feature.properties.name || feature.properties.NOME_REG;
                            const count = DataService.getRegionData(regionName).count;
                            return {
                                fillColor: getColorForMap(count),
                                weight: 2,
                                opacity: 1,
                                color: 'white',
                                dashArray: '3',
                                fillOpacity: 0.7
                            };
                        },
                        onEachFeature: function(feature, layer) {
                            const regionName = feature.properties.reg_name || feature.properties.name || feature.properties.NOME_REG;
                            const data = DataService.getRegionData(regionName);
                            layer.bindPopup(`
                                <div style="text-align: center; padding: 10px;">
                                    <strong style="font-size: 1.1em;">${regionName}</strong><br>
                                    <hr style="margin: 8px 0;">
                                    <div>📊 Vendite: <strong>${data.count}%</strong></div>
                                    <div>🍰 Specialità: <strong>${data.bestSeller}</strong></div>
                                </div>
                            `);
                            layer.on({
                                mouseover: function(e) {
                                    e.target.setStyle({ weight: 3, fillOpacity: 0.9 });
                                },
                                mouseout: function(e) {
                                    e.target.setStyle({ weight: 2, fillOpacity: 0.7 });
                                }
                            });
                        }
                    }).addTo(fullMap);
                })
                .catch(console.error);
        } else {
            // Invalidate size when switching back to map view
            setTimeout(() => fullMap.invalidateSize(), 100);
        }

        // Render region stats cards
        if (statsContainer.children.length === 0) {
            const regions = DataService.getAllRegions();
            const sortedRegions = Object.entries(regions).sort((a, b) => b[1].count - a[1].count);

            sortedRegions.forEach(([name, data]) => {
                const card = document.createElement('div');
                card.className = 'region-stat-card';
                card.innerHTML = `
                    <div class="region-stat-header">
                        <span class="region-name">${name}</span>
                        <span class="region-percentage">${data.count}%</span>
                    </div>
                    <div class="region-stat-bar">
                        <div class="region-stat-fill" style="width: ${data.count * 4}%; background: ${getColorForMap(data.count)};"></div>
                    </div>
                    <div class="region-stat-detail">
                        <i class="fa-solid fa-cake-candles"></i> ${data.bestSeller}
                    </div>
                `;
                statsContainer.appendChild(card);
            });
        }
    }

    function getColorForMap(d) {
        return d > 20 ? '#4338ca' :
               d > 15 ? '#6366f1' :
               d > 12 ? '#818cf8' :
               d > 10 ? '#a5b4fc' :
               d > 5 ? '#c7d2fe' :
               '#e0e7ff';
    }

    // --- 6. Orders View ---
    function renderOrders() {
        const tbody = document.getElementById('orders-tbody');
        if (tbody.children.length > 0) return; // Already rendered

        const orders = DataService.getOrders();

        orders.forEach(order => {
            const row = document.createElement('tr');
            const statusClass = order.stato === 'completato' ? 'status-success' : 
                               order.stato === 'in-spedizione' ? 'status-warning' : 'status-pending';
            const statusText = order.stato === 'completato' ? 'Completato' :
                              order.stato === 'in-spedizione' ? 'In Spedizione' : 'In Attesa';

            row.innerHTML = `
                <td><strong>${order.id}</strong></td>
                <td>${order.cliente}</td>
                <td>${order.prodotti}</td>
                <td>€${order.totale.toFixed(2)}</td>
                <td>${formatDate(order.data)}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon btn-view" title="Visualizza"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-icon btn-edit" title="Modifica"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon btn-delete" title="Elimina"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // --- 7. Clients View ---
    function renderClients() {
        const tbody = document.getElementById('clients-tbody');
        if (tbody.children.length > 0) return; // Already rendered

        const clients = DataService.getClients();

        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${client.id}</strong></td>
                <td>${client.nome}</td>
                <td>${client.email}</td>
                <td>${client.telefono}</td>
                <td><span class="region-badge">${client.regione}</span></td>
                <td>${client.ordini}</td>
                <td>€${client.totaleSpeso.toFixed(2)}</td>
                <td class="action-buttons">
                    <button class="btn-icon btn-view" title="Visualizza"><i class="fa-solid fa-eye"></i></button>
                    <button class="btn-icon btn-edit" title="Modifica"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon btn-delete" title="Elimina"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // --- 8. Inventory View ---
    function renderInventory() {
        const container = document.getElementById('inventory-container');
        if (container.children.length > 0) return; // Already rendered

        const inventory = DataService.getInventory();

        inventory.forEach(item => {
            const card = document.createElement('div');
            card.className = 'inventory-card';
            
            const statusClass = item.stato === 'disponibile' ? 'stock-available' :
                               item.stato === 'scorta-bassa' ? 'stock-low' : 'stock-out';
            const statusIcon = item.stato === 'disponibile' ? 'fa-check-circle' :
                              item.stato === 'scorta-bassa' ? 'fa-exclamation-triangle' : 'fa-times-circle';
            const statusText = item.stato === 'disponibile' ? 'Disponibile' :
                              item.stato === 'scorta-bassa' ? 'Scorta Bassa' : 'Esaurito';

            card.innerHTML = `
                <div class="inventory-header">
                    <span class="inventory-category">${item.categoria}</span>
                    <span class="inventory-id">${item.id}</span>
                </div>
                <h3 class="inventory-name">${item.nome}</h3>
                <div class="inventory-details">
                    <div class="inventory-price">€${item.prezzo.toFixed(2)}</div>
                    <div class="inventory-stock">
                        <i class="fa-solid ${statusIcon} ${statusClass}"></i>
                        <span>${item.stock} unità</span>
                    </div>
                </div>
                <div class="stock-bar">
                    <div class="stock-fill ${statusClass}" style="width: ${Math.min((item.stock / (item.minStock * 3)) * 100, 100)}%;"></div>
                </div>
                <div class="inventory-status ${statusClass}">
                    <i class="fa-solid ${statusIcon}"></i> ${statusText}
                </div>
                <div class="inventory-actions">
                    <button class="btn-sm btn-primary"><i class="fa-solid fa-plus"></i> Rifornisci</button>
                    <button class="btn-sm btn-secondary"><i class="fa-solid fa-pen"></i> Modifica</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // --- Utility Functions ---
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
    }
});
