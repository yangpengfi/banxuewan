<%@page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession s = request.getSession();
String searchName = request.getParameter("name")==null?"":request.getParameter("name");
String loadType = request.getParameter("lt");
String urlMemory = request.getParameter("um");
String modelMemory = request.getParameter("mm");
String typeMemory = request.getParameter("tm");
String focusElementMemory = request.getParameter("fem");
String focusElementIndexMemory = request.getParameter("feim");
String lastFocusIndex = request.getParameter("lastFocusIndex");
%>
<head>
    <meta name="page-view-size" content="1280*720">
	<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/search.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/util.css" />
</head>
<body onload="onloadSearch()">
	<div class="search"  >
		<c:if test="${isResult!=true}">
			<div id="searchDefaultTitle" class='search-title'>
				<span>别人都在搜</span>
			</div>
			<img class="search-line" id="searchLine" src="<%=basePath %>/public/images/search/titleLine.png">
			<%-- <div class='search-page none'>
				<span id="searchCurPage" >${curPage}</span><span>/</span><span id="searchTotalPage" >${page==0?1:page}</span>
			</div> --%>
			<div id="searchTitle" style="display:none;" >
				<span class='search-title'> 搜索结果:共<span id="searchTotal">${total}</span>条</span>
			</div>
		</c:if>
		<c:if test="${isResult==true}">
			<div class='search-page'>&nbsp;&nbsp;&nbsp;&nbsp;
				<font id="searchCurPage" >${curPage}</font>
				<font>/</font>
				<font id="searchTotalPage">${page==0?1:page}</font>
			</div>
			<div id="searchTitle">
				<span class='search-title'> 搜索结果:共<span id="searchTotal">${total}</span>条</span>
			</div>
			
			<%-- <img id="searchDownPage" class='search-page-down' 
			style="display:<c:if test="${curPage==page}">none;</c:if>" 
			src="<%=basePath %>/public/images/search/down.png">
			
			<img id="searchUpPage" class='search-page-up' 
			style="display:<c:if test="${curPage==1}">none;</c:if>" 
			 src="<%=basePath %>/public/images/search/up.png"> --%>
			 
		</c:if>
		
		
		<img  class='search-leftBg'  src="<%=basePath %>/public/images/search/leftBg.png">
		<input type="hidden" value="${isResult}" id="isResult">
		
		<img id="searchBorder" style="left:360px;display:none" class='search-border' 
		src="<%=basePath %>/public/images/search/border.png"/>
		
		<img  class='search-info' src="<%=basePath %>/public/images/search/info.png">
		
		<div class="search-left-title">
			<img src="<%=basePath %>/public/images/search/11.png" style="padding-top: 10px;">
			<div class="search-type">
				<span >搜索: ${title}	</span>
			</div>
		</div>
		
		<div id="searchRight" class="search-right">
			<c:forEach var="search" items="${searchList}" varStatus="status" end="11">
				<div class="search-video"  >
					<img src="${imgUrl}${search.albumVerpic}" class="search-poster" >
					<%-- <c:if test="${not empty search.mark }">
						<img src="${imgUrl}${search.mark}" class="secondVideoList-mark"
						style="left:${5+(status.index>4?status.index-5:status.index)*178}px; top:${status.index>4?275:5}px;">
					 </c:if> --%>
					<div class='search-video-title'>${search.title}</div>
					<input type="hidden" id="searchRightCategory${status.index+1}" value="${search.templateModel}" />
					<input type="hidden" id="searchRightCid${status.index+1}" value="${search.ID}" />
					<input type="hidden" id="searchRightType${status.index+1}" value="${search.type}" />
				</div>
			</c:forEach>
		</div>
		
		<div class="search-input">
			<img  src="<%=basePath %>/public/images/search/inputBg.png" />
			<div id="searchValue" class="search-input-value"><%=searchName%></div>
			<img class="search-input-img" src="<%=basePath %>/public/images/search/search.png" />
		</div>
		<div id="searchLeft" class='search-left'>
			<div class="key1">
				<c:if test="${basePath=='init'}">
					<img  src="<%=basePath %>/public/images/search/key1.png" class="keybroadimg none"/>
					<img  src="<%=basePath %>/public/images/search/keyFocus1.png" class="keybroadimg block"/>
				</c:if>
				<c:if test="${basePath!='init'}">
					<img  src="<%=basePath %>/public/images/search/key1.png" class="keybroadimg block"/>
					<img  src="<%=basePath %>/public/images/search/keyFocus1.png" class="keybroadimg none"/>
				</c:if>
			</div>
			 
			<div class="key2">
				<img  src="<%=basePath %>/public/images/search/key2.png" class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus2.png" class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key2_1">2</div>
					<div class="key list2" id="key2_2" >A</div>
					<div class="key list3" id="key2_3" >B</div>
					<div class="key list4" id="key2_4" >C</div>
				</div>
			</div>
			
			<div class="key3">
				<img  src="<%=basePath %>/public/images/search/key3.png" class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus3.png" class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key3_1">3</div>
					<div class="key list2" id="key3_2" >D</div>
					<div class="key list3" id="key3_3" >E</div>
					<div class="key list4" id="key3_4" >F</div>
				</div>
			</div>
			
			<div class="key4">
				<img  src="<%=basePath %>/public/images/search/key4.png"  class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus4.png"  class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key4_1">4</div>
					<div class="key list2" id="key4_2" >G</div>
					<div class="key list3" id="key4_3" >H</div>
					<div class="key list4" id="key4_4" >I</div>
				</div>
			</div>
				
			<div class="key5">
				<img  src="<%=basePath %>/public/images/search/key5.png"  class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus5.png"  class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key5_1">5</div>
					<div class="key list2" id="key5_2" >J</div>
					<div class="key list3" id="key5_3" >K</div>
					<div class="key list4" id="key5_4" >L</div>
				</div>
			</div >
				
			<div class="key6">
				<img  src="<%=basePath %>/public/images/search/key6.png" class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus6.png" class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key6_1">6</div>
					<div class="key list2" id="key6_2" >M</div>
					<div class="key list3" id="key6_3" >N</div>
					<div class="key list4" id="key6_4" >O</div>
				</div>
			</div>
				
			<div class="key7">
				<img  src="<%=basePath %>/public/images/search/key7.png"  class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus7.png"  class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1"  id="key7_1">7</div>
					<div class="key list2"  id="key7_2" >P</div>
					<div class="key list3"  id="key7_3" >Q</div>
					<div class="key list4"  id="key7_4" >R</div>
					<div class="key list5"  id="key7_5" >S</div>
				</div>
			</div>
			
			<div class="key8">
				<img  src="<%=basePath %>/public/images/search/key8.png"  class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus8.png"  class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key8_1">8</div>
					<div class="key list2" id="key8_2" >T</div>
					<div class="key list3" id="key8_3" >U</div>
					<div class="key list4" id="key8_4" >V</div>
				</div>
			</div>
			
			<div class="key9">
				<img  src="<%=basePath %>/public/images/search/key9.png" class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus9.png" class="keybroadimg none"/>
				<div class="key-list">
					<div class="key list1" id="key9_1">9</div>
					<div class="key list2" id="key9_2" >W</div>
					<div class="key list3" id="key9_3" >X</div>
					<div class="key list4" id="key9_4" >Y</div>
					<div class="key list5" id="key9_5" >Z</div>
				</div>
			</div>
			<div class="key10">
				<img  src="<%=basePath %>/public/images/search/key10.png"  class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus10.png"  class="keybroadimg none"/>
				<input type="hidden" value="">
			</div>
			<div class="key11">
				<img  src="<%=basePath %>/public/images/search/key11.png"  class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus11.png"  class="keybroadimg none"/>
				<input type="hidden" value="0">
			</div>
			<div class="key12">
				<img  src="<%=basePath %>/public/images/search/key12.png"   class="keybroadimg block"/>
				<img  src="<%=basePath %>/public/images/search/keyFocus12.png"   class="keybroadimg none"/>
				<input type="hidden" value="del">
			</div>
		</div>
	</div>
	
	<input type="hidden" id="categoryId" value="${categoryId}" />
	<input type="hidden" id="categoryType" value="${categoryType}" />
	<input type="hidden" id="imgUrl" value="${imgUrl}" />
	<input type="hidden" id="inputSearchValue" value="<%=searchName%>" />
	<input type="hidden" id="basePath" value="<%=basePath %>"/>
	
	<input type="hidden" value="<%=basePath%>" id="path">
	<input type="hidden" value="<%=lastFocusIndex%>" id="lastFocusIndex">
	<input type="hidden" value="<%=loadType%>" id="loadType">
	<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
	<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
	<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
	<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
	<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">
</body>
<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/search.js"></script>
