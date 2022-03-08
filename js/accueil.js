var animate = true;
var animating = false;
$(function(){
    $("#logo-header").on({mouseenter: function(){
        animate = true;
        if(!animating){
            logoAnim();
        }
    }, mouseleave: function(){
        animate = false;
    }});
    
});

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