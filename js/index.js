window.addEventListener('load', indexLoaded);
window.addEventListener('resize', indexResised);

initialTouchPos = null;
rafPending = false;
indexBoneInter = null;
indexBoneMovePosX = 0;
indexBoneMovePosY = 0;
var EndanimateInter;

var indexMouseClickFlag = false;


function indexLoaded() {
    boneContainer = document.getElementsByClassName("boneContainer")[0];
    bone = document.getElementsByClassName("bone")[0];
    boneCatch = document.getElementsByClassName("boneCatch")[0];
    line = document.getElementsByClassName("line")[0];
    slide = document.getElementsByClassName("slide")[0];
    AnimatedImg();
    
    indexResised();
    console.log("loaded");



    
    // Handle the start of gestures
    this.handleGestureStart = function(evt) {
    
    evt.preventDefault();

    if(evt.touches && evt.touches.length > 1) {
        return;
    }

    // Add the move and end listeners
    if (window.PointerEvent) {
        evt.target.setPointerCapture(evt.pointerId);
    } else {
        // Add Mouse Listeners
        document.addEventListener('mousemove', this.handleGestureMove, true);
        document.addEventListener('mouseup', this.handleGestureEnd, true);
    }

    initialTouchPos = getGesturePointFromEvent(evt);
    indexAnimatedStart();
    console.log("start");
    //swipeFrontElement.style.transition = 'initial'; // 움직임
    }.bind(this);


    this.handleGestureMove = function (evt) {
        evt.preventDefault();
        
        if(!initialTouchPos) {
            return;
        }
        
        lastTouchPos = getGesturePointFromEvent(evt);
        indexBoneMovePosX = lastTouchPos.x;
        indexBoneMovePosY = lastTouchPos.y;

        if(rafPending) {
            return;
        }
        rafPending = true;
        onAnimFrame();
        
    }.bind(this);




    this.handleGestureEnd = function(evt) {
        evt.preventDefault();
      
        if(evt.touches && evt.touches.length > 0) {
          return;
        }
      
        rafPending = false;
      
        // Remove Event Listeners
        if (window.PointerEvent) {
          evt.target.releasePointerCapture(evt.pointerId);
        } else {
          // Remove Mouse Listeners
          document.removeEventListener('mousemove', this.handleGestureMove, true);
          document.removeEventListener('mouseup', this.handleGestureEnd, true);
        }
        indexAnimatedEnd();
        //updateSwipeRestPosition(); 움직임
        clearInterval(indexBoneInter);
        

        initialTouchPos = null;
      }.bind(this);


      function getGesturePointFromEvent(evt) {
        var point = {};
    
        if(evt.targetTouches) {
          // Prefer Touch Events
          point.x = evt.targetTouches[0].clientX;
          point.y = evt.targetTouches[0].clientY;
        } else {
          // Either Mouse event or Pointer Event
          point.x = evt.clientX;
          point.y = evt.clientY;
        }
    
        return point;
      }



    if (window.PointerEvent) {
    // Add Pointer Event Listener
        boneCatch.addEventListener('pointerdown', this.handleGestureStart, true);
        boneCatch.addEventListener('pointermove', this.handleGestureMove, true);
        boneCatch.addEventListener('pointerup', this.handleGestureEnd, true);
        boneCatch.addEventListener('pointercancel', this.handleGestureEnd, true);
    } else {
        // Add Touch Listener
        boneCatch.addEventListener('touchstart', this.handleGestureStart, true);
        boneCatch.addEventListener('touchmove', this.handleGestureMove, true);
        boneCatch.addEventListener('touchend', this.handleGestureEnd, true);
        boneCatch.addEventListener('touchcancel', this.handleGestureEnd, true);

        // Add Mouse Listener
        boneCatch.addEventListener('mousedown', this.handleGestureStart, true);
    }

    function onAnimFrame() {
        indexBoneInter = setInterval(() => {
            boneContainer.style.left = (indexBoneMovePosX - 380) + "px";
        }, 10);
    }
}

function AnimatedImg() {
  var height = 180;
  var width = 298;
  var widthIndex = 2;
  var heightIndex = 0;
  var dogImg = document.getElementsByClassName("dogImg")[0];
  dogImg.style.width = width + "px";
  dogImg.style.height = height + "px";
  var walkWidthAnimated = [0, 1, 2, 3];
  var walkHeightAniamted = [0, 1];

  nowHeight = walkHeightAniamted[heightIndex] * height * -1;
  nowWidth = walkWidthAnimated[widthIndex] * width * -1;
  dogImg.style.background = "url('images/dog_resize.png') " + nowWidth + "px " + nowHeight + "px";
  //이미지 움직이는 속도 조절
  animatedInterval = setInterval(function() {
    var window_innerWidth = window.innerWidth;
    widthIndex += 1;
    nowHeight = walkHeightAniamted[heightIndex] * height * -1;
    nowWidth = walkWidthAnimated[widthIndex] * width * -1;
    
    dogImgLeft = parseInt((dogImg.style.left).split("px")[0]);
    if(dogImgLeft < window_innerWidth / 2 - 300) {
      $(dogImg).animate({
        "left" : (dogImgLeft + 10)
      }, 80, "swing");
  
      dogImg.style.background = "url('images/dog_resize.png') " + nowWidth + "px " + nowHeight + "px";
  
  
      if(widthIndex == walkWidthAnimated.length - 1) {
        heightIndex = heightIndex == 0 ? 1 : 0;
        widthIndex = -1;
      }
    } else {

    }
    
  }, 100);
}

function indexResised() {
    var window_innerWidth = window.innerWidth;
    if(window_innerWidth > 1350) {
        boneContainer.style.left = (window_innerWidth - 510) + "px";
    }
    slide.style.left = "100%";
}


function indexAnimatedStart() {
  $(boneContainer).animate().stop();
  clearInterval(EndanimateInter);
}

function indexAnimatedEnd() {
  var window_innerWidth = window.innerWidth;
  $(boneContainer).animate({
    "left" : (window_innerWidth - 510)
  }, 1000, "swing");

  setTimeout(function() {
    EndanimateInter = setInterval(function() {
      var window_innerWidth = window.innerWidth;
      $(boneContainer).animate({
        "left":(window_innerWidth - 550)
      }, 400);

      setTimeout(() => {
        $(boneContainer).animate({
          "left":(window_innerWidth - 510)
        }, 400);
      }, 300);

      boneContainer.style.left = (window_innerWidth - 510) + "px";
    }, 2000);
  }, 500);
}
