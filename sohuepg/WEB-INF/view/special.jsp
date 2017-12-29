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
<head>
<meta name="page-view-size" content="1280*720">
<link rel="stylesheet" type="text/css"	href="<%=path %>/public/css/specialDetail.css">
<link rel="stylesheet" type="text/css"	href="<%=path %>/public/css/util.css">
</head>
<body onload="onloadSpecialDetail()">
<div class="special" style="background-image:url('${imgUrl}${specialBg}');">
	<img id="specialBorder" style="left:44px;top:344px;display:none" src='<%=path %>/public/images/special/border.png' 
  		class="special-border">
	<div id="specialTop" class="special-top">
		<c:forEach var="special" items="${specialList}" varStatus="status" end="5">
			<div class="special-video" style="left:${status.index*193}px;">
				<img class="special-poster" src="${imgUrl}${special.albumVerpic }"/>
				<c:if test="${not empty special.markImg }">
					<img src="${imgUrl}${special.markImg}" class="special-mark" style="left:${status.index*193}px;"> 
				</c:if>
				<input type="hidden" value="${special.templateModel }">
				<input type="hidden" value="${ special.contentID}">
				<input type="hidden" value="${special.type }">
				<div class="special-video-title">${special.title }</div>
			</div>
		</c:forEach>
		<c:if test="${(curPage-1)*6+specialList.size()==total && specialList.size() !=6 }">
			<div class="special-video" style="left:${specialList.size()*193}px;">
				<input type="hidden"  value="all">
				<input type="hidden"  value="0">
				<img class="special-poster" src="<%=path%>/public/images/special/more.jpg" >
				<div class="special-video-title">更多专题</div>
			</div>
		</c:if>
		<c:if test="${total%6 == 0 && curPage == page+1}">
			<div class="special-video" style="left:${specialList.size()*193}px;">
				<input type="hidden"  value="all">
				<input type="hidden"  value="0">
				<img class="special-poster" src="<%=path%>/public/images/special/more.jpg" >
				<div class="special-video-title">更多专题</div>
			</div>
		</c:if>
	</div>
</div>
<input type="hidden" id="specialTotal" value="${total}" >
<input type="hidden" id="specialTotalPage" value="${page}">
<input type="hidden" id="specialCurPage" value="${curPage }" >
<input type="hidden" id="specialId" value="${specialId}">
<input type="hidden" id="imgUrl" value="${imgUrl}">
<input type="hidden" id="url" value="${url}"/>
<input type="hidden" id="specialBg" value="${specialBg}"/>
<input type="hidden" id="path" value="<%=basePath%>"/>
<input type="hidden" value="<%=loadType%>" id="loadType">
<input type="hidden" value="<%=lastFocusIndex%>" id="lastFocusIndex">
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</body>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/special.js"></script>