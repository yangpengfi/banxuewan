var Circle = {};// 命名空间

var circle = null;

Circle.Init = function()
{
	this.path = $("path").value;
	this.totalStar = $("starPosters").children.length;
	this.htmlListToArrayList = function(id)
	{
		var list = [];
		for (var i = 0; i < $(id).children.length; i++)
		{
			list[i] = $(id).children[i].value;
		}
		return list;
	}
	this.starPosters = this.htmlListToArrayList("starPosters");
	this.starNames = this.htmlListToArrayList("starNames");
	this.starIds = this.htmlListToArrayList("starIds");
	this.circleBorder = $("circleBorder");
	this.pageLimit = 5;
	/**
	 * 翻页的时候获取url
	 */
	this.getPostData = function()
	{
		return  "getVideoListByStar?actorId="+$("circleStarId2").value + "&page=" + circle.curPage;
	}
	/**
	 * 焦点记忆的时候获取url
	 */
	this.getUrl = function()
	{
		return  "circle?circleId=1&actorId="+$("circleStarId2").value + "&page=" + circle.curPage;
	}
	this.pages = $("circleTotalPage").value;
	this.curPage =  $("circleCurPage").value;
	this.imgUrl = $('imgUrl').value;
};




Circle.Init.prototype.headerFocus = function(header, index)
{
	blurElement(_s(header[index],"img")[0]);
	focusElement(_s(header[index],"img")[1]);
	focusElement(header[index]);
	focusElement(getElementByTag(header[index], "span"));
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
}


Circle.Init.prototype.headerBlur = function(header, index)
{
	blurElement(_s(header[index],"img")[1]);
	focusElement(_s(header[index],"img")[0]);;
	blurElement(getElementByTag(header[index], "span"))
	blurElement(header[index]);
}

Circle.Init.prototype.contentTopFocus = function()
{
	$("circleNameBg2").style.display = "none";
	$("circleNameBgFocus").style.display = "block";
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = 2;
}


Circle.Init.prototype.contentTopBlur = function()
{
	$("circleNameBg2").style.display = "block";
	$("circleNameBgFocus").style.display = "none";
}


Circle.Init.prototype.contentBottomFocus = function(bottomElement, index)
{
	index = parseInt(index);
//	for (var i = 0; i < _s(bottomElement[index],"img").length; i++)
//	{
//		focusElement( _s(bottomElement[index],"img")[i]);
//	}
	circle.circleBorder.className = "circle-border"+index+" circle-border-on"
	epg.focusElement = Epg.Init.prototype.focusPosition.contentBottom;
	epg.focusElementIndex = index;
}

Circle.Init.prototype.contentBottomBlur = function(bottomElement, index)
{
//	for (var i = 0; i < _s(bottomElement[index],"img").length; i++)
//	{
//		blurElement( _s(bottomElement[index],"img")[i]);
//	}
	blurElement(circle.circleBorder);
}


/**
 * 主页焦点上移方法
 * 
 */
Circle.Init.prototype.moveUp = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			Circle.Init.prototype.contentTopBlur();
			Circle.Init.prototype.headerFocus(epg.header, 0);
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			Circle.Init.prototype.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
			Circle.Init.prototype.contentTopFocus();
			break;
	}
}

/**
 * 主页焦点下移方法
 * 
 */
Circle.Init.prototype.moveDown = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header:
			Circle.Init.prototype.headerBlur(epg.header,epg.focusElementIndex);
			Circle.Init.prototype.contentTopFocus();
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			if (epg.content.bottomElement.length>0&&
					!isContain(epg.content.bottomElement[0].className, "circle-no-data"))
			{
				Circle.Init.prototype.contentTopBlur();
				Circle.Init.prototype.contentBottomFocus(epg.content.bottomElement,0);
			}
			break;
	}
}

/**
 * 主页焦点右移方法
 */
Circle.Init.prototype.moveLeft = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header://从header右移
			if(epg.focusElementIndex<epg.header.length-1)//向右移一个位置
			{
				Circle.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);//去掉当前焦点
				Circle.Init.prototype.headerFocus(epg.header, epg.focusElementIndex+1);//聚焦
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			for (var i = 0; i < circle.totalStar; i++)
			{
				if (i<5)
				{
					if (i==0)
					{
						$("star"+i).src = circle.starPosters[circle.totalStar-1];
						$("circleStarName"+i).innerText = circle.starNames[circle.totalStar-1];
						$("circleStarId"+i).value = circle.starIds[circle.totalStar-1];
						
					}else
					{
						$("star"+i).src = circle.starPosters[i-1];
						$("circleStarName"+i).innerText = circle.starNames[i-1];
						$("circleStarId"+i).value = circle.starIds[i-1];
					}
				}
			}
		
			circle.starPosters.unshift(circle.starPosters.pop());
			circle.starNames.unshift(circle.starNames.pop());
			circle.starIds.unshift(circle.starIds.pop());
			Epg.Init.prototype.LocalLoadVideos(circle,"switchStar");
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if(epg.focusElementIndex%circle.pageLimit!=0)
			{
				circle.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				circle.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex-1);
			}else if(circle.curPage>1)
			{
				//翻页
				circle.curPage--;
				Epg.Init.prototype.LocalLoadVideos(circle,Epg.Init.prototype.loadDataType.turnLeft)
			}
			break;
	}
}


/**
 * 主页焦点左移方法
 */
Circle.Init.prototype.moveRight = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header://从header左移
			if(epg.focusElementIndex>1)//向左移一个位置
			{
				Circle.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);//去掉当前焦点
				Circle.Init.prototype.headerFocus(epg.header, epg.focusElementIndex-1);//聚焦
			}
			break;
		case Epg.Init.prototype.focusPosition.contentTop:
			for (var i = 0; i < circle.totalStar; i++)
			{
				if (i<5)
				{
					if (i==4)
					{
						$("star"+i).src = circle.starPosters[0];
						$("circleStarName"+i).innerText = circle.starNames[0];
						$("circleStarId"+i).value = circle.starIds[0];
						
					}else
					{
						$("star"+i).src = circle.starPosters[i+1];
						$("circleStarName"+i).innerText = circle.starNames[i+1];
						$("circleStarId"+i).value = circle.starIds[i+1];
					}
				}
			}
			circle.starPosters.push(circle.starPosters.shift());
			circle.starNames.push(circle.starNames.shift());
			circle.starIds.push(circle.starIds.shift());
			Epg.Init.prototype.LocalLoadVideos(circle,"switchStar");
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if ((epg.focusElementIndex+1)%circle.pageLimit!=0)
			{
				if(epg.focusElementIndex<epg.content.bottomElement.length-1)
				{
					circle.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
					circle.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex+1);
				}
			}else if(circle.curPage<circle.pages)
			{
				//翻页
				circle.curPage++;
				Epg.Init.prototype.LocalLoadVideos(circle,Epg.Init.prototype.loadDataType.turnRight);
			}
			break;
	}
}
/**
 * 翻页后初始化焦点
 */
Circle.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight:
			circle.contentBottomFocus(epg.content.bottomElement,0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft:
			circle.contentBottomFocus(epg.content.bottomElement,circle.pageLimit-1);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			circle.contentTopFocus();
			break;
		case Epg.Init.prototype.loadDataType.memory:
			circle.contentTopBlur(epg.content.topElement, 2);
			var selectedActor  = 0;
			for (var i = 0; i < circle.totalStar; i++)
			{
				if ($("actorId").value == circle.starIds[i])
				{
					selectedActor = i;
					break;
				}
			}
			if (selectedActor<2)
			{
				for (var i = circle.totalStar; i > circle.totalStar+selectedActor-2; i--)
				{
					circle.starPosters.unshift(circle.starPosters.pop());
					circle.starNames.unshift(circle.starNames.pop());
					circle.starIds.unshift(circle.starIds.pop());
				}
			}else
			{
				for (var i = 0; i < selectedActor-2; i++)
				{
					circle.starPosters.push(circle.starPosters.shift());
					circle.starNames.push(circle.starNames.shift());
					circle.starIds.push(circle.starIds.shift());
				}
			}
			for (var i = 0; i <= 4; i++)
			{
				$("star"+i).src = circle.starPosters[i];
				$("circleStarName"+i).innerText = circle.starNames[i];
				$("circleStarId"+i).value = circle.starIds[i];
			}
			
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			switch (position)
			{
				case Epg.Init.prototype.focusPosition.header:
					circle.contentTopBlur(epg.content.topElement, index);
					circle.headerFocus(epg.header, index);
					break;
				case Epg.Init.prototype.focusPosition.contentBottom:
					circle.contentBottomFocus(epg.content.bottomElement, index);
					break;
			}
			break;
	}
}
Circle.Init.prototype.enter = function()
{
	var url = "";
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.header:
			url = epg.getDetailPageUrl(epg.header[epg.focusElementIndex]);
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			url = Epg.Init.prototype.getDetailPageUrl(epg.content.bottomElement[epg.focusElementIndex]);
			break;
	}
	if (epg.focusElement!=Epg.Init.prototype.focusPosition.contentTop)
	{
		epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
		loadPage(url);
	}
}

/**
* 处理主页加载的数据以及初始化焦点
*/
Circle.Init.prototype.initModel = function(loadType)
{
	circle = new Circle.Init();
	circle.initFocusAfterLoadData(loadType);
};


