
function ajax (option){
    if(!option.url){
        return;
    };
    //参数初始化
    let method = option.method == undefined?"get":option.method;
    let dataType = option.dataType ||"text";
    let asynch = option.asynch === undefined?true : option.asynch;  //是否异步
    let data = "";
    if(typeof option.data == "string"){
        data = option.data;
    }else if(typeof option.data == "object"){
        for(let i in option.data){
            data += `${i}=${option.data[i]}&`;
        }
        data = data.slice(0,-1);
    }

    //调取开始
    let xml = new XMLHttpRequest();
    xml.responseType=dataType;
    if(method == "get"){
        xml.open("get",option.url+"?"+data,asynch);
        xml.send();
    }
    else if(method == "post"){
        xml.open("post",option.url,asynch);
        //头信息在open后面，send前面
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if(data){
            xml.send(data);
        }else{
            xml.send(null);
        }
    }

    //  获取数据 异步监听事件
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            if (xml.status == 200){
                //判断异步获取数据的类型
                if(xml.responseType == "text"){
                    option.success(xml.responseText);
                }
                else if(xml.responseType == "json"){
                    option.success(xml.response);
                }
                else if(xml.responseType == "xml"){
                    option.success(xml.responseXML);
                }
            }
        }
    }
}
