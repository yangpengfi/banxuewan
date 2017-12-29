<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
<head>
    <meta name="page-view-size" content="1280*720">
	<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/secondVideoList.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/util.css" />
</head>
<body onload="onloadVideoList()">
<div class="secondVideoList<c:if test="${categoryPid==125 }">1</c:if>"  >
	<div id="secondVideoListLitle">
		<span class="secondVideoList-title1" style="display:none">
		 	<font class="secondVideoList-title3">&nbsp;共<font id="secondVideoListTotal">${total}</font>个推荐</font>
		</span>
	 </div>
	 <img  src="<%=path%>/public/images/secondVideoList/leftBg.png" style="position: absolute;left:228px;top:0px">
	 <c:if test="${categoryPid!=125 }">
		 <div id="secondVideoListHeader" class="secondVideoList-header">
			<div  class="secondVideoList-search">
				<img class="secondVideoList-title-img-on" src="<%=path%>/public/images/secondVideoList/search.png">
				<img class="secondVideoList-title-img" src="<%=path%>/public/images/secondVideoList/searchFocus.png">
				<input type="hidden" value="search">
				<span  class="secondVideoList-title-span" >搜索</span>
			</div>
			<%-- 
			<div class="secondVideoList-order">
				<img  class="secondVideoList-title-img-on" src="<%=path%>/public/images/circle/order.png" >
				<img   class="secondVideoList-title-img" src="<%=path%>/public/images/circle/orderFocus.png">
				<span class="secondVideoList-title-span" >订购</span>
				<input type="hidden" value="order">
			</div> 
			--%>
		</div> 
	</c:if>
	
	<img id="secondVideoListBorder"  
		class='secondVideoList-border' 
		src="<%=basePath %>/public/images/secondVideoList/border2.png"/>
	
	<img src="<%=basePath %>/public/images/secondVideoList/topBorder.png" 
		id="secondVideoListTopBorder" 
	  	style="display:none"	
	  	class="secondVideoList-topBorder">
	
	<div id="secondVideoListTop" class="secondVideoList-top">
		<c:forEach var="rList" items="${recomandList}" varStatus="status" end="5">
			<div class="secondVideoList-bottom-div" style="position: absolute;left:${status.index*320}px;">
				<input type='hidden' value='${rList.templateModel}'>
				<input type='hidden' value='${rList.ID}'>
				<img class='secondVideoList-bottom-poster' src="${imgUrl}${rList.poster}"/>
				<div class="none secondVideoList-bottom-span">${rList.title}</div>
				<%-- <span class="none secondVideoList-bottom-span">${rList.title}</span> --%>
			</div>
		</c:forEach>
	</div>
	
	<div id="secondVideoListRight" class="secondVideoList-right">
		<c:forEach var="video" items="${data}" varStatus="status">
			<div class="secondVideoList-video" >
				<img src="${imgUrl}${video.albumSmallVerpic}" class="secondVideoList-poster">
				<input type="hidden" value="${video.templateModel}">
				<input type="hidden" value="${video.ID}">
				<input type="hidden" value="${video.guid}">
				<div class="secondVideoList-video-title">${video.title}</div>
			</div>
		</c:forEach>
	</div>

	<div class="secondVideoList-tab0">
		<input type="hidden" value="${categoryId}">
		<div class="secondVideoList-tab-title0">${title}</div>
	</div>
	<div id="secondVideoListLeft" class='secondVideoList-left'>
		<div class="secondVideoList-tab">
			<input type="hidden" value="${categoryPid}">
			<div class="secondVideoList-tab-title">全部</div>
		</div>
		<c:forEach var="sc" items="${secondCategory}" varStatus="status">
			<div class="secondVideoList-tab">
				<input type="hidden" value="${sc.ID}">
				<div class="secondVideoList-tab-title">${sc.name}</div>
			</div>
		</c:forEach>
	</div>
	
<img class="secondVideoList-tab-img" id="secondVideoTabBg" src="<%=path %>/public/images/secondVideoList/tabBg.png">
 

<div id="secondVideoListPage" class="secondVideoList-page" >
	&nbsp;&nbsp;&nbsp;
	<font id="secondVideoListCurPage">${curPage}</font>
	<font >/</font>
	<font id="secondVideoListTotalPage">${page==0?1:page}</font>
</div>
</div>
<input type="hidden" id="categoryId" value="${categoryId}" />
<input type="hidden" id="categoryPid" value="${categoryPid}" />
<input type="hidden" id="imgUrl" value="${imgUrl}"/>

<input type="hidden" id="categoryType" value="${categoryType}" />
<input type="hidden" value="<%=lastFocusIndex%>" id="lastFocusIndex">
<input type="hidden" value="<%=basePath%>" id="path">
<input type="hidden" value="<%=loadType%>" id="loadType">
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</body>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/secondVideoList.js"></script>