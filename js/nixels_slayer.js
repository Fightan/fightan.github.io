var animate = true;
var animating = false;
var isSideNavOpen = false;
var aCharacterIsChosen = false;

$(function(){
    //Enclenche l'animation du logo
    $("#logo-header").on({mouseenter: function(){
        animate = true;
        if(!animating){
            logoAnim();
        }
    }, mouseleave: function(){
        animate = false;
    }});

    //Ouvre la sidenav
    $("#menu-burger").on("click", function(e){
        e.stopPropagation();
        sideNav();
    });

    //Ferme la sidenav
    $("#sidenav").on("click", function(e){
        e.stopPropagation();
        sideNav();
    });

    //Ferme la sidenav
    $("html, body").on("click", function(){
        $("#logo-header").removeClass("translateLogoON");
        $("#sidenav").removeClass("openSideNav");
    });

    //Permet de choisir un persnnage
    $("#choose .col-md-6").on("click", function(){
        aCharacterIsChosen = true;
        var character = $(this).attr("id");
        $(this).addClass("chosen").removeClass("notChosen");

        $("#particlesJS").css("visibility", "visible");
        //On affiche les divs correspondant au personnage choisi
        if(character == "zenitsuBlock"){
            $("#tanjiroBlock").addClass("notChosen").removeClass("chosen");
            $("#tanjiroDescription, #mobileTanjiro").addClass("hideDesc").removeClass("showDesc");
            $("#zenitsuDescription, #mobileZenitsu").addClass("showDesc").removeClass("hideDesc");
            $('html, body').animate({
                scrollTop: $("#zenitsuDescription").offset().top
            }, 50);
            $("body").css("color", "yellow");
            $("#logo-header>svg").css("fill", "yellow");
            $("#header").css("border-bottom", "3px solid yellow");
            $("#gameplay video").attr("src", "style/videos/nixels_slayer/gameplay/zenitsu.mp4");
            $("#gameplay").css("background-image", "url(style/images/nixels_slayer/zenitsuDescription/zenitsuBackground.png)")
            particlesJS.load("particlesJS", "js/particles yellow.json", function(){})
        }else{
            $("#zenitsuBlock").addClass("notChosen").removeClass("chosen");
            $("#tanjiroDescription, #mobileTanjiro").addClass("showDesc").removeClass("hideDesc");
            $("#zenitsuDescription, #mobileZenitsu").addClass("hideDesc").removeClass("showDesc");
            $('html, body').animate({
                scrollTop: $("#tanjiroDescription").offset().top
            }, 50);
            $("body").css("color", "cyan");
            $("#logo-header>svg").css("fill", "cyan");
            $("#header").css("border-bottom", "3px solid cyan");
            $("#gameplay video").attr("src", "style/videos/nixels_slayer/gameplay/tanjiro.mp4");
            $("#gameplay").css("background-image", "url(style/images/nixels_slayer/zenitsuDescription/tanjiroBackground.png)")
            particlesJS.load("particlesJS", "js/particles blue.json", function(){})
        }
    });

    //Emp??che le d??filement si on a pas choisi de personnage
    $(window).on("scroll", function(){
        var position = $(this).scrollTop();
        if(position >= $("#choose").position().top && !aCharacterIsChosen){
            window.scrollTo({top: $("#choose").offset().top, behavior: "instant"})
        }
      
        if(position <= $("#choose").offset().top){
            aCharacterIsChosen = false;
            $("#particlesJS").css("visibility", "hidden");
        }
    })

    //Ouvre/ferme la sidenav
    function sideNav(){
        $("#logo-header").toggleClass("translateLogoON");
        $("#sidenav").toggleClass("openSideNav")
    }

    //Animation du logo
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