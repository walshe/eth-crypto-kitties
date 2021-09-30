


$(document).ready(function () {

    //listeners
    $('#bodycolor').change(() => {
        var colorVal = $('#bodycolor').val()
        headColor(colors[colorVal], colorVal)
    })

    $('#mouthcolor').change(() => {
        console.log("mouth color changed")
        var colorVal = $('#mouthcolor').val()
        mouthColor(colors[colorVal], colorVal)
    })

    $('#earcolor').change(() => {
        console.log("ear color changed")
        var colorVal = $('#earcolor').val()
        earColor(colors[colorVal], colorVal)
    })

    $('#tailcolor').change(() => {
        console.log("tail color changed")
        var colorVal = $('#tailcolor').val()
        tailColor(colors[colorVal], colorVal)
    })

    $('#eyeshape').change(() => {
        console.log("eye shape changed")
        var shape = parseInt($('#eyeshape').val()); //between 1 and 7
        eyeVariation(shape)
    })

    $('#decorationpattern').change(() => {
        console.log("decorationpattern changed")
        var decorationpattern = parseInt($('#decorationpattern').val()); //between 1 and 7
        decorationVariation(decorationpattern);
    })

    $('#decorationmidcolor').change(() => {
        console.log("decorationmidcolor changed")
        var decorationmidcolor = $('#decorationmidcolor').val();
        decorationMidColor(colors[decorationmidcolor], decorationmidcolor);
    })

    $('#decorationsidescolor').change(() => {
        console.log("decorationsidescolor changed")
        var decorationsidescolor = $('#decorationsidescolor').val();
        decorationSidesColor(colors[decorationsidescolor], decorationsidescolor);
    })

    $('#animation').change(() => {
        console.log("animations changed")
        var animationsVal = parseInt($('#animation').val());
        animations(animationsVal);
    })

    $('#randomKittyButton').click(() => {
        console.log("randomKittyButton clicked")

        //between 10 and 98: Math.floor(Math.random() * 89 ) + 10

        //between 1 and 7: Math.floor(Math.random() * 7 ) + 1

        renderCat({
            "headColor": Math.floor(Math.random() * 89) + 10,
            "mouthColor": Math.floor(Math.random() * 89) + 10,
            "eyesColor": Math.floor(Math.random() * 89) + 10,
            "earsColor": Math.floor(Math.random() * 89) + 10,
            "tailColor": Math.floor(Math.random() * 89) + 10,
            "eyesShape": Math.floor(Math.random() * 3) + 1,
            "decorationPattern": Math.floor(Math.random() * 3) + 1,
            "decorationMidcolor": Math.floor(Math.random() * 89) + 10,
            "decorationSidescolor": Math.floor(Math.random() * 89) + 10,
            "animation": Math.floor(Math.random() * 6) + 1,
            "lastNum": 1
        })

    })

    $('#defaultKittyButton').click(() => {
        console.log("defaultKittyButton clicked")
        renderCat(defaultDNA)

    })

    //created the random or default kitty
    $('#createKittyButton').click(() => {
        console.log("newKittyButton clicked ", getDna())

        alert("TODO need to add the DNA section underneath cats in factory")


        createKittyInBlockchain(getDna())

    })

    //

    console.log('loading factory')

    let catDiv = createCatDiv()

    $("#factoryCat").prepend(catDiv)

    renderCat(defaultDNA, undefined, undefined)


})