<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <meta name="page-view-size" content="1280*720">
    <title>My JSP 'load.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  </head>
    <script src="<%=path %>/public/js/float.js"></script>
  <style>
  	body{
  		background-image:url(public/images/load_bg.jpg);
		background-repeat:no-repeat;
		width:1280px;
		height:720px;
  	}
  	.lightboxs{width:300px;background:#FFFFFF;border:0px solid #ccc;line-height:32px;}
  	.lightbox{width:300px;background:#FFFFFF;border:1px solid #ccc;line-height:25px; top:20%; left:20%;}
	.lightbox dt{background:#f4f4f4; padding:5px;}
	.ddbg{
		background:url(public/images/sohulogo.png);
		background-size:100% 100%;
		background-repeat:no-repeat;
		width:190px;
		height:55px;
	}
  </style>
  
<body  style="overflow:hidden;margin: 0px;" >
  		<div id="idBox" class="lightbox">
		  <dt id="idBoxHead"><b>提示</b> </dt>
		  <dd>
		  	   请上报MAC地址进行验证！
		    <br/><br />
		    <input name="" type="button" value=" 关闭 " id="idBoxCancel" />
		  	 <br/><br />
		  </dd>
		</div>
		<div id="loaddiv" class="lightboxs ddbg">
		</div>
 </body>
<script src="<%=path %>/public/js/ajax.js"></script>
<script>
var baseUrl="<%=basePath %>";
var idBox = new LightBox("idBox");
var loaddiv = new LightBox("loaddiv");
loaddiv.Show();
loaddiv.Center = false;
//loaddiv.Box.style.left ="45%";
//loaddiv.Box.style.top = "38%";
loaddiv.Box.style.left ="543px";
loaddiv.Box.style.top = "301px";
loaddiv.Box.style.marginTop = loaddiv.Box.style.marginLeft = "0";

var i =0;	
var interval = window.setInterval(function getMacVerify(){
	    	i++;
	    	if(i == 2){
	    		window.clearInterval(interval);
	    		//loaddiv.Close();
	    		//idBox.Show();
				//idBox.Center = false;
				//idBox.Box.style.left = idBox.Box.style.top = "40%";
				//idBox.Box.style.marginTop = idBox.Box.style.marginLeft = "0";
				location.href="${pageContext.request.contextPath}/index?model=homePage";
	    	}
}, 1000);

function jumpPage() { 
	if (event.keyCode==13 || event.keyCode=="KEY_ENTER"){
		idBox.Close();
		window.location.href= window.location.href;
	}
}	
window.document.onkeydown=function jumpPage(event) { 
	//右键
	if(event.keyCode == 65363 || event.keyCode == 39 ||  event.keyCode == 'KEY_RIGHT'){
		fun_right(); 
	}
	//下键
	else if(event.keyCode == 65364 ||event.keyCode == 40 || event.keyCode == 'KEY_DOWN'){
		fun_down();
	}
	//上键
	else if(event.keyCode == 65362 || event.keyCode == 38 ||  event.keyCode == 'KEY_UP'){
		fun_up();
	}
	//左键
	else if(event.keyCode == 65361 || event.keyCode == 37 || event.keyCode == 'KEY_LEFT' ){
		fun_left(); 
	}
	else if(event.keyCode==65293 || event.keyCode == 13 || event.keyCode=="KEY_ENTER" ){
		fun_enter(); 
	}
	//返回
	else if (event.keyCode==65367 ||event.keyCode==8 || event.keyCode==640){
		//window.location.href=baseUrl+"index?mac="+mac;
		fun_return();
	}
}
</script>
</html>
