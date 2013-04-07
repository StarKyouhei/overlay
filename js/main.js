jQuery(function($) {
    if (typeof window.console === "undefined") { window.console = {} } 
    if (typeof window.console.log !== "function") { window.console.log = function () {}}
    var init = {};
    $.Me = init;
    init.createDom = document.createDocumentFragment();
 
    Overlay.call(init);
    console.log("through this code");
});

function Overlay(){
    if(!$('body.Overlay').length){ return; }

    var mine = renew(this);

    mine.$window = $(window);
    mine.$target= $('.target');
 
    mine.$overlayBg    = $('#overlayBg');
    mine.$overlayClose = $('#overlayClose');
    mine.overlayMain   = '.overlayMain';
    mine.overlayHeader = 'div.overlayHeader';
    mine.overlayFooter = 'div.overlayFooter';
    mine.$overlayCloseImg = $('#overlayClose').find('img');
    mine.overlayCloseSize = {x:mine.$overlayCloseImg.width(),y:mine.$overlayCloseImg.height()};
    mine.$nowMain;
    mine.mainWidth;
    mine.mainHeight;
    mine.mainTop;

    Overlay.prototype.targetClick.call(mine);
    Overlay.prototype.hideOverlay.call(mine);
    Overlay.prototype.resizeWin.call(mine);
}
Overlay.prototype = {
        targetClick:function(){
            var mine = this;          
    
            mine.$target.on('click',function(e){
                e.preventDefault();  
                mine.$overlayMain   = $(this).next(mine.overlayMain);
  
                var  $overlayHeader = mine.$overlayMain.find(mine.overlayHeader),
                     $overlayFooter = mine.$overlayMain.find(mine.overlayFooter);

                var winSize  = { x:mine.$window.width(), y:mine.$window.height()};
                
                mine.$overlayBg.show().css({'width':winSize.x,'height':winSize.y});
                mine.$overlayMain.fadeIn();

                var $img = mine.$overlayMain.find('img');

                var headerSize = { x:$overlayHeader.width(), y:$overlayHeader.height() };
                var footerSize = { x:$overlayFooter.width(), y:$overlayFooter.height() };
                var imgSize    = { x:$img.width(), y:$img.height() };
                
                mine.mainHeight = headerSize.y + footerSize.y + imgSize.y;
              
                mine.mainTop    = Overlay.prototype.maxTop( (winSize.y - mine.mainHeight ) / 2);
                mine.mainWidth  = maxWidth( headerSize.x , imgSize.x , winSize.x);
                mine.mainWidth  = maxWidth( footerSize.x , mine.mainWidth , winSize.x);
               
                mine.$overlayMain.css({ 
                        'width' :mine.mainWidth,
                        'height':mine.mainHeight,
                        'top'   :mine.mainTop, 
                        'left'  :( winSize.x - mine.mainWidth  ) / 2
                });

                mine.$overlayClose.show().css({
                        'top'   :Overlay.prototype.maxTop( (winSize.y - mine.mainHeight ) / 2),
                        'right' :( winSize.x - mine.mainWidth  ) / 2
                });

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
                mine.$overlayClose.hide();
                if (timer !== false) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    if(mine.$overlayBg.css('display') === 'none'){return;}

                    mine.$overlayMain.animate({
                        'top' :Overlay.prototype.maxTop( (mine.$window.height() - mine.mainHeight ) / 2),
                        'left':( mine.$window.width()  - mine.mainWidth)  / 2
                    });

                    mine.$overlayClose.fadeIn(800).css({
                        'top'   :Overlay.prototype.maxTop( ( mine.$window.height() - mine.mainHeight ) / 2 ),
                        'right' :( mine.$window.width() - mine.mainWidth  ) / 2
                    });
                
                }, 200);

                mine.$overlayBg.css({'width':mine.$window.width(),'height':mine.$window.height()});
            });
        },
        hideOverlay:function(){
            var mine = this;
            mine.$overlayBg.on('click',function(e){
                e.preventDefault();
                mine.$overlayMain.hide();
                mine.$overlayBg.hide();
                mine.$overlayClose.hide();
            });
            mine.$overlayClose.on('click',function(e){
                e.preventDefault();
                mine.$overlayMain.hide();
                mine.$overlayBg.hide();
                mine.$overlayClose.hide();
            });
        },
        maxTop:function(target){
            var max;
            if(target < 0){
                 max = 0;
            }else{
                max = target;
            }
            return max;
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










