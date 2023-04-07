<style>
.tmjrock_modalMask
{
width:100%;
height:100%;
top-margin:0;
left-margin:0;
border:1px solid red;
background:gray;
position:fixed;
opacity:50%;
}
.tmjrock_modal
{
border-radius:25px;
width:400px;
min-width:400px;
height:300px;
min-height:300px;
background-color:blue;
position:fixed;
top:0;
left:0;
bottom:0;
right:0;
margin:auto;
border:3px solid black;
}
.tmjrock_closeButton
{
float:right;
padding:2px 7px;
cursor:pointer;
margin-right:5px;
margin-top:5px;
font-size:14pt;
}
</style>
<script>
//TMJRock part starts here
function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id: "+cid;
return new TMJRockElement(element);
}


$$$.model={
"onStartup":[],
"accordians":[],
"modals":[]
};
//modal specific code starts here
$$$.modals={};

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}

//following is a class
function Modal(cref)
{

//introduce some property to decide whether the model will close or not when user click outside the modal

var objectAddress=this;
this.afterOpening=null;
this.beforeOpening=null;
this.afterClosing=null;
this.beforeClosing=null;
var contentReference=cref;
this.getContentId=function(){
return contentReference.id;
}
var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;
}
contentIndex++;
}
var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("tmjrock_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("tmjrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision=document.createElement("div");
headerDivision.style.background="red";
headerDivision.style.height="40px";
headerDivision.style.padding="9px";
headerDivision.style.borderRadius="20px";
modalDivision.appendChild(headerDivision);

if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");
let xpos=sz.indexOf("x");
if(xpos==-1) xpos=sz.indexOf("X");
if(xpos==-1) throw "In case of modal size should be specified as widthxheight"
if(xpos==0 || xpos==sz.length-1) throw "In case of modal size should be specified as widthxheight"
let width=sz.substring(0,xpos);
let height=sz.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";
}
else
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}
if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;
}


if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}
if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}

var contentDivision=document.createElement("div");
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-130)+"px";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";
contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display='block';
contentReference.style.visibility='visible';
modalDivision.appendChild(contentDivision);
var footerDivision=document.createElement("div");
footerDivision.style.background="pink";
footerDivision.style.left="0";
footerDivision.style.right="0";
footerDivision.style.height="40px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="9px";
footerDivision.style.borderRadius="20px"
modalDivision.appendChild(footerDivision);
if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}
var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement('span');
closeButtonSpan.classList.add('tmjrock_closeButton');
var closeButtonMarker=document.createTextNode("x");
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}
if(contentReference.hasAttribute("beforeOpening"))
{
var bo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=bo;
}
if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
}
if(contentReference.hasAttribute("beforeClosing"))
{
var bc=contentReference.getAttribute("beforeClosing");
this.beforeClosing=bc;
}
if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;

}
this.show=function(){
let openModal=true;
if(this.beforeOpening)
{
openModal=eval(this.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display="block";
modalDivision.style.display="block";
if(this.afterOpening) eval(this.afterOpening);
}
};
if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalDivision.style.display="none";
modalMaskDivision.style.display="none";
if(objectAddress.afterClosing) eval(objectAddress.afterClosing);
}
};
}
}

//modal specific code ends here

$$$.accordianHeadingClicked=function(accordianIndex,panelIndex)
{
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}
$$$.toAccordian=function(accord)
{
let panels=[];
let expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++) 
{
if(children[x].nodeName=="H3")
{
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
}
}
if(panels.length%2!=0) throw "Heading and division malformed to create accordian pane";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Heading and division malformed to create according pane";
if(panels[x+1].nodeName!="DIV") throw "Heading and division malformed to create according pane";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function()
{
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}

let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
//yha pr click handler chalega or click handler jis function ka address return krega vo on click ko assign hoga or vo tb chalega jb headin gpr click hoga
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}

$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex":-1
};
}

$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Excpected function, found "+(typeof func)+" in call to OnDocument Loaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}

$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let i=0;
let t=null;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}
let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}
//setting up modal part starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
}
//setting up modal part ends here


}


function TMJRockElement(element)
{
this.element=element;
this.html=function(content)
{
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}

this.value=function(content)
{
if(this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
}
this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be call on a SELECT type object only";
//validate if dataSource, text and value properties exist
// if data Source exist then there should be a collection agains it
//if text property exists, it should be of string type
//if value property exists, it should be string type
//it text property exists and if it is of string type then that should be part of data source element
//if value property exists and if it is of string type then that shoulb be part of datasource element
//if first option is specified then it should have 2 properties of string type text and value, check for tahta
//clear all existing option from Select
//if first option exists, create option tag and append it to SELECT element
//traverse the data Source array and on every cycle create option tag and append it to SELECT
}//fillCombo Box ends
}//class TMJRock Element ends
$$$.ajax=function(jsonObject)
{
if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if((typeof url)!="string") throw "url property should be of string type in call to ajax";
let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if((typeof methodType)!="string") throw "methodType property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if((typeof onSuccess)!="function") throw "success property should be of function type in call to ajax";
}
let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if((typeof onFailure)!="function") throw "failure property should be of function type in call to ajax";
}
if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure('some problem');
}
}
};
if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url+=queryString;
}
xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
}
if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure('some problem');
}
}
};
let jsonData={};
let sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!="boolean") throw "sendJSON property should be of boolean type in ajax call";
let queryString="";
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
//if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
}
xmlHttpRequest.open('POST',url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
// What will be written over here
xmlHttpRequest.send(queryString);
}
}
}
window.addEventListener('load',function(){
$$$.initFramework();
});
//TMJRock part ends here

function abBeforeOpening()
{
alert("Modal with ab is about to be opened");
return true;
}
function abOpened()
{
alert("Modal with ab opened");
}
function abBeforeClosing()
{
alert("Modal with ab is about to be closed");
return true;
}
function abClosed()
{
alert("Modal with ab closed");
}
function createModal1()
{
$$$.modals.show("ab");
}
function xyz()
{
var xx=document.getElementById('myTextBox');
alert(xx);
}
</script>
