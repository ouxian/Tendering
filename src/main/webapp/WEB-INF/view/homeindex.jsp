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
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/header.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/content.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/bootstrap.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/provincial/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resource/css/style.css"/>

    <%--    <link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/guangdong.css"/>--%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/lib/jquery/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resource/js/homepage/iframe_init.js"></script>
</head>
<body>
<div class="container-header">
    <div class="log">
    </div>
    <div id="Navigation" class="btn-group">
        <button id="Navigation_Btn00" type="button" class="btn btn-default">主页</button>
        <button id="Navigation_Btn01" type="button" class="btn btn-default">省域</button>
        <button id="Navigation_Btn02" type="button" class="btn btn-default">湾区</button>
        <button id="Navigation_Btn03" type="button" class="btn btn-default">城市</button>
    </div>
    <div class="header">
    </div>
</div>

<div class="container-contents">
    <div class="left-content">
            <iframe class="page-content-frame" id="page-content-frame" scrolling="no"  style="border: 0;  width: 100%; height: 100%;
                    display: block;"></iframe>
        </div>
</div>
</body>
</html>
