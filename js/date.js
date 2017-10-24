var DatePicker=(function(){
    var Date1=function($ct,$ctPrev){
        this.init($ct,$ctPrev);
        this.bind();
    }
    Date1.prototype.init=function($ct,$ctPrev){
        this.$ct=$ct;
        this.$ctPrev=$ctPrev;
        this.current=new Date();
        this.watchDate=new Date();
        this.dateArr=[];
        this.setRelativeDate(this.watchDate);
        this.setData();
        this.renderShow(this.$ctPrev);
        this.renderDate(this.$ct);
    }
    Date1.prototype.setRelativeDate=function(watchDate){
        this.firstDate=this.getMonthFirstDate(watchDate);
        this.lastDate=this.getMonthLastDate(watchDate);
        this.preMonthDate=this.getPreMonth(watchDate);
        this.nextMonthDate=this.getNextMonth(watchDate);
    }
    Date1.prototype.bind=function(){
        var self=this;
        self.$ctPrev.on("click",".e-left",function(){
            self.watchDate=self.preMonthDate;
            self.setRelativeDate(self.watchDate);
            self.setData();
            self.renderShow(self.$ctPrev);
            self.renderDate(self.$ct);
        });
        self.$ctPrev.on("click",".e-right",function(){
            self.watchDate=self.nextMonthDate;
            self.setRelativeDate(self.watchDate);
            self.setData();
            self.renderShow(self.$ctPrev);
            self.renderDate(self.$ct);
        });
    }

    Date1.prototype.getMonthFirstDate=function(date){
        return new Date(date.getFullYear(),date.getMonth(),1);
    }
    Date1.prototype.getMonthLastDate=function(date){
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        if(month>11){
            month=0; year++;
        }
        var date1=new Date(year,month,1);
        var newDay=new Date(Date.parse(date1)-24*60*60*1000);
        return new Date(date.getFullYear(),date.getMonth(),newDay.getDate());
    }
    Date1.prototype.getPreMonth=function(date){
        var year=date.getFullYear();
        var month=date.getMonth()-1;
        if(month<0){
            month=11; year--;
        }
        return new Date(year,month,1);
    }
    Date1.prototype.getNextMonth=function(date){
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        if(month>11){
            month=0; year++;
        }
        return new Date(year,month,1);
    }
    Date1.prototype.setData=function(){
        this.dateArr=[];
        var day=this.firstDate.getDay();
        var lastDate=this.lastDate.getDate();
        var lastDay=this.lastDate.getDay();
        var year=this.firstDate.getFullYear();
        var month=this.firstDate.getMonth();
        var preMonthYear=this.preMonthDate.getFullYear();
        var preMonth=this.preMonthDate.getMonth();
        var nextMonthYear=this.nextMonthDate.getFullYear();
        var nextMonth=this.nextMonthDate.getMonth();

        if(this.current.getFullYear()===year && this.current.getMonth()===month){
            var nowMonth=true;
            var nowDate=this.current.getDate();
        }

        var preLastDay=this.getMonthLastDate(this.preMonthDate).getDate();
        for(var i=0;i<day;i++){
            var p=preLastDay-day+i+1;
            this.dateArr.push({type:"",date:p,fullDate:this.getYYMMDD(preMonthYear,preMonth,p)});
        }
        for(var i=0;i<lastDate;i++){
            this.dateArr.push({type:"cur-month",date:i+1,fullDate:this.getYYMMDD(year,month,i+1)});
            if(nowMonth){
                if(i+1===nowDate){
                    this.dateArr[i]["type"]+=" current";
                }
            }
        }
        for(var i=lastDay,j=1; i<6;i++,j++){
            this.dateArr.push({type:"",date:j,fullDate:this.getYYMMDD(nextMonthYear,nextMonth,j)});
        }
       // console.log(this.dateArr);
    }
    Date1.prototype.getYYMMDD=function(year,month,date){
        month++;
        return year+"/"+month+"/"+date;
    }
    Date1.prototype.renderShow=function($ctPre){
        var year=this.watchDate.getFullYear();
        var month=this.watchDate.getMonth()+1;
        var html="<p class='e-showDate'><i class='e-arrow e-left'><</i><span class='e-show'>"+year+"-"+month+"</span><i class='e-arrow e-right'>></i></p>";
        // console.log(html);
        $ctPre.html(html);
    }
    Date1.prototype.renderDate=function($ct){
        var html="<table class='e-table'><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
        for(var i=0;i<this.dateArr.length;i++){
            if(i==0){
                html+="<tr><td class='"+this.dateArr[i].type+"'>"+this.dateArr[i].date+"</td>";
            }
            else{
                html+="<td class='"+this.dateArr[i].type+"'>"+this.dateArr[i].date+"</td>";
                if(i%7==6){
                    html+="</tr><tr>";
                }
            }
        }
        html+='</tr>';
        html=html.slice(0,-9);
        // console.log(html);
        $ct.html(html);
    }
    return {
        init: function($ct){
            $ct.each(function(index,value){
                new Date1($(this),$(this).prev());
            })
        }
    }
})();