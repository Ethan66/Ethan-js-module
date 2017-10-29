var Waterfull=(function(){
    var Waterfull1=function($ct,col,width,space){
        this.init($ct,col,width,space);
        this.bind();
        this.start();      //第一次执行
    }
    Waterfull1.prototype={
        init:function($ct,col,width,space){
            this.$ct=$ct;
            this.liWidth=width;        //图片容器的宽度
            this.col=col;              //一行展示几个图片
            this.space=space;          //图片之间的空隙
            this.width=$ct.width();    //包括图片容器的总容器的宽度
            this.perPageCount=20;      //每次请求所展示的图片数量
            this.curPage=1;            //每次请求第几页
            this.heightArr=[];         //记录每列的总高度
            this.minHeight=0;          //记录每列的最短的高度
            this.minHeightCur=0;       //记录最短高度的列数
            for(var i=0;i<col;i++){    //初始化每列的高度
                this.heightArr[i]=0;
            }
            this.isArrive=true;        //记录是否请求完成，如果未完成，展示false
        },
        start:function(){
            if(!this.isArrive) return;
            this.isArrive=false;
            var self=this;
            //获取数据并回调函数
            this.getData(function(data){
                // console.log(data);
                $.each(data,function(index,value){    //对数组进行操作，获取节点，并对每个图片进行操作
                    var $node=self.getNode(value);    //获取每张图片的节点（li容器包裹的）
                    $node.find("img").load(function(){
                        // console.log($node);
                        self.compareHeight(self.heightArr);    //比较每列的高度，获取最小高度
                        self.render($node);          //把图片放到最小高度上，然后对这列的最小高度进行累加
                    });
                })
                self.isArrive=true;            //执行完后说明请求完成
            });
        },
        bind:function(){
            var self=this;
            $(window).scroll(function(){        //当滚动时触发
                var offsetTop=self.$ct.next(".hidden").offset().top;
                if($(window).scrollTop()<offsetTop&&offsetTop<$(window).height()+$(window).scrollTop()){    //假如隐藏的p出现时，再次执行start
                     self.start();
                }
                self.curPage++;
            });
        },
        getData:function(callback){
            var self=this;
            $.ajax({
                url: "http://platform.sina.com.cn/slide/album_tech",
                data:{
                    app_key:1271687855,
                    num: self.perPageCount,
                    page:self.curPage
                },
                dataType:"jsonp",
                jsonp:"jsoncallback",
                success:function(data){
                    callback(data.data);
                }
            })
        },
        getNode:function(news){
            var html="<li><p class='img'><img src='"+news.img_url+"'/></p><div class='text'>";
            html+="<h4>"+news.short_name+"</h4>";
            html+="<p>"+news.short_intro+"</p></div></li>";
             return $(html);
         },
        compareHeight:function(arr){
            this.minHeight=arr[0]; this.minHeightCur=0;
            for(var i=1;i<arr.length;i++){
                if(this.minHeight>arr[i]){
                    this.minHeight=arr[i]; this.minHeightCur=i;
                }
            }
        },
        render:function($node){
            $node.css({"left":this.minHeightCur*(this.liWidth+this.space),"top":this.minHeight});
            this.$ct.append($node);
            this.heightArr[this.minHeightCur]+=$node.outerHeight()+10;
            this.$ct.height(this.heightArr[this.minHeightCur]);
        }
    }
    return {
        init: function($ct,col,width,space){
            $ct.each(function(index,value){
                new Waterfull1($(this),col,width,space);
            })
        }
    }
})();