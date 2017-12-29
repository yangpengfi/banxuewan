<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>详情页</title>
</head>

<script type="text/javascript">
function init() { 
	window.location.href= "<%=basePath%>/doDetail?${args}";
}
</script>
<body onload="init();">
	
</body>

</html>
