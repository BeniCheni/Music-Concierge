$(document).ready(function() {
    var width = 960, height = 1160;

    var projection = d3.geo.albers()
        .center([0, 55.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .scale(6000)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("uk.json", function(error, uk) {
        if (error) return console.error(error);
        console.log(uk);

        svg.selectAll(".subunit")
            .data(topojson.feature(uk, uk.objects.subunits).features)
            .enter().append("path")
            .attr("class", function(d) { return "subunit " + d.id; })
            .attr("d", path);

        $('body').css('background', pickRandomColor('backgrounColor'));
        $('#description').css('color', pickRandomColor('noteColor'));
        $('.subunit.ENG').css('fill', pickRandomColor('ukColor'));
        $('.subunit.SCT').css('fill', pickRandomColor('scotlandColor'));
        $('.subunit.WLS').css('fill', pickRandomColor('walesColor'));
        $('.subunit.NIR').css('fill', pickRandomColor('northernIrelandColor'));
        $('.subunit.IRL').css('fill', pickRandomColor('irelandColor'));

        window.setInterval(function() {
            $('body').css('background', pickRandomColor('backgrounColor'));
        }, 6000);
        window.setInterval(function() {
            $('#description').css('color', pickRandomColor('noteColor'));
        }, 5000);
        window.setInterval(function() {
            $('.subunit.WLS').css('fill', pickRandomColor('walesColor'));
        }, 4000);
        window.setInterval(function() {
            $('.subunit.NIR').css('fill', pickRandomColor('northernIrelandColor'));
        }, 3000);
        window.setInterval(function() {
            $('.subunit.IRL').css('fill', pickRandomColor('irelandColor'));
        }, 2000);
        window.setInterval(function() {
            $('.subunit.ENG').css('fill', pickRandomColor('ukColor'));
        }, 1000);
        window.setInterval(function() {
            $('.subunit.SCT').css('fill', pickRandomColor('scotlandColor'));
        }, 500);
    });

    function pickRandomColor(element) {
        var randomColor = Math.floor(Math.random() * COLORS.length);
        $('#' + element).text(COLORS[randomColor]);
        return COLORS[randomColor];
    };
});