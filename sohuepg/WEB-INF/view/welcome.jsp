<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="page-view-size" content="1280*720">
	<title>welcome</title>
	<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/home.css" />
</head>

<script type="text/javascript">

	function dowelcome() { 
		var url = "doWelcome?${args}";
		/*
		url += "&client=" + CAManager.cardSerialNumber;
		url += "&account=" + GlobalVarManager.getItemStr('account');
		url += "&cmsIp=" + GlobalVarManager.getItemStr("ip");
		url += "&cmsPort=" + GlobalVarManager.getItemStr("port");
		//url += "&areaCode=" + VOD.areaCode;
		var area_code = VOD.areaCode;
		if(area_code == ""){
			area_code = VOD.server.regionId;
		}
		if(area_code == ""){
			area_code = VOD.server.nodeGroupID;
		}
		url += "&areaCode=" + area_code;
		*/
		window.location.href= url;
	}	
</script>
<body onload="dowelcome();">
	<div class="home" style="background-image:url('<%=path%>/public/images/free.jpg');" ></div> 
</body>
 
</html>
