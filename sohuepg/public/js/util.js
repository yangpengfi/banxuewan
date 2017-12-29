function getUserCode(){
	var code = "0000";
	try{
		var evm = new EnReach();
		code = evm.GetSTBID();
	}catch(e){
		code = "0000";
	}
	return code;
}
