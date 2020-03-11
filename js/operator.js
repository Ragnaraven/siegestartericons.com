/*
	global Drawable
	global Image
	global YIN
	global YANG
*/


const WIDTH = 855;
const HEIGHT = 855; //tHIS IS FOR GRIDLOCK AND MOZZIE ICON SIZE. LIKELY WILL NEED REDONE IN FUTURE

var RESOURCES = 
{
    FRAME_LOWER: {loc: "components/frame_right.png"},
	FRAME_UPPER: {loc: "components/frame_left.png"},
	BORDER_UPPER: {loc: "components/border_top.png"},
	BORDER_LOWER: {loc: "components/border_bottom.png"},
	BACKGROUND_UPPER: {loc: "components/background_top.png"},
	BACKGROUND_LOWER: {loc: "components/background_bottom.png"},
	WATERMARK: {loc: "components/watermark.png"},
	LARGE_WATERMARK: {loc: "components/large_watermark.png"}, 
};

var CTUS =
{//WHEN UPDATING, UPDATE INDEXES TO MAINTAIN ORDER
	FBI :       {value: 0, text: "FBI"},
	GIGN :      {value: 1, text: "GIGN"},
	GSG9 :      {value: 2, text: "GSG9"},
	SPETSNAZ :  {value: 3, text: "SPET"},
	SAS :       {value: 4, text: "SAS"},
	JTF2 :      {value: 5, text: "JTF2"},
	GEO :       {value: 6, text: "GEO"},
	GROM :      {value: 7, text: "GROM"},
	SDU :       {value: 8, text: "SDU"},
	BOPE :      {value: 9, text: "BOPE"},
	SAT :       {value: 10, text: "SAT"},
	CBRN :      {value: 11, text: "CBRN"},
	SEALS :     {value: 12, text: "SEALS"},
	A707 :      {value: 13, text: "A707"},
	GIS :       {value: 14, text: "GIS"},
	GSUTR :     {value: 15, text: "GSUTR"},
	GIGR :      {value: 16, text: "GIGR"},
	SASR :      {value: 17, text: "SASR"},
    
	JAEG_COR :  {value: 18, text: "JAEGER CORPS"},
    SEC_SER :   {value: 19, text: "SECRET SERVICE"},
    
    FES :       {value: 20, text: "FES"},
    APCA :      {value: 21, text: "APCA"},
	
	HOSTAGE :   {value: 22, text: "HOSTAGE"},
	RECRUIT :   {value: 23, text: "RECRUIT"},
};

var COLORS = 
{
	//WHEN UPDATING, REDO INDEXES TO MAINTAIN ORDER
	FBI :       {value: 0, color: "d15f33", ctu: CTUS.FBI},// search: ["FBI", "orange", "light"]},
	GIGN :      {value: 1, color: "406282", ctu: CTUS.GIGN},// aearch: ["GIGN", "blue", "dark"]},
	GSG9 :      {value: 2, color: "f2c438", ctu: CTUS.GSG9},// aearch: ["GSG9", "yellow", "bright"]},
	SPETSNAZ :  {value: 3, color: "a12128", ctu: CTUS.SPETSNAZ},// aearch: ["SPETSNAZ", "red", "bright"]},
	SAS :       {value: 4, color: "90717b", ctu: CTUS.SAS},// aearch: ["SAS", "gray", "dark"]},
	JTF2 :      {value: 5, color: "257b9f", ctu: CTUS.JTF2},// aearch: ["JTF2", "blue", "light"]},
	GEO :       {value: 6, color: "5e358c", ctu: CTUS.GEO},// aearch: ["GEO", "purple", "light"]},
	GROM :      {value: 7, color: "4b929c", ctu: CTUS.GROM},// aearch: ["GROM", "blue", "green", "light"]},
	SDU :       {value: 8, color: "b24b1d", ctu: CTUS.SDU},// aearch: ["SDU", "red", "light"]},
	BOPE :      {value: 9, color: "4f8c41", ctu: CTUS.BOPE},// aearch: ["BOPE", "green", "light"]},
	SAT :       {value: 10, color: "942a43", ctu: CTUS.SAT},// aearch: ["SAT", "red", "maroon", "dark"]},
	CBRN :      {value: 11, color: "fed058", ctu: CTUS.CBRN},// aearch: ["CBRN", "yellow", "light"]},
	SEALS :     {value: 12, color: "bf9632", ctu: CTUS.SEALS},// aearch: ["SEALS", "tan", "light"]},
	A707 :      {value: 13, color: "b0b0b0", ctu: CTUS.A707},// aearch: ["A707", "white", "light"]},
	GIS :       {value: 14, color: "838531", ctu: CTUS.GIS},// aearch: ["GIS", "green", "dark"]},
	GSUTR :     {value: 15, color: "728190", ctu: CTUS.GSUTR},// aearch: ["GSUTR", "gray", "dark"]},
	GIGR :      {value: 16, color: "a8834f", ctu: CTUS.GIGR},
	SASR :      {value: 17, color: "d2005a", ctu: CTUS.SASR},
    
	JAEG_COR :  {value: 18, color: "2b3d89", ctu: CTUS.JAEG_COR},
    SEC_SER :   {value: 19, color: "2b3d89", ctu: CTUS.SEC_SER},
    
    FES :       {value: 20, color: "16640a", ctu: CTUS.FES},
    APCA :      {value: 21, color: "16640a", ctu: CTUS.APCA},
	
	HOSTAGE :   {value: 22, color: "fad60e", ctu: CTUS.HOSTAGE},// aearch: ["HOSTAGE", "yellow", "bright"]},
	RECRUIT :   {value: 23, color: "406282", ctu: CTUS.RECRUIT},// aearch: ["RECRUIT", "blue", "light"]},
	
	COPPER :	{value: 24, color: "5a0900", ctu: CTUS.RANK},// aearch: ["COPPER", "brown", "dark"]},
	BRONZE :	{value: 25, color: "99551a", ctu: CTUS.RANK},// aearch: ["BRONZE", "brown", "dark"]},
	SILVER :	{value: 26, color: "444444", ctu: CTUS.RANK},// aearch: ["SILVER", "silver", "light"]},
	GOLD :		{value: 27, color: "d6af15", ctu: CTUS.RANK},// aearch: ["GOLD",	"gold", "light"]},
	PLATINUM :	{value: 28, color: "d9b28a", ctu: CTUS.RANK},// aearch: ["PLATINUM","plat", "gray", "light"]},
	DIAMOND :	{value: 29, color: "0fdce0", ctu: CTUS.RANK},// aearch: ["DIAMOND", "blue", "teal", "bright"]},
	PAPERTOWEL :{value: 30, color: "8dcd54", ctu: CTUS.RANK},
};

var DEV_COLORS = 
{
	RECRUIT           : {value: 31, color: "5f6364"},
	RECRUIT_HAT_UPPER : {value: 32, color: "10de10"},
	RECRUIT_HAT_LOWER : {value: 33, color: "00ffe4"},
	RED 			  : {value: 34, color: "ff0000"},
	BLUE 			  : {value: 35, color: "006cff"},
};

var Type = 
{
	Attacker : {value: 0, fileLoc: "attackers"},
	Defender : {value: 1, fileLoc: "defenders"},
	Other    : {value: 2, fileLoc: "others"},
	Rank     : {value: 3, fileLoc: "ranks"}
};

class Operator
{
	constructor(name, ctu, type, additionalStyles = [], preferredStyle = 0, useNewParse = false)
	{
		this.name = name;
		this.type = type;
		this.ctu = ctu;
		this.color = GET_COLOR_BY_CTU(ctu);
		this.preferredStyle = preferredStyle;
		this.useNewParse = useNewParse;
		
		if(!useNewParse)
			this.baseIcon = "components/" + type.fileLoc + "/" + name.toLowerCase() + ".png";
		else
			this.baseIcon = "components/" + type.fileLoc + "/" + name.toLowerCase() + "_icon.png";
		
		this.styles = [];
		this.styles.push(new Style(type, name, "Standard", false, useNewParse));
		//this.styles.push(new Style(type, "Standard HD", name + "HD"));
		
		for(var i = 0; i < additionalStyles.length; i++)
			this.styles.push(Style.additional(this, additionalStyles[i].desciption, additionalStyles[i].styleEnding, additionalStyles[i].allowFullBGSwap, useNewParse));
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
		return "#" + this.color.color;
	}
	
	getDrawableFromStyle (mode, index = 0, bgColor = this.color.color, additionalColor = null)
	{
		var name = this.name;
			
		if(!this.useNewParse)
		{
			return new Drawable(
				name,
				mode,
				mode == YIN ? this.styles[index].background_upper : this.styles[index].background_lower,
				mode == YIN ? this.styles[index].icon_upper       : this.styles[index].icon_lower,
				mode == YIN ? this.styles[0].icon_upper           : this.styles[0].icon_lower,
				mode == YIN ? this.styles[index].border_upper     : this.styles[index].border_lower,
				mode == YIN ? this.styles[index].frame_upper      : this.styles[index].frame_lower,
				bgColor,
				this == OTHERS.RECRUIT.operator ? [YIN ? DEV_COLORS.RECRUIT_HAT_UPPER.color : DEV_COLORS.RECRUIT_HAT_LOWER.color, additionalColor] : null,
				this.styles[index].allowFullBGSwap,
				
				new Drawable(
					name,
					mode == YIN ? YANG : YIN,
					mode == YANG ? this.styles[index].background_upper : this.styles[index].background_lower,
					mode == YANG ? this.styles[index].icon_upper       : this.styles[index].icon_lower,
					mode == YANG ? this.styles[0].icon_upper           : this.styles[0].icon_lower,
					mode == YANG ? this.styles[index].border_upper     : this.styles[index].border_lower,
					mode == YANG ? this.styles[index].frame_upper      : this.styles[index].frame_lower,
					bgColor,
					this == OTHERS.RECRUIT.operator ? [YANG ? DEV_COLORS.RECRUIT_HAT_UPPER.color : DEV_COLORS.RECRUIT_HAT_LOWER.color, additionalColor] : null,
					this.styles[index].allowFullBGSwap)
			);
		}
		else
		{
			console.log(this.styles)
			
			return new Drawable(
				name,
				mode,
				mode == YIN ? this.styles[index].background_upper : this.styles[index].background_lower,
				this.styles[index].icon,
				this.styles[0].icon,
				mode == YIN ? this.styles[index].border_upper     : this.styles[index].border_lower,
				mode == YIN ? this.styles[index].frame_upper      : this.styles[index].frame_lower,
				bgColor,
				this == OTHERS.RECRUIT.operator ? [YIN ? DEV_COLORS.RECRUIT_HAT_UPPER.color : DEV_COLORS.RECRUIT_HAT_LOWER.color, additionalColor] : null,
				this.styles[index].allowFullBGSwap,
				
				new Drawable(
					name,
					mode == YIN ? YANG : YIN,
					mode == YANG ? this.styles[index].background_upper : this.styles[index].background_lower,
					this.styles[index].icon,
					this.styles[0].icon,
					mode == YANG ? this.styles[index].border_upper     : this.styles[index].border_lower,
					mode == YANG ? this.styles[index].frame_upper      : this.styles[index].frame_lower,
					bgColor,
					this == OTHERS.RECRUIT.operator ? [YIN ? DEV_COLORS.RECRUIT_HAT_UPPER.color : DEV_COLORS.RECRUIT_HAT_LOWER.color, additionalColor] : null,
					this.styles[index].allowFullBGSwap,
					null,
					(2048 - WIDTH) / 2,
					mode == YANG ? 100 : 1090,
					WIDTH,
					HEIGHT
				),
			
				(2048 - WIDTH) / 2,
				mode == YIN ? 100 : 1090,
				WIDTH,
				HEIGHT
			);
		}
		
		
	}
	
	toString ()
	{
		return "Name: " + this.name 
		+ "\nType: " + this.type 
		+ "\nColor: " + this.color + " " + this.color.color
		+ "\nPreffered Style: " + this.preferredStyle
		+ "\nStyles: " + this.styles;
	}
}

class StyleInitHelper
{
	constructor(styleEnding, desciption = "", allowFullBGSwap = true)
	{
		this.styleEnding = styleEnding;
		this.desciption = desciption;
		this.allowFullBGSwap = allowFullBGSwap;
	}
}

class Style
{
	//allowFullBGSwap should only be true for perfect circle backgrounds.
	constructor(type = "", name = "", desciption="", allowFullBGSwap, useNewParse = false)
	{
		this.desciption = desciption;
		this.allowFullBGSwap = allowFullBGSwap;
		
		this.border_upper = RESOURCES.BORDER_UPPER.loc;
		this.border_lower = RESOURCES.BORDER_LOWER.loc;
		this.frame_upper = RESOURCES.FRAME_UPPER.loc;
		this.frame_lower = RESOURCES.FRAME_LOWER.loc;
		this.background_upper = RESOURCES.BACKGROUND_UPPER.loc;
		this.background_lower = RESOURCES.BACKGROUND_LOWER.loc;
		
		if(!useNewParse)
		{
			this.icon_upper = "components/" + type.fileLoc + "/" + name.toLowerCase() + "_upper.png";
			this.icon_lower = "components/" + type.fileLoc + "/" + name.toLowerCase() + "_lower.png";
		}
		else
		{
			this.icon = "components/" + type.fileLoc + "/" + name.toLowerCase() + ".png";
		}
	}
	
	static additional (operator, description, styleEnding = "", allowFullBGSwap = true, useNewParse = false)
	{
		var style = new Style();
		
		style.desciption = description;
		
		if(!useNewParse)
		{
			style.icon_upper = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_upper" + styleEnding + ".png";
			style.icon_lower = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_lower" + styleEnding + ".png";
		}
		else
		{
			style.icon = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + styleEnding + ".png";
		}
		
		style.border_upper = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_border_upper" + styleEnding + ".png";
		style.border_lower = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_border_lower" + styleEnding + ".png";
	
		style.frame_upper =  "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_frame_upper" + styleEnding + ".png";
		style.frame_lower =  "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_frame_lower" + styleEnding + ".png";
		
		style.background_upper = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_bg_upper" + styleEnding + ".png";
		style.background_lower = "components/" + operator.type.fileLoc + "/" + operator.name.toLowerCase() + "_bg_lower" + styleEnding + ".png";
		
		style.allowFullBGSwap = allowFullBGSwap;
		
		return style;
	}

	toString()
	{
		return     "D: " + this.desciption +
				"\nUI: " + this.icon_upper +
				"\nLI: " + this.icon_lower +
				"\nI: "  + this.icon +
				
				"\nUF: " + this.frame_upper +
				"\nLF: " + this.frame_lower +
				
				"\nUB: " + this.border_upper +
				"\nLB: " + this.border_lower +
				
				"\nUBG: " + this.background_upper +
				"\nLBG: " + this.background_lower;
	}
}

var ATTACKERS =
{
    AMARU :      {value: 50, operator: new Operator("Amaru",    CTUS.APCA,  Type.Attacker, [new StyleInitHelper("1", "Detailed Frame", false), new StyleInitHelper("2", "Holo"), new StyleInitHelper("3", "Gadget Icon"), new StyleInitHelper("4", "Holo Detailed Frame") ], 1)},
	ASH :        {value: 0,  operator: new Operator("Ash",		CTUS.FBI,	Type.Attacker, [new StyleInitHelper("1", "Standard Black Arc", false) ], 1)},
	BLACKBEARD : {value: 1,  operator: new Operator("Blackbeard",CTUS.SEALS,	Type.Attacker)},
	BLITZ :      {value: 2,  operator: new Operator("Blitz", 	CTUS.GSG9,	Type.Attacker, [new StyleInitHelper("1", "Larger")], 0)},
	BUCK :       {value: 3,  operator: new Operator("Buck",		CTUS.JTF2,	Type.Attacker)},
	CAPITAO :    {value: 4,  operator: new Operator("Capitao",	CTUS.BOPE,	Type.Attacker, [new StyleInitHelper("1", "Standard Black Arc", false) ], 1)},
	DOKKAEBI :   {value: 5,  operator: new Operator("Dokkaebi",	CTUS.A707,	Type.Attacker, [new StyleInitHelper("1", "White Noise Background") ], 1)},
	FINKA :      {value: 6,  operator: new Operator("Finka", 	CTUS.CBRN,	Type.Attacker)},
	FUZE :       {value: 7,  operator: new Operator("Fuze",		CTUS.SPETSNAZ,Type.Attacker)},
	GLAZ :       {value: 8,  operator: new Operator("Glaz",		CTUS.SPETSNAZ,Type.Attacker)},
	GRIDLOCK :   {value: 46, operator: new Operator("Gridlock", CTUS.SASR,  Type.Attacker, [ new StyleInitHelper("1", "White Border"), new StyleInitHelper("2", "No Border"), new StyleInitHelper("3", "No Peripherals"), new StyleInitHelper("4", "No Peripherals Colored"), new StyleInitHelper("5", "No Border Colored"), new StyleInitHelper("6", "White Border Colored"), new StyleInitHelper("7", "Standard Colored") ], 7, true)},
	HIBANA :     {value: 9,  operator: new Operator("Hibana",	CTUS.SAT,	Type.Attacker)},
	IQ :         {value: 10, operator: new Operator("IQ",		CTUS.GSG9,	Type.Attacker)},
	JACKAL :     {value: 11, operator: new Operator("Jackal",	CTUS.GEO,	Type.Attacker)},
	LION :       {value: 12, operator: new Operator("Lion", 	CTUS.CBRN,	Type.Attacker, [ new StyleInitHelper("1", "Roared Frame", false), new StyleInitHelper("2", "Inverted Roar", false) ], 1)},
	MAVERICK :   {value: 42, operator: new Operator("Maverick", CTUS.GSUTR, Type.Attacker)},// HD TO BE IMPLEMENTED WHEN MADE [new StyleInitHelper("1", "HD")], 0)},
	MONTAGNE :   {value: 13, operator: new Operator("Montagne", CTUS.GIGN,	Type.Attacker)},
    NOKK :       {value: 48, operator: new Operator("Nokk", CTUS.JAEG_COR, Type.Attacker, [ new StyleInitHelper("1", "Holo"), new StyleInitHelper("2", "Custom Icon") ])},
    NOMAD :      {value: 44, operator: new Operator("Nomad",    CTUS.GIGR,  Type.Attacker)},
	SLEDGE :     {value: 14, operator: new Operator("Sledge",	CTUS.SAS,	Type.Attacker, [ new StyleInitHelper("1", "Hammered Frame", false), new StyleInitHelper("2", "Inverted Hammer", false) ], 1)},
	THATCHER :   {value: 15, operator: new Operator("Thatcher", CTUS.SAS,	Type.Attacker)},
	THERMITE :   {value: 16, operator: new Operator("Thermite", CTUS.FBI,	Type.Attacker)},
	TWITCH :     {value: 17, operator: new Operator("Twitch",	CTUS.GIGN,	Type.Attacker)},
	YING :       {value: 18, operator: new Operator("Ying", 	CTUS.SDU,	Type.Attacker)},
	ZOFIA :      {value: 19, operator: new Operator("Zofia",	CTUS.GROM,	Type.Attacker)}
};

var DEFENDERS = 
{//GOYO LAST 51
	ALIBI :    {value: 40, operator: new Operator("Alibi",      CTUS.GIS,   Type.Defender)},
	BANDIT :   {value: 20, operator: new Operator("Bandit", 	CTUS.GSG9,  Type.Defender,  [ new StyleInitHelper("1", "Electrified Frame", false) ], 1)},
	CASTLE :   {value: 21, operator: new Operator("Castle", 	CTUS.FBI,   Type.Defender,  [ new StyleInitHelper("1", "Extended Barricade") ] )},
	CAVEIRA :  {value: 22, operator: new Operator("Caveira",	CTUS.BOPE,  Type.Defender,  [ new StyleInitHelper("1", "Larger") ])},
	CLASH :    {value: 43, operator: new Operator("Clash",		CTUS.GSUTR, Type.Defender)},// HD TO BE IMPLEMENTED WHEN MADE [ new StyleInitHelper("1", "Standard Frame") ], )},
	DOC :      {value: 23, operator: new Operator("Doc",		CTUS.GIGN,  Type.Defender,  [ new StyleInitHelper("1", "Extended") ], 1)},
	ECHO :     {value: 24, operator: new Operator("Echo",		CTUS.SAT,   Type.Defender,  [ new StyleInitHelper("1", "Echo Background", false) ], 1)},
	ELA :      {value: 25, operator: new Operator("Ela",		CTUS.GROM,  Type.Defender,  [ new StyleInitHelper("1", "Jagged Frame") ], 1)},
	FROST :    {value: 26, operator: new Operator("Frost",		CTUS.JTF2,  Type.Defender,  [ new StyleInitHelper("1", "Holo"), new StyleInitHelper("2", "Holo Borderless") ], 1)},
	GOYO:      {value: 51, operator: new Operator("Goyo",       CTUS.FES,   Type.Defender,  [ new StyleInitHelper("1", "Holo"), new StyleInitHelper("2", "Gadget Icon")])},
    JAGER :    {value: 27, operator: new Operator("Jager",		CTUS.GSG9,  Type.Defender,  [ new StyleInitHelper("1", "Holo") ], 1)},
	KAID :     {value: 45, operator: new Operator("Kaid",       CTUS.GIGR,  Type.Defender)},
	KAPKAN :   {value: 28, operator: new Operator("Kapkan", 	CTUS.SPETSNAZ, Type.Defender)},
	LESION :   {value: 29, operator: new Operator("Lesion", 	CTUS.SDU,  Type.Defender,  [ new StyleInitHelper("1", "Colorless") ], 1)},
	MAESTRO :  {value: 41, operator: new Operator("Maestro", 	CTUS.GIS,  Type.Defender)},
	MIRA :     {value: 30, operator: new Operator("Mira",		CTUS.GEO,  Type.Defender,  [ new StyleInitHelper("1", "Bordered"), new StyleInitHelper("2", "Colorless") ] )},
	MOZZIE :   {value: 47, operator: new Operator("Mozzie",     CTUS.SASR, Type.Defender,  [ new StyleInitHelper("1", "Snake Frame", false) ], 1, true)},
	MUTE :     {value: 31, operator: new Operator("Mute",		CTUS.SAS,  Type.Defender,  [ new StyleInitHelper("1", "Jammed Frame", false) ], 1)},
	PULSE :    {value: 32, operator: new Operator("Pulse",		CTUS.FBI,  Type.Defender,  [ new StyleInitHelper("1", "Larger") ] )},
	ROOK :     {value: 33, operator: new Operator("Rook",		CTUS.GIGN, Type.Defender)},//, [ new StyleInitHelper("1") ] )},
	SMOKE :    {value: 34, operator: new Operator("Smoke",		CTUS.SAS,  Type.Defender)},
	CHANKA :   {value: 35, operator: new Operator("Tachanka",	CTUS.SPETSNAZ, Type.Defender)},//, [ new StyleInitHelper("1") ] )},
	VALKYRIE : {value: 36, operator: new Operator("Valkyrie",	CTUS.SEALS,    Type.Defender)},
	VIGIL :    {value: 37, operator: new Operator("Vigil",		CTUS.A707,     Type.Defender, [ new StyleInitHelper("1", "White Noise Background") ], 1)},
    WARDEN :   {value: 49, operator: new Operator("Warden",     CTUS.SEC_SER,  Type.Defender, [ new StyleInitHelper("1", "Colored Tie"), new StyleInitHelper("2", "Suit"), new StyleInitHelper("3", "Colored Tie Suit") ], 3)},
};

var OTHERS =
{
	HOSTAGE : {value: 38, operator: new Operator("Hostage", CTUS.HOSTAGE, Type.Other)},
	RECRUIT : {value: 39, operator: new Operator("Recruit", CTUS.RECRUIT, Type.Other, [ new StyleInitHelper("1", "Recruit Stripe") ], 1)},
};

function GET_COLOR_BY_CTU (ctu)
{
	//DOES NOT WORK FOR RANKS!
	
	for(var color in COLORS)
	{
		color = COLORS[color];
		if(color.ctu == ctu)
			return color;
	}
	
	return null;
}

function GET_OPERATOR_BY_NAME (name)
{ 
	for(var attacker in ATTACKERS)
	{
		attacker = ATTACKERS[attacker];
		if(attacker.operator.name.toLowerCase() == name.toLowerCase())
			return attacker.operator;
	}
	
	for(var defender in DEFENDERS)
	{
		defender = DEFENDERS[defender];
		if(defender.operator.name.toLowerCase() == name.toLowerCase())
			return defender.operator;
	}
	
	for(var other in OTHERS)
	{
		other = OTHERS[other];
		if(other.operator.name.toLowerCase() == name.toLowerCase())
			return other.operator;
	}
	
	return null;
}

function GET_COLOR_BY_INDEX (i)
{
	for(var color in COLORS)
	{
		color = COLORS[color];
		if(color.value == i)
			return color;
	}
	
	return null;
}

function GET_ALL_COLOR_BY_INDEX (i)
{
	for(var color in COLORS)
	{
		color = COLORS[color];
		if(color.value == i)
			return color;
	}
	
	for(var color in DEV_COLORS)
	{
		color = DEV_COLORS[color];
		if(color.value == i)
			return color;
	}
	
	return null;
}

function GET_INDEX_BY_COLOR (findColor, def = null)
{
	var i = 0;
	for(var color in COLORS)
	{
		if(COLORS[color].color == findColor || COLORS[color] == findColor)
			return i;
			
		i++;
	}
	
	return def;
}

function SEARCH_OPERATORS (string)
{
	string = string.toLowerCase();	
	
	var results = {
		attackers: [],
		defenders: [],
		others: [],
	};
	
	for(var attacker in ATTACKERS)
	{
		attacker = ATTACKERS[attacker];
		if(attacker.operator.name.toLowerCase().includes(string) 
			|| attacker.operator.ctu.text.toLowerCase().includes(string))
			results.attackers.push(attacker.operator);
	}
	
	for(var defender in DEFENDERS)
	{
		defender = DEFENDERS[defender];
		if(defender.operator.name.toLowerCase().includes(string)
			|| defender.operator.ctu.text.toLowerCase().includes(string))
			results.defenders.push(defender.operator);
	}
	
	for(var other in OTHERS)
	{
		other = OTHERS[other];
		if(other.operator.name.toLowerCase().includes(string)
			|| other.operator.ctu.text.toLowerCase().includes(string))
			results.others.push(other.operator);
	}
	
	return results;
}