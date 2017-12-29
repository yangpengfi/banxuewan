/**
 * 所有可见一级页面（主页，美剧，韩剧，自制，少儿，专题，分类）
 * header+content(homeLeft+homeRight)+footer
 */
var Home = {};// 命名空间

var home = null;

Home.Init = function() {

	this.selectedIndex = 0;// 默认选中第0个当前屏幕在导航菜单第0个
	this.limit = 3;// 左侧一列元素个数
	this.classifyLimit = 4;// 分类页面左侧一列元素个数
	this.headerBg = $("headerBg");
	this.conformBox = $("exitConformBox");
	this.conformBoxElement = _s(getElementByTag(this.conformBox, "div"), "div");
	this.path = $("path").value;
	this.exitVideo = $("exitBottom").children;
	this.exitBt = $("homeExitBt").children;
	this.exitBorder = $("exitBorder");
	this.focusElement = epg.focusElement;

};

Home.Init.prototype.focusPosition = {
	homeExtBt : 'homeExtBt',
	homeExtVideoList : 'homeExtVideoList'
};

/**
 * 获取主页每个页面的url
 * @param type 页面类型
 * @param loadType 加载类型
 * @returns {String} 返回URL
 */
Home.Init.prototype.getFooterUrlByType = function(type, loadType) {
	return "doindex?type=" + type + "&lt=" + loadType;
}

/**
 * 根据页面类型获取footer导航菜单位置
 * @param type 页面类型
 * @returns {Number} 导航菜单位置
 */
Home.Init.prototype.getFooterIndexByType = function(type) {
	for (var i = 0; i < epg.footer.length; i++) {
		if (getHiddenInputValue(epg.footer[i]) == epg.type) {
			return i;
		}
	}
}



/**
 * 主页header聚焦方法
 * @param header 聚焦元素
 * @param index 聚焦元素位置
 */
Home.Init.prototype.headerFocus = function(header, index) {
	index = parseInt(index);
	var imgs = _s(header[index], 'img');
	block(home.headerBg);
	home.headerBg.style.left = 780 + 110 * index + "px";
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
}

/**
 * 主页header失去焦点方法
 * @param header 失去焦点元素
 * @param index 失去焦点元素位置
 */
Home.Init.prototype.headerBlur = function(header, index) {
	var imgs = _s(header[index], "img");
	none(home.headerBg);
}

/**
 * 主页footer聚焦方法
 * 
 * @param footer
 *            聚焦元素
 * @param index
 *            聚焦元素位置
 */
Home.Init.prototype.footerFocus = function(footer, index) {
	//document.getElementById('info_test').innerHTML += "<p> home.js执行initModel方法，聚焦导航栏，索引：" + index + "</p>";
	block(getElementByTag(footer[index], "img"));
	getElementByTag(footer[index], "div").style.color = '#ffc000';
	epg.focusElement = Epg.Init.prototype.focusPosition.footer;
	epg.focusElementIndex = index;
	epg.type = getHiddenInputValue(footer[index]);
}

/**
 * 主页footer失去焦点方法
 * 
 * @param footer
 *            失去焦点元素
 * @param index
 *            失去焦点元素位置
 */
Home.Init.prototype.footerBlur = function(footer, index) {
	none(getElementByTag(footer[index], "img"));
	getElementByTag(footer[index], "div").style.color = '#eff0f1';

}

/**
 * 导航菜单位置记忆
 * 
 * @param footer
 * @param index
 */
Home.Init.prototype.footerSelect = function(footer, index) {
	none(getElementByTag(footer[index], "img"));
	getElementByTag(footer[index], "div").style.color = '#ffc000';
	home.selectedIndex = index;
	epg.type = getHiddenInputValue(footer[index]);
}

/**
 * 主页 content 左侧元素聚焦方法
 * 
 * @param leftElement
 *            聚焦元素
 * @param index
 *            聚焦位置
 */
Home.Init.prototype.contentLeftFocus = function(leftElement, index) {
	index = parseInt(index);
	if (epg.type == Epg.Init.prototype.type.classify) {
		block($("classifyBorder-" + index));
	} else {
		block($('homeLeft-' + index));
		if (index == 0) {
			epg.addScroll(getElementByTag(getElementByTag(leftElement[index], "div"), "span"), 13);
		} else {
			epg.addScroll(getElementByTag(leftElement[index], "div"), 6);
		}
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.contentLeft;
	epg.focusElementIndex = index;
}

/**
 * 主页 content 左侧元素失去焦点方法
 * 
 * @param leftElement
 *            失去焦点元素
 * @param index
 *            失去焦点元素位置
 */
Home.Init.prototype.contentLeftBlur = function(leftElement, index) {
	if (epg.type == Epg.Init.prototype.type.classify) {
		none($("classifyBorder-" + index));
	} else {
		none($('homeLeft-' + index));
		if (index == 0) {
			epg.delScroll(getElementByTag(getElementByTag(leftElement[index], "div"), "span"), getElementByTag(leftElement[index], "marquee"));
		} else {
			epg.delScroll(getElementByTag(leftElement[index], "div"), getElementByTag(leftElement[index], "marquee"));
		}
	}
}




/**
 * 主页 content 右侧元素聚焦方法
 * 
 * @param rightElement
 *            聚焦元素
 * @param index
 *            聚焦位置
 */
Home.Init.prototype.contentRightFocus = function(rightElement, index) {
	index = parseInt(index);
	if (index > 2) {
		if (index != 3) {// 为排行榜时不进
			epg.addScroll(getElementByTag(rightElement[index], "div"), 8);
		}
	} else {
		epg.addScroll(getElementByTag(getElementByTag(rightElement[index], "div"), "span"), 8);
	}
	block($("homeRightBorder-" + index));
	epg.focusElement = Epg.Init.prototype.focusPosition.contentRight;
	epg.focusElementIndex = index;
}

/**
 * 主页 content 右侧元素失去焦点方法
 * 
 * @param rightElement
 *            失去焦点元素
 * @param index
 *            失去焦点元素位置
 */
Home.Init.prototype.contentRightBlur = function(rightElement, index) {

	if (index > 2) {
		epg.delScroll(getElementByTag(rightElement[index], "div"), getElementByTag(rightElement[index], "marquee"));
	} else {
		epg.delScroll(getElementByTag(getElementByTag(rightElement[index], "div"), "span"), getElementByTag(rightElement[index], "marquee"));
	}
	none($("homeRightBorder-" + index));
}


/**
 * 换屏操作
 * 
 * @param loadType
 *            加载类型
 */
Home.Init.prototype.switchScreen = function(loadType) {
	if (loadType == Epg.Init.prototype.loadDataType.turnLeft) {
		home.selectedIndex = home.selectedIndex - 1;
	} else {
		home.selectedIndex = home.selectedIndex + 1;
	}
	epg.type = getHiddenInputValue(epg.footer[home.selectedIndex]);
	var url = Home.Init.prototype.getFooterUrlByType(epg.type, loadType);
	window.location.href = Epg.Init.prototype.path + url;
}

/**
 * 主页焦点上移方法
 * 
 */
Home.Init.prototype.moveUp = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.footer://从footer上移聚焦历史收藏
			Home.Init.prototype.footerSelect(epg.footer,epg.focusElementIndex);//变为选中状态
			if(epg.type==Epg.Init.prototype.type.classify) {
				Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 0);//
			} else {
				Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 1);//聚焦左侧第一个div
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft://从homeLeft上移
			Home.Init.prototype.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);//去掉当前焦点
			if(epg.type==Epg.Init.prototype.type.classify)//当前页面是分类
			{
				if(epg.focusElementIndex>home.classifyLimit-1) {
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement, epg.focusElementIndex-home.classifyLimit);
				}else {
					Home.Init.prototype.headerFocus(epg.header, 0);//默认聚焦header第1个元素（搜索）
				}
			}else
			{
				if(epg.focusElementIndex>0)//从第一个或第二个元素上移（历史收藏/限时免费）
				{
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 0);//聚焦到柱推荐位
				}else//从第0个上移（柱推荐位）
				{
					Home.Init.prototype.headerFocus(epg.header, 0);//默认聚焦header第1个元素（搜索）
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight://从homeRight上移
			Home.Init.prototype.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);//去掉当前焦点
			if(epg.focusElementIndex>home.limit-1)//rightElement下侧上移到rightElement上侧
			{
				Home.Init.prototype.contentRightFocus(epg.content.rightElement, epg.focusElementIndex-home.limit);//聚焦到柱推荐位
			}else//从rightElement上侧移到header
			{
				Home.Init.prototype.headerFocus(epg.header, 0);//默认聚焦header第1个元素（搜索）
			}
			break;
		case home.focusPosition.homeExtBt:
			home.conformBoxBtBlur(home.exitBt,epg.focusElementIndex);
			home.conformBoxVideoFocus(home.exitVideo,0);
			break;
	}
}

/**
 * 主页焦点下移方法
 * 
 */
Home.Init.prototype.moveDown = function()
{
	switch (epg.focusElement)
	{
		case  home.focusPosition.homeExtVideoList:
			home.conformBoxVideoBlur(home.exitVideo,epg.focusElementIndex);
			home.conformBoxBtFocus(home.exitBt,0);
		break;
		case Epg.Init.prototype.focusPosition.header://从header下移
			Home.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);//去掉当前焦点
			Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 0);//默认聚焦左侧第0个div
			break;
		case Epg.Init.prototype.focusPosition.contentLeft://从homeLeft下移
			Home.Init.prototype.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);//去掉当前焦点
			if(epg.type==Epg.Init.prototype.type.classify)//当前页面是分类
			{
				if(epg.focusElementIndex<home.classifyLimit) {
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+home.classifyLimit);//默认聚焦左侧第1个元素（历史收藏）
				}else {
					Home.Init.prototype.footerFocus(epg.footer,home.selectedIndex);//默认聚焦到当前页面对应的footer元素
				}
			}else
			{
				if(epg.focusElementIndex>0)//从第一个或第二个元素下移（历史收藏/限时免费）
				{
					Home.Init.prototype.footerFocus(epg.footer, home.selectedIndex);//默认聚焦到当前页面对应的footer元素
				}else//从第0个下移（柱推荐位）
				{
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 1);//默认聚焦左侧第1个元素（历史收藏）
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight://从homeLeft下移
			if(epg.focusElementIndex+home.limit<epg.content.rightElement.length)//从rightElement上方移到rightElement下方
			{
				Home.Init.prototype.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);//去掉当前焦点
				Home.Init.prototype.contentRightFocus(epg.content.rightElement, epg.focusElementIndex+home.limit);//默认聚焦左侧第1个元素（历史收藏）
			}else//从rightElement下方移到footer
			{
				Home.Init.prototype.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);//去掉当前焦点
				Home.Init.prototype.footerFocus(epg.footer, home.selectedIndex);//默认聚焦到当前页面对应的footer元素
			}
			break;
	}
}

/**
 * 主页焦点右移方法
 */
Home.Init.prototype.moveRight = function()
{
	switch (epg.focusElement)
	{
		case  home.focusPosition.homeExtVideoList:
			if(epg.focusElementIndex<home.exitVideo.length-1) {
				home.conformBoxVideoBlur(home.exitVideo,epg.focusElementIndex);
				home.conformBoxVideoFocus(home.exitVideo,epg.focusElementIndex+1);
			}
			break;
		case  home.focusPosition.homeExtBt:
			if(epg.focusElementIndex==0) {
				home.conformBoxBtBlur(home.exitBt,epg.focusElementIndex);
				home.conformBoxBtFocus(home.exitBt,epg.focusElementIndex+1);
			}
			break;
		case Epg.Init.prototype.focusPosition.header://从header右移
			if(epg.focusElementIndex<epg.header.length-1) {
				Home.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);//去掉当前焦点
				Home.Init.prototype.headerFocus(epg.header, epg.focusElementIndex+1);//聚焦
			}
			break;
		case Epg.Init.prototype.focusPosition.footer://从footer右移聚焦到下一个footer元素
			if(epg.focusElementIndex<epg.footer.length-1) {
				Home.Init.prototype.footerBlur(epg.footer, epg.focusElementIndex);//去掉footer焦点
				Home.Init.prototype.footerFocus(epg.footer, epg.focusElementIndex+1);//聚焦
				Home.Init.prototype.enter();
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft://从homeLef右移
			if(epg.type==Epg.Init.prototype.type.classify) {
				if(epg.focusElementIndex<epg.content.leftElement.length-1) {
					Home.Init.prototype.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);//去掉当前焦点
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement, epg.focusElementIndex+1);
				}
			}else {
				Home.Init.prototype.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);//去掉当前焦点
				if(epg.focusElementIndex==0) {//主推荐位限时免费移到副推荐位
					Home.Init.prototype.contentRightFocus(epg.content.rightElement,epg.focusElementIndex);//移到副推荐位的第0个
				}else if(epg.focusElementIndex==2) {
					Home.Init.prototype.contentRightFocus(epg.content.rightElement,3);//移到副推荐位的第3个
				}else {//历史收藏移到限时免费
					if (epg.content.leftElement.length==3) {
						Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 2);//默认聚焦左侧第2个元素（限时免费）
					}else {
						Home.Init.prototype.contentRightFocus(epg.content.rightElement,3);
					}
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight://从homeRight右移
			if(epg.focusElementIndex+1<epg.content.rightElement.length
					&&(epg.focusElementIndex+1)%home.limit!=0){//副推荐位从左侧移到右侧
				Home.Init.prototype.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);//去掉当前焦点
				Home.Init.prototype.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+1);//移到副推荐位的第0个或者第2个
			}else {//历史收藏移到限时免费
				Home.Init.prototype.switchScreen(Epg.Init.prototype.loadDataType.turnRight);
			}
			break;
	}
}


/**
 * 主页焦点左移方法
 */
Home.Init.prototype.moveLeft = function()
{
	switch (epg.focusElement) {
		case  home.focusPosition.homeExtVideoList:
			if(epg.focusElementIndex>0) {
			home.conformBoxVideoBlur(home.exitVideo,epg.focusElementIndex);
			home.conformBoxVideoFocus(home.exitVideo,epg.focusElementIndex-1);
		}
		break;
		case home.focusPosition.homeExtBt:
			if(epg.focusElementIndex==1) {
				home.conformBoxBtBlur(home.exitBt,epg.focusElementIndex);
				home.conformBoxBtFocus(home.exitBt,epg.focusElementIndex-1);
			}
			break;
		case Epg.Init.prototype.focusPosition.header://从header左移
			if(epg.focusElementIndex>0) {
				Home.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);//去掉当前焦点
				Home.Init.prototype.headerFocus(epg.header, epg.focusElementIndex-1);//聚焦
			}
			break;
		case Epg.Init.prototype.focusPosition.footer://从footer左移聚焦到上一个footer元素
			if(epg.focusElementIndex>0) {	
				Home.Init.prototype.footerBlur(epg.footer, epg.focusElementIndex);//去掉footer焦点
				Home.Init.prototype.footerFocus(epg.footer, epg.focusElementIndex-1);//聚焦
				Home.Init.prototype.enter();
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft://从homeLef左移
			if(epg.type==Epg.Init.prototype.type.classify) {//当前页面是分类
				if(epg.focusElementIndex!=0&&epg.focusElementIndex!=4) {
					Home.Init.prototype.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-1);
				}else {
					Home.Init.prototype.switchScreen(Epg.Init.prototype.loadDataType.turnLeft);
				}
			}else {
				if(epg.focusElementIndex==2) {//从限时免费左移
					Home.Init.prototype.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);//去掉当前焦点
					Home.Init.prototype.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-1);//移到历史收藏
				}else {
					if(epg.type!=Epg.Init.prototype.type.home) {
						Home.Init.prototype.switchScreen(Epg.Init.prototype.loadDataType.turnLeft);
					}
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight://从homeRight左移
			Home.Init.prototype.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);//去掉当前焦点
			if (epg.focusElementIndex%home.limit==0) {
				var i = epg.focusElementIndex==0?0:(epg.content.leftElement.length-1);
				Home.Init.prototype.contentLeftFocus(epg.content.leftElement,i);
			}else {
				Home.Init.prototype.contentRightFocus(epg.content.rightElement,epg.focusElementIndex-1);
			}
			break;
	}
}

Home.Init.prototype.enter = function() {
	var url = "";
	var link = "";
	switch (epg.focusElement) {
		case home.focusPosition.homeExtBt:
			if (epg.focusElementIndex == 0) {
				home.hideConformBox(home.lastFocusElement, home.lastFocusIndex);
				window.location.href = GlobalVarManager.getItemStr("tvPortalUrl");
				return;
			} else if(epg.focusElementIndex == 1) {
				home.hideConformBox(home.lastFocusElement, home.lastFocusIndex);
				return;
			}
			break;
		case home.focusPosition.homeExtVideoList:
			link=home.exitVideo[epg.focusElementIndex].getElementsByTagName("input")[2].value;
			if(link !="link"){
				url = Epg.Init.prototype.getDetailPageUrl(home.exitVideo[epg.focusElementIndex]);
			}else{
				window.location.href=home.exitVideo[epg.focusElementIndex].getElementsByTagName("input")[3].value;
			}
			break;
		case Epg.Init.prototype.focusPosition.footer:
			url = Home.Init.prototype.getFooterUrlByType(epg.type);
			window.location.href = Epg.Init.prototype.path+url;
			break;
			
		case Epg.Init.prototype.focusPosition.header:
			if (getHiddenInputValue(epg.header[epg.focusElementIndex])=="exit") {
				home.headerBlur(epg.header, epg.focusElementIndex);
				home.lastFocusIndex = epg.focusElementIndex;
				home.lastFocusElement  = epg.focusElement;
				home.showConformBox("大家都在看这个，你不去看看？");
			}else {
				url = getHiddenInputValue(epg.header[epg.focusElementIndex]);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft:
			 if(epg.type !=Epg.Init.prototype.model.home && epg.type!=Epg.Init.prototype.type.classify &&epg.focusElementIndex != 1){
				if(epg.type==Epg.Init.prototype.type.classify) {
					link = getHiddenInputValue(epg.content.leftElement[epg.focusElementIndex]);
				}else {
					link=epg.content.leftElement[epg.focusElementIndex].getElementsByTagName("input")[3].value;
				}
			}else if(epg.focusElementIndex==0 && epg.type!=Epg.Init.prototype.type.classify){
				link=epg.content.leftElement[epg.focusElementIndex].getElementsByTagName("input")[3].value;
			}
			if(link !="link") {
				var hiddeInputValue = getHiddenInputValue(epg.content.leftElement[epg.focusElementIndex]);
				if(epg.type==Epg.Init.prototype.type.classify) {
					url = hiddeInputValue;
				}else  {
					if(epg.focusElementIndex ==2 &&epg.content.leftElement[epg.focusElementIndex].children[0].value =="chart/searchChart"){//排行榜
						url=epg.content.leftElement[epg.focusElementIndex].children[0].value;
					}else{
						url = Epg.Init.prototype.getDetailPageUrl(epg.content.leftElement[epg.focusElementIndex]);
					}
				}
			}else{
				window.location.href=epg.content.leftElement[epg.focusElementIndex].getElementsByTagName("input")[4].value;
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight://副推荐位进入详情页
			link=epg.content.rightElement[epg.focusElementIndex].getElementsByTagName("input")[3].value;
			if(link !="link"){
				url = Epg.Init.prototype.getDetailPageUrl(epg.content.rightElement[epg.focusElementIndex])
			}else{
				window.location.href=epg.content.rightElement[epg.focusElementIndex].getElementsByTagName("input")[4].value;
			}
			break;
	}
	if (epg.focusElement!=Epg.Init.prototype.focusPosition.footer
			&&epg.focusElement!=home.focusPosition.homeExtBt
			&&link != "link") {
		if(epg.focusElement==Epg.Init.prototype.focusPosition.header){
			if (getHiddenInputValue(epg.header[epg.focusElementIndex])!="exit") {
				epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
				loadPage(url);
			}
		}else{
			epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(url);
		}
	}
}

/*******************************************************************************
 * 显示确认退出弹框
 */
Home.Init.prototype.showConformBox = function(text, loadType, index) {
	//window.location.href=epg.path+"/index"; 
	block(home.conformBox);
	//获取conformBox中第一个div元素中的第一个div元素并赋值
	home.conformBoxElement[0].innerText = text;
	ajax({
		type : "post",
		url : home.path+"exit",
		dataType : "json",
		success : function(data) {
			var list = data.recomandList_Exit;
			var str = "";
			for (var i = 0; i < list.length; i++) {
				var left = 26 + i * 174;
				var item = list[i];
				str += '<div class="exit-bottom-div" style="left:'+left+'px;">'
				str += '<img  src="' + data.imgUrl + item.poster + '"class="exit-bottom-poster" />'
						+ '<input type="hidden" value="' + item.templateModel + '" />' 
						+ '<input type="hidden" value="' + item.id + '" />' 
						+ '<input type="hidden" value="' + item.property + '" />'
						+ '<input type="hidden" value="' + item.link + '" />';
				if (item.property != "link") {
					str += '<div class="exit-bottom-span">' + item.title + '</div>';
				}
				if (item.mark != null && item.mark != "") {
					str += "<img class='Exit-Mark-" + i + "' src='" + data.imgUrl + item.mark + " ' /> ";
				}
				str += '</div>';
			}
			$("exitBottom").innerHTML = str;
			if (loadType == "memory") {
				home.conformBoxVideoFocus(home.exitVideo, index);
			} else {
				home.conformBoxBtFocus(home.exitBt, 1);
			}
		}
	});
}

/**
 * 隐藏确认退出弹框
 */
Home.Init.prototype.hideConformBox = function(position, index) {
	none(home.conformBox);
	home.conformBoxBtBlur(home.exitBt, epg.focusElementIndex);
	switch (position) {
	case Epg.Init.prototype.focusPosition.contentLeft:
		home.contentLeftFocus(epg.content.leftElement, index);
		break;
	case Epg.Init.prototype.focusPosition.contentRight:
		home.contentRightFocus(epg.content.rightElement, index);
		break;
	case Epg.Init.prototype.focusPosition.header:
		home.headerFocus(epg.header, index);
		break;
	case Epg.Init.prototype.focusPosition.footer:
		home.footerFocus(epg.footer, index);
		break;
	default:
		home.headerFocus(epg.header, 0);
		break;
	}
}


Home.Init.prototype.conformBoxBtFocus = function(bt, index) {
	focusElement(bt[index]);
	epg.focusElement = home.focusPosition.homeExtBt;
	epg.focusElementIndex = index;
};

Home.Init.prototype.conformBoxBtBlur = function(bt, index) {
	blurElement(bt[index]);
};

Home.Init.prototype.conformBoxVideoFocus = function(video, index) {
	index = parseInt(index);
	block(home.exitBorder);
	epg.addScroll(getElementByTag(video[index], "span"), 6);
	home.exitBorder.style.left = 391 + index * 174 + "px";
	epg.focusElement = home.focusPosition.homeExtVideoList;
	epg.focusElementIndex = index;
};

Home.Init.prototype.conformBoxVideoBlur = function(video, index) {
	epg.delScroll(getElementByTag(video[index], "span"), getElementByTag(video[index], "marquee"));
	none(home.exitBorder);
};

/**
* 处理主页加载的数据以及初始化焦点
*/
Home.Init.prototype.initModel = function(loadType) {

	home = new Home.Init();
	switch (loadType) {
		case Epg.Init.prototype.loadDataType.turnLeft:
			Home.Init.prototype.footerBlur(epg.footer,home.getFooterIndexByType(epg.type)+1);
			Home.Init.prototype.footerSelect(epg.footer,home.getFooterIndexByType(epg.type));//位置记忆状态
			Home.Init.prototype.contentRightFocus(epg.content.rightElement,home.limit-1);
			break;
		case Epg.Init.prototype.loadDataType.turnRight:
			Home.Init.prototype.footerBlur(epg.footer,home.getFooterIndexByType(epg.type)-1);
			Home.Init.prototype.footerSelect(epg.footer,home.getFooterIndexByType(epg.type));//位置记忆状态
			Home.Init.prototype.contentLeftFocus(epg.content.leftElement,0);
			break;
		case Epg.Init.prototype.loadDataType.init:
			if(epg.type == "homepage"){
				Home.Init.prototype.contentLeftFocus(epg.content.leftElement, 0);//聚焦到主推荐位
				getElementByTag(epg.footer[home.getFooterIndexByType(epg.type)],"div").style.color = '#ffc000';
				Home.Init.prototype.footerSelect(epg.footer,home.getFooterIndexByType(epg.type));//变为选中状态
			}else{
				home.footerFocus(epg.footer,home.getFooterIndexByType(epg.type));
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			var position = Epg.focusElementMemory.pop();
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var index = Epg.focusElementIndexMemory.pop();
			switch (position) {
				case Epg.Init.prototype.focusPosition.contentLeft:
					home.contentLeftFocus(epg.content.leftElement, index);
					break;
				case Epg.Init.prototype.focusPosition.contentRight:
					home.contentRightFocus(epg.content.rightElement, index);
					break;
				case Epg.Init.prototype.focusPosition.header:
					home.headerFocus(epg.header, index);
					break;
				case home.focusPosition.homeExtVideoList:
					home.showConformBox("大家都在看这个，你不去看看？",loadType,index);
					break;
			}
			for (var i = 0; i < epg.footer.length; i++) {
				if (getHiddenInputValue(epg.footer[i])==epg.type) {
					home.selectedIndex = i;
					break;
				}
			}
			home.footerSelect(epg.footer,home.selectedIndex);
			home.lastFocusIndex = home.selectedIndex;
			home.lastFocusElement  = Epg.Init.prototype.focusPosition.footer;
			break;
	}

};


