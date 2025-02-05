// Typing Effect
var words = ["Freelancer", "Web Developer", "Software Engineer"];

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
    
    // Set themes
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create chart
    var chart = root.container.children.push(
        am5map.MapChart.new(root, {
            panX: "none", // Disable manual rotation
            panY: "none", // Restrict vertical movement
            projection: am5map.geoOrthographic(),
            rotationY: -10, // Tilt the globe slightly downward
            paddingBottom: 20,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 20
        })
    );

    // Set up background color (Gray Ocean)
    var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color("#d3d3d3"), // Gray background
        fillOpacity: 1,
        strokeOpacity: 0
    });
    backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    // Create world polygon series
    var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow
        })
    );

    // Styling Countries (Blue Land, No Borders)
    polygonSeries.mapPolygons.template.setAll({
        fill: am5.color("#0077cc"), // Blue land
        stroke: am5.color("#d3d3d3"), // Match ocean color to hide borders
        strokeWidth: 0.5
    });

    // Create graticule series
    var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({ strokeOpacity: 0.1, stroke: am5.color("#a0a0a0") });

    // Country Hover Effect
    var ignoredCountries = ["Israel"]; // Add more countries to ignore

    polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
        var countryName = ev.target.dataItem.dataContext.name;
        if (!ignoredCountries.includes(countryName)) {
            ev.target.set("fill", am5.color("#8a2be2")); // Slightly purplish color
            ev.target.set("tooltipText", countryName);
        }
    });

    polygonSeries.mapPolygons.template.events.on("pointerout", function(ev) {
        ev.target.set("fill", am5.color("#0077cc")); // Restore original color
    });

    // Disable zooming
    chart.set("wheelY", "none");
    chart.set("wheelX", "none");
    chart.set("minZoomLevel", 1);
    chart.set("maxZoomLevel", 1);

    // Rotate the globe automatically
    chart.animate({
        key: "rotationX",
        from: 0,
        to: 360,
        duration: 30000,
        loops: Infinity
    });
});

