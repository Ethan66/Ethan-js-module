var Pager=(function(){
    var Pager1=function($ct,firNum,now,num,total){
        this.init($ct,total,num,firNum,now);
        this.bind();
    }
    Pager1.prototype.init=function($ct,total,num,firNum,now){
        this.$ct=$ct;
        this.num=num;
        this.curNum=[firNum];
        this.curPoint=now-1;
        this.point=this.num-3;
        this.nextPoint=0;
        this.total=total;
    }
    Pager1.prototype.bind=function(){
        var that=this;
        this.generateHtml(this.num);
        this.$ct.on("click",".next",function(e){
            that.nextPoint=that.curPoint+1;
            if(that.nextPoint>that.point){
                that.nextPage(that.nextPoint-that.point);
            }
            else {
                that.setCurpoint();
            }
        });
        this.$ct.on("click",".pre",function(e){
            that.nextPoint=that.curPoint-1;
            if(that.$ct.find("li").eq(0).attr("data-page")>1){
                that.prePage(that.curPoint-that.nextPoint);
            }
            else {
                that.setCurpoint();
            }
        });
        this.$ct.on("click","ol li",function(e){
            that.nextPoint=$(this).index();
            if(that.nextPoint-that.curPoint>0){
                if(that.nextPoint>that.point){
                    that.nextPage(that.nextPoint-that.point);
                }
                else {
                    that.setCurpoint();
                }
            }
            else {
                if(that.$ct.find("li").eq(0).attr("data-page")>1){
                    that.prePage(that.curPoint-that.nextPoint);
                }
                else {
                    that.setCurpoint();
                }
            }
        });
    }
    Pager1.prototype.generateHtml=function(num){
        var pageHtml="";
        for(var i=0;i<num;i++){
            if(i>0){
                this.curNum.push(this.curNum[0]+i);
            }
            if(i==this.curPoint) {
                pageHtml+="<li data-page='"+this.curNum[i]+"' class='current'><span>"+this.curNum[i]+"</span></li>";
            }
            else {
                pageHtml+="<li data-page='"+this.curNum[i]+"'><span>"+this.curNum[i]+"</span></li>";
            }
        }
        var html="<nav><button class='first' disabled>首页</button><button class='pre' disabled>上一页</button>" +
            "<ol data-role='pageNumbers'>"+pageHtml+"</ol>" +
            "<button class='next'>下一页</button><button class='last'>末页</button>";
        this.$ct.append(html);
    }
    Pager1.prototype.nextPage=function(x){
        var y=this.total-this.curNum[this.num-1];
        if(y>=x){
            this.setData(x);
        }
        else {
            this.setData(y);
        }
        if(y==0){
            this.$ct.find(".last").attr("disabled",true);
            this.setCurpoint();
        }
        this.showPage();
    }
    Pager1.prototype.prePage=function(x){
        var y=this.$ct.find("li").eq(0).attr("data-page");
        if(y>=x){
            this.setData(-x);
        }
        else{
            this.setData(-y);
        }
        this.showPage();
    }
    Pager1.prototype.setData=function(x){
        this.curNum=this.curNum.map(function(value,index){
            return value+=x;
        })
    }
    Pager1.prototype.setCurpoint=function(){
        this.$ct.find(".next").attr("disabled",false);
        this.$ct.find(".pre").attr("disabled",false);
        this.$ct.find("ol li").eq(this.nextPoint).addClass("current").siblings().removeClass("current");
        this.curPoint=this.nextPoint;
        if(this.$ct.find('li').eq(this.curPoint).attr("data-page")==this.total){
            this.$ct.find(".next").attr("disabled",true);
        }
        if(this.$ct.find('li').eq(this.curPoint).attr("data-page")==1){
            this.$ct.find(".pre").attr("disabled",true);
        }
    }
    Pager1.prototype.showPage=function(){
        var that=this;
       var $liArr=this.$ct.find("ol li");
       $liArr.each(function(index,value){
           $(this).attr("data-page",that.curNum[index]);
           $(this).find("span").text(that.curNum[index]);
       })
        this.$ct.find(".first").attr("disabled",false);
        this.$ct.find(".last").attr("disabled",false);
        if(this.$ct.find("li").eq(0).attr("data-page")==1){
            this.$ct.find(".first").attr("disabled",true);
        }
        if(this.$ct.find('li').last().attr("data-page")==this.total){
            this.$ct.find(".last").attr("disabled",true);
        }
    }


    return {
        init: function($ct,firNum,now,num,total){
            $ct.each(function(index,value){
                new Pager1($(this),firNum,now,num,total);
            })
        }
    }
})();