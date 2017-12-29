<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
HttpSession s = request.getSession();
%>
<!DOCTYPE html>
<html>
<head>
<meta name="page-view-size" content="1280*720">
<meta charset="utf-8">
<title>classify</title>
<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/pay.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/public/css/util.css" />
</head>
<style>
</style>
<body>
<div class="body" style="overflow:hidden;background:url(../public/images/order/bg_default.png)">
<section>	
<div class="content">
	<div class="heard-img" >
		<div class='header-font'>
			<span style='color:#ffffff'>您正在开通</span>
			<span style='color:#fb8f2c'></span>
			<span style='color:#ffffff'>套餐服务。需要支付金额：</span>
			<span style='color:#fb8f2c'></span>
		</div>
		<img src="<%=path %>/public/images/pay/bar.png" >
	</div>
	<div class="left-div">
		<div class='font font-sp'>
			<span class='span1'>扫码即同意</span><span style='color:#c96efd'>《搜狐付款服务协议》</span><br>
			<span class='span2'>请使用手机的</span><span style='color:#c96efd'>微信“扫一扫”</span><span style='color:#ffffff'>扫码完成支付</span>
		</div>
		<div>
			<img  src="<%=path %>/public/images/pay/qrcode.png">
			<img  src="<%=path %>/public/images/pay/wechat.png" class='div-sp'>
		</div>
	</div>
	<div class="right-div">
		<div class='font font-sp'>
			<span class='span1'>扫码即同意</span><span style='color:#c96efd'>《搜狐付款服务协议》</span><br>
			<span class='span2'>请使用手机的</span><span style='color:#c96efd'>支付宝“扫一扫”</span><span style='color:#ffffff'>扫码完成支付</span>
		</div>
		<div>
			<img  src="<%=path %>/public/images/pay/qrcode.png">
			<img  src="<%=path %>/public/images/pay/alipay.png" class='div-sp'>
		</div>
	</div>
</div>
</section>
</div>	
</body>
<script>
</script>
</html>