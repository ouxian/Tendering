var STYLEOPTION =  {
    "mapBackgroundColor":"#d1d1d1",
    "PrefectureLevelCityCircleColor":"#800080",
    "PrefectureLevelCityCircleTextColor":"#9c9c9c",
    "tooltipBackgroundColor":"#292929",
    "tooltipBackTextColor":"#eeeeee",
};
$(document).ready(function () {
    $(document).off('click.bs.dropdown.data-api');

    //风格切换按钮
    $("#default").bind("click",function () {
        //亮色风格
        STYLEOPTION.mapBackgroundColor = "#d1d1d1";
        STYLEOPTION.PrefectureLevelCityCircleColor = "#800080";
        STYLEOPTION.PrefectureLevelCityCircleTextColor ="#9c9c9c";
        STYLEOPTION.tooltipBackgroundColor = "#292929";
        STYLEOPTION.tooltipBackTextColor = "#eeeeee";
        //地图背景色切换
        map.setBackgroundColor(STYLEOPTION.mapBackgroundColor);
        var layers = map.getLayersVisibleAtScale(map.getScale());
        for(var i=0;i<layers.length;i++)
        {
            if(layers[i]._attrs.name == "light")
                layers[i].setVisibility(true);
            else
                layers[i].setVisibility(false);

        }
        d3Clear();
        ReDraw();

    })
    $("#dark").bind("click",function () {
        //暗色地图风格
        STYLEOPTION.mapBackgroundColor = "#003553";
        STYLEOPTION.PrefectureLevelCityCircleColor = "#cba12c";
        STYLEOPTION.PrefectureLevelCityCircleTextColor = "#9c9c9c";
        STYLEOPTION.tooltipBackgroundColor = "#292929";
        STYLEOPTION.tooltipBackTextColor = "#eeeeee";
        map.setBackgroundColor(STYLEOPTION.mapBackgroundColor);
        var layers = map.getLayersVisibleAtScale(map.getScale());
        for(var i=0;i<layers.length;i++)
        {
            if(layers[i]._attrs.name == "dark")
                layers[i].setVisibility(true);
            else
                layers[i].setVisibility(false);
        }
        d3Clear();
        ReDraw();
    });
    $("#blue").bind("click",function () {
        //第三个
        STYLEOPTION.mapBackgroundColor = "#cae0dd";
        STYLEOPTION.PrefectureLevelCityCircleColor = "#800080";
        STYLEOPTION.PrefectureLevelCityCircleTextColor ="#9c9c9c";
        STYLEOPTION.tooltipBackgroundColor = "#292929";
        STYLEOPTION.tooltipBackTextColor = "#eeeeee";
        map.setBackgroundColor(STYLEOPTION.mapBackgroundColor);
        var layers = map.getLayersVisibleAtScale(map.getScale());
        for(var i=0;i<layers.length;i++)
        {
            if(layers[i]._attrs.name == "blue")
                layers[i].setVisibility(true);
            else
                layers[i].setVisibility(false);
        }
        d3Clear();
        ReDraw();
    });
    $("#red").bind("click",function () {
        //第四个
        STYLEOPTION.mapBackgroundColor = "#95a6f8";
        STYLEOPTION.PrefectureLevelCityCircleColor = "#800080";
        STYLEOPTION.PrefectureLevelCityCircleTextColor ="#9c9c9c";
        STYLEOPTION.tooltipBackgroundColor = "#292929";
        STYLEOPTION.tooltipBackTextColor = "#eeeeee";
        map.setBackgroundColor(STYLEOPTION.mapBackgroundColor);
        var layers = map.getLayersVisibleAtScale(map.getScale());
        for(var i=0;i<layers.length;i++)
        {
            if(layers[i]._attrs.name == "red")
                layers[i].setVisibility(true);
            else
                layers[i].setVisibility(false);
        }
        d3Clear();
        ReDraw();
    });
    $("#yellow").bind("click",function () {
        //暗色地图风格
        STYLEOPTION.mapBackgroundColor = "#d1d1d1";
        STYLEOPTION.PrefectureLevelCityCircleColor = "#800080";
        STYLEOPTION.PrefectureLevelCityCircleTextColor ="#9c9c9c";
        STYLEOPTION.tooltipBackgroundColor = "#292929";
        STYLEOPTION.tooltipBackTextColor = "#eeeeee";
        map.setBackgroundColor(STYLEOPTION.mapBackgroundColor);
        var layers = map.getLayersVisibleAtScale(map.getScale());
        for(var i=0;i<layers.length;i++)
        {
            if(layers[i]._attrs.name == "yellow")
                layers[i].setVisibility(true);
            else
                layers[i].setVisibility(false);
        }
        d3Clear();
        ReDraw();
    });
    //城乡空间
    $("#landspace").click(function () {
        window.location.href="urban";
    })
    //交通联系
    $("#traffic").click(function () {
        window.location.href="interconnection";
    })
    //词频意向
    $("#wordfrequency").click(function () {
        window.location.href="wordfrequency";
    })
})