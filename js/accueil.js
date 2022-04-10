var animate = true;
var animating = false;
var isSideNavOpen = false;
const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
    })

    //Activer/désactiver mode nuit
    $("#darkMode, .darkMode").on("click", function(){
        var mode = $(this).attr("data-mode");
        $("#darkMode>div, .darkMode>div").toggleClass("dark");

        if(mode == "dark"){
            $("body").css("background-color", "black");  
            $("body>*:not(#sidenav, #header)").css({"fill": "white", "color": "white"});
            $("#darkMode, .darkMode").attr("data-mode", "light");
        }else{
            $("body").css("background-color", "white");  
            $("body>*:not(#sidenav, #header)").css({"fill": "black", "color": "black"});
            $("#darkMode, .darkMode").attr("data-mode", "dark");
        }
    })

    //Ferme la sidenav
    $("#sidenav").on("click", function(e){
        e.stopPropagation();
        sideNav();
    })

    //Ferma la sidenav
    $("html, body").on("click", function(){
        $("#logo-header").removeClass("translateLogoON");
        $("#sidenav").removeClass("openSideNav");
    })

    //Vérification du mail lors de l'input
    $("input").on("input", function(){
        var input = $(this).attr("name");
        var value = $(this).val();
        var regex = null;
        if(input == "mail"){
            regex = regexMail; 
        }

        if(!regex.test(value)){
            $(this).addClass("error").removeClass("valid");
        }else{
            $(this).removeClass("error").addClass("valid");
        }
    })

    //Validation du mail à l'envoi
    $("form").on("submit", function(event){
        event.preventDefault()
        var valid = true;
        $("input:not(.button)").each(function(){
            var input = $(this).attr("name");
            var value = $(this).val();
            var regex = null;
            if(input == "mail"){
                regex = regexMail;
            }

            if(!regex.test(value)){
                $(this).addClass("error").removeClass("valid");
                valid = false;
            }else{
                $(this).removeClass("error").addClass("valid");
            }
        })
        if(valid){
            $("#reponse").html("Envoyé !");
        }else{
            $("#reponse").html("Erreur !");
        }
        return false;
    })

    //Activer l'animation des nuages
    $("#clouds>div>img").each(function(index, element){
        $(this).css("animation", "animCloud1 " + (Math.random()*8+2) + "s linear infinite");
    })

    //Activation du plugin
    slidr.create('slidr-img', {
        breadcrumbs: false,
        controls: 'border',
        direction: 'horizontal',
        fade: false,
        keyboard: true,
        overflow: false,
        pause: false,
        theme: '#222',
        timing: { 'linear': '0.3s ease-in' },
        touch: true,
        transition: 'linear'
        }).start();
});

//Fonction qui permet d'ouvrir/fermer la sidenav
function sideNav(){
    $("#logo-header").toggleClass("translateLogoON");
    $("#sidenav").toggleClass("openSideNav")
}

//Fonction qui permet d'animer le logo
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