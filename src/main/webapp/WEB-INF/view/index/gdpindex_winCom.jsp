<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/7/11
  Time: 9:26
  To change this template use File | Settings | File Templates.
--%>

<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" isELIgnored="false"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>采购与中标查询系统</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/header_winCom.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/content.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/provincial/modal-content.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap-table.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap-select.min.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/style.css"/>

    <%--    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/guangdong.css"/>--%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/jquery/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="http://echarts.baidu.com/gallery/vendors/echarts/echarts.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/min_itemType.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/boot/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/tableHandle.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/boot/bootstrap-table.js"></script>

    <script src="${pageContext.request.contextPath}/resource/lib/d3.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resource/lib/jquery/jquery.mobile.custom.min.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resource/lib/jquery/modernizr.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css"
          href="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/dijit/themes/tundra/tundra.css" />
    <link rel="stylesheet" type="text/css"
          href="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/esri/css/esri.css" />
    <script type="text/javascript" src="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/init.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/gdp_winCom.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/cssChange.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/Echarts-donging.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/GDPCala.js"></script>
    <script src="${pageContext.request.contextPath}/resource/js/facility.js" type="text/javascript"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/pageEvent_winbid.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/ajaxdata.js"></script>

</head>
<body>
<div class="container-header">


    <div id="Navigation" class="btn-group">
        <button id="Navigation_Btn00" type="button" class="btn btn-default">地级市采购总金额分布图</button>
        <button id="Navigation_Btn01" type="button" class="btn btn-default">不同类型采购金额分布图</button>
        <button id="Navigation_Btn02" type="button" class="btn btn-default">中标总金额分布图(直方图)</button>
        <button id="Navigation_Btn03" type="button" class="btn btn-default">中标总金额分布图(饼图)</button>
        <button id="Navigation_Btn04" type="button" class="btn btn-default">设计机构下拉分布图</button>
    </div>

    <div class="header">
    </div>

</div>

<div class="container-content">
    <div class="left">
        <div class="left-content">

            <div id="proMap">
                <div class="cd-horizontal-timeline">
                    <div class="timeline">
                        <div class = "play"></div>
                        <div class="events-wrapper">
                            <div class="events">
                                <ol>
                                    <li><a href="#0" data-date="01/01/2013"class="selected">2013</a></li>
                                    <li><a href="#0" data-date="01/01/2014">2014</a></li>
                                    <li><a href="#0" data-date="01/01/2015">2015</a></li>
                                    <li><a href="#0" data-date="01/01/2016">2016</a></li>
                                    <li><a href="#0" data-date="01/01/2017">2017</a></li>
                                </ol>

                                <span class="filling-line" aria-hidden="true"></span>
                            </div> <!-- .events -->
                        </div> <!-- .events-wrapper -->

                        <ul class="cd-timeline-navigation">
                            <li><a href="#0" class="prev inactive">Prev</a></li>
                            <li><a href="#0" class="next">Next</a></li>
                        </ul> <!-- .cd-timeline-navigation -->
                    </div> <!-- .timeline -->
                </div>
            </div>

        </div>
    </div>

    <div class="right">
        <div class="right-top" id = "graph1">

        </div>


    </div>
</div>


</body>
</html>
