var url = "./data/BB_4236.geojson";

const margin = ({ top: 10, right: 0, bottom: 0, left: 10 });
const mapWidth = 640 - margin.left - margin.right;
const mapHeight = 640 - margin.top - margin.bottom;

var svg = d3.select(".map").append("svg")
    .attr('width', mapWidth + margin.left + margin.right)
    .attr('height', mapHeight + margin.top + margin.bottom)
    .attr("viewbox", [0, 0, mapHeight, mapHeight])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


d3.json(url).then(function(nycGeo) {

    var projection = d3.geoAlbers()
        .rotate([74, 0]) //Rotate the projection
        .fitSize([mapWidth, mapHeight], nycGeo)

    var path = d3.geoPath()
        .projection(projection);

    var g1 = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);;
    var g2 = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);;


    var maps = nycGeo.features.filter(d => {
        return d.properties.map === 1
    })

    var markers = nycGeo.features.filter(d => {
        return d.properties.map === 0
    })

    console.log(markers);
    console.log(maps);

    // Geo Boundaries

    var popup = document.querySelector('.popup');

    g1.selectAll("path")
        .data(maps)
        .join("path")
        .attr("d", path)
        .attr("fill", 'grey')
        .attr("stroke", "black");

    // Markers
    g2.selectAll("path")
        .data(markers)
        .join("path")
        .attr("d", path)
        .attr("fill", 'rgba(0,0,0,0.5)')
        .attr("stroke", "red")
        .attr("id", function(d) {
            return d.properties.id
        })
        .on("mouseenter", (e) => {
            console.log(e.target.id)

            let active = markers.filter(function(d) {
                return d.properties.id == e.target.id
            })
            console.log(active[0].properties)

            console.log("in", e.pageX, e.pageY)
            popup.style.opacity = 0.9;
            popup.style.left = e.pageX + "px";
            popup.style.top = e.pageY + "px";
            popup.innerHTML = `<p>${active[0].properties.title}</p><p><b>Topic:</b> ${active[0].properties.Topic}</p><div><img width='100' alt='pop' src='${active[0].properties.img_url}' /><div>`;
        })
        .on("mouseleave", (e) => {
            console.log("out")
            popup.style.opacity = 0;
        })
        .on("click", (e) => {
            console.log("Clicked, I am moving on");

            var elmntToView = document.querySelector(".article__hero.flushing");
            console.log(elmntToView);
            elmntToView.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                duration: 200
            });

        });

});