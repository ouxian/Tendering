/*
* 绘制界面右侧四个柱状图
* graphsvgarry 四个用于绘制柱状图的元素
* year 年份
* data 全局缓存
* screenP 各是对应屏幕坐标数组
* */
function drawAllHistorgram(graphsvgarry,year,data,histtextarry) {
    var iYear = parseInt(year)
    if(data.has(iYear))
    {
        var sum =data.get(iYear).sum;
        var aver =data.get(iYear).aver;
        var increase =data.get(iYear).increase;
        var average =data.get(iYear).average;
        //gdp总量
        if (sum.length > 0) {
            d3.selectAll("#gdpsumcircle").remove();

            drawHistogram(graphsvgarry[0], sum, histtextarry[0]);
        }
        if (aver.length > 0) {

            drawHistogram(graphsvgarry[1], aver,histtextarry[1]);
        }
        if (increase.length > 0) {

            drawHistogram(graphsvgarry[2], increase, histtextarry[2]);
        }
        if (average.length > 0) {
            drawHistogram(graphsvgarry[3], average, histtextarry[3]);
        }

    }

};
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
        .attr("r", 5);

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