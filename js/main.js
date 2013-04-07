jQuery(function($) {
    if (typeof window.console === "undefined") { window.console = {} } 
    if (typeof window.console.log !== "function") { window.console.log = function () {}}
    $.Me = {};
    $.Me.createDom = document.createDocumentFragment();
 
    Overlay.call(new AbstractOverlay);
    console.log("through this code");
});

function AbstractOverlay(){
    this.$window = $(window);
    this.$target= $('.target');
 
    this.$overlayBg    = $('#overlayBg');
    this.$overlayClose = $('#overlayClose');
    this.overlayMain   = '.overlayMain';
    this.overlayHeader = 'div.overlayHeader';
    this.overlayFooter = 'div.overlayFooter';
    this.$overlayCloseImg = $('#overlayClose').find('img');
    this.overlayCloseSize = { x:this.$overlayCloseImg.width(), y:this.$overlayCloseImg.height() };
    this.$nowMain;
    this.mainWidth;
    this.mainHeight;
    this.mainTop;
}

AbstractOverlay.prototype.maxWidth = function(target,subject,window){
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

AbstractOverlay.prototype.maxTop = function(target){
    var max;
    if(target < 0){
        max = 0;
    }else{
        max = target;
    }
    return max;
}

function Overlay(){
    if(!$('body.Overlay').length){ return; }

    Overlay.prototype.targetClick.call(this);
    Overlay.prototype.hideOverlay.call(this);
    Overlay.prototype.resizeWin.call(this);
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
              
                mine.mainTop    = mine.maxTop( (winSize.y - mine.mainHeight ) / 2);
                mine.mainWidth  = mine.maxWidth( headerSize.x , imgSize.x , winSize.x);
                mine.mainWidth  = mine.maxWidth( footerSize.x , mine.mainWidth , winSize.x);
               
                mine.$overlayMain.css({ 
                        'width' :mine.mainWidth,
                        'height':mine.mainHeight,
                        'top'   :mine.mainTop, 
                        'left'  :( winSize.x - mine.mainWidth  ) / 2
                });

                mine.$overlayClose.show().css({
                        'top'   :mine.maxTop( (winSize.y - mine.mainHeight ) / 2),
                        'right' :( winSize.x - mine.mainWidth  ) / 2
                });

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
                        'top' :mine.maxTop( (mine.$window.height() - mine.mainHeight ) / 2),
                        'left':( mine.$window.width()  - mine.mainWidth)  / 2
                    });

                    mine.$overlayClose.fadeIn(800).css({
                        'top'   :mine.maxTop( ( mine.$window.height() - mine.mainHeight ) / 2 ),
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
        }
};

/* utility */
function renew(obj) { 
    if (obj == null || typeof obj != "object") return obj; 
    var copy = obj.constructor(); 
    for (var attr in obj) { 
        if (obj.hasOwnProperty(attr))copy[attr] = obj[attr]; 
    }
    return copy; 
} 
