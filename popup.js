
$(function (){ 
           chrome.runtime.onMessage.addListener(function(request){
              if(localStorage.shopname==""||localStorage.shopname==null){
                 localStorage.shopname=request;
              } 
           });
           $("#submit1").click(function(){
                console.log("shopname"+localStorage.shopname);
                chrome.tabs.getSelected(function(tab){
                      console.log("当前地址"+tab.url);
                      if(localStorage.shopname==""||localStorage.shopname==null){
                             createNoticeElement("Please relogin");
                             setTimeout(function(){createNoticeElement("");},5000);
                      }else{
                        fetch(tab,localStorage.shopname);
                      }         
                });
        
           });   
   }); 

function fetch(tab,acountName){
    var url1="http://k2b-bulk.ebay.co.uk/ws/eBayISAPI.dll?MfcISAPICommand=ListingConsole&currentpage=LCActive&pageNumber=1&searchField=ItemTitle&searchValues=&StoreCategory=10647449015&Status=All&Format=All&matchCriteria=and&srcFld_1=Title&searchOpDd_1=CONTAINS&srcVal_1=&lrowcount=1&srcType=0&searchSubmit=Search&goToPage=";
    if(tab.url.startWith("http://k2b-bulk.ebay.co.uk/ws/eBayISAPI.dll?MfcISAPICommand=ListingConsole")){
      $("#submit1").attr("disabled","disabled").text("Fetching...");
      createNoticeElement("Baby is trying to fetching...");
      chrome.tabs.executeScript(tab.id,{file:'jquery.min.js'},function(){
            chrome.tabs.executeScript(tab.id,{file:'content.js'},function(){
                 chrome.tabs.sendMessage(tab.id,acountName,function(json){
                    chrome.runtime.onMessage.addListener(function(request){
                        $("#submit1").removeAttr("disabled");
                        $("#submit1").text("fetchData");
                        var message3 = "Information fetching out！！！";
                        createNoticeElement(message3);
                        setTimeout(function(){createNoticeElement("Fetching again ？");},5000);
                    }); 
                 });  
            });
       });  
    }else{
      var message1 = "Please fetch information from correct-path！！！";
      createNoticeElement(message1);
      setTimeout(function(){createNoticeElement("");},5000);
    }
}


 String.prototype.endWith=function(s){
  if(s==null||s==""||this.length==0||s.length>this.length)
     return false;
  if(this.substring(this.length-s.length)==s)
     return true;
  else
     return false;
  return true;
 }
 String.prototype.startWith=function(s){
  if(s==null||s==""||this.length==0||s.length>this.length)
   return false;
  if(this.substr(0,s.length)==s)
     return true;
  else
     return false;
  return true;
 }

 function createNoticeElement(anymessage){
   $("#noticeMessageDiv").css('display','block'); 
   $("#noticeMessage").text(anymessage);
 }


