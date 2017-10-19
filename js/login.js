var Login=(function(){
    var Login1=function($ct){
        this.init($ct);
        this.bind();
    }
    Login1.prototype.init=function($ct){
        this.$ct=$ct;
        this.submit=$ct.find("input[type=submit]");
        this.$username=$ct.find(".username");
        this.$password=$ct.find(".password");
    }
    Login1.prototype.bind=function(){
        var that=this;
        that.addTipTab();   //增加注释标签
        this.submit.on("click",function(e){
            e.preventDefault();
            var data=that.getValue();   //获取value值
            var result=that.isStandard(data);   //判断是否符合标准，得出相应结果
            var tip=that.getTips(data["username"],data["password"],result[0],result[1]);   //根据得出结果判断获得哪个注释文字
            that.showTips(tip);    //输出注释
           /* if(data){

            }*/
        });
        this.$username.on("input",this.changeValue.bind(this));
        this.$password.on("input",this.changeValue.bind(this));
    }
    Login1.prototype.addTipTab=function(){
        this.$ct.find(".line").each(function(index,value){
            if(index<2){
                $(this).append("<b></b>");
            }
        })
    }
    Login1.prototype.changeValue=function(e){
        if($(e.target).next("b")){
            $(e.target).next("b").css("display","none");
        }
    }
    Login1.prototype.getValue=function(){
        var user=this.$ct.find(".username").val(),pass=this.$ct.find(".password").val();
        /*if(!user){
            this.getTips(); return
        }
        if(!pass){
            this.getTips(user,""); return
        }*/
        var data={
            username: user,
            password: pass
        }
        return data;
    }
    Login1.prototype.isStandard=function(data){
        var result=[false,false];
        var reg={
            username:/^\w{6,20}$/g,
            password:/^\d{6,20}$|^[a-z]{6,20}$|^[A-Z]{6,20}$|^[_]{6,20}$/g
        }
        for(var key in data){
            if(key==="password"){
                if(!/^\w{6,20}$/.test(data[key])) {result[1]=false;}
                else if(/^\d{6,20}$/.test(data[key])|/^[a-z]{6,20}$/.test(data[key])|/^[A-Z]{6,20}$/.test(data[key])|/^_{6,20}$/.test(data[key]))
                    {result[1]=false;}
                else
                {result[1]=true;}
            }
            else if(key==="username"){
                if(reg[key].test(data[key])) result[0]=true;
            }
        }
        return result
    }
    Login1.prototype.getTips=function(username,password,result1,result2){
        var tip=[{},{}];
        if(!username){
            tip[0][0]="请输入登录名"; return tip
        }
        if(!password){
            tip[1][0]="请输入密码"; return tip
        }
        if(!result1){
            tip[0][1]="6-20字符，只包含字母、数字、下划线"; return tip
        }
        if(!result2){
            tip[1][1]="6-20字符，至少包括两种大小写字母、数字、下划线"; return tip
        }
    }
    Login1.prototype.showTips=function(tip){
        if(!tip) {
            alert("用户名密码书写正确"); return
        }
        var newTip=[];
        tip.forEach(function(value,index,arr){
            for(var key in value){
                if(value[key]) {
                    newTip[0]=index; newTip[1]=value[key]; return
                }
            }
        });
        // var html="<b>"++"</b>";
        this.$ct.find('.line').each(function(index,value){
            $(this).find("b").text("");
            if(index==newTip[0]) {
                $(this).find("b").css("display","block");
                $(this).find("b").text(newTip[1]);
            }
        })
    }
    return {
        init: function($ct){
            $ct.each(function(index, value){
                new Login1($(this));
            })
        }
    }
})();

//Login.init($(".login"));