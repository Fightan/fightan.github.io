var animate = true;
var animating = false;
var isSideNavOpen = false;
const regexNom = /^[a-zA-Zéèêëàâîïôûç\- ]+$/;
const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexMessage = /^[a-zA-Z0-9éèêëàâîïôûç\- ]{5,200}$/;

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

    $("input, textarea").on("input", function(){
        var input = $(this).attr("name");
        var value = $(this).val();
        var regex = null;
        if(input == "nom"){
            regex = regexNom;
        }else if(input == "mail"){
            regex = regexMail; 
        }else if(input == "message"){
            regex = regexMessage;
        }

        if(!regex.test(value)){
            $(this).addClass("error").removeClass("valid");
        }else{
            $(this).removeClass("error").addClass("valid");
        }
    })

    $("form").on("submit", function(event){
        event.preventDefault()
        var valid = true;
        $("input:not(.button), textarea").each(function(){
            var input = $(this).attr("name");
            var value = $(this).val();
            var regex = null;
            if(input == "nom"){
                regex = regexNom;
            }else if(input == "mail"){
                regex = regexMail; 
            }else if(input == "message"){
                regex = regexMessage;
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
})