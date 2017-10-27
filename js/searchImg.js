var Bucket=(function(){
    var Bucket1=function($ct,height){
        this.init($ct);
        this.bind();
    }
    Bucket1.prototype.init=function($ct,height){
        this.$ct=$ct;
        this.width=$ct.width();
        this.height=height;
    }
    Bucket1.prototype.bind=function(){
        var self=this;
        this.getData(function(data){
             var imgArr=self.getImgArr(data);
             console.log(imgArr);
             self.setImg(imgArr);
        });
    }
    Bucket1.prototype.getData=function(callback){
        var self=this;
        $.ajax({
            url:"https://pixabay.com/api/",
            data:{
                key:'6313490-377b4286fb725b1e53ee66b03',
                q:'city',
                image_type:"all",
                page:1
            },
            success:function(data){
                callback(data["hits"])
            },
            dataType:"json"
        })
    }
    Bucket1.prototype.getImgArr=function(data){
        var imgArr=[];
        data.forEach(function(value,index){
            imgArr[index]={url:value["webformatURL"],width:value["webformatWidth"],height:value["webformatHeight"]};
        })
        return imgArr
    }
    Bucket1.prototype.setImg=function(arr){
        var self=this;
        var sum=0, j=0, h=0, newArr=[];
        newArr[0]=[];
        arr.forEach(function(value,index){
            sum+=value.width;
            console.log(sum)
            if(sum<=self.width){
                newArr[j].push(value['url']);
            }
            else {
                h=self.width/sum*self.height;
                newArr[j].unshift(h);
                sum=value.width; j++; newArr[j]=[];
            }
        });
        console.log(newArr);
    }
    return {
        init: function($ct,height){
            $ct.each(function(index,value){
                new Bucket1($(this),height)
            })
        }
    }
})();