var animate = true;
var animating = false;
var isSideNavOpen = false;
var scrollPosition = 0;
const API_KEY = "c0d102547d239cfdc183e2c191e2e419";

$(function(){
    $("#logo-header").on({mouseenter: function(){
        animate = true;
        if(!animating){
            logoAnim();
        }
    }, mouseleave: function(){
        animate = false;
    }});

    $("#menu-burger").on("click", function(e){
        e.stopPropagation();
        sideNav();
    })

    $("#sidenav").on("click", function(e){
        e.stopPropagation();
        sideNav();
    });

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos);
    }else {
        console.log("Non géolocalisé");
    }

    $(window).bind("mousewheel DOMMouseScroll", function(event){
        var delta = -Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));
        
        if(!(scrollPosition == 0 && delta == -1) && !(scrollPosition <= -5*$(window).innerWidth() && delta == 1)){
            scrollPosition -= (delta *100);
        }
        
        $("#main").css("left", scrollPosition);

        if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        }else{

        }

    });

    function pos(position) { 
        var infopos = new Array();
        infopos.latitude = position.coords.latitude;
        infopos.longitude = position.coords.longitude;
        infopos.altitude = position.coords.altitude;
        var URL = "https://api.openweathermap.org/data/2.5/weather?lat="+infopos.latitude+"&lon="+infopos.longitude+"&appid="+API_KEY;
        $.ajax({
            type : "post",
            url : URL, 
            async : "false",
            dataType : "json",
            success : function(data){
                adaptBackground(data.weather[0].main)
            },
            error : function(error){
            console.log(error)
            }
        })
    }

    function adaptBackground(weather){
        if(weather == "scattered clouds" || weather == "broken clouds"){
            $("#background").attr("src", "style/images/super_nixels/background/background-clouds.png");
            $("body, html").css("color", "white");
        }else if(weather == "shower rain" || weather == "rain" || weather == "thunderstorm"){
            $("#background").attr("src", "style/images/super_nixels/background/background-rain.png");
            $("body, html").css("color", "white");
        }else if(weather == "snow"){
            $("#background").attr("src", "style/images/super_nixels/background/background-snow.png");
            $("body, html").css("color", "black");
        }else if(weather == "mist"){
            $("#background").attr("src", "style/images/super_nixels/background/background-mist.png");
            $("body, html").css("color", "black");
        }else{
            $("#background").attr("src", "style/images/super_nixels/background/background-clear.png");
            $("body, html").css("color", "black");
        }
    }

    function sideNav(){
        $("#logo-header").toggleClass("translateLogoON");
        $("#sidenav").toggleClass("openSideNav")
        $("#logo-svg").toggleClass("white");
    }

    function logoAnim(){
        animating = true;
        var time = 100;
        $(".cls-1").each(function(){
            var element = $(this);
            setTimeout(function(){
                element.attr("class", "cls-1 animLogo")
            }, time);   
            time = time + 100;
        });
        setTimeout(function(){
            $(".cls-1").attr("class", "cls-1 animOff");
            if(animate){
                logoAnim();
            }else{
                animating = false;
            }
        }, 1100);
    }
});

