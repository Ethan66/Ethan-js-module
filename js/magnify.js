var Magnify=(function(){
    var Magnify1=function($ct){
        this.init($ct);
        this.bind();
    }
    Magnify1.prototype.init=function($ct){
        this.$ct=$ct;
        this.height=$ct.height();
        this.width=$ct.width();
        this.$large=$ct.find(".large");
        this.$scope=$ct.find(".scope");
        this.l=0;
        this.t=0;
        this.ctLeft=$ct.offset().left;
        this.ctTop=$ct.offset().top;
        this.scopeHeight=this.$scope.height();
        this.scopeWidth=this.$scope.width();
    }
    Magnify1.prototype.bind=function(){
        var that=this;
        this.$ct.on("mouseover",function(e){
            that.$scope.removeClass("none");
        });
        that.$ct.on("mousemove",function(e){
            that.getMoveNum(e.clientX,e.clientY);
            that.setsmall(that.l,that.t);
        });

        this.$ct.on("mouseout",function(e){
            that.$scope.addClass("none");
        })
    }
    Magnify1.prototype.getMoveNum=function(x,y){
        var l=x-this.ctLeft-this.scopeWidth/2;
        var t=y-this.ctTop-this.scopeHeight/2;
        l>0?this.l=l:this.l=0;
        t>0?this.t=t:this.t=0;
        if(x+this.scopeWidth/2>this.ctLeft+this.width) {
            this.l=this.width-this.scopeWidth;
        }
        if(y+this.scopeHeight/2>this.ctTop+this.height) {
            this.t=this.height-this.scopeHeight;
        }
    }
    Magnify1.prototype.setsmall=function(l,t){
        this.$scope.css({left:l,top:t});
    }
    return {
        init: function($ct){
            $ct.each(function(index, value){
                new Magnify1($(this));
            })
        }
    }
})();


