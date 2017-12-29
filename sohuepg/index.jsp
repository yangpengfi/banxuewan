<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	HttpSession s = request.getSession();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>index</title>
</head>
<body onload="onLoad();">
	<div class="body"></div>
	<input type="hidden" value="<%=path%>/" id="path">
	<input type="hidden" value="<%=path%>/" id="basePath">
</body>
<script type="text/javascript">
	function onLoad() {
		//模拟机顶盒请求
		window.location.href = "http://10.215.0.220:8080/sohuepg/index";
		//window.location.href = "http://10.10.121.135:9080/index";
		//window.location.href = "http://localhost:8080/sohuepg/index";
	}
</script>
</html>