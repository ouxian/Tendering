//根据gdp总量绘制圆
function DrawCircle(data, year) {
    var tooltip = d3.select("#proMap").append("div")
        .attr("class", "tooltip") //用于css设置类样式
        .attr("opacity", 0.0);
    //获取头部高度
    var contentY = $(".container-header").height();

    var max = calMaxArr(data, "sums");
    var min = calMinArr(data, "sums");
    data.sort(compare("sums"));
    //为了使得相差不大的几个城市原点差异明显，单独设置比例尺
    var linearMin = d3.scaleLinear()
        .domain([min, data[5].sums])
        .range([5, 13]);
    //前6名单独设置比例尺
    var linearMax = d3.scaleLinear()
        .domain([data[6].sums, max])
        .range([16, 22]);

    var g1 = SVG.append("g")
        .attr("id", "gdpsumcircle");    //此id在哪里？

    g1.selectAll("circle")
        .data(data)
        .enter()   //当 data.length > circle 的元素个数时用enter()。
        .append("circle")  //补充data.length - circle.length剩余的circle元素
        .attr("r", function (d, i) {
            var r;
            if(i<5)
            {
                if( max == 0 ){
                    r = 0;
                }else{
                    r = linearMax(d.sums);
                }
                if (i < 4) {
                    var tmp = [];
                    tmp.name = d.name;     //d.name指什么？
                    tmp.r = r;
                    FLASHDATA.push(tmp);
                }
                return r;
            }
            else {
                if( max == 0 ){
                    r = 0;
                }else{
                    r = linearMin(d.sums);
                }
                return r
            }

        })
        .attr("cx", function (d) {
            var x = getXByName(screenCityPoints, d.name);
            return x;
        })
        .attr("cy", function (d) {
            var y = getYByName(screenCityPoints, d.name);
            return y;
        })
        .attr("fill", "#ee845f")
        .style("display", "inline")
        .on("mouseover", function (d) {
            if (ISPLAY) {//如果时间线正在运行，直接退出
                return;
            }
            var x = d3.event.pageX;
            var y = d3.event.pageY + 30;

            tooltip.html("年份    ：" + year + "<br>" + "城市名  ：" + d.name + "<br>" + "采购总额：" + d.sums )
            //设置tooltip的位置(left,top 相对于页面的距离)
                .style("left", (x + 5) + "px")
                .style("top", (y + 5-contentY) + "px")
                .style("opacity", 0.6)
                .style("background-color", "#292929")
                .style("font-size", 12 + "px")
                .style("color", "#eeeeee")
                .style("width", "150px")
                .style("height", "200px")
                .style("position", "absolute")
                .style("font-family", "Microsoft YaHei")
                .style("letter-spacing", 1 + "px")
                .style("line-height", 18 + "px");

        })
        .on("mouseout", function (d) {
            if (ISPLAY) {//如果时间线正在运行，直接退出
                return;
            }
            tooltip.style("opacity", 0.0);

        });


};