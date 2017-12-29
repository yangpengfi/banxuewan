<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
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
<style type="text/css">
</style>
<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/movieDetail.css">
<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/util.css">
</head>
<body onload="onloadMovieDetail()">
<div class="movieDetail" style="background-image:url('${imgUrl}${bg}');">
<span class="movieDetail-title">${vodDetail.title}</span>
<div id="movieDetailHeader" class="movieDetail-header">
</div>
		
<img class="movieDetail-poster" src="${imgUrl}${vodDetail.albumVerpic}" />
<div class="movieDetail-profile">
	<span class="movieDetail-info">
		主演：
		<c:choose>
		    <c:when test="${vodDetail.actor == ''}">
	                        暂无
			</c:when>
		    <c:otherwise>
                 ${fn:substring(vodDetail.actor,0,25)}
		    <c:if test="${vodDetail.actor.length()>25}">...</c:if>
			</c:otherwise>
	   </c:choose>
		<br>
		类型：${fn:substring(detailCategoryNames,0,18)}
		<c:if test="${detailCategoryNames.length()>18}">...
		</c:if>
		&nbsp;&nbsp;
		年份：${vodDetail.publishTime.substring(0,4)}
	</span><br>
	<p class="movieDetail-description">
		<c:if test="${not empty vodDetail.description && vodDetail.description  !='null' }">
			${fn:substring(vodDetail.description,0,148)}
			<c:if test="${vodDetail.description.length()>148}">...</c:if>
		</c:if>
		<c:if test="${empty vodDetail.description || vodDetail.description=='null' }">
				暂无
		</c:if>
	</p>
</div>
<div id="movieDetailTop" class="movieDetail-buts">
	<div class="movieDetail-but but-play but">
		<span class="top-span">播放</span>
		<img class="top-img" src="<%=path%>/public/images/movie/play.png" >
	</div>
	<div class="movieDetail-but but-collect but">
		<span class="top-span" <c:if test="${vodDetail.favoriteID!='0'}">style="left:13px;"</c:if>><c:choose>
		<c:when test="${vodDetail.favoriteID!='0'}">已收藏</c:when>
		<c:otherwise>收藏</c:otherwise></c:choose></span>
		<img class="top-img" <c:if test="${vodDetail.favoriteID!='0'}">style="left:78px;"</c:if> 
		src="<%=path%>/public/images/tvseries/collect.png" >
	</div>
	<%-- <div class="movieDetail-but but-brief but">
		<span class="top-span">简介</span>
		<img class="top-img" src="<%=path%>/public/images/tvseries/info.png"> 
	</div> --%>
</div>

<img id="movieDetailBorder"  src='<%=path %>/public/images/search/border.png' 
	class="movieDetail-border0 movieDetail-border" style="display:none">

<div class="movieDetail-bottom-logo">相关推荐</div>
<div class="movieDetail-line"></div>
<div id="movieDetailBottom" class="movieDetail-bottom">
	<c:forEach var="content" items="${vodAboutList}" varStatus="status">
		<div class="movieDetail-videoList">
			<input type='hidden' value='${content.templateModel}'>
			<input type='hidden' value='${content.ID}'>
			<img src="${imgUrl}${content.albumVerpic}" class="movieDetail-video-poster">
			<div class="movieDetail-video-title">${content.title}</div>
		</div>
	</c:forEach>
</div>
<div class="alert-container"  id="show-detail" style="display:none;overflow:hidden;margin: 0px" >
	<div class="alert-header"  >
		<img src="<%=path%>/public/images/abstract.png"  />
		 剧情简介 ——
	</div>
	<div class="alert-text"  >
		${vodDetail.description}
	</div>
</div>
	<input type="hidden" id="token" value="${token}" />  
	<input type="hidden" id="videoId" value="${vodDetail.ID}" />  
	<input type="hidden" id="vodAboutCount" value="${fn:length(vodAboutList)}" />
	<input type="hidden" id="favoritesId" value="${vodDetail.favoriteID}" />
	<input type="hidden" id="vodType" value="${vodDetail.type}" />
	<input type="hidden" id="fee" value="${vodDetail.fee}" />
	<input type="hidden" id="url" value="${url}" />
	<input type="hidden" id="path" value="<%=basePath%>"/>
	
	<input type="hidden" value="<%=loadType%>" id="loadType">
	<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
	<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
	<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
	<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
	<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</div>
</body>
<script src="<%=path%>/public/js/movieDetail.js"></script>
<script src="<%=path%>/public/js/detail.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/ajax.js"></script>
</html>