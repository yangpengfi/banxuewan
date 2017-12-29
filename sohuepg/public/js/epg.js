var Epg = {};
var epg = null;
//---------属性定义开始----------------
/**
 * 配置属性 
 * model结构模块类型(按html页面命名)  type功能模块类型(根据功能命名)
 * focusElement 当前聚焦的源元素  focusElementIndex 当前聚焦元素位置
 * path basePath 服务器路径
 */
Epg.Init = function(model,type,focusElement,focusElementIndex)
{

	if (model == "homepage") {
		//document.getElementById('info_test').innerHTML+="<p> epg.js执行Init方法</p>";
	}
	//局部可配
	this.model = model;//模块类型 例home 必需字段
	this.type = type;//页面类型 例 ustv 必需字段
	this.focusElement = focusElement;//聚焦元素名 例 footer 必需字段
	this.focusElementIndex = focusElementIndex;//聚焦元素位置  必需字段
	this.url = "";//用于记录每次加载页面时的url
	this.data = "";//记录每次加载影片列表时post的参数
	this.InitElement = function()
	{
		var s = model;
		if (model == "homepage") {
			s = "home";
		}
		this.header =  getElements(s+"Header")//页面的header元素 非必需
		this.footer =  getElements(s+"Footer")//页面的footer元素 非必需
		this.content =	{//页面主要内容元素 非必需
			rightElement:getElements(s+"Right"),//内容右侧元素
			leftElement:getElements(s+"Left"),//内容左侧元素
			centerElement:getElements(s+"Center"),//
			topElement:getElements(s+"Top"),//内容上侧元素
			bottomElement:getElements(s+"Bottom"),//内容下侧
		}
	}
	/*
	* 焦点上移方法
	*/
	this.moveUp = function()
	{
		switch (model)
		{
			case Epg.Init.prototype.model.home:
				Home.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.search:
				Search.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.secondVideoList:
				SecondVideoList.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.firstVideoList:
				FirstVideoList.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.allSpecial:
				AllSpecial.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.history:
				History.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.seriesDetail:
				SeriesDetail.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.movieDetail:
				MovieDetail.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.artsDetail:
				ArtsDetail.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.filter:
				Filter.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.order:
				Order.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.circle:	
				Circle.Init.prototype.moveUp();
				break;
			case Epg.Init.prototype.model.chart:	
				Chart.Init.prototype.moveUp();
				break;
		}
	}
	/*
	* 焦点下移方法
	*/
	this.moveDown = function()
	{
		switch (model)
		{
			case Epg.Init.prototype.model.home:	
				Home.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.search:	
				Search.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.secondVideoList:	
				SecondVideoList.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.firstVideoList:	
				FirstVideoList.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.allSpecial:	
				AllSpecial.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.history:	
				History.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.seriesDetail:	
				SeriesDetail.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.movieDetail:	
				MovieDetail.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.artsDetail:	
				ArtsDetail.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.filter:	
				Filter.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.order:
				Order.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.circle:	
				Circle.Init.prototype.moveDown();
				break;
			case Epg.Init.prototype.model.chart:	
				Chart.Init.prototype.moveDown();
				break;	
		}
	}
	/*
	* 焦点左移方法
	*/
	this.moveLeft = function()
	{
		switch (model)
		{
			case Epg.Init.prototype.model.home:
				Home.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.search:
				Search.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.secondVideoList:
				SecondVideoList.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.firstVideoList:
				FirstVideoList.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.history:
				History.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.special:
				Special.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.allSpecial:
				AllSpecial.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.seriesDetail:
				SeriesDetail.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.movieDetail:
				MovieDetail.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.artsDetail:
				ArtsDetail.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.filter:
				Filter.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.order:
				Order.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.circle:	
				Circle.Init.prototype.moveLeft();
				break;
			case Epg.Init.prototype.model.chart:	
				Chart.Init.prototype.moveLeft();
				break;
		}
	}
	/*
	* 焦点右移方法
	*/
	this.moveRight = function()
	{
		switch (model)
		{
			case Epg.Init.prototype.model.home:
				Home.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.search:
				Search.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.secondVideoList:
				SecondVideoList.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.firstVideoList:
				FirstVideoList.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.history:
				History.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.special:
				Special.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.allSpecial:
				AllSpecial.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.seriesDetail:
				SeriesDetail.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.movieDetail:
				MovieDetail.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.artsDetail:
				ArtsDetail.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.filter:
				Filter.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.order:
				Order.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.circle:	
				Circle.Init.prototype.moveRight();
				break;
			case Epg.Init.prototype.model.chart:	
				Chart.Init.prototype.moveRight();
				break;
		}
	}
	
	this.enter = function()
	{
		switch (model)
		{
			case Epg.Init.prototype.model.home:	
				Home.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.search:	
				Search.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.secondVideoList:	
				SecondVideoList.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.firstVideoList:	
				FirstVideoList.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.history:	
				History.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.special:	
				Special.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.allSpecial:	
				AllSpecial.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.seriesDetail:	
				SeriesDetail.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.movieDetail:	
				MovieDetail.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.artsDetail:	
				ArtsDetail.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.filter:	
				Filter.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.order:	
				Order.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.circle:	
				Circle.Init.prototype.enter();
				break;
			case Epg.Init.prototype.model.chart:	
				Chart.Init.prototype.enter();
				break;
		}
	}
	
	this.back = function()
	{
		switch (model)
		{
			case Epg.Init.prototype.type.home:
				if (epg.focusElement==home.focusPosition.homeExtBt||
						epg.focusElement==home.focusPosition.homeExtVideoList)
				{
					return;
				}
				home.lastFocusIndex = epg.focusElementIndex;
				home.lastFocusElement  = epg.focusElement;
				switch (epg.focusElement)
				{
					case Epg.Init.prototype.focusPosition.contentLeft:
						home.contentLeftBlur(epg.content.leftElement, epg.focusElementIndex);
						break;
					case Epg.Init.prototype.focusPosition.contentRight:
						home.contentRightBlur(epg.content.rightElement, epg.focusElementIndex);
						break;
					case Epg.Init.prototype.focusPosition.header:
						home.headerBlur(epg.header, epg.focusElementIndex);
						break;
				}
				home.showConformBox("大家都在看这个，你不去看看？")
				break;
			case Epg.Init.prototype.model.seriesDetail:
				Epg.Init.prototype.detailBack(seriesDetail);
				break;
			case Epg.Init.prototype.model.movieDetail:
				Epg.Init.prototype.detailBack(movieDetail);
				break;
			case Epg.Init.prototype.model.artsDetail:
				Epg.Init.prototype.detailBack(artsDetail);
				break;
			case Epg.Init.prototype.type.allSpecial:
				window.location.href=epg.path+"/doindex?type=homepage"; 
				break;
			case Epg.Init.prototype.model.history:
				window.location.href=epg.path+"/doindex?type=homepage"; 
				break;
			default:
				epg.loadMemoryPage();
				break;
		}
	}
};

Epg.Init.prototype.detailBack = function(curObj) {
	if (curObj.showIntroduction) {
		none($("show-detail"));
		curObj.showIntroduction = false;
	} else {
		epg.loadMemoryPage();
	}
}
/**
 * 根据页面类型获取model
 * 
 * @param type
 *            页面类型
 * @returns model
 */
Epg.Init.prototype.getModelByType = function(type) {
	switch (type) {
		case Epg.Init.prototype.type.home:
		case Epg.Init.prototype.type.ustv:
		case Epg.Init.prototype.type.koreantv:
		case Epg.Init.prototype.type.children:
		case Epg.Init.prototype.type.homemadetv:
		case Epg.Init.prototype.type.classify:
			return Epg.Init.prototype.model.home;
		default:
			return type;
	}
}

// 全局属性
// ----------定义model---------------
Epg.Init.prototype.model = {
	home : "homepage",
	secondVideoList : 'secondVideoList',
	search : 'search',
	filter : 'filter',
	order : 'order',
	history : 'history',
	movieDetail : 'movieDetail',
	seriesDetail : 'seriesDetail',
	artsDetail : 'artsDetail',
	special : 'special',
	allSpecial : 'allSpecial',
	circle : 'circle',
	firstVideoList : 'firstVideoList',
	chart : "chart"
};

// -----------定义页面类型------
Epg.Init.prototype.type = {
	movieDetail : 'movieDetail',
	seriesDetail : 'seriesDetail',
	artsDetail : 'artsDetail',
	special : 'special',
	secondVideoList : 'secondVideoList',
	search : 'search',
	filter : 'filter',
	history : 'history',
	collection : 'collection',
	home : "homepage",
	ustv : "ustv",
	hottv : 'hottv',
	variety : 'variety',
	movie : 'movie',
	children : 'children',
	special : 'special',
	classify : 'classify',
	allSpecial : 'allSpecial',
	circle : 'circle',
	firstVideoList : 'firstVideoList',
	chart : 'chart'
};

// ------------定义异步加载数据的几种情况----------
Epg.Init.prototype.loadDataType = {
	turnUp : "turnUp", // 向上翻页
	turnDown : 'turnDown',// 向下翻页
	turnLeft : 'turnLeft',// 向左翻页
	turnRight : 'turnRight',// 向右翻页
	init : 'init',// 第一次加载
	memory : 'memory'// 记忆返回到该页面
};


// ----------定义聚焦元素位置类型---------------
Epg.Init.prototype.focusPosition = {
	footer : "footer",
	header : 'header',
	contentLeft : 'contentLeft',
	contentRight : 'contentRight',
	contentTop : 'contentTop',
	contentCenter : 'contentCenter',
	contentBottom : 'contentBottom',
	conformBox : 'conformBox'
};
Epg.Init.prototype.path = $("path").value;


// ----------定义按键对应值----------
Epg.Init.prototype.up = [ 1, 65362, 38, 'KEY_UP' ];
Epg.Init.prototype.down = [ 2, 65364, 40, 'KEY_DOWN' ];
Epg.Init.prototype.left = [ 3, 65361, 37, 'KEY_LEFT' ];
Epg.Init.prototype.right = [ 4, 65363, 39, 'KEY_RIGHT' ];
Epg.Init.prototype.enter = [ 13, 65293, 'KEY_ENTER' ];
//Epg.Init.prototype.back = [ 640, 65367, 8, 27, 339, 90, 56, 109, 283, 340 ];
Epg.Init.prototype.back = [ 640, 65367, 8, 90, 56, 109, 283, 340 ];

// 定义焦点记忆功能所需参数
Epg.urlMemory = [];// 记忆url
Epg.dataMemory = [];// 记忆post参数
Epg.modelMemory = [];// 记忆model
Epg.typeMemory = [];// 记忆页面类型
Epg.focusElementMemory = [];// 记忆聚焦元素类型
Epg.focusElementIndexMemory = [];// 记忆聚焦元素位置
// ---------------属性定义结束-------------------

/**
 * 键盘监听方法
 */
window.document.onkeydown = function(event) {
	// up
	if (isContainInList(Epg.Init.prototype.up, event.keyCode)) {
		epg.moveUp();
	}
	// down
	if (isContainInList(Epg.Init.prototype.down, event.keyCode)) {
		epg.moveDown();
	}
	// left
	if (isContainInList(Epg.Init.prototype.left, event.keyCode)) {
		epg.moveLeft();
	}
	// right
	if (isContainInList(Epg.Init.prototype.right, event.keyCode)) {
		epg.moveRight();
	}
	// enter
	if (isContainInList(Epg.Init.prototype.enter, event.keyCode)) {
		epg.enter();
	}
	// back
	if (isContainInList(Epg.Init.prototype.back, event.keyCode)) {
		window.event.returnValue = false;
		preventDefault(event);
		epg.back();

	}
}
function getEvent(event) {
	return event ? event : window.event;
}
function preventDefault(event) {
	var e = getEvent(event);
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}
/**
 * 加载影片列表
 * 
 * @param 异步加载类型
 *            上下左右初始化记忆返回
 */
Epg.Init.prototype.LocalLoadVideos = function(curModel,loadType)
{
	var postData = curModel.getPostData(loadType);
	Epg.url = postData;
	ajax(
	{
		type : "post",
		url :  Epg.Init.prototype.path+postData,
		dataType : "json",
		success : function(data)
		{
			var status = data.status;
			if (status > 0)
			{
				var list = data.data;
				var str = "";
				for (var i = 0; i < list.length; i++)
				{
					var item = list[i];
					str += '<div class="'+epg.model+'-video">'
					if (!isNullOrEmpty(item.mark))
					{
						str += '<img class="'+epg.model+'-mark '+epg.model+'-mark'+i+'" src="'+curModel.imgUrl+item.mark+'"/>'
					}
					str	+= '<img  src="'+curModel.imgUrl+item.albumVerpic + 
					'"class='+epg.model+'-poster id="'+epg.model+'Poster'+i+'">'
					+ '<input type="hidden" value="' + item.templateModel+ '" />' 
					+ '<input type="hidden" value="'+ item.id + '" />'
					+ '<input type="hidden" value="'+ item.type + '" /></div>'
				}
				curModel.pages = data.page;
				curModel.total = data.total;
			
				if (data.total>0)
				{
					$(epg.model+"Bottom").innerHTML = str;
					$(epg.model+"CurPage").value = curModel.curPage;
					$(epg.model+"Total").value = curModel.total;
					$(epg.model+"TotalPage").value = curModel.pages;
				}else
				{
					str = '<div class="'+epg.model+'-no-data">暂无数据</div>';
					$(epg.model+"Bottom").innerHTML = str;
				}
				curModel.initFocusAfterLoadData(loadType);
			}
		}
	});
}


/**
 * 根据影片类型获取页面类型 用于获取详情页的类型 电影，专题，电视剧，综艺
 * @param category 影片类型
 * @returns {String} 返回页面类型
 */
Epg.Init.prototype.getTypeByHiddenType = function(category)
{
	var c = category.toLowerCase();
	if(isContain(c,"special"))
	{
		return Epg.Init.prototype.type.special;
	}else if(isContain(c,"movie"))
	{
		return Epg.Init.prototype.type.movieDetail;
	}else if(isContain(c,"tvdrama"))
	{
		return Epg.Init.prototype.type.seriesDetail;
	}else if(isContain(c,"variety"))
	{
		return  Epg.Init.prototype.type.artsDetail;
	}else if( isContain(c,"all"))
	{
		return  Epg.Init.prototype.type.allSpecial;
	}else if(isContain(c,"ulist")|| 
			isContain(c,"hottvlist")||isContain(c,"vlist")
			||isContain(c,"clist")||isContain(c,"mlist")||isContain(c,"limitfree"))
	{
		return  Epg.Init.prototype.type.secondVideoList;
	}
//	else if(isContain(c,"limitfree"))
//	{
//		return  Epg.Init.prototype.type.firstVideoList
//	}
	else if( isContain(c,"circle"))
	{
		return  Epg.Init.prototype.type.circle;
	}else if( isContain(c,"order"))
	{
		return  Epg.Init.prototype.type.order;
	}else if( isContain(c,"search"))
	{
		return  Epg.Init.prototype.type.search;
	}else if( isContain(c,"history"))
	{
		return  Epg.Init.prototype.type.history;
	}
}


/**
 * 根据页面类型获取加载该页面的URL 用于获取详情页的url
 * @param type 页面类型
 * @param id 视屏的id 
 * @returns {String} 返回加载该页面的url
 */

Epg.Init.prototype.getDetailUrlByType = function(type,id,hiddenType,page,categoryId,specialBg)
{
	switch (type)
	{
		case Epg.Init.prototype.type.movieDetail:
			return "movie/detail?id="+id;
		case Epg.Init.prototype.type.history:
			return "record/history?type=history&page=1&rows=12";
		case Epg.Init.prototype.type.special:
			return "special/special?specialId="+id+"&specialBg="+specialBg+"&page=1&rows=6";
		case Epg.Init.prototype.type.special:
			return "recomand?type=special";
		case Epg.Init.prototype.type.seriesDetail:
			return "tv/detail?id="+id;
		case Epg.Init.prototype.type.artsDetail:
			return "arts/detail?id="+id;
		case Epg.Init.prototype.type.allSpecial:
			return "special/allSpecial?page=1&rows=6&specialBg="+specialBg;
		case Epg.Init.prototype.type.search:
			return "search/log?page=1"+"&rows="+10+"&categoryId="+categoryId;
	case Epg.Init.prototype.type.chart:
		return "chart/searchChart?type="+type;
		case Epg.Init.prototype.type.secondVideoList:
			var categoryId = "";
			switch (hiddenType)
			{
				case "ustvlist":
					categoryPid = 130;
					break;
				case "hottvlist":
					categoryPid = 128;
					break;
				case "mlist":
					categoryPid = 1;
					break;
				case "clist":
					categoryPid = 5;
					break;
				case "vlist":
					categoryPid = 3;
					break;
				case "limitfree":
					categoryPid = 125;
					break;
			}
			return "category/videoList?type="+type+"&categoryId="+categoryId+"&categoryPid="+categoryPid;
		case Epg.Init.prototype.type.circle:
			return "circle?circleId="+id+"&page=1&rows=8&actorId=480";
		case Epg.Init.prototype.type.order:
			return "order/package";
		
	}
}

/**
 * 记忆焦点
 */
Epg.Init.prototype.focusMemory = function(model,type,focusElement,focusElementIndex)
{
	var url = "";
	switch (model)
	{
		case "home":
		case "homepage":
			url = "doindex?type="+type;
			break;
		case "firstVideoList":
			url = firstVideoList.getUrl();
			break;
		case "secondVideoList":
			url = secondVideoList.getUrl();
			break;
		case "search":
			url = search.getUrl();
			break;
		case "movieDetail":
			url = movieDetail.getUrl();
			break;
		case "special":
			url = special.getUrl();
			break;
		case "allSpecial":
			url = allSpecial.getUrl();
			break;
		case "seriesDetail":
			url = seriesDetail.getUrl();
			break;
		case "artsDetail":
			url = artsDetail.getUrl();
			break;
		case "history":
			url = _history.getUrl();
			break;
		case "circle":
			url = circle.getUrl();
			break;
		case "order":
			url = order.getUrl();
			break;
		case "chart":
			url = chart.getUrl()+"?type="+type;
			break;	
			
	}
	if (isContain(url, "&"))
	{
		url = url.replace(/\&/g,"@");
	}
	var all_urlMemory = "";
	for(var i=0 ;i<Epg.urlMemory.length ; i++){
		all_urlMemory =all_urlMemory+Epg.urlMemory[i];
	}
	if( (all_urlMemory.indexOf("detail")!=-1&& url.indexOf("detail")!=-1) || 
		(all_urlMemory.indexOf("secondVideoList")!=-1 &&  url.indexOf("secondVideoList")!=-1)
	  ){
		return;
	}else{
		epg.addMemoryElement("urlMemory",url,Epg.urlMemory);
		epg.addMemoryElement("modelMemory",model,Epg.modelMemory);
		epg.addMemoryElement("typeMemory",type,Epg.typeMemory);
		epg.addMemoryElement("focusElementMemory",focusElement,Epg.focusElementMemory);
		epg.addMemoryElement("focusElementIndexMemory",focusElementIndex,Epg.focusElementIndexMemory);
	}
	
}

/**
 *  添加焦点记忆
 * @param id 记忆焦点的元素id
 * @param param 新增的焦点元素
 * @param list 存放焦点的list
 */
Epg.Init.prototype.addMemoryElement = function(id,param,list)
{
	if (!isNullOrEmpty($(id.value)))
	{
		list = $(id).value.split(",");
	}
	list.push(param);
}

/**
 * 获取当前记录的元素
 * @param id
 * @param list
 * @returns
 */
function getMemoryElement(id) {
	var list = $(id).value.split(",");
	if (list.length > 0) {
		return list;
	}
}

/**
 * 加载记忆的页面
 */
Epg.Init.prototype.loadMemoryPage = function(){
	Epg.urlMemory = $("urlMemory").value.split(",");//um=doindex
	var url = Epg.urlMemory.pop();
	if (isContain(url, "?")) {
		url = url+"&lt=memory";
	}else {//doindex?lt=memory
		url = url+"?lt=memory";
	}
	url = url.replace(/\@/g,"&");
	loadPage(url);
}

/**
 * 加载详情页 获取详情页url
 */
Epg.Init.prototype.getDetailPageUrl = function(element,curPage,categoryId)
{
	var hiddenType = _s(element,'input')[0].value;
	var specialBg = "";
	if (epg.model=="homepage"||epg.type=="allSpecial")
	{
		if (!isNullOrEmpty(_s(element,'input')[2]))
		{
			specialBg = _s(element,'input')[2].value;
		}
	}
	var type = epg.getTypeByHiddenType(hiddenType);
	var videoId = isNullOrEmpty(_s(element,'input')[1])?"":_s(element,'input')[1].value;
	return epg.getDetailUrlByType(type,videoId,hiddenType,curPage,categoryId,specialBg);
}

/**
 * 添加滚动
 * @param element 添加滚动的元素
 * @param length 最小滚动长度 超过此长度则要滚动
 */
Epg.Init.prototype.addScroll = function(element,length)
{
	if(typeof(element) !="undefined"){
		var str = reMoveAllSpecialCharacters(element.innerText);
		if (str.length>length)
		{
			var str = element.innerHTML;
			element.innerHTML="<marquee  direction=left >"+str+"</marquee>";
		}
	}
}

/**
 * 去除滚动
 * @param element1 没有滚动标签的元素
 * @param element2 有滚动标签的元素
 */
Epg.Init.prototype.delScroll = function(element1,element2) {
	if (!isNullOrEmpty(element2)) {
		element1.innerHTML = element2.innerHTML;
	}
}

/**
 *加载页面
 */
var loadPage = function(url) {
	if (isContain(url, "?")) {
		url = url
			+"&um="+Epg.urlMemory
			+"&mm="+Epg.modelMemory
			+"&tm="+Epg.typeMemory
			+"&fem="+Epg.focusElementMemory
			+"&feim="+Epg.focusElementIndexMemory;
	}else {
		url = url
			+"?um="+Epg.urlMemory
			+"&mm="+Epg.modelMemory
			+"&tm="+Epg.typeMemory
			+"&fem="+Epg.focusElementMemory
			+"&feim="+Epg.focusElementIndexMemory;
	}
	Epg.url = url;
	window.location.href = Epg.Init.prototype.path+encodeURI(encodeURI(url));
}


function onloadHome() {
	var loadType = "init";
	var model = "homepage";
	var type = $("type").value;
	loadType = dealOnloadParam(model, type, loadType);
	//document.getElementById('info_test').innerHTML += "<p> epg.js执行onloadHome方法，type：" + type + "；loadType：" + loadType + "</p>";
	Home.Init.prototype.initModel(loadType);
}

/**
 * 加载完页面后初始化焦点记忆功能元素
 * 初始化页面元素
 * @param model 
 * @param type
 * @param loadType
 * @returns 页面加载类型
 */
function dealOnloadParam(model,type,loadType) {
	Epg.urlMemory = initMemoryElement("urlMemory");
	Epg.modelMemory = initMemoryElement("modelMemory", Epg.modelMemory);
	Epg.typeMemory = initMemoryElement("typeMemory", Epg.typeMemory);
	Epg.focusElementMemory = initMemoryElement("focusElementMemory", Epg.focusElementMemory);
	Epg.focusElementIndexMemory = initMemoryElement("focusElementIndexMemory", Epg.focusElementIndexMemory);
	if (!isNullOrEmpty($("loadType")) && !isNullOrEmpty($("loadType").value)) {
		loadType = $("loadType").value;
		if ($("loadType").value == "memory") {
			Epg.modelMemory = getMemoryElement("modelMemory");
			model = Epg.modelMemory.pop();
			Epg.typeMemory = getMemoryElement("typeMemory");
			type = Epg.typeMemory.pop();
		}
	}
	epg = new Epg.Init(model,type);
	epg.InitElement();
	return loadType;
}

/**
 * 初始化焦点记忆变量
 * 
 * @param id
 * @returns
 */
function initMemoryElement(id) {
	if (!isNullOrEmpty($(id).value)) {
		return $(id).value.split(",");
	} else {
		return [];
	}
}

function onloadFirstVideoList() {
	var loadType = "init";
	var model = "firstVideoList";
	var type = "firstVideoList";
	loadType = dealOnloadParam(model, type, loadType);
	FirstVideoList.Init.prototype.initModel(loadType);
}

function onloadVideoList() {
	var loadType = "init";
	var model = "secondVideoList";
	var type = "secondVideoList";
	loadType = dealOnloadParam(model, type, loadType);
	SecondVideoList.Init.prototype.initModel(loadType);
}

function onloadMovieDetail() {
	var loadType = "init";
	var model = "movieDetail";
	var type = "movieDetail";
	loadType = dealOnloadParam(model, type, loadType);
	MovieDetail.Init.prototype.initModel(loadType);
}

function onloadSeriesDetail() {
	var loadType = "init";
	var model = "seriesDetail";
	var type = "seriesDetail";
	loadType = dealOnloadParam(model, type, loadType);
	SeriesDetail.Init.prototype.initModel(loadType);
}

function onloadCircle() {
	var loadType = "init";
	var model = "circle";
	var type = "circle";
	loadType = dealOnloadParam(model, type, loadType);
	Circle.Init.prototype.initModel(loadType);
}

function onloadArtsDetail() {
	var loadType = "init";
	var model = "artsDetail";
	var type = "artsDetail";
	loadType = dealOnloadParam(model, type, loadType);
	ArtsDetail.Init.prototype.initModel(loadType);
}

function onloadSearch() {
	var loadType = "init";
	var model = "search";
	var type = "search";
	loadType = dealOnloadParam(model, type, loadType);
	Search.Init.prototype.initModel(loadType);
}

function onloadOrder() {
	var loadType = "init";
	var model = "order";
	var type = "order";
	loadType = dealOnloadParam(model, type, loadType);
	Order.Init.prototype.initModel(loadType);
}
function onloadHistory() {
	var loadType = "init";
	var model = "history";
	var type = $("type").value;
	loadType = dealOnloadParam(model, type, loadType);
	History.Init.prototype.initModel(loadType);
}

function onloadSpecialDetail() {
	var loadType = "init";
	var model = "special";
	var type = "special";
	loadType = dealOnloadParam(model, type, loadType);
	Special.Init.prototype.initModel(loadType);
}

function onloadAllSepcial() {
	var loadType = "init";
	var model = "allSpecial";
	var type = "allSpecial";
	loadType = dealOnloadParam(model, type, loadType);
	AllSpecial.Init.prototype.initModel(loadType);
}

function onloadChart() {
	var loadType = "init";
	var model = "chart";
	var type = "chart";
	loadType = dealOnloadParam(model, type, loadType);
	Chart.Init.prototype.initModel(loadType);
}

/**
 * 通过id获取该元素的children
 * 
 * @param id
 * @returns children集合
 */
function getElements(id) {
	return $(id) != null ? document.getElementById(id).children : [];
}

/**
 * 通过id获取该元素
 * 
 * @param id
 * @returns 该元素
 */
function $(id) {
	return document.getElementById(id);
}

function isContainInList(list, element) {
	var flag = false;
	for (var i = 0; i < list.length; i++) {
		if (list[i] == element) {
			flag = true;
			break;
		}
	}
	return flag;
}

/**
 * 判断对象是否包含某元素
 * 
 * @param object
 *            对象
 * @param element
 *            某元素
 * @returns {Boolean} true包含 false不包含
 */
function isContain(object, element) {
	if (object.toString().indexOf(element) != -1) {
		return true;
	} else {
		return false;
	}
}

function isFocus(element) {
	if (element.className.indexOf("-on") != -1) {
		return true;
	} else {
		return false;
	}
}

/**
 * 获取元素中第一个input的值
 * @param element
 * @returns input 值
 */
function getHiddenInputValue(element) {
	return element.getElementsByTagName("input")[0].value;
}

/**
 * 通过标签名获取元素中的第一个元素
 * @param element 元素
 * @param tagName 标签名
 * @returns 获取到的元素
 */
function getElementByTag(element, tagName) {
	return element.getElementsByTagName(tagName)[0];
}

/**
 * 获取某元素中标签名为tagName的所有元素集合
 * @param element 元素
 * @param tagName 标签名
 */
function _s(element, tagName) {
	return element.getElementsByTagName(tagName);
}

/**
 * 通过className获取元素中的子元素
 */
function getByClassName(element, className) {
	return element.getElementsByClassName(className);
}

/**
 * 将元素设为可见
 */
function block(element) {
	if (element != null) {
		element.style.display = "block";
	}
}

/**
 *将元素隐藏 
 */
function none(element) {
	element.style.display = "none";
}

/**
 * 将元素设为可见
 */
function blockByClass(element) {
	element.className = element.className.replace("none ", "");
	element.className = element.className.replace("block ", "");
	element.className = "block " + element.className;
}

/**
 *将元素隐藏 
 */
function noneByClass(element) {
	element.className = element.className.replace("block ", "");
	element.className = element.className.replace("none ", "");
	element.className = element.className.replace("-enter", "");
	element.className = "none " + element.className;
}

/**
 * 给元素添加获取焦点样式
 * @param element
 * @returns
 */
function blurElement(element) {
	element.className = element.className.replace("-on", "");
	element.className = element.className.replace("-selected", "");
}

/**
 * 去掉元素聚焦样式
 * @param element
 * @returns {String}
 */
function focusElement(element) {
	if (isFocus(element)) {
		return;
	}
	element.className = element.className.replace("-selected", "");
	element.className = element.className + "-on";
}

function selectedElement(element) {
	element.className = element.className.replace("-on", "");
	element.className = element.className + "-selected";
}

function unSelectedElement(element) {
	element.style.background = "";//清空style控制的背景图片
	element.className = element.className.replace("-selected", "");
}

function isNullOrEmpty(str) {
	if ("" == str 
			|| null == str 
			|| "null" == str 
			|| str == undefined
			|| str == "undefined") {
		return true;
	} else {
		return false;
	}
}

function reMoveAllSpecialCharacters(str) {
	str = str.replace(/\ +/g, "");//去掉空格
	str = str.replace(/[ ]/g, ""); //去掉空格
	str = str.replace(/[\r\n]/g, "");//去掉回车换行
	str = str.replace(/<\/?.+?>/g, ""); //去除换行
	str = str.replace(/(^\s*)|(\s*$)/g, ""); //去掉字符串两端的空格 
	return str
}
