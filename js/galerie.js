var animate = true;
var animating = false;
var isSideNavOpen = false;

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

    $.ajax({
        url: "galerie.json",
        type: "get",
        async: "false",
        success: function(data){
            generatePhotos(data);
        },
        error: function(error){
            console.log(error);
        }
    })

    function generatePhotos(data){
        $(data).each(function(index, value){
            $("#galerie .row").append("<div class='col-md-4'><img src='"+value.src+"' alt='"+value.alt+"'></div>");
        });
    };

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
})