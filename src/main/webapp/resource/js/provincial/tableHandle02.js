//说明：有五个页面：
//1、根据城市名查所有采购信息：http://localhost:8080/tenderingcaigou/getCaigouAllByCity?city=韶关市
//2、根据年份查所有采购信息：http://localhost:8080/tenderingcaigou/getCaigouAllByYear?years=2016
//3、根据城市名和年份查所有采购信息：http://localhost:8080/tenderingcaigou/getCaigouByYearAndCity?years=2015&city=韶关市
//
//1、根据城市名查所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByCity?city=韶关市
//2、根据年份查所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByYear?years=2016
//3、根据城市名和年份查所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByYearAndCity?years=2015&city=韶关市
//4、根据公司名查找所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByCompany?WinbidCompany=广东省城乡规划设计研究院
//5、根据城市年份公司名查找所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByYearCityCompany?city=韶关市&years=2015&WinbidCompany=广东省城乡规划设计研究院
//6、根据年份公司名查找所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByYearAndCompany?years=2015&WinbidCompany=广东省城乡规划设计研究院
//7、根据城市名公司名查找所有中标信息：http://localhost:8080/tenderingBidwin/getBidAllByCityAndCompany?city=韶关市&WinbidCompany=广东省城乡规划设计研究院
$(function () {

    $("#queryBtn").click(function () {
            var years = $("#txt_search_year").val();
            var city = $("#txt_search_city").val();
            var selectTable = $('#seleTable option:selected').val();
            // 1.初始化Table--先要销毁table
            $('#tb_departments').bootstrapTable('destroy');
            if( selectTable === "1" ){
                var oTable = new CaigouTableInit(years,city);
                oTable.Init();
            }
            if( selectTable === "2" ){
                var company = $("#txt_search_company").val();
                var oTable = new WinbidTableInit(years,city,company);
                oTable.Init();
            }
    });

});

//初始化采购表格
var CaigouTableInit = function (years,city) {
    var oTableInit = new Object();
    var url;
    var ul = [];
    ul[0]="caigou/getCaigouAllByYear";
    ul[1] ="caigou/getCaigouAllByCity";
    ul[2] ="caigou/getCaigouByYearAndCity";
    if( years != "" &&  city == "" ){
        url = ul[0] + "?years=" + years ;
    }
    if( city != "" &&  years == ""){
        url = ul[1] + "?city=" + city ;
    }
    if( years != "" &&  city != ""){
        url = ul[2] + "?years=" + years + "&city=" + city ;
    }

    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: url,      //请求后台的URL（*）
            method: 'post',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams, //传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 50,                       //每页的记录行数（*）
            pageList: [ 50, 100,200,500],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "city",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                title: 'ID'
            }, {
                field: 'area',
                title: '地区'
            }, {
                field: 'city',
                title: '城市'
            }, {
                field: 'itemName',
                title: '项目名'
            }, {
                field: 'years',
                title: '年份'
            },  {
                field: 'datetime',
                title: '具体日期',
                sortable:true,
                //修改日期时间格式
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },{
                field: 'amountOfMoney',
                title: '采购金额'
            },{
                field: 'source',
                title: '信息来源'
            }, {
                field: 'publish',
                title: '发布机构'
            }, {
                field: 'itemCode',
                title: '采购编号'
            }, {
                field: 'itemType',
                title: '采购品目'
            }, {
                field: 'agency',
                title: '代理机构'
            },{
                field: 'localPage',
                title: '本地地址'
            }, {
                field: 'principal',
                title: '项目负责人'
            }, {
                field: 'operator',
                title: '项目经办人'
            }, {
                field: 'webLink',
                title: '网址'
            }]
        });

    };

    $('#tb_departments').bootstrapTable('refresh',param);

    return oTableInit;
};

//初始化中标表格
var WinbidTableInit = function (years,city,company) {
    var oTableInit = new Object();
    var url;
    var ul = [];
    ul[0] = "Bidwin/getBidAllByYear";
    ul[1] = "Bidwin/getBidAllByCity";
    ul[2] = "Bidwin/getBidAllByYearAndCity";
    ul[3] = "Bidwin/getBidAllByCompany";
    ul[4] = "Bidwin/getBidAllByYearCityCompany";
    ul[5] = "Bidwin/getBidAllByYearAndCompany" ;
    ul[6] = "Bidwin/getBidAllByCityAndCompany";

    if( years != "" &&  city == "" && company == "" ){
        url = ul[0] + "?years=" + years ;
    }
    if( city != "" &&  years == "" && company == "" ){
        url = ul[1] + "?city=" + city ;
    }
    if( years != "" &&  city != "" && company == "" ){
        url = ul[2] + "?years=" + years + "&city=" + city ;
    }
    if( years == "" &&  city == "" && company != "" ){
        url = ul[3] + "?WinbidCompany=" +  company ;
    }
    if( years != "" &&  city != "" && company != "" ){
        url = ul[4] + "?city=" +  city  + "&years=" + years + "&WinbidCompany=" + company;
    }
    if( years != "" &&  city == "" && company != "" ){
        url = ul[5] + "?years=" + years + "&WinbidCompany=" + company ;
    }
    if( years == "" &&  city != "" && WinbidCompany != "" ){
        url = ul[6] + "?city=" + city + "&WinbidCompany=" + company ;
    }

    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: url,      //请求后台的URL（*）
            method: 'post',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams, //传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 50,                       //每页的记录行数（*）
            pageList: [ 50, 100,200,500],        //可供选择的每页的行数（*）
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "city",                     //每一行的唯一标识，一般为主键列
            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                title: 'ID'
            }, {
                field: 'area',
                title: '地区'
            }, {
                field: 'city',
                title: '城市'
            }, {
                field: 'itemName',
                title: '项目名'
            }, {
                field: 'years',
                title: '年份'
            },  {
                field: 'datetime',
                title: '具体日期',
                sortable:true,
                //修改日期时间格式
                formatter: function (value, row, index) {
                    return changeDateFormat(value)
                }
            },{
                field: 'amountOfMoney',
                title: '采购金额'
            },{
                field: 'moneyAdd',
                title: '采购金额(附加)'
            },{
                field: 'moneyFinal',
                title: '采购金额(最终)'
            }, {
                field: 'WinbidCompany',
                title: '中标单位'
            }, {
                field: 'WinbidCompanyWebpage',
                title: '中标单位(网上获取)'
            }, {
                field: 'WinbidCompanyFinal',
                title: '中标单位(合并)'
            },{
                field: 'source',
                title: '信息来源'
            }, {
                field: 'publish',
                title: '发布机构'
            }, {
                field: 'itemCode',
                title: '采购编号'
            }, {
                field: 'itemType',
                title: '采购品目'
            }, {
                field: 'agency',
                title: '代理机构'
            },{
                field: 'localPage',
                title: '本地地址'
            }, {
                field: 'principal',
                title: '项目负责人'
            }, {
                field: 'operator',
                title: '项目经办人'
            }, {
                field: 'webLink',
                title: '网址'
            }]
        });

    };

    $('#tb_departments').bootstrapTable('refresh',param);

    return oTableInit;
};

//转换日期格式(时间戳转换为datetime格式)
function changeDateFormat(cellval) {
    var dateVal = cellval + "";
    if (cellval != null) {
        var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
}
