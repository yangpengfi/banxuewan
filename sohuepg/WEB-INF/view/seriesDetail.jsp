<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
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
<title>电视剧</title>
<meta name="page-view-size" content="1280*720">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/util.css">
<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/seriesDetail.css">
</head>
<body onload="onloadSeriesDetail()">
<div class="seriesDetail" style="background-image:url('${imgUrl}${bg}');background-size:1280px 720px;">
	<div id="contentUp" class="content-up" >	
	    <div class="seriesDetail-content" style="position:relative;">
			<span class="seriesDetail-title">
				${series.title}
				<c:if test="${series.episodeUpdated<series.episodeTotal}">
					(已更新${series.episodeUpdated}集)
				</c:if>
				(${series.episodeTotal}集全)
			</span>
			<div id="seriesDetailHeader" class="seriesDetail-header"></div>
			<img class="seriesDetail-poster" src="${imgUrl}${series.albumVerpic}">
			<div class="seriesDetail-profile">
				<span class="seriesDetail-info">
					主演：
					<c:choose>
						<c:when test="${series.actor == ''}">
					                   暂无
			 			</c:when>
						<c:otherwise>
		                   ${fn:substring(series.actor,0,30)}
						   <c:if test="${series.actor.length()>30}">...</c:if>
			 			</c:otherwise>
	 			   </c:choose>
					<br>
					类型：
					<c:choose>
						<c:when test="${series.categroyName.length()>16}">
			 				${fn:substring(series.categroyName,0,16)}...
			 			</c:when>
						<c:otherwise>
			 				${(series.categroyName==null||series.categroyName=='null'||series.categroyName=='')?'未知':series.categroyName}
			 			</c:otherwise>
					</c:choose>
					&nbsp;&nbsp;
					年份：${series.publishTime.substring(0,4)}<%-- 年${series.publishTime.substring(5,7)}月${series.publishTime.substring(8,10)}日 --%>
				</span>
				<p class="seriesDetail-description"> 
					<c:if test="${not empty series.desCription && series.desCription!='null'}">
						${fn:substring(series.desCription,0,148)}
					<c:if test="${series.desCription.length()>148}">...</c:if>
					</c:if>
					<c:if test="${empty series.desCription || series.desCription=='null'} ">
							暂无
					</c:if>
				</p>
			</div>
			<div id="seriesDetailTop" class="seriesDetail-top">
				<div class="seriesDetail-but but-play but"  >
				    <span class="top-span">播放&nbsp;</span>
				    <img class="top-img" src="<%=path%>/public/images/movie/play.png" >
					<%-- <span class="top-span">订购</span>
					<img class="top-img" src="<%=path%>/public/images/tvseries/order.png" > --%>
				</div>
				<div class="seriesDetail-but but-collect but">
					<span class="top-span" <c:if test="${vodDetail.favoriteID!='0'}">style="left:13px;"</c:if>>
					<c:choose><c:when test="${series.favoriteID!='0'&&!empty series.favoriteID}">已收藏</c:when>
					<c:otherwise>收藏</c:otherwise></c:choose></span>
					<img <c:if test="${series.favoriteID!='0'}">style="left:78px;"</c:if> 
					class="top-img" src="<%=path%>/public/images/tvseries/collect.png" >
				</div>
			</div>
			<div id="seriesDetailCenter" class="seriesDetail-center">
				<div class="series-ranges">
					<c:forEach var="page" begin="1" end='${pages}' varStatus="status">
						<div class="series-range bg<c:if test="${page==showPage}">-selected</c:if>">
							<div style="width:96px;height:43px;line-height:43px;">
								${page*20-19}-
								<c:choose>
									<c:when test="${status.last==true}">
											${series.episodeUpdated}
											<input type="hidden" name="seriesRange"  id="seriesRange"  value="${series.episodeUpdated}" />
									</c:when>
									<c:otherwise>
										${page*20}
										<input type="hidden" name="seriesRange" id="seriesRange"  value="${page*20}" />
									</c:otherwise>
								</c:choose>
							</div>
						</div>
					</c:forEach>
				</div>
				<div class="series-numbers">
					<c:if test="${resources.size()>0}">
						<c:forEach var="resource" items="${resources}" varStatus="status">
							<div class="series-number" style="background:url(<c:if test="${status.index!=0}"><%=path%>/public/images/tvseries/numberBg.png</c:if>
								<c:if test="${status.index==0}"><%=path%>/public/images/tvseries/numberBgSelected.png</c:if>) no-repeat;
								<c:if test="${status.index>19}">
									display:none;
								</c:if>
								">
								<img class="series-mark" style="top:
									<c:if test="${fn:substring((status.index/10),0,status.index>=100?2:1)%2==0}">
										70px;
									</c:if>
									<c:if test="${fn:substring((status.index/10),0,status.index>=100?2:1)%2!=0}">
										140px;
									</c:if>
								left:${66.6+(status.index%10)*114}px;"
								
								<c:choose>
			                    	<c:when test="${resource.fee==1}">
			                    		src="<%=path%>/public/images/charge.png"
			                    	</c:when>
			                    	<c:otherwise>
										src="<%=path%>/public/images/fee.png"
			                    	</c:otherwise>
			                    </c:choose>
			                    
			                    > 
								<input type="hidden" value="${resource.ID}">
								<input type="hidden" value="${resource.fee}">
								<input type="hidden" value="${resource.path}">
								<div class="series-span"><c:if test="${resource.sort<=9}"></c:if>${resource.sort}
								</div>
							</div>
						</c:forEach>
					</c:if>
				</div>
			</div>
		</div>
		<div class="seriesDetail-recommend" style="position:relative;">
			<div class="seriesDetail-bottom-logo">相关推荐</div>
			<img id="seriesDetailBorder" src='<%=path %>/public/images/tvseries/border.png' class="seriesDetail-border" style="top:720px;left:85px;">
			<div id="contentDown" style="display:none;">
				<div id="seriesDetailBottom" class="seriesDetail-bottom">
					<c:forEach var="video" items="${rVideos}" varStatus="status">
						<div class="seriesDetail-video">
							<img src="${imgUrl}${video.albumSmallVerpic}" class="seriesDetail-poster-r" id="seriesDetailPoster${status.index}">
							<input type='hidden' value='${video.templateModel}'>
							<input type='hidden' value='${video.ID}'>
							<div class="seriesDetail-video-title">${video.title}</div>
						</div>
					</c:forEach>
				</div>
			</div>
		</div>
	</div>
	<div class="alert-container" id="show-detail" style="display:none;">
		<div class="alert-header">
			<img src="<%=path%>/public/images/abstract.png" />
			&nbsp;剧情简介 ——
		</div>
		<div class="alert-text">
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			${series.desCription}
		</div>
	</div> 
	<input type="hidden" value="${showPage}" id="showPage">
	<input type="hidden" value="${pages}" id="pages">
	<input type="hidden" value="${total}" id="total">
	<input type="hidden" value="${record}" id="record">
	<input type="hidden" value="${series.favoriteID}" id="favoritesId">
	<input type="hidden" value="${token}" id="token">
	<input type="hidden" id="url" value="${url}" />
	<input type="hidden" id="vodType" value="svod" />  
	<input type="hidden" value="${series.ID}" id="videoId">
	<input type="hidden" value="<%=basePath%>" id="path">
	<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
	<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
	<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
	<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
	<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
	<input type="hidden" value="<%=loadType%>" id="loadType">

</div>
</body>
<script src="<%=path%>/public/js/seriesDetail.js"></script>
<script src="<%=path%>/public/js/detail.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/ajax.js"></script>
</html>
