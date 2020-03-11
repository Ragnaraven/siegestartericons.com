/*
    global Image
    global RESOURCES
    
    global YIN
    
     FRAME_LOWER: {loc: "components/frame_right.png"},
	FRAME_UPPER: {loc: "components/frame_left.png"},
	BORDER_UPPER: {loc: "components/border_top.png"},
	BORDER_LOWER: {loc: "components/border_bottom.png"},
	BACKGROUND_UPPER: {loc: "components/background_top.png"},
	BACKGROUND_LOWER: {loc: "components/background_bottom.png"},
	WATERMARK: {loc: "components/watermark.png"},
	LARGE_WATERMARK: {loc: "components/large_watermark.png"}, 
*/

//PLANNEDDrawable.additionalDraws can be set.
//Drawable.iconColorSwap can be set.
class Drawable
{
    constructor(name, mode, background, icon, iconFallback, border, frame, bgColor, iconColorSwap, allowFullBGSwap = false, inverse = null, left = 0, top = 0, width = 2048, height = 2048)
	{
		this.name = name;
	    this.mode = mode;
		this.bgColor = bgColor;
		this.iconFallback = iconFallback;
		this.leftMargin = left;
		this.topMargin = top;
		this.width = width;
		this.height = height;
		this.iconColorSwap = iconColorSwap;
		this.allowFullBGSwap = allowFullBGSwap;
		this.inverse = inverse;
		
		if(inverse != null)
			this.inverse.inverse = this;
	    
        //DO NOT access these vars directly. Use the getters or the files WILL NOT work if they dont exist.
		this.background = background;
		this.icon = icon;
		this.border = border;
		this.frame = frame;
	}
	
	duplicate ()
	{
		return new Drawable(
			this.name,
			this.mode,
			this.background,
			this.icon,
			this.iconFallback,
			this.border,
			this.frame,
			this.bgColor,
			this.iconColorSwap,
			this.allowFullBGSwap,
			this.inverse,
			this.leftMargin,
			this.topMargin,
			this.width,
			this.height,
		);
	}
	
	getBackground (callback)
	{
	    this.getImageComponent(this.background, this.mode == YIN ? RESOURCES.BACKGROUND_UPPER.loc : RESOURCES.BACKGROUND_LOWER.loc, callback);
	}
	
	getIcon (callback)
	{
	    this.getImageComponent(this.icon, this.iconFallback, callback);
	}
	
	getBorder (callback)
	{
	    this.getImageComponent(this.border, this.mode == YIN ? RESOURCES.BORDER_UPPER.loc : RESOURCES.BORDER_LOWER.loc, callback);
	}
	
	getFrame (callback)
	{
	    this.getImageComponent(this.frame, this.mode == YIN ? RESOURCES.FRAME_UPPER.loc : RESOURCES.FRAME_LOWER.loc, callback);
	}
	
	getImageComponent(imagePath, fallback, callback)
	{
		try
		{
			if(imagePath === undefined)
				return this.getImageComponent (fallback, null, callback);
			
			var image = new Image();
			image.onload = function ()
			{
				callback(image, imagePath);
			};
			
			//Necessary otherwise "this" refers to the listener function.
			var op = this;
			image.onerror = function ()
			{
				if(fallback != null)
					op.getImageComponent(fallback, null, callback);
				else
					callback(null); //This should NEVER happen.
			};
			image.src = imagePath;
		}
		catch (e)
		{
			
		}
	}
	
	invertBG (other)
	{
		this.bgColor = other./*inverse.*/bgColor;
		
		if(!this.allowFullBGSwap)
		{ /*do nothing*/ }
		else if(!other.allowFullBGSwap)
			this.background = other.mode == YIN ? RESOURCES.BACKGROUND_UPPER : RESOURCES.BACKGROUND_LOWER;
		else
			this.background = other.inverse.background;
	}
	
	toString ()
	{
	    return "Name: " + this.name 
		+ "\nBG: "      + this.background 
	    + "\nIcon: "    + this.icon
	    + "\nBorder: "  + this.border
	    + "\nFrame: "   + this.frame
	    + "\nBGColor: " + this.bgColor;
	}
}