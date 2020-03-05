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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/header_caiGuo_Select.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/holecontent.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/provincial/modal-content.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap-table.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap-select.min.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/style.css"/>

    <%--    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/guangdong.css"/>--%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/jquery/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/bootstrap-select.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/boot/bootstrap.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/tableHandle.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/boot/bootstrap-table.js"></script>

    <script src="${pageContext.request.contextPath}/resource/lib/d3.v3.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resource/lib/jquery/jquery.mobile.custom.min.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resource/lib/jquery/modernizr.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css"
          href="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/dijit/themes/tundra/tundra.css" />
    <link rel="stylesheet" type="text/css"
          href="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/esri/css/esri.css" />
    <script type="text/javascript" src="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/init.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/loadmap.js"></script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/cssChange.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/GDPCala.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/pageEvent_caigou.js"></script>
    <script src="${pageContext.request.contextPath}/resource/js/facility.js" type="text/javascript"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/ajaxdata.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/drawingColor.js"></script>


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

    <div id="proMap">

    </div>
        <div class="right-content">
            <select id="selectID" class="selectpicker" data-live-search="true" data-max-option="1" data-style="btn-info">
                <option value="1">请选择</option>
                <option value="2">专项规划</option>
                <option value="3">城镇体系规划</option>
                <option value="4">总体规划</option>
                <option value="5">控制性详细规划</option>
                <option value="6">修建性详细规划</option>
                <option value="7">近期建设规划</option>
                <option value="8">区域规划</option>
                <option value="9">战略规划</option>
                <option value="10">概念规划</option>
                <option value="11">三规合一</option>
                <option value="12">多规合一</option>
                <option value="13">多规融合</option>
                <option value="14">“三旧”改造规划</option>
                <option value="15">发展规划</option>
                <option value="16">历史文化保护规划</option>
                <option value="17">城市设计</option>
                <option value="18">专题研究</option>
                <option value="19">村庄规划</option>
                <option value="20">“绿道”规划</option>
                <option value="21">景观</option>
                <option value="22">选址评估</option>
                <option value="23">市政工程规划</option>
                <option value="24">市政工程设计</option>
                <option value="25">道路工程设计</option>
                <option value="26">建筑设计</option>
            </select>
        </div>

</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/gdp_caiGou_Select.js"></script>
</body>
</html>
