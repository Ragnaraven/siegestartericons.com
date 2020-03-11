<?php

$upperDrawableBackground = $_POST["upperDrawableBackground"];
$upperDrawableBGColor = $_POST["upperDrawableBGColor"];
$upperDrawableIcon = $_POST["upperDrawableIcon"];
$upperDrawableExtraColor = $_POST["upperDrawableExtraColor"];
$upperDrawableBorder = $_POST["upperDrawableBorder"];
$upperDrawableFrame = $_POST["upperDrawableFrame"];

$lowerDrawableBackground = $_POST["lowerDrawableBackground"];
$lowerDrawableBGColor = $_POST["lowerDrawableBGColor"];
$lowerDrawableIcon = $_POST["lowerDrawableIcon"];
$lowerDrawableExtraColor = $_POST["lowerDrawableExtraColor"];
$lowerDrawableBorder = $_POST["lowerDrawableBorder"];
$lowerDrawableFrame = $_POST["lowerDrawableFrame"];

$bgSwap = $_POST["bgSwap"];



$now = millitime();

echo $now . "<br>";

$allCount;
$count = 0;
$id = $now;

/***********************************
 * Potential Post
***********************************/
$xmlsaveloc = "../xml/stats.xml";

/* create a dom document with encoding utf8 */
$domtree = new DOMDocument('1.0', 'UTF-8');
$domtree->preserveWhiteSpace = false;
$domtree->formatOutput = true;
$domtree->load($xmlsaveloc);

$xmlRoot = $domtree->documentElement;
$icons = $xmlRoot->getElementsByTagName('icon');

foreach ($icons as $existingIcon)
{
    $upperDrawableBackgroundExisting =  $existingIcon->getElementsByTagName('upperDrawableBackground')->item(0)->nodeValue;
    $upperDrawableBGColorExisting =     $existingIcon->getElementsByTagName('upperDrawableBGColor')->item(0)->nodeValue;
    $upperDrawableIconExisting =        $existingIcon->getElementsByTagName('upperDrawableIcon')->item(0)->nodeValue;
    $upperDrawableExtraColorExisting =  $existingIcon->getElementsByTagName('upperDrawableExtraColor')->item(0)->nodeValue;
    $upperDrawableBorderExisting =      $existingIcon->getElementsByTagName('upperDrawableBorder')->item(0)->nodeValue;
    $upperDrawableFrameExisting =       $existingIcon->getElementsByTagName('upperDrawableFrame')->item(0)->nodeValue;
    
    $lowerDrawableBackgroundExisting =  $existingIcon->getElementsByTagName('lowerDrawableBackground')->item(0)->nodeValue;
    $lowerDrawableBGColorExisting =     $existingIcon->getElementsByTagName('lowerDrawableBGColor')->item(0)->nodeValue;
    $lowerDrawableIconExisting =        $existingIcon->getElementsByTagName('lowerDrawableIcon')->item(0)->nodeValue;
    $lowerDrawableExtraColorExisting =  $existingIcon->getElementsByTagName('lowerDrawableExtraColor')->item(0)->nodeValue;
    $lowerDrawableBorderExisting =      $existingIcon->getElementsByTagName('lowerDrawableBorder')->item(0)->nodeValue;
    $lowerDrawableFrameExisting =       $existingIcon->getElementsByTagName('lowerDrawableFrame')->item(0)->nodeValue;
    
    $bgSwapExisting = $existingIcon->getElementsByTagName('bgSwap')->item(0)->nodeValue;
   
    if(
        $upperDrawableBackground == $upperDrawableBackgroundExisting &&
        $upperDrawableBGColor == $upperDrawableBGColorExisting       &&
        $upperDrawableIcon == $upperDrawableIconExisting             &&
        $upperDrawableExtraColor == $upperDrawableExtraColorExisting &&
        $upperDrawableBorder == $upperDrawableBorderExisting         &&
        $upperDrawableFrame ==  $upperDrawableFrameExisting          &&
        
        $lowerDrawableBackground == $lowerDrawableBackgroundExisting &&
        $lowerDrawableBGColor == $lowerDrawableBGColorExisting       &&
        $lowerDrawableIcon == $lowerDrawableIconExisting             &&
        $lowerDrawableExtraColor == $lowerDrawableExtraColorExisting &&
        $lowerDrawableBorder == $lowerDrawableBorderExisting         &&
        $lowerDrawableFrame ==  $lowerDrawableFrameExisting          &&
        
        $bgSwap == $bgSwapExisting )
    {
        $count = $existingIcon->getElementsByTagName('count')->item(0)->nodeValue;
        $allCount = $existingIcon->getElementsByTagName('allCount')->item(0)->nodeValue;
        $id = $existingIcon->getElementsByTagName('id')->item(0)->nodeValue;
        
        echo "<br>Found existing post: " . $id . "<br>";
        
        $xmlRoot->removeChild($existingIcon);
        
        break;
    }
}

$icon = $domtree->createElement("icon");
$icon = $xmlRoot->appendChild($icon);

$icon->appendChild($domtree->createElement("upperDrawableBackground",   $upperDrawableBackground));
$icon->appendChild($domtree->createElement("upperDrawableBGColor",      $upperDrawableBGColor));
$icon->appendChild($domtree->createElement("upperDrawableIcon",         $upperDrawableIcon));
$icon->appendChild($domtree->createElement("upperDrawableExtraColor",   $upperDrawableExtraColor));
$icon->appendChild($domtree->createElement("upperDrawableBorder",       $upperDrawableBorder));
$icon->appendChild($domtree->createElement("upperDrawableFrame",        $upperDrawableFrame));

$icon->appendChild($domtree->createElement("lowerDrawableBackground",   $lowerDrawableBackground));
$icon->appendChild($domtree->createElement("lowerDrawableBGColor",      $lowerDrawableBGColor));
$icon->appendChild($domtree->createElement("lowerDrawableIcon",         $lowerDrawableIcon));
$icon->appendChild($domtree->createElement("lowerDrawableExtraColor",   $lowerDrawableExtraColor));
$icon->appendChild($domtree->createElement("lowerDrawableBorder",       $lowerDrawableBorder));
$icon->appendChild($domtree->createElement("lowerDrawableFrame",        $lowerDrawableFrame));

$icon->appendChild($domtree->createElement("bgSwap", $bgSwap));

$icon->appendChild($domtree->createElement("count", $count + ($allowStatChange ? 1 : 0))); //Legacy, maybe implemented in the future.
$icon->appendChild($domtree->createElement("allCount", $allCount + 1));

/* get the xml printed */
$domtree->save($xmlsaveloc);

function millitime ()
{
    return round(microtime(true) * 1000);
}

?>