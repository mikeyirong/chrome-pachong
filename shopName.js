alert("what a fuck!!!");
var submit = document.getElementById("sgnBt");
submit.onclick =function(){
	var list= getElementByClassName("input","fld");
	var shopName = list[3].value;
	chrome.runtime.sendMessage(shopName,function(){
		console.log("发送消息------------");
	});
    console.log("账号信息"+list[3].value);
    console.log("list"+list[3].value);
};
function getElementByClassName(TagName,classname){
    var tags=document.getElementsByTagName(TagName);
    var list=[];
    for(var i in tags)
    {
        var tag=tags[i];
        if(tag.className==classname){list.push(tag);}
    }
    return list;
}
