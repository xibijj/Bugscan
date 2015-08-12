//2009-6-3 lingye hangzhou fuyang
var TickBox=function(){
	var rand=Math.round(Math.random()*10000);
	var HTMLCode='';
	return{
		w:0,
		h:0,
		obj:null,
		md:false,
		mobj:null,
		ox:0,
		oy:0,
		content:".tickbox",
		ctype:"el",
		Show:function(title,content,ctype,w,h,obj){
			$("#tickbox").remove()
			this.appendHTML("<div id=\"tickbox\"><\/div>");
			this.appendHTML("<div id=\"tickbox-bg\"><\/div>");
			this.w=w;
			this.h=h;
			this.obj=obj;
			this.ctype=ctype;
			this.content=content;
			this.SetSize();
			HTMLCode="";
			if(ctype==null) ctype=""
			switch(ctype.toLowerCase()){
				case "message" :					
					HTMLCode='<div id="tickbox-title-'+rand+'" class="tickbox-title" canmove="true"><a class="tickbox-close" title="Close" href="javascript:void(0)" onclick="TickBox.Hide()"><img src="../include/images/Close.gif" style="margin-top:10px"></a>系统提示</div>\r\n';
					HTMLCode+='<div id="tickbox-content-'+rand+'" class="tickbox-content">';
					if(content==0)
					{
						content = "history.go(-1)";
					}
					else
					{
						content = "window.location.href='"+content+"'";
					}
					HTMLCode+="<div class='jmtt_info'><div class='jmtt_info1' style='color:#000000'>"+title+"</div><div class='jmtt_info2'><a href=\"javascript:TickBox.Hide();"+content+"\"><img src='../include/images/tanbtn.gif'></a></div></div>";
					HTMLCode+='</div>';
					$("#tickbox").html(HTMLCode);
					break;
				case "iframe" :			
					HTMLCode+='<div id="tickbox-title-'+rand+'" class="tickbox-title" canmove="true"><a class="tickbox-close" title="Close" href="javascript:void(0)" onclick="TickBox.Hide()"><img src="../include/images/Close.PNG" style="margin-top:10px"></a>'+title+'</div>\r\n';
					HTMLCode+='<div id="tickbox-content-'+rand+'" class="tickbox-content">';
					HTMLCode+='<iframe src="'+content+'" id="tickbox-frame" name="tickbox-frame" height="'+(h-50)+'" width="100%" frameborder="0"></iframe>';
					HTMLCode+='</div>';
					$("#tickbox").html(HTMLCode);
				break;
			}
			//event
			$(document).mousedown(function(ev){
				var ev=ev||window.event;
				var evt=ev.srcElement||ev.target;
				if($(evt).attr("canmove")=="true"){
					this.md=true;
					this.mobj = $("#tickbox");
					this.ox = this.mobj.offset().left - ev.clientX;
					this.oy = this.mobj.offset().top - ev.clientY;
				}
			});
			$(document).mouseup(function(ev){this.md=false;});
			$(document).mousemove(function(ev){
				var ev=ev||window.event;
				if(this.md){
					this.mobj.css("left",(ev.clientX + this.ox)+"px");
					this.mobj.css("top",(ev.clientY + this.oy)+"px");
				}
			});
			$(window).resize(function(){
				TickBox.SetSize();
			});
			$(window).scroll(function(){
				TickBox.SetSize();
			});
			$("#tickbox-bg").click(function(){
				TickBox.Hide();
			});
		},
		SetSize:function(){
			top=0;left=0;
			w=TickBox.w;h=TickBox.h;
			if(!w) w=400;
			if(!h) h=300;
			obj=TickBox.obj;
 			if(obj!=null){
				var top=$(obj).offset().top;
				if(top < Math.round(h/2)+10){
					top=5;
					}
				else if(($(window).height()-top) < Math.round(h/2)+10){
					top=$(window).height()-h-5;
					}
				else{
					top=top-Math.round(h/2)
					}
				var left=$(obj).offset().left+$(obj).width();
				
				if(left < Math.round(w/2)+10){
					left=5;
					}
				else if(($(window).width()-left) < Math.round(w/2)+10){
					left=$(window).width()-w-5;
					}
				else{
					left=left-Math.round(w/2)
					}
					top=top+$(document).scrollTop();
					left=left-$(document).scrollLeft();
				}else{
				top=Math.round(($(window).height()-h)/2+$(document).scrollTop())-5;
				left=Math.round(($(window).width()-w)/2-$(document).scrollLeft())-5;
			}
			$("#tickbox-bg").height($(document).height());
			$("#tickbox-bg").width($(window).width());
			$("#tickbox").css("height",h);
			$("#tickbox").css("width",w);
			$("#tickbox").css("top",top);
			$("#tickbox").css("left",left);
			//$("#tickbox-bg").css("top",$(document).scrollTop());
			$("#tickbox-bg").css("left",$(document).scrollLeft());
		},
		appendHTML:function(htmlcode){

			$("body").append(htmlcode);			
			$("body").append("<style type=\"text/css\">#tickbox-bg{position:absolute;top:0;left:0;z-Index:100;background:#000;width:auto;height:auto;filter:alpha(opacity=55);opacity:0.55}#tickbox{position:absolute;z-Index:200;top:0;left:0;background:#fff;}.tickbox-title{background:url(../include/images/center.jpg) repeat-x; height:40px; line-height:40px;color:#fff;padding-left:15px;cursor:move; font-weight:bold}.tickbox-close{float:right;margin-right:10px;text-decoration:none;color:#fff}.tickbox-content{text-align:left;border:7px solid #4268b9; border-top:none}.jmtt_info{background:#FFF; height:60px; text-align:center; padding:10px; font-size:14px;}.jmtt_info1{height:30px; line-height:30px}.jmtt_info2{height:30px}</style>")
			},
		Hide:function(){
			if(TickBox.ctype=="el"){
				$(TickBox.content).css("display","none");
				$("body").append($(TickBox.content));
			}			
			$("#tickbox").remove()
			//$("#tickbox").slideUp("slow");
			$("#tickbox-bg").remove();
		}
	}
}();

function CloseTickBox(){
	TickBox.Hide();
	location.reload();	
}
