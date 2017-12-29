<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
HttpSession s = request.getSession();
String operate = request.getParameter("operate");
String selectedIds = request.getParameter("selectedIds");
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
<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/util.css">
<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/history.css">
</head>
<body onload="onloadHistory()">
<div class="history" >

<c:choose>
	<c:when test="${type=='history'}">
	   	<span class="history-total">共<span id="historyTotal">${total==null?0:total}</span>个历史记录</span> 
	</c:when>
	<c:otherwise>
	  	<span class="history-total">共<span id="historyTotal">${total==null?0:total}</span>个收藏记录</span>
	</c:otherwise>
</c:choose>


<div id="historyHeader" class="history-header">
	<div class="history-title" >
		<div>观看历史</div>
		<img src="<%=path %>/public/images/secondVideoList/titleBg.jpg" style="display:none" class="history-title-his">
		<input type="hidden" value="history">
	</div>
	<div class="history-title" style="margin-left:20px;">
		<div>我的收藏</div>
		<img src="<%=path %>/public/images/secondVideoList/titleBg.jpg" style="display:none" class="history-title-col">
		<input type="hidden" value="collection">
	</div>
	<div class="history-but" style="left:900px;" id="historyDel">
		删除
		<input type="hidden" value="del">
	</div>
	<div class="history-but" style="left:1060px;" id="historyDelAll">
		全部删除
		<input type="hidden" value="delAll">
	</div>
</div>
<img id="historyBorder" style="left:71px;top:104px;" src='<%=path %>/public/images/secondVideoList/border.png' 
		class="history-border">
		
<div id="historyUpPage" class="history-turn-left" style="display:<c:if test="${curPage==1||curPage==null}">none;</c:if>" ></div>
<div id="historyDownPage" style="display:<c:if test="${curPage==page}">none;</c:if>" class="history-turn-right"></div>

<div id="historyPage" class="history-page" >
	<span class="history-pages" id="historyCurPage">${curPage==null?1:curPage}</span>
	<span class="history-pages" >/</span>
	<span class="history-pages" id="historyTotalPage">${page==null?1:page}</span>
</div>
<!-- <div id="line-top"></div>
 -->
 <div id="historyTop" class="history-top">
	<c:forEach var="his" items="${playRecordList}" varStatus="status" end="5">
		<div class="history-video">
			<img src="${imgUrl}${his.posterPath}" class="history-poster" id="historyPoster${status.index}">
			<input type="hidden" value="${his.templateModel}">
			<c:choose>
				<c:when test="${type=='history'}">
				    <c:if test="${his.type=='svod'}">
				       <input type="hidden" value="${his.parentID}">
				    </c:if>
				    <c:if test="${his.type=='vod'}">
				        <input type="hidden" value="${his.videoID}">
				    </c:if>
				</c:when>
				<c:otherwise>
				  <input type="hidden" value="${his.favoritesID}">
				</c:otherwise>
			</c:choose>
			<input type="hidden" value="${his.type}">
            <input type="hidden" value="${his.ID}">
		 	<div class="none history-deletePic" 
		 		style="left:${20+(189*(status.index>5?(status.index-6):status.index))}px;
		 		top:${60+(295*(status.index>5?1:0))}px">;
			</div>
		 	<div class="none history-cover" 
		 		style="left:${(189*(status.index>5?(status.index-6):status.index))}px;
		 		top:${(284*(status.index>5?1:0))}px">
			</div>
			<div class="history-video-title">${his.title}</div>
		</div>
	</c:forEach>
</div>
<span class="history-bottom-title">更多精彩</span>
<img id="historyBottomBorder" style="left:71px;top:454px;position: absolute;display:none" 
	src='<%=path %>/public/images/history/border1.png'>
<div class="history-bottom" id="historyBottom">
	<c:forEach var="rList" items="${recomandList}" varStatus="status" end="5">
		<div class='history-bottom-div' style="left:${284*status.index}px;">
			<input type='hidden' value='${rList.templateModel}'>
			<input type='hidden' value='${rList.ID}'>
			<input type="hidden"  value="${rList.albumSmallVerpic}">
			<img class='history-bottom-poster' src="${imgUrl}${rList.poster}"/>
			<c:if test="${not empty rList.mark }">
				<img class='history-bottom-mark' style="left:${24+284*status.index}px;"  src="${imgUrl}${rList.mark}"/>
		    </c:if>
			<div class="none history-bottom-span">${rList.title}</div>
		</div>
	</c:forEach>
</div>

<div id="historyConformBox" class="history-conform-box" style="display:none">
	<div class="h-box-content">
		<div class ="h-box-text">删除所有选中历史记录？</div>
		<div class="h-box-left">确认</div>
		<div class="h-box-right">取消</div>
	</div>
</div>
<input type="hidden" value="${type}" id="type">
<input type="hidden" value="<%=selectedIds%>" id="selectedIds">
<input type="hidden" value="<%=operate%>" id="operate">
<input type="hidden" value="${token}" id="token">
<input type="hidden" value="${imgUrl}" id="imgUrl">
<input type="hidden" value="<%=basePath%>" id="path">
<input type="hidden" value="<%=lastFocusIndex%>" id="lastFocusIndex">
<input type="hidden" value="<%=loadType%>" id="loadType">
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</div>
</body>
<script src="<%=path%>/public/js/history.js"></script>
<script src="<%=path%>/public/js/ajax.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
</html>
