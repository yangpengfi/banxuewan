<%@page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sp" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<!DOCTYPE html>
<html>    
<head>
<meta charset="utf-8">
<title>媒资注入</title>
</head>
<body >
	<form action="intest">
	<div>
		<label>媒资注入</label>
		<input type="submit" value="注入"/>
	</div>
	</form>
	<hr/>
	<form action="gettest">
	<div>
		<label>获取</label>
		<input type="submit" value="获取"/>
	</div>
	</form>
	<hr/>
	<form action="deltest">
	<div>
		<label>媒资删除</label>
		<input type="submit" value="删除"/>
	</div>
	</form>
	<hr/>
	<form action="authtest">
	<div>
		<label>鉴权</label>
		<input type="submit" value="鉴权"/>
	</div>
	</form>
	<hr/>
	<form action="playtest">
	<div>
		<label>播放</label>
		<input type="submit" value="播放"/>
	</div>
	</form>
	<hr/>
	<form action="pricetest">
	<div>
		<label>询价</label>
		<input type="submit" value="询价"/>
	</div>
	</form>
	
	<hr/>
	<textarea cols="100" rows="100">${message}</textarea>
	
</body>

</script>
</html>