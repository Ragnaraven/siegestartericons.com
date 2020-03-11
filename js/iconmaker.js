/*
	global $
	
	SEARCH_OPERATORS
	SEARCH_RANKS
	OTHERS
	COLORS
	RANKS
	Type
	
	FROM - ICONRENDER.JS
	setupCanvas
	renderW0keIcon
	renderArgs
	
	GET_COLOR_BY_INDEX
	
	DrawArgs
*/
const YIN = 0;
const YANG = 1;
const FRAME = 2;

const YIN_YANG = ["Yin", "Yang"];

const CARD = 0;
const STYLE = 1;
const BACKGROUND = 2;
const ADDITIONAL_COLOR = 2;
const FRAME_BORDER = 3;

var iconCanvas,
    iconContext,
    
    devCanvas,
    devContext,
    
    loadingIcon,
    
    w0keiconDrawArgs;

var dummyIconCanvas,
    dummyIconContext,
    
    dummyDevCanvas,
    dummyDevContext,
    
    dummyDrawArgs;
    
var currentSection;

var spawner;

var navTabs = [];
var pages = [];
var stepHashs = ["yinheader", "yangheader", "page3header"];
var randomButtonText;
var randomYinYang;

var YIN_YANG_PAGES = [];

var bgSwapButton;
var bgSwap = false;

/**vars for iconrender.js**/
var doneInit = false;


$(document).ready(function()
{
    window.addEventListener("scroll", checkScrollSwitching);
    
    randomButtonText = document.getElementById("randomButtonText");
    document.getElementById("randomizeButton").addEventListener("click", function ()
    {
        if(currentSection == 0) //TOP
            randomAll();
            
        else if (currentSection == 1) //Step1
            randomYin();
            
        else if (currentSection == 2) //Step2
            randomYang();
        
        else if (currentSection == 3) //Step3
            randomOther();
    });
    
    randomYinYang = document.getElementById("yingYangPng");
    
    /**LEFT NAV MENU**/
    { 
        currentSection = 0;
        
        pages[0] = $("#yin");
        pages[1] = $("#yang");
        pages[2] = $("#page3");
        
        navTabs[0] = $("#step1");
        navTabs[1] = $("#step2");
        navTabs[2] = $("#step3");
        
        navTabs[0][0].addEventListener("click", function()
        {
            var lastSection = currentSection;
            currentSection = 1;
            
            updateActiveSection(lastSection);
            setStep(currentSection - 1);
        });
        navTabs[1][0].addEventListener("click", function()
        {
            var lastSection = currentSection;
            currentSection = 2;
            
            updateActiveSection(lastSection);
            setStep(currentSection - 1);
        });
        navTabs[2][0].addEventListener("click", function()
        {
            var lastSection = currentSection;
            currentSection = 3;
            
            updateActiveSection(lastSection);
            setStep(currentSection - 1);
        });
    }
    
    /**RIIGHT NAV MENU**/
    $("#downloadIcon")[0].addEventListener("click", downloadIcon);
    
    /**PAGES*/
    YIN_YANG_PAGES[YIN] = new YinYangPage(YIN, [], "colorButton");
    YIN_YANG_PAGES[YANG] = new YinYangPage(YANG, ["yangTab"], "colorButton yangColorButton");
    
    YIN_YANG_PAGES[YIN].init(randomYin);
    YIN_YANG_PAGES[YANG].init(randomYang);
    
    /**CUSTOMIZATION PAGE**/
    bgSwapButton = document.getElementById("bgSwapButton");
    bgSwapButton.addEventListener("input", function() {
        bgSwap = !bgSwap;
        drawW0keIcon(); //Maybe add page param event listener.
    });
    
    checkScrollSwitching();
     
    doneInit = true;
	
	setupCanvases();
	
    dummyDrawArgs = new DrawArgs();
    
    w0keiconDrawArgs = new DrawArgs();
	drawW0keIcon();
    
    spawner = $("#spawner");
    setupFeed();
});
///////////////////////////////////////////////////////////
        /// YIN YANG PAGE ///
///////////////////////////////////////////////////////////
class YinYangPage 
{
    constructor (mode, tabNames = [], colorButtonClassName)
    {
        this.mode = mode;
        this.filterMode = -1;
        this.operatorSelected = null;
        this.results = null;
        this.pageParams = new PageParams(mode);
        
        this.resultsTabs = [];
        this.icons = [];
        this.counters = [];
        this.cards = [];
        this.colorButtons = [];
        this.recruitColorButtons = [];
        
        this.colorPickerJQ = null;
        this.colorPickerField = null;
        
        this.resultsBox = document.getElementById(YIN_YANG[mode].toLowerCase() + "ResultsBox");
        this.styleSelector = document.getElementById(YIN_YANG[mode].toLowerCase() + "StyleSelector");
        
        this.contentSearch = document.getElementById(YIN_YANG[mode].toLowerCase() + "ContentSearch");
        this.contentSearch.addEventListener("input", this.updateSearch.bind(this));
        
        this.resultsTabs[0] = document.getElementById(YIN_YANG[mode].toLowerCase() + "TabAttackers");
        this.resultsTabs[1] = document.getElementById(YIN_YANG[mode].toLowerCase() + "TabDefenders");
        this.resultsTabs[2] = document.getElementById(YIN_YANG[mode].toLowerCase() + "TabRanks");
        this.resultsTabs[3] = document.getElementById(YIN_YANG[mode].toLowerCase() + "TabOther");
        
        this.counters[0] = this.resultsTabs[0].getElementsByClassName("tabCount")[0];
        this.counters[1] = this.resultsTabs[1].getElementsByClassName("tabCount")[0];
        this.counters[2] = this.resultsTabs[2].getElementsByClassName("tabCount")[0];
        this.counters[3] = this.resultsTabs[3].getElementsByClassName("tabCount")[0];
        
        this.icons[0] = this.resultsTabs[0].getElementsByClassName("tabImg")[0];
        this.icons[1] = this.resultsTabs[1].getElementsByClassName("tabImg")[0];
        this.icons[2] = this.resultsTabs[2].getElementsByClassName("tabImg")[0];
        this.icons[3] = this.resultsTabs[3].getElementsByClassName("tabImg")[0];
        
        //COLOR PICKER FIELD LISTENERS
        {
            /**NORMAL**/
            this.colorPicker = $("#" + YIN_YANG[mode].toLowerCase() + "ColorPicker");
            this.colorPickerField = $("#" + YIN_YANG[mode].toLowerCase() + "Color");
            
            this.colorPickerField[0].addEventListener("keyup", function () {
                this.colorPickerField[0].value = forceHex(this.colorPickerField[0].value);
                $.farbtastic(this.colorPicker).setColor(this.colorPickerField[0].value);
            }.bind(this));
            
            this.colorPicker.farbtastic(function(color) {
                this.colorPickerField[0].value = color;
                this.colorPickerField.css("background-color", color);
                this.colorPickerField.css("color", invertColor(color));
                
                this.pageParams.onBackgroundColorChanged(color);
            }.bind(this));
            
            this.colorButtonWrapper = document.getElementById(YIN_YANG[mode].toLowerCase() + "ColorButtonWrapper");
            this.colorButtonReset = $("#" + YIN_YANG[mode].toLowerCase() + "ColorButtonReset");
            
            this.colorButtonReset.click();
            initializeColorButtons(this, this.colorButtons, this.colorButtonWrapper, this.colorPicker, colorButtonClassName, this.pageParams.onBackgroundColorChanged);
        }
        
        /**RECRUIT**/
        {
            this.recruitHatColorWrapper = document.getElementById(YIN_YANG[mode].toLowerCase() + "RecruitHatColorWrapper");
            
            this.recruitColorPicker = $("#" + YIN_YANG[mode].toLowerCase() + "RecruitColorPicker");
            this.recruitColorPickerField = $("#" + YIN_YANG[mode].toLowerCase() + "RecruitColor");
            
            this.recruitColorPickerField[0].addEventListener("keyup", function () {
                this.recruitColorPickerField[0].value = forceHex(this.recruitColorPickerField[0].value);
                $.farbtastic(this.recruitColorPicker).setColor(this.recruitColorPickerField[0].value);
            }.bind(this));
            
            this.recruitColorPicker.farbtastic(function(color) {
                this.recruitColorPickerField[0].value = color;
                this.recruitColorPickerField.css("background-color", color);
                this.recruitColorPickerField.css("color", invertColor(color));
                
                this.pageParams.onAdditionalColorChanged(color);
            }.bind(this));
            
            this.recruitColorButtonWrapper = document.getElementById(YIN_YANG[mode].toLowerCase() + "RecruitColorButtonWrapper");
            this.recruitColorButtonReset = $("#" + YIN_YANG[mode].toLowerCase() + "RecruitColorButtonReset");
            
            this.recruitColorButtonReset.click();
            initializeColorButtons(this, this.recruitColorButtons, this.recruitColorButtonWrapper, this.recruitColorPicker, colorButtonClassName, this.pageParams.onAdditionalColorChanged);
       
            //Setup recruit reset
            var recruitColor = "#" + COLORS.RECRUIT.color;
            $.farbtastic(this.recruitColorPicker).setColor(recruitColor);
            this.recruitColorButtonReset.css("background-color", recruitColor);
            this.recruitColorButtonReset[0].onclick = function () //DO NOT add listener. Replace exisiting one.
            {
                this.recruitColorPickerField.css("background-color", recruitColor);
                this.recruitColorPickerField[0].value = recruitColor;
                $.farbtastic(this.recruitColorPicker).setColor(recruitColor);
                
                this.pageParams.onAdditionalColorChanged(recruitColor);
            }.bind(this);
        }
        
        //TAB FILTER LISTENERS
        tabNames.unshift("tab");
        var activeTabClassName = YIN_YANG[mode].toLowerCase() + "TabActive";
        var activeTabItherClassName = YIN_YANG[mode].toLowerCase() + "tabActiveOther";
        var hiddenTabItemClassName = "hidden";
    
        let page = this;
        this.resultsTabs[0].addEventListener("click", function () {
            resultTabSwitch(page, 0, tabNames, [activeTabClassName, "tabAttackerActive"],     hiddenTabItemClassName); 
        });
        
        this.resultsTabs[1].addEventListener("click", function () {
            resultTabSwitch(page, 1, tabNames, [activeTabClassName, "tabDefenderActive"],     hiddenTabItemClassName); 
        });
        
        this.resultsTabs[2].addEventListener("click", function () {
            resultTabSwitch(page, 2, tabNames, [activeTabClassName, "tabActiveRank"],         hiddenTabItemClassName); 
        });
        
        this.resultsTabs[3].addEventListener("click", function () {
            resultTabSwitch(page, 3, tabNames, [activeTabClassName, activeTabItherClassName], hiddenTabItemClassName);
        });
    }
    
    updateSearch () 
    {
        this.results = search(this.contentSearch.value);
        updatePageSearchFilter(this);
    }

    init(randomFunc)
    {
        this.updateSearch(); //Init
        $(this.resultsTabs[this.mode]).click(); //THIS.mode is conviently 0 or 1
        randomFunc();
        this.colorButtonReset.click();
    }
}

function resultTabSwitch (page, index, tabClassNames, activeTabClassNames, iconHiddenClassName, randomFunc)
{
    var modeSwitched = false;
    
    for(var i = 0; i < page.resultsTabs.length; i++)
    {
        if(i == index)
        {
            if(!page.resultsTabs[i].classList.contains(activeTabClassNames[0]))
            {
                page.resultsTabs[i].classList.forEach(function (name) {
                    page.resultsTabs[i].classList.remove(name);
                });
                
                activeTabClassNames.forEach(function (name) {
                    page.resultsTabs[i].classList.add(name);
                });
                
                if(page.icons[i].classList.contains(iconHiddenClassName))
                    page.icons[i].classList.remove(iconHiddenClassName);
            }
            else
            {//Uncheck this tab. Should make all resultsTabs normal.
                removeActiveTabNames(page.resultsTabs[i], tabClassNames, page.icons[i], iconHiddenClassName);
                page.filterMode = -1;
                modeSwitched = true;
                
                break;
            }
        }
        else
            removeActiveTabNames(page.resultsTabs[i], tabClassNames, page.icons[i], iconHiddenClassName);
    }
    
    if(!modeSwitched)
        page.filterMode = index;
        
    updatePageSearchFilter(page);
    
    /*End of Normal function. I chose to nest this because this file is > 500 lines. 
    I hate the design but need the collapse. Functionality needed nowhere else.*/
    function removeActiveTabNames (element, tabClassNames, icon, iconHiddenClassName)
    {
       element.className = ""; //Clear all
       //readd
       tabClassNames.forEach(function(className) {
            element.classList.add(className);
        });
        
        if(!icon.classList.contains(iconHiddenClassName))
            icon.classList.add(iconHiddenClassName);
    }
}
            
function randomAll ()
{
    randomYin();
    randomYang(); 
    randomOther();
}
    
function randomYin ()
{
    YIN_YANG_PAGES[YIN].cards[Math.randMinMax(0, YIN_YANG_PAGES[YIN].cards.length - 1, true)].setSelected(YIN_YANG_PAGES[YIN].cards); //Auto calls page param update.
    YIN_YANG_PAGES[YIN].pageParams.onStyleChanged(Math.randMinMax(0, YIN_YANG_PAGES[YIN].pageParams.card.getSelected().styles.length - 1, true));
}

function randomYang ()
{
    YIN_YANG_PAGES[YANG].cards[Math.randMinMax(0, YIN_YANG_PAGES[YANG].cards.length - 1, true)].setSelected(YIN_YANG_PAGES[YANG].cards); //Auto calls page param update.
    YIN_YANG_PAGES[YANG].pageParams.onStyleChanged(Math.randMinMax(0, YIN_YANG_PAGES[YANG].pageParams.card.getSelected().styles.length - 1, true));
}

function randomOther ()
{
    //No bg swap randomness for now.
}
///////////////////////////////////////////////////////////
        /// COLOR BUTTONS ///
///////////////////////////////////////////////////////////
/*<div class="colorButton colorButtonSpetsnaz">SPETSNAZ</div>*/
class ColorButton
{
    constructor (color, colorButtonClassName, colorPicker, callback)
    {
        var div = document.createElement("div");
        div.className = colorButtonClassName + (color == COLORS.SPETSNAZ ? " colorButtonSpetsnaz" : "");
        div.textContent = color.ctu.text;
        div.addEventListener("click", function () {
            $.farbtastic(colorPicker).setColor("#" + color.color);
            callback("#" + color.color);
        });
        
        $(div).css("background-color", "#" + color.color);
        
        this.div = div;
        this.color = color;
        
        this.selected = false;
    }
}

function initializeColorButtons (page, colorButtonContainer, colorButtonWrapper, colorPicker, colorButtonClassName, callback)
{
    var cap = COLORS.HOSTAGE.value;// - 1; //Minus one for ob1
    var i = 0;
	for(var color in COLORS)
	{
	    if(i >= cap)
	        break; //STOP once recruit is found.
	    
		color = COLORS[color];
		
		//if(color != COLORS.SPETSNAZ)
	        addColor (color, colorButtonClassName, colorPicker, callback);
		
		i++;
    }
    
    //Spets always last
    //addColor (COLORS.SPETSNAZ, colorButtonClassName, colorPicker, callback);
    
    function addColor (color, colorButtonClassName, colorPicker, callback)
    {
        var temp = new ColorButton(color, colorButtonClassName, colorPicker, callback);
        colorButtonContainer.push(temp);
        colorButtonWrapper.appendChild(temp.div);
    }
}

///////////////////////////////////////////////////////////
        /// OPERATOR STYLE CHOICES ///
///////////////////////////////////////////////////////////
class SelectionOptionHolder 
{
    constructor (text, index, normalClass, onSelectedClass, onSelectedCallback)
    {
        var div = document.createElement("div");
        div.className = normalClass;
        div.textContent = text;
        
        this.circleClassName = "styleSelectionOptionActiveCircle";
        
        var activeCircle = document.createElement("div");
        activeCircle.className =  this.circleClassName + " hidden";//Start hidden
        div.appendChild(activeCircle);
        
        this.div = div;
        this.activeCircle = activeCircle;
        this.index = index;
        this.normalClass = normalClass;
        this.onSelectedClass = onSelectedClass;
        this.onSelectedCallback = onSelectedCallback;
        
        this.selected = false;
    }
    
    setSelected (otherOptions)
    {
        otherOptions.forEach(function (card) {
            card.setUnselected();
        });
        
        this.selected = true;
        this.div.className = this.onSelectedClass;
        
        this.activeCircle.classList.remove("hidden");
        
        this.onSelectedCallback(this.index);
    }
    
    setUnselected ()
    {
        this.selected = false;
        this.div.className = this.normalClass;
        this.activeCircle.classList.add("hidden");
    }
}

function initializeStylePicker (element, normalClass, onSelectedClass, values, startSelected, onSelectedCallback)
{
    var options = [];
   
    while (element.firstChild)
        element.removeChild(element.firstChild);
    
    var i = 0;
    values.forEach(function (text) 
    {
        var holder = new SelectionOptionHolder(text, i, normalClass, onSelectedClass, onSelectedCallback);
        
        options.push(holder);
        element.appendChild(holder.div);
        
        i++;
    });
    
    options.forEach(function(card)
    {
        card.div.addEventListener("click", function () 
        {
            card.setSelected(options);
        });
    });
    
    options[startSelected].setSelected(options);
}
///////////////////////////////////////////////////////////
        /// SEARCH ///
///////////////////////////////////////////////////////////
function updatePageSearchFilter (page) 
{
    page.results.filter(page.filterMode);
    
    page.counters[0].textContent = page.results.rawOperators.attackers.length;
    page.counters[1].textContent = page.results.rawOperators.defenders.length;
    page.counters[2].textContent = page.results.rawRanks.length;
    page.counters[3].textContent = page.results.rawOperators.others.length;
    
    while (page.resultsBox.firstChild)
        page.resultsBox.removeChild(page.resultsBox.firstChild);
    
    page.cards = page.results.getCardList(page.operatorSelected, page.pageParams.onOperatorChanged.bind(page.pageParams));
    page.cards.forEach(function (card) {
        page.resultsBox.appendChild(card.card);
    });
}

function search (word = "")
{
    return new SearchResults(SEARCH_OPERATORS(word), SEARCH_RANKS(word));
}
///////////////////////////////////////////////////////////
        /// PAGE NAVIGATION ///
///////////////////////////////////////////////////////////
function setStep (step)
{
    window.location.hash = stepHashs[step];
}

function checkScrollSwitching ()
{
    var scroll = $(window).scrollTop();
    var lastSection = currentSection;
    
    if(scroll < 5)
    {
        currentSection = 0;
        randomButtonText.textContent = "Randomize";
        randomYinYang.src = "components/yinyang/yinyang.png";
    }
        
    else if(scroll < getTopOffset(pages[0]) + screen.height / 3)
    {
        currentSection = 1;
        randomButtonText.textContent = "Random Yin";
        randomYinYang.src = "components/yinyang/yin.png";
    }
        
    else if(scroll < getTopOffset(pages[1]) + screen.height / 3)
    {
        currentSection = 2;
        randomButtonText.textContent = "Random Yang";
        randomYinYang.src = "components/yinyang/yang.png";
    }
        
    else// if(scroll < $("#step3").getClientRect().getBoundingClientRect().top)
    {
        currentSection = 3;
        randomButtonText.textContent = "Randomize Options";
        randomYinYang.src = "components/yinyang/yinyang_frame.png";
    }
    
    updateActiveSection(lastSection);
}

function updateActiveSection (lastSection)
{
    if(lastSection == null || currentSection != lastSection)
    {
        for (var i = 0; i < navTabs.length; i++)
            navTabs[i][0].className = navTabs[i][0].className.replace("Active", "");
            
        if(currentSection == 0) //TOP
        {
            
        }
        else if (currentSection == 1) //Step1
        {
            navTabs[0][0].className = "navOptionActive";
        }
        else if (currentSection == 2) //Step2
        {
            navTabs[1][0].className = "navOptionActive";
        }
        else if (currentSection == 3) //Step3
        {
            navTabs[2][0].className = "navOptionActive";
        }
    }
}
///////////////////////////////////////////////////////////
        /// OPERATOR CARDS ///
///////////////////////////////////////////////////////////

/*
<div class='searchResultOperator'> 
    <div class='searchResultOperatorHeader'></div> 
    <div class='searchResultOperatorImgWrapper'>
        <img class='searchResultOperatorImg' ></img> 
    </div> 
</div>
*/
function makeCard ()
{
    var card = document.createElement("div");
    var cardJQ = $(card);
    card.classList.add("searchResultOperator");
    
    var header = document.createElement("div");
    header.classList.add("searchResultOperatorHeader");
    card.appendChild(header);
    
    var imgWrapper = document.createElement("div");
    imgWrapper.classList.add("searchResultOperatorImgWrapper");
    card.appendChild(imgWrapper);
    
    var img = document.createElement("img");
    img.classList.add("searchResultOperatorImg");
    imgWrapper.appendChild(img);
        
    return {
        card: card,
        cardJQ: cardJQ,
        header: header,
        headerJQ: $(header),
        img: img
    };
}

function makeOperatorCard (operator, callback)
{
    var card = makeCard();
    var color =  "#" + operator.color.color;
    
    card.header.textContent = operator.name;
    card.headerJQ.css("background-color", color);
    card.img.src = operator.baseIcon;
    
    card.cardJQ.hover(function(e)
    {
        $(this).css("box-shadow", e.type === "mouseenter" ? 
            "0px 3px 3px " + color + ", 3px 0px 3px " + color + ", -3px 0px 3px " + color + ", 0px -3px 3px " + color 
            : "1px 1px 2px #888");
    });
    
    card.operator = operator,
    card.rank = null;
    
    return new Card(card, callback);
}

function makeRankCard (rank, callback)
{
    var card = makeCard();
    var color =  "#" + rank.color;
    
    card.card.classList.add("searchResultOperatorRank");
        
    card.header.textContent = rank.name;
    card.headerJQ.css("background-color", color);
    card.img.src = rank.styles[0].icon;
    
    card.cardJQ.hover(function(e)
    {
        $(this).css("box-shadow", e.type === "mouseenter" ? 
            "0px 3px 3px " + color + ", 3px 0px 3px " + color + ", -3px 0px 3px " + color + ", 0px -3px 3px " + color 
          : "1px 1px 2px #888");
    });
    
    card.operator = null,
    card.rank = rank;
    
    return new Card(card, callback);
}

class Card 
{
    constructor(cardArgs, callback)
    {
        this.card = cardArgs.card;
        this.cardJQ = cardArgs.cardJQ;
        this.header = cardArgs.header;
        this.headerJQ = cardArgs.headerJQ;
        this.img = cardArgs.img;
        this.operator = cardArgs.operator;
        this.rank = cardArgs.rank;
        this.callback = callback;
        this.selected = false;
        this.startBGColor = this.cardJQ.css('background-color');
    }
    
    getStyleDescriptions ()
    {
        if(this.operator != null)
            return this.operator.getStyleDescriptions();
        else
            return this.rank.getStyleDescriptions();
    }
    
    getType ()
    {
        if(this.operator != null)
        {
            if(this.operator.type == Type.Attacker)
                return 0;
                
            else if(this.operator.type == Type.Defender)
                return 1;
                
            else if(this.operator.type == Type.Other)
                return 3;
        }
        else //Rank
            return 2;
                
    }
    
    getColor (darkenLighten = 0)
    {
        return lightenDarkenColor(("#" + (this.operator != null ? this.operator.color.color : this.rank.color)), darkenLighten);
    }
    
    getSelected ()
    {
        if(this.operator != null)
            return this.operator;
        else 
            return this.rank;
    }
    
    setSelected (allCardsToUnselect)
    {
        allCardsToUnselect.forEach(function (card) {
            card.setUnselected();
        });
        
        this.selected = true;
        this.cardJQ.css("background-color", this.getColor(15));
        
        this.callback(this);
    }
    
    setUnselected ()
    {
        this.selected = false;
        this.cardJQ.css("background-color", this.startBGColor);
    }
    
    toString() 
    {
        return "Card: " + this.card
        + "\nCardJQ" + this.cardJQ
        + "\nheader" + this.header
        + "\nheaderJQ" + this.headerJQ
        + "\nimg" + this.img
        + "\nrank" + this.rank
        + "\nselected" + this.selected
        + "\nstartBGColor" + this.startBGColor
        + "\ncallback" + this.callback;
    }
}

class SearchResults 
{
    constructor (operatorResults, rankResults)
    {
        this.rawOperators = operatorResults;
        this.rawRanks = rankResults;
        this.operators = Object.assign({}, operatorResults);
        this.ranks = rankResults.slice(0);
    }
    
    getAll (importantOnly = false)
    {
        var all = [];
        
        this.operators.attackers.forEach(function(attacker) {
            all.push(attacker);
        }); 
        
        this.operators.defenders.forEach(function(defender) {
            all.push(defender);
        }); 
        
        this.operators.others.forEach(function(other) {
            all.push(other);
        }); 
       
        if(!importantOnly)
            this.ranks.forEach(function(rank) {
                all.push(rank);
            });
        else
        {
            all.push(RANKS.COPPER_V.rank);
            all.push(RANKS.COPPER_IV.rank);
            all.push(RANKS.COPPER_I.rank);
            all.push(RANKS.BRONZE_I.rank);
            all.push(RANKS.SILVER_I.rank);
            all.push(RANKS.GOLD_I.rank);
            all.push(RANKS.PLAT_I.rank);
            all.push(RANKS.PLAT_II.rank);
            all.push(RANKS.PLAT_III.rank);
            all.push(RANKS.DIAMOND.rank);
        }
        
        return all;
    }
    
    getCardList (currentlySelected, onSelectedCallback)
    {
        var cards = [];
        
        this.operators.attackers.forEach(function(attacker) {
            cards.push(makeOperatorCard(attacker, onSelectedCallback));
        }); 
        
        this.operators.defenders.forEach(function(defender) {
            cards.push(makeOperatorCard(defender, onSelectedCallback));
        }); 
        
        this.ranks.forEach(function(rank) {
            cards.push(makeRankCard(rank, onSelectedCallback));
        }); 
        
        this.operators.others.forEach(function(other) {
            cards.push(makeOperatorCard(other, onSelectedCallback));
        }); 
        
        cards.forEach(function(card, i)
        {
            card.card.addEventListener("mousedown", function (e)
            {
                card.cardJQ.css("background-color", card.getColor(-50));
            });
            
            card.card.addEventListener("mouseout", function (e)
            {
                if(!card.selected)
                    card.cardJQ.css("background-color", card.startBGColor);
                else
                    card.cardJQ.css("background-color", card.getColor(15));
            });
   
            card.card.addEventListener("click", function (e)
            {
                card.setSelected(cards);
            });
            
            if(card.getSelected() == currentlySelected)
                card.setSelected(cards);
        });

        return cards;
    }
    
    filter(filterInt)
    {
        this.operators = Object.create(this.rawOperators);
        this.ranks = this.rawRanks.slice(0);
        
        if(filterInt == -1) //All
            return this;
            
        else if(filterInt == 0) //Attackers
        {
            this.operators.defenders = [];
            this.operators.others = [];
            this.ranks = [];
            
            return this;
        }   
        else if(filterInt == 1) //Defenders
        {
            this.operators.attackers = [];
            this.operators.others = [];
            this.ranks = [];
            
            return this;
        } 
        else if(filterInt == 2) //Ranks
        {
            this.operators.attackers = [];
            this.operators.defenders = [];
            this.operators.others = [];
            
            return this;
        } 
        else if(filterInt == 3) //Others
        {
            this.operators.attackers = [];
            this.operators.defenders = [];
            this.ranks = [];
            
            return this;
        }
    }
    
    getTotalResults()
    {
        return this.rawOperators.attackers.length 
            + this.rawOperators.defenders.length 
            + this.rawOperators.others.length 
            + this.rawRanks.length;
    }
    
    getShowingResults()
    {
        return this.operators.attackers.length 
            + this.operators.defenders.length 
            + this.operators.others.length 
            + this.ranks.length;
    }
}
///////////////////////////////////////////////////////////
        /// PAGE PARAMS ///
///////////////////////////////////////////////////////////
class PageParams 
{
    constructor (mode)
    {
        this.mode = mode;
        this.card = null;
        this.style = -1;
        this.backgroundColor = null;
        this.additionalColor = null;
    }
    
    onOperatorChanged(card)
    {
        this.card = card;
        onPageParamsChanged(this.mode, CARD, card); 
        
        this.onStyleChanged(card.getSelected().preferredStyle);
        this.onBackgroundColorChanged(card.getSelected().getHexColor());
    }
    
    onStyleChanged(style)
    {
        this.style = style;
        onPageParamsChanged(this.mode, STYLE, style); 
    }
    
    onBackgroundColorChanged(backgroundColor)
    {
        this.backgroundColor = backgroundColor;
        onPageParamsChanged(this.mode, BACKGROUND, backgroundColor); 
    }
    
    onAdditionalColorChanged(additionalColor)
    {
        this.additionalColor = additionalColor;
        onPageParamsChanged(this.mode, ADDITIONAL_COLOR, additionalColor); 
    }
    
    getDrawable ()
    {
        return this.card.getSelected().getDrawableFromStyle(this.mode, this.style, this.backgroundColor, this.additionalColor);
    }
}

//params: mode = const yin/yang,  argMode = const CARD/STYLE/BACKGROUND/FRAME_BORDER, value
//This function should only be called from inside the PageParams class.
function onPageParamsChanged (mode, argMode, arg)
{
    var page = YIN_YANG_PAGES[mode];
    
    if(mode != FRAME)
    {
        if(argMode == CARD)
        {
            //UPDATE UI
            for(var i = 0; i < page.counters.length; i++)
                $(page.counters[i]).css("background-color", "#555");
            
            $(page.counters[arg.getType()]).css("background-color", "#004bc4");
            
            initializeStylePicker(page.styleSelector, mode == YIN ? "styleSelectionOption" : "styleSelectionOptionActive", mode == YANG ? "styleSelectionOption" : "styleSelectionOptionActive", arg.getStyleDescriptions(), arg.getSelected().preferredStyle, page.pageParams.onStyleChanged.bind(page.pageParams));
    
            page.colorPickerField.css("background-color", arg.getSelected().getHexColor());
            page.colorPickerField[0].value = arg.getSelected().getHexColor();
            page.colorButtonReset.css("background-color", arg.getSelected().getHexColor());
            page.colorButtonReset[0].textContent = arg.getSelected().name/* + " - " + arg.getSelected().ctu.text*/;
            $.farbtastic(page.colorPicker).setColor(arg.getSelected().getHexColor());
            
            page.colorButtonReset[0].onclick = function () //DO NOT add listener. Replace exisiting one.
            {
                page.colorPickerField.css("background-color", arg.getSelected().getHexColor());
                page.colorPickerField[0].value = arg.getSelected().getHexColor();
                $.farbtastic(page.colorPicker).setColor(arg.getSelected().getHexColor());
            };
            
            if(arg.getSelected() == OTHERS.RECRUIT.operator)
            {
                if(page.recruitHatColorWrapper.classList.contains("hidden"))
                    page.recruitHatColorWrapper.classList.remove("hidden");
            }
            else 
            {
                if(!page.recruitHatColorWrapper.classList.contains("hidden"))
                    page.recruitHatColorWrapper.classList.add("hidden");
            }
        }
        else if(argMode == STYLE)
        {
            //No UI to update
        }
        else if(argMode == BACKGROUND)
        {
            //No UI to update
        }
        else if(argMode == ADDITIONAL_COLOR)
        {
            //No UI to update
        }
    }
    else 
        alert("FRAME UDPATE");
        
    drawW0keIcon();
}

function drawW0keIcon ()
{
    if(doneInit)
    {
        w0keiconDrawArgs.init(
            iconCanvas,
            iconContext,
            devCanvas,
            devContext,
            loadingIcon,
            bgSwap, 
            YIN_YANG_PAGES[YIN].pageParams.getDrawable(),
            YIN_YANG_PAGES[YANG].pageParams.getDrawable(),
            null);
            
        renderW0keIcon(w0keiconDrawArgs);
    }
}
///////////////////////////////////////////////////////////
        /// OTHER///
///////////////////////////////////////////////////////////
function setupCanvases ()
{
    loadingIcon = document.getElementById("loadingIcon");
    
	iconCanvas = document.getElementById("iconCanvas");
	iconCanvas.width = 2048;
	iconCanvas.height = 2048;
	iconContext = iconCanvas.getContext("2d");
	
	devCanvas = document.getElementById("devCanvas");
	devCanvas.width = 2048;
	devCanvas.height = 2048;
	devContext = devCanvas.getContext("2d");
	
	dummyIconCanvas = document.getElementById("dummyCanvas");
	dummyIconCanvas.width = 2048;
	dummyIconCanvas.height = 2048;
	dummyIconContext = dummyIconCanvas.getContext("2d");
	
	dummyDevCanvas = document.getElementById("dummyDevCanvas");
    dummyDevCanvas.width = 2048;
    dummyDevCanvas.height = 2048;
    dummyDevContext = dummyDevCanvas.getContext("2d");
}

const HEX_VALID_APLHA = "abcdefABCDEF";
function forceHex (string)
{
    if(string.charAt(0) == "#")
        string = string.substring(1, 7);
    else
        string = string.substring(0, 6);
        
    var ret = "#";
    for(var i = 0; i < string.length; i++)
        ret += validateChar(string.charAt(i));
        
    return ret;
    
    function validateChar (c)
    {
        for(var i = 0; i <= 9; i++)
            if(c == i)
                return c;
                
        for(var i = 0; i < HEX_VALID_APLHA.length; i++)
            if(c == HEX_VALID_APLHA.charAt(i))
                return c;
                
        return 'f';
    }
}

function getTopOffset (element)
{   
    element = element[0];
    
    var box = element.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var top  = box.top +  scrollTop - clientTop;

    return  Math.round(top);
    
}

function clamp (amount, min, max) 
{
    return Math.min(Math.max(amount, min), max);
}

/**found at: https://css-tricks.com/snippets/javascript/lighten-darken-color/ **/
function lightenDarkenColor(col, amount) 
{
    var usePound = false;
  
    if (col[0] == "#") 
    {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amount;
    var b = ((num >> 8) & 0x00FF) + amount;
    var g = (num & 0x0000FF) + amount;
 
    if (r > 255)
        r = 255;
    else if(r < 0)
        r = 0;
 
    if (b > 255)
        b = 255;
    else if (b < 0)
        b = 0;
 
    if (g > 255) 
        g = 255;
    else if (g < 0)
        g = 0;
 
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

/**found at: https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color **/
function invertColor(hex, bw = true)
{
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
        
    if (bw) 
    {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
    
    function padZero(str, len) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}

function downloadIcon ()
{
	try
	{
		$.ajax({
			url: 'php/stat.php',
			type: 'post',
			data: ({
				upperDrawableBackground:w0keiconDrawArgs.renderArgs[0],       //0
				upperDrawableBGColor:w0keiconDrawArgs.renderArgs[1],          //1
				upperDrawableIcon:w0keiconDrawArgs.renderArgs[2],             //2
				upperDrawableExtraColor:w0keiconDrawArgs.renderArgs[3],      //3
				upperDrawableBorder:w0keiconDrawArgs.renderArgs[4],           //4
				upperDrawableFrame:w0keiconDrawArgs.renderArgs[5],           //5
				
				lowerDrawableBackground:w0keiconDrawArgs.renderArgs[6],       //6
				lowerDrawableBGColor:w0keiconDrawArgs.renderArgs[7],          //7
				lowerDrawableIcon:w0keiconDrawArgs.renderArgs[8],           //8
				lowerDrawableExtraColor:w0keiconDrawArgs.renderArgs[9],       //9
				lowerDrawableBorder:w0keiconDrawArgs.renderArgs[10],           //10
				lowerDrawableFrame:w0keiconDrawArgs.renderArgs[11],           //11
				
				bgSwap:w0keiconDrawArgs.renderArgs[12]                     //12
			})
		});
	}
	catch (e)
	{
		console.log("Error sending built data: " + e);
	}
	
	var link = document.getElementById("imageDownloadLink");
	link.setAttribute("download", "W0keIcon." + w0keiconDrawArgs.renderArgs[13] + w0keiconDrawArgs.renderArgs[14] + ".png");
	link.setAttribute("href", iconCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
	link.click();
}

var newDelay = 3000;
var animTime = 1000;
var iconCount = 15;
function setupFeed ()
{
    var options = search().getAll(true);
    setInterval(function() {
        feedItem(options);
    }, newDelay);
}

function feedItem (options)
{
    var img = makeRandomImg();
    getRandomIcon(options, function() 
    {
        $(img).css("animation", "spinIn 1s ease 1");
        img.src = dummyIconCanvas.toDataURL();
        
        spawner.css("margin-left", "-69px");
        spawner[0].insertBefore(img, spawner[0].firstChild);
        
        //console.log(spawner[0].childElementCount)
        if(spawner[0].childElementCount > iconCount)
            spawner[0].removeChild(spawner[0].lastChild);
    
        slideRight();
    });
    
}

function slideRight ()
{
    spawner.animate({
        "margin-left": "0px"
    }, animTime);
}

function makeRandomImg ()
{
    var img = document.createElement("img");
    img.className = "spawnImg";
    
    return img;
}

function getRandomIcon (iconOptions, callback)
{
    var randUpper = Math.randMinMax(0, iconOptions.length - 1, true);
    var randLower = Math.randMinMax(0, iconOptions.length - 1, true);
    
    /*console.log(randUpper + " " + iconOptions[randUpper].name + " " + Math.randMinMax(0, iconOptions[randUpper].styles.length - 1, true) +
    "\n" + randLower + " " + iconOptions[randLower].name + " "+ Math.randMinMax(0, iconOptions[randLower].styles.length - 1, true))
    */

    var upperDrawable = iconOptions[randUpper].getDrawableFromStyle(
        YIN,
        Math.randMinMax(0, iconOptions[randUpper].styles.length - 1, true),
        iconOptions[randUpper].color.color,
        iconOptions[randUpper] == OTHERS.RECRUIT.operator ? GET_COLOR_BY_INDEX(Math.randMinMax(0, Object.keys(COLORS).length - 1, true)).color : null);
    
    var lowerDrawable = iconOptions[randLower].getDrawableFromStyle(
        YANG, 
        Math.randMinMax(0, iconOptions[randLower].styles.length - 1, true),
        iconOptions[randLower].color.color,
        iconOptions[randLower] == OTHERS.RECRUIT.operator ? GET_COLOR_BY_INDEX(Math.randMinMax(0, Object.keys(COLORS).length - 1, true)).color : null);

    dummyDrawArgs.init(
        dummyIconCanvas,
        dummyIconContext,
        dummyDevCanvas,
        dummyDevContext,
        null,
        Math.randMinMax(0, 100) < 25, //25% chance 
        upperDrawable,
        lowerDrawable
        );
        
    renderW0keIcon(dummyDrawArgs, callback);
}
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

