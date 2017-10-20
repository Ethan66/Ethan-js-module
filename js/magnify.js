var Magnify=(function(){
    var Magnify1=function($ct,imgUrl){
        this.init($ct,imgUrl);
        this.bind();
    }
    Magnify1.prototype.init=function($ct,imgUrl){
        this.$ct=$ct;
        this.imgUrl=imgUrl;
        this.height=$ct.height();
        this.width=$ct.width();
        this.$scope=$ct.find(".scope");   //小图片的上的遮罩层
        this.l=0; this.t=0;   //记录遮罩层的left,top
        this.ctLeft=$ct.offset().left;
        this.ctTop=$ct.offset().top;
        this.scopeHeight=this.$scope.height();
        this.scopeWidth=this.$scope.width();
    }
    Magnify1.prototype.bind=function(){
        var that=this;
        this.setLargeScope(this.ctLeft,this.ctTop,this.imgUrl);    //生成大图片的html并设置初步位置
        this.$ct.on("mouseover",function(e){
            that.$magnifyScope.removeClass("none");
            that.$scope.removeClass("none");
        });
        that.$ct.on("mousemove",function(e){
            that.getMoveNum(e.clientX,e.clientY);   //获取遮罩层需要移动的left,top记录到this.l,this.t中
            that.setsmall(that.l,that.t);      //设置遮罩层位置
            that.setLarge(that.l,that.t);    //设置大图位置
        });

        this.$ct.on("mouseout",function(e){
            that.$magnifyScope.addClass('none');
            that.$scope.addClass("none");
        })
    }
    Magnify1.prototype.setLargeScope=function(x,y,imgUrl){
        var html='<div class="e-largeImg none">\
            <p class="large"><img class="img" src="'+imgUrl+'" /></p>\
            </div>';
        this.$ct.after(html);
        this.$magnifyScope=this.$ct.nextAll(".e-largeImg");
        this.largeImg=this.$magnifyScope.find("img");
        var locationX=x+this.width+10;
        var locationY=y+0;
        this.$magnifyScope.css({left:locationX,top:locationY});
    }
    Magnify1.prototype.getMoveNum=function(x,y){
        var l=x-this.ctLeft-this.scopeWidth/2;   //鼠标左边位置-小图左边位置-遮罩层一半宽度->刚进入小图片一半遮罩层宽度
        var t=y-this.ctTop-this.scopeHeight/2;    //鼠标上边位置-小图上边位置-遮罩层一半高度->刚进入小图片一半遮罩层高度
        l>0?this.l=l:this.l=0;
        t>0?this.t=t:this.t=0;
        if(x+this.scopeWidth/2>this.ctLeft+this.width) {   //鼠标左边位置+遮罩层一半宽度>小图左边位置+小图宽度->快移除小图片还差一半遮罩层宽度
            this.l=this.width-this.scopeWidth;
        }
        if(y+this.scopeHeight/2>this.ctTop+this.height) {   //鼠标上边位置+遮罩层一半高度>小图上边位置+小图高度->快移除小图片还差一半遮罩层高度
            this.t=this.height-this.scopeHeight;
        }
    }
    Magnify1.prototype.setsmall=function(l,t){
        this.$scope.css({left:l,top:t});
    }
    Magnify1.prototype.setLarge=function(l,t){
        var L=-l/this.width*this.largeImg.width();    //小图移动左边距离/小图宽度*大图宽度->大图img左移的大小，负号表示反方向
        var T=-t/this.width*this.largeImg.height();    //小图移动上边距离/小图高度*大图高度->大图img上移的大小，负号表示反方向
        this.largeImg.css({left:L,top:T});
    }
    return {
        init: function($ct,imgUrl){
            $ct.each(function(index, value){
                new Magnify1($(this),imgUrl);
            })
        }
    }
})();


