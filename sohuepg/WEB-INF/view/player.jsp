<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>player</title>
<style type="text/css">
.container {
	position: absolute;
	left: 0px;
	width: 1280px;
	height: 720px;
}
.seek_control{
	opacity:0;
	position:absolute;
    width:1280px;
	height:203px;
	bottom:0px;
	left:0px;
	visibility:hidden;
}

#tips {
	position: absolute;
	left: 380px;
	top: 200px;
	width: 520px;
	height: 70px;
	line-height: 70px;
	background-color: #000000;
	font-size: 20px;
	color: #eeeded;
	text-indent: 9px;
	border-radius: 10px;
	font-size:28px;
	text-align:center;
	visibility:hidden;
	opacity: 0.5;
}

</style> 

<script src="<%=path%>/public/js/ajax.js"></script>
<script type="text/javascript">

var $ = function(id){
	var o = document.getElementById(id);
	return o;
};


document.onkeypress = grabEvent;
document.onirkeypress = grabEvent;
document.onsystemevent = grabEvent;
function grabEvent(event){
	var keycode = event.which;
	switch(keycode){
		case 1:// 上
		case 38:// 上
		case 65362:// 上
			showSeekCtrl()
			//doVolumeUp();
			return 0;
			break; 
		case 2:// 下
		case 40:// 下
		case 65364:// 下
			showSeekCtrl()
			//doVolumeDown();
			return 0;
			break; 
		case 33:
		case 372:// 节目+（上翻页）
			return 0;
			break;
		case 34:
		case 373://节目-（下翻页）
			return 0;
			break;
		case 3:
		case 37:// 左
		case 65361:
			doLeft()
			return 0;
			break;
		case 4: 
		case 39:// 右
		case 65363:
			doRight()
			return 0;
			break;
		case 13://确认
		case 4097:
			doOk();
			return 0;
			break;
		case 8:// 返回
		case 340:// 返回
			doExit();
			return 0;
			break;
		/*
		case 27:// 退出
		case 339:// 退出
			doExit();
			return 0;
			break;
		case 512:
		case 513:
		case 4098:// 菜单键（新遥控器：互动首页键）
			isMenu = true;
			window.location.href = GlobalVarManager.getItemStr("tvPortalUrl");
			return 0;
			break;
		*/
		case 561://蓝键
		case 572:
		case 835:
			return 0;
			break;
		case 832:// 红
			return 0;
			break;
		case 833:// 绿
			return 0;
			break;
		case 834:										
		case 2307:// 黄键
			//doYellow();	
			return 0;		
			break;
		case 33:// 快进
		case 372:										
		case 375:										
		case 4168:
			doFastForward();
			return 0;
			break;
		case 34:// 快退
		case 373:										
		case 374:										
		case 4167:
			doBackForward();
			return 0;
			break;
		/*
		case 597:										// 静音
		case 4108:
			doMute(); 
			return 0;
			break;
		*/
		case 48:// 数字 0
		case 49:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		
			return 0;
			break;
		case 22201:
			GlobalVarManager.setItemStr("vodNavCheck","true");
			return 0;
			break;
		case 22202:
			GlobalVarManager.setItemStr("vodNavCheck","false");
			return 0;
			break;
		/*下面是vod消息处理部分*/
		case 5226:									
		case 22201:
			//setMediaSource();
			return 0;
			break;
		case 5227:									
		case 22202:	
			return 0;
			break;
		case 5202:
  		//case 13001:
  		    mediaPlayer.play();
			return 0;
			break;	
		case 5203: //服务器连接失败											
			return 0;
			break;
		case 5204:// EIS_VOD_DVB_SERACH_FAILED 无信号,按退出键退出点播
			return 0;
			break;
		case 5221:// EIS_VOD_START_FAILED 不能连接服务器,按退出键退出播放
			return 0;
			break;
		case 5205:// play success
		case 13003:// NGB 开始播放成功
		case 13005:// setPace(快退快进)成功
		case 13007:// seek成功
		case 13013:// stop停止播放成功
		case 13009:// pause暂停播放成功
		case 13011:// resume恢复播放成功
			return 0;		
			break;
		case 5206: // play fail
		case 13004: // NGB开始播放失败
		case 13006: // setPace(快退快进)失败
		case 13008: // seek失败
		case 13010: // pause暂停播放失败
		case 13012: // resume恢复播放失败
		case 13014: // stop停止播放失败
			return 0;
			break;
		case 5209:	
			mediaPlayer.pause();									
			return 0;
			break;
		case 5210:	
			return 0;
			break;
		case 5211:
			//mediaPlayer.stop();
			//playEndFlag = true;										
			return 0;
			break;
		case 5225:
			return 0;
			break;
		/*下面是网络消息处理部分*/
		case 12057:	
		case 5500: // EIS_IP_NETWORK_CONNECT
			return 0;
			break;
		case 12056:
		case 5501:// 网线断开连接EIS_IP_NETWORK_DISCONNECT
			return 0;
			break;
		case 12059:
		case 5502:// 网络连接成功EIS_IP_NETWORK_READY
			return 0;
			break;
		case 12058:
		case 5503:// 网络连接失败EIS_IP_NETWORK_FAILED
			return 0;
			break;
			
		/* 下面是cable消息处理部分 */
		case 10001:	
		case 5550: // cable线连接DVB_CABLE_CONNECT_SUCCESS
			return 0;
			break;
		case 10002:
		case 5551: // cable线失去连接DVB_CABLE_CONNECT_FAILED
			return 0;
			break;
		/* 不需要响应的键 */
		case 514:	// key_epg
		case 521:	// KEY_MAIL
		case 562:	// KEY_BROADCAST
			return 0;
			break;
	}
}

var isPlay = false;
var isPause = false;
var isResume = false;
var isFocus = true;
var isExitPanelShow = false;
var isShowSeekProgress = false;
var isShowVolumeProgress = false;
var isShowInputBox = false;
var isMenu = false;
var playEndFlag = false;
var playStartFlag = false;
var PRE_SEEK_FLAG = false;
var REPLAY_SHOW_FLAG = false;
var ICON_SHOW_FLAG = false;

var CURRENT_TIMER = -1;
var PRE_SEEK_TIMER = -1;
var SEEK_TIMER = -1;
var VOLUME_TIMER = -1;
var CHECK_END_TIMER = -1;
var ICON_TIMER = -1;

var PRE_SEEK_WIDTH = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var backUrl = "${backUrl}";
var duration = parseInt("${displayRunTime}");// 视频时间
var tvPortalUrl = GlobalVarManager.getItemStr("tvPortalUrl");

function init(){	
	//setInputDisplay(0);
	createMediaPlayer();// 创建播放器
	playMedia();// 开始播放
}

var area_code = VOD.areaCode;
if(area_code == ""){
	area_code = VOD.server.regionId;
}
if(area_code == ""){
	area_code = VOD.server.nodeGroupID;
}
var rtsp = "${url}".split(";");
var rtspIp = rtsp[0];
var purchaseToken = rtsp[1];
var serverId = rtsp[2].split(":");
var serverIp = serverId[0];
var playUrl = rtspIp + ";" + purchaseToken + ";" + serverIp + ":8080" + ";areacode=" + area_code + ";client=" + CAManager.cardSerialNumber;
//GlobalVarManager.setItemStr("vodPlayUrl",playUrl);	
function checkNavCheck(){
	var area_code = VOD.areaCode;
	if(area_code == ""){
		area_code = VOD.server.regionId;
	}
	if(area_code == ""){
		area_code = VOD.server.nodeGroupID;
	};
	//区域码小于200也要认证
	if(area_code == "" || area_code == "undefined" || typeof(area_code) == "undefined" || area_code < 200){
		return true;
	}
	return false;
}

function navCheck(){
	var area_code = VOD.areaCode;
	if(area_code == ""){
		area_code = VOD.server.regionId;
	}
	if(area_code == ""){
		area_code = VOD.server.nodeGroupID;
	};		
	var frequency = GlobalVarManager.getItemStr("frequency");
	if(frequency == "" || frequency == "undefined" || typeof(frequency) == "undefined"){
		clearTimeout(showNavTipsTimeout);
		showTips("获取点播信息失败");
		return ;
	}
	var str = "IPQAMPointList=" + frequency + ",0;END";
	VOD.searchParams(str);
}

/*媒体播放对象*/
var mediaPlayer = null;	 // 播放器对象
var mediaID = null ; // 播放器实例ID
var createPlayerSuccess = false;
/*创建播放器对象*/
function createMediaPlayer(){
	mediaPlayer = new MediaPlayer();
	mediaID = mediaPlayer.getPlayerInstanceID();
	var flag = mediaPlayer.bindPlayerInstance(mediaID);
	createPlayerSuccess = flag==0 ? true:false;
	if(createPlayerSuccess){
		var flag_displayMode = mediaPlayer.setVideoDisplayMode(1);
		var flag_refresh = mediaPlayer.refresh();
	}
}
/*设置播放串*/
function setMediaSource(){
	if (typeof(playUrl)!="undefined" && playUrl != null){
		if(createPlayerSuccess){
			GlobalVarManager.setItemStr("playType","VOD");
			mediaPlayer.setMediaSource(playUrl);
			mediaPlayer.play();
		}	
	}
}
var showNavTipsTimeout = -1;
function playMedia(){
	var flag = checkNavCheck();
	if(flag){
		navCheck();
		showTips("获取点播信息失败");
		return;
	}
	setMediaSource();//设置播放串
	isPlay = true;
	isPause = false;

	if(createPlayerSuccess){
		CHECK_END_TIMER = setInterval("isEndPlay()",1000);

		showSeekCtrl();// 显示进度条
		clearTimeout(SEEK_TIMER);
		SEEK_TIMER = setTimeout("hiddenSeekCtrl()", 6000);
		
		$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/play_o.png") no-repeat;';
		showIconControl();
		clearTimeout(ICON_TIMER);
		ICON_TIMER = setTimeout("hiddenIconControl()", 4000);
	}
}

function isEndPlay(){
	var currentPlayTime = mediaPlayer.getCurrentPlayTime();//hhmmss
	var second = timeTosecond(currentPlayTime);
	if(playEndFlag || (second >= duration)){
		/*
		clearInterval(CHECK_END_TIMER);
		mediaPlayer.stop();
		playEndFlag = true;
		mediaPlayer.unbindPlayerInstance(mediaID);
		if(typeof(backUrl) != "undefined" && backUrl != null && backUrl != "" && backUrl != "undefined"){
			window.location.href = backUrl;
		}else{
			window.history.back(-1);
		}
		*/
		showTipsNoTimeout("播放结束，即将退出...");
		setTimeout(function (){
			clearTimeout(SEEK_TIMER);	
			clearInterval(CURRENT_TIMER);
			clearInterval(CHECK_END_TIMER);
			hiddenSeekCtrl();
			hiddenTips();
			mediaPlayer.stop();
			playEndFlag = true;
			mediaPlayer.unbindPlayerInstance(mediaID);
			if(typeof(backUrl) != "undefined" && backUrl != null && backUrl != "" && backUrl != "undefined"){
				window.location.href = backUrl;
			}else{
				window.history.back(-1);
			}
		},6000);	
	}
}


function doRight(){
	if(isExitPanelShow == true || REPLAY_SHOW_FLAG == true){
		hiddenVolumeCtrl();
		hiddenSeekCtrl();
		$("ok").style.background = 'url("${pageContext.request.contextPath}/public/images/player/yes_btn.png") no-repeat';
		$("cancle").style.background = 'url("${pageContext.request.contextPath}/public/images/player/no_btn_focus.png") no-repeat';	
		isFocus = false;
	}else{
		if(isShowVolumeProgress == true){
			hiddenVolumeCtrl();
		}
		// 隐藏进度、清除定时器
		clearTimeout(SEEK_TIMER);	
		clearInterval(CURRENT_TIMER);
		hiddenSeekCtrl();


		/*
		if((parseInt($("seekProcess").style.width) + 740 / 20)>=740
				&&(740-parseInt($("seekProcess").style.width))>0
				&&(740-parseInt($("seekProcess").style.width))<=20){
			$("seekProcess").style.width = (720 + (740-parseInt($("seekProcess").style.width))) +"px";
			$("seekPoint").style.left = parseInt($("seekPoint").style.left) + (740-parseInt($("seekProcess").style.width)) + "px";
		}else{
			if((parseInt($("seekProcess").style.width) + 740 / 20)>=740){// 超过进度条长度、设为固定值
				$("seekProcess").style.width = 740 +"px";
				$("seekPoint").style.left = 730 + "px";
			}else{
				$("seekProcess").style.width = parseInt($("seekProcess").style.width) + 740 / 20 + "px";
				$("seekPoint").style.left = parseInt($("seekPoint").style.left) + 740 / 20 + "px";
			}
		}
		// 计算时间偏移量
		var seekTime = Math.floor((parseInt($("seekProcess").style.width) / 740) * Math.floor(duration));
		*/
		
		var seekProcessWith = parseInt($("seekProcess").style.width);
		var pace = 740 / 20;
		/*
		if((seekProcessWith + pace)>=740 &&(740-seekProcessWith)>0 &&(740-seekProcessWith)<=20){
			$("seekProcess").style.width = (720 + (740-seekProcessWith)) +"px";
			$("seekPoint").style.left = seekProcessWith + (740-seekProcessWith) + "px";
		}else{
			if((seekProcessWith + 740 / 20)>=740){// 超过进度条长度、设为固定值
				$("seekProcess").style.width = 740 +"px";
				$("seekPoint").style.left = 730 + "px";
			}else{
				$("seekProcess").style.width = seekProcessWith + pace + "px";
				$("seekPoint").style.left = (seekProcessWith + pace - 10) + "px";
			}
		}
		*/
		if((seekProcessWith + 740 / 20)>=740){// 超过进度条长度、设为固定值
			$("seekProcess").style.width = 740 +"px";
			$("seekPoint").style.left = 730 + "px";
		}else{
			$("seekProcess").style.width = seekProcessWith + pace + "px";
			$("seekPoint").style.left = (seekProcessWith + pace - 10) + "px";
		}
		// 计算时间偏移量
		var seekTime = Math.floor((seekProcessWith / 740) * Math.floor(duration));
		
		PRE_SEEK_WIDTH = parseInt($("seekProcess").style.width);
		$("play_time").innerHTML = " " + secondToStringTime(seekTime);
		
		
		
		
		// 显示进度
		justShowSeekControl();
		
		PRE_SEEK_FLAG = true;
		
		if(isPlay == true){
			clearTimeout(PRE_SEEK_TIMER);
			$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/play_o.png") no-repeat';
			PRE_SEEK_TIMER = setTimeout("hiddenSeekCtrl()", 4000);
		}
		
	}
}

function doLeft(){
	if(isExitPanelShow == true || REPLAY_SHOW_FLAG == true){
		hiddenVolumeCtrl();
		hiddenSeekCtrl();
		$("ok").style.background = 'url("${pageContext.request.contextPath}/public/images/player/yes_btn_focus.png") no-repeat';
		$("cancle").style.background = 'url("${pageContext.request.contextPath}/public/images/player/no_btn.png") no-repeat';	
		isFocus = true;
	}else{
		if(isShowVolumeProgress == true){// 隐藏音量进度
			hiddenVolumeCtrl();
		}
		
		// 隐藏进度
		clearTimeout(SEEK_TIMER);	
		clearInterval(CURRENT_TIMER);
		hiddenSeekCtrl();

		$("seekProcess").style.width = Math.floor(parseInt($("seekProcess").style.width) - 740 / 20) + "px";
		$("seekPoint").style.left = Math.floor(parseInt($("seekPoint").style.left) - 740 / 20) + "px";
		
		if(parseInt($("seekProcess").style.width) <= (740 / 20)){
			$("seekProcess").style.width = 0 +"px";
			$("seekPoint").style.left = -5 + "px";
		}
		
		var seekTime = Math.floor((parseInt($("seekProcess").style.width) / 740) * Math.floor(duration));
		
		PRE_SEEK_WIDTH = parseInt($("seekProcess").style.width);
		
		$("play_time").innerHTML = " " + secondToStringTime(seekTime);
		
		justShowSeekControl();
		
		
		// 进度预览标记
		PRE_SEEK_FLAG = true;
		if(isPlay == true){// 正在播放
			clearTimeout(PRE_SEEK_TIMER);
			PRE_SEEK_TIMER = setTimeout("hiddenSeekCtrl()", 6000);
			$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/play_o.png") no-repeat';
		}
	}
}
function doOk(){
	if(isExitPanelShow == true || REPLAY_SHOW_FLAG == true){
		PRE_SEEK_FLAG = false;
		if(isFocus == true){
			if(REPLAY_SHOW_FLAG == true){// 重播
				doReplay();
			}else{// 退出
				clearInterval(CHECK_END_TIMER);
				if(createPlayerSuccess){// 解除绑定
					mediaPlayer.stop();
					mediaPlayer.unbindPlayerInstance(mediaID);
				}
				if(typeof(backUrl) != "undefined" && backUrl != null && backUrl != "" && backUrl != "undefined"){
					window.location.href = backUrl;
				}else{
					history.back();
				}
			}
		}else{
			if(REPLAY_SHOW_FLAG == true){// 重播
				clearInterval(CHECK_END_TIMER);
				if(createPlayerSuccess){// 解除绑定
					mediaPlayer.stop();
					mediaPlayer.unbindPlayerInstance(mediaID);
				}
				if(typeof(backUrl) != "undefined" && backUrl != null && backUrl != "" && backUrl != "undefined"){
					window.location.href = backUrl;
				}else{
					history.back();
				}
			}else{
				hiddenExitPanel();
			}
		}
		
	} else if(PRE_SEEK_FLAG == true){// 快进进度条 后点击 ok
		
		clearTimeout(SEEK_TIMER);
		clearTimeout(PRE_SEEK_TIMER);
		clearInterval(CURRENT_TIMER);
		// parseInt($("seekProcess").style.width)
		var currentTime;
		if(PRE_SEEK_WIDTH <= 0){
			currentTime = 0;
		}else{
			// 计算进度条时间
			currentTime = Math.floor((parseInt(PRE_SEEK_WIDTH) / 740) * Math.floor(duration));
		}
		
	    // 设置某个时间点 播
		if(currentTime != "" && currentTime != "undefined" && typeof(currentTime) != "undefined"){
			currentTime = parseInt(currentTime,10);
		}else{
			currentTime = 0;
		}
	    /*
		if(currentTime==0){
			mediaPlayer.play(); //开始播放
		}else{// 设置偏移播放
			var seekCode = mediaPlayer.seek(1,secondToString(currentTime));
		}
	    */
		var seekCode = mediaPlayer.seek(1,secondToString(currentTime));
		PRE_SEEK_FLAG = false;
		isPlay = true;
		isPause = false;
		showSeekCtrl();
		clearTimeout(SEEK_TIMER);
		SEEK_TIMER = setTimeout("hiddenSeekCtrl()", 6000);
	} else {
		PRE_SEEK_FLAG = false;
		playOrPause();	
	}
}

function doExit(){
	showExitPanel();
}

function doBack(){
	showExitPanel();
}
/*真正的返回退出操作*/
function exitPage(){
	if(createPlayerSuccess){// 解除绑定
		mediaPlayer.stop();
		mediaPlayer.unbindPlayerInstance(mediaID);
	}
	if(typeof(backUrl) != "undefined" && backUrl != null && backUrl != "" && backUrl != "undefined"){
		window.location.href = backUrl;
	}else{
		if(typeof(tvPortalUrl) != "undefined" && tvPortalUrl != null && tvPortalUrl != "" && tvPortalUrl != "undefined"){
			window.location.href = tvPortalUrl;
		}else{
			window.history.back(-1);
		}
	}
}


function playOrPause(){
	var needPlay = true;
	var currentStatus = mediaPlayer.getPlaybackMode();
	var playMode = currentStatus.PlayMode.toLowerCase();
	switch(playMode){
		case "normal":
		case "play":
			// 暂停
			needPlay = false;
			break;
		case "trickmode":
		case "forward":
		case "fastforward":
		case "backward":
		case "pause":
			// 播放
			needPlay = true;
			break;
	}
	
	if(needPlay||isPause==true){// 由暂停状态转播放状态
		mediaPlayer.resume();// 重新播放
		
		// 播放图标
		$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/play_o.png") no-repeat';
		isPlay = true;
		isPause = false;
		
		// 显示提示icon 4秒后隐藏
		$("play_icon_control").style.background = 'url("${pageContext.request.contextPath}/public/images/player/play_o.png")  no-repeat';
		showIconControl();
		clearTimeout(ICON_TIMER);
		ICON_TIMER = setTimeout("hiddenIconControl()", 4000);
		
		// 显示进度 6秒后 隐藏
		showSeekCtrl();
		clearTimeout(SEEK_TIMER);
		SEEK_TIMER = setTimeout("hiddenSeekCtrl()", 6000);
		
	}else{
		mediaPlayer.pause();// 暂停
		
		$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/pause_o.png") no-repeat';
		isPlay = false;
		isPause = true;

		// 操作提示icon
		clearTimeout(ICON_TIMER);
		$("play_icon_control").style.background = 'url("${pageContext.request.contextPath}/public/images/player/pause_o.png") no-repeat';
		showIconControl();
		ICON_TIMER = setTimeout("hiddenIconControl()", 4000);
		
		// 显示进度
		clearInterval(CURRENT_TIMER);// 清除定时器
		//showCurrentTime();// 显示当前时间
		showSeekCtrl();// 显示控件
	}
}



/********* 播放进度开始  *********/
function showSeekCtrl(){
	clearTimeout(SEEK_TIMER);
	showDuration();// 显示总时长
	$("seek_control").style.opacity = 1;
	$("seek_control").style.visibility = "visible";	
	isShowSeekProgress = true;
	PRE_SEEK_FLAG = false;
	if(isPause == true){// 暂停状态
		// 清除定时器
		clearInterval(CURRENT_TIMER);
		showCurrentTime();
		$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/pause_o.png") no-repeat;';
	}else{
		$("play_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/play_o.png") no-repeat;';
		// 定时器（正在播放的时间）
		clearInterval(CURRENT_TIMER);
		CURRENT_TIMER = setInterval("showCurrentTime()", 500);
	}
}

function hiddenSeekCtrl(){
	//if(isPause == true) return;// 暂停状态不隐藏
	$("seek_control").style.visibility = "hidden";	
	$("seek_control").style.opacity = 0;
	isShowSeekProgress = false;
	PRE_SEEK_FLAG = false;
}
function justShowSeekControl(){
	showDuration();
	$("seek_control").style.visibility = "visible";	
	$("seek_control").style.opacity = 1;
}
/********* 播放进度结束  *********/

/********* 显示音量进度 *********/
function showVolumeCtrl(volume){
	isShowVolumeProgress = true;
	isShowSeekProgress = false;
	hiddenSeekCtrl();
	//var volume = mediaPlayer.getVolume();
	$("voiceProcess").style.width = (608 * volume)/100 + "px";
	$("voicePoint").style.left = (608 * volume)/100 + "px";
	$("showVoice").innerHTML = volume;
	if(volume <= 0){// 显示静音 
		$("voice_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/mute_silent.png") no-repeat';
	}else{
		$("voice_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/vo.png") no-repeat';
	}
	VOLUME_TIMER = setTimeout(hiddenVolumeCtrl, 5000);
	$("voice_control").style.visibility = "visible";
	$("voice_control").style.opacity = 1;
}
function hiddenVolumeCtrl(){
	$("voice_control").style.visibility = "hidden";	
	$("voice_control").style.opacity = 0;
	isShowVolumeProgress = false;
	if(isPause == true) showSeekCtrl();// 显示播放进度
	hiddenIconControl();
}

function doVolumeUp(){
	var intVolume = mediaPlayer.getVolume();
	if(PRE_SEEK_FLAG == true || isShowVolumeProgress == true){
		hiddenSeekCtrl();
	}
	hiddenSeekCtrl();
	hiddenIconControl();
	clearTimeout(VOLUME_TIMER);
	if(intVolume>=100){
		m=100;
		return;
	}
	if (intVolume <= 100) {
		intVolume += 1;
		mediaPlayer.setVolume(intVolume);
	}
	showVolumeCtrl(intVolume);
}

function doVolumeDown(){
	var intVolume = mediaPlayer.getVolume();
	if(PRE_SEEK_FLAG == true || isShowVolumeProgress == true){
		hiddenSeekCtrl();
	}
	hiddenSeekCtrl();
	hiddenIconControl();
	clearTimeout(VOLUME_TIMER);
	if(intVolume<0){
		return;
	}
	if (intVolume >= 1) {
		intVolume -= 1;
		mediaPlayer.setVolume(intVolume);
	} 
	if(intVolume <= 0){// 显示静音 
		$("voice_icon").style.background = 'url("${pageContext.request.contextPath}/public/images/player/mute_silent.png") no-repeat;';
	}
	showVolumeCtrl(intVolume);
}

function showExitPanel(){
	hiddenSeekCtrl();
	$("exit_ctrl_text").innerHTML = "确定退出播放?";
	$("exit_ctrl").style.visibility = "visible";	
	isExitPanelShow = true;	
}
function hiddenExitPanel(){
	hiddenSeekCtrl();
	$("exit_ctrl").style.visibility = "hidden";	
	isExitPanelShow = false;
}


var showTipsTimeout;
var showTipsFlag = false;
function showTips(msg){
	clearTimeout(showTipsTimeout);
	$("tips").innerHTML = msg;
	$("tips").style.visibility = "visible";
	showTipsTimeout = setTimeout(hiddenTips, 8000);
	showTipsFlag = true;	
}
function showTipsNoTimeout(msg){
	clearTimeout(showTipsTimeout);
	$("tips").innerHTML = msg;
	$("tips").style.visibility = "visible";
	showTipsFlag = true;	
}
function hiddenTips(){
	$("tips").style.visibility = "hidden";	
	showTipsFlag = false;	
}

// 视频时长
function showDuration(){
	if(typeof(duration) != "undefined" && duration != null && duration != "" && duration != "undefined"){
		duration = parseInt(duration,10);
	}else{
		duration = 0;
	}
	$("end_time").innerText = secondToStringTime(duration);
}

// 当前播放时间
function showCurrentTime(){	
	var currentPlayTime = mediaPlayer.getCurrentPlayTime();//hhmmss
	var second = timeTosecond(currentPlayTime);
	if(playEndFlag || (second > duration)){
		second = duration;
	}else if(playStartFlag || second < 0){
		second = 0;
	}
	var barWidth = Math.floor(second/duration*740);
	if(barWidth <= 0 ){
		$("play_time").innerText = secondToStringTime(0);
		$("seekProcess").style.width = 0 + "px";
		$("seekPoint").style.left = 0 + "px";
	}else{
		$("play_time").innerText = secondToStringTime(second);
		$("seekProcess").style.width = barWidth + "px";
		$("seekPoint").style.left = (barWidth - 10) + "px";
	}

}
function timeTranfrom(time) {
	hours = 0;
	minutes = 0;
	seconds = 0;
	if(time >= 3600){
		hours = Math.floor(time / 3600);
		minutes = Math.floor((time - hours * 3600) / 60);
		seconds = Math.floor(time - hours * 3600 - minutes * 60);
	}else if(time < 3600 && time >= 60){
		minutes = Math.floor(time / 60);
		seconds = Math.floor(time - minutes * 60);
	}else{
		seconds = Math.floor(time);	
	}
	seconds = seconds - seconds%10;
}

function showIconControl(){
	$("play_icon_control").style.visibility = "visible";
	$("play_icon_control").style.opacity = 1
	ICON_SHOW_FLAG = true;
}
function hiddenIconControl(){
	$("play_icon_control").style.visibility = "hidden";
	$("play_icon_control").style.opacity = 0;
	ICON_SHOW_FLAG = false;
}

function playBySeekTime(time) {   
	var code = mediaPlayer.seek(1,time);
	$("begin_time").innerHTML = "code："+code;
    if (code == 0) {
    	$("begin_time").innerHTML = "成功："+time;
		showSeekCtrl();
	}
}
function setMute(o){
	mediaPlayer.setMuteFlag(o);
	if(o == 1){
		$("mute_static").style.visibility = "visible";
		$("mute_static").style.opacity = 1;
	}else{
		$("mute_static").style.visibility = "hidden";
		$("mute_static").style.opacity = 0;
	}
}

/*将hhmmss这样格式的时间转换为s*/
function timeTosecond(_time){
	var _time = _time + "";	
	var hour = _time.substr(0,2);
	var minute = _time.substr(2,2);
	var second = _time.substr(4,2);
	var result = 0;
	if(hour != ""){
		hour = parseInt(hour,10);
	}else {
		hour = 0;
	}
	if(minute != ""){
		minute = parseInt(minute,10);
	}else{
		minute = 0;
	}
	if(second != ""){
		second = parseInt(second,10);
	}else{
		second = 0;
	}
	result = hour * 3600 + minute * 60 + second;
	return result; 
}

/*将秒时间显示为字符串hh:mm:ss*/
function secondToStringTime(__sec){
	var hour = Math.floor(__sec/3600);
	var minute = Math.floor((__sec - hour*3600)/60);
	var second = __sec - hour*3600 - minute*60;
	hour = hour>9?hour:"0"+hour;
	minute = minute>9?minute:"0"+minute;
	second = second>9?second:"0"+second;
	return hour+":"+minute+":"+second;
}

/*将秒时间显示为字符串hhmmss*/
function secondToString(__sec){
	var hour = Math.floor(__sec/3600);
	var minute = Math.floor((__sec - hour*3600)/60);
	var second = __sec - hour*3600 - minute*60;
	hour = hour>9?hour:"0"+hour;
	minute = minute>9?minute:"0"+minute;
	second = second>9?second:"0"+second;
	return "" + hour + minute +second;
}
/*快进*/
function doFastForward(){
	var currStatus = mediaPlayer.getPlaybackMode();
	var currSpeed = currStatus.Speed;
	var speed = parseInt(currSpeed.substr(0,currSpeed.length - 1),10);
	if (speed <= 1){
		speed = 8;
	}else if (speed == 8){
		speed = 16;
	}else if (speed == 16){
		speed = 32;
	}else if (speed == 32){
		speed = 8;
	}
	mediaPlayer.setPace(speed);
	//$("speedImg").src = "image/ff_" + speed + ".png";
	//$("speedTips").style.visibility = "visible";
}

/*快退*/
function doBackForward(){
	var currStatus = mediaPlayer.getPlaybackMode();
	var currSpeed = currStatus.Speed;
	var speed = parseInt(currSpeed.substr(0,currSpeed.length - 1),10);
	if (speed >= 0){
		speed = -8;
	}else if (speed == -8){
		speed = -16;
	}else if (speed == -16){
		speed = -32;
	}else if (speed == -32){
		speed = -8;
	}
	mediaPlayer.setPace(speed);
	speed = Math.abs(speed);				
	//$("speedImg").src = "image/fb_" + speed + ".png";
	//$("speedTips").style.visibility = "visible";
}
function doReplay(){
	document.location.reload();
}
function preConfirmIfReplay(){
	setTimeout("confirmIfReplay()", 4000);	
}
function confirmIfReplay(){
	if(PRE_SEEK_FLAG == true){
		hiddenSeekCtrl();
		PRE_SEEK_FLAG = false;
	}
	$("exit_ctrl_text").innerHTML = "播放结束是否重新播放?"
	$("exit_ctrl").style.opacity = 1;
	$("exit_ctrl").style.visibility = "visible";
	REPLAY_SHOW_FLAG = true;	
}


/******** 输入时间点  **********/

var inputCount = 0;
var inputTimer = -1;
function setInputDisplay(o) {
	
    if (o == 1) {
    	inputCount = 0;
        $("input_box").style.visibility = "visible";
        $("txtInput").focus();
        $("txtInput").value="";
        isShowInputBox = true;
        showSeekCtrl();
        inputTimer = setInterval("checkInputCount()", 1000);
    } else {
        $("input_box").style.visibility = "hidden";
        $("txtInput").blur();
        isShowInputBox = false;
        clearInterval(inputCount);
        hiddenSeekCtrl();// 隐藏进度
    }
}
function checkInputCount() {
	inputCount++;
    if (inputCount > 15) { 
    	setInputDisplay(0); 
    	clearInterval(inputTimer); 
    }
}
/*按黄键时显示或者隐藏输入框*/
function doYellow(){
	if(isShowInputBox){
		setInputDisplay(0);
	}else{
		setInputDisplay(1);	
	}
}
//window.onunload = exitPage;
</script>
</head>

<body onload="init()" bgcolor="transparent" leftmargin="0" topmargin="0" style="width:1280px; height:720px;">
	<div class="container">
		<!-- 视频 -->
		<div class="video"></div>
		<!-- 播放进度条 -->
		<div id="play_icon_control" style="visibility:hidden;background:url(${pageContext.request.contextPath}/public/images/player/play_o.png) no-repeat;position:absolute;left:1000px;top:80px;width:87px;height:41px;"></div>
		<div id="seek_control" class="seek_control">
			<div id="title" style="position:absolute;left:50px;top:5px;width:80%;height:41px;font-size:20px;color:white;">${videoName}</div>	
			<div id="play_icon" style="position:absolute;left:50px;top:45px;width:87px;height:41px;background:url(${pageContext.request.contextPath}/public/images/player/play_o.png) no-repeat;"></div>																							
		    <div id="play_time" style="position:absolute; text-align:center; left:37px; top:106px; font-size:20px;color:white;"></div>						
		    <div id="end_time" style="position:absolute; text-align:center; left:888px; top:106px; font-size:20px;color:white;"></div>									
		    <div id="begin_time" style="position:absolute; text-align:center; left:440px; top:59px; font-size:20px;color:white;"></div>
		    <div style="position:absolute; left:132px; top:99px; width:740px;height:40px; ">
			    <div id="seekProcessBg" style="position:absolute;border-radius:15px; left:0px; top:0px; width:740px; height:40px;background:url(${pageContext.request.contextPath}/public/images/player/process_bg.png) repeat; "></div>
			    <div id="seekProcess" style="position:absolute; left:0px; top:-6px; width:0%; height:40px;background:url(${pageContext.request.contextPath}/public/images/player/process.png) repeat;"></div>
			    <div id="seekPoint" style="position:absolute; left:0px; top:-4px;"><img src="${pageContext.request.contextPath}/public/images/player/point.png" /></div>
		    </div>
		    <div id="staticBg" style="position:absolute; left:0px; bottom:5px; width:1280px; height:41px;background:url(${pageContext.request.contextPath}/public/images/player/static_bg.png) repeat;"></div>
		</div>
		
		<!-- 音量进度条 -->
		<div id="voice_control" style="visibility:hidden;position:absolute;left:0px; bottom:0px; width:1280px;height:162px;">	
			<div id="voice_icon" style="position:absolute;left:140px;top:5px;width:87px;height:41px;background:url(${pageContext.request.contextPath}/public/images/player/vo.png) no-repeat;"></div>
			<div style="position:absolute; left:235px; top:8px; width:643px; height:40px;">
				<div style="position:absolute; left:2px; top:0px; width:643px; height:40px;background:url(${pageContext.request.contextPath}/public/images/player/process_bg.png) repeat;"></div>
				<div id="voiceProcess" style="position:absolute; left:2px; top:0px; width:50px; height:40px;background:url(${pageContext.request.contextPath}/public/images/player/vo_process.png) repeat-x;"></div>
		    	<div id="voicePoint" style="position:absolute;left:20px;top:0px;"><img src="${pageContext.request.contextPath}/public/images/player/vo_point.png" /></div>
			</div>
			<div id="showVoice" style="position:absolute; left:850px; top:16px; text-align:center; font-size:20px;color:black;">99</div>
		</div>	
	</div>
	
	<div id="tips" >正在退出，请稍候！</div>
		
	<div id="exit_ctrl" style="position:absolute; top:120px; left:261px; width:757px; height:271px; background:url(${pageContext.request.contextPath}/public/images/player/tip.png) no-repeat;visibility:hidden;">
		<div style="position:absolute; left:0px; top:5px; width:100%; height:45px; font-size:28px; color:#FFF; text-align:center">温馨提示</div>
		<div id="exit_ctrl_text" style="position:absolute; left:25px; top:70px; width:325px; height:100px; font-size:28px; color:#FFF; text-align:center">您确定要退出观看吗？</div>
	    <div id="ok" style="position:absolute; left:80px; top:180px; width:244px; height:64px; background:url(${pageContext.request.contextPath}/public/images/player/yes_btn_focus.png) no-repeat;"></div>
	    <div id="cancle" style="position:absolute; right:80px; top:180px; width:244px; height:64px; background:url(${pageContext.request.contextPath}/public/images/player/no_btn.png) no-repeat;"></div>
	</div>
	
	<!-- 机顶盒出现input聚焦锁死
	<div id="input_box" style="visibility:hidden;">
	    <div id="location_bg" style="position:absolute;left:470px;top:300px;">
	    	<div id="img_icon" style="position:absolute;width:41px;height:41px;background:url(${pageContext.request.contextPath}/public/images/player/vo_point.png) no-repeat;"></div>
	    </div>	
	    <div id="location" style="position:absolute;left:581px;top:324px;width:129px;height:26px;">
	        <input id="txtInput" type="text" value="" style="background-color:transparent;border:0px;width:85px;color:#fff;"/>
	        min
	    </div>
	</div>	
 	-->
</body>
</html>
