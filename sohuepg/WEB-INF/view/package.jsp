<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession s = request.getSession();
String loadType = request.getParameter("lt");
String urlMemory = request.getParameter("um");
String modelMemory = request.getParameter("mm");
String typeMemory = request.getParameter("tm");
String focusElementMemory = request.getParameter("fem");
String focusElementIndexMemory = request.getParameter("feim");
%>
<!DOCTYPE html>
<html>
<head>
<meta name="page-view-size" content="1280*720">
<meta charset="utf-8">
<title>classify</title>
<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/order.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/util.css" />
</head>
<style>
</style>
<body onload="onloadOrder()">
<div class="order">
 	<span class="order-heard-title">订购中心</span> 
	<div class="order-top"  id="orderTop">
		<c:forEach var="item" items="${packages}" varStatus="status" end='3' >
			<div class='order-list' style="left:${284*status.index}px;background-image: url(<%=path %>/public/images/package/bg_blur.png);">
				<img src="<%=path %>/public/images/package/mark.png" class="order-mark${status.index}">
				<input type='hidden' value='${item.id}'>
				<input type='hidden' value='${item.name}'>
				<input type='hidden' value='${item.feeId}'>
				<input type='hidden' value='${item.price}'>
				<input type='hidden' value='${item.check}'>
				<input type='hidden' value='${item.bindProductID}'>
				<div class='order-list-span list-span'> 
					<div class="order-type">${item.type}</div>
					<br>
					<div class="span-price">${item.price}元</div>
				</div>
				<div class="order-title2">立即订购</div>
			</div>
		</c:forEach>
	</div>
 	<span class="order-bottom-title">更多精彩</span>
 	
 	<img src="<%=path %>/public/images/order/border.png"  id="orderBorder"
 	 style="position: absolute;top:454px;left: 75px;display:none">
 	
 	<div class="order-bottom" id="orderBottom">
		<c:forEach var="rList" items="${recomandList}" varStatus="status" end="5">
			<div class='order-bottom-div' style="position: absolute;left:${284*status.index}px;">
				<input type='hidden' value='${rList.templateModel}'>
				<input type='hidden' value='${rList.ID}'>
				<input type="hidden"  value="${rList.albumVerpic}">
				<img class='order-bottom-poster' src="${imgUrl}${rList.poster}"/>
				<c:if test="${not empty rList.mark}">
					<img id='mainMark-${status.index}' style="left:${24+284*status.index}px;"
					 class='mark order-bottom-mark' src="${imgUrl}${rList.mark}"/>
			    </c:if>
				<div class="none order-bottom-span">${rList.title}</div>
			</div>
		</c:forEach>
	</div>
 
	<div id="orderAlert" style="display:none;" class='conform'>
		<div class='conformbg' >
			<div style="position: absolute;text-align: center;font-size: 60px;color: white;font-weight: bold;width: 100%;top:200px">确定要开通吗？</div>
		</div>
		<div id="orderBt">
			<div id="orderBt0" class='bt bt-bg'>确认开通</div>
			<div id="orderBt1" class="bt bt-bg" style='left:665px'>以后再说</div>
		</div>
	</div>
	<div id="orderInfo" class='conform' style="display:none;">
		<div class='conformbg'>
			<div style="position: absolute;font-size: 48px;text-align:center;color: white;font-weight: bold;width: 66%;height:80px;left:17%;top:125px;">
				温馨提示
			</div>
			<div id='order_info_text' style="position: absolute;font-size: 38px;text-align:justify;color: white;font-weight: bold;width: 66%;height:225px;left:17%;top:208px;">
				尊敬的客户：您好，下单成功正在为您传送...
			</div>
		</div>
	</div>
</div>
</body>
<input type="hidden" value="${cId}" id="cId">
<input type="hidden" value="${cType}" id="cType">
<input type="hidden" value="<%=basePath%>" id="path">
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=loadType%>" id="loadType">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
<script src="<%=path%>/public/js/ajax.js"></script>
<script src="<%=path%>/public/js/order.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
</html>