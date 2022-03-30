var animate = true;
var animating = false;
var isSideNavOpen = false;
var aCharacterIsChosen = false;

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
    });

    $("#sidenav").on("click", function(e){
        e.stopPropagation();
        sideNav();
    });

    $("html, body").on("click", function(){
        $("#logo-header").removeClass("translateLogoON");
        $("#sidenav").removeClass("openSideNav");
    });

    $("#choose .col-md-6").on("click", function(){
        aCharacterIsChosen = true;
        var character = $(this).attr("id");
        $(this).addClass("chosen").removeClass("notChosen");

        if(character == "zenitsuBlock"){
            $("#tanjiroBlock").addClass("notChosen").removeClass("chosen");
            $("#tanjiroDescription").addClass("hideDesc").removeClass("showDesc");
            $("#zenitsuDescription").addClass("showDescu").removeClass("hideDesc");
            $('html, body').animate({
                scrollTop: $("#zenitsuDescription").offset().top
            }, 50);
        }else{
            $("#zenitsuBlock").addClass("notChosen").removeClass("chosen");
            $("#tanjiroDescription").addClass("showDesc").removeClass("hideDesc");
            $("#zenitsuDescription").addClass("hideDesc").removeClass("showDesc");
            $('html, body').animate({
                scrollTop: $("#tanjiroDescription").offset().top
            }, 50);

        }
    });

    function sideNav(){
        $("#logo-header").toggleClass("translateLogoON");
        $("#sidenav").toggleClass("openSideNav")
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

    $(window).on("scroll", function(){
        var position = $(this).scrollTop();
        if(position >= $("#choose").position().top && !aCharacterIsChosen){
            $("#choose").get(0).scrollIntoView();
        }
    })

    // particlesJS.load("particlesJS", "js/particles yellow.json", function(){})
});