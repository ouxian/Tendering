var screenCityPoints = [];
var SVG;
var ISPLAY = true;

var FLASHDATA = [];
var YEAR;
var selctValue;
var cityPoint;


drawMap("../resource/data/guangdong.json");
selctValue = $('#selectID option:selected').text();
plottingByitemType(selctValue);
$(function () {

    $("#selectID").change(function () {
        if($("select option").is(":selected")){
            selctValue = $('#selectID option:selected').text();
            plottingByitemType(selctValue);
        }
    });

});



//根据项目类型从数据库中读取
function plottingByitemType(itemType) {

    cityPoint = [];
    var url = [];
    url.push("getCaigouAllByItemType");


    getDataByItemType(url,itemType, screenCityPoints,cityPoint);
/*    d3.selectAll("#gdpsumcircle").remove();
    DrawCircle(cityPoint, 1);  //画圆*/

};


