
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

    // Methods
    getRegionData(regionName) {
        return this.regioni[regionName] || { count: 0, bestSeller: 'N/A' };
    },

    getAllRegions() {
        return this.regioni;
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
