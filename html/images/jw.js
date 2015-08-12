
(function($){
	window.jw=window.jw||{};
	if(window.jw.version)return;
	
	window.jw={
	version: "20110921 1.0",
	ok_text:"确 定",
	alert_title:"提示",
    
    //tab 选项卡
    tab:function(headItems, contentItems,fn,i) {
		var C = $(headItems), B = $(contentItems);
		C.click(function(e) {
			var i = C.index(this);
			if(fn && $.isFunction(fn)){
				if(fn.call(this,i,e)===false)return false;
			}
			C.removeClass("cur");
			$(this).addClass("cur");
			B.hide().eq(i).show();
		});
		if(C.filter('.cur').size()<1)C.eq(i||0).addClass("cur");
		C.filter('.cur').trigger('click');
	},
	
	//笼罩层
	over:function(opt){
		opt=opt||'show';
		var over,bh=$(document).height();
		if(opt=='show'){
			if($('.jw-over').length)return;
			over=$('<div class="jw-over" ></div>');
			$().ready(function(){
				$(document.body).append(over);
				$('html').addClass('jw-over-hidden');
				(typeof $.fn.bgiframe=='function') && over.bgiframe();
				over.height(bh);
			});
		}else{
			$('html').removeClass('jw-over-hidden');
			setTimeout(function(){$('.jw-over').remove();},1);
		}
	},
	
	//使ie6 支持 position fixed
	position_fixed:function(target,win){
		target=$(target);
		win=win||window;
		var ie6=$.browser.msie && $.browser.version<=6; 
		var pos=target.css('position');
		var st=$(win).scrollTop();
		if(!ie6){
			if(pos!='fixed'){
				var of=target.offset();
    				target.css({top:(of.top-st),position:'fixed'});
			}else{
    			target.css({position:'fixed'});
			}
    		return true;
		}
		var bottom=parseInt(target.css('bottom'));
		var top=parseInt(target.css('top'));
		if(bottom){
			target.css({'top':($(win).height()+st-bottom-40),position:'absolute'});
		}else{
			target.css({'top':(st+top-((pos=='absolute')?st:0)),position:'absolute'});
		}
		
		$(win).bind('scroll resize',function(){
			var a=$(win).scrollTop();
			target.css({'top':target.offset().top+a-st});
			st=a;
			a=null;
		});
	},
	
	
	 //控件拖动支持
	 drag:function(bar,target,win){
	     var b=$(bar),t=target?$(target):b,x,y,moving=false,opacity,zi;
	     var _p=t.css('position');
	      win=win||window;
		  var ifr=t.find('iframe'),over=null;
	      b.mousedown(function(e){
	    	  if(_p!='absolute' && _p!='fixed'){
	    		  t.css('position',"absolute");
	    	  }
	    	  zi=zi||t.css('z-index');
	    	  opacity=opacity||t.css('opacity')||1.0;
	            x= e.clientX;
	            y= e.clientY;
	            moving=true;
	            _p=t.css('position');
				  b.css('cursor', 'move');
	            t.css({'opacity':opacity*0.7,'z-index':90000});
	            if(ifr){
	            	//通过使用timeout修正当窗体大小发生变化时，iframe的高度需要时变化后的高度以保证当前鼠标不进入iframe中
	            	setTimeout(function(){
	          		  var h=ifr.height();
	          		  over=("<div class='jw-drag-over' style='position: relative;width:100%;height:"+h+"px;margin-top:-"+h+"px;'></div>");
	          		  over=ifr.after(over).next('.jw-drag-over');
	            	},1);
	          	  };
	        return false;    
	      }).mouseup(stop);
	      $(win.document.body).mousemove(function(e1){
	    	  if(moving){
	    		  var offset=t.offset();
	    		  if(_p=='fixed'){
	    			  offset={top:offset.top-$(win).scrollTop(),left:offset.left-$(win).scrollLeft()};
	    		  }
	    		  t.css({top:offset.top+(e1.clientY-y),left:offset.left+(e1.clientX-x)});
	    		  x=e1.clientX;
	    		  y=e1.clientY;
	    	  }
	    	  return false;
	      }).mouseup(stop);
	      function stop(e){
	         moving=false;
			  b.css('cursor', 'default');
	         t.css({'opacity':opacity,'z-index':zi});
	         over && over.remove();
	         return false;
	      }
	 },
	 
	   /**
	    *弹出框
	    * 在dialog 容器内的元素 具有 .close 属性 则click时 可以关闭该dialog
	    *@param id                需要以dialog 形式显示的层的 ID
	    *@param option.title      标题。当设置为false 时，不显示标题
	    *@param option.close      是否显示close 按钮
	    *@param option.max        是否显示最大化 按钮
	    *@param option.rel        ajax 页面的地址 或者为一个其他页面地址
	    *@param option.iframe     对上述rel 属性使用iframe 页面加载

	    *@param option.width      宽度(可以用%)
	    *@param option.height     高度(不使用%）
	    *@param option.fixed     是否允许dialog 随着页面滚动
	    *@param option.over      默认若为true,显示笼罩背景
	    *@param option.drag       是否允许拖动，默认允许
	    *@param option.onMax      最大化事件
	    *@param option.onClose    关闭事件
	    */
	  dialog:function(option){
	    	var op=option||{};
	    	option=$.extend({},{
		   	     width:300,
			     height:100,
			     close:true,
			     drag:true,
			     over:true,
			     fixed:true,
			     id:null,
			     html:null,
			     title:'',
			     iframeScroll:true,
			     iframeFetchTitle:true,
			     zIndex:301,
			     onLoad:function(){},
			     onClose:function(){},
			     onMax:function(){},
			     target:window
			},op);
	    	 var win=option.target,
	    	     ww=$(win).width(),
	    	     wh=$(win).height(),
	            _id="jw-dialog-"+new Date().getTime(),header,
	            _style="top:"+(0.75*wh/2+$(win).scrollTop())+"px;left:"+(ww/2+$(win).scrollLeft())+"px;width:1px;height:1px",
	            dialog="<div class='jw-dialog' id='"+_id+"' style='"+_style+"'><div class='jw-dialog-hd'></div><div class='jw-dialog-bd'></div></div>";
	        _style=null;
	        dialog=$(win.document.body).append(dialog).find("#"+_id);
	        option.over && this.over();
	        option.fixed && this.position_fixed(dialog,win);
	        var bd=$('.jw-dialog-bd',dialog),
	            hd=$('.jw-dialog-hd',dialog),
	            isMax=false,
	            isFixed=false,
	            that=this,
	            th=hd.outerHeight();
	        
	        $(win).resize(function(){
	        	 ww=$(win).width();
	        	 wh=$(win).height();
	         });
	        setTimeout(function(){
		        dialog.css('z-index',option.zIndex);
     	        setSize(option.width,option.height);
	         },0);
	        if(option.id){
    	        	bd.append($(option.id).clone(true).show());
    	        	autoBounds();
	         }else if(option.html!=null){
	        	 bd.append(option.html);
	        	 autoBounds();
	          }
	        if(option.title!==false){
	        	   var _div="<span><a href='javascript:;' ";
	              header="<table width='100%'><tr><td>"+
	                         "<div class='jw-title'>"+(option.title||'&nbsp;')+"</div></td><td style='width:55px;text-align:right'><nobr>";
	             option.max!=false && (header+=_div+" class='max'><img src='/include/images/max.gif'></a></span>");
	             option.close!=false && (header+=_div+" class='close'><img src='/include/images/close.gif'></a></span>");
	             header+="</nobr></td></tr></table>";
	             header=hd.append(header).find('table');
	         }else{
	        	 hd.remove();
	        	 th=0;
	         }
	        function setTitle(title){
	        	 option.title!==false && header.find('.jw-title').text(title);
	         }
	     	
	        function setSize(width,height){
	        	((width+"").indexOf("%")>0) && (width=(ww*parseFloat(width)/100.0));
	        	((height+"").indexOf("%")>0) && (height=(wh*parseFloat(height)/100.0));
				height = option.height > 0 ? option.height : height
	        	autoBounds(parseInt(width),parseInt(height));
	        };
	        function scrollPos(){
	        	  isFixed=dialog.css('position')=='fixed';
	        	  return {top:isFixed?0:$(win).scrollTop(),left:isFixed?0:$(win).scrollLeft()};
	          }
	        
	          function autoBounds(_w,_h){
	        	   var h=Math.min(Math.max(_h||0,option.height,140),wh-5-th);
	     		   var w=Math.min(Math.max(_w||0,dialog.width(),option.width,300,bd.width()),ww);
		          var top=0.75*(wh-h)/2+scrollPos().top,
		        	    left=(ww-w)/2+scrollPos().left;
		               setBounds(top,left,w,h);
	           }
	           
	          function setBounds(top,l,width,height){
	        	 if(!width || !height)return;
	        	  width=Math.min(width,ww);
	        	  height=Math.min(height,wh-th);
	        	  dialog.animate({top:top,left:l,width:width,height:height+th});
	        	  if(!option.iframe && !isMax){
	        		  bd.css('height','auto');
	        	  }else{
	        		  bd.animate({height:height});
	        	  }
	           }
	          
	          function setLocation(top,left){
	        	  dialog.animate({top:top,left:left});
	            }
	        
	           
	          var last={},lastMaxClickTime=0;
	          function close(e){
	        	     if(e)e.stopPropagation();
	          	     that.over('close');
	          	     if(0===option.onClose())return false;
	          	    	 
	          	     dialog.animate({top:wh/2+scrollPos().top,left:ww/2,width:0,height:0},function(){
	          	    	dialog.remove();
	          	     });
	          	     return false; 
	           }
	         
	           function max(e){
	             if(e)e.stopPropagation();
	        	   var cTime=new Date().getTime();
	        	   if(cTime-lastMaxClickTime<300)return false;
	        	   lastMaxClickTime=cTime;
	        	   if(isMax){
	        		   isMax=false;
	        		   setBounds(last.top,last.left,last.width,last.height);
	        	   }else{
	        		   isMax=true;
	        		   var t=scrollPos().top;
		        	   last={top:dialog.offset().top-(isFixed?$(win).scrollTop():0),left:dialog.offset().left,width:dialog.width(),height:bd.height()};
		        	   setBounds(t,scrollPos().left,ww,wh-th);
		        	   t=null;
	        	   }
	        	   var _max=header.find('.max');
	        	   isMax?_max.addClass('maxed'):_max.removeClass('maxed');
	        	   option.onMax();
	        	   return false;
	            }
	          
	         function toCenter(w,h){
	        	 w=w||1;
	        	 h=h||1;
	        	 dialog.css({top:0.75*(wh-h)/2,left:(ww-w)/2,width:w,height:h+th});
	      	     bd.height(h);
	          }
	         var dialogFn={close:close,
	        		         setSize:setSize,
	        		         setBounds:setBounds,
	        		         setLocation:setLocation,
	        		         setTitle:setTitle,
	        		         setBody:function(html){bd.html(html)},
	        		         dialog:dialog,
	        		         bd:bd
	                          };
	         
	         if(option.rel){
	             bd.css('height','auto').empty().load(option.rel,function(){
	            	 setTimeout(function(){ autoBounds(bd.width(),bd.height());},100);
	            	 setTimeout(function(){option.onLoad.call(dialogFn);},150);
	            	});
	         }else if(option.iframe){
		        var ifr="<iframe class='jw-dialog-ifr iframe' src='"+option.iframe+"' style='width:100%;height:100%;border:0' frameborder=0 "+(option.iframeScroll?"":"scrolling=no")+" ></iframe>";
		         	ifr=bd.append(ifr).find('.iframe');
		         	var isLoaded=false,loading=null;
		         	setTimeout(function(){
		         		if(isLoaded)return;
		         		loading="<div class='jw-dialog-loading' style='position: relative;width:100%;height:"+option.height+"px;margin-top:-"+option.height+"px;'><div style='margin-top:"+option.height/2+"px'>&nbsp;</div></div>";
		         		loading=bd.append(loading).find('.jw-dialog-loading');
		         	},100);
		         	ifr.load(function(){
		         		isLoaded=true;
		         		if(loading){loading.remove();loading=null;}
		         		 var c=null,cl=0;
		         		 try{ c=$(this).contents(); cl=$('body',c).html().length;}catch(e){}
		               if(c){
			               if(cl>0 ){
				               c.find('.close').click(close).end().find('.max').click(max);
				               $('body',c).bind('close',close);
				               if(option.iframeFetchTitle){
					               var it=c.attr('title');
					               if(it.length)setTitle(it);
					              }
				               setTimeout(function(){
				            	   !op.width && dialog.width(300);
				            	   !op.height &&  bd.height(100);
				            	    setSize(c.width(),c.height());
				            	    },5);//use timeout to fix ie
			               }else{
			                	 setSize(option.width,option.height);
			                 }
		               }else{
		            	   autoBounds();
		               }
		               option.onLoad.call(dialogFn);
		         	});
	         }else{
	        	 option.onLoad.call(dialogFn);
	         }
	         
	         //没有遮罩层时，可能会有有多个dialog
	        if(!option.over){
	        	dialog.click(function(){
	        		var _max=option.zIndex;
	        		$('.jw-dialog',win.document).not(dialog).each(function(){
	        			_max=Math.max(_max,parseInt($(this).css('z-index'))+1);
	        		});
	        		dialog.css('z-index',_max);
	        	});
	          }
	        
	        var fn=function(){autoBounds();dialog.is(":visible")&&that.over();};
	        $(win).resize(fn);
	        
	        dialog.bind('close',close).find('.close').live('click mousedown',close).end().find('.max').live('click mousedown',max);
	        if(option.close!==false){
	        	$(win).keydown(function(e){
	        		e.keyCode==27 && close();
	        	});
	        }
	        option.drag && header && this.drag(header,dialog,win);
	        return dialogFn;
	    },
	    
	   //网页底部的提示信息 
	  msg:function(message,time,callFn){
			function createUI(){
					var tmp="<div class='jw-msg'><div class='jw-msg-bd'>"+message+"</div></div>";
					var div=$(tmp);
					div.appendTo('body').css('opacity',0.1).animate({opacity:0.8});
					jw.position_fixed(div);
					if($.isFunction(time)){
						callFn=time;
						time=0;
					}
					time=time||3000;
					if($.isFunction(callFn)){
						div.bind('jw-msg-call',callFn);
					}
					if(time>0){
						setTimeout(function(){
							div.animate({opacity:0},2000,function(){
								$(this).remove();
							}).trigger('jw-msg-call');
						},time);
					}
			}
			if($('.jw-msg').size()){
				$('.jw-msg').animate({width:0,height:0,left:$(window).width()/2},
						function(){
					$(this).trigger('jw-msg-call').remove();
					createUI();
			  });
			}else{
				createUI();
			}
		},
	    
		processbar:function(id,value){
			var bar=$(id),
			    t=bar.find('.jw-pbar-t');
			if(!t.size()){
				bar.addClass("jw-pbar").html("<div class='jw-pbar-t'>0%</div><div class='jw-pbar-v'>&nbsp;</div>");
				t=bar.find('.jw-pbar-t');
			}
			var v=bar.find('.jw-pbar-v');
			function setval(value){
				value=parseInt(Math.min(Math.max(value||0,0),100));
				t.html(value+"%").width(bar.width());
				v.css("width",value+"%");
			}
			setval(value);
			return {
				    val:function(pv){
				    	if(typeof pv=='undefined'){
				    		return parseInt(t.text());
				    	}else{
				    		setval(pv);
				    	}
					}
			};
		}
	    
   };
	
})(jQuery);

;(function($){	
    
    /**
     * jw.alert
     * 弹出提示，有一个图标和提示文字
     * @param text 提示文字
     * @param ico  提示图标坐标（如 1x1,5x2)  采用了jw-icons.gif中的图片 每个图片大小为50px
     * @param title 提示标题
     * @fn 点击确定时的回调函数 
     */
    var jwalert=function(text,option){
    	option=$.extend({},{icon:1,
                  	   ok:jw.ok_text,
	    		          onOk:function(){},
	    		          cancle:null,
	    		          onCancle:function(){},
	    		          title:jw.alert_title
	    		          },option||{});
    	var ico=(option.icon+"").split("x"),
    	    x=ico[0],y=ico.length==2?ico[1]:1;
    	    id="jwalert"+new Date().getTime(),
    	    style="background-position:-"+(x-1)*50+"px -"+(y-1)*50+"px;",
    	    code="<div class='jw-alert'>" +
	    			"<div class='icon' style='"+style+"'></div><div class='bd'>"+(text||'')+"</div><div style='clear:both'></div>" +
	    			"<div class='ft'>" +
	    			"<input type='button' value='&nbsp;"+option.ok+"&nbsp;' id='"+id+"_ok' />";
		if(option.cancle!=null){
			code+="&nbsp;&nbsp;<input type='button' value='&nbsp;"+option.cancle+"&nbsp;' id='"+id+"_cannel' />";
		}
    	code+="</div></div>";
    	style=x=ico=null;
    	var div=$(code),
    	    ja=null,
    	    timer=null;
    	function call_bk(fn){if(fn()===false)return;ja.close();};
    	$('#'+id+"_ok",div).click(function(){timer && clearTimeout(timer);call_bk(option.onOk);});
    	$('#'+id+"_cannel",div).click(function(){call_bk(option.onCancle);});
    	ja=jw.dialog({id:div,max:false,close:false,title:option.title,fixed:true,width:350,over:true});
    	if(option.time)timer=setTimeout(function(){call_bk(option.onOk);},option.time);
      };
    $.extend(jw,{alert:jwalert}); 
})(jQuery);