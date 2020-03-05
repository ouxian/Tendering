var transfor;
var scal;
var guangdong;
var projection;
var path;
var g2;
var SVG;



function redraw() {
    // d3.event.translate (an array) stores the current translation from the parent SVG element
    // t (an array) stores the projection's default translation
    // we add the x and y vales in each array to determine the projection's new translation
    var tx = transfor[0] * d3.event.scale + d3.event.translate[0];
    var ty = transfor[1] * d3.event.scale + d3.event.translate[1];
    projection.translate([tx, ty]);

    // now we determine the projection's new scale, but there's a problem:
    // the map doesn't 'zoom onto the mouse point'
    projection.scale(scal * d3.event.scale);

    // redraw the map
    guangdong.selectAll("path").attr("d", path);
    g2.selectAll("text").attr("transform", function(d) {
        return "translate(" + projection(d.properties.cp) + ")";
    })
};
function  drawMap(pathname) {
    var width = $("#proMap").width();
    var height = $("#proMap").height();

    SVG = d3.select("#proMap").append("svg")
        .attr("width",width)
        .attr("height",height)
        .call(d3.behavior.zoom().on("zoom", redraw));

    projection = d3.geo.mercator()
        .center([113,23])
        .scale(50000)
        .translate([width/2, height/2]);
    path = d3.geo.path()
        .projection(projection);
    transfor= projection.translate(); // the projection's default translation
    scal = projection.scale() // the projection's default scale
    guangdong =SVG.append("g");
    g2 = SVG.append("g");
    d3.json(pathname,function (error,root) {

        guangdong.selectAll("path")
            .data( root.features )
            .enter()
            .append("path")
            .attr("stroke","#6e6e6e")
            .attr("stroke-width",1)
            .attr("fill", "#f3f1ec")
            .attr("d", path )   //使用地理路径生成器
            .on("mouseover",function(d){
                //如果左侧图层数有图层选中，地图不操作
                /*                d3.select(this)
                                    .attr("fill","#F3EC1D");*/
                document.body.style.cursor = "hand";
            })
            .on("mouseout",function(d){
                //如果左侧图层数有图层选中，地图不操作
                /*                d3.select(this)
                                    .attr("fill","#f3f1ec");*/
                document.body.style.cursor = "default";
            });


        g2.selectAll("text")
            .data(root.features)
            .enter()
            .append("text")
            .attr("transform", function(d) {
                return "translate(" + projection(d.properties.cp) + ")";
            })
            .attr("dx",1)
            .attr("dy",1)
            .attr("font-size",12+"px")
            .attr("fill","#aaa4a4")
            .attr("font-weight","bold")
            .text(function (d) {
                return d.properties.name;
            });
    })
}