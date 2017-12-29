<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession s = request.getSession();
String actorId = request.getParameter("actorId");
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
<style type="text/css">
</style>
<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/circle.css">
<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/util.css">
</head>
<body onload="onloadCircle()">
<div class="circle">
<div id="circleHeader" class="circle-header">
	<div class="circle-order">
		<img id="order1" class="circle-order-img-on" src="<%=path%>/public/images/circle/order.png" >
		<img  id="order2" class="circle-order-img" src="<%=path%>/public/images/circle/orderFocus.png">
		<span class="circle-order-title" >订购</span>
		<input type="hidden" value="order">
	</div>
</div>
<div id="circleTopTurn">
	<img class="circle-top-turn-left" src="<%=path%>/public/images/circle/topTurnLeft.png" id="circleTopTurnLeft">
	<img class="circle-top-turn-right" src="<%=path%>/public/images/circle/topTurnRight.png" id="circleTopTurnLeft">
</div>	
<div id="circleBottomTurn">
	<img class="circle-bottom-turn-left" src="<%=path%>/public/images/circle/bottomTurnLeft.png" id="circleBottomTurnLeft">
	<img class="circle-bottom-turn-right" src="<%=path%>/public/images/circle/bottomTurnRight.png" id="circleBottomTurnRight">
</div>	
<div id="circleTop" class="circle-top">	

	<img src="<%=path%>/public/images/circle/nameBgFocus.png" class="circle-name-bg2" id="circleNameBgFocus">
	<c:forEach var="star" items="${circleStar}" varStatus="status" end="4">
		<div>
			<input type="hidden" value="${circleStar[status.index].id}" id="circleStarId${status.index}">
			<img src="${basePostPath}${circleStar[status.index].icon}" class="circle-starList${status.index}" id="star${status.index}">
			<img src="<%=path%>/public/images/circle/nameBg.png" 
			<c:if test="${status.index==2}">style="display:none"</c:if>
			 class="circle-name-bg${status.index}" id="circleNameBg${status.index}">
			<div class="circle-star-name circle-name-bg${status.index}" id="circleStarName${status.index}">
				${circleStar[status.index].name}
			</div>
		</div>
	</c:forEach>
</div>
<img id="circleBorder"  src='<%=path %>/public/images/secondVideoList/border.png' 
	class="circle-border0 circle-border">
	
<div id="starPosters">
	<c:forEach var="star" items="${circleStar}" varStatus="status" end="7">
		<input id="starPoster${status.index}" type="hidden" value="${basePostPath}${circleStar[status.index].icon}">
	</c:forEach>
</div>
<div id="starNames">
	<c:forEach var="star" items="${circleStar}" varStatus="status" end="7">
		<input id="starName${status.index}" type="hidden" value="${circleStar[status.index].name}">
	</c:forEach>
</div>
<div id="starIds">
	<c:forEach var="star" items="${circleStar}" varStatus="status" end="7">
		<input id="starId${status.index}" type="hidden" value="${circleStar[status.index].id}">
	</c:forEach>
</div>
<input type="hidden" value="${circleStar.size()}" id="totalStar">

<div id="circleBottom" class="circle-bottom">
	<c:forEach var="video" items="${videoList}" varStatus="status">
		<div class="circle-video">
			<input type="hidden"   value="${video.templateModel}"/>
			<input type="hidden"   value="${video.id }"/>
			<input type="hidden"   value="${video.type }"/>
			<img src="${imgUrl}${video.albumVerpic}"  class="circle-poster">
	   	  	<c:if test="${not empty video.mark }">
		   		<img src="${imgUrl}${video.mark}" class="circle-mark circle-mark${status.index}">
		   	</c:if>
		</div>
	</c:forEach>
</div>
<input type="hidden" value="${pages}" id="circleTotalPage">
<input type="hidden" value="${curPage}" id="circleCurPage">
<input type="hidden" value="${total}" id="circleTotal">
<input type="hidden" value="<%=basePath%>" id="path">
<input type="hidden" value="${imgUrl}" id="imgUrl">
<input type="hidden" value="<%=path%>/public/images/circle/nameBg" id="circleNameBg">
<input type="hidden" value="<%=path%>/public/images/circle/nameBgFocus" id="circleNameBgFocus">
<input type="hidden" value="<%=actorId%>" id="actorId">
<input type="hidden" value="<%=loadType%>" id="loadType">
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</div>
</body>
<script src="<%=path%>/public/js/ajax.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/circle.js"></script>
</html>
