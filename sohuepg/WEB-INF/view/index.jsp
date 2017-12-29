<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	HttpSession s = request.getSession();
%>
<!DOCTYPE html>
<html>
<head>
<meta name="page-view-size" content="1280*720">
<meta charset="utf-8">
<title>index</title>
<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/home.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/classify.css"/>
</head>
<body onload="autoLoad();">
	<div class="body" id='body'></div>
	<input type="hidden" value="<%=path%>/" id="path">
	<input type="hidden" value="<%=path%>/" id="basePath">
</body>
<script src="<%=path%>/public/js/epg.js"></script>
</html>