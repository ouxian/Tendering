jQuery(document).ready(function(){
    var url = window.location.href;
    var index = url.lastIndexOf("\=");
    url =url.substring(index+1,url.length);
    if(url === "01"){
        Btn01();
    }
    if(url === "02"){
        Btn02();
    }
    if(url === "03"){
        Btn03();
    }

    $("#Navigation_Btn01").on("click",function(){
        Btn01();
    });

        $("#Navigation_Btn02").on("click",function(){
        Btn02();
    });

    $("#Navigation_Btn03").on("click",function(){
        Btn03();
    });

    $("#Navigation_Btn00").on("click",function () {
        window.location.href="../homepage";
    })

});

function Btn01() {
    window.frames[frames.length-1].location.href='gdpindex';
    $("#Navigation_Btn01").css('border','1px solid #4373a1');
    $("#Navigation_Btn01").css('background-color','#10055a');
    $("#Navigation_Btn02").css('border','0px');
    $("#Navigation_Btn02").css('background-color','#2f345a');
    $("#Navigation_Btn03").css('border','0px');
    $("#Navigation_Btn03").css('background-color','#2f345a');
}

function Btn02() {
    window.frames[frames.length-1].location.href='bayareahomepage';
    $("#Navigation_Btn02").css('border','1px solid #4373a1');
    $("#Navigation_Btn02").css('background-color','#10055a');
    $("#Navigation_Btn01").css('border','0px');
    $("#Navigation_Btn01").css('background-color','#2f345a');
    $("#Navigation_Btn03").css('border','0px');
    $("#Navigation_Btn03").css('background-color','#2f345a');
}

function Btn03() {
    window.frames[frames.length-1].location.href='citydomain';
    $("#Navigation_Btn03").css('border','1px solid #4373a1');
    $("#Navigation_Btn03").css('background-color','#10055a');
    $("#Navigation_Btn01").css('border','0px');
    $("#Navigation_Btn01").css('background-color','#2f345a');
    $("#Navigation_Btn02").css('border','0px');
    $("#Navigation_Btn02").css('background-color','#2f345a');
}
