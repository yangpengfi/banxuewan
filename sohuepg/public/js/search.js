var Search = {};

var search = null;

Search.Init = function ()
{
	this.searchValue = $("searchValue");
	this.inputSearchValue = $("inputSearchValue");
	this.searchBorder = $("searchBorder");
	this.categoryId = parseInt( $("categoryId").value);
	this.categoryType = $("categoryType").value;
	
	this.path = $("path").value;
	this.baseImgUrl = this.path + "/public/images/search/";
	this.imgUrl = $("imgUrl").value;
	this.curPage = isNullOrEmpty($("searchCurPage"))?1:parseInt($("searchCurPage").innerText);
	this.pages =  isNullOrEmpty($("searchTotalPage"))?1:parseInt($("searchTotalPage").innerText);
	this.total = isNullOrEmpty($("searchTotal"))?1:parseInt($("searchTotal").innerText);
	this.rowsLimit = 5;
	this.rows = 10;
	this.childKeyFocusIndex = 1;
	this.isInit = true;//第一次加载
	this.isInputKey = false;//输入状态
	
	//初始化每个按键中的小键盘
	this.InitChildKeys = function(key) {
		this.childKeys = getElementByTag(key,"div").children;
		this.childKeyLength = this.childKeys.length;
	}
	
	this.getUrl = function() {
		var data = "search/log?categoryId=" + search.categoryId + "&categoryType="
		+ search.categoryType + "&rows=" + search.rows
		+ "&name=" + this.inputSearchValue.value + "&page=" + search.curPage;
		return data;
	}
	
	this.getPostData =function(loadType) {
		if (loadType=="init") {
			search.curPage = 1;
		}
		var data = "search/log?categoryId=" + search.categoryId + "&categoryType="
		+ search.categoryType + "&rows=" + search.rows+"&isResult=true&lt="+loadType 
		+ "&name=" + this.inputSearchValue.value + "&page=" + search.curPage+"&lastFocusIndex="+epg.focusElementIndex;
		return data;
	}
};

/**
 * 左侧键盘元素聚焦
 * @param leftElement 左侧键盘元素集合
 * @param index 元素位置
 */
Search.Init.prototype.contentLeftFocus = function(leftElement, index)
{
	var img1 = _s(leftElement[index],"img")[0];
	var img2 = _s(leftElement[index],"img")[1];
	img1.className = img1.className.replace("block","none");
	img2.className = img2.className.replace("none","block");
	epg.focusElement =  Epg.Init.prototype.focusPosition.contentLeft;
	epg.focusElementIndex = index;
};

/**
 * 左侧键盘元素聚焦
 * @param leftElement 左侧键盘元素集合
 * @param index 元素位置
 */
Search.Init.prototype.contentLeftBlur = function(leftElement, index)
{
	var img1 = _s(leftElement[index],"img")[0];
	var img2 = _s(leftElement[index],"img")[1];
	img1.className = img1.className.replace("none","block");
	img2.className = img2.className.replace("block","none");
};

/**
 * 小键盘元素失去焦点
 * @param keyIndex 小键盘位置
 * @param childKeyIndex 小键盘内元素位置
 */
Search.Init.prototype.childKeyBlur = function(keyIndex,childKeyIndex)
{
	$("key"+(keyIndex+1)+"_"+childKeyIndex).style.backgroundColor="#484545";
}

/**
 * 小键盘元素聚焦
 * @param keyIndex 小键盘位置
 * @param childKeyIndex 小键盘内元素位置
 */
Search.Init.prototype.childKeyFocus = function(keyIndex,childKeyIndex)
{
	$("key"+(keyIndex+1)+"_"+childKeyIndex).style.backgroundColor="#FFD531";
	search.childKeyFocusIndex = childKeyIndex;
}

/**
 * 隐藏小键盘
 */
Search.Init.prototype.InputKeysBlur = function()
{
	none(search.getInput());
	epg.content.leftElement[epg.focusElementIndex].style.zIndex = 0;
	search.isInputKey = false;
	search.childKeyFocusIndex = 1;
}

/**
 *显示小键盘 
 */
Search.Init.prototype.InputKeysFocus = function()
{
	epg.content.leftElement[epg.focusElementIndex].style.zIndex = 1;
	block(search.getInput());
	search.childKeyFocus(epg.focusElementIndex,1);
	search.isInputKey = true;
	search.InitChildKeys(epg.content.leftElement[epg.focusElementIndex]);
}

/**
 * 右侧影片列表元素获取焦点
 * @param rightElement 右侧元素
 * @param index 元素位置
 * @param direction 焦点移动方向
 */
Search.Init.prototype.contentRightFocus = function(rightElement, index,direction)
{
	index = parseInt(index);
	if(index>rightElement.length-1)
	{
		index = rightElement.length-1;
	}
	if (rightElement[index]==undefined)
	{
		index = index+5;
	}
	epg.addScroll(getElementByTag(rightElement[index], "div"), 6);
//	focusElement(getElementByTag(rightElement[index],"img"));
	search.searchBorder.style.left = 359+(178*(index>4?index-5:index))+"px";
	if (index<5)
	{
		search.searchBorder.style.top = "124px";
	}else
	{
		search.searchBorder.style.top = "394px";
	}
	search.searchBorder.style.display = "block";
	epg.focusElement = Epg.Init.prototype.focusPosition.contentRight;
	epg.focusElementIndex = index;
};

/**
 * 右侧影片列表元素失去焦点
 * @param rightElement
 * @param index
 */
Search.Init.prototype.contentRightBlur = function(rightElement, index)
{
	epg.delScroll(getElementByTag(rightElement[index], "div"),
			getElementByTag(rightElement[index], "marquee"));
//	blurElement( getElementByTag(rightElement[index],"img"));
	none(search.searchBorder);
};

Search.Init.prototype.moveUp = function() {
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentLeft:
			if(epg.focusElementIndex>2) {
				if (search.isInputKey) {
					search.childKeyBlur(epg.focusElementIndex,search.childKeyFocusIndex);
					Search.Init.prototype.InputKeysBlur();
				}
				search.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-3);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			if(epg.focusElementIndex>search.rowsLimit-1&&epg.focusElementIndex<epg.content.rightElement.length)
			{
				search.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				search.contentRightFocus(epg.content.rightElement,epg.focusElementIndex-search.rowsLimit);
			}else if(search.curPage>1&&epg.focusElementIndex<search.rowsLimit)
			{
				search.curPage--;
				loadPage(search.getPostData(Epg.Init.prototype.loadDataType.turnUp));
			}
			break;
	}
};

Search.Init.prototype.moveDown = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header:
			search.headerBlur(epg.header, epg.focusElementIndex);
			if (epg.content.rightElement.length>0) {
				search.contentRightFocus(epg.content.rightElement,0);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentLeft:
			if(epg.focusElementIndex<epg.content.leftElement.length-3) {
				if (search.isInputKey) {
					search.childKeyBlur(epg.focusElementIndex,search.childKeyFocusIndex);
					Search.Init.prototype.InputKeysBlur();
				}
				search.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+3);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			if(epg.focusElementIndex<search.rows-search.rowsLimit&&
					(search.curPage-1)*search.rows+epg.focusElementIndex+1+search.rowsLimit<=search.total)
			{
				search.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				search.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+search.rowsLimit);
			}else if(epg.focusElementIndex>=search.rows-search.rowsLimit&&search.curPage<search.pages)
			{
				if ($("isResult").value=="true")
				{
					search.curPage++;
					loadPage(search.getPostData(Epg.Init.prototype.loadDataType.turnDown));
				}
			}
			break;
	}
};

Search.Init.prototype.moveLeft = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentLeft:
			if(!search.isInputKey)
			{
				if(epg.focusElementIndex%3!=0)
				{
					search.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
					search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-1);
				}
			}else
			{
				search.childKeyBlur(epg.focusElementIndex,search.childKeyFocusIndex);
				if (search.childKeyFocusIndex>1)
				{
					search.childKeyFocus(epg.focusElementIndex,search.childKeyFocusIndex-1);
				} else
				{
					Search.Init.prototype.InputKeysBlur();
					if (epg.focusElementIndex%3!=0)
					{
						search.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
						search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex-1);
					}
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			search.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
			if(epg.focusElementIndex%search.rowsLimit!=0)
			{
				search.contentRightFocus(epg.content.rightElement,epg.focusElementIndex-1);
			}else
			{
				search.contentLeftFocus(epg.content.leftElement,2);
			}
			break;
	}
};

Search.Init.prototype.moveRight = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentLeft:
			if(!search.isInputKey)
			{
				search.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
				if((epg.focusElementIndex+1)%3!=0)
				{
					search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+1);
				}else
				{
					if(search.total == 0){
						search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex);
					}else{
						search.contentRightFocus(epg.content.rightElement,0);
					}
				}
			}else
			{
				search.childKeyBlur(epg.focusElementIndex,search.childKeyFocusIndex);
				if (search.childKeyFocusIndex<search.childKeyLength)
				{
					search.childKeyFocus(epg.focusElementIndex,search.childKeyFocusIndex+1);
				} else 
				{
					Search.Init.prototype.InputKeysBlur();
					if ((epg.focusElementIndex+1)%3!=0)
					{
						search.contentLeftBlur(epg.content.leftElement,epg.focusElementIndex);
						search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex+1);
					}
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			if((epg.focusElementIndex+1)%search.rowsLimit!=0)
			{
				search.contentRightBlur(epg.content.rightElement,epg.focusElementIndex);
				search.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+1);
			}
			break;
	}
};

Search.Init.prototype.enter = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentLeft:
			if (epg.focusElementIndex>0&&epg.focusElementIndex<9)
			{
				if (!search.isInputKey)//大键盘
				{
					Search.Init.prototype.InputKeysFocus();
				} else//小键盘
				{
					$("isResult").value = true;
					Search.Init.prototype.setInputValue(search.childKeys[search.childKeyFocusIndex-1].innerText,false);
					Search.Init.prototype.childKeyBlur(epg.focusElementIndex,search.childKeyFocusIndex);
					Search.Init.prototype.InputKeysBlur();
					loadPage(search.getPostData(Epg.Init.prototype.loadDataType.init));
				}
			} else
			{
				$("isResult").value = true;
				switch (epg.focusElementIndex)
				{
					case 0:
						Search.Init.prototype.setInputValue("1",false);
						break;
					case 9:
						Search.Init.prototype.setInputValue("",true);
						break;
					case 10:
						Search.Init.prototype.setInputValue("0",false);
						break;
					case 11:
						var _searchText = search.inputSearchValue.value;
						_searchText = _searchText.substr(0,	_searchText.length - 1);
						Search.Init.prototype.setInputValue(_searchText,true);
						break;
				}
				loadPage(search.getPostData(Epg.Init.prototype.loadDataType.init));
			}
			break;
		case Epg.Init.prototype.focusPosition.contentRight:
			epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(epg.getDetailPageUrl(epg.content.rightElement[epg.focusElementIndex]));
			break;
	}
}

/**
 * 翻页后初始化焦点
 */
Search.Init.prototype.initFocusAfterLoadData =function(loadType)
{	
	epg.InitElement();
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnDown:
			epg.focusElementIndex =  parseInt($("lastFocusIndex").value);
			search.contentRightFocus(epg.content.rightElement,epg.focusElementIndex>0?epg.focusElementIndex-5:0);
			break;
		case Epg.Init.prototype.loadDataType.turnUp:
			epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			search.contentRightFocus(epg.content.rightElement,epg.focusElementIndex+5);
			break;
		case Epg.Init.prototype.loadDataType.init:
			epg.focusElementIndex = 0;
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			if (epg.content.leftElement.length>0)
			{
				search.contentLeftFocus(epg.content.leftElement,epg.focusElementIndex);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			search.contentRightFocus(epg.content.rightElement,index);
			break;
		default:
			none($("searchDefaultTitle"));
			block($("searchTitle"));
			none($("searchLine"));
			break;
	}
}

/**
 * 获取搜索输入框
 * @returns 搜索输入框
 */
Search.Init.prototype.getInput =function()
{
	return epg.content.leftElement[epg.focusElementIndex].children[2];
}

/**
 * 给搜索输入框赋值
 * @param value 值
 * @param isDel 是否是删除或者清空
 */
Search.Init.prototype.setInputValue =function(value,isDel)
{
	if(!isDel)
	{
		search.searchValue.innerText += value;
		search.inputSearchValue.value += value;
	}else
	{
		search.searchValue.innerText = value;
		search.inputSearchValue.value = value;
	}
}

Search.Init.prototype.initModel = function(loadType)
{
	search = new Search.Init();
	search.initFocusAfterLoadData(loadType);
};

