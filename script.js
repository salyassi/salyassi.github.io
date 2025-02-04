// Typing Effect
var words = ["Freelancer.", "Web Developer.", "Software Engineer."];

function getSpeed(text) {
    return Math.max(50, 300 - text.length * 10);
}

var typed = new Typed("#typed-text", {
    strings: words,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
    showCursor: true,
    onStringTyped: function(arrayPos, self) {
        self.typeSpeed = getSpeed(words[(arrayPos + 1) % words.length]); 
    }
});

// 🌍 AMCharts Globe (Fixed, No Zooming)
am5.ready(function() {
    var root = am5.Root.new("globeDiv");
    try {
        root._logo.dispose();
    } catch (error) {
        console.warn("AMCharts watermark removal method no longer works:", error);
    }
    

    // ✅ Make sure am5map is loaded properly
    var chart = root.container.children.push(
        am5map.MapChart.new(root, {
            projection: am5map.geoOrthographic(), // 3D Globe projection
            panX: "none",  
            panY: "none",
            wheelX: "none",
            wheelY: "none",
            pinchZoom: false // Disable zooming
        })
    );

    // ✅ Fix the world map loading
    var backgroundSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow // Make sure this is correctly referenced
        })
    );

    backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(0x222222), // Dark background
        stroke: am5.color(0x444444) // Border color
    });

    // 🌍 Slow Rotation Effect
    chart.animate({
        key: "rotationX",
        from: 0,
        to: 360,
        duration: 30000, // 30 seconds full rotation
        loops: Infinity
    });
});

