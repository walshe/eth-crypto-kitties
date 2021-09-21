
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

function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#bodycolorbadge').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__mouth-left, .cat__mouth-right').css('background', '#' + color)  //This changes the color of the cat
    $('#mouthcodebadge').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earColor(color,code) {
    $('.cat__ear--left, .cat__ear--right').css('background', '#' + color)  //This changes the color of the cat
    $('#earcolorbadge').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function tailColor(color,code) {
    $('.cat__tail').css('background', '#' + color)  //This changes the color of the cat
    $('#tailcolorbadge').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnatail').html(code) //This updates the body color part of the DNA that is displayed below the cat
}



//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeshapebadge').html('Basic') //badge
            break
        case 2:
            normalEyes(); //reset
            eyesType1();
            $('#eyeshapebadge').html('Chill') //badge
            break           
        case 3:
            normalEyes(); //reset
            eyesType2();
            $('#eyeshapebadge').html('Up') //badge
            break               
        default:
            console.log("not valid value")
            break     
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationpatternbadge').html('Basic')
            normaldecoration()
            break;
        case 2:
            $('#decorationpatternbadge').html('M shaped')
            normaldecoration()
            decoration1()
            break
        case 3:
            $('#decorationpatternbadge').html('Y shaped')
            normaldecoration()
            decoration2()
            break      
        default:
            console.log("invalid code");          
        
    }
}

function decorationMidColor(color, code) {
    $('#decorationmidcolorbadge').html(code)
    $('#dnadecorationMid').html(code)
    $('.cat__head-dots').css('background', '#' + color)  //This changes the color of the cat
    
}

function decorationSidesColor(color, code) {
    $('#decorationsidescolorbadge').html(code)
    $('#dnadecorationSides').html(code)
    $('.cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)  //This changes the color of the cat
    
}

function animations(val){
    $('#dnaanimation').html(val)
    
    switch(val){
        case 1:
            animationType1()
            break;

        case 2:
            animationType2()
            break;

        case 3:
            animationType3()
            break;

        case 4:
            animationType4()
            break;

        case 5:
            animationType5()
            break;    

        case 6:
            animationType6()
            break;        
    }
}

async function normalEyes() {
    await $('.cat__eye').find('span').css('border', 'none')
}

async function eyesType1() {
    await $('.cat__eye').find('span').css('border-top', '15px solid')
}

async function eyesType2() {
    await $('.cat__eye').find('span').css('border-bottom', '15px solid')
}


async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration1() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(-45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function decoration2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    await $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    await $('.cat__head-dots_first').css({ "transform": "rotate(135deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    await $('.cat__head-dots_second').css({ "transform": "rotate(-135deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function resetAnimation(){
    $("#head").removeClass("movingHead")
    $("#leftEar").removeClass("movingEarsLeft")
    $("#rightEar").removeClass("movingEarsRight")
    $("#tail").removeClass("movingTail")
    $("#leftEar").removeClass("attentionLeft")
    $("#rightEar").removeClass("attentionRight")
}

async function animationType1(){
    resetAnimation()
    $("#head").addClass("movingHead")
    $("#leftEar").addClass("movingEarsLeft")
    $("#rightEar").addClass("movingEarsRight")
    $('#animationbadge').html("Moving Head")
    
}

async function animationType2(){
    //tail
    resetAnimation()
    $("#tail").addClass("movingTail")
    $('#animationbadge').html("Tail")
}

async function animationType3(){
    //ears only
    resetAnimation()
    $("#leftEar").addClass("movingEarsLeft")
    $("#rightEar").addClass("movingEarsRight")
    $('#animationbadge').html("Ears Only")
}

async function animationType4(){
    //left ear
    resetAnimation()
    $("#leftEar").addClass("movingEarsLeft")
    $('#animationbadge').html("Left Ear")
}

async function animationType5(){
    //right ear
    resetAnimation()
    $("#rightEar").addClass("movingEarsRight")
    $('#animationbadge').html("Right Ear")
}


async function animationType6(){
    //attentive
    resetAnimation()
    $("#leftEar").addClass("attentionLeft")
    $("#rightEar").addClass("attentionRight")
    $('#animationbadge').html("Attentive")
}