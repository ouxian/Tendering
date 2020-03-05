var screenCityPoints = [];
var SVG;
var ISPLAY = true;
var FLASHDATA = [];
var YEAR = 2018;
var selctValue;
var cityPoint;

drawMap("../resource/data/guangdong.json");
$(function () {

    $("#selectID").change(function () {
        if($("select option").is(":selected")){
            selctValue = $('#selectID option:selected').text();
            plottingBywinCompany(selctValue);
        }
    });
});


//根据单位名、年份获取总金额
function plottingBywinCompany(Company) {

    cityPoint = [];
    var url = [];
    url.push("getSumByCompanyYear");


    getDataBywinCompany(url,Company,YEAR, screenCityPoints,cityPoint);
    // d3.selectAll("#gdpsumcircle").remove();
    // DrawCircle(cityPoint, 1);  //画圆

};


