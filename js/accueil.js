var animate = true;
var animating = false;
var isSideNavOpen = false;
var date = new Date();

$(function(){
    $("#logo-header").on({mouseenter: function(){
        animate = true;
        if(!animating){
            logoAnim();
        }
    }, mouseleave: function(){
        animate = false;
    }});

    $("#menu-burger").on("click", function(){
        var endDate = new Date();
        if(endDate - date > 750){
            date = new Date();
            if(isSideNavOpen){
                closeSideNav();
                isSideNavOpen = false;
            }else{
                openSideNav()
                isSideNavOpen = true;
            }
        }
    })
});

function openSideNav(){
    $("#logo-header").addClass("translateLogoON").removeClass("translateLogoOFF");
    $("#sidenav").addClass("openSideNav").removeClass("closeSideNav");
}

function closeSideNav(){
    $("#logo-header").addClass("translateLogoOFF").removeClass("translateLogoON");
    $("#sidenav").addClass("closeSideNav").removeClass("openSideNav");
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