var screenCityPoints = [];
var SVG;


var YEAR;


//从数据库中读取广东省地级市行政区划图
drawMap("./resource/data/guangdong.json");



//从数据库中读取一年的gdp总量数据
function plottingByYear(year) {

    var cityPoint = [];
    var url = [];
    url.push("caigou/getCaigouListByYear");
    YEAR = year;

    getDataByAjax(url,year, screenCityPoints,cityPoint);


};

//根据项目类型从数据库中读取
function plottingByitemType(itemType) {

    var cityPoint = [];
    var url = [];
    url.push("caigou/getCaigouAllByItemType");

    getDataByItemType(url,itemType, screenCityPoints,cityPoint);
    d3.selectAll("#gdpsumcircle").remove();
    DrawCircle(cityPoint, itemType);  //画圆

};





