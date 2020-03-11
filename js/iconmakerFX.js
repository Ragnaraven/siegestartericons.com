/*Thank you to Timo Hausman! Wonderfull original Button effect can be found at 
https://codepen.io/timohausmann/pen/icCer

This code has been refactored, reordered, optimized, corrected and otherwise
altered as I saw fit.


	global $

*/
var FX = {};
var width, height;
var lastUpdate = new Date();
var mouseUpdate = new Date();
var lastMouse = [];
var canvas;
var ctx;
    
window.requestAnimFrame = (function () 
{
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.addEventListener('DOMContentLoaded', function()
{
    var buttons = [document.getElementById("randomizeButton"), document.getElementById("downloadIcon")];
    
    
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    FX.particles = [];

    setFullscreen();
    
    buttons.forEach(function(button) {
        button.addEventListener('mousedown', function() {
            buttonEffect(button);
        });
    });
    
    loop();

    window.addEventListener('resize', setFullscreen);
}); 

function createParticle(args) 
{
    var options = 
    {
        x: width / 2,
        y: height / 2,
        color: 'hsla('+ Math.randMinMax(195, 240) +', 100%, 50%, '+(Math.random().toFixed(2))+')',
        degree: Math.randMinMax(0, 360),
        speed: Math.randMinMax(300, 350),
        vd: Math.randMinMax(-90,90),
        vs: Math.randMinMax(-8,-5)
    };

    for (var key in args) 
    {
      options[key] = args[key];
    }

    FX.particles.push(options);
}

function loop()
{
    var thisUpdate = new Date(),
        delta = (lastUpdate - thisUpdate) / 1000,
        amount = FX.particles.length,
        size = 2,
        i = 0,
        p;

    ctx.clearRect(0,0,width,height);

    ctx.globalCompositeStyle = 'lighter';

    for(; i < amount; i++)
    {
        p = FX.particles[i];

        p.degree += (p.vd * delta);
        p.speed += (p.vs);
        
        if( p.speed < 0 )
            continue;

        p.x += Math.cos(p.degree * Math.TO_RAD) * (p.speed * delta);
        p.y += Math.sin(p.degree * Math.TO_RAD) * (p.speed * delta);

        ctx.save();
    
        ctx.translate(p.x, p.y);
        ctx.rotate(p.degree * Math.TO_RAD);

        ctx.fillStyle = p.color;
        ctx.fillRect( -size, -size, size * 2, size * 2);

        ctx.restore();
    }

    lastUpdate = thisUpdate;

    window.requestAnimFrame(loop);
}

function setFullscreen()
{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
};

function buttonEffect(button)
{
    var height = button.offsetHeight,
        left = button.getBoundingClientRect().left - canvas.getBoundingClientRect().left,
        top = button.getBoundingClientRect().top - canvas.getBoundingClientRect().top,
        width = button.offsetWidth,
        x, y, degree;
        
    for(var i = 0; i < 40; i++)
    {
        if( Math.random() < 0.5 ) {

            y = Math.randMinMax(top, top+height);

            if( Math.random() < 0.5 ) {
                x = left;
                degree = Math.randMinMax(-45,45);
            } else {
                x = left + width;
                degree = Math.randMinMax(135,225);
            }
  
        } else {

            x = Math.randMinMax(left, left+width);

            if( Math.random() < 0.5 ) {
                y = top;
                degree = Math.randMinMax(45,135);
            } else {
                y = top + height;
                degree = Math.randMinMax(-135, -45);
            }
            
        }
        createParticle({
            x: x,
            y: y,
            degree: degree,
            speed: Math.randMinMax(100, 150),
            vs: Math.randMinMax(-4,-1)
        });
    }
}

Math.TO_RAD = Math.PI / 180;

Math.randMinMax = function(min, max, round) 
{
    var val = min + (Math.random() * (max - min));
    
    if(round) 
        val = Math.round( val );
    
    return val;
};