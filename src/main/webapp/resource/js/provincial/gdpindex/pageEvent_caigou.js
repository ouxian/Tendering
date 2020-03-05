jQuery(document).ready(function(){

    $("#Navigation_Btn00").on("click",function () {
        window.location.href='../gdpindex';
        Btn00();
    })

    $("#Navigation_Btn01").on("click",function(){
        window.location.href='gdpindex_caiGou_Select';
        Btn01();
    });

    $("#Navigation_Btn02").on("click",function(){
        window.location.href='../Bidwin/gdpindex_winCom';
        Btn02();
    });

    $("#Navigation_Btn03").on("click",function(){
        window.location.href='../Bidwin/gdpindex_winCom_Pie';
        Btn03();
    });

    $("#Navigation_Btn04").on("click",function(){
        window.location.href='../Bidwin/gdpindex_winCom_Select';
        Btn04();
    });

});



