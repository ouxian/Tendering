//统计城市之间的航班量
function calFlightsForInterCity(startcity, destcity, d) {
    for (var i = 0; i < d.length; i++) {
        var startCity = d[i].startcity;
        var destCity = d[i].destcity;
        if (startcity == startCity && destcity == destCity) {
            d[i].sum += 1;

            return false;
        }
        else if (startcity == destCity && destcity == startCity) {
            d[i].sum += 1;

            return false;
        }
    }
    var arr = new Object();
    arr.startcity = startcity;
    arr.destcity = destcity;
    arr.sum = 1;
    d.push(arr);
    return true;

}

//统计各城市航班总量
function calFlightsForCity(city, flightArr) {
    if (!flightArr.has(city)) {
        flightArr.set(city, 1);
    }
    else {
        flightArr.set(city, flightArr.get(city) + 1);
    }
    return true;
}

function searchCityByName(name, data) {
    var point = {'x': 0, 'y': 0};
    $.each(data, function (index, obj) {
        if (obj.name == name) {
            point.x = obj.x;
            point.y = obj.y;
        }
    });
    return point;
};

//统计数组最小值
function calMinArr(data,type) {
    var min = data[0][type];
    for (var i = 0; i < data.length; i++) {
        if (data[i][type] < min) {
            min = data[i][type];
        }
    }
    return min;
};

//统计数组最大值
function calMaxArr(data,type) {
    var max = data[0][type];
    for (var i = 0; i < data.length; i++) {
        if (data[i][type] > max) {
            max = data[i][type];
        }
    }
    return max;
};

//统计最小值
function calMin(data) {
    var min = 1000000;
    for (var [key, value] of data.entries()) {
        if (min > value)
            min = value;
    }
    return min;
};

//统计最大值
function calMax(data) {
    var max = -1;
    for (var [key, value] of data.entries()) {
        if (max < value)
            max = value;
    }
    return max;
};
//比较函数
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
};
//根据城市名称查找该城市得x坐标
function getXByName(coordata,name) {
    if(coordata == null || coordata.length == 0)
        return null;
        for(var i=0;i<coordata.length;i++)
        {
            if(coordata[i].name.indexOf(name)>-1)
            {
                return coordata[i].x;
            }
        }
};
//根据城市名称查找该城市得y坐标
function getYByName(coordata,name) {
    if(coordata == null || coordata.length == 0)
        return null;
    for(var i=0;i<coordata.length;i++)
    {
        if(coordata[i].name.indexOf(name)>-1)
        {
            return coordata[i].y;
        }
    }
};

