var storeName;
chrome.runtime.onMessage.addListener(function(message,tab){
          storeName = message;
      });
var productList = $("#tbl_mu_active_tbl_id_b_0").find("tr");
function sendData(message,i){
			var id =$(productList[i]).attr("id");
			if(checkNumber(id)){
					  var productName = $(productList[i]).find("td[id=Title]").find("a").text();
					  var productSku =  $(productList[i]).find("td[id=CustomLabel]").find("a").text().replace("SaveCancel","");
					  var productId  =  $(productList[i]).find("td[id=ItemID]").find("div").text();
					  var productInformation={
				             	               Platform:"ebay",
				             	               Store:message,
					  	                       ProductName:productName,
					  	                       SKU:productSku,
					  	                       ProductId:productId
					       };
					  var obj = JSON.stringify(productInformation);
                      $.ajax({
                      	url:"https://www.baidu.com/?",
                      	type:"POST",
                        data:"",
                      	success: function(data){
                      		console.log("数据发送"+obj);
                      	},
                      	error: function(message){
                      		alert("目标客户端测试异常！"+message);
                      	}
                      });
            }          
		    if(i<productList.length){
		    	sendData(message,i+1)
		    }else{
            var taskMessage = "run out";
            console.log("run out");
            chrome.runtime.sendMessage(taskMessage,function(){
                console.log("发送消息------------");
            });
        }
 }	

 setTimeout(function(){
      var alldata=sendData(storeName,0);
 },3000);		
//判断id是纯数字
function checkNumber(theObj) {  
    var reg = /^[0-9]+.?[0-9]*$/;  
    if (reg.test(theObj)) {  
        return true;  
    }  
    return false;  
}  