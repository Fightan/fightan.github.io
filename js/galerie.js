var animate = true;
var animating = false;
var isSideNavOpen = false;

var canvas;
var ctx;
var width = 0;
var height = 0;
var animating = false;
var pixels = [];
var globalId;
var arraySize = 50;
var lines = 0;
var ainmating = false;
var finished = true;
var stop = 0;

var startTime = 0;
var endTime = 0;

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

    //Ferme la sidenav
    $("#sidenav").on("click", function(e){
        e.stopPropagation();
        sideNav();
    });

    //Appelle galerie.json pour afficher les images
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

    //Ajoute les images dans la galerie
    function generatePhotos(data){
        $(data).each(function(index, value){
            $("#galerie .row").append("<div class='col-md-6'><img src='"+value.src+"' alt='"+value.alt+"'></div>");
        });
    };

    //Ouvre la sidenav
    function sideNav(){
        $("#logo-header").toggleClass("translateLogoON");
        $("#sidenav").toggleClass("openSideNav")
        $("#logo-svg").toggleClass("white");
    }

    //Ferme la sidenav
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

    //Partie animation de l'arrière plan

    //Initialisation du canvas
    canvas = $("#particles-js").get(0);
    ctx = canvas.getContext("2d");
    
    //Initialisation de la taille du canvas
    width = $(window).width()+1;
    height = $(window).height();
    arraySize = parseInt(width/arraySize);
    canvas.width = width;
    canvas.height = height; 

    pixels = initArray()
    var test = 0;
    pixels = initArray();

    //Dessine les pixels
    requestAnimationFrame(animate)

    //Fonction qui permet d'initialiser l'array
    function initArray(){
        var columns = arraySize;
        var column = Math.floor(width/arraySize);
        lines = parseInt(height/column)+1;
        stop = 0;
        var line = Math.floor(height/column);
        var pixelSize = column;
        var currentSize = 0;

        for(l = 0; l < lines; l++){
            for(c = 0; c < columns; c++){
                pixels.push([]);
                pixels[l].push({currentX: c*column+pixelSize/2 - currentSize/2, currentY: l*column+pixelSize/2 - currentSize/2, xStart: c*column, yStart: l*line, currentSize: currentSize, speed: 4, finished: false})
            }
        }
        return pixels;
    }

    //Fonction qui permet de dessiner les pixels
    function animate(){
        animating = true;
        finished = false;
        var count = 0;
        //Dessine ligne par ligne vers le haut les pixels et les pixels se dessinent en décalage avec settimeout
        if(pixels[lines] != undefined){
            pixels[lines].forEach(function(pixel){
                if(pixel.currentX >= pixel.xStart && !finished){
                    pixel.currentX -= pixel.speed;
                    pixel.currentY -= pixel.speed;
                    pixel.currentSize += pixel.speed*2
                    setTimeout(function(){
                        ctx.fillRect(pixel.currentX, pixel.currentY, pixel.currentSize, pixel.currentSize);
                    }, Math.floor(Math.random()*500));
                    count++;
                }else{
                    pixel.finished = true;
                }
            });
        }
        if(count == 0){
            lines--;
        }
        globalId = requestAnimationFrame(animate)
        if(lines < 0){
            cancelAnimationFrame(globalId);
            animating = false;
        }
    }
})