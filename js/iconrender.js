/*
    global
    
    doneInit
    
    Image
    
    DEV_COLORS
    
    YIN
    YANG
*/

function renderSiegeStarterIcon (drawArgs, callback = null)
{
	if(doneInit) //From iconmaker.js
	{
		if(drawArgs.timer != null)
			clearTimeout(drawArgs.timer);
		
    	drawArgs.startedDrawing = new Date().getTime();
	    drawArgs.renderArgs = [];
	    
	    clear(drawArgs);
	    drawArgs.timer = setTimeout(function() { afterTimeout(drawArgs, drawArgs.startedDrawing, callback) }, 250);
	    //Wait at least 250ms before new changes. 
	    //This smooths the color picker change spam
	    //However it can still be out of sync if people are just spamming icons. 
	}
}

function afterTimeout (drawArgs, time, callback)
{
    //BG SWAPPING
    if(drawArgs.bgSwap)
    {
        var temp = drawArgs.upperDrawable.duplicate();
        drawArgs.upperDrawable.invertBG(drawArgs.lowerDrawable);
        drawArgs.lowerDrawable.invertBG(temp);
    }
    
    /*SETUP RENDER ARGS*/
    drawArgs.renderArgs = 
    [
		null, //upperDrawable.background,       //0
		null, //upperDrawable.bgColor,          //1
		null, //upperDrawable.icon,             //2
		null, //upperDrawable.extraColor,       //3
		null, //upperDrawable.border,           //4
		null, //upperDrawable.frame,            //5
		
		null, //lowerDrawable.background,       //6
		null, //lowerDrawable.bgColor,          //7
		null, //lowerDrawable.icon,             //8
		null, //lowerDrawable.extraColor,       //9
		null, //lowerDrawable.border,           //10
		null, //lowerDrawable.frame,            //11
		
		false, //bgSwap,                          //12,
		
		drawArgs.upperDrawable.name,              //13
		drawArgs.lowerDrawable.name               //14
    ];
    
    draw(drawArgs, time, callback);
}

function loadingClear (drawArgs)
{
	clear(drawArgs);
}

function clear (drawArgs)
{
	if(drawArgs.loadingIcon != null)
	{
		drawArgs.iconCanvas.style.visibility = "hidden";
		drawArgs.loadingIcon.style.visibility = "visible";
	}
	drawArgs.iconContext.clearRect(0, 0, 2048, 2048);
}

function draw (drawArgs, time, callback)
{
	getBackgrounds(drawArgs, time, callback);
}

function getBackgrounds (drawArgs, time, callback)
{
	drawArgs.bgLoaded = 0;
	
	drawArgs.upperDrawable.getBackground(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
	    	
	        drawArgs.renderArgs[0] = path;
	        drawArgs.renderArgs[1] = drawArgs.upperDrawable.bgColor;
	        
	        drawArgs.upperBG = result;
	        
    		drawArgs.bgLoaded++;
            if(drawArgs.bgLoaded == 2)
            	drawBackgrounds(drawArgs, time, callback);
	    }
	});
	
	drawArgs.lowerDrawable.getBackground(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
	        drawArgs.renderArgs[6] = path;
	        drawArgs.renderArgs[7] = drawArgs.lowerDrawable.bgColor;
	        
            drawArgs.lowerBG = result;
            
    	    drawArgs.bgLoaded++;
            if(drawArgs.bgLoaded == 2)
            	drawBackgrounds(drawArgs, time, callback);
	    }
	});
}

function drawBackgrounds (drawArgs, time, callback)
{
    //Draw order:
        //lower left
        //lower right
        //upper right
        //upper left
    drawArgs.devContext.drawImage(drawArgs.upperBG, 0, 0, 2048, 2048);
    drawArgs.devContext.clearRect(0, 0, 2048, 1024);
    drawArgs.iconContext.drawImage(drawArgs.devCanvas, 0, 0, 2048, 2048);
    
    drawArgs.iconContext.drawImage(drawArgs.lowerBG, 0, 0, 2048, 2048);
    
    drawArgs.devContext.drawImage(drawArgs.upperBG, 0, 0, 2048, 2048);
    drawArgs.devContext.clearRect(0, 1024, 2048, 1024);
    drawArgs.iconContext.drawImage(drawArgs.devCanvas, 0, 0, 2048, 2048);
 
    replaceDrawnColorOnCanvas(drawArgs, DEV_COLORS.RED.color, drawArgs.lowerDrawable.bgColor);
    replaceDrawnColorOnCanvas(drawArgs, DEV_COLORS.BLUE.color, drawArgs.upperDrawable.bgColor);
    
    drawIcons(drawArgs, time, callback);
}

function drawIcons (drawArgs, time, callback)
{
	        
    //console.log(drawArgs.upperDrawable)
	        
	drawArgs.iconsLoaded = 0;
	drawArgs.upperDrawable.getIcon(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
	        drawArgs.renderArgs[2] = path;
	        
            drawArgs.iconContext.drawImage(result, drawArgs.upperDrawable.leftMargin, drawArgs.upperDrawable.topMargin,
            									drawArgs.upperDrawable.width, drawArgs.upperDrawable.height);
           
        	//If both icon color swap and the color to swap != null;
            if(drawArgs.upperDrawable.iconColorSwap != null && drawArgs.upperDrawable.iconColorSwap[1] != null)
            {
                replaceDrawnColorOnCanvas(drawArgs, drawArgs.upperDrawable.iconColorSwap[0], drawArgs.upperDrawable.iconColorSwap[1], 100);
	            drawArgs.renderArgs[3] = drawArgs.upperDrawable.iconColorSwap[1];
            }
         
    		drawArgs.iconsLoaded++;
            if(drawArgs.iconsLoaded == 2)
            	drawBorders(drawArgs, time, callback);
	    }
	});
	
	drawArgs.lowerDrawable.getIcon(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
	        drawArgs.renderArgs[8] = path;
	        
            drawArgs.iconContext.drawImage(result, drawArgs.lowerDrawable.leftMargin, drawArgs.lowerDrawable.topMargin, 
            									drawArgs.lowerDrawable.width, drawArgs.lowerDrawable.height);
            
            if(drawArgs.lowerDrawable.iconColorSwap != null && drawArgs.lowerDrawable.iconColorSwap[1] != null)
            {
                replaceDrawnColorOnCanvas(drawArgs, drawArgs.lowerDrawable.iconColorSwap[0], drawArgs.lowerDrawable.iconColorSwap[1], 100);
                drawArgs.renderArgs[9] = drawArgs.lowerDrawable.iconColorSwap[1];
            }
          
    	    drawArgs.iconsLoaded++;
            if(drawArgs.iconsLoaded == 2)
            	drawBorders(drawArgs, time, callback);
	    }
	});
}

function drawBorders (drawArgs, time, callback)
{
	drawArgs.bordersLoaded = 0;
	drawArgs.upperDrawable.getBorder(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
	        drawArgs.renderArgs[4] = path;
	        
            drawArgs.iconContext.drawImage(result, 0, 0, 2048, 2048);
         
    		drawArgs.bordersLoaded++;
            if(drawArgs.bordersLoaded == 2)
            	drawFrame(drawArgs, time, callback);
	    }
	});
	
	drawArgs.lowerDrawable.getBorder(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
            drawArgs.renderArgs[10] = path;
	    
            drawArgs.iconContext.drawImage(result, 0, 0, 2048, 2048);
          
    	    drawArgs.bordersLoaded++;
            if(drawArgs.bordersLoaded == 2)
                drawFrame(drawArgs, time, callback);
	    }
	});
}

function drawFrame (drawArgs, time, callback)
{
	var framesLoaded = 0;
	drawArgs.upperDrawable.getFrame(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
            drawArgs.renderArgs[5] = path;
            
            drawArgs.iconContext.drawImage(result, 0, 0, 2048, 2048);
            
    		framesLoaded++;
            if(framesLoaded == 2)
                finalizeDraw(drawArgs, time, callback);
	    }
	});
	
	drawArgs.lowerDrawable.getFrame(function (result, path)
	{
	    if(time == drawArgs.startedDrawing)
	    {
            drawArgs.renderArgs[11] = path;
	        
            drawArgs.iconContext.drawImage(result, 0, 0, 2048, 2048);
            
    	    framesLoaded++;
            if(framesLoaded == 2)
                finalizeDraw(drawArgs, time, callback);
	    }
	});
}

function finalizeDraw (drawArgs, time, callback)
{
    if(time == drawArgs.startedDrawing)
    {
    	var watermark = new Image();
    	watermark.onload = function ()
    	{
    		drawArgs.iconContext.drawImage(watermark, 0, 0, 2048, 2048);
    		
    		if(drawArgs.loadingIcon != null)
    		{
	    		drawArgs.iconCanvas.style.visibility = "visible";
	    		drawArgs.loadingIcon.style.visibility = "hidden";
    		}
    		
    		drawArgs.startedDrawing = -1;
    		drawArgs.timer = null;
    		
    		if(callback != null)
    			callback();
    	};
    	watermark.src = "components/watermark.png";
    }
}

function replaceDrawnColorOnCanvas (drawArgs, from, to, threshold = 35)
{
	//If not string type, RGB is assumed.
	if(typeof from == "string")
		from = hexToRgb(from);
		
	if(typeof to == "string")
		to = hexToRgb(to);
			
	var imageData = drawArgs.iconContext.getImageData(0, 0, 2048, 2048);
	
	for (var i = 0; i < imageData.data.length; i += 4)
	{
		if((imageData.data[i    ] - threshold <= from.r && imageData.data[i    ] + threshold > from.r) 
    		&& (imageData.data[i + 1] - threshold <= from.g && imageData.data[i + 1] + threshold > from.g)
    		&& (imageData.data[i + 2] - threshold <= from.b && imageData.data[i + 2] + threshold > from.b))
		{
			imageData.data[i] = to.r;
			imageData.data[i + 1] = to.g;
			imageData.data[i + 2] = to.b;
		}
	}
	
	drawArgs.iconContext.putImageData(imageData, 0, 0);
}

function hexToRgb(hex)
{
	if(hex.charAt(0) == "#")
		hex = hex.substr(1);
	
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return { r, g, b };
}

class DrawArgs 
{
	constructor()
	{
		this.timer = null;
		this.startedDrawing = -1;
		this.renderArgs = {};
	}
	
	init(iconCanvas, iconContext, devCanvas, devContext, loadingIcon, bgSwap, upperDrawable, lowerDrawable)
	{
		this.oncomplete;
		
		this.iconCanvas = iconCanvas;
		this.iconContext = iconContext;
		this.devCanvas = devCanvas;
		this.devContext = devContext;
		this.loadingIcon = loadingIcon;
		this.bgSwap = bgSwap;
		
		this.upperDrawable = upperDrawable;
		this.lowerDrawable = lowerDrawable;
	}
}