<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
<meta name="page-view-size" content="1280*720" />
<title>排行榜</title>
<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/chart.css" />
</head>
<body onload="onloadChart()">
<div class="chart" style="background-image:url('<%=path %>/public/images/chart/chartBg.jpg');" id='body'>
	<%-- 标题 --%>
	<div id="chartHeader" class="chart-header">
		<div class="chart-header-list" >
				<input type="hidden" value="hottvs"/>	
				<span >热播剧集</span>
		</div>
		<div class="chart-header-list" style="left:250px;">
			<input type="hidden" value="ustvs"/>	
			<span >TOP美剧</span>
		</div>
		<div class="chart-header-list" style="left:530px;">
			<input type="hidden" value="movietv"/>	
			<span >最新电影</span>
		</div>
		<div class="chart-header-list"style="left:800px;">
			<input type="hidden" value="varietytv"/>	
			<span >王牌综艺</span>
		</div>
	</div>
	<%-- 推荐位 --%>
	<div id="chartContent" class='chart-content'>
			<div id="chartLeft" class='chart-left'>
				<c:forEach var="chart" items="${chartList}" varStatus="status" end="9">
					<c:if test="${ status.index <5}">
							<div>
								<input type='hidden' value='${chart.templateModel}'>
								<c:if test="${chart.type=='vod'}">
									<input type='hidden' value='${chart.videoID}'>
								</c:if>
								<c:if test="${chart.type=='svod'}">
									<input type='hidden' value='${chart.parentId}'>
									<input type='hidden' value='${chart.videoID}'>
								</c:if>
							    <input type='hidden' value='${chart.posterPath}'>
								<img class="chartBorder${status.index}" src="<%=path %>/public/images/chart/chartBorder${status.index+1}.png">
								<img class="chart-sub-poster${status.index}" src="${basePostPath}${chart.posterPath}"  id="homeSubPoster${status.index}"/>	
								<img class='sub-border chart-left-border-${status.index}' src="<%=path %>/public/images/index/border1.png" id='chartRightBorder-${status.index}' style='display:none;'>
								<div class='chart-span${status.index}' >
									<div class="main-title-div main-title"><span class="">${chart.title}</span></div>
								</div>
								<div class="chart-sub-span-bg chart-sub-span${status.index}"></div>
							</div>
					</c:if>
					<c:if test="${status.index >=5}">
							<div style="display: none">
								<input type='hidden' value='${chart.templateModel}'>
								<c:if test="${chart.type=='vod'}">
									<input type='hidden' value='${chart.videoID}'>
								</c:if>
								<c:if test="${chart.type=='svod'}">
								    <input type='hidden' value='${chart.parentId}'>
									<input type='hidden' value='${chart.videoID}'>
								</c:if>
							    <input type='hidden' value='${chart.posterPath}'> 
								<img class="chart-sub-poster${status.index}" src="${basePostPath}${chart.posterPath}"  id="homeSubPoster${status.index}"/>	
								<img class='sub-border chart-left-border-${status.index}' src="<%=path %>/public/images/index/border1.png" id='chartRightBorder-${status.index}' style='display:none;'>
								<div class='chart-span${status.index}' >
									<div class="main-title-div"><span class="main-title">${chart.title}</span></div>
								</div>
								<div class="chart-sub-span-bg chart-sub-span${status.index}"></div>
							</div>
					</c:if>
				</c:forEach>
			</div>
	</div> 
	<%-- 影片详情 --%>
	<div id="chartfooter"  class="chart-footer">
		
	</div>
</div>
	<input type="hidden" id="type" value="${type}">
	<input type="hidden" value="<%=loadType%>" id="loadType">
	<input type="hidden" value="<%=basePath%>" id="path">
	<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
	<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
	<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
	<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
	<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</body>
<script src="<%=path%>/public/js/chart.js"></script>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/ajax.js"></script>
</html>