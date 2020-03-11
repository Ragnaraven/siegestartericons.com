/*
	global $
	global frameAnimHelper
*/

var button;
var canvas;
var ctx;

var thermite;

var FX = {};
var lastUpdate;
var mouseUpdate;
var lastMouse;
var fullscreenWidth, fullscreenHeight;

window.onload = function ()
{
    button = document.getElementById('get-started');
    canvas = document.getElementById('canvas');
    thermite = document.getElementById('thermite');
    
    ctx = canvas.getContext('2d');
    
    button.onclick = onGetStartedClick;

    lastUpdate = new Date();
    mouseUpdate = new Date();
    lastMouse = [];
    FX.particles = [];

    setFullscreen();

    loop();

    window.addEventListener('resize', setFullscreen);
}

function onGetStartedClick () 
{
    /*alert(JSON.stringify({
      isAndroid: /Android/.test(navigator.userAgent),
      isCordova: !!window.cordova,
      isEdge: /Edge/.test(navigator.userAgent),
      isFirefox: /Firefox/.test(navigator.userAgent),
      isChrome: /Google Inc/.test(navigator.vendor),
      isChromeIOS: /CriOS/.test(navigator.userAgent),
      isChromiumBased: !!window.chrome && !/Edge/.test(navigator.userAgent),
      isIE: /Trident/.test(navigator.userAgent),
      isIOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
      isOpera: /OPR/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isTouchScreen: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
      isWebComponentsSupported: 'registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')
    }, null, '  '));*/
    
    if(
        /Google Inc/.test(navigator.vendor) || //Chrome
        !!window.chrome && !/Edge/.test(navigator.userAgent) || //Chromium
        /OPR/.test(navigator.userAgent) || //Opera
        /Trident/.test(navigator.userAgent) || //IE
        /Edge/.test(navigator.userAgent) || //Edge
        /Firefox/.test(navigator.userAgent)
        )
    {
        //DO NOTHING
    }
    else //SKIP NOW
    {
        redirectToBuilder();
    }
    
    /**WORKS ON 
     * CHROME PC, CHROMIUM BASED, OPERA, IE
     * 
     * DEFINITELY FAILS ON
     * Firefox
     * 
     * */
        
    
    
    
    var button = $("#get-started");
    var bgText = $("#background-text");
    
    var leftPos   = button[0].getBoundingClientRect().left   + $(window).scrollLeft();
    var rightPos  = button[0].getBoundingClientRect().right  + $(window).scrollLeft();
    var topPos    = button[0].getBoundingClientRect().top    + $(window).scrollTop();
    var bottomPos = button[0].getBoundingClientRect().bottom + $(window).scrollTop();
    
    var BUTTON_HEIGHT = bottomPos - topPos;
    var BUTTON_WIDTH = rightPos - leftPos;
    
    //top, left, width, height
    //full image is 1000 1920
    //roll is pixels 
    //TL 145 1195
    //BR 870 1460
    //roll H: 265 W: 725
    
    var ROLL_LEFT = 136;
    var ROLL_TOP = 1187;
    var ROLL_RIGHT = 862;
    var ROLL_BOTTOM = 1453;
    
    var IMAGE_WIDTH = 1000;
    var IMAGE_HEIGHT = 1920;
    
    var ROLL_WIDTH = ROLL_RIGHT - ROLL_LEFT;
    var ROLL_HEIGHT = ROLL_BOTTOM - ROLL_TOP;
     
    var imgScale = BUTTON_WIDTH / ROLL_WIDTH; 
    
    var imgWidth = IMAGE_WIDTH * imgScale;
    var imgHeight = IMAGE_HEIGHT * imgScale; //FULL IMAGE
                        
                   //ORIGINAL POS + CALC OFFSET     
    var rollLeft = leftPos - ROLL_LEFT * imgScale;
    var rollTop = topPos - ROLL_TOP * imgScale;
    
    bgText.fadeOut(250, function()
    {
        $("#skipAnim").css("display", "block");
        document.getElementById("skipAnim").onclick = redirectToBuilder;
        
        var domthermite = document.createElement("img");
        domthermite.id = "thermite";
        domthermite.src = "images/home/thermite.gif";
        
        document.body.appendChild(domthermite);
        
        var thermite = $("#thermite");
        thermite.css("width", imgWidth);
        thermite.css("height", imgHeight);
        thermite.css("top", rollTop);
        thermite.css("left", rollLeft);
        
        setTimeout(function ()
        {
            startSparksAnim(domthermite, imgScale, rollLeft, rollTop);
        }, 2250);
    });
}

function startSparksAnim (thermite, imgScale, left, top)
{
    var rectTop = new BurnRect(left + 219 * imgScale, top + 353  * imgScale, 554 * imgScale, 27  * imgScale, 4, 0, function() 
    {
       var rectRight = new BurnRect(left + 800 * imgScale, top + 412  * imgScale, 32  * imgScale, 825 * imgScale, 0, 1);
       var rectLeft  = new BurnRect(left + 167 * imgScale, top + 412  * imgScale, 32  * imgScale, 825 * imgScale, 0, 1, function() 
       {
           var rectBottom = new BurnRect(left + 219 * imgScale, top + 1290 * imgScale, 554 * imgScale, 27  * imgScale, 5, 0, function()
           {
               //Delay for anim for smothness
               setTimeout(function()
               {
                   rattle();
                   circle();
               }, 1500);
           });
       });
    });
}
class BurnRect
{
    /*    style
    0 top
    1 left ///NOT IMPLENETED
    2 right ///NOT IMPLENETED
    3 bottom ///NOT IMPLENETED
    4 center
    5 ends 
    
    orientation
    0 = hotizontal
    1 = vertical
    */
                                                    //  DIVISIONS MUST BE EVEN
    constructor(left, top, width, height, style, orientation, onComplete, divisions = 16, amount = 5, repeat = 250, totalBurnTime = 2250, sectionBurnTime = 500, spawnOn = true)
    {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.style = style;
        this.orientation = orientation;
        this.divisions = divisions;
        this.amount = amount;
        this.repeat = repeat;
        this.totalBurnTime = totalBurnTime;
        this.sectionBurnTime = sectionBurnTime;
        this.spawnOn = spawnOn;
        
        var divisionPixelWidth, divisionPixelHeight;
        
        if(orientation == 0)
        {
            divisionPixelWidth = width / divisions;
            divisionPixelHeight = height;
        }
        else //1 or anything
        {
            divisionPixelWidth = width;
            divisionPixelHeight = height / divisions;
        }
        
        this.spawn(divisionPixelWidth, divisionPixelHeight, onComplete);
    }
    
    spawn(divisionPixelWidth, divisionPixelHeight, onComplete)
    { 
        var dest = new Date().getMilliseconds() + this.totalBurnTime;
        
        if(this.style == 4)
        {
            this.spawnCenterMoveParticles(divisionPixelWidth, divisionPixelHeight, dest, onComplete);
        }
        else if(this.style == 5)
        {
            this.spawnCenterMoveParticles(divisionPixelWidth, divisionPixelHeight, dest, onComplete, true);
        }
        else 
        {
            this.spawnDirectionalMoveParticles(divisionPixelWidth, divisionPixelHeight, dest, onComplete);
        }
    }
    
    spawnDirectionalMoveParticles (divisionPixelWidth, divisionPixelHeight, dest, onComplete)
    {
        var me = this;
        for(var i = 0; i < me.divisions; i++)
        {
            setTimeout(function(x)
            {
                me.spawnDirectionalParticles(me, divisionPixelWidth, divisionPixelHeight, me.orientation, dest, x, onComplete);
                
                if(!(x + 1 < me.divisions))
                    onComplete();
                        
            }, (me.totalBurnTime / me.divisions) * i, i);
        }
    }
    
    spawnDirectionalParticles (me, divisionPixelWidth, divisionPixelHeight, orientation, dest, spot, onComplete)
    {
        for(var j = 0; j < me.sectionBurnTime / me.repeat; j++)
        {
            setTimeout(function(x)
            {
                var x, y, degree;
                for(var i = 0; i < me.amount; i++)
                {
                    degree = Math.randMinMax(90, 95);
                        
                    if(me.style == 0)
                    {
                        x = Math.randMinMax(me.left, me.left + me.width);
                        y = Math.randMinMax(me.top + (divisionPixelHeight * spot), me.top  + (divisionPixelHeight * (spot + 1)));
                        
                        createParticle({
                            x: x,
                            y: y,
                            degree: degree,
                            speed: Math.randMinMax(-100, 50),
                            vs: -9.8
                        });
                    }
                    else
                    {
                        //NOT IMPLEMENTED
                    }
                }
                
            }, this.repeat * j, j);
        }
    }
    
    spawnCenterMoveParticles (divisionPixelWidth, divisionPixelHeight, dest, onComplete, reverse = false)
    {
        var me = this;
        for(var i = 0; i < me.divisions / 2; i++)
        {
            setTimeout(function(x)
            {
                me.spawnCenterParticles(me, divisionPixelWidth, divisionPixelHeight, me.orientation, dest, x, onComplete, reverse);
                
                if(!(x + 1 < me.divisions / 2))
                    onComplete();
                        
            }, (me.totalBurnTime / me.divisions / 2) * i * 2, i);
        }
    }
    
    spawnCenterParticles (me, divisionPixelWidth, divisionPixelHeight, orientation, dest, spot, onComplete, reverse)
    {
        for(var j = 0; j < me.sectionBurnTime / me.repeat; j++)
        {
            setTimeout(function(x)
            {
                //LEFT
                var x, y, degree;
                for(var i = 0; i < me.amount; i++)
                {
                    degree = Math.randMinMax(90, 95);
                    if(orientation == 0) //Horizontal
                    {
                        if(!reverse)
                            x = Math.randMinMax(me.left + divisionPixelWidth * ((me.divisions / 2) - spot - 1), me.left + divisionPixelWidth * ((me.divisions / 2) - spot));
                        else
                            x = Math.randMinMax(me.left + divisionPixelWidth * spot, me.left + (divisionPixelWidth * (spot + 1)));
                        
                        y = Math.randMinMax(me.top, me.top + me.height);
                    }
                    else //TOP
                    {
                        //NOT IMPLEMENTED
                    }
                    
                    createParticle({
                        x: x,
                        y: y,
                        degree: degree,
                        speed: Math.randMinMax(-100, 50),
                        vs: -9.8
                    });  
                }
                
                //RIGHT
                for(var i = 0; i < me.amount; i++)
                {
                    degree = Math.randMinMax(90, 95);
                    if(orientation == 0) //Horizontal
                    {
                        if(!reverse)
                            x = Math.randMinMax(me.left + divisionPixelWidth * ((me.divisions / 2) + spot + 1), me.left + divisionPixelWidth * ((me.divisions / 2) + spot + 2));
                        else
                            x = ((me.divisions / 2) * divisionPixelWidth) + Math.randMinMax(me.left + ((me.divisions / 2) - spot) * divisionPixelWidth, me.left + ((me.divisions / 2) - spot + 1) * divisionPixelWidth);
                       
                        y = Math.randMinMax(me.top, me.top + me.height);
                    }
                    else //BOTTOM
                    {
                        //NOT IMPLEMENTED
                    }
                    
                    createParticle({
                        x: x,
                        y: y,
                        degree: degree,
                        speed: Math.randMinMax(-100, 50),
                        vs: Math.randMinMax(-4,-2)
                    });  
                }
                
            }, this.repeat * j, j);
        }
    }
}

function rattle ()
{
    $("#background-image").css("animation", "panning 1s infinite linear");
}

function circle ()
{
    var span = document.createElement("span");
    span.classList.add("dot");
    span.id = "explosionDot";
    
    $("body").append(span);
    
    setTimeout(function() {
        redirectToBuilder();
    }, 800);
}

function redirectToBuilder()
{
    window.location.href = "iconmaker.html";
}

/*Borrowed and somewhat modified from confettibutton.js*/

window.requestAnimFrame = (function () 
{
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) 
        {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function createParticle(args)
{
    var options = 
    {
        x: fullscreenWidth / 2,
        y: fullscreenHeight / 2,
        color: 'hsla(40, 100%, ' + Math.randMinMax(90, 100) + '100%, 1)',
        degree: Math.randMinMax(90, 95),
        speed: Math.randMinMax(300, 350),
        vd: Math.randMinMax(-1, 1),
        vs: Math.randMinMax(-10,-7)
    };

    var key;
    for (key in args) 
    {
        options[key] = args[key];
    }

    FX.particles.push(options);
}

function setFullscreen() 
{
    fullscreenWidth = canvas.width = window.innerWidth;
    fullscreenHeight = canvas.height = window.innerHeight;
}

function loop()
{
    var thisUpdate = new Date();
    var delta = (lastUpdate - thisUpdate) / 1000;
    var amount = FX.particles.length;
    var size = 2;
    var i = 0;
    var p;

    ctx.clearRect(0, 0, fullscreenWidth, fullscreenHeight);

    ctx.globalCompositeStyle = 'lighter';

    for(; i < amount; i++) {

        p = FX.particles[i];

        p.degree += (p.vd * delta);
        p.speed += (p.vs);// * delta);

        p.x += Math.cos(p.degree * Math.TO_RAD) * (p.speed * delta);
        p.y += Math.sin(p.degree * Math.TO_RAD) * (p.speed * delta);
        
        if(p.y > fullscreenHeight)
            continue;

        ctx.save();
    
        ctx.translate(p.x, p.y);
        ctx.rotate(p.degree * Math.TO_RAD);

        ctx.fillStyle = p.color; 
        ctx.fillRect(-size, -size, size * 2, size * 2);

        ctx.restore();
    }

    lastUpdate = thisUpdate;

    window.requestAnimFrame(loop);
}

Math.TO_RAD = Math.PI / 180;

Math.randMinMax = function(min, max, round)
{
    var val = min + (Math.random() * (max - min));
    
    if(round) 
        val = Math.round(val);
    
    return val;
};