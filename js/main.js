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

    Test.call(init);
    //Build.call(init);
    //View.call(init);
    //EventCollect.call(init);
    console.log("through this code");
});

function Test(){
    var mine = renew(this);
   
    Test.prototype.test.call(mine);
}
Test.prototype = {
       test:function(){
            console.log("method");
       }
};

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
}
EventCollect.prototype = {
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
