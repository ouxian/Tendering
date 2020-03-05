var map;
var svg = null;
var g = null;
var cityData = null;
var flightData = null;
var layer;
var data;
var startP = null;
var endP = null;
var flightsMapdata = null;
var name;
var pointsData;
var isFlight = false;
var isTran = false;
require(["esri/map",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/geometry/Point",
    "dojo/domReady!homepage"], function (Map1, ArcGISDynamicMapServiceLayer, Point) {
    var customExtentAndSR = new esri.geometry.Extent(8175445.558847753, 2042954.3372365774, 1.503780826042659E7, 7053194.067631929, new esri.SpatialReference({"wkid": 3395}));
    map = new Map1("mapDiv", {
        extent: customExtentAndSR,
        logo:false,
        slider:false
    });

    //加载地图服务
    // var layer = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/map/MapServer");
    //var layer=new ArcGISDynamicMapServiceLayer("http://192.168.2.219:6080/arcgis/rest/services/BASEDATA/gd_dom/MapServer");
    layer = new ArcGISDynamicMapServiceLayer("http://192.168.2.12:6080/arcgis/rest/services/basemap/dt_sjdt/MapServer");
    //添加地图
    map.setBackgroundColor("#000032");
    map.addLayer(layer);

    dojo.connect(map, "onLoad", function () {
        dojo.connect(map, "onZoomEnd", reDraw);
        dojo.connect(map, "onZoomStart", d3Clear);
        dojo.connect(map, "onMouseDrag", showCoordinates);
        dojo.connect(map, "onMouseMove", showCoordinates);
        dojo.connect(map, "onMouseDragStart", DragStart);
        dojo.connect(map, "onMouseDragEnd", calAndRedraw);

    });

    map.on("load", function () {
        // 地图加载后，监听到鼠标移动或拖动事件
        svg = d3.select("#" + map.id + "_gc")
            .attr("class", "svgTransform")
            .append("svg")
            .attr("id", "d3_svg");


//获取省会城市json数据
        d3.json("./resource/data/provincial.json").then(function (json) {
            //读取json数据
            cityData = json;
            data = [];
            pointsData = []            //将地理坐标转换成屏幕的像素坐标
            geoPointToScreen(cityData, data, map);
            pointsData = data;
            //绘制省会城市点和注记
            binData();
        });
    });
    $("#flights").click(function () {
        if(!isFlight)
        {
            dataClear();
            $("#legend").css("opacity","0.4");
            ReadData("flights");
            isFlight = true;
            $("#trans").css("background-color","#FFFFFF");
            isTran = false;
        }
        else {
            $(this).css("background-color","#FFFFFF");
            $("#legend").css("opacity","0");
            dataClear();
            isFlight = false;
            $("#trans").css("background-color","#FFFFFF");
        }

    });
    $("#trans").click(function () {
        if(!isTran)
        {
            dataClear();
            $("#legend").css("opacity","0.4");
            ReadData("trans");
            $(this).css("background-color","#939393");
            isTran = true;
            $("#flights").css("background-color","#FFFFFF");
            isFlight = false;
        }
        else {
            isTran = false;
            dataClear();
            $(this).css("background-color","#FFFFFF");
            $("#legend").css("opacity","0");
            $("#flights").css("background-color","#FFFFFF");
        }

    });
    //将地理坐标转换到像素坐标
    function geoPointToScreen(geodata,da, mapa) {
        $.each(geodata.features, function (idx, obj) {
            var point = new Object();

            point.name = obj.properties.Name;
            var x = obj.geometry.coordinates[0];
            var y = obj.geometry.coordinates[1];
            var poi = new Point({
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
//读取航班数据
    var ReadData = function (type) {

        if (type == "flights") {
            //获取全国航班信息
            name = "flights";

        }
        else if (type == "trans") {
            name = "trans";
        }
        d3.json("./resource/data/" + name + ".json").then(function (json) {
            flightData = [];
            flightData = json;
            readFlightData(flightData);
            DrawColumnar(flightsMapdata);
        })
    };

    //移除svg
    function d3Clear() {
        d3.selectAll("#pointMoveProvence").remove();
        d3.selectAll("#pointMoveArcPath").remove();
        d3.selectAll("#pointMoveCircle").remove();
        d3.selectAll("#circlePoint").remove();
    };

    var dataClear = function () {
        d3.selectAll("#circlePoint").remove();
        d3.selectAll("#pointMoveArcPath").remove();
        d3.selectAll("#pointMoveCircle").remove();
        d3.selectAll("#legendSvg").remove();
    }

    //鼠标拖拽开始响应事件
    function DragStart(evt) {
        startP = evt.screenPoint;
        d3Clear();
    };

//鼠标拖拽响应事件
    function calAndRedraw(evt) {
        endP = evt.screenPoint;
        //将地理坐标转换成屏幕的像素坐标
        CalMouseDrag(pointsData, data, startP, endP);
        binData();
        readFlightData(flightData);
    };

    function CalMouseDrag(pointdata, data1, sp, ep) {
        var dx = ep.x - sp.x;
        var dy = ep.y - sp.y;
        for (var i; i < pointdata.length; i++) {
            pointdata[i].x += dx;
            pointdata[i].y += dy;
            data1[i].x += dx;
            data1[i].y += dy;
        }
    };

    function reDraw() {
        data = [];
        //将地理坐标转换成屏幕的像素坐标
        geoPointToScreen(cityData, data, map);
        binData();
        readFlightData(flightData);

    };

    // 显示坐标的回调函数，参数是evt
    function showCoordinates(evt) {
        // 从事件中获取mapPoint
        var mp = evt.mapPoint;
        // 显示鼠标坐标
        dojo.byId("info").innerHTML = "X:" + mp.x.toFixed(2) + ",Y:" + mp.y.toFixed(2);
    };

    //绑定市点数据
    function binData() {
        if (svg == null || cityData == null) {
            return;
        }

        d3.selectAll("#pointMoveProvence").remove();
        var gText = d3.select("#d3_svg")
            .append("g")
            .attr("id", "pointMoveProvence");
        //绘制省名称
        d3.select("#pointMoveProvence").selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            })
            .attr("dx", 5)
            .attr("dy", 5)
            .attr("fill", "#a87a06")
            .attr("font-size", 15)
            .attr("font-family", "simsun")
            .text(function (d) {
                return d.name;
            });
    }



    //绘制弧线
    function linArc(s, d) {
        var f = false;
        if (d.x > s.x) {
            f = true;
        }
        var dx = d.x - s.x;
        var dy = d.y - s.y;
        var dr = Math.sqrt(dx * dx + dy * dy);
        var spath = f == false ? ' 0 0,0 ' : ' 0 0,1 ';
        return 'M' + s.x + ',' + s.y + 'A' + dr + ',' + dr + spath + d.x + ',' + d.y;
    };

//根据城市名称查找航班
    function SearchFlightByCity(flights, city) {
        for (var i = 0; i < flights.length; i++) {
            var flight = flights[i];
            if (flight.startcity == city || flight.destcity == city) {
                return true;
            }
        }
        return false;
    };

    //解析航班json数据
    function readFlightData(flight) {
        var mapData = new Map();//存储各城市的航班量
        var cityToCityData = [];//存储城市之间的航班量
        document.getElementById("d3_svg").pauseAnimations()
        $.each(flight, function (index, obj) {
            //遍历信息依次绘制航班线路
            var startCity = obj.出发城市省份;
            var destCity = obj.到达城市省份;

            var startPoint = searchCityByName(startCity, data);
            var destPoint = searchCityByName(destCity, data);
            if (startPoint.x != 0 && startPoint.y != 0 && destPoint.x != 0 && destPoint.y != 0 && startCity !== destCity) {

                calFlightsForCity(startCity, mapData);//统计城市航班量
                calFlightsForCity(destCity, mapData);//统计城市航班量
                calFlightsForInterCity(startCity, destCity, cityToCityData);//统计城市之间的航班量，不区分起始和到达先后顺序
            }
        });
        var minSum = calMinArr(cityToCityData,"sum");
        var maxSum = calMaxArr(cityToCityData,"sum");
        //颜色比例尺
        var paleRed = d3.rgb(231, 113, 122);
        var darkRed = d3.rgb(231, 34, 24);
        var color = d3.interpolate(paleRed, darkRed);
        var linearArrColor = d3.scaleLinear()
            .domain([minSum, maxSum])
            .range([0, 1]);
        //透明度比例尺
        var linearArr = d3.scaleLinear()
            .domain([minSum, maxSum])
            .range([0, 0.8]);
        //弧线粗细比例尺
        //透明度比例尺
        var linearArc = d3.scaleLinear()
            .domain([minSum, maxSum])
            .range([2, 10]);
        //根据城市之间航班量画线
        g = d3.select("#d3_svg")
            .append("g")
            .attr("id", "pointMoveArcPath");
        var arcCity = d3.select("#pointMoveArcPath").selectAll("path")
            .data(cityToCityData)
            .enter()
            .append("path")
            .attr("d", function (d) {
                var sPoint = searchCityByName(d.startcity, data);
                var ePoint = searchCityByName(d.destcity, data);
                return linArc(sPoint, ePoint);
            })
            .attr("stroke", "#f53d8d") //颜色
            .attr("fill", "none")
            .style("display", "inline")
            .attr("stroke-width", function (d) {
                return linearArc(d.sum);
            })
            .attr("opacity", function (d) {
                var opacity = linearArr(d.sum);
                return opacity.toString();
            });
        g5 = d3.select("#d3_svg")
            .append("g")
            .attr("id", "pointMoveCircle");
        $.each(cityToCityData, function (index, obj) {
            var opacity = linearArr(obj.sum);
            var cl = color(linearArrColor(obj.sum));
            var sPoint = searchCityByName(obj.startcity, data);
            var ePoint = searchCityByName(obj.destcity, data);

            var path;
            path = linArc(sPoint, ePoint);
            /*            var arcPath = g.append("path")
                            .attr("d", path)
                            .attr("stroke", "#f53d8d") //颜色
                            .attr("fill", "none")
                            .attr("stroke-width", linearArc(obj.sum))
                            .style("display", "inline")
                            .attr("opacity", opacity.toString());*/
            if (obj.startcity == "广东" || obj.destcity == "广东") {//只对广东省进出的航班绘制动画
                g5.append("circle")
                    .attr("r", 4)
                    .attr("fill", "#f53228")
                    .attr("opacity", opacity.toString())
                    .style("display", "inline")
                    .append('animateMotion')
                    .attr('path', path)
                    .attr('rotate', "auto")
                    .attr('dur', "10s")
                    .attr('repeatCount', "indefinite");
            }
            //开始动画
            document.getElementById("d3_svg").unpauseAnimations()
        })
        var min = calMin(mapData);
        var max = calMax(mapData);
        var linear = d3.scaleLinear()
            .domain([min, max])
            .range([1, 15]);

        //根据航班流量绘制圆的大小
        var g1 = d3.select("#d3_svg")
            .append("g")
            .attr("id", "circlePoint");
        var cityCircle = d3.select("#circlePoint").selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })
            .attr("r", function (d) {
                var va = mapData.get(d.name);
                if(va == undefined)
                    return;
                var rD = linear(va).toFixed(1);
                return rD;
            })
            .style("display", "inline")
            .attr("opacity", function (d) {
                var va = mapData.get(d.name);
                return linearArr(va).toString();
            })
            .attr("fill", "#e74951")
            .style("display", "inline")
            .on("mouseover", function (d) {
                var elem = d3.select(this);
                if (elem.style("display") != 'none') {
                    arcCity.style("display", "none");
                    arcCity.filter(function (a) {
                        return (a.startcity == d.name || a.destcity == d.name);
                    })
                        .style("display", "inline");
                }
                cityCircle.filter(function (a) {
                    return !SearchFlightByCity(cityToCityData, d.name);
                })
                    .style("display", "none");
                d3.select("#pointMoveCircle").style("display", "none");
            })
            .on("mouseout", function (d) {
                var elem = d3.select(this);
                if (elem.style("display") != 'none') {//鼠标从高亮点移出
                    arcCity.style("display", "inline");
                    cityCircle.style("display", "inline");
                }
                d3.select("#pointMoveCircle").style("display", "inline");
            })
            .on("click",function (d) {
                var elem = d3.select(this);
                if(d.name == "广东")
                {//跳转的省域页面
                    window.location.href="page/gdpindex";
                }
            });
        flightsMapdata = mapData;
        d3.selectAll("text").raise();
    };

    //删除
    //绘制柱形统计图
    function DrawColumnar(arr) {
        var margin = {top: 14, right: 4, bottom: 10, left: 30};
        var columnarWidth = 500;
        var columnarHeight = 250;

        //对数组先进行升序排序,根据航班量排序
        var arrData = [...arr];
        arrData.sort(compare("1"));
        var temNum = GetTen(arrData);

        var barsvg = d3.select("#legend").append("svg")
            .attr("width", columnarWidth)
            .attr("height", columnarHeight)
            .attr("id", "legendSvg");
        var title;
        if (name == "flights")
        {
            title = "总航班量（前十）";
            $("#botton").text("全国航班总量统计");
        }
        else if (name == "trans")
        {
            title = "总铁路量（前十）";
            $("#botton").text("全国铁路总量统计");
        }

        barsvg.append("g")
            .append("text")
            .text(title)
            .attr("transform", "translate(" + margin.left + "," + 10 + ")");

        var g1 = barsvg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //获取y轴刻度标识
        var yText = [];
        for (var i = 0; i < temNum.length; i++) {
            yText.push(temNum[i].name);
        }
//横坐标线性比例尺
        var xLinear = d3.scaleLinear()
            .domain([0, temNum[0].sum])
            .range([0, columnarWidth - margin.left - margin.right]);
        var yLinear = d3.scaleBand()
            .domain(yText)
            .range([0, columnarHeight - margin.top - margin.bottom]);

        var xAxis = d3.axisTop(xLinear),
            yAxis = d3.axisLeft(yLinear).ticks(10);

        var barData = g1.selectAll("g.bar")
            .data(temNum);

        var bar = barData.enter().append("g")
            .attr("class", "bar")
            .style("color", "blue");

        bar.append("rect")
            .attr("x", 1)
            .attr("y", function (d, i) {
                return (yLinear.bandwidth()) * i;
            })
            .attr("width", function (d) {
                return xLinear(d.sum);
            })
            .attr("height", yLinear.bandwidth() / 2)
            .attr("fill", "#E70221")
            .attr("opacity", "1");

        var g2 = barsvg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g2.selectAll("text")
            .data(temNum)
            .enter()
            .append("text")
            .attr("x", 1)
            .attr("y", function (d, i) {
                return (yLinear.bandwidth()) * i;
            })
            .attr("dx", function (d) {
                return xLinear(d.sum) - 15;
            })
            .attr("dy", yLinear.bandwidth() / 2)
            .attr("fill", "#eeeeee")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.sum;
            });

        var g3 = barsvg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g3.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .selectAll("text")
            .attr("fill","#eeeeee")
            .attr("font-size",10+"px");

    };

    //获取数组前10个元素
    function GetTen(arr) {
        var resu = [];
        for (var i = 0; i < 10; i++) {
            var tmp = new Object();
            tmp.name = arr[i][0];
            tmp.sum = arr[i][1];
            resu.push(tmp);
        }
        return resu;
    };
});
