$(function(){
    var mode = 0;//App mode
    var timeCounter = 0;//time counter
    var lapCounter = 0;//lap counter
    var action;//variable for setInterval
    var lapNumber = 0;//Number of Laps
        
        //minutes,seconds,centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    hideshowButtons("#startButton", "#lapButton");
    
    $("#startButton").click(function(){
        mode = 1;
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });
    
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideshowButtons("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);
    });
    
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideshowButtons("#stopButton","#lapButton");
        //start counter
        startAction();
    });
    
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        location.reload();
    });
    
    $("#lapButton").click(function(){
        //if mode is ON
        if(mode){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    });
    
    
    function hideshowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10);
    }
    
    function updateTime(){
        timeMinutes = Math.floor(timeCounter/6000);      
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeCentiseconds = (timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec=100centiseconds
        lapSeconds = Math.floor((lapCounter%6000)/100);
        lapCentiseconds = (lapCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    }
    
    function format(number){
        if(number<10){
            return '0'+number;   
        }else{
            return number;   
        }
    }
    
    function addLap(){
        lapNumber++;
           var myLapDetails =
               '<div class="lap">'+
                    '<div class="laptimetitle">'+
                        'Lap'+ lapNumber +
                    '</div>'+
                    '<div class="laptime">'+
                        '<span>'+ format(lapMinutes) +'</span>'+
                        ':<span>'+ format(lapSeconds) +'</span>'+
                        ':<span>'+ format(lapCentiseconds) +'</span>'+
                    '</div>'+
               '</div>';
        $(myLapDetails).prependTo("#laps");
    }
    
});