var Pager=(function(){
    var Pager1=function($ct,firNum,now,num,total){
        //firNum表示当前所展示页数的第一页
        //now表示当前所在第几页
        //num表示当前要展示多少页数
        //total表示一共有多少页
        this.init($ct,total,num,firNum,now);
        this.bind();
    }
    Pager1.prototype.init=function($ct,total,num,firNum,now){
        this.$ct=$ct;
        this.num=num;          //当前展示多少页数
        this.curNum=[firNum];  //当前展示页数的第一页到最后一页的数组
        this.curPoint=now-1;   //当前所在第几页
        this.point=this.num-3;    //当点击最后第二页的时候会往下翻页
        this.nextPoint=0;       //点击的时候保存作用
        this.total=total;         //页码总数
    }
    Pager1.prototype.bind=function(){
        var that=this;
        this.generateHtml(this.num);
        this.$ct.on("click",".next",function(e){
            that.nextPoint=that.curPoint+1;
            //当点击的页数超过临界点的时候，调用翻页函数
            if(that.nextPoint>that.point){
                that.nextPage(that.nextPoint-that.point);
            }
            //不然只是改变class,并保存当前所在第几页
            else {
                that.setCurpoint();
            }
        });
        this.$ct.on("click",".pre",function(e){
            that.nextPoint=that.curPoint-1;
            //当当前页码的第一页大于1的时候，说明可以往前翻页
            if(that.$ct.find("li").eq(0).attr("data-page")>1){
                that.prePage(that.curPoint-that.nextPoint);
            }
            //不然只是改变class,并保存当前所在第几页
            else {
                that.setCurpoint();
            }
        });
        this.$ct.on("click","ol li",function(e){
            that.nextPoint=$(this).index();
            //当点击的页数大于当前页数
            if(that.nextPoint-that.curPoint>0){
                //当点击的页数超过临界点的时候，调用翻页函数
                if(that.nextPoint>that.point){
                    that.nextPage(that.nextPoint-that.point);
                }
                //不然只是改变class,并保存当前所在第几页
                else {
                    that.setCurpoint();
                }
            }
            //当点击的页数小于当前页数
            else {
                //当当前页码的第一页大于1的时候，说明可以往前翻页
                if(that.$ct.find("li").eq(0).attr("data-page")>1){
                    that.prePage(that.curPoint-that.nextPoint);
                }
                //不然只是改变class,并保存当前所在第几页
                else {
                    that.setCurpoint();
                }
            }
        });
        this.$ct.on("click",".first",function(){
           if(that.$ct.find("ol li").eq(0).attr("data-page")>1){
               for(var i=1;i<=that.curNum.length;i++){
                   that.curNum[i-1]=i;
               }
               that.nextPoint=0;
               that.showPage();
               that.setCurpoint();
           }
        });
        this.$ct.on("click",".last",function(){
            if(that.$ct.find("ol li").eq(that.num-1).attr("data-page")<that.total){
                for(var i=that.num,j=0;i>=1;i--,j++){
                    that.curNum[i-1]=that.total-j;
                }
                that.nextPoint=that.num-1;
                that.showPage();
                that.setCurpoint();
            }
        });
    }
    //页面加载的时候生成页码
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
    //翻页函数
    Pager1.prototype.nextPage=function(x){
        var y=this.total-this.curNum[this.num-1];
        //当剩余页数大于需要翻页的数量时，设置翻页数量的值
        if(y>=x){
            this.setData(x);
        }
        //不然，设置剩余数量的值
        else {
            this.setData(y);
        }
        //当剩余页数等于0时，末页不可点击
        if(y==0){
            this.$ct.find(".last").attr("disabled",true);
            this.setCurpoint();
        }
        //展示新的页码
        this.showPage();
    }
    //往前翻页
    Pager1.prototype.prePage=function(x){
        var y=this.$ct.find("li").eq(0).attr("data-page")-1;
        //当当前第一页页码大于需要翻页的数量时，设置翻页数量的值
        if(y>=x){
            this.setData(-x);
        }
        //不然，设置剩余往前翻页数量的值
        else{
            this.setData(-y);
        }
        //展示新的页码
        this.showPage();
    }
    //设置data-page值保存在数组，x表示向前或向后翻页的数量
    Pager1.prototype.setData=function(x){
        this.curNum=this.curNum.map(function(value,index){
            return value+=x;
        })
    }
    //前点击的位置传给当前页数，并判断是否到当前页数的第一个或最后一个
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
    //通过获取保存在data-page数组的值，展示新的页码，并判断前后还有其他页数来判断首页和末页的点击状态
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