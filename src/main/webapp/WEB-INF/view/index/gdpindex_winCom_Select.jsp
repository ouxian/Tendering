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
    <title>时空数据共享发布平台</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/header_winCom_Select.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/holecontent.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/provincial/modal-content.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap-table.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap-select.min.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/timeline.css"/>

    <%--    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/guangdong.css"/>--%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/jquery/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/min_winCom.js"></script>
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

    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/cssChange.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/GDPCala.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/pageEvent_winbid.js"></script>
    <script src="${pageContext.request.contextPath}/resource/js/facility.js" type="text/javascript"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/ajaxdata.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/drawingColor.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/loadmap.js"></script>

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
                <div class="cd-horizontal-timeline">
                    <div class="timeline">
                        <div class = "play"></div>
                        <div class="events-wrapper">
                            <div class="events">
                                <ol>
                                    <li><a href="#0" data-date="01/01/2018"class="selected">2018</a></li>
                                    <li><a href="#0" data-date="01/01/2017">2017</a></li>
                                    <li><a href="#0" data-date="01/01/2016">2016</a></li>
                                    <li><a href="#0" data-date="01/01/2015">2015</a></li>
                                    <li><a href="#0" data-date="01/01/2014">2014</a></li>
                                    <li><a href="#0" data-date="01/01/2013">2013</a></li>
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


        <div class="right-content">
            <select id="selectID" class="selectpicker" data-live-search="true" data-max-option="1" data-style="btn-info">
                <optgroup label="省内相关规划设计机构">
                    <option value="1">请选择</option>
                    <option value="2">广东省城乡规划设计研究院</option>
                    <option value="3">广东省建筑设计研究院</option>
                    <option value="4">广东省建筑科学研究院集团股份有限公司</option>
                    <option value="5">广州市城市规划勘测设计研究院</option>
                    <option value="6">深圳市城市规划设计研究院有限公司</option>
                    <option value="7">深圳市规划国土发展研究中心</option>
                    <option value="8">中国城市规划设计研究院深圳分院</option>
                    <option value="9">深圳市蕾奥规划设计咨询股份有限公司</option>
                    <option value="10">深圳市新城市规划建筑设计有限公司</option>
                    <option value="11">深圳市城市空间规划建筑设计有限公司</option>
                    <option value="12">广州市科城规划勘测技术有限公司</option>
                    <option value="13">华南理工大学建筑设计研究院</option>
                    <option value="14">广州市天作建筑规划设计有限公司</option>
                    <option value="15">广州市交通规划研究院</option>
                    <option value="16">广州中大城乡规划设计研究院有限公司</option>
                    <option value="17">广州市城市规划设计所</option>
                    <option value="18">珠海市规划设计研究院</option>
                    <option value="19">佛山市城市规划勘测设计研究院</option>
                    <option value="20">中山市规划设计院</option>
                    <option value="21">东莞市城建规划设计院</option>
                    <option value="22">湛江市规划勘测设计院</option>
                </optgroup>
                <optgroup label="省外相关规划设计机构">
                    <option value="1">中国城市规划设计研究院</option>
                    <option value="2">上海同济城市规划设计研究院</option>
                    <option value="3">同济大学</option>
                    <option value="4">上海市政工程设计研究总院（集团）有限公司</option>
                    <option value="5">江苏省城市规划设计研究院</option>
                    <option value="6">南京东南大学城市规划设计研究院有限公司</option>
                    <option value="7">南京大学城市规划设计研究院有限公司</option>
                    <option value="8">浙江省城乡规划设计研究院</option>
                    <option value="9">湖南省城市规划研究设计院</option>
                </optgroup>
            </select>
        </div>

</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/provincial/gdpindex/gdp_winCom_Select.js"></script>
</body>
</html>
