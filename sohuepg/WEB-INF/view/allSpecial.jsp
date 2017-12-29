<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
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
    <title>全部专题</title>
    <link rel="stylesheet" type="text/css" href="<%=path%>/public/css/special_all.css">
    <link rel="stylesheet" type="text/css" href="<%=path%>/public/css/util.css">
  </head>
<body onload="onloadAllSepcial()">
    <div class="allSpecial">
    	<div class="allSpecial-header">
    		<div>全部专题&nbsp;共<span id="allSpecialTotal">${total}</span>个</div>
    	</div>
   		<img id="allSpecialBorder" style="left:60px;top:108px;display:none" src='<%=path %>/public/images/special_all/content_bg_actived.png' 
  		class="allSpecial-border">
	
    	<div id="allSpecialTop" class="allSpecial-top">
    		<c:forEach var="special" items="${allSpecial}" varStatus="status" end="5">
    		 	<c:if test="${status.index < 3}">
    		 		<div class="allSpecial-video" style="left:${status.index*390}px;">
						<img class="allSpecial-poster" src="${imgUrl}${special.poster }"/>
						<input type="hidden" value="special">
						<input type="hidden" value="${ special.ID}">
						<input type="hidden" value="${ special.albumVerpic}">
						<div class="allSpecial-video-title">${special.title }</div>
					</div>
    		 	</c:if>
	    		<c:if test="${status.index > 2}">
					<div class="allSpecial-video" style="left:${(status.index-3)*390}px;top:285px">
						<img class="allSpecial-poster" src="${imgUrl}${special.poster }"/>
						<input type="hidden" value="special">
						<input type="hidden" value="${ special.ID}">
						<input type="hidden" value="${ special.albumVerpic}">
						<div class="allSpecial-video-title">${special.title }</div>
					</div>
				</c:if>
			</c:forEach>
    	</div>
    	
    	<div id="allSpecialUpPage" style="display:<c:if test="${curPage==1}">none;</c:if>" class="allSpecial-turn-left">&nbsp;</div>
    	<div id="allSpecialDownPage" style="display:<c:if test="${curPage==page}">none;</c:if>"  class="allSpecial-turn-right" >&nbsp;</div>
    	
   		<div id="allSpecialPage" class="allSpecial-page">
			<span class="allSpecial-pages" id="allSpecialCurPage">${curPage}</span>
			<span class="allSpecial-pages">/</span>
			<span class="allSpecial-pages" id="allSpecialTotalPage">${page}</span>
		</div>
    	<div class="footer"></div>
    	<input type="hidden" value="${imgUrl}" id="imgUrl">
    	<input type="hidden" id="url" value="${url}"/>
		<input type="hidden" id="specialBg" value="${specialBg}"/>
		<input type="hidden" id="path" value="<%=basePath%>"/>
		<input type="hidden" value="<%=lastFocusIndex%>" id="lastFocusIndex">
		<input type="hidden" value="<%=loadType%>" id="loadType">
		<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
		<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
		<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
		<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
		<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
    </div>
</body>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/allSpecial.js"></script>
</html>