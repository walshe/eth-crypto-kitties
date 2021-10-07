let isDameSelection;
let dameId;
let sireId;


var colors = Object.values(allColors())

var defaultDNA = {
    "headColor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    "tailColor" : 15,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }



function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    //dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnatail').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

function headColor(color,code, tokenId = "") {
    $(`#cat__head${tokenId}, #cat__chest${tokenId}`).css('background', '#' + color)  //This changes the color of the cat
    $('#bodycolorbadge').html('code: '+code) //This updates text of the badge next to the slider
    $(`#dnabody${tokenId}`).html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code, tokenId = "") {
    $(`#cat__mouth-contour${tokenId}, #cat__mouth-left${tokenId}, #cat__mouth-right${tokenId}`).css('background', '#' + color)  //This changes the color of the cat
    $('#mouthcodebadge').html('code: '+code) //This updates text of the badge next to the slider
    $(`#dnamouth${tokenId}`).html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earColor(color,code, tokenId = "") {
    $(`#leftEar${tokenId}, #rightEar${tokenId}`).css('background', '#' + color)  //This changes the color of the cat
    $('#earcolorbadge').html('code: '+code) //This updates text of the badge next to the slider
    $(`#dnaears${tokenId}`).html(code) //This updates the body color part of the DNA that is displayed below the cat

}

function tailColor(color,code, tokenId = "") {
    $(`#cat__tail${tokenId}`).css('background', '#' + color)  //This changes the color of the cat
    $('#tailcolorbadge').html('code: '+code) //This updates text of the badge next to the slider
    $(`#dnatail${tokenId}`).html(code) //This updates the body color part of the DNA that is displayed below the cat
}



//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num, tokenId = "") {

    $(`#dnashape${tokenId}`).html(num)
    switch (num) {
        case 1:
            normalEyes(tokenId)
            $(`#eyeshapebadge${tokenId}`).html('Basic') //badge
            break
        case 2:
            normalEyes(tokenId); //reset
            eyesType1(tokenId);
            $(`#eyeshapebadge${tokenId}`).html('Chill') //badge
            break           
        case 3:
            normalEyes(tokenId); //reset
            eyesType2(tokenId);
            $(`#eyeshapebadge${tokenId}`).html('Up') //badge
            break               
        default:
            console.log("not valid value", num)
            break     
    }
}

function decorationVariation(num, tokenId = "") {
    $(`#dnadecoration${tokenId}`).html(num)
    switch (num) {
        case 1:
            $(`#decorationpatternbadge${tokenId}`).html('Basic')
            normaldecoration(tokenId)
            break;
        case 2:
            $(`#decorationpatternbadge${tokenId}`).html('M shaped')
            normaldecoration(tokenId)
            decoration1(tokenId)
            break
        case 3:
            $(`#decorationpatternbadge${tokenId}`).html('Y shaped')
            normaldecoration(tokenId)
            decoration2(tokenId)
            break      
        default:
            console.log("invalid code");          
        
    }
}

function decorationMidColor(color, code, tokenId = "") {
    $('#decorationmidcolorbadge').html(code)
    $(`#dnadecorationMid${tokenId}`).html(code)
    $(`#midDot${tokenId}`).css('background', '#' + color)  //This changes the color of the cat
    
}

function decorationSidesColor(color, code, tokenId = "") {
    $('#decorationsidescolorbadge').html(code)
    $(`#dnadecorationSides${tokenId}`).html(code)
    $(`#cat__head-dots_first${tokenId}, #cat__head-dots_second${tokenId}`).css('background', '#' + color)  //This changes the color of the cat
    
}

function animations(val,tokenId = ""){
    $(`#dnaanimation${tokenId}`).html(val)
    
    switch(val){
        case 1:
            animationType1(tokenId)
            break;

        case 2:
            animationType2(tokenId)
            break;

        case 3:
            animationType3(tokenId)
            break;

        case 4:
            animationType4(tokenId)
            break;

        case 5:
            animationType5(tokenId)
            break;    

        case 6:
            animationType6(tokenId)
            break;        
    }
}

async function normalEyes(tokenId = "") {
    await $(`#cat__eye${tokenId}`).find('span').css('border', 'none')
}

async function eyesType1(tokenId = "") {
    await $(`#cat__eye${tokenId}`).find('span').css('border-top', '15px solid')
}

async function eyesType2(tokenId = "") {
    await $(`#cat__eye${tokenId}`).find('span').css('border-bottom', '15px solid')
}


async function normaldecoration(tokenId = "") {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $(`#cat__head-dots${tokenId}`).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $(`#cat__head-dots_first${tokenId}`).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $(`#cat__head-dots_second${tokenId}`).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration1(tokenId = "") {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $(`#cat__head-dots${tokenId}`).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $(`#cat__head-dots_first${tokenId}`).css({ "transform": "rotate(45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $(`#cat__head-dots_second${tokenId}`).css({ "transform": "rotate(-45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration2(tokenId = "") {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $(`#cat__head-dots${tokenId}`).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $(`#cat__head-dots_first${tokenId}`).css({ "transform": "rotate(135deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $(`#cat__head-dots_second${tokenId}`).css({ "transform": "rotate(-135deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function resetAnimation(tokenId = ""){
    $(`#cat__head${tokenId}`).removeClass("movingHead")
    $(`#leftEar${tokenId}`).removeClass("movingEarsLeft")
    $(`#rightEar${tokenId}`).removeClass("movingEarsRight")
    $(`#tail${tokenId}`).removeClass("movingTail")
    $(`#leftEar${tokenId}`).removeClass("attentionLeft")
    $(`#rightEar${tokenId}`).removeClass("attentionRight")
}

async function animationType1(tokenId = ""){
    resetAnimation()
    $(`#cat__head${tokenId}`).addClass("movingHead")
    $(`#leftEar${tokenId}`).addClass("movingEarsLeft")
    $(`#rightEar${tokenId}`).addClass("movingEarsRight")
    $(`#animationbadge${tokenId}`).html("Moving Head")
    
}

async function animationType2(tokenId = ""){
    //tail
    resetAnimation()
    $(`#cat__tail${tokenId}`).addClass("movingTail")
    $(`#animationbadge${tokenId}`).html("Tail")
}

async function animationType3(tokenId = ""){
    //ears only
    resetAnimation()
    $(`#leftEar${tokenId}`).addClass("movingEarsLeft")
    $(`#rightEar${tokenId}`).addClass("movingEarsRight")
    $(`#animationbadge${tokenId}`).html("Ears Only")
}

async function animationType4(tokenId = ""){
    //left ear
    resetAnimation()
    $(`#leftEar${tokenId}`).addClass("movingEarsLeft")
    $(`#animationbadge${tokenId}`).html("Left Ear")
}

async function animationType5(tokenId = ""){
    //right ear
    resetAnimation()
    $(`#rightEar${tokenId}`).addClass("movingEarsRight")
    $(`#animationbadge${tokenId}`).html("Right Ear")
}


async function animationType6(tokenId = ""){
    //attentive
    resetAnimation()
    $(`#leftEar${tokenId}`).addClass("attentionLeft")
    $(`#rightEar${tokenId}`).addClass("attentionRight")
    $(`#animationbadge${tokenId}`).html("Attentive")
}


function renderCat(dna, tokenId = "", generation){
    headColor(colors[dna.headColor],dna.headColor, tokenId)
    $('#bodycolor').val(dna.headColor)

    mouthColor(colors[dna.mouthColor],dna.mouthColor, tokenId)
    $('#mouthcolor').val(dna.mouthColor)

    tailColor(colors[dna.tailColor],dna.tailColor, tokenId)
    $('#tailcolor').val(dna.tailColor)

    earColor(colors[dna.earColor],dna.earsColor, tokenId)
    $('#earscolor').val(dna.earsColor)

    eyeVariation(dna.eyesShape, tokenId)
    $('#eyeshape').val(dna.eyesShape)

    decorationVariation(dna.decorationPattern, tokenId)
    $('#decorationpattern').val(dna.decorationPattern)

    decorationMidColor(colors[dna.decorationMidcolor], dna.decorationMidcolor, tokenId)
    $('#decorationmidcolor').val(dna.decorationMidcolor)

    decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor, tokenId)
    $('#decorationsidescolor').val(dna.decorationSidescolor)

    animations(dna.animation, tokenId);
    $('#animation').val(dna.animation)

    $(`#generation${tokenId}`).html(generation)    
}

async function buildSellOrCancelMarkup(tokenId){
    
    //call getOffer on marketplace to see if we have already have an offer up

    const offer = await getOffer(tokenId);
    console.log(`offer : ${JSON.stringify(offer)}`)
    
    if(offer.active){
        return `<span>Currently on Sale for ${web3.utils.fromWei(offer.price, 'ether')} ETH &nbsp;<a class="btn btn-danger btn-sm" id="cancel${tokenId}" href="javascript:">Cancel Sale</a></span>`
    }else{
        return `<span><a class="btn btn-success btn-sm" href="javascript:" id="sell${tokenId}">Sell me</a>&nbsp;<input type="number" step="0.01" id="ethAmount${tokenId}" class="form-control form-control-sm" type="text" width="115px" placeholder="ETH amount" maxlength="8" size="8"/></span>`
    }
    
    
}

async function buildBuyMarkup(kitty){

    console.log("kitty is ", kitty)
    
    return `<span>On sale for ${web3.utils.fromWei(kitty.price, 'ether')} ETH &nbsp;<a class="btn btn-danger btn-sm" id="buy${kitty.tokenId}" href="javascript:">Buy</a></span>`
    
}

async function createCatDiv(kitty, addSelectionOption = false, addSellOrCancelOption = false, addBuyOption = false){

    let tokenId = (kitty) ? kitty.tokenId : ""

    let html = `
        <div class="col-md-4">
            
            <div class="col-lg-4 catBox m-2 light-b-shadow" id="catBox${tokenId}">
                <div class="cat">
                    <div class="cat__ear">
                        <div id="leftEar${tokenId}" class="cat__ear--left">
                            <div class="cat__ear--left-inside"></div>
                        </div>
                        <div id="rightEar${tokenId}" class="cat__ear--right">
                            <div class="cat__ear--right-inside"></div>
                        </div>
                    </div>

                    <div id="cat__head${tokenId}" class="cat__head">
                        <div id="midDot${tokenId}" class="cat__head-dots">
                            <div class="cat__head-dots_first" id="cat__head-dots_first${tokenId}"></div>
                            <div class="cat__head-dots_second" id="cat__head-dots_second${tokenId}"></div>
                        </div>
                        <div class="cat__eye" id="cat__eye${tokenId}">
                            <div class="cat__eye--left">
                                <span class="pupil-left"></span>
                            </div>
                            <div class="cat__eye--right">
                                <span class="pupil-right"></span>
                            </div>
                        </div>
                        <div class="cat__nose"></div>

                        <div class="cat__mouth-contour" id="cat__mouth-contour${tokenId}"></div>
                        <div class="cat__mouth-left" id="cat__mouth-left${tokenId}"></div>
                        <div class="cat__mouth-right" id="cat__mouth-right${tokenId}"></div>

                        <div class="cat__whiskers-left"></div>
                        <div class="cat__whiskers-right"></div>
                    </div>

                    <div class="cat__body">

                        <div class="cat__chest" id="cat__chest${tokenId}"></div>

                        <div class="cat__chest_inner"></div>


                        <div class="cat__paw-left"></div>
                        <div class="cat__paw-left_inner"></div>


                        <div class="cat__paw-right"></div>
                        <div class="cat__paw-right_inner"></div>


                        <div id="cat__tail${tokenId}" class="cat__tail" id="cat__tail${tokenId}"></div>
                    </div>
                </div>
                ${(tokenId) ? 
                    `
                    <br>
                    <div class="dnaDiv" id="catDNA" style="width:max-content">
                        <b>
                        Token Id:<span>${tokenId}</span>
                        </b>
                        <br>
                        <b>
                        Gen:<span id="generation${tokenId}"></span>
                        </b>
                        <br>
                        <b>
                            DNA:
                            <!-- Colors -->
                            <span id="dnabody${tokenId}"></span>
                            <span id="dnamouth${tokenId}"></span>
                            <span id="dnaears${tokenId}"></span>
                            <span id="dnatail${tokenId}"></span>

                            <!-- Cattributes -->
                            <span id="dnashape${tokenId}"></span>
                            <span id="dnadecoration${tokenId}"></span>
                            <span id="dnadecorationMid${tokenId}"></span>
                            <span id="dnadecorationSides${tokenId}"></span>
                            <span id="dnaanimation${tokenId}"></span>
                            
                        </b>
                        <br><b><span id="eyeshapebadge${tokenId}"></span> eye shape</b>
                        <br><b><span id="decorationpatternbadge${tokenId}"></span> decoration pattern</b>
                        <br><b><span id="animationbadge${tokenId}"></span> animation</b>
                        ${(addSelectionOption == true) ? `<br><button id="parentSelectionButton${tokenId}">Select</button>` : ``} 
                        ${(addSellOrCancelOption == true) ? `<br>${await buildSellOrCancelMarkup(tokenId)}` : ``} 
                        ${(addBuyOption == true) ? `<br>${await buildBuyMarkup(kitty)}` : ``} 
                        

                    </div>
                <br>
                    ` : 
                    `<br>
                    <div class="dnaDiv" id="catDNA-">
                        <b>
                            DNA:
                            <!-- Colors -->
                            <span id="dnabody"></span>
                            <span id="dnamouth"></span>
                            <span id="dnaears"></span>
                            <span id="dnatail"></span>
        
                            <!-- Cattributes -->
                            <span id="dnashape"></span>
                            <span id="dnadecoration"></span>
                            <span id="dnadecorationMid"></span>
                            <span id="dnadecorationSides"></span>
                            <span id="dnaanimation"></span>
                            <span id="dnaspecial"></span>
                        </b>
                        <br>
                        
        
                    </div>`}
            </div>
            
        </div>
    `;
    
    return html;


}