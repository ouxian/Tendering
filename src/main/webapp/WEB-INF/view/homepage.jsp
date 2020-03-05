
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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>时空数据共享发布平台</title>

    <script src="${pageContext.request.contextPath}/resource/lib/d3.js" type="text/javascript"></script>
    <script src="${pageContext.request.contextPath}/resource/lib/jquery/jquery-3.3.1.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css"
          href="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/dijit/themes/tundra/tundra.css" />
    <link rel="stylesheet" type="text/css"
          href="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/esri/css/esri.css" />
    <script type="text/javascript" src="http://192.168.2.33:8080/tendering/resource/lib/arcgis/library/3.24/3.24/init.js"></script>
    <script src = "${pageContext.request.contextPath}/resource/js/homepage/homepage.js" type="text/javascript"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/homepage/homepageevent.js"></script>
    <script src="${pageContext.request.contextPath}/resource/js/facility.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href = "${pageContext.request.contextPath}/resource/css/homepage/homepage.css" />

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/homepage/sidenavigation.css">

</head>
<body>
<div class="logo"></div>
<div id = "contain">
    <div  id="title"></div>
    <div id = "title-text"></div>

</div>

<div id = "buttons">
    <button id = "flights" type="button" class="btn btn-default">航班</button>
    <button id = "trans" type="button" class="btn btn-default">铁路</button>
</div>
<div id="mapDiv" class ="map"></div>
<div id="Navigation" class="btn-group">
    <button id="Navigation_Btn01" type="button" class="btn btn-default">省域</button>
    <button id="Navigation_Btn02" type="button" class="btn btn-default">湾区</button>
    <button id="Navigation_Btn03" type="button" class="btn btn-default">城市</button>
</div>
<div id ="legend"></div>
<div id = "info"></div>
<div id = "botton"></div>


</body>
</html>