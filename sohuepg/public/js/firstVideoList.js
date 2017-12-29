
var FirstVideoList = {};

var firstVideoList = null;

FirstVideoList.Init = function ()
{
	this.firstVideoListBorder = $("firstVideoListBorder");
	this.categoryId = $("categoryId").value;
	this.path = $("path").value;
	this.imgUrl = $("imgUrl").value;
	this.curPage = $("firstVideoListCurPage").innerText;
	this.pages = $("firstVideoListTotalPage").innerText;
	this.total = $("firstVideoListTotal").innerText;
	
	//获取post数据
	this.getPostData =function(loadType)
	{
		return "category/videoList?type="+epg.type+"&categoryId="+firstVideoList.categoryId+ 
		"&lt="+loadType+"&lastFocusIndex="+epg.focusElementIndex+"&page=" + firstVideoList.curPage;
	}
	
	this.getUrl =function()
	{
		return "category/videoList?type="+epg.type+"&categoryId="+firstVideoList.categoryId+ "&page=" + firstVideoList.curPage;
	}
};



/**
 * 左侧键盘元素聚焦
 * @param leftElement 左侧键盘元素集合
 * @param index 元素位置
 */
FirstVideoList.Init.prototype.contentLeftFocus = function(leftElement, index)
{
	index = parseInt(index);
	if(index>leftElement.length-1)
	{
		index = 0;
	}
	if (leftElement[index]==undefined)
	{
		index = index+5;
	}
//	for (var i = 0; i < _s(leftElement[index],"img").length; i++)
//	{
//		focusElement( _s(leftElement[index],"img")[i]);
//	}
//	if (!isNullOrEmpty(_s(leftElement[index],'img')[1]))
//	{
//		_s(leftElement[index],'img')[1].style.left = (index>5?index-6:index)*191+"px";
//		if (index<6)
//		{
//			_s(leftElement[index],'img')[1].style.top = "0px";
//		}else
//		{
//			_s(leftElement[index],'img')[1].style.top = "280px";
//		}
//	}
//	firstVideoList.firstVideoListBorder.className = "firstVideoList-border"+index+" firstVideoList-border-on"
//	focusElement(firstVideoList.firstVideoListBorder);
	firstVideoList.firstVideoListBorder.style.left = 71+(index>5?index-6:index)*191+"px";
	if (index<6)
	{
		firstVideoList.firstVideoListBorder.style.top = "95px";
	}else
	{
		firstVideoList.firstVideoListBorder.style.top = "385px";
	}
	block(firstVideoList.firstVideoListBorder);
	epg.addScroll(getElementByTag(leftElement[index], "div"), 6);
	epg.focusElement = Epg.Init.prototype.focusPosition.contentRight;
	epg.focusElementIndex = index;
};

/**
 * 左侧键盘元素聚焦
 * @param leftElement 左侧键盘元素集合
 * @param index 元素位置
 */
FirstVideoList.Init.prototype.contentLeftBlur = function(leftElement, index)
{
//	for (var i = 0; i < _s(leftElement[index],"img").length; i++)
//	{
//		blurElement( _s(leftElement[index],"img")[i]);
//	}
//	if (!isNullOrEmpty(_s(leftElement[index],'img')[1]))
//	{
//		_s(leftElement[index],'img')[1].style.left = 10+(index>5?index-6:index)*191+"px";
//		if (index<6)
//		{
//			_s(leftElement[index],'img')[1].style.top = "10px";
//		}else
//		{
//			_s(leftElement[index],'img')[1].style.top = "290px";
//		}
//	}
	epg.delScroll(getElementByTag(leftElement[index], "div"), getElementByTag(leftElement[index], "marquee"));
	none(firstVideoList.firstVideoListBorder);
};

FirstVideoList.Init.prototype.moveUp = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentRight:
			if(epg.focusElementIndex>5&&epg.focusElementIndex<epg.content.leftElement.length)
			{
				firstVideoList.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				firstVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-6);
			}
			break;
	}
};

FirstVideoList.Init.prototype.moveDown = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentRight:
			if (epg.focusElementIndex<6&&epg.focusElementIndex+6<=epg.content.leftElement.length-1)
			{
				firstVideoList.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				firstVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+6);
			}
			break;
	}
};

FirstVideoList.Init.prototype.moveLeft = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentRight:
			if(epg.focusElementIndex%6!=0)
			{
				firstVideoList.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				firstVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-1);
			}else if(firstVideoList.curPage>1)
			{
				//翻页
				epg.InitElement();
				firstVideoList.curPage--;
				loadPage(firstVideoList.getPostData(Epg.Init.prototype.loadDataType.turnLeft));
			}
			break;
	}
};

FirstVideoList.Init.prototype.moveRight = function()
{
	
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentRight:
			if ((epg.focusElementIndex+1)%6!=0)
			{
				if(epg.focusElementIndex+1<=epg.content.leftElement.length-1)
				{
					firstVideoList.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
					firstVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+1);
				}
			}else if(firstVideoList.curPage<firstVideoList.pages)
			{
				//翻页
				firstVideoList.curPage++;
				loadPage(firstVideoList.getPostData(Epg.Init.prototype.loadDataType.turnRight));
			}
			break;
	}
};

FirstVideoList.Init.prototype.enter = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentRight:
			var videoCategory = _s(epg.content.leftElement[epg.focusElementIndex],"input")[0].value;
			var videoId = _s(epg.content.leftElement[epg.focusElementIndex],"input")[1].value;
			var type = epg.getTypeByHiddenType(videoCategory);
			url = epg.getDetailUrlByType(type,videoId);
			epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(url);
			break;
	}
}

/**
 * 翻页后初始化焦点
 */
FirstVideoList.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	epg.InitElement();
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight://向上翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			firstVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex>0?epg.focusElementIndex-5:0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			firstVideoList.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+5);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (epg.content.leftElement.length>0)
			{
				setTimeout("firstVideoList.contentLeftFocus(epg.content.leftElement,0)",200);
				//firstVideoList.contentLeftFocus(epg.content.leftElement,0);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			firstVideoList.contentLeftFocus(epg.content.leftElement,index);
			break;
	}
}

FirstVideoList.Init.prototype.initModel = function(loadType)
{
	firstVideoList = new FirstVideoList.Init();
	firstVideoList.initFocusAfterLoadData(loadType);
};
