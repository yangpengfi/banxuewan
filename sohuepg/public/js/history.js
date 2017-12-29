
var History = {};

var _history = null;//history与关键字冲突加下划线区分

History.Init = function ()
{
	this.rows = 6;
	this.selectedVideoIds = [];
	this.lastSelectedVideoIndex = 0;
	this.operate = false;//删除操作页面
	this.lastFocusIndex = epg.focusElementIndex;
	this.historyBorder = $("historyBorder");
	this.historyBottomBorder = $("historyBottomBorder");
	this.conformBox = $("historyConformBox");
	this.path = $("path").value;
	this.baseImgUrl = this.path + "/public/images/_history/";
	this.imgUrl = $("imgUrl").value;
	this.baseDetailUrl = this.path+"movie/detail";
	this.curPage = $("historyCurPage").innerText;
	this.pages = $("historyTotalPage").innerText;
	this.total = $("historyTotal").innerText;
	this.currentTab = $("type").value;
	this.curHeaderType = "history";
	this.historyUrl = "record/getHistoryList";
	this.collectionUrl = "record/getFavoritesList";
	this.conformBoxElement=_s(getElementByTag(this.conformBox,"div"),"div");
	this.getUrl =function(loadType)
	{
		return "record/history?type="+epg.type+"&rows="+_history.rows+"&page=" + _history.curPage;
	}
	this.getPostData =function(loadType)
	{
		 return "record/history?type="+epg.type+"&rows="+_history.rows+"&lt="+loadType+"&selectedIds="
		 +_history.selectedVideoIds
		 +"&lastFocusIndex="+_history.lastSelectedVideoIndex+"&page=" + _history.curPage+"&operate="+_history.operate;
	}
};
History.Init.prototype.tab = {history:'history',collection:'collection'};

History.Init.prototype.headerType =
{
	tabHis : 'history',
	tabCol : 'collection',
	del : 'del',
	delAll : 'delAll'
};


History.Init.prototype.getHeaderIndexByType = function(type)
{
	for (var i = 0; i < epg.header.length; i++)
	{
		if (type==getHiddenInputValue(epg.header[i]))
		{
			return i;
		}
	}
}

History.Init.prototype.conformBoxFocus = function(box,index)
{
	focusElement(box[index]);
	epg.focusElement = Epg.Init.prototype.focusPosition.conformBox;
	epg.focusElementIndex = index;
};

History.Init.prototype.conformBoxBlur = function(box,index)
{
	blurElement(box[index]);
};

History.Init.prototype.clearTabSelectedStu =function(element)
{
	if (isContain(element.className,"-selected"))
	{
		element.className = element.className.replace("-selected","");
	}
}

History.Init.prototype.getAnotherTabIndexByCurTabIndex = function(index)
{
	if (index==0)
	{
		return 1
	}else if (index==1)
	{
		return 0;
	}
}

History.Init.prototype.headerFocus = function(header,index)
{
	focusElement(header[index]);
	if (!isNullOrEmpty(getElementByTag(header[index], "img")))
	{
		block(getElementByTag(header[index], "img"));
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
	_history.curHeaderType = getHiddenInputValue(epg.header[index]);
};

History.Init.prototype.headerBlur = function(header,index)
{	
	blurElement(header[index]);
	if (!isNullOrEmpty(getElementByTag(header[index], "img")))
	{
		none(getElementByTag(header[index], "img"));
	}
};

History.Init.prototype.headerSelected = function(header,index)
{
	focusElement(header[index]);
	none(getElementByTag(header[index], "img"));
};

/**
 * 左侧键盘元素聚焦
 * @param topElement 左侧键盘元素集合
 * @param index 元素位置
 */
History.Init.prototype.contentTopFocus = function(topElement, index)
{
	index = parseInt(index);
	if(index>topElement.length-1)
	{
		index = 0;
	}
	if (topElement[index]==undefined)
	{
		index = index+5;
	}
//	focusElement(getElementByTag(topElement[index],"div"));
//	if (_history.operate)
//	{
//		focusElement(_s(topElement[index],"div")[1]);
//		_s(topElement[index],"div")[1].style.left = (189*(index>5?index-6:index))+"px";
//		if (index<6)
//		{
//			_s(topElement[index],"div")[1].style.top = "0px";
//		}else
//		{
//			_s(topElement[index],"div")[1].style.top = "286px";
//		}
//	}
//	focusElement(getElementByTag(topElement[index],"img"));
	_history.historyBorder.style.left = 71+(189*(index>5?index-6:index))+"px";
	if (index<6)
	{
		_history.historyBorder.style.top = "104px";
	}else
	{
		_history.historyBorder.style.top = "361px";
	}
	if (isNullOrEmpty(getElementByTag(topElement[index], "marquee")))
	{
		epg.addScroll(_s(topElement[index], "div")[2], 6);
	}
	block(_history.historyBorder);
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

/**
 * 左侧键盘元素聚焦
 * @param topElement 左侧键盘元素集合
 * @param index 元素位置
 */
History.Init.prototype.contentTopBlur = function(topElement, index)
{
//	blurElement(getElementByTag(topElement[index],"div"));
//	if (_history.operate)
//	{
//		blurElement(_s(topElement[index],"div")[1]);
//		_s(topElement[index],"div")[1].style.left = (189*(index>5?index-6:index))+"px";
//		if (index<6)
//		{
//			_s(topElement[index],"div")[1].style.top = "0px";
//		}else
//		{
//			_s(topElement[index],"div")[1].style.top = "296px";
//		}
//	}
	epg.delScroll(_s(topElement[index], "div")[2], getElementByTag(topElement[index], "marquee"));
//	blurElement( getElementByTag(topElement[index],"img"));
	none(_history.historyBorder);
};


History.Init.prototype.contentBottomFocus = function(bottomElement, index)
{
	index = parseInt(index);
	epg.addScroll(getElementByTag(bottomElement[index], "div"), 10);
	_history.historyBottomBorder.style.left = 71+284*index+"px";
	block(_history.historyBottomBorder);
	blockByClass(getElementByTag(bottomElement[index], "div"));
	epg.focusElement = Epg.Init.prototype.focusPosition.contentBottom;
	epg.focusElementIndex = index;
};

History.Init.prototype.contentBottomBlur = function(bottomElement, index)
{
	epg.delScroll(getElementByTag(bottomElement[index], "div"),
			getElementByTag(bottomElement[index], "marquee"));
	noneByClass(getElementByTag(bottomElement[index], "div"));
	none(_history.historyBottomBorder);
};

/**
 *删除完成后隐藏删除按钮 显示操作按钮 初始化数据 
 */
History.Init.prototype.removeDel = function()
{
	_history.operate = false;
	_history.selectedVideoIds=[];
	for (var i = 0; i < epg.content.topElement.length; i++)
	{
		noneByClass(getElementByTag(epg.content.topElement[i],"div"));
		noneByClass(_s(epg.content.topElement[i],"div")[1]);
	}
}


/**
 * 显示所有影片的删除状态
 */
History.Init.prototype.showAllDelPic = function()
{
	for (var i = 0; i < epg.content.topElement.length; i++)
	{
		if (isContain($("selectedIds").value, _s(epg.content.topElement[i],"input")[3].value))
		{
			_history.selectedVideoIds.push(_s(epg.content.topElement[i],"input")[3].value);
			getElementByTag(epg.content.topElement[i],"div").className = "history-deletePic-enter";
		}
		blockByClass(getElementByTag(epg.content.topElement[i],"div"));
		blockByClass(_s(epg.content.topElement[i],"div")[1]);
	}
	if (!isNullOrEmpty($("selectedIds").value))
	{
		_history.selectedVideoIds = $("selectedIds").value.split(",");
	}
	_history.operate = true;
}

/**
 * 显示确认删除弹框
 */
History.Init.prototype.showConformBox = function(text)
{
	block(_history.conformBox);
	//获取conformBox中第一个div元素中的第一个div元素并赋值
	_history.conformBoxElement[0].innerText = text;
	_history.conformBoxFocus(_history.conformBoxElement,2);
}

/**
 * 隐藏确认删除弹框
 */
History.Init.prototype.hideConformBox = function()
{
	none(_history.conformBox);
	_history.conformBoxBlur(_history.conformBoxElement,epg.focusElementIndex);
	if (_history.lastFocusIndex==undefined)
	{
		_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.curHeaderType));
	}else
	{
		_history.contentTopFocus(epg.content.topElement, _history.lastFocusIndex);
	}
	_history.removeDel();
}

History.Init.prototype.getOperateUrlByTabAndType = function(tab,type)
{
	if (tab==History.Init.prototype.tab.history)
	{
		if (_history.operate)
		{
			if (type==History.Init.prototype.headerType.delAll)
			{
				return "record/clearHistory";
			}else
			{
				return "record/deleteHistory?ids="+_history.selectedVideoIds;
			}
		}
		
	}else if (tab==History.Init.prototype.tab.collection)
	{
		if (_history.operate)
		{
			if (type==History.Init.prototype.headerType.delAll)
			{
				return "record/clearFavorites";
			}else
			{
				return "record/deleteFavorites?ids="+_history.selectedVideoIds;
			}
		}
		
	}
}

History.Init.prototype.isVideoEnter = function(element)
{
	if (element.className.indexOf("history-deletePic-enter")!=-1)
	{
		return true;
	}else
	{
		return false
	}
}

/**
 * 翻页后初始化焦点
 */
History.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	_history.headerSelected(epg.header,_history.getHeaderIndexByType(epg.type));
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight://向上翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			if ($("operate").value=="true")
			{
				_history.showAllDelPic();
			}
			_history.contentTopFocus(epg.content.topElement,epg.focusElementIndex>0?epg.focusElementIndex-5:0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			if ($("operate").value=="true")
			{
				_history.showAllDelPic();
			}
			_history.contentTopFocus(epg.content.topElement,epg.focusElementIndex+5);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
				if ($("operate").value=="true")
				{
					_history.showAllDelPic();
					_history.selectedVideoIds=[];
				}
				if (epg.content.topElement.length>0)
				{
					_history.contentTopFocus(epg.content.topElement, epg.focusElementIndex);
				}else
				{
					_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.currentTab));
				}
			}else
			{
				_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.currentTab));
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			
			if(position==epg.focusPosition.contentTop)
			{
				if (epg.focusPosition.contentTop.length>0 && epg.content.topElement.length > 0 )
				{
					_history.contentTopFocus(epg.content.topElement,index);
				}else
				{
					_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.currentTab));
				}
			}
			if(position==epg.focusPosition.contentBottom)
			{
				if (epg.content.bottomElement.length>0)
				{
					_history.contentBottomFocus(epg.content.bottomElement,index);
				}else
				{
					_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.currentTab));
				}
			}
			break;
	}
}

History.Init.prototype.deleteHistory = function(url)
{
	ajax({
		type : "post",
		url : _history.path+url,
		dataType : "json",
		success : function(data)
		{
			var result = data.result;
			if (result == "Success")
			{
				loadPage(_history.getPostData(Epg.Init.prototype.loadDataType.init));
				_history.hideConformBox();
				history.selectedVideoIds=[];
			}
		}
	});
}

History.Init.prototype.moveUp = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentBottom:
			_history.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
			if (epg.content.topElement.length>0)
			{
				_history.contentTopFocus(epg.content.topElement,0);
			}else
			{
				_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.curHeaderType));
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			_history.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
			if(epg.focusElementIndex>5&&epg.focusElementIndex<epg.content.topElement.length)
			{
				_history.contentTopFocus(epg.content.topElement,epg.focusElementIndex-6);
			}
			else if (epg.focusElementIndex<6)
			{
				_history.headerFocus(epg.header,_history.getHeaderIndexByType(_history.curHeaderType));
			}
			break;
	}
};

History.Init.prototype.moveDown = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header:
			if (epg.content.topElement.length>0)
			{
				if (_history.currentTab==getHiddenInputValue(epg.header[epg.focusElementIndex]))
				{
					_history.headerSelected(epg.header,epg.focusElementIndex);
				}else
				{
					_history.headerBlur(epg.header,epg.focusElementIndex);
				}
				_history.contentTopFocus(epg.content.topElement,0);
			}else
			{
				if (epg.content.bottomElement.length>0)
				{
					if (_history.currentTab==getHiddenInputValue(epg.header[epg.focusElementIndex]))
					{
						_history.headerSelected(epg.header,epg.focusElementIndex);
					}else
					{
						_history.headerBlur(epg.header,epg.focusElementIndex);
					}
					_history.contentBottomFocus(epg.content.bottomElement,0);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if(epg.content.bottomElement.length>0)
			{
				_history.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				_history.contentBottomFocus(epg.content.bottomElement,0);
			}
			break;
	}
};

History.Init.prototype.moveLeft = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.conformBox:
			if(epg.focusElementIndex==2)
			{
				_history.conformBoxBlur(_history.conformBoxElement,epg.focusElementIndex);
				_history.conformBoxFocus(_history.conformBoxElement,epg.focusElementIndex-1);
			}
			break;
		case Epg.Init.prototype.focusPosition.header:
			if(epg.focusElementIndex>0)
			{
				if (_history.currentTab==getHiddenInputValue(epg.header[epg.focusElementIndex]))
				{
					_history.headerSelected(epg.header,epg.focusElementIndex);
				}else
				{
					_history.headerBlur(epg.header,epg.focusElementIndex);
				}
				_history.headerFocus(epg.header,epg.focusElementIndex-1);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if(epg.focusElementIndex%6!=0)
			{
				_history.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				_history.contentTopFocus(epg.content.topElement,epg.focusElementIndex-1);
			}else if(_history.curPage>1)
			{
				//翻页
				_history.curPage--;
				loadPage(_history.getPostData(Epg.Init.prototype.loadDataType.turnLeft))
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if(epg.focusElementIndex>0)
			{
				_history.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				_history.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex-1);
			}
			break;
	}
};

History.Init.prototype.moveRight = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.conformBox:
			if(epg.focusElementIndex==1)
			{
				_history.conformBoxBlur(_history.conformBoxElement,epg.focusElementIndex);
				_history.conformBoxFocus(_history.conformBoxElement,epg.focusElementIndex+1);
			}
			break;
		case Epg.Init.prototype.focusPosition.header:
			//此处有隐藏元素过滤掉隐藏元素跳到下一个显示的元素
			if(epg.focusElementIndex<epg.header.length-1)
			{
				if (_history.currentTab==getHiddenInputValue(epg.header[epg.focusElementIndex]))
				{
					_history.headerSelected(epg.header,epg.focusElementIndex);

				}else
				{
					_history.headerBlur(epg.header,epg.focusElementIndex);
				}
				_history.headerFocus(epg.header,epg.focusElementIndex+1);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if ((epg.focusElementIndex+1)%6!=0)
			{
				if(epg.focusElementIndex+1>epg.content.topElement.length-1)
				{
					return;
				}
				_history.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				_history.contentTopFocus(epg.content.topElement,epg.focusElementIndex+1);
			}else if(_history.curPage<_history.pages)
			{
				//翻页
				_history.curPage++;
				loadPage(_history.getPostData(Epg.Init.prototype.loadDataType.turnRight));
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if(epg.focusElementIndex<epg.content.bottomElement.length-1)
			{
				_history.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				_history.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex+1);
			}
			break;
	}
};



History.Init.prototype.enter = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.conformBox:
		if (epg.focusElementIndex == 2) {
			_history.hideConformBox();
		} else if (epg.focusElementIndex == 1) {
			var url = _history.getOperateUrlByTabAndType(_history.currentTab, _history.curHeaderType);
			History.Init.prototype.deleteHistory(url);
		}
		break;
	case Epg.Init.prototype.focusPosition.header:
		switch (_history.curHeaderType) {
		case History.Init.prototype.headerType.tabHis:// 历史标签
			epg.type = Epg.Init.prototype.type.history;
			unSelectedElement(epg.header[_history
					.getHeaderIndexByType(History.Init.prototype.headerType.tabCol)]);
			_history.curPage = 1;
			loadPage(_history.getUrl());
			_history.currentTab = History.Init.prototype.tab.history;
			_history.removeDel();
			break;
		case History.Init.prototype.headerType.tabCol:// 搜藏标签
			unSelectedElement(epg.header[_history.getHeaderIndexByType(History.Init.prototype.headerType.tabHis)]);
			epg.type = Epg.Init.prototype.type.collection;
			_history.curPage = 1;
			loadPage(_history.getUrl());
			_history.currentTab = History.Init.prototype.tab.collection;
			_history.removeDel();
			break;
		case History.Init.prototype.headerType.del:// 管理按钮
			if (_history.total > 0) {
				if (!_history.operate) {
					_history.operate = true;
					_history.showAllDelPic();
				} else {
					if (_history.selectedVideoIds.length > 0) {
						if(_history.currentTab == 'collection'){
							_history.showConformBox("是否删除所选中收藏记录？");
						}else{
							_history.showConformBox("是否删除所选中历史记录？");
						}
						//_history.showConformBox("删除所有选中历史记录？");
					}
				}
			}
			break;
		case History.Init.prototype.headerType.delAll:
			_history.operate = true;
			//_history.showConformBox("删除所有历史记录？");
			if(_history.currentTab == 'collection'){
				_history.showConformBox("是否删除所有收藏记录？");
			}else{
				_history.showConformBox("是否删除所有历史记录？");
			}
			break;
		}

		break;
	case Epg.Init.prototype.focusPosition.contentTop:
		if (_history.operate) {
			var delPic = getElementByTag(
					epg.content.topElement[epg.focusElementIndex], "div");
			delPic.className = "history-deletePic-enter";
			_history.selectedVideoIds
					.push(_s(epg.content.topElement[epg.focusElementIndex],
							"input")[3].value);
			_history.lastSelectedVideoIndex = epg.focusElementIndex;
			if (_history.selectedVideoIds.length > 0) {
				_history.lastFocusIndex = epg.focusElementIndex;
				_history.showConformBox("删除所有选中历史记录？");
			}
		} else {
			epg.focusMemory(epg.model, epg.type, epg.focusElement,
					epg.focusElementIndex);
			url = Epg.Init.prototype
					.getDetailPageUrl(epg.content.topElement[epg.focusElementIndex]);
			loadPage(url);
		}
		break;
	case Epg.Init.prototype.focusPosition.contentBottom:
		epg.focusMemory(epg.model, epg.type, epg.focusElement,
				epg.focusElementIndex);
		url = Epg.Init.prototype
				.getDetailPageUrl(epg.content.bottomElement[epg.focusElementIndex]);
		loadPage(url);
		break;
	}
}


History.Init.prototype.initModel = function(loadType)
{
	_history = new History.Init();
	if (epg.type==Epg.Init.prototype.type.collection) {
		_history.url = _history.collectionUrl;
	}
	_history.initFocusAfterLoadData(loadType);
};


