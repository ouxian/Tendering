function CalaEveryCity(sumdata, averdata, increasedata,averagedata, citydata) {
    sumdata.sort(compare("value"));
    averdata.sort(compare("value"));
    increasedata.sort(compare("value"));
    averagedata.sort(compare("value"));

    var everycitydata = [];
    $.each(citydata, function (index, d) {
        var tmp = new Object();
        tmp.name = d.name;
        tmp.x = d.x;
        tmp.y = d.y;
        var cityOrderData = getEveryOrder(tmp.name,sumdata,averdata,increasedata,averagedata);
        tmp.sumvalue =sumdata[cityOrderData[0].value].value;
        tmp.avervalue =averdata[cityOrderData[1].value].value;
        tmp.increasevalue =increasedata[cityOrderData[2].value].value;
        tmp.averagevalue =averagedata[cityOrderData[3].value].value;
        tmp.sumOrder = cityOrderData[0].value+1;
        tmp.averOrder = cityOrderData[1].value+1;
        tmp.increaseOrder = cityOrderData[2].value+1;
        tmp.averageOrder = cityOrderData[3].value+1;
        cityOrderData.sort(compare("value"));
        tmp.sum = getOrderNum("sum",cityOrderData);
        tmp.aver = getOrderNum("aver",cityOrderData);
        tmp.increase = getOrderNum("increase",cityOrderData);
        tmp.average = getOrderNum("average",cityOrderData);

        everycitydata.push(tmp);

    })
    return everycitydata;
};

function getEveryOrder(name,sumdata,averdata,increasedata,averagedata) {
    var cityOrder = [];
    var tmp = [];

        //gdp总量
    tmp.name ="sum";
    tmp.value = getOrder(name,sumdata);
    cityOrder.push(tmp);
    //gdp人均
    var avertmp = [];
    avertmp.name ="aver";
    avertmp.value = getOrder(name,averdata);
    cityOrder.push(avertmp);
    //gdp增速
    var increasetmp = [];
    increasetmp.name ="increase";
    increasetmp.value = getOrder(name,increasedata);
    cityOrder.push(increasetmp);
    //gdp地均
    var averagetmp = [];
    averagetmp.name ="average";
    averagetmp.value = getOrder(name,averagedata);
    cityOrder.push(averagetmp);
    //cityOrder.sort(compare("value"));
    return cityOrder;

};
function getOrder(name,data) {
    for(var i=0;i<data.length;i++)
    {
        if(data[i].name.indexOf(name)>-1 || name.indexOf(data[i].name)>-1)
        {
            return i;
        }
    }
};
function getOrderNum(type,data) {
    for(var i=0;i<data.length;i++)
    {
        if(type == data[i].name)
        {
            return 4-i;
        }
    }
}