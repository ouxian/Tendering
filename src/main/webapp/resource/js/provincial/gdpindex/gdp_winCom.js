var screenCityPoints = [];
var JSONDATA;
var SVG;
var GDPDATA = [];
var graphsvg1, graphsvg2, graphsvg3, graphsvg4;
var ISPLAY = true;
var FLASHDATA = [];
var FLASH;
var cachData = new Map();//缓存所有数据

var YEAR;
var selctValue;
var cityPoint;
var CompanyPoint;
var cityName;
var Type;
var urls = [];
urls.push("getSumByYearCity");

var param = [{
    firiner: 10,
    seciner: 10,
    thiiner: 10,
    foriner: 10,
    firout: 40,
    secout: 30,
    thiout: 20,
    forout: 15,
    firstart: 0,
    secstart: 1.57,
    thistart: 3.14,
    forstart: 4.71
}];
require(["esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/geometry/Point",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "dojo/domReady!"], function (Map1, ArcGISDynamicMapServiceLayer, Point, ArcGISTiledMapServiceLayer) {

    var customExtentAndSR = new esri.geometry.Extent(48603.447499999806, 2242330.2883, 825466.6993, 2823847.7831, new esri.SpatialReference({"wkid": 2383}));
    map = new Map1("proMap", {
        extent: customExtentAndSR,
        logo: false,
        slider:false
    });

    //加载地图服务
    //深色
    var darkLayer = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/td_gdsdjsdt_fa4/MapServer");
    //浅色
    var lightLayer = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/td_gdsdjsdt_fa3/MapServer");

    var Layer1 = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/dt_gdsssdt/MapServer");
    var Layer2 = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/dt_gdswxyxdt/MapServer");
    var Layer3 = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/dt_gdsxzbjdt/MapServer");
    var Layer4 = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/dt_gdsxzbjdt_1/MapServer");

    darkLayer.attr("name","dark");
    lightLayer.attr("name","light");
    Layer1.attr("name","blue");
    Layer2.attr("name","red");
    Layer3.attr("name","yellow");
    Layer4.attr("name","boundary");

    map.addLayer(lightLayer);
    map.addLayer(darkLayer);
    map.addLayer(Layer1);
    map.addLayer(Layer2);
    map.addLayer(Layer3);
    map.addLayer(Layer4);
    lightLayer.setVisibility(true);
    darkLayer.setVisibility(false);
    Layer1.setVisibility(false);
    Layer2.setVisibility(false);
    Layer3.setVisibility(false);
    Layer4.setVisibility(false);
    dojo.connect(map, "onLoad", function () {
        dojo.connect(map, "onZoomEnd", ReDraw);
        dojo.connect(map, "onZoomStart", d3Clear);
    });
    map.on("load", function () {
        SVG = d3.select("#" + map.id + "_gc")
            .attr("class", "svgTransform")
            .append("svg")
            .attr("id", "d3_svg");

        var path = "../resource/data/geopoint.json";
        selctValue = $('#selectID option:selected').text();
        //读取地级市信息
        d3.json(path).then(function (json) {
            screenCityPoints = [];
            JSONDATA = json;
            geoPointToScreen(json, screenCityPoints, map);
            DrawPrefectureLevelCity(screenCityPoints, SVG);
            // plottingByitemType(selctValue);
            YEAR = 2018;
        })

        //FLASH = setInterval(drawFlash, 1200);
        d3.select("#gdpsumcircle").selectAll("circle").raise();

    });

});


//重绘-———根据鼠标放大缩小重绘
function ReDraw() {
    screenCityPoints = [];
    geoPointToScreen(JSONDATA, screenCityPoints, map);
    DrawPrefectureLevelCity(screenCityPoints, SVG);
    d3.selectAll("#gdpsumcircle").remove();

    // DrawCircle(cityPoint, 2);

}

//将地理坐标转换到像素坐标
function geoPointToScreen(geodata, da, mapa) {
    dojo.require("esri.geometry.Point");
    $.each(geodata.features, function (idx, obj) {
        var point = new Object();

        point.name = obj.properties.Name;
        var x = obj.geometry.coordinates[0];
        var y = obj.geometry.coordinates[1];
        var poi = new esri.geometry.Point({
            "x": x,
            "y": y,
            "spatialReference": mapa.spatialReference
        });

        var screenPoint = mapa.toScreen(poi);
        point.x = screenPoint.x;
        point.y = screenPoint.y;
        da.push(point);
    });
};

//清除图画
function d3Clear() {
    d3.selectAll("#fectureLevelCity").remove();
    d3.selectAll("#gdpsumcircle").remove();
    d3.selectAll("#fectureLevelText").remove();
    d3.selectAll("#arc").remove();
    d3.selectAll(".tooltip").remove();
    //d3.selectAll("#arcs").remove();
}

//绘制地级市点图
function DrawPrefectureLevelCity(data, svg) {
    var g = svg.append("g")
        .attr("id", "fectureLevelCity");

    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", 10)
        .attr("fill", "#800080")
        .on("mouseover", function (d) {
            //这里写鼠标放上去的事件
            CompanyPoint = [];
            Type = 1;
            cityName = d.name;
            getSumDataByYearCity(urls,YEAR,cityName,CompanyPoint,Type);

        })
        .on("mouseout", function (d) {

        });

    var g2 = svg.append("g")
        .attr("id", "fectureLevelText");

    g2.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("dx", 10)
        .attr("dy", 5)
        .attr("font-size", 12)
        .text(function (d) {
            return d.name;
        });
    d3.select("#fectureLevelText").raise();

}

//根据项目类型从数据库中读取
function plottingByitemType(itemType) {

    cityPoint = [];
    var url = [];
    url.push("getCaigouAllByItemType");


    getDataByItemType(url,itemType, screenCityPoints,cityPoint);
    d3.selectAll("#gdpsumcircle").remove();
    // DrawCircle(cityPoint, 1);  //画圆

};

//为四个直方图控件创建svg
function createSVG() {
    var width = $("#graph1").width();
    var height = $("#graph1").height();
    graphsvg1 = d3.select("#graph1").append("svg")
        .attr("width", width)
        .attr("height", height - 10)
        .attr("id", "graphsvg1");
    graphsvg2 = d3.select("#graph2").append("svg")
        .attr("width", width)
        .attr("height", height - 10)
        .attr("id", "graphsvg2");
    graphsvg3 = d3.select("#graph3").append("svg")
        .attr("width", width)
        .attr("height", height - 10)
        .attr("id", "graphsvg3");
    graphsvg4 = d3.select("#graph4").append("svg")
        .attr("width", width)
        .attr("height", height - 10)
        .attr("id", "graphsvg4");

};



