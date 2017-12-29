
var SecondVideoList = {};

var secondVideoList = null;

SecondVideoList.Init = function ()
{
	this.secondVideoTabBg = $("secondVideoTabBg");
	this.secondVideoListBorder = $("secondVideoListBorder");
	this.secondVideoListTopBorder = $("secondVideoListTopBorder");
	this.categoryId = parseInt( $("categoryId").value);
	this.categoryPid = $("categoryPid").value;
	this.categoryType = $("categoryType").value;
	
	this.path = $("path").value;
	this.imgUrl = $("imgUrl").value;
	this.curPage = parseInt($("secondVideoListCurPage").innerText);
	this.pages = parseInt($("secondVideoListTotalPage").innerText);
	this.total = $("secondVideoListTotal").innerText;
	this.curHeader = "";
	this.rows = 10;
	this.rowsLimit = 5;
	this.tabLimit = 6;
	this.url = "category/getVideoList";	
	this.selectedTabIndex = 0;
	this.getUrl =function()
	{
		return "category/videoList?categoryId="+secondVideoList.categoryId+
		"&type=secondVideoList&rows="+secondVideoList.rows+"&categoryPid="+
		secondVideoList.categoryPid+"&page=" + secondVideoList.curPage;
	}
	//获取post数据
	this.getPostData =function(loadType)
	{
		var data = "category/videoList?categoryId="+secondVideoList.categoryId+
		"&type=secondVideoList&rows="+secondVideoList.rows+"&categoryPid="+
		secondVideoList.categoryPid+"&page=" + secondVideoList.curPage+
		"&lt="+loadType+"&lastFocusIndex="+epg.focusElementIndex;
		return data;
	}
};



SecondVideoList.Init.prototype.headerFocus = function(header, index) {
	index = parseInt(index);
	focusElement(header[index]);
	blurElement(_s(header[index], "img")[0]);
	focusElement(_s(header[index], "span")[0]);
	focusElement(_s(header[index], "img")[1]);
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
};

SecondVideoList.Init.prototype.headerBlur = function(header, index) {
	blurElement(_s(header[index], "img")[1]);
	focusElement(_s(header[index], "img")[0]);
	blurElement(_s(header[index], "span")[0]);
	blurElement(header[index]);
};

SecondVideoList.Init.prototype.contentLeftSelected = function(leftElement, index) {
	focusElement(getElementByTag(leftElement[index], "div"));
	none(secondVideoList.secondVideoTabBg);
	// blurElement(getElementByTag(leftElement[index], "img"));
};

SecondVideoList.Init.prototype.contentTopFocus = function(topElement, index) {
	index = parseInt(index);
	
	secondVideoList.secondVideoListTopBorder.style.left = 275+index*320+"px";
	block(secondVideoList.secondVideoListTopBorder);
	//epg.addScroll(getElementByTag(topElement[index], "span"), 10);
	//blockByClass(getElementByTag(topElement[index], "span"));
	epg.addScroll(getElementByTag(topElement[index], "div"), 10);
	blockByClass(getElementByTag(topElement[index], "div"));
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

SecondVideoList.Init.prototype.contentTopBlur = function(topElement, index)
{
	none(secondVideoList.secondVideoListTopBorder);
	//epg.delScroll(getElementByTag(topElement[index], "span"), getElementByTag(topElement[index], "marquee"));
	//noneByClass(getElementByTag(topElement[index], "span"));
	epg.delScroll(getElementByTag(topElement[index], "div"), getElementByTag(topElement[index], "marquee"));
	noneByClass(getElementByTag(topElement[index], "div"));
};

SecondVideoList.Init.prototype.contentLeftFocus = function(leftElement, index)
{
	focusElement(getElementByTag(leftElement[index], "div"));
	//focusElement(getElementByTag(leftElement[index], "img"));
	secondVideoList.secondVideoTabBg.style.top = 192+(index<6?index:5)*73+"px";
	block(secondVideoList.secondVideoTabBg);
	secondVideoList.selectedTabIndex = index;
	epg.focusElement = Epg.Init.prototype.focusPosition.contentLeft;
	secondVideoList.categoryId = getHiddenInputValue(leftElement[index]);
	epg.focusElementIndex = index;
};

SecondVideoList.Init.prototype.contentLeftBlur = function(leftElement, index)
{
	blurElement(getElementByTag(leftElement[index], "div"));
	none(secondVideoList.secondVideoTabBg);
	//blurElement(getElementByTag(leftElement[index], "img"));
};


/**
 * 左侧键盘元素聚焦
 * @param rightElement 左侧键盘元素集合
 * @param index 元素位置
 */
SecondVideoList.Init.prototype.contentRightFocus = function(rightElement, index)
{
	index = parseInt(index);
	if(index>rightElement.length-1)
	{
		index = 0;
	}
	if (rightElement[index]==undefined)
	{
		index = index+5;
	}
//	for (var i = 0; i < _s(rightElement[index],"img").length; i++)
//	{
//		focusElement( _s(rightElement[index],"img")[i]);
//	}
	epg.addScroll(getElementByTag(rightElement[index], "div"), 6);
	//secondVideoList.secondVideoListBorder.className = "secondVideoList-border"+index+" secondVideoList-border-on"
	secondVideoList.secondVideoListBorder.style.left = 275+(index>4?index-5:index)*198+"px";
	if (index<5)
	{
		secondVideoList.secondVideoListBorder.style.top = "199px";
	}else
	{
		secondVideoList.secondVideoListBorder.style.top = "439px";
	}
//	focusElement(secondVideoList.secondVideoListBorder);
	block(secondVideoList.secondVideoListBorder);
	epg.focusElement = Epg.Init.prototype.focusPosition.contentRight;
	epg.focusElementIndex = index;
};

/**
 * 左侧键盘元素聚焦
 * @param rightElement 左侧键盘元素集合
 * @param index 元素位置
 */
SecondVideoList.Init.prototype.contentRightBlur = function(rightElement, index)
{
//	for (var i = 0; i < _s(rightElement[index],"img").length; i++)
//	{
//		blurElement( _s(rightElement[index],"img")[i]);
//	}
	epg.delScroll(getElementByTag(rightElement[index], "div"),
			getElementByTag(rightElement[index], "marquee"));
	none(secondVideoList.secondVideoListBorder);
};

SecondVideoList.Init.prototype.setLeftTabSelectedStatus = function(loadType)
{
	for (var i = 0; i < epg.content.leftElement.length; i++)
	{
		if (parseInt(getHiddenInputValue(epg.content.leftElement[i]))==secondVideoList.categoryId)
		{
			if (loadType=="init")
			{
				secondVideoList.contentLeftFocus(epg.content.leftElement, i);
			}else
			{
				secondVideoList.contentLeftSelected(epg.content.leftElement, i);
			}
			secondVideoList.selectedTabIndex = i;
			break;
		}
	}
	for (var i = secondVideoList.selectedTabIndex-secondVideoList.tabLimit; i >= 0; i--)
	{
		noneByClass(epg.content.leftElement[i]);
	}
}

SecondVideoList.Init.prototype.moveUp = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentRight:
			if(epg.focusElementIndex>secondVideoList.rowsLimit-1&&epg.focusElementIndex<epg.content.rightElement.length) {
				secondVideoList.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				secondVideoList.contentRightFocus(epg.content.rightElement,epg.focusElementIndex-secondVideoList.rowsLimit);
			}else if(secondVideoList.curPage>1&&epg.focusElementIndex<secondVideoList.rowsLimit) {
				secondVideoList.curPage--;
				loadPage(secondVideoList.getPostData(Epg.Init.prototype.loadDataType.turnUp));
			}else if(epg.focusElementIndex<secondVideoList.rowsLimit) {
				if (epg.content.topElement.length>0){
					secondVideoList.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
					secondVideoList.contentTopFocus(epg.content.topElement, 0);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft:
			if(epg.focusElementIndex>0) {
				if (epg.focusElementIndex>=secondVideoList.tabLimit) {
					blockByClass(epg.content.leftElement[epg.focusElementIndex-secondVideoList.tabLimit]);
					noneByClass(epg.content.leftElement[epg.focusElementIndex]);
				}
				secondVideoList.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				secondVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-1);
				secondVideoList.curPage = 1;
				$("secondVideoListCurPage").innerText = 1;
				loadPage(secondVideoList.getPostData("switchTab"));
			}else if(epg.header.length>0) {
				secondVideoList.contentLeftSelected(epg.content.leftElement,epg.focusElementIndex);
				secondVideoList.headerFocus(epg.header, 0);
			}
			break;
	}
};

SecondVideoList.Init.prototype.moveDown = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header:
			if (epg.content.leftElement.length>0)
			{
				secondVideoList.headerBlur(epg.header, epg.focusElementIndex);
				secondVideoList.contentLeftFocus(epg.content.leftElement,secondVideoList.selectedTabIndex);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			if (epg.focusElementIndex<secondVideoList.rows-secondVideoList.rowsLimit&&
					(secondVideoList.curPage-1)*secondVideoList.rows+epg.focusElementIndex+1+secondVideoList.rowsLimit<=secondVideoList.total)
			{
				secondVideoList.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				secondVideoList.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+secondVideoList.rowsLimit);
			}else if(epg.focusElementIndex>=secondVideoList.rows-secondVideoList.rowsLimit&&secondVideoList.curPage<secondVideoList.pages)
			{
				//翻页
				secondVideoList.curPage++;
				loadPage(secondVideoList.getPostData(Epg.Init.prototype.loadDataType.turnDown));
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft:
			if (epg.focusElementIndex<epg.content.leftElement.length-1)
			{
				if (epg.focusElementIndex>=secondVideoList.tabLimit-1)
				{
					noneByClass(epg.content.leftElement[epg.focusElementIndex-secondVideoList.tabLimit+1]);
					blockByClass(epg.content.leftElement[epg.focusElementIndex+1]);
				}
				secondVideoList.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				secondVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+1);
				secondVideoList.curPage = 1;
				$("secondVideoListCurPage").innerText = 1;
				loadPage(secondVideoList.getPostData("switchTab"));
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if (epg.content.rightElement.length>0)
			{
				secondVideoList.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				secondVideoList.contentRightFocus(epg.content.rightElement,0);
			}
			break;
	}
};

SecondVideoList.Init.prototype.moveLeft = function()
{
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentRight:
			if(epg.focusElementIndex%secondVideoList.rowsLimit!=0) {
				secondVideoList.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				secondVideoList.contentRightFocus(epg.content.rightElement,epg.focusElementIndex-1);
			}else {
				secondVideoList.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				secondVideoList.contentLeftFocus(epg.content.leftElement,secondVideoList.selectedTabIndex);
				
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if (epg.focusElementIndex>0) {
				secondVideoList.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				secondVideoList.contentTopFocus(epg.content.topElement,epg.focusElementIndex-1);
			}else if (epg.header.length>0) {
				secondVideoList.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				secondVideoList.headerFocus(epg.header,0);
			}
			break;
	}
};

SecondVideoList.Init.prototype.moveRight = function() {
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.header:
			if (epg.content.topElement.length>0) {
				secondVideoList.headerBlur(epg.header, epg.focusElementIndex);
				secondVideoList.contentTopFocus(epg.content.topElement, 0);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			if ((epg.focusElementIndex+1)%secondVideoList.rowsLimit!=0) {
				if(epg.focusElementIndex+1<=epg.content.rightElement.length-1) {
					secondVideoList.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
					secondVideoList.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+1);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft:
			if (epg.content.topElement.length>0) {
				secondVideoList.contentLeftSelected(epg.content.leftElement,epg.focusElementIndex);
				secondVideoList.contentTopFocus(epg.content.topElement,0);
			}else {
				if(epg.content.rightElement.length>0){
					secondVideoList.contentLeftSelected(epg.content.leftElement,epg.focusElementIndex);
					secondVideoList.contentRightFocus(epg.content.rightElement,0);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if (epg.focusElementIndex<epg.content.topElement.length-1) {
				secondVideoList.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				secondVideoList.contentTopFocus(epg.content.topElement,epg.focusElementIndex+1);
			}
			break;
	}
};

SecondVideoList.Init.prototype.enter = function()
{
	var url = "";
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header:
			url = epg.getDetailPageUrl(epg.header[epg.focusElementIndex],secondVideoList.curPage,
					secondVideoList.categoryPid);
			epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(url);
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			url = epg.getDetailPageUrl(epg.content.rightElement[epg.focusElementIndex],secondVideoList.curPage,
					secondVideoList.categoryId);
			epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(url);
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			url = Epg.Init.prototype.getDetailPageUrl(epg.content.topElement[epg.focusElementIndex]);
			epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(url);
			break;
	}
}

/**
 * 翻页后初始化焦点
 */
SecondVideoList.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	switch (loadType)
	{
		case "switchTab":
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				secondVideoList.selectedTabIndex = parseInt($("lastFocusIndex").value);
			}
			secondVideoList.contentLeftFocus(epg.content.leftElement, secondVideoList.selectedTabIndex);
			if (secondVideoList.selectedTabIndex>secondVideoList.tabLimit-1)
			{
				for (var i = secondVideoList.selectedTabIndex-secondVideoList.tabLimit; i >= 0; i--)
				{
					noneByClass(epg.content.leftElement[i]);
				}
			}
			break;
 		case Epg.Init.prototype.loadDataType.turnUp://向上翻页
 			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
 			secondVideoList.setLeftTabSelectedStatus(loadType);
 			setTimeout("secondVideoList.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+secondVideoList.rowsLimit)",500);
			break;
		case Epg.Init.prototype.loadDataType.turnDown://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			secondVideoList.setLeftTabSelectedStatus(loadType);
			setTimeout("secondVideoList.contentRightFocus(epg.content.rightElement,epg.focusElementIndex>0?epg.focusElementIndex-secondVideoList.rowsLimit:0)","500");
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (epg.content.leftElement.length>0)
			{
				secondVideoList.setLeftTabSelectedStatus(loadType);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			
			switch (position)
			{
				case epg.focusPosition.header:
					secondVideoList.headerFocus(epg.header,index);
					break;
				case epg.focusPosition.contentRight:
					secondVideoList.contentRightFocus(epg.content.rightElement,index);
					break;
				case epg.focusPosition.contentTop:
					secondVideoList.contentTopFocus(epg.content.topElement,index);
					break;
			}
			secondVideoList.setLeftTabSelectedStatus(loadType);
			break;
	}
}



SecondVideoList.Init.prototype.initModel = function(loadType)
{
	secondVideoList = new SecondVideoList.Init();
	secondVideoList.initFocusAfterLoadData(loadType);
};
