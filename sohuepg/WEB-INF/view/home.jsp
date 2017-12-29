<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
<head>
	<meta name="page-view-size" content="1280*720">
	<link rel="stylesheet" type="text/css"	href="<%=path%>/public/css/home.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/classify.css"/>
	
	<script type="text/javascript">
	/*
		window.onerror = function(errorMessage, scriptUrl, lineNumber, columnNumber, errorObj) {
		    console.log("错误信息：" , errorMessage);
		    console.log("出错文件：" , scriptUrl);
		    console.log("出错行号：" , lineNumber);
		    //console.log("出错列号：" , columnNumber);
		    console.log("错误详情：" , errorObj);
		    document.getElementById('info_test').innerHTML+="<p>错误信息：" + errorMessage + "</p>";
		    document.getElementById('info_test').innerHTML+="<p>出错文件：" + scriptUrl + "</p>";
		    document.getElementById('info_test').innerHTML+="<p>出错行号：" + lineNumber + "</p>";
		    //document.getElementById('info_test').innerHTML+="<p>出错列号：" + columnNumber + "</p>";
		    document.getElementById('info_test').innerHTML+="<p>错误详情：" + errorObj + "</p>";
		}
	*/
	</script>

</head>
<body onload="onloadHome()">
<div class="home" style="background-image:url('${basePath}${bg}');" id='body'>
<input type="hidden" id="type" value="${type}">
<img src="<%=path %>/public/images/index/headerBg.png" id="headerBg" style="display:none" class='header-bg'>

<img src="${basePath}${headerList[0].icon}" class='home-header-0'>

<div  id="homeHeader" style="position: absolute;left: 38px;">
	<c:forEach var="h" items="${headerList}" varStatus="status" begin="1" >

		<div class="home-header-item" style="left:${status.index*110+635}px;">
			<img src="${basePath}${h.icon}" class="home-header-img">
			<img style="display:none" src="${basePath}${h.focus}" class="home-header-img">
			<span class="home-header-name">${h.name}</span>
			<input type="hidden"  
			<c:if test="${h.built=='order'}">value='order/package'</c:if> 
			<c:if test="${h.built=='search'}">value='search/log?page=1&rows=10'</c:if>
			<c:if test="${h.built=='exit'}">value='exit'</c:if>
			<c:if test="${h.built=='history'}">value='record/history?type=history&page=1&rows=6'</c:if>>
		</div>

	</c:forEach>
</div>

<div id='homeContent' style="position:absolute;left:-12px;">

<c:if test="${type!='classify' }">
<div>
	<div id="homeLeft">
		<div>
			<!-- 主推荐海报展示-->
			<!-- 主推荐位标题副标题透明div样式轮播以及角标控制 -->
			<c:forEach var="mainBit" items="${mainBitList}" varStatus="status" end="0" >
				<img class='home-left-1-content' id='mainBit'  src="${basePostPath}${mainBitList[0].poster}"/>
				<img src="<%=path %>/public/images/index/mainBitBg.png" id='homeLeft-0' class='home-left-1-boder' style="display:none">
				<input type='hidden' value='${mainBit.templateModel}'>
				<input type='hidden' value='${mainBit.ID}'>
				<input type="hidden"  value="${mainBit.albumVerpic}">
				<input type="hidden"  value="${mainBit.property}">
				<input type="hidden"  value="${mainBit.link}">
				<!-- 角标 -->
				<c:if test="${not empty mainBit.mark }">
					<img id='mainMark-${status.index}' class='mark home-left-1-content' style='<c:if test="${status.index==0}">display:block;</c:if>
					<c:if test="${status.index!=0}">display:none;</c:if>' src="${basePostPath}${mainBit.mark}"/>
			    </c:if>
				<!-- 透明div -->
				<div class='home-span' >
					<div class="main-title-div"><span class="main-title">${mainBit.title}</span><br></div>
					<div class="sub-title-div"><span class='sub-title'>${mainBit.recommendTitle}</span></div>
				</div>
				<div class='home-span-bg'></div>
			</c:forEach>
		</div>
		<c:if test="${type=='homepage'||type=='home'}">
			<%--限时免费 --%>
			<c:forEach var="inter" items="${interfaceList}" varStatus="status" end='0' >
				<div>
					<img class='home-left-${status.index+2}-content' src="${basePath}${inter.icon}"/>
					<img src="<%=path %>/public/images/index/border3.png" id='homeLeft-${status.index+1}' class='home-left-${status.index+2}-boder' style='display:none;'>
					<img class='img-center-${status.index+2}-content-in' src="${basePath}${inter.focus}"/>
					<span class='left${status.index+2}-span' >${inter.name}</span>
					<input type='hidden' value='${inter.built}'>
				</div>
			</c:forEach>
			<%--排行榜 --%>
			 <div>
		 		<input type="hidden" value="chart/searchChart">
				<img class="home-left-3-content"   src="<%=path %>/public/images/index/home_chart.jpg" /> 
				<img src="<%=path %>/public/images/index/border3.png"  
					class="home-left-3-boder"  
					id="homeLeft-2"  
					style="display:none"  />
			</div>
		</c:if>
		
		 <c:if test="${type!='homepage'&&type!='home'}">
		 	<c:forEach var="inter" items="${interfaceList}" varStatus="status" end='0' >
				<div>
					<img class='home-left-${status.index+2}-content' src="${basePath}${inter.icon}"/>
					<%-- <img class='home-left-${status.index+2}-content' src="<%=path %>/public/images/1_09.png"/> --%>
					<img src="<%=path %>/public/images/index/border3.png" id='homeLeft-${status.index+1}' 
					class='home-left-${status.index+2}-boder' style='display:none;'>
					<img class='img-center-${status.index+2}-content-in' src="${basePath}${inter.focus}"/>
					<span class='left${status.index+2}-span' >${inter.name}</span>
					<input type='hidden' value='${inter.built}'>
				</div>
			</c:forEach>
			<c:forEach var="subBit" items="${subBitList}" varStatus="status" begin="6" end="6">
				<div>
					<img class='home-left-3-content' src="${basePostPath}${subBit.poster}" id="homeSubPoster${status.index}"/>
					<img src="<%=path %>/public/images/index/border3.png" id='homeLeft-2' class='home-left-3-boder' style='display:none;'>
					 <c:if test="${not empty subBit.mark }">
						<img class='mark home-left-3-content'  
						 src="${basePostPath}${subBit.mark}"/>
				    </c:if>
					<div class='left3-span' style="height: 38px;line-height: 40px;">${subBit.title}</div>
					<div class='home-left-span-bg left3-span'></div>
					<input type='hidden' value='<c:if test="${subBit.templateModel==''}">special</c:if><c:if test="${subBit.templateModel!=''}">${subBit.templateModel}</c:if>'>
					<input type='hidden' value='${subBit.ID}'>
					<input type="hidden"  value="${subBit.albumVerpic}">
					<input type="hidden"  value="${subBit.property}">
					<input type="hidden"  value="${subBit.link}">
				</div>
			</c:forEach>
		 </c:if>
	</div>
	<!-- 副推荐位 -->
	<div  id="homeRight">
		<c:forEach var="subBit" items="${subBitList}" varStatus="status" end="5">
			<c:if test="${type=='homepage'}">
				<c:if test="${status.index<3}">
					<div>
						<input type='hidden' value='${subBit.templateModel}'>
						<input type='hidden' value='${subBit.ID}'>
						<input type="hidden"  value="${subBit.albumVerpic}">
						<input type="hidden"  value="${subBit.property}">
						<input type="hidden"  value="${subBit.link}">
						<img class="home-sub-poster${status.index}" src="${basePostPath}${subBit.poster}" id="homeSubPoster${status.index}"/>	
						<img class='sub-border home-right-border-${status.index}' src="<%=path %>/public/images/index/border1.png" id='homeRightBorder-${status.index}'style='display:none;'>
					    <c:if test="${not empty subBit.mark }">
							<img class='mark home-sub-poster${status.index}' id="homeRightMark${status.index }" 
							 src="${basePostPath}${subBit.mark}"/>
					    </c:if>
					    <div class='home-sub-span home-sub-span${status.index}'>
							<div class="main-title-div-right"><span class='right-main-title' >${subBit.title}</span><br></div>
							<div class="sub-title-div-right"><span class='right-sub-title'>${subBit.recommendTitle}</span></div>
						</div>
						<div class='home-sub-span-bg home-sub-span${status.index}'></div> 
					</div>
				</c:if>
				 <c:if test="${status.index==3}"> 
					  	<%-- 
					  	<div>
					 		<input type="hidden" value="chart/searchChart">
							<img class="home-sub-poster${status.index}"   src="<%=path %>/public/images/index/home_chart.jpg" /> 
							<img class="home-small-boder home-right-border-${status.index}"  id="homeRightBorder-${status.index}"  
								src="<%=path %>/public/images/index/border2.png"  style="display:none" />
						</div> 
						--%>
					 <div>
						<input type='hidden' value='${subBit.templateModel}'>
						<input type='hidden' value='${subBit.ID}'>
						<input type="hidden"  value="${subBit.albumVerpic}">
						<input type="hidden"  value="${subBit.property}">
						<input type="hidden"  value="${subBit.link}">
						<img class="home-sub-poster${status.index}" src="${basePostPath}${subBit.poster}" id="homeSubPoster${status.index}"/>	
						<img src="<%=path %>/public/images/index/border2.png" class="home-small-boder home-right-border-${status.index}" id='homeRightBorder-${status.index}'style='display:none;'>
					    <c:if test="${not empty subBit.mark }">
							<img class='mark home-sub-poster${status.index}' id="homeRightMark${status.index}" 
							 src="${basePostPath}${subBit.mark}"/>
					    </c:if>
						<div class='home-sub-span home-sub-span${status.index}'><span class='right-main-title-small'>${subBit.title}</span></div> 
						<div class='home-sub-span-bg home-sub-span${status.index}'></div>
					</div> 
				 </c:if> 
				<c:if test="${status.index>3}"> 
					<div>
						<input type='hidden' value='${subBit.templateModel}'>
						<input type='hidden' value='${subBit.ID}'>
						<input type="hidden"  value="${subBit.albumVerpic}">
						<input type="hidden"  value="${subBit.property}">
						<input type="hidden"  value="${subBit.link}">
						<img class="home-sub-poster${status.index}" src="${basePostPath}${subBit.poster}" id="homeSubPoster${status.index}"/>	
						<img src="<%=path %>/public/images/index/border2.png" class="home-small-boder home-right-border-${status.index}" id='homeRightBorder-${status.index}'style='display:none;'>
					    <c:if test="${not empty subBit.mark }">
							<img class='mark home-sub-poster${status.index}' id="homeRightMark${status.index}" 
							 src="${basePostPath}${subBit.mark}"/>
					    </c:if>
						<div class='home-sub-span home-sub-span${status.index}'><span class='right-main-title-small'>${subBit.title}</span></div> 
						<div class='home-sub-span-bg home-sub-span${status.index}'></div>
					</div>
				 </c:if> 
			</c:if>
			<c:if test="${type!='homepage'}">
				<div>
					<input type='hidden' value='${subBit.templateModel}'>
					<input type='hidden' value='${subBit.ID}'>
					<input type="hidden"  value="${subBit.albumVerpic}">
					<input type="hidden"  value="${subBit.property}">
					<input type="hidden"  value="${subBit.link}">
					<img class="home-sub-poster${status.index}" src="${basePostPath}${subBit.poster}" id="homeSubPoster${status.index}"/>	
					<img <c:if test="${status.index<3}"> src="<%=path %>/public/images/index/border1.png"
						class='sub-border home-right-border-${status.index}'
						</c:if>
						<c:if test="${status.index>=3}"> src="<%=path %>/public/images/index/border2.png"
						class="home-small-boder home-right-border-${status.index}"
						</c:if> id='homeRightBorder-${status.index}'style='display:none;'>
				    
				    <c:if test="${not empty subBit.mark }">
						<img class='mark home-sub-poster${status.index}' id="homeRightMark${status.index }" 
						 src="${basePostPath}${subBit.mark}"/>
				    </c:if>
				    <div class='home-sub-span home-sub-span${status.index}'>
						<c:if test="${status.index<3}">
							<div class="main-title-div-right"><span class='right-main-title' >
								${subBit.title}
							</span><br>
							</div>
						</c:if>
						<c:if test="${status.index>=3}">
							<span class='right-main-title-small'>
								${subBit.title}
							</span>
						</c:if>
						<c:if test="${status.index<3}">
							<div class="sub-title-div-right">
								<span class='right-sub-title'>
									${subBit.recommendTitle}
								</span>
							</div>
						</c:if>
					</div>
					 <div class='home-sub-span-bg home-sub-span${status.index}'></div> 
				</div>
			</c:if>
		</c:forEach>
	</div>
</div>
</c:if>
<c:if test="${type=='classify'}">
	<div id="homeLeft" style="float:left; width: 1280px; position:absolute;">
		<c:forEach var="cl" items="${contentList}" end="7" varStatus="status">
		    <c:if test="${status.index+1 <5}">
				<div style="float:left; width: 294px;height: 326px; left:${72+(status.index)*294}px; top: 112px; position:absolute;">
					<img src="${basePath}${cl.icon}" class='classify-center-poster-img' />
					<img class='classify-center-img-flag' src="${basePath}${cl.focus}"/>
					<c:if test="${status.index+1 <5}">
						<span class='classify-span-top'>${cl.name}</span>
						<img  class='classify-center-border' style='display:none;' src="<%=path %>/public/images/classify/1_41.png" id='classifyBorder-${status.index}'>
					</c:if>
					<input type='hidden'
						<c:if test="${cl.built=='tv'}">value='category/videoList?categoryPid=2&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='variety'}">value='category/videoList?categoryPid=3&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='child'}">value='category/videoList?categoryPid=5&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='movie'}">value='category/videoList?categoryPid=1&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='homemade'}">value='category/videoList?categoryPid=120&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='ustv'}">value='category/videoList?categoryPid=130&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='koreantv'}">value='category/videoList?categoryPid=132&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='record'}">value='category/videoList?categoryPid=4&type=secondVideoList'</c:if>>
				</div>
			</c:if>
			<c:if test="${status.index+1 > 4}">
				<div style="float:left;width:294px;height:120px;left:${72+(status.index-4)*294}px;top:450px;position:absolute;">
					<img src="${basePath}${cl.icon}" class='classify-poster-bottom-img' />
					<img class='classify-center-img-bottom-flag' src="${basePath}${cl.focus}"/>

					<c:if test="${status.index+1 >4}">
						<span class='classify-span-bottom'>${cl.name}</span>
						<img  class='classify-center-bottom-border' style='display:none;' src="<%=path %>/public/images/classify/1_43.png" id='classifyBorder-${status.index}'>
					</c:if>
					
					<input type='hidden'
						<c:if test="${cl.built=='tv'}">value='category/videoList?categoryPid=2&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='variety'}">value='category/videoList?categoryPid=3&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='child'}">value='category/videoList?categoryPid=5&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='movie'}">value='category/videoList?categoryPid=1&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='homemade'}">value='category/videoList?categoryPid=120&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='ustv'}">value='category/videoList?categoryPid=130&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='koreantv'}">value='category/videoList?categoryPid=132&type=secondVideoList'</c:if>
						<c:if test="${cl.built=='record'}">value='category/videoList?categoryPid=4&type=secondVideoList'</c:if>>
				</div>
			</c:if>
		</c:forEach>
		
	</div>
</c:if>
</div>
<div id="homeFooter" class='home-footer'>
	<c:forEach var="footer" items="${footerList}" varStatus="status" >
		<div class='home-footer-list' style="left:${status.index*130}px">
			<input type="hidden" value="${footer.built}">
			<img src="<%=path %>/public/images/index/footerBg.jpg" style="display:none;position: absolute;top: 0px;left: 14px;"> 
			<div class='home-footer-span' style='color:#eff0f1;'>${footer.name}</div>
		</div>
	</c:forEach>
</div>
<img src="<%=path %>/public/images/exit/extBorder.png" id="exitBorder" class="home-extBorder" style="display:none">
<!-- 退出的弹窗 -->
<div id="exitConformBox" class="exit-conform-box" style="display:none;">
	<div class="e-box-content">
		<div class ="e-box-text">大家都在看这个,你不去看看?</div>
		<!--推荐位内容  -->
		<div class="exit-bottom" id="exitBottom">
		</div>
		<div id="homeExitBt" class="ext-bt">
			<div class="e-box-left">退出不看了</div>
			<div class="e-box-right">继续逛逛</div>
		</div>
	</div>
</div>
</div>
<input type="hidden" value="<%=loadType%>" id="loadType">
<input type="hidden" value="<%=basePath%>" id="path">
<input type="hidden" value="<%=modelMemory%>" id="modelMemory">
<input type="hidden" value="<%=typeMemory%>" id="typeMemory">
<input type="hidden" value="<%=focusElementMemory%>" id="focusElementMemory">
<input type="hidden" value="<%=urlMemory%>" id="urlMemory">
<input type="hidden" value="<%=focusElementIndexMemory%>" id="focusElementIndexMemory">

</body>


<script src="<%=path%>/public/js/epg.js"></script>
<script src="<%=path%>/public/js/home.js"></script>
<script src="<%=path%>/public/js/ajax.js"></script>


