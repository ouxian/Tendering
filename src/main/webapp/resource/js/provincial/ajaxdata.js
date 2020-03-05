/*
* 从后台获取四个指标量
* year 年份
* data 缓存数据，每个年份的数据
* screenP 屏幕坐标
* url  后台请求四个地址 为数组*/
function getDataByAjax(url,year,screenCityPoints,cityPoint) {
    var years = year;
    var sums = [];
    $.ajax({
        type: "post",
        url: url + "?years="+ year ,//访问路径
        async: false,
        success: function (result) {
            sums = result;
            //d3.selectAll("#gdpsumcircle").remove();
            drawColor(sums, year);
        },
    });
}

function getDataByItemType(url,itemTypes,screenCityPoints,cityPoint) {
    var sums = [];
    var itemType = itemTypes;
    if( itemType == "历史文化保护规划" ){
        itemType = "历史"
    }
    if( itemType == "概念规划" ){
        itemType = "概念"
    }
    if( itemType == "“三旧”改造规划" ){
        itemType = "三旧"
    }
    if( itemType == "发展规划" ){
        itemType = "发展"
    }
    if( itemType == "村庄规划" ){
        itemType = "村庄"
    }
    if( itemType == "选址评估" ){
        itemType = "村庄"
    }
    if( itemType == "市政工程" ){
        itemType = "市政"
    }

    $.ajax({
        type: "post",
        url: url + "?itemType="+ itemType ,//访问路径
        async: false,
        success: function (result) {
            sums = result;
            drawColor(sums, -1);
        },
    });
}

function getDataBywinCompany(url,WinbidCompany,years,screenCityPoints,cityPoint) {
    var sums = [];
    var winCompanys = WinbidCompany;

    $.ajax({
        type: "post",
        url: url + "?WinbidCompany="+ winCompanys + "&years=" + years ,//访问路径
        async: false,
        success: function (result) {
            sums = result;
                drawColor(sums, -2);
        }
    });
}

//url=Bidwin/getSumByCompanyYear
//获取每年每市的中标金额
function getSumDataByYearCity(url,years,city,CompanyPoint,Type) {
    var data = [];
    // var city = city;
    var CompanyName = [];
    var path = "../resource/data/WinbidCompany.json";
    d3.json(path).then(function (json) {
        CompanyName = json;
    });

    $.ajax({
        type: "post",
        url: url + "?years=" + years + "&city=" + city ,//访问路径
        success: function (result) {
            data = result;
            //将data数据中winbidCompany只有一个公司的读进CompanyPoint
            for(var k=0;k<data.length;k++){      //后台返回的数据
                for( var i=0; i<CompanyName.length; i++){   //同类型设计机构
                    if(CompanyName[i].WinbidCompany === data[k].WinbidCompany){
                        var point = new Object();
                        point.name = data[k].city;
                        point.years = data[k].years;
                        point.sums = data[k].amountOfMoney;
                        point.WinbidCompany = data[k].WinbidCompany;
                        point.count = 1;
                        var index = 0;    //哨兵，判断CompanyPoint里面是否有了WinbidCompany
                        for(var j=0;j<CompanyPoint.length;j++){
                            if(CompanyPoint[j].WinbidCompany === point.WinbidCompany){
                                CompanyPoint[j].sums += point.sums;
                                CompanyPoint[j].count +=1;
                                index = 1;
                                break;
                            }
                        }
                        if(index == 0){
                            CompanyPoint.push(point);
                            break;
                        }
                    }
                }
            }

            //将data数据中winbidCompany有多个公司的读进CompanyPoint
            for(var i=0;i<data.length;i++){
                var array = data[i].WinbidCompany.split("；");
                if(array.length > 1 ){
                    array = unique(array);  //要去掉array中重复的数据
                    for(var j=0;j<array.length;j++){
                        for(var k=0;k<CompanyPoint.length;k++){
                            if( CompanyPoint[k].WinbidCompany === array[j]){
                                CompanyPoint[k].sums += data[i].amountOfMoney;
                                CompanyPoint[k].count += 1;
                                array.splice(j,1);
                                j=j-1;
                                break;
                            }
                        }
                    }
                    if(array.length > 0 ){
                        for(var p=0; p<array.length;p++){
                            var point = new Object();
                            point.name = data[i].city;
                            point.years = data[i].years;
                            point.sums = data[i].amountOfMoney;
                            point.WinbidCompany = array[p];
                            point.count = 1;
                            CompanyPoint.push(point);
                        }
                    }
                }
            }


            if(CompanyPoint.length > 0 ){
                var dataY = [];
                var data_Sums = [];
                var data_Counts = [];
                var seriesData = [];
                var seriesConut = [];
                var legendData = [];
                CompanyPoint.sort(compare("sums"));
                for(var i=0;i<CompanyPoint.length;i++){
                    dataY.push( CompanyPoint[i].WinbidCompany);
                    data_Sums.push( CompanyPoint[i].sums);
                    data_Counts.push( CompanyPoint[i].count);
                    var series = new Object();
                    series.value = CompanyPoint[i].sums;
                    series.name = CompanyPoint[i].WinbidCompany;
                    seriesData.push(series);
                    var seriesCo =new Object();
                    seriesCo.value = CompanyPoint[i].count;
                    seriesCo.name = CompanyPoint[i].WinbidCompany;
                    seriesConut.push(seriesCo);

                    legendData.push(CompanyPoint[i].WinbidCompany);
                }
                if(Type === 1){
                    drawHistogramByEchart(city,dataY,data_Sums,data_Counts);
                }
                if( Type === 2 ){
                    drawPicByEchart(city,legendData,seriesData,seriesConut);
                }
            }

        }

    });
}

//删除重复元素
function unique(arr) {
    var result = [];
    var obj = {};
    for(var i=0;i<arr.length;i++){
        if(!obj[arr[i]]){
            result.push(arr[i]);
            obj[arr[i]] = true;
        }
    }
    return result;
}



