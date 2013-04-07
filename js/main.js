/* ver 0.2
 *`init` is this design initialize
 *`mine` is class variable
 *`$.Me` is public and this variable is jQuery Object add
 * 
 *Help debug Branch!
 */

jQuery(function($) {
    if (typeof window.console === "undefined") { window.console = {} } 
    if (typeof window.console.log !== "function") { window.console.log = function () {}}
    var init = {};
    $.Me = init;
    init.createDom = document.createDocumentFragment();

    //Build.call(init);
    //View.call(init);
    EventCollect.call(init);
    console.log("through this code");
});

function Build(){
    console.log("call Build");
}
Build.prototype = {
};

function View(){
    console.log("call View");
}
View.prototype = {
};

function EventCollect(){
    console.log("call EventCollect");
    var mine = renew(this);
    mine.$window = $(window);
    mine.$target= $('.target');
    mine.overlayTargetName = 'div.overlayTarget';    
    mine.$overlayTarget;
    mine.$nowMain;
    mine.mainWidth;
    mine.mainHeight;
    mine.mainTop;
    mine.padding = {x:30,y:0};

    EventCollect.prototype.clickH1.call(mine);
    EventCollect.prototype.resizeWin.call(mine);
}
EventCollect.prototype = {
        clickH1:function(){
            var mine = this;          
    
            mine.$target.on('click',function(){
                mine.$overlayTarget = $(this).next(mine.overlayTargetName);
                mine.$overlayMain   = mine.$overlayTarget.next('div.overlayMain');
                var  $overlayHeader = mine.$overlayMain.find('div.overlayHeader'),
                     $overlayFooter = mine.$overlayMain.find('div.overlayFooter');

                var winSize  = { x:mine.$window.width(), y:mine.$window.height()};
                
                mine.$overlayTarget.show().css({'width':winSize.x,'height':winSize.y});
                mine.$overlayMain.show();

                var $img = mine.$overlayMain.find('img');

                var headerSize = { x:$overlayHeader.width(), y:$overlayHeader.height() };
                var footerSize = { x:$overlayFooter.width(), y:$overlayFooter.height() };
                var imgSize    = { x:$img.width(), y:$img.height() };
                
                mine.mainHeight = headerSize.y + footerSize.y + imgSize.y;
              
                mine.mainTop    = maxTop( (winSize.y - mine.mainHeight ) / 2 - mine.padding.y );
                mine.mainWidth  = maxWidth( headerSize.x , imgSize.x , winSize.x);
                mine.mainWidth  = maxWidth( footerSize.x , mine.mainWidth , winSize.x);
               
                mine.$overlayMain.css({ 
                        'width' :mine.padding.x  * 2 + mine.mainWidth,
                        'height':mine.padding.y * 2 + mine.mainHeight,
                        'top'   :mine.mainTop, 
                        'left'  :( winSize.x - mine.mainWidth  ) / 2 - mine.padding.x
                });

                EventCollect.prototype.hideOverlay.call(mine);

                function maxWidth(target,subject,window){
                    var max;
                    if(target >= subject){
                        if(target !== window){
                            max = target;
                        }else{
                            max = subject
                        }   
                    }else if(target <= subject){
                        max = subject;
                    }
                    return max;
                }
           });
        },
        resizeWin:function(){
            var mine = this;
            var timer = false;
            mine.$window.resize(function(){
                if (timer !== false) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    mine.$overlayMain.animate({
                        'top' :maxTop( (mine.$window.height() - mine.mainHeight ) / 2 - mine.padding.y ),
                        'left':( mine.$window.width()  - mine.mainWidth)  / 2 - mine.padding.x 
                    });
                   // mine.$overlayMain.css({ 'left':( mine.$window.width() - mine.mainWidth) / 2 - mine.padding.x });
                }, 200);
    
                $(mine.overlayTargetName).filter(':visible').css({'width':mine.$window.width(),'height':mine.$window.height()});
            });
        },
        hideOverlay:function(){
            var mine = this;
            mine.$overlayTarget.on('click',function(e){
                    mine.$overlayMain.hide();
                    $(this).hide();
            });
        }
};

/* utility */
function renew(obj) { 
    if (obj == null || typeof obj != "object") return obj; 
    var copy = obj.constructor(); 
    for (var attr in obj) { 
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]; 
    } 
    return copy; 
} 
function maxTop(target){
    var max;
    if(target < 0){
        max = 0;
    }else{
        max = target;
    }
    return max;
}

