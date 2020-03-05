/*
* 绘制环状图形*/
function drawRing(data, year,text) {
    var tooltip = d3.select("#proMap").append("div")
        .attr("class", "tooltip") //用于css设置类样式
        .attr("opacity", 0.0);


    $.each(data, function (inde, obj) {

        var tmp = Arrangement(obj);
        //每个城市绘制弧线
        var arc = d3.arc()
            .startAngle(function (d) {
                return d.start;
            })
            .endAngle(function (d) {
                return d.end;
            })
            .innerRadius(function (d) {
                return d.iner;
            })
            .outerRadius(function (d) {
                return d.out;
            });

        var g1 = SVG.append("g")
            .attr("id", "arc");
        var arcs = g1.selectAll("g")
            .data(tmp)
            .enter()
            .append("g")
            .attr("id", "arcs")
            .attr("transform", "translate(" + obj.x + "," + obj.y + ")");

        arcs.append("path")
            .attr("fill", function (d) {
                return d.color;
            })
            .attr("d", arc)
            .on("mouseover", function (d) {
                var x = d3.event.pageX;
                var y = d3.event.pageY + 30;

                tooltip.html(year + text[0] + obj.name + text[1] + text[2] + text[3] + obj.sumvalue + text[4] + obj.sumOrder + text[5] + obj.avervalue + text[6] + obj.averOrder + text[7] + obj.increasevalue + text[8]+ obj.increaseOrder + text[9] + obj.averagevalue + text[10] + obj.averageOrder + text[11])
                //设置tooltip的位置(left,top 相对于页面的距离)
                    .style("left", (x + 5) + "px")
                    .style("top", (y + 5) + "px")
                    .style("opacity", 0.6)
                    .style("background-color", STYLEOPTION.tooltipBackgroundColor)
                    .style("font-size", 12 + "px")
                    .style("color", STYLEOPTION.tooltipBackTextColor)
                    .style("width", "150px")
                    .style("height", "170px")
                    .style("position", "absolute")
                    .style("font-family", "Microsoft YaHei")
                    .style("letter-spacing", 1 + "px")
                    .style("line-height", 18 + "px");
                //鼠标移动城市，右侧四个对应的指征动画
                d3.select("#graph1").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#b7b7b7");
                d3.select("#graph2").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || dd.name.indexOf(obj.name) > -1);
                })
                    .attr("fill", "#b7b7b7");
                d3.select("#graph3").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#b7b7b7");
                d3.select("#graph4").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#b7b7b7");
                //对选定的柱状标记
                var currnetElemt = d3.select("#graph1").selectAll("rect").filter(function (dd) {
                    return (dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                });
                d3.select("#graph1").select("svg").select("#textbar").append("g")
                    .attr("id", "tmpOrderText")
                    .append("text")
                    .attr("x", currnetElemt.attr("x"))
                    .attr("y", currnetElemt.attr("y") - 5)
                    .attr("dx", 7)
                    .attr("dy", 0)
                    .attr("font-size", 20 + "px")
                    .attr("fill", "#c23531")
                    .attr("text-anchor", "middle")
                    .text(obj.sumOrder);
                //人均
                currnetElemt = d3.select("#graph2").selectAll("rect").filter(function (dd) {
                    return (dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                });
                d3.select("#graph2").select("svg").select("#textbar").append("g")
                    .attr("id", "tmpOrderText")
                    .append("text")
                    .attr("x", currnetElemt.attr("x"))
                    .attr("y", currnetElemt.attr("y") - 5)
                    .attr("dx", 7)
                    .attr("dy", 0)
                    .attr("font-size", 20 + "px")
                    .attr("fill", "#c23531")
                    .attr("text-anchor", "middle")
                    .text(obj.averOrder);
                //增长率
                currnetElemt = d3.select("#graph3").selectAll("rect").filter(function (dd) {
                    return (dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                });
                d3.select("#graph3").select("svg").select("#textbar").append("g")
                    .attr("id", "tmpOrderText")
                    .append("text")
                    .attr("x", currnetElemt.attr("x"))
                    .attr("y", currnetElemt.attr("y") - 5)
                    .attr("dx", 7)
                    .attr("dy", 0)
                    .attr("font-size", 20 + "px")
                    .attr("fill", "#c23531")
                    .attr("text-anchor", "middle")
                    .text(obj.increaseOrder);
                //地均
                currnetElemt = d3.select("#graph4").selectAll("rect").filter(function (dd) {
                    return (dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                });
                d3.select("#graph4").select("svg").select("#textbar").append("g")
                    .attr("id", "tmpOrderText")
                    .append("text")
                    .attr("x", currnetElemt.attr("x"))
                    .attr("y", currnetElemt.attr("y") - 5)
                    .attr("dx", 7)
                    .attr("dy", 0)
                    .attr("font-size", 20 + "px")
                    .attr("fill", "#c23531")
                    .attr("text-anchor", "middle")
                    .text(obj.averageOrder);

            })
            .on("mouseout", function (d) {

                tooltip.style("opacity", 0.0);

                d3.select("#graph1").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#c23531");
                d3.select("#graph2").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#c23531");
                d3.select("#graph3").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#c23531");
                d3.select("#graph4").selectAll("rect").filter(function (dd) {
                    return !(dd.name.indexOf(obj.name) > -1 || obj.name.indexOf(dd.name) > -1);
                })
                    .attr("fill", "#c23531");
                d3.select("#graph1").select("#tmpOrderText").remove();
                d3.select("#graph2").select("#tmpOrderText").remove();
                d3.select("#graph3").select("#tmpOrderText").remove();
                d3.select("#graph4").select("#tmpOrderText").remove();
            });

    })

}
//对每个城市，归整四个指征，为圆弧做准备
function Arrangement(data) {
    var tmp = [];
    getRingPar("sum", data,tmp);
    getRingPar("aver", data,tmp);
    getRingPar("increase", data,tmp);
    getRingPar("average", data,tmp);
    return tmp;
}
//根据类型设置弧的参数
function getRingPar(type, data,arry) {


    if (type == "sum") {
        var angle = getAngelOfRing(data.sumOrder);
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].firiner;
        tmp.out = param["0"].firout;
        tmp.start = param["0"].startAngle;
        tmp.end = angle;
        tmp.color = setColoeByType(type);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].firiner;
        back.out = param["0"].firout;
        back.start = angle;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);

    }
    else if (type == "aver") {
        var angle = getAngelOfRing(data.averOrder);
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].seciner;
        tmp.out = param["0"].secout;
        tmp.start = param["0"].startAngle;
        tmp.end = angle;
        tmp.color = setColoeByType(type);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].seciner;
        back.out = param["0"].secout;
        back.start = angle;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);
    }
    else if (type == "increase") {
        var angle = getAngelOfRing(data.increaseOrder);
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].thiiner;
        tmp.out = param["0"].thiout;
        tmp.start = param["0"].startAngle;
        tmp.end = angle;
        tmp.color = setColoeByType(type);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].thiiner;
        back.out = param["0"].thiout;
        back.start =angle;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);
    }
    else {
        var angle = getAngelOfRing(data.averageOrder);
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].foriner;
        tmp.out = param["0"].forout;
        tmp.start = param["0"].startAngle;
        tmp.end = angle;
        tmp.color = setColoeByType(type);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].foriner;
        back.out = param["0"].forout;
        back.start = angle;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);
    }
};
//根据类型设置弧的参数
function getArcPar(type, data,arry) {


    if (data[type] == 1) {
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].firiner;
        tmp.out = param["0"].firout;
        tmp.start = param["0"].startAngle;
        tmp.end = param["0"].firstart;
        tmp.color = setColoeByType(1);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].firiner;
        back.out = param["0"].firout;
        back.start = param["0"].firstart;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);

    }
    else if (data[type] == 2) {
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].seciner;
        tmp.out = param["0"].secout;
        tmp.start = param["0"].startAngle;
        tmp.end = param["0"].secstart;
        tmp.color = setColoeByType(2);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].seciner;
        back.out = param["0"].secout;
        back.start = param["0"].secstart;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);
    }
    else if (data[type] == 3) {
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].thiiner;
        tmp.out = param["0"].thiout;
        tmp.start = param["0"].startAngle;
        tmp.end = param["0"].thistart;
        tmp.color = setColoeByType(3);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].thiiner;
        back.out = param["0"].thiout;
        back.start = param["0"].thistart;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);
    }
    else {
        var tmp = [];
        tmp.name = type;
        tmp.iner = param["0"].foriner;
        tmp.out = param["0"].forout;
        tmp.start = param["0"].startAngle;
        tmp.end = param["0"].forstart;
        tmp.color = setColoeByType(4);
        arry.push(tmp);
        var back = [];
        back.name = type;
        back.iner = param["0"].foriner;
        back.out = param["0"].forout;
        back.start = param["0"].forstart;
        back.end = param["0"].holeAngle;
        back.color = param["0"].backgroudcolor;
        arry.push(back);
    }
};
//根据类型设置起始角度和结束角度
function setStartAngleByType(type) {
    if (type == "sum")
        return param["0"].firstart;
    else if (type == "aver")
        return param["0"].secstart;
    else if (type == "increase")
        return param["0"].thistart;
    else
        return param["0"].forstart;
};

function setEndAngleByType(type) {
    if (type == "sum")
        return param["0"].secstart - 0.2;
    else if (type == "aver")
        return param["0"].thistart - 0.2;
    else if (type == "increase")
        return param["0"].forstart - 0.2;
    else
        return 6.28 - 0.2;
}

//根据类型设置颜色
function setColoeByType(type) {
    if (type == "sum")
        return "#91c7ae";
    else if (type == "aver")
        return "#d48265";
    else if (type == "increase")
        return "#61a0a8";
    else
        return "#2f4554"

}
/*
* 根据排名确定在环中的弧长，排名越前，越大弧长*/
function getAngelOfRing(value) {
    return 2*Math.PI/21*(22-value);

}
/*
* */
function getAngelOfSurplus(angle) {
    if(angle == 2*Math.PI)
        return angle;
    else
    {
        return 2*Math.PI-angle;
    }


}