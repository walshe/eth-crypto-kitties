


$(document).ready(function(){

    console.log('loading catalogue with', ownedKitties)

    for(let i=0; i<ownedKitties.length; i++){

        console.log("loading cat into catelog page")
        let catDiv = createCatDiv(ownedKitties[i])

        $("#catalogCats").prepend(catDiv)
        $(`.catBox`).css("padding-bottom", "155px");

        let headColor = parseInt(ownedKitties[i].genes.substring(0,2))
        let mouth = parseInt(ownedKitties[i].genes.substring(2,4))
        let ears = parseInt(ownedKitties[i].genes.substring(4, 6))
        let tail = parseInt(ownedKitties[i].genes.substring(6,8))
        let shape = parseInt(ownedKitties[i].genes.substring(8,9))
        let decoration = parseInt(ownedKitties[i].genes.substring(9, 10))
        let decorationMid = parseInt(ownedKitties[i].genes.substring(10, 12))
        let dnadecorationSides = parseInt(ownedKitties[i].genes.substring(12, 14))
        let dnaanimation = parseInt(ownedKitties[i].genes.substring(14, 15))

        renderCat({
            "headColor" : headColor,
            "mouthColor" : mouth,
            "earsColor" : ears,
            "tailColor" : tail,
            "eyesShape" : shape,
            "decorationPattern" : decoration,
            "decorationMidcolor" :  decorationMid,
            "decorationSidescolor" :  dnadecorationSides,
            "animation" :   dnaanimation,
            "lastNum" :  1
            }, ownedKitties[i].tokenId, ownedKitties[i].generation)

        
        
    }

})