var DatePicker=(function(){
    var Date1=function($ct){
        this.init($ct);
        this.bind();
    }
    Date1.prototype.init=function($ct){
        this.$ct=$ct;
        this.current=new Date();
        this.watchDate=new Date();
        this.dateArr=[];
        this.firstDate=this.getMonthFirstDate(this.watchDate);
        this.lastDate=this.getMonthLastDate(this.watchDate);
        this.preMonthDate=this.getPreMonth(this.watchDate);
        this.nextMonthDate=this.getNextMonth(this.watchDate);
        this.setData();
        this.render();
    }
    Date1.prototype.bind=function(){


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
        var day=this.firstDate.getDay();
        var lastDate=this.lastDate.getDate();
        var lastDay=this.lastDate.getDay();
        var year=this.firstDate.getFullYear();
        var month=this.firstDate.getMonth();
        var preMonthYear=this.preMonthDate.getFullYear();
        var preMonth=this.preMonthDate.getMonth();
        var nextMonthYear=this.nextMonthDate.getFullYear();
        var nextMonth=this.nextMonthDate.getMonth();

        var preLastDay=this.getMonthLastDate(this.preMonthDate).getDate();
        for(var i=0;i<day;i++){
            var p=preLastDay-day+i+1;
            this.dateArr.push({type:"",date:p,fullDate:this.getYYMMDD(preMonthYear,preMonth,p)});
        }
        for(var i=0;i<lastDate;i++){
            this.dateArr.push({type:"cur-month",date:i+1,fullDate:this.getYYMMDD(year,month,i+1)});
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
    Date1.prototype.render=function(){
        var html="<table class='e-table'><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
        for(var i=0;i<this.dateArr.length;i++){
            if(i==0){
                html+="<tr><td class='"+this.dateArr[i].type+"'>"+this.dateArr[i].date+"</td>";
            }
            else{
                html+="<td class='"+this.dateArr[i].type+"'>"+this.dateArr[i].date+"</td>";
                if(i%6==0){
                    html+="</tr><tr>";
                }
            }
        }
        html+='</tr>';
         //console.log(html);
        this.$ct.append(html);
    }
    return {
        init: function($ct){
            $ct.each(function(index,value){
                new Date1($(this));
            })
        }
    }
})();