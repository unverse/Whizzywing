//Whizzywing Rich Text Editor. © 2011-12 John Goodman - www.unverse.net - Licence: MIT/GPL 

var wz_version='Whizzywing 111213',isFF=navigator.product=='Gecko',isIE=/*@cc_on!@*/0;
var _=function(){
var wn=window,dc=document,db,de,ov,pp,cb,ed,id,sel,rng,papa,txt,trl,eds=[];
if(!db){dc.write('<style>'+
'.WYSIWYG{color:#060}'+
'.wz_editor{background:#fefefe;border:1px solid #ddd}'+
'.wz_full{background:#fff;top:0;left:0;width:100%;height:100%;border:none;z-index:9;position:absolute}'+
'.wz_rte{overflow:auto; min-height:100px}'+
'.wz_full .wz_rte{width:auto;height:auto}'+
'.wz_rte table,.wz_rte td,.wz_rte th{border:1px dotted #999}'+
'.wz_formatbar{background:#eee; border:1px solid #ddd; padding:2px}'+
'.wz_formatbar button{vertical-align:middle;margin:1px;min-width:2em;padding:0 2px;height:2em;font:12px sans-serif}'+
'.wz_formatbar td{padding:3px}'+
'.wz_dp{position:relative;width:auto;cursor:pointer;display:inline-block;vertical-align:top}'+
'.wz_dr{display:none;position:absolute;z-index:99;width:auto;background:#eee;white-space:nowrap;margin:0;border:1px solid #000}'+
'.wz_dr>div{padding:1px;border:1px solid #999}'+
'.wz_dr *{margin-top:-1px;margin-bottom:0}'+
'.wz_hl{color:highlighttext;background:highlight}'+
'.wz_tc{display:none}'+
'.wz_ar{color:#36f;letter-spacing:-.25ex;font-size:larger}'+
'#wz_frm{padding:1ex;text-align:center}'+
'#wz_pop{background:#FFF;z-index:99;position:absolute;top:50%;left:50%;display:none;border:5px solid #999;padding:5px}'+
'#wz_px {font-weight:bold;color:white;background:red;float:right}'+
'#wz_ov{position:absolute;top:0;left:0;z-index:90;background-color:#333;display:none;opacity:.7}'+
'</style>')}
return {
control:[],bt:[],
$:function(l){return (typeof l=='string')?dc.getElementById(l):l},
t:function(tg,l){tg=tg||'*';l=l||dc;return _.$(l).getElementsByTagName(tg)},
c:function(cls,tg,l){var c=[],p=new RegExp('\\b'+cls+'\\b');_.all(_.t(tg,l),function(m){if(p.test(m.className)){c.push(m)}});return c}, 
s:function(l,x,y){var st=_.$(l).style;if(x||y){st.position='absolute';if(x){st.left=x+'px'} if(y){st.top=y+'px'}}st.display='block'}, 
h:function(l){_.$(l).style.display='none'},
v:function(l){var s,t=_.$(l),n=t.nodeName;if(n=="INPUT"||n=="TEXTAREA"){return t.value} 
if(n=="SELECT"){s=t.options[t.selectedIndex];return s.value||s.innerHTML}return t.innerHTML},
gs:function(l,p){var s=_.$(l).currentStyle||dc.defaultView.getComputedStyle(_.$(l),null);return s[p];},
e:function(o,e,f){return wn.addEventListener?o.addEventListener(e,f,0):o.attachEvent("on"+e,f)},
tr:function(k) {return (wn.language && language[k])?language[k]:k},
wW:function(){return de.clientWidth||wn.innerWidth-18},
wH:function(){return de.clientHeight||wn.innerHeight-18},
dW:function(){return Math.max(de.scrollWidth,_.wW())},
dH:function(){return Math.max(de.scrollHeight,_.wH())},
sX:function(){return wn.pageXOffset||de.scrollLeft},
sY:function(){return wn.pageYOffset||de.scrollTop},
all:function(a,f){var i,x;for(i=0;i<a.length;i++){x=a.length;f(a[i]);if(x>a.length)i--}},
rsz:function(){ov.style.width=_.dW()+'px';ov.style.height=_.dH()+'px'},
ce:function(id,tg){tg=tg||'div';var l=dc.createElement(tg);l.setAttribute('id',id);db.insertBefore(l,db.firstChild);return _.$(id)},
ib:function(tg,ih,bf){var n=dc.createElement(tg);n.innerHTML=ih;return bf.parentNode.insertBefore(n,bf);},
oc:function(){_.s(ov);_.sp('','hidden','...');_.pop(75,50);var m=new Image();m.onload=_.ol;m.title=this.title;m.src=this.href;return 0},
ol:function(){var w=this.width,h=this.height,sc=Math.min(1,(_.wW()-50)/w,(_.wH()-50)/h);w*=sc;h*=sc;
_.sp(this.title,'hidden','<img src="'+this.src+'" width="'+w+'" height="'+h+'">');_.pop(w,h)},
xp:function(e){_.h(pp);_.h(ov);_.hs(1)},
hs:function(s){_.all(_.t('SELECT'),function(l){if(s){_.$(l).style.display='inline'}else{_.h(l)}})},
box:function(l,w,h,t){if(!t){t=''}if(l.indexOf('http:')===0){_.sp(t,'hidden','<iframe src="'+l+'" width="'+w+'" height="'+h+'"></iframe>')}else{t||_.sp(_.$(l).title,'auto',_.$(l).innerHTML)}_.pop(w,h)},
sp:function(t,v,n){pp.style.overflow=v;pp.title=t;pp.innerHTML='<div style="text-align:right;font-size:smaller"><button id="wz_px" title="'+_.tr("CLOSE")+'" onclick="_.xp();">&times;</button>'+t+'&nbsp;</div><div style="clear:right">'+n+'</div>'},
pop:function(w,h){_.hs();_.rsz();_.s(ov);w=w?parseInt(w,10):_.wW()-50;h=h?parseInt(h+25,10):_.wH()-50;pp.style.width=w+'px';pp.style.height=h+'px';_.s(pp,_.sX()+(_.wW()-w)/2,_.sY()+(_.wH()-h)/2)},
frm:function(t,f,c,w,h){_.sp(_.tr(t),'auto','<div id="wz_frm">'+f+'<input type="button" onclick="'+c+'" value="'+_.tr("OK")+'"></div>');_.pop(w,h);_.t('INPUT',_.$('wz_pop'))[0].focus()},
drop:function (tit,itm,ins,btn){
 var i,items='',c,p;
 btn=btn||tit+' &nabla;';
 for(i=0;i<itm.length;i++){
  c=ins[i]; p=c.indexOf(':');
  if(p>0){c=ins[i].substr(0,p);p=ins[i].substr(p+1).replace(/"/g,'\\\"')}
  items+='<div title="'+tit+'" onclick="_.xC(\''+c+'\',\''+p+'\')" onmouseover="this.className=\'wz_hl\'" onmouseout="this.className=0">'+itm[i]+'</div>'
 }
 return '<span title="" class="wz_dp" onmouseover="_.s(_.t(\'DIV\',this)[0])" onmouseout="_.h(_.t(\'DIV\',this)[0])" ><button type="button">'+btn+'</button><br><div class="wz_dr">'
 +items+'</div></span>' //IE6/7 only does inline-block on inline elements(!) so wz_dp=span
},
btn:function(t,c,h,p){//Title,Command(for execcommand) or HTML<tag>, button HTML, parameter for xC
 return '<button type="button" title="'+t+'" onclick="_.xC(\''+c+'\',\''+p+'\')">'+h+'</button>'
},
whereAmI:function(e){
 if(!e){e=wn.event}
 if(!e||e.type=='DOMContentLoaded'){return}
 var pa,sn,trl='',mu=e.type=='mouseup', fb=0, mxH=_.wH()-100;
 _.ed=dc.activeElement; if(_.ed){_.id=_.ed.id.slice(3); fb=_.ed.previousSibling; mxH=_.wH()-fb.clientHeight}
 if(_.gs(fb,'display')=="none"){_.all(_.c('wz_formatbar','DIV'),_.h);_.s(fb)}
 if(isIE){//IE need range for iH
  _.sel=dc.selection; _.rng=_.sel.createRange();_.txt=_.rng.text;
  pa=_.papa=(mu)?e.srcElement:(_.sel.type=='Control')?_.rng.item(0):_.rng.parentElement();
 } else {//W3C
  _.txt=_.sel=wn.getSelection(),sn=_.sel.anchorNode
  pa=_.papa=(mu) ? e.target : (sn.nodeName == '#text') ? sn.parentNode : sn;
  _.rng=_.sel.getRangeAt(0);
 }
 while(pa.className!="wz_rte"){trl=pa.nodeName+' '+trl;pa=pa.parentNode}
 _.all(_.c('wz_tc'),function(c){if(trl.indexOf(" TR")>0){c.style.display='inline'}else{_.h(c)}});
 _.trl=trl;
 if(!isIE && (trl==""||trl=="DIV ")){dc.execCommand('formatblock',0,'<P>')}//Force P...
 if(_.ed.clientHeight>mxH){_.ed.style.height=mxH+'px'}//keep toolbar in view
 if(!mu && _.ed.id){_.upd(_.id)}
},//whereAmI
foc:function(){
 if(!_.ed){return}
 _.ed.focus();
 if(isIE){_.rng.select()} 
 else {if(_.sel.rangeCount > 0){_.sel.removeAllRanges()}_.sel.addRange(_.rng)}
},//foc
doDbl:function(){var p=_.papa.nodeName;if(p=='IMG'){_.xC("InsertImage")}else if(p=='A'){_.xC("CreateLink")}},
kb:function(e){
 if(!e){e=wn.event}
 if(e.ctrlKey){
  var x=0;k=e.keyCode;
  if(k==32){_.xStyle();_.foc()}//Sp
  if(k==66){_.xC("bold");x=1}//B
  if(k==73){_.xC("italic");x=1}//I
  if(k==85){_.xC("underline");x=1}//U
  if(k==72 && _.id){_.src(_.id);x=1}//H
  if(k==76 && _.id){_.xC('CreateLink');x=1}//L
  if(k==77 && _.id){_.xC('InsertImage');x=1}//M
  if(x){if(e.preventDefault){e.preventDefault()}return false}
 }
},
iH:function(h){_.xC('InsertHTML',h)},
xC:function (c,p){//DO IT!
 if(p=='undefined'){p=0}
 var el=_.papa, tg=el?el.nodeName:0, id=_.id, rw, cl, d,
  selHTM=_.rng?isIE?_.rng.htmlText:wn.XMLSerializer?new XMLSerializer().serializeToString(_.rng.cloneContents()):_.sel:"";
 _.xp();_.all(_.c('wz_dr'),function(dd){_.h(dd)});_.foc();
 if(c.indexOf(':')>0){p=c.split(':')[1];c=c.split(':')[0]}
 if(c=="SRC"){return _.src(p)}
 if(c=="IT"){return _.frm("Create a Table",_.tr("Rows")+':<input id="wz_r" size="2">  '+_.tr("Columns")+':<input id="wz_c" size="2"><br>'+_.tr("Include header row?")+'<input type="checkbox" id="wz_th"><br>','_.tbl(\'i\',_.v(\'wz_r\'),_.v(\'wz_c\'),_.$(\'wz_th\').checked)',400,100)}
 if(c.match(/^(IR|XR|IC|XC)$/)){return _.tbl(c);}
 if(c=="IH"){
 _.frm('Paste in some text or HTML','<textarea id="wz_h" rows="15" cols="70" style="width:99%;height:250px;height:95%"></textarea>',"_.iH(_.v(\'wz_h\'))",400,300);return _.$('wz_h').focus()
 }
 if (c=="xTag"){el.parentNode.removeChild(el);return _.upd(id)}
 if(c=="InsertImage"){
  function alt(){var a=p.replace(/^.*\/([^.]*).*$/,"$1").replace(/[-_]+/g," ");
   return a.charAt(0).toUpperCase()+a.slice(1)}
  if(!p){
   if(el&&tg=="IMG"){p=el.getAttribute('src');d=_.btn('','xTag',_.tr('Remove'))+' '+_.tr('or')+'<br><br>'}
   else{p="";d=""}
   return _.frm("Insert an Image",d+_.tr("Address of image")+'<br><input id="wz_i" size="40" value="'+p+'"><br>','_.xC(\'InsertImage\',_.v(\'wz_i\'))',400,150)
  }
  if(el&&tg=="IMG"){
   if(p==""){return _.xC('xTag')}
   else{el.src=p;el.alt=alt();return _.upd(_.id)}
  }else {return _.iH('<img src="'+p+'" alt="'+alt()+'" />')}
 }
 if(c=="CreateLink"){
  if(!p){                 
   if(el&&(tg=="A"||_.t("A",el).length>0)){p=el.getAttribute('href')||"";d=_.btn('','Unlink',_.tr('Remove'))+' '+_.tr('or')+'<br><br>'}
   else {p="http://";d=""}
   return _.frm("Insert a Link",d+_.tr("Address of link")+'<br><input id="wz_l" size="40" value="'+p+'"><br>','_.xC(\'CreateLink\',_.v(\'wz_l\'))',400,150)
  }
  if(!p || p=="http://"){c='unlink'}
  else if(el&&tg=="A"){el.href=p; return _.upd(id)}
  else if(!selHTM){c=p;p='<a href="'+c+'">'+c+'</a>';c='InsertHTML'}
 }
 if(c=="side"){
  if(el&&tg=="IMG"){
   if(isIE){el.style.styleFloat=p}else{el.style.cssFloat=p}
   if(p=='left'||p=='right'){el.style.margin='1ex'}
   return _.upd(id)
  }
  if(_.trl.indexOf(" LI")>0){if(p=="left"){c="Outdent"}else if(p=="right"){c="Indent"}else{return 0}}
  else {el.style.textAlign=p=='none'?'center':p=='left'?'':p; return _.upd(id)}
 }
 if(c=="backcolor" && isFF){c="hilitecolor"}
 if(c.charAt(0)=="<"){
  if(c=='<BLOCKQUOTE>'&& isIE){c="indent"}
  else if(c.match(/^\<(P\b|H\d|BLO|DIV|OL|UL|TA|PRE)/i)){p=c;c="FormatBlock"}
  else if(_.sel){
   p=c+selHTM; c='InsertHTML';
   //or p=c;c=fontname
  } else {return}
 }
 if(c=='InsertHTML'){
  if(!p){return 0}
  if(!p.match(/<.*>/)){
   p=p.replace(/(\r\n|\n\r|\r|\n)/g,"<br>");//text to P
   if(p.match(/<br>/)){p="<p>"+p.replace(/<br>\s*<br>/g,"</p><p>")+"</p>"}
  }
 }
 _.foc();
 try {var r=dc.execCommand(c,false,p)}
 catch(e){
  if(c=='InsertHTML'&&_.rng.pasteHTML){_.rng.pasteHTML(p)}
 }
 if(c=="fontname"&&p.match(/^<\/?([^>]+)>$/))
 {p=p.replace(/[<>\/]/g,"")
 _.ed.innerHTML=_.ed.innerHTML.replace(/<(\/?)FONT[^>]/,"<$1"+p+">")}
 if(_.ed){_.upd(id);_.ed.focus()}
},//xC
tbl:function(a,rw,cl,th){
 var r,c,s="&nbsp;",h="<table>",d;
 if(a=='i'){//insert table
  for(r=1;r<=rw;r++){h+="<tr>"; for(c=1;c<=cl;c++){d=r==1&&th?'h>':'d>';a=r==1?c:c==1?r:s; h+='<t'+d+a+'</t'+d} h+="</tr>";}
  _.iH(h+"</table>"+s);
 } else {
  var i,p=_.papa;
  if(a.charAt(1)=="R"){//row
   while(p&&p.nodeName!="TR"){p=p.parentNode}
   r=p.rowIndex; c=p.cells.length;
   while(p&&p.nodeName!="TABLE"){p=p.parentNode}
   if(a.charAt(0)=="X"){p.deleteRow(r)}
   else{rw=p.insertRow(r+1); for(i=0;i<c;i++){cl=rw.insertCell(i); cl.innerHTML=s}}
  }else{//col
   while(p&&p.nodeName!='TD'){p=p.parentNode;}
   c=p.cellIndex; while(p&&p.nodeName!="TABLE"){p=p.parentNode;}
   r=p.rows.length;
   for (i=0;i<r;i++){
    if(a.charAt(0)=="X"){p.rows[i].deleteCell(c);}
    else{cl=p.rows[i].insertCell(c+1); cl.innerHTML=s;}
   }
  }
 }
 _.foc();
},//tbl
clean:function(htm){
 var s='small',l='large',sz=['','xx-'+s,'x-'+s,s,'medium',l,'x-'+l,'xx-'+l],els,el,nd,tg,tm,i,nP=0,brIL;
 if (typeof htm=='string'){tg=htm;htm=dc.createElement('DIV');htm.innerHTML=tg}
 function lc(s){return s.toLowerCase()}
 function qa(s){return s.replace(/(\s+\w+=)([^"][^>\s]*)/gi,'$1"$2"')} //quote attributes
 function sa(s){return s.replace(/("|;)\s*[A-Z\-]+\s*:/g,lc)}//lc styles
 nd=_.t('*',htm); for(i=0;i<nd.length;i++){//all tags
  el=nd[i];tg=el.nodeName;
  if(el.align){al=el.align;
   if(tg.match(/IMG|OBJECT|IFRAME/) && al.match(/right|left/i)){
     if(isIE){el.style.styleFloat=al}else{el.style.cssFloat=al}
     el.style.margin='1ex'
   }else{el.style.textAlign=al}
   el.removeAttribute('align')
  }
  if(tg=='FONT'){
   nd=el.parentNode.childNodes.length==1?el.parentNode:el;
   if(tm=el.face){nd.style.fontFamily=tm;el.removeAttribute('face')}
   if(tm=sz[el.size]){nd.style.fontSize=tm;el.removeAttribute('size')}
   if(tm=el.color){nd.style.color=tm;el.removeAttribute('color')}
   if(nd!=el){nd.innerHTML=_.v(el)}
  }
  if(tg=='META'){el.parentNode.removeChild(el);i--}
  if((tg=="TD"||tg=="TH") && el.innerHTML.match(/^\s*$/)){el.innerHTML="&nbsp;"}
  el.removeAttribute('xmlns');
 }//all tags  
 return htm.innerHTML.replace(/(<\/?[A-Z]*)/g,lc).replace(/<[^>]+=[^>]+>/g,qa).replace(/style="[^"]*"/gi,sa).replace(/(<\/?)font/g,'$1span').replace(/<\/pre>\s*<pre>/g,"\n").replace(/ dir="ltr"/g,"").replace(/(<\/?)b(\s+[^>]*)?>/g, "$1strong$2>").replace(/(<\/?)i(\s+[^>]*)?>/g, "$1em$2>").replace(/(<\/?)s(trike)?(\s+[^>]*)?>/g, "$1del$3>").replace(/\bCLASS="(MSOw*|Apple-style-span)"/gi,"").replace(/<([^>]+)>\s*<\/\1>/g, "").replace(/><(h|p|d|t|bl|for|in|se|op|ul|ol|li|sc)/gi,">\n<$1").replace(/([^\n])<\/(ul|ol|dl|div|tab|for)/g,"$1\n</$2").replace(/\n<(bl|li|op|tr|in|dt)/g,"\n <$1").replace(/\n<(td|th|dd)/g,"\n  <$1").replace(/(\/table>)$/g,"$1 &nbsp;").replace(/<(img|input|br|hr|link)([^>]*)>/g,"<$1$2 />").replace(/([^\n])<br/g,"$1\n<br");
},//clean
inLn:function(n){return (n.nodeType==3 && n.data.match(/\S/))||n.nodeName.match(/^A|ABBR|B|BIG|CODE|DEL|EM|FONT|I|IMG|S|SMALL|SPAN|STRONG|SUB|SUP|U$/i)},
xStyle:function(l){if(!l){l=_.ed}
 l.innerHTML=l.innerHTML.replace(/<\/?(font|span)[^>]*>/gi,"").replace(/Â&/g,"&");
 _.all(_.t('*',l),function(el){ el.removeAttribute('id'); el.removeAttribute('style'); el.removeAttribute('className')/*IE*/; el.removeAttribute('class')});
},
pasty:function(){cb.focus();setTimeout(_.cleanpaste,50)},
cleanpaste:function(){_.xStyle(cb);_.foc();_.iH(_.clean(cb));cb.innerHTML='';_.foc()},
src:function(tid){//view/edit HTML
 if(_.$(tid).nodeName!='TEXTAREA'){return}
 _.box('src_'+tid); _.upd(tid);
 _.$(tid).style.height=Math.max(50,_.wH()-115)+'px';
 _.$(tid).focus()
},
upd:function(tid){
 _.$(tid).value=_.clean(_.$('wz_'+tid));
},
xSrc:function(tid){ //FF likes B and I in designmode, removeformat needs S not DEL
 _.$('wz_'+tid).innerHTML=_.v(tid).replace(/strong>/g,"b>").replace(/em>/g,"i>").replace(/del>/g,"s>");
 _.xp(); _.upd(tid)
},
wys:function(ta){
 ta=_.$(ta);
 if(!ta.id){ta.id=ta.name?ta.name:'origin_'+(eds.length+1)}
 if(_.$('wz_'+ta.id)!==null){return}
 var ini=_.v(ta).length?_.clean(_.v(ta)):'<p>&nbsp;</p>',
 eh='<div class="wz_rte" id="wz_'+ta.id+'">'+ini+'</div><div style="display:none" id="src_'+
 ta.id+'"><div><button type="button" onclick="_.xSrc(\''+ta.id+ '\');">'+_.tr('Update')+'</button> '+
 _.tr('HTML Source')+'</div>',
 bx=_.ib('DIV',eh,ta),ed=_.$('wz_'+ta.id);
 try{ed.setAttribute('contentEditable','true');} catch(e){alert(e);_.h(bx);return}
 bx.className="wz_editor"; bx.id="wzbox_"+ta.id;
 if(typeof eds =='object'){eds.push(ta.id)}else{eds=[ta.id]}
 _.$('src_'+ta.id).appendChild(ta);
 ta.style.width='99%'; ta.style.height="100%";
 ed.onkeydown=_.kb;ed.onmouseup=ed.onkeyup=_.whereAmI;ed.ondblclick=_.doDbl;
 if(isIE){ed.onbeforepaste=_.pasty} else {ed.onpaste=_.pasty}
 //TOOLBAR CONTROLS
  var b=[],hd=_.tr("Heading"),
  std='block text left center right insert link image table',
  ctrls=ta.title?ta.title:wn.wz_toolbar?wn.wz_toolbar:std,
  ctrl,i,x,tbc='',tb,nm,bt;//var
  ctrls=ctrls.replace('default',std).replace('paragraph','block').replace('character','text');//include default list
  x=ctrls.match(/-\S+/gi)||0;//exclude -control
  for(i=0;i<x.length;i++){ctrls=ctrls.replace(x[i],'').replace(x[i].substr(1),'')}
  ctrl=ctrls.split(' ');
   b['block']=_.drop(_.tr('Block'),
['<h1>'+hd+' 1</h1>','<h2>'+hd+' 2</h2>','<h3>'+hd+' 3</h3>','<h4>'+hd+' 4</h4>','<p>'+_.tr('Normal')+'</p>','<ol><li>'+_.tr('Number')+'</li></ol>','<ul><li>'+_.tr('Bullet')+'</li></ul>','<blockquote>&gt; '+_.tr('Blockquote')+'</blockquote>','<p>&lt; '+_.tr('unBlockquote')+'</p>'],
['<H1>','<H2>','<H3>','<H4>','<P>','insertorderedlist','insertunorderedlist','<BLOCKQUOTE>','outdent']),
  b['text']=_.drop(_.tr('Text'),['<b>'+_.tr('Bold')+'</b> <small>(Ctrl+B)</small>','<i>'+_.tr('Italic')+'</i> <small>(Ctrl+I)</small>','<u>'+_.tr('Underline')+'</u> <small>(Ctrl+U)</small>','<s>'+_.tr('Delete')+'</s>',_.tr('Superscript')+'<sup>x</sup>',_.tr('Subscript')+'<sub>x</sub>',_.tr('Clear formatting')],['bold','italic','underline','strikethrough','superscript','subscript','removeformat']),//'<big>'+_.tr('Big')+'</big>','<small>'+_.tr('Small')+'</small>','<code>'+_.tr('Code')+'</code>',//'<big> ','<small>','<code>',//inline tags straddling blocks?
  b['left']=_.btn('&lt; '+_.tr('Left'),'side',_.bt.left||'<b class="wz_ar">&lt;&lt;</b>','left'),
  b['center']=_.btn(_.tr('Center'),'side',_.bt.center||'<b class="wz_ar">= </b>','none'),
  b['right']=_.btn(_.tr('Right')+' &gt;','side',_.bt.right||'<b class="wz_ar">&gt;&gt;</b>','right'),
  b['link']=_.btn(_.tr('Link or Unlink'),'CreateLink',_.bt.link||'<a href="#">*.com</a>'),
  b['image']=_.btn(_.tr('Insert or remove Image'),'InsertImage',_.bt.image||'<u style="border:2px ridge peru;color:darkgreen;background-color:skyblue">&nbsp;&spades;<b style="color:gold">*</b></u>'),
  b['table']=_.btn(_.tr('Insert Table'),'IT',_.bt.table||'<table border="1" cellpadding="3px"  style="border-collapse:collapse;color:black;background:white;width:1em;height:1em"> <tbody><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table>')+'<span class="wz_tc">'+_.btn(_.tr('Add row below'),'IR',_.bt.addrow||'<b style="color:green">+ <u>&mdash;</u></b>')+_.btn(_.tr('Delete row'),'XR',_.bt.delrow||'<b style="color:red">- <u>&mdash;</u></b>')+_.btn(_.tr('Add column after'),'IC',_.bt.addcol||'<b style="color:green">+||</b>')+_.btn(_.tr('Delete column'),'XC',_.bt.delcol||'<b style="color:red">-||</b>')+'</span>',
  b['insert']=_.btn(_.tr('Paste in text (e.g. from word processor) or HTML (e.g. YouTube embed code)'),'IH',_.bt.insert||'<b style="color:green">+&darr;</b>'),
  b['source']=_.btn(_.tr('HTML source'),'SRC',_.bt.source||'<div class="WYSIWYG">&lt;html&gt;</div>',ta.id);
  for (i=0;i<ctrl.length;i++){
   nm=ctrl[i]; bt=_.control[nm];
   if (bt){tbc+=bt}
   else if(b[nm]){tbc+=b[nm]}
   else{tbc+=" "+nm+" "}
  }
  tbc=tbc+'<a title="'+wz_version+'">&nbsp;</a>';
  tb=_.ib('DIV',tbc,ed);
  tb.id="wzbar_"+ta.id;tb.className='wz_formatbar'; tb.unselectable='on';
  if(wn.getSelection){//u/s in IE6
   tb.title=_.tr("Double click to toggle full screen");
   _.e(tb,'dblclick',function(e){var s=db.style,o=s.overflow,v=s.visibilty;cl=tb.parentNode.className;tb.parentNode.className=(cl=="wz_full")?"wz_editor":"wz_full";if(cl=="wz_full"){s=o='hidden'}else{s=o='visible'}_.foc()});//if(e.preventDefault){e.preventDefault()};wn.scrollTo(0,0)
  }
  _.e(tb,'mouseup',function(e){if(e.preventDefault){e.preventDefault()}});
  if(isFF){dc.execCommand('styleWithCSS',false,false);dc.execCommand('enableInlineTableEditing',false,false)}
},//wys
unwys:function(id){var bx=_.$('wz_'+id).parentNode; bx.parentNode.replaceChild(_.$(id),bx)},
go:function(){if(!db){db=dc.body;de=dc.documentElement?dc.documentElement:db;pp=_.ce('wz_pop'); ov=_.ce('wz_ov'); ov.onclick=_.xp;_.rsz(); ov.style.filter='alpha(opacity=70)'; _.e(wn,'resize',_.rsz);
 _.all(_.c('WYSIWYG'),_.wys); _.all(_.c('wz_tc'),function(c){_.h(c)});
 if(wn.docReady){docReady()}}}
};
}();
if(document.addEventListener){document.addEventListener("DOMContentLoaded",_.go,false)}
else if(isIE)(function(){try{document.documentElement.doScroll("left")}catch(er){setTimeout(arguments.callee,9);return;}_.go()})();
else {window.onload=_.go}
