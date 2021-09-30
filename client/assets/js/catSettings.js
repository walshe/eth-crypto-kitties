
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


function addCatTemplateToRow(rowId, tokenId = ""){
    
    $(`#${rowId}`).prepend(
    `
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
                <div id="midDot" class="cat__head-dots" id="cat__head-dots${tokenId}">
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


                <div id="tail${tokenId}" class="cat__tail" id="cat__tail${tokenId}"></div>
            </div>
        </div>
        

    </div>
    `);
    
    if(!tokenId){
        $(`#catBox`).append(`
            <br>
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
                

            </div>
        `);
    }else{
        $(`.catBox`).css("padding-bottom", "155px");
        $(`#catBox${tokenId}`).append(`
            <br>
                <div class="dnaDiv" id="catDNA">
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
                    

                </div>
            <br>
        `);    
    }

    


}

