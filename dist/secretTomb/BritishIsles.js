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

    var svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    d3.json('uk.json', function(error, uk) {
        if (error) return console.error(error);
        console.log(uk);

        /* Shapes */
        svg.selectAll('.subunit')
            .data(topojson.feature(uk, uk.objects.subunits).features)
            .enter().append('path')
            .attr('class', function(d) { return 'subunit ' + d.id; })
            .attr('d', path);

        /* Initial colors */
        $('body').css('background', pickRandomColor('backgroundColor'));
        $('#description').css('color', pickRandomColor('noteColor'));
        $('.subunit.ENG').css('fill', pickRandomColor('ukColor'));
        $('.subunit.SCT').css('fill', pickRandomColor('scotlandColor'));
        $('.subunit.WLS').css('fill', pickRandomColor('walesColor'));
        $('.subunit.NIR').css('fill', pickRandomColor('northernIrelandColor'));
        $('.subunit.IRL').css('fill', pickRandomColor('irelandColor'));

        /* Change colors */
        window.setInterval(function() {
            $('body').css('background', pickRandomColor('backgroundColor'));
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

        /* UK/Scotland Boundaries */
        svg.append('path')
            .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a !== b && a.id !== 'IRL'; }))
            .attr('d', path)
            .attr('class', 'subunit-boundary');

        /* Ireland/Northern Ireland Boundaries */
        svg.append("path")
            .datum(topojson.mesh(uk, uk.objects.subunits, function(a, b) { return a === b && a.id === 'IRL'; }))
            .attr('d', path)
            .attr('class', 'subunit-boundary IRL');
        $('.subunit-boundary').css('stroke', pickRandomColor());
        $('.subunit-boundary.IRL').css('stroke', pickRandomColor());

        window.setInterval(function() {
            $('.subunit-boundary').css('stroke', pickRandomColor('ukScotlandColor'));
            $('.subunit-boundary.IRL').css('stroke', pickRandomColor('irelandNorthernIrelandColor'));
        }, 250);

        /* Country Names */
        svg.selectAll(".subunit-label")
            .data(topojson.feature(uk, uk.objects.subunits).features)
            .enter().append("text")
            .attr("class", function(d) { return "subunit-label " + d.id; })
            .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d) { return d.properties.name; });

        /* City circles */
        svg.append('path')
            .datum(topojson.feature(uk, uk.objects.places))
            .attr('d', path)
            .attr('class', 'place');

        /* City names */
        svg.selectAll('.place-label')
            .data(topojson.feature(uk, uk.objects.places).features)
            .enter().append('text')
            .attr('class', 'place-label')
            .attr('transform', function(d) { return 'translate(' + projection(d.geometry.coordinates) + ')'; })
            .attr('dy', '.35em')
            .text(function(d) { return d.properties.name; })
            /* In-line city names and circles */
            .attr('x', function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
            .style('text-anchor', function(d) { return d.geometry.coordinates[0] > -1 ? 'start' : 'end'; });
    });

    function pickRandomColor(element) {
        var randomColor = Math.floor(Math.random() * COLORS.length);
        $('#' + element).text(COLORS[randomColor]);
        return COLORS[randomColor];
    };
});