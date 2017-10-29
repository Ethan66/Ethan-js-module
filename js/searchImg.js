var Bucket=(function(){
    var Bucket1=function($ct,height,space){
        this.init($ct,height,space);
        this.bind();
    }
    Bucket1.prototype={
        init:function($ct,height,space){
            this.$ct=$ct;
            this.space=space;      //每张图片之间的空隙，需要在css里设置好，比如margin:5,那么每张图片的间隙是10
            this.width=$ct.width();
            this.height=height;
            this.imgArr=[];       //存放渲染到页面一行的所有图片的数据，数组里存放的是对象，{target:img,width,height},渲染到页面后就删除
            this.sum=0;           //把每一张图片宽度相加并加上间隙，当sum大于宽度时就减去最后一张图片宽度和间隙，说明这一行就放这么多图片
            this.colHeightArr=[];   //存放每行图片的高度
            this.colSpace=[];   //存放每行的所有空隙总和
            this.col=0;         //记录当前是第几行
        },
        bind:function(){
            var self=this;
            //先拿到数据，然后提取网址，对每张图片的网址进行Image实例，创建它的imgInfo信息
            this.getData(function(dataArr){
                var urlArr=self.getUrl(dataArr);
                //一定不要用for遍历，不然只能执行最后一个图片
                $.each(urlArr,function(index){
                    //一定要new Image，当浏览器加载完图片后才能获取图片的高度和宽度
                    var img=new Image();
                    img.src=urlArr[index];
                    img.onload=function(){
                        var imgInfo={
                            target:img,   //记录Image实例
                            width: self.height*img.width/img.height,   //当图片高度为this.height时图片的宽度
                            height: self.height
                        }
                          // console.log(imgInfo);
                        self.render(imgInfo);    //将图片进行渲染
                    }
                });
            });
            $(window).resize(function(){
                var newWidth=self.$ct.width();
                var rate=0;
                self.$ct.find("[data-col]").each(function(index,value){
                    rate=(newWidth-self.colSpace[index])/(self.width-self.colSpace[index]);
                    self.colHeightArr[index]=self.colHeightArr[index]*rate;
                    $(this).height(self.colHeightArr[index]);
                })
                self.width=newWidth;
            })
        },
        getData:function(callback){
            /*$.ajax({
                url:"https://pixabay.com/api/",
                data:{
                    key:'6313490-377b4286fb725b1e53ee66b03',
                    q:'city',
                    image_type:"all",
                    page:1
                },
                success:function(data){
                    // console.log(data["hits"])
                    callback(data["hits"])
                },
                dataType:"json"
            })*/
            $.ajax({
                url:"http://rapapi.org/mockjsdata/27996/index/hotList",
                data:"",
                success:function(data){
                    //console.log(data.list)
                    callback(data.list)
                }
            })
        },
        getUrl:function(dataArr){
            var urlArr=[];
            $.each(dataArr,function(index){
                // urlArr.push(this.webformatURL);
                urlArr.push(this.img);
            })
           // console.log(urlArr);
            return urlArr;
        },
        //把每张图片的imgInfo作为参数执行render方法
        render:function(data){
            this.sum+=data.width;
            this.sum+=this.space;    //this.sum不仅要保存宽度，还要保存间隙
            // console.log(this.sum);
            if(this.sum>=this.width){
                var imgArrLength=this.imgArr.length;
                this.sum-=data.width;
                this.sum-=this.space;
                this.colSpace[this.col]=imgArrLength*this.space;    //保存这一行间隙总和
                var changeHeight=(this.width-this.colSpace[this.col])*this.height/(this.sum-this.colSpace[this.col]);    //注：一定要减去间隙，因为间隙是不变的
                this.colHeightArr[this.col]=changeHeight;
              //  console.log(this.imgArr);
                this.layout(changeHeight);
                this.sum=data.width+this.space;   //把当前图片宽度记录下来，当成下一行第一张
                this.imgArr=[]; this.imgArr.push(data);   //this.imgArr也清空，记录当前图片数据
            }
            else {
                this.imgArr.push(data);
            }
        },
        layout:function(height){
            var self=this,$p=$("<p></p>");
            $p.attr("data-col",self.col).height(height);   //p为每一行图片的容器，只要设置容器的高度，然后让图片的height=100%就好了
            $.each(self.imgArr,function(index){
                var $img=$(this.target);
                $img.css({"height":"100%"});
                $p.append($img);
            });
            self.$ct.append($p);
            self.col++;
           // console.log(self.colSpace)
        }
    }
    return {
        init: function($ct,height,space){
            $ct.each(function(index,value){
                new Bucket1($(this),height,space)
            })
        }
    }
})();