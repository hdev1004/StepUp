window.addEventListener('load', indexLoaded);
window.addEventListener('resize', indexResised);
var indexMouseClickFlag = false;

function indexLoaded() {
    boneContainer = document.getElementsByClassName("boneContainer")[0];
    bone = document.getElementsByClassName("bone")[0];
    boneCatch = document.getElementsByClassName("boneCatch")[0];
    line = document.getElementsByClassName("line")[0];
    
    indexResised();
    animated();
    console.log("loaded");
    
    boneCatch.onmouseover = function() {
        console.log("over");
        clearInterval(boneInter);
        $(".bone").stop();
        $(".boneCatch").stop();
        $(".line").stop();    


    }

    boneCatch.onmouseout = function() {
        console.log("out");
        clearInterval(boneInter);
        $(".bone").stop();
        $(".boneCatch").stop();
        $(".line").stop();    

        animated();
    }

    boneCatch.onmousedown = function() {
        indexMouseClickFlag = true;
    }
    $(document).mouseup(function() {
        indexMouseClickFlag = false;

        $(".bone").animate({
            left: '130'
        }, 700, "swing");
    
        $(".line").animate({
            left: '435'
        }, 700, "swing");
    
        $(".boneCatch").animate({
            left: '245'
        }, 700, "swing");

        
    })


    $(document).mousemove(function(e){

        if(indexMouseClickFlag) {
            //130
            clearInterval(boneInter);
            $(".bone").stop();
            $(".boneCatch").stop();
            $(".line").stop();    

            //115씩 더하면 됨
            bone.style.left = (e.pageX - window.innerWidth + 245) + "px";
            boneCatch.style.left = (e.pageX - window.innerWidth + 360) + "px";
            line.style.left = (e.pageX - window.innerWidth + 550) + "px";

        }
    })
    //115
}

function animated() {
    $(".bone").animate({
        left: '110'
    }, 300, "linear");

    $(".bone").animate({
        left: '130'
    }, 500, "swing");

    $(".line").animate({
        left: '415'
    }, 300, "linear");

    $(".line").animate({
        left: '435'
    }, 500, "linear");

    $(".boneCatch").animate({
        left: '225'
    }, 300, "swing");

    $(".boneCatch").animate({
        left: '245'
    }, 500, "swing");

    boneInter = setInterval(function() {
        $(".bone").animate({
            left: '110'
        }, 300, "linear");
    
        $(".bone").animate({
            left: '130'
        }, 500, "swing");
    
        $(".line").animate({
            left: '415'
        }, 300, "linear");

        $(".line").animate({
            left: '435'
        }, 500, "linear");
    
        $(".boneCatch").animate({
            left: '225'
        }, 300, "swing");

        $(".boneCatch").animate({
            left: '245'
        }, 500, "swing");
    }, 1200);
}



function indexResised() {
    var window_innerWidth = window.innerWidth;
    if(window_innerWidth > 1350) {
        boneContainer.style.left = (window_innerWidth - 510) + "px";
    }
}
