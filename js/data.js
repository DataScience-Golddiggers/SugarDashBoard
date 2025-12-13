
// Mock Data Service

const DataService = {
    // Base data
    regioni: {
        'Sicilia': { count: 25, bestSeller: 'Cannoli', imagePath: 'images/cannolo.png', desc: 'Cialda fritta farcita con ricotta di pecora zuccherata e gocce di cioccolato.' },
        'Campania': { count: 18, bestSeller: 'Pastiera', imagePath: 'images/pastiera.png', desc: 'Tortino di pasta frolla con grano, ricotta e scorze d\'arancia.' },
        'Toscana': { count: 15, bestSeller: 'Cantucci', imagePath: 'images/cantucci.png', desc: 'Biscotti alle mandorle, perfetti da inzuppare nel Vin Santo.' },
        'Piemonte': { count: 12, bestSeller: 'Panna Cotta', imagePath: 'images/pannacotta.png', desc: 'Dolce al cucchiaio a base di panna, latte e zucchero.' },
        'Lombardia': { count: 20, bestSeller: 'Panettone', imagePath: 'images/panettone.png', desc: 'Grande pane dolce lievitato con canditi e uvetta.' },
        'Veneto': { count: 10, bestSeller: 'Tiramisù', imagePath: 'images/tiramisu.png', desc: 'Savoiardi inzuppati nel caffè e crema al mascarpone.' },
        'Lazio': { count: 14, bestSeller: 'Maritozzo', imagePath: 'images/maritozzo.png', desc: 'Panino dolce soffice spaccato in due e farcito con panna montata.' },
        'Puglia': { count: 11, bestSeller: 'Pasticciotto', imagePath: 'images/pasticciotto.png', desc: 'Pasta frolla ripiena di crema pasticcera e amarena.' },
        'Emilia-Romagna': { count: 13, bestSeller: 'Zuppa Inglese', imagePath: 'images/zuppainglese.png', desc: 'Dolce al cucchiaio con pan di spagna, alchermes e crema pasticcera.' },
        'Calabria': { count: 8, bestSeller: 'Tartufo', imagePath: 'images/tartufo.png', desc: 'Gelato alla nocciola e cioccolato ricoperto di cacao.' },
        'Sardegna': { count: 7, bestSeller: 'Seadas', imagePath: 'images/seadas.png', desc: 'Dolce fritto ripieno di formaggio fresco e ricoperto di miele.' },
        'Liguria': { count: 6, bestSeller: 'Pandolce', imagePath: 'images/pandolce.png', desc: 'Torta genovese ricca di uvetta, pinoli e canditi.' },
        'Marche': { count: 5, bestSeller: 'Frustingo', imagePath: 'images/frustingo.png', desc: 'Dolce natalizio a base di fichi secchi, noci, mandorle e cioccolato.' },
        'Abruzzo': { count: 4, bestSeller: 'Parrozzo', imagePath: 'images/parrozzo.png', desc: 'Dolce semisferico con mandorle e copertura di cioccolato.' },
        'Friuli-Venezia Giulia': { count: 6, bestSeller: 'Gubana', imagePath: 'images/gubana.png', desc: 'Pasta lievitata con ripieno di noci, uvetta, pinoli e grappa.' },
        'Trentino-Alto Adige': { count: 8, bestSeller: 'Strudel', imagePath: 'images/strudel.png', desc: 'Rotolo di pasta sottile ripieno di mele, uvetta, pinoli e cannella.' },
        'Umbria': { count: 5, bestSeller: 'Pampepato', imagePath: 'images/pampepato.png', desc: 'Dolce speziato con frutta secca, miele, cioccolato e pepe.' },
        'Basilicata': { count: 3, bestSeller: 'Mostacciolo', imagePath: 'images/mostaccioli.png', desc: 'Biscotti duri al miele e mandorle, spesso ricoperti di cioccolato.' },
        'Molise': { count: 2, bestSeller: 'Peccellate', imagePath: 'images/peccellate.png', desc: 'Dolcetti di pasta ripieni di mosto cotto o confettura.' },
        "Valle d'Aosta": { count: 3, bestSeller: 'Tegole', imagePath: 'images/tegole.png', desc: 'Biscotti sottili e croccanti a base di nocciole.' }
    },

    // Chart Data Configs
    charts: {
        bestSellers: {
            labels: ['Tiramisù', 'Cannoli', 'Panna Cotta', 'Pastiera', 'Panettone'],
            values: [450, 380, 320, 280, 250],
            colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'],
            regioni: ['Veneto', 'Sicilia', 'Piemonte', 'Campania', 'Lombardia']
        },
        ingredients: {
            labels: ['Farina', 'Zucchero', 'Uova', 'Burro', 'Latte', 'Cioccolato'],
            values: [85, 78, 72, 65, 58, 52]
        },
        revenue: {
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
            values: [12500, 15800, 18200, 16900, 21300, 19500, 17800, 14200, 16500, 18900, 22400, 28500]
        },
        difficulty: {
            labels: ['Facile', 'Medio', 'Difficile'],
            values: [580, 420, 280]
        },
        price: {
            labels: ['Tiramisù', 'Cannoli', 'Panna Cotta', 'Pastiera', 'Panettone'],
            values: [4.5, 3.8, 4.2, 5.5, 6.2]
        }
    },

    // Ordini Mock Data
    ordini: [
        { id: 'ORD-001', cliente: 'Mario Rossi', prodotti: 'Tiramisù x2, Cannoli x3', totale: 45.50, data: '2025-12-13', stato: 'completato' },
        { id: 'ORD-002', cliente: 'Giulia Bianchi', prodotti: 'Panettone x1', totale: 28.00, data: '2025-12-13', stato: 'in-spedizione' },
        { id: 'ORD-003', cliente: 'Luca Verdi', prodotti: 'Pastiera x2, Panna Cotta x4', totale: 62.00, data: '2025-12-12', stato: 'in-attesa' },
        { id: 'ORD-004', cliente: 'Anna Ferrari', prodotti: 'Cannoli x10', totale: 38.00, data: '2025-12-12', stato: 'completato' },
        { id: 'ORD-005', cliente: 'Paolo Russo', prodotti: 'Strudel x3, Tiramisù x2', totale: 55.00, data: '2025-12-11', stato: 'completato' },
        { id: 'ORD-006', cliente: 'Francesca Colombo', prodotti: 'Maritozzo x6', totale: 24.00, data: '2025-12-11', stato: 'in-spedizione' },
        { id: 'ORD-007', cliente: 'Marco Gallo', prodotti: 'Pasticciotto x4', totale: 18.00, data: '2025-12-10', stato: 'in-attesa' },
        { id: 'ORD-008', cliente: 'Sara Conti', prodotti: 'Seadas x5, Panna Cotta x2', totale: 42.00, data: '2025-12-10', stato: 'completato' },
        { id: 'ORD-009', cliente: 'Andrea Marino', prodotti: 'Gubana x2', totale: 32.00, data: '2025-12-09', stato: 'in-spedizione' },
        { id: 'ORD-010', cliente: 'Elena Bruno', prodotti: 'Cannoli x5, Tiramisù x3', totale: 58.50, data: '2025-12-09', stato: 'in-attesa' }
    ],

    // Clienti Mock Data
    clienti: [
        { id: 'CLI-001', nome: 'Mario Rossi', email: 'mario.rossi@email.it', telefono: '+39 333 1234567', regione: 'Lombardia', ordini: 15, totaleSpeso: 485.50 },
        { id: 'CLI-002', nome: 'Giulia Bianchi', email: 'giulia.bianchi@email.it', telefono: '+39 347 2345678', regione: 'Toscana', ordini: 8, totaleSpeso: 312.00 },
        { id: 'CLI-003', nome: 'Luca Verdi', email: 'luca.verdi@email.it', telefono: '+39 320 3456789', regione: 'Sicilia', ordini: 22, totaleSpeso: 756.00 },
        { id: 'CLI-004', nome: 'Anna Ferrari', email: 'anna.ferrari@email.it', telefono: '+39 339 4567890', regione: 'Veneto', ordini: 12, totaleSpeso: 428.00 },
        { id: 'CLI-005', nome: 'Paolo Russo', email: 'paolo.russo@email.it', telefono: '+39 348 5678901', regione: 'Campania', ordini: 6, totaleSpeso: 198.50 },
        { id: 'CLI-006', nome: 'Francesca Colombo', email: 'f.colombo@email.it', telefono: '+39 335 6789012', regione: 'Piemonte', ordini: 18, totaleSpeso: 642.00 },
        { id: 'CLI-007', nome: 'Marco Gallo', email: 'marco.gallo@email.it', telefono: '+39 342 7890123', regione: 'Puglia', ordini: 9, totaleSpeso: 287.00 },
        { id: 'CLI-008', nome: 'Sara Conti', email: 'sara.conti@email.it', telefono: '+39 331 8901234', regione: 'Emilia-Romagna', ordini: 25, totaleSpeso: 892.50 },
        { id: 'CLI-009', nome: 'Andrea Marino', email: 'a.marino@email.it', telefono: '+39 329 9012345', regione: 'Lazio', ordini: 11, totaleSpeso: 365.00 },
        { id: 'CLI-010', nome: 'Elena Bruno', email: 'elena.bruno@email.it', telefono: '+39 346 0123456', regione: 'Sicilia', ordini: 14, totaleSpeso: 521.00 }
    ],

    // Inventario Mock Data
    inventario: [
        { id: 'INV-001', nome: 'Tiramisù', categoria: 'Dolce al Cucchiaio', prezzo: 5.50, stock: 45, minStock: 10, stato: 'disponibile' },
        { id: 'INV-002', nome: 'Cannoli Siciliani', categoria: 'Pasticceria', prezzo: 3.80, stock: 60, minStock: 15, stato: 'disponibile' },
        { id: 'INV-003', nome: 'Panna Cotta', categoria: 'Dolce al Cucchiaio', prezzo: 4.20, stock: 35, minStock: 10, stato: 'disponibile' },
        { id: 'INV-004', nome: 'Pastiera Napoletana', categoria: 'Torta', prezzo: 5.50, stock: 8, minStock: 10, stato: 'scorta-bassa' },
        { id: 'INV-005', nome: 'Panettone Artigianale', categoria: 'Lievitato', prezzo: 28.00, stock: 25, minStock: 5, stato: 'disponibile' },
        { id: 'INV-006', nome: 'Maritozzo con Panna', categoria: 'Pasticceria', prezzo: 4.00, stock: 0, minStock: 20, stato: 'esaurito' },
        { id: 'INV-007', nome: 'Strudel di Mele', categoria: 'Torta', prezzo: 4.50, stock: 18, minStock: 8, stato: 'disponibile' },
        { id: 'INV-008', nome: 'Pasticciotto Leccese', categoria: 'Pasticceria', prezzo: 2.50, stock: 5, minStock: 12, stato: 'scorta-bassa' },
        { id: 'INV-009', nome: 'Seadas', categoria: 'Dolce Fritto', prezzo: 6.00, stock: 12, minStock: 5, stato: 'disponibile' },
        { id: 'INV-010', nome: 'Gubana', categoria: 'Lievitato', prezzo: 15.00, stock: 0, minStock: 3, stato: 'esaurito' },
        { id: 'INV-011', nome: 'Cantucci Toscani', categoria: 'Biscotti', prezzo: 8.00, stock: 40, minStock: 10, stato: 'disponibile' },
        { id: 'INV-012', nome: 'Tartufo di Pizzo', categoria: 'Gelato', prezzo: 4.50, stock: 6, minStock: 8, stato: 'scorta-bassa' }
    ],

    // Methods
    getRegionData(regionName) {
        return this.regioni[regionName] || { count: 0, bestSeller: 'N/A' };
    },

    getAllRegions() {
        return this.regioni;
    },

    getOrders() {
        return this.ordini;
    },

    getClients() {
        return this.clienti;
    },

    getInventory() {
        return this.inventario;
    },

    // Simulates filtering data based on time period
    getFilteredData(period) {
        // In a real app, this would fetch from API. 
        // Here we just randomize slightly to show interaction.
        const multiplier = period === 'week' ? 0.25 : period === 'month' ? 1 : 12;

        return {
            revenue: this.charts.revenue.values.map(v => Math.round(v * multiplier * (0.9 + Math.random() * 0.2))),
            bestSellers: this.charts.bestSellers.values.map(v => Math.round(v * multiplier * (0.9 + Math.random() * 0.2))),
            summary: {
                totalRevenue: Math.round(230000 * multiplier),
                orders: Math.round(1540 * multiplier),
                avgOrder: 45.5,
                satisfaction: '98%'
            }
        };
    }
};

// Export for global use
window.DataService = DataService;
