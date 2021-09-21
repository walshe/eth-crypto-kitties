
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

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaears').html(defaultDNA.earsColor);
  $('#dnatail').html(defaultDNA.tailColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headColor],dna.headColor)
    $('#bodycolor').val(dna.headColor)

    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)

    tailColor(colors[dna.tailColor],dna.tailColor)
    $('#tailcolor').val(dna.tailColor)

    earColor(colors[dna.earColor],dna.earsColor)
    $('#earscolor').val(dna.earsColor)

    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)

    decorationVariation(dna.decorationPattern)
    $('#decorationpattern').val(dna.decorationPattern)


    decorationMidColor(colors[dna.decorationMidcolor], dna.decorationMidcolor)
    $('#decorationmidcolor').val(dna.decorationMidcolor)

    decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#decorationsidescolor').val(dna.decorationSidescolor)

    animations(dna.animation);
    $('#animation').val(dna.animation)

}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change(()=>{
  console.log("mouth color changed")
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#earcolor').change(()=>{
  console.log("ear color changed")
  var colorVal = $('#earcolor').val()
  earColor(colors[colorVal],colorVal)
})

$('#tailcolor').change(()=>{
  console.log("tail color changed")
  var colorVal = $('#tailcolor').val()
  tailColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  console.log("eye shape changed")
  var shape = parseInt($('#eyeshape').val()); //between 1 and 7
  eyeVariation(shape)
})

$('#decorationpattern').change(()=>{
  console.log("decorationpattern changed")
  var decorationpattern = parseInt($('#decorationpattern').val()); //between 1 and 7
  decorationVariation(decorationpattern);
})

$('#decorationmidcolor').change(()=>{
  console.log("decorationmidcolor changed")
  var decorationmidcolor = $('#decorationmidcolor').val(); 
  decorationMidColor(colors[decorationmidcolor],decorationmidcolor);
})

$('#decorationsidescolor').change(()=>{
  console.log("decorationsidescolor changed")
  var decorationsidescolor = $('#decorationsidescolor').val(); 
  decorationSidesColor(colors[decorationsidescolor],decorationsidescolor);
})

$('#animation').change(()=>{
  console.log("animations changed")
  var animationsVal = parseInt($('#animation').val()); 
  animations(animationsVal);
})

$('#randomKittyButton').click(()=>{
  console.log("randomKittyButton changed")

  //between 10 and 98: Math.floor(Math.random() * 89 ) + 10

  //between 1 and 7: Math.floor(Math.random() * 7 ) + 1
  
  renderCat({
    "headColor" : Math.floor(Math.random() * 89 ) + 10,
    "mouthColor" : Math.floor(Math.random() * 89 ) + 10,
    "eyesColor" : Math.floor(Math.random() * 89 ) + 10,
    "earsColor" : Math.floor(Math.random() * 89 ) + 10,
    "tailColor" : Math.floor(Math.random() * 89 ) + 10,
    "eyesShape" : Math.floor(Math.random() * 3 ) + 1,
    "decorationPattern" : Math.floor(Math.random() * 3 ) + 1,
    "decorationMidcolor" :  Math.floor(Math.random() * 89 ) + 10,
    "decorationSidescolor" :  Math.floor(Math.random() * 89 ) + 10,
    "animation" :   Math.floor(Math.random() * 6 ) + 1,
    "lastNum" :  1
    })
  
})

$('#defaultKittyButton').click(()=>{
  console.log("defaultKittyButton changed")
  renderCat(defaultDNA)
  
})

$('#newKittyButton').click(()=>{
  console.log("newKittyButton changed")
  
})
