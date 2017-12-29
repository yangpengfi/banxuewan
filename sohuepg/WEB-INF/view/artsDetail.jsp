<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession s = request.getSession();
String loadType = request.getParameter("lt");
String modelMemory = request.getParameter("mm");
String urlMemory = request.getParameter("um");
String typeMemory = request.getParameter("tm");
String focusElementMemory = request.getParameter("fem");
String focusElementIndexMemory = request.getParameter("feim");
%>
<!DOCTYPE html>
<html>
<head>
<meta name="page-view-size" content="1280*720">
<title>综艺</title>
<style type="text/css">
</style>
<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/artsDetail.css">
<link rel="stylesheet" type="text/css" href="<%=path%>/public/css/util.css">
</head>
<body onload="onloadArtsDetail()">
<div class="artsDetail" style="background-image:url('${imgUrl}${bg}');">
	<div id="contentUp"  class="content-up" >	
		<span class="artsDetail-title">${arts.title}</span>
		<div id="artsDetailHeader" class="artsDetail-header">
		</div>
				
		<img class="artsDetail-poster" src="${imgUrl}${arts.albumVerpic}" />
		<div class="artsDetail-profile">
			<span class="artsDetail-info">
				主演：
				<c:if test="${not empty arts.actor && arts.actor!='null'}">
					${fn:substring(arts.actor,0,26)}
					<c:if test="${arts.actor.length()>26}">...</c:if>
				</c:if>
				<c:if test="${empty arts.actor || arts.actor=='null'}">
						暂无
				</c:if>
				<br>
				<%-- 	
				导演：${fn:substring(arts.director,0,38)}
					<c:if test="${arts.director.length()>30}">...</c:if>
					<br> 
				--%>
				类型：
				<c:if test="${not empty arts.categroyName && arts.categroyName!='null' }" >
					 ${fn:substring(arts.categroyName,0,26)}
					 <c:if test="${arts.categroyName.length()>26}">...</c:if>
				</c:if>
				<c:if test="${empty arts.categroyName || arts.categroyName=='null'}">
					暂无
				</c:if>
			</span>
			<br>
			<p class="artsDetail-description">
				<c:if test="${not empty arts.desCription && arts.desCription!='null' }">
					${fn:substring(arts.desCription,0,148)}
					<c:if test="${arts.desCription.length()>148}">...</c:if>
				</c:if>
				<c:if test="${empty arts.desCription || arts.desCription=='null'}">
						暂无
				</c:if>
			</p>
		</div>
		<div id="artsDetailTop" class="artsDetail-buts">
			<div class="artsDetail-but but-play but">
			    <span class="top-span">播放&nbsp;</span>
			    <img class="top-img" src="<%=path%>/public/images/movie/play.png" >
				<%-- <span class="top-span">订购</span>
				<img class="top-img" src="<%=path%>/public/images/tvseries/order.png" > --%>
			</div>
			<div class="artsDetail-but but-collect but">
				<span class="top-span" <c:if test="${vodDetail.favoriteID!='0'}">style="left:13px;"</c:if>>
				<c:choose><c:when test="${arts.favoriteID!='0'}">已收藏</c:when>
				<c:otherwise>收藏</c:otherwise></c:choose></span>
				<img <c:if test="${arts.favoriteID!='0'}">style="left:78px;"</c:if> 
				class="top-img" src="<%=path%>/public/images/tvseries/collect.png" >
			</div>
			<%-- <div class="artsDetail-but but-brief but">
				<span class="top-span">简介</span>
				<img class="top-img" src="<%=path%>/public/images/tvseries/info.png"> 
			</div> --%>
		</div>
		
		<%-- <img src="<%=path%>/public/images/arts/centerBg.png" class="artsDetail-center-bg"> --%>
		<!-- 
		<img src="<%=path%>/public/images/arts/contentBg.png" class="none artsDetail-center-bg0" id="centerBg">
		<div id="artsDetailCenter" class="artsDetail-center">
			<c:forEach var="resource" items="${resources}" varStatus="status">
				<div class="artsDetail-video-title" <c:if test="${status.index%2==0}">style="left:80px;top:${(status.index)*25+15 }px;"</c:if>
				<c:if test="${status.index%2!=0}">style="left:642px;top:${(status.index-1)*25+15}px;"</c:if>>
					<input type="hidden" value="${resource.ID}">
					<input type="hidden" value="${resource.path}">
					<div>${fn:trim(resource.title)}</div>
				</div>
			</c:forEach>
		</div>
		 -->
		<img src="<%=path%>/public/images/arts/contentBg.png" class="none artsDetail-center-bg0" id="centerBg">
		<div id="artsDetailCenter" class="artsDetail-center">
			<c:forEach var="resource" items="${resources}" varStatus="status">
				<div class="artsDetail-video-title" <c:if test="${status.index%2==0}">style="left:80px;top:${(status.index%6)*25+15 }px;</c:if>
					<c:if test="${status.index%2!=0}">style="left:642px;top:${((status.index-1)%6)*25+15}px;</c:if>
					<c:if test="${status.index>5}">
							display:none;
						</c:if>">
						<input type="hidden" value="${resource.ID}">
						<input type="hidden" value="${resource.fee}">
						<input type="hidden" value="${resource.path}">
						<div>${fn:trim(resource.title)}</div>
				</div>
			</c:forEach>
		</div>
		
		 
		<div id="artsDetailTurnLeft" class="artsDetail-turn-left"></div>
		<div id="artsDetailTurnRight" class="artsDetail-turn-right"<c:if test="${total>8}">style="display:block"</c:if>></div>
				
		
		
		<div class="artsDetail-bottom-logo">相关推荐</div>
		<img id="artsDetailBorder" 
				src='<%=path %>/public/images/tvseries/border.png' 
		 		class="artsDetail-border" style="top:720px;left:85px;">
		<div id="contentDown"  style="display:none;">
			<div id="artsDetailBottom" class="artsDetail-bottom">
			<c:forEach var="video" items="${rVideos}" varStatus="status">
				<div class="artsDetail-video">
					<img src="${imgUrl}${video.albumSmallVerpic}" class="artsDetail-poster-r" id="artsDetailPoster${status.index}">
					<input type='hidden' value='${video.templateModel}'>
					<input type='hidden' value='${video.ID}'>
					<div class="artsDetail-video-title-r">${video.title}</div>
				</div>
				</c:forEach>
			</div>
		</div>
	</div>	
	
	<div class="alert-container"  id="show-detail" style="display:none;overflow:hidden;margin: 0px" >
		<div class="alert-header"  >
			<img src="<%=path%>/public/images/abstract.png"  />
				剧情简介 ——
		</div>
		<div class="alert-text"  >
			${arts.desCription}
		</div>
	</div>
</div>
<input type="hidden" id="token" value="${token}" />  
<input type="hidden" id="videoId" value="${arts.ID}" />  
<input type="hidden" id="vodType" value="svod" />  
<input type="hidden" id="path" value="<%=basePath%>" />
<input type="hidden" id="pages" value="${pages}" />
<input type="hidden" id="total" value="${total}" />
<input type="hidden" id="artsId" value="${arts.ID}" />
<input type="hidden" id="url" value="${url}" />
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
<input type="hidden" value="<%=loadType%>" id="loadType">

</body>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/artsDetail.js"></script>
<script src="<%=path%>/public/js/detail.js"></script>
<script src="<%=path%>/public/js/ajax.js"></script>