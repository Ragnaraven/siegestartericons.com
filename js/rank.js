/*
    global RESOURCES
    global Style
	global COLORS
	global Type
	
	global Drawable
	global YIN
	global YANG
*/

/**
 * Dependent on operator.js
**/	


const RANK_WIDTH = 350 * 2;
const RANK_HEIGHT = 450 * 2;

class Rank 
{
	constructor(name, color, type, resourceNameBase, intAdditionalStyles, styleDescriptions = ["Standard"], preferredStyle = 0)
	{
		this.name = name;
		this.type = type;
		this.color = color;
		this.resourceNameBase = resourceNameBase;
		this.preferredStyle = preferredStyle;
		
		this.styles = [];
		this.styles.push(new RankStyle(type, styleDescriptions[0], resourceNameBase));
		
		for(var i = 0; i < intAdditionalStyles; i++)
		{
			this.styles.push(RankStyle.additional(type, styleDescriptions[i + 1], resourceNameBase, i + 1));
		}
	}
	
	getDrawableFromStyle (mode, index = 0, bgColor = this.color, additionalColor = null)
	{
		var name = this.name;
		
		return new Drawable(
			name,
			mode,
			mode == YIN ? this.styles[index].background_upper : this.styles[index].background_lower,
			this.styles[index].icon,
			this.styles[0].icon,
			mode == YIN ? this.styles[index].border_upper     : this.styles[index].border_lower,
			mode == YIN ? this.styles[index].frame_upper      : this.styles[index].frame_lower,
			bgColor,
			null, //MAybe add additionColor for ranks?
			true,
			
			new Drawable(
				name,
				mode == YIN ? YANG : YIN,
				mode == YANG ? this.styles[index].background_upper : this.styles[index].background_lower,
				this.styles[index].icon,
				this.styles[0].icon,
				mode == YANG ? this.styles[index].border_upper     : this.styles[index].border_lower,
				mode == YANG ? this.styles[index].frame_upper      : this.styles[index].frame_lower,
				bgColor,
				null, //MAybe add additionColor for ranks?
				true,
				null,
				(2048 - RANK_WIDTH) / 2,
				mode == YANG ? 50 : 1040,
				RANK_WIDTH,
				RANK_HEIGHT
			),
		
			(2048 - RANK_WIDTH) / 2,
			mode == YIN ? 50 : 1040,
			RANK_WIDTH,
			RANK_HEIGHT
		);
	}
	
	getStyleDescriptions ()
	{
		var styleNames = [];
		
		this.styles.forEach(function (style) {
			styleNames.push(style.desciption);
		});
		
		return styleNames;
	}
	
	getHexColor ()
	{
		return "#" + this.color;
	}
	
	toString ()
	{
		return "Name: " + this.name 
		+ "\nType: " + this.type.fileLoc 
		+ "\nColor: " + this.color
		+ "\nresourceNameBase: " + this.resourceNameBase
		+ "\nStyles: " + this.styles;
	}
}

class RankStyle
{
	constructor(type, desciption, resourceNameBase, allowFullBGSwap = true)
	{
		this.desciption =desciption;
		
		this.icon = "components/" + type.fileLoc + "/" + resourceNameBase + ".png";
		this.border_upper = RESOURCES.BORDER_UPPER.loc;
		this.border_lower = RESOURCES.BORDER_LOWER.loc;
		this.frame_upper = RESOURCES.FRAME_UPPER.loc;
		this.frame_lower = RESOURCES.FRAME_LOWER.loc;
		this.background_upper = RESOURCES.BACKGROUND_UPPER.loc;
		this.background_lower = RESOURCES.BACKGROUND_LOWER.loc;
		this.allowFullBGSwap = allowFullBGSwap;
		
		this.resourceNameBase = resourceNameBase; //Only used for search function. There is a better implementation probably and will be improobed later
	}
	
	static additional(type, desciption, resourceNameBase, intEnding, allowFullBGSwap = true)
	{
		var style = new Style();
		
		style.icon = "components/" + type.fileLoc + "/" + resourceNameBase + "_" + intEnding + ".png";
		style.desciption = desciption;
		style.border_upper = RESOURCES.BORDER_UPPER.loc;
		style.border_lower = RESOURCES.BORDER_LOWER.loc;
		style.frame_upper = RESOURCES.FRAME_UPPER.loc;
		style.frame_lower = RESOURCES.FRAME_LOWER.loc;
		style.background_upper = RESOURCES.BACKGROUND_UPPER.loc;
		style.background_lower = RESOURCES.BACKGROUND_LOWER.loc;
		style.allowFullBGSwap = allowFullBGSwap;	
		
		style.resourceNameBase = resourceNameBase; //Only used for search function. There is a better implementation probably and will be improobed later
		
		return style;
	}
}

var RANKS = 
{//Rank IDS are 1000+ to prevent conflictions.
	COPPER_V :		{value: 1000, rank: new Rank("Copper V",   COLORS.COPPER.color, Type.Rank, "copper5", 2, ["Standard", "Holo", "Hand-drawn"] )},
	COPPER_IV :		{value: 1001, rank: new Rank("Copper IV",  COLORS.COPPER.color, Type.Rank, "copper4", 2, ["Standard", "Holo", "Hand-drawn"] )},
	COPPER_III :	{value: 1002, rank: new Rank("Copper III", COLORS.COPPER.color, Type.Rank, "copper3", 1, ["Standard", "Holo"] )},
	COPPER_II : 	{value: 1003, rank: new Rank("Copper II",  COLORS.COPPER.color, Type.Rank, "copper2", 1, ["Standard", "Holo"] )},
	COPPER_I :		{value: 1004, rank: new Rank("Copper I",   COLORS.COPPER.color, Type.Rank, "copper1", 1, ["Standard", "Holo"] )},
	
	BRONZE_IV :		{value: 1005, rank: new Rank("Bronze IV",  COLORS.BRONZE.color, Type.Rank, "bronze4", 1, ["Standard", "Holo"] )},
	BRONZE_III :	{value: 1006, rank: new Rank("Bronze III", COLORS.BRONZE.color, Type.Rank, "bronze3", 1, ["Standard", "Holo"] )},
	BRONZE_II : 	{value: 1007, rank: new Rank("Bronze II",  COLORS.BRONZE.color, Type.Rank, "bronze2", 1, ["Standard", "Holo"] )},
	BRONZE_I :		{value: 1008, rank: new Rank("Bronze I",   COLORS.BRONZE.color, Type.Rank, "bronze1", 1, ["Standard", "Holo"] )},

	SILVER_IV :		{value: 1009, rank: new Rank("Silver IV",  COLORS.SILVER.color, Type.Rank, "silver4", 1, ["Standard", "Holo"] )},
	SILVER_III :	{value: 1010, rank: new Rank("Silver III", COLORS.SILVER.color, Type.Rank, "silver3", 1, ["Standard", "Holo"] )},
	SILVER_II : 	{value: 1011, rank: new Rank("Silver II",  COLORS.SILVER.color, Type.Rank, "silver2", 1, ["Standard", "Holo"] )},
	SILVER_I :		{value: 1012, rank: new Rank("Silver I",   COLORS.SILVER.color, Type.Rank, "silver1", 1, ["Standard", "Holo"] )},
	
	GOLD_IV :		{value: 1013, rank: new Rank("Gold IV",  COLORS.GOLD.color, Type.Rank, "gold4", 1, ["Standard", "Holo"] )},
	GOLD_III :		{value: 1014, rank: new Rank("Gold III", COLORS.GOLD.color, Type.Rank, "gold3", 1, ["Standard", "Holo"] )},
	GOLD_II :		{value: 1015, rank: new Rank("Gold II",  COLORS.GOLD.color, Type.Rank, "gold2", 1, ["Standard", "Holo"] )},
	GOLD_I :		{value: 1016, rank: new Rank("Gold I",   COLORS.GOLD.color, Type.Rank, "gold1", 1, ["Standard", "Holo"] )},
	
	PLAT_III :		{value: 1017, rank: new Rank("Plat III", COLORS.PLATINUM.color, Type.Rank, "platinum3", 1, ["Standard", "Holo"] )},
	PLAT_II :		{value: 1018, rank: new Rank("Plat II",  COLORS.PLATINUM.color, Type.Rank, "platinum2", 1, ["Standard", "Holo"] )},
	PLAT_I :		{value: 1019, rank: new Rank("Plat I",   COLORS.PLATINUM.color, Type.Rank, "platinum1", 1, ["Standard", "Holo"] )},
	
	DIAMOND :		{value: 1020, rank: new Rank("Diamond",  COLORS.DIAMOND.color, Type.Rank, "diamond", 3, ["Standard", "Holo Bottom", "Holo Star", "Hand-drawn"] )},

	PAPERTOWEL5 :   {value: 1021, rank: new Rank("Paper Towel V", COLORS.PAPERTOWEL.color, Type.Rank, "papertowel5")},
	PAPERTOWEL8 :   {value: 1021, rank: new Rank("Paper Towel VIII", COLORS.PAPERTOWEL.color, Type.Rank, "papertowel8")},
	
};

function GET_RANK_BY_INDEX (index)
{
	var i = 0;
	for(var rank in RANKS)
	{
		rank = RANKS[rank];
		if(i == index)
			return rank;
			
		i++;
	}
	
	return null;
}

function SEARCH_RANKS (string)
{
	string = string.replace(/\s/g, "").toLowerCase(); //removes all white space
	
	var results = [];
	
	for(var rank in RANKS)
	{
		rank = RANKS[rank];
	
		if(rank.rank.name.replace(/\s/g, "").toLowerCase().includes(string)
			|| rank.rank.resourceNameBase.includes(string))
			results.push(rank.rank);
	}
	
	return results;
}