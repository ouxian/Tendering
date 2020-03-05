/**
 * Created by hk on 2018/8/30.
 */
//需求三、同类型规划设计机构在21个地级市中标总金额和项目个数分布图（按照中标金额大小排序，显示前五名）
//需求四、我院在21个地级市中标金额及项目数分布图

//dataY--纵轴;data_Suns--数据一;data_Counts--数据二
function drawHistogramByEchart(city,dataY,data_Sums,data_Counts) {
    // 基于准备好的dom，初始化echarts实例
    var myChart= echarts.init(document.getElementById('graph1'));
    option = null;

    var seriesLabel = {
        normal: {
            show: true,
            textBorderColor: '#333',
            textBorderWidth: 2
        }
    };

    option = {
        title: {
            text: city,
            textStyle:{
                color: '#c1a512' ,
                fontSize:15,
                fontFamily: 'Microsoft YaHei',
                fontWeight:'bolder',
                fontStyle:'italic'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['中标总金额', '项目个数']
        },
        grid: {
            left: '0%',
            right: '0%',
            top:'1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: dataY,
            splitLine:{show:false},
            splitArea:{show:false},
            axisLabel: {
                show: true,
                interval:0,
                rotate:15,
                formatter:function(params) {
                    var newParamsName = "";
                    var paramsNameNumber = params.length;
                    var provideNumber = 4;  //一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }

                    } else {
                        newParamsName = params;
                    }
                    return newParamsName
                },
                textStyle: {
                    fontWeight:'bold',
                    color: '#0712a6' //文字颜色
                }
            }
        },
        series: [
            {
                name: '中标总金额',
                type: 'bar',
                barMaxWidth:'30',
                barMinHeight: 50,
                label: seriesLabel,
                data:data_Sums
            },
            {
                name: '项目个数',
                type: 'bar',
                barMaxWidth:'30',
                barMinHeight: 30,
                label: seriesLabel,
                data: data_Counts
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }


}


function drawPicByEchart(city,legendData,seriesData,seriesConut) {
    // 基于准备好的dom，初始化echarts实例
    var myChart= echarts.init(document.getElementById('graph1'));
    option02 = null;

    option = {
        title : {
            text: city ,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legendData
        },
        series : [
            {
                name: city,
                type: 'pie',
                minAngle:8,
                radius : '20%',
                center: ['70%', '20%'],
                data:seriesConut,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            {
                name: city,
                type: 'pie',
                minAngle:8,
                radius : '50%',
                center: ['50%', '70%'],
                data:seriesData
            }

        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }


}

