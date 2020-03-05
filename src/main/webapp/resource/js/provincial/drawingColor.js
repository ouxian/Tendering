function drawColor(data,year) {
    SVG.selectAll("path").style('fill',"#f3f1ec");
    var tooltip = d3.select("#proMap").append("div")
        .attr("class", "tooltip") //用于css设置类样式
        .attr("opacity", 0.0);

    //获取头部高度
    var contentY = $(".container-header").height();

    var max = calMaxArr(data, "sums");
    var min = calMinArr(data, "sums");
    data.sort(compare("sums"));
    //颜色域
    var palered = d3.rgb(255,224,224);	//浅红
    var darkred = d3.rgb(143,10,10);		//深红

    var color = d3.interpolate(palered,darkred);

    var linear = d3.scale.linear()
        .domain([min, max])
        .range([0, 1]);
    SVG.selectAll("path")
        .style('fill', function (d) {
            var tmp = findCityByName(data,d.properties.name);


            var value = tmp != undefined?tmp.sums:0;
            value = value>0?value:0;
            var color1;
            if(value >0)
              color1 = color(linear(value));
            else
                color1 = "#f3f1ec";
            return color1;
        })
        .on("mouseover", function (d) {
            var x = d3.event.pageX;
            var y = d3.event.pageY + 30;
            var tmp = findCityByName(data,d.properties.name);


            var value = tmp != undefined?tmp.sums:0;
            value = value>0?value:0;
            if(year >0)
            {
                tooltip.html("年份    ：" + year + "<br>" + "城市名  ：" + d.properties.name + "<br>" + "采购总额：" + value )
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
            }
            else if(year ==-1){
                tooltip.html("项目类型  ：" + tmp.itemType + "<br>" + "城市名  ：" + d.properties.name + "<br>" + "采购总额：" + value )
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
            }
            else {
                tooltip.html("单位名称  ：" + tmp.WinbidCompany + "<br>" + "城市名  ：" + d.properties.name + "<br>" + "采购总额：" + value )
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
            }

            d3.select(this)
            .style("fill","#c4c4c4");

        })
        .on("mouseout", function (d) {
            tooltip.style("opacity", 0.0);
            var tmp = findCityByName(data,d.properties.name);


            var value = tmp != undefined?tmp.sums:0;
            value = value>0?value:0;
            var color1;
            if(value >0)
                color1 = color(linear(value));
            else
                color1 = "#f3f1ec";
            d3.select(this)
                .style("fill",color1);
        });
}
function findCityByName(data,cityname) {
    for(var i=0;i<data.length;i++)
    {
        if(data[i].city == cityname)
            return data[i];
    }

}