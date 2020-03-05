<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
		//跳转到主页面

            //response.sendRedirect("map.jsp");
		<jsp:forward page = "/WEB-INF/view/index/gdpindex.jsp" />

        <%--<jsp:forward page = "/WEB-INF/view/index/gdpindex_caiGou_Select.jsp" />--%>

		<%--<jsp:forward page = "/WEB-INF/view/index/gdpindex_winCom.jsp" />--%>

        <%--<jsp:forward page = "/WEB-INF/view/index/gdpindex_winCom_Pie.jsp" />--%>

        <%--<jsp:forward page = "/WEB-INF/view/index/gdpindex_winCom_Hist.jsp" />--%>

        <%--<jsp:forward page = "/WEB-INF/view/index/gdpindex_winCom_Select.jsp" />--%>


</body>
</html>