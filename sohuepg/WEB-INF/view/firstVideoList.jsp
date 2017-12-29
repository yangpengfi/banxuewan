<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession s = request.getSession();
String lastFocusIndex = request.getParameter("lastFocusIndex");
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
		<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/firstVideoList.css" />
		<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/util.css" />
	</head>
<body onload="onloadFirstVideoList()">
<div class="firstVideoList<c:if test="${categoryId!=125}">1</c:if>">
	<div id="firstVideoListLitle">
		<span class="firstVideoList-title1">${title}</span>
		 <span class="firstVideoList-title3">共<font id="firstVideoListTotal">${total}</font>个推荐</span>
	 </div>
	 <div id="firstVideoListHeader" class="firstVideoList-header">
	</div> 
	
  	<img id="firstVideoListBorder" src='<%=path %>/public/images/secondVideoList/border.png' 
  		class="firstVideoList-border" style="top:95px;left:71px;">
	
	<div id="firstVideoListLeft" class="firstVideoList-left">
		<c:forEach var="video" items="${data}" varStatus="status">
			<div class="firstVideoList-video">
				<img src="${imgUrl}${video.albumSmallVerpic}" class="firstVideoList-poster" id="firstVideoListPoster${status.index}">
				<%--  <c:if test="${not empty video.mark }">
				<img src="${imgUrl}${video.mark}" class="firstVideoList-mark"
					style="top:${status.index>5?290:0}px;left:${(status.index>5?status.index-6:status.index)*191}px;">
				 </c:if> --%>
				<input type="hidden" value="${video.templateModel}">
				<input type="hidden" value="${video.ID}">
				<input type="hidden" value="${video.guid}">
				<div class="firstVideoList-video-title">${video.title}</div>
			</div>
		</c:forEach>
	</div>
	
	<div id="firstVideoListUpPage" 
	style="display:<c:if test="${curPage==1}">none;</c:if>"   
	class="firstVideoList-turn-left">&nbsp;</div>
	
	<div id="firstVideoListDownPage" 
	style="display:<c:if test="${curPage==page}">none;</c:if>" 
	class="firstVideoList-turn-right">&nbsp;</div>
	
	<div id="firstVideoListPage" class="firstVideoList-page" >
		<span class="firstVideoList-pages" id="firstVideoListCurPage">${curPage}</span>
		<span class="firstVideoList-pages" >/</span>
		<span class="firstVideoList-pages" id="firstVideoListTotalPage">${page}</span>
	</div>
	<input  type="hidden" id="imgUrl" value="${imgUrl}" />
	<input  type="hidden" id="categoryId" value="${categoryId}" />
	<input type="hidden" id="path" value="<%=basePath%>">
	<input type="hidden" id="loadType" value="<%=loadType%>">
	<input type="hidden" value="<%=lastFocusIndex%>" id="lastFocusIndex">
	<input type="hidden" value="<%=basePath%>" id="path">
	<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
	<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
	<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
	<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
	<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</div>
</body>
<script src="<%=path%>/public/js/firstVideoList.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
</html>