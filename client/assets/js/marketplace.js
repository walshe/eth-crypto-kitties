$(document).ready(async function () {
  

  await initMarketplace();

  console.log(`loading market place: ${JSON.stringify(kittiesForSale)}`)
  
  for (var i = 0; i < kittiesForSale.length; i++) {
    
    console.log("loading cat into catelog page");

    let catDiv = await createCatDiv(kittiesForSale[i], false, false, true);

    $("#marketPlaceCats").prepend(catDiv);
    $(`.catBox`).css("padding-bottom", "200px");

    let headColor = parseInt(kittiesForSale[i].genes.substring(0, 2));
    let mouth = parseInt(kittiesForSale[i].genes.substring(2, 4));
    let ears = parseInt(kittiesForSale[i].genes.substring(4, 6));
    let tail = parseInt(kittiesForSale[i].genes.substring(6, 8));
    let shape = parseInt(kittiesForSale[i].genes.substring(8, 9));
    let decoration = parseInt(kittiesForSale[i].genes.substring(9, 10));
    let decorationMid = parseInt(kittiesForSale[i].genes.substring(10, 12));
    let dnadecorationSides = parseInt(kittiesForSale[i].genes.substring(12, 14));
    let dnaanimation = parseInt(kittiesForSale[i].genes.substring(14, 15));

    renderCat(
      {
        headColor: headColor,
        mouthColor: mouth,
        earsColor: ears,
        tailColor: tail,
        eyesShape: shape,
        decorationPattern: decoration,
        decorationMidcolor: decorationMid,
        decorationSidescolor: dnadecorationSides,
        animation: dnaanimation,
        lastNum: 1,
      },
      kittiesForSale[i].tokenId,
      kittiesForSale[i].generation
    );

    //debugger
    $(`#buy${kittiesForSale[i].tokenId}`).click(
        { tokenId: kittiesForSale[i].tokenId, price: kittiesForSale[i].price },
        async function (e) {
          
          //console.log(`tokenId : ${e.data.tokenId} price ${e.data.price}`);
          await buyKitty(e.data.tokenId, e.data.price)
          //loadPage("./catalogue.html")
  
        }
      );
  }
});
