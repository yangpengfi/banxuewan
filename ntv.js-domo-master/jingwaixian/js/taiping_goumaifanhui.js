var vvv1;
window.onload = function(){
		document.getElementById('fanhui').focus();
		var Request = new Object();  //取值时使用无需更改
    	Request = GetRequest();  //取值时使用无需更改 需保证GetRequest()存在;
    	vvv1 = Request['from'];
   }
   function GetRequest(){    
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if (url.indexOf("?") != -1){
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++){
				theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
  function lastpage(){ 	
 	window.location.href = 'index.html?from='+vvv1;	
 }
 function focbtn(id){
	
	if(id==1){
		partnow=1;
		document.getElementById('bacbut').style.display = 'block';

	}
	}
	function blubtn(id){
	if(id==1){
		document.getElementById('bacbut').style.display = 'none';
		
		}
	}
