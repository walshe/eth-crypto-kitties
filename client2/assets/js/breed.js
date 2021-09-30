function launchDameSelectionModel() {
  isDameSelection = true;
  //launch dialog
  $("#parentSelectionModal").modal("show");
}

function launchSireSelectionModel() {
  isDameSelection = false;
  //launch dialog
  $("#parentSelectionModal").modal("show");
}

function selectParent(tokenId) {
  console.log("isDameSelection", isDameSelection);
  console.log("tokenId", tokenId);

  $("#parentSelectionModal").modal("hide");

  let kitty = ownedKitties.filter((k) => k.tokenId == tokenId)[0];

  //addCatTemplateToRow("dameDiv", kitty.tokenId);
  let catDiv = createCatDiv(kitty, false);

  if (isDameSelection == true) {
    dameId = tokenId 
    $("#dameDiv").html("")
    $("#dameDiv").append(catDiv);
  } else if (isDameSelection == false) {
    sireId = tokenId 
    $("#sireDiv").html("")
    $("#sireDiv").append(catDiv);
  }

  $(`#catBox${kitty.tokenId}`).attr(
    "style",
    "padding-bottom: 175px !important"
  );

  let headColor = parseInt(kitty.genes.substring(0, 2));
  let mouth = parseInt(kitty.genes.substring(2, 4));
  let ears = parseInt(kitty.genes.substring(4, 6));
  let tail = parseInt(kitty.genes.substring(6, 8));
  let shape = parseInt(kitty.genes.substring(8, 9));
  let decoration = parseInt(kitty.genes.substring(9, 10));
  let decorationMid = parseInt(kitty.genes.substring(10, 12));
  let dnadecorationSides = parseInt(kitty.genes.substring(12, 14));
  let dnaanimation = parseInt(kitty.genes.substring(14, 15));

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
    kitty.tokenId,
    kitty.generation
  );


  if(dameId && sireId){
      $("#fuckButton").show();
  }else{
    $("#fuckButton").hide();
  }
}

$(document).ready(function () {
  console.log("loading kit into modal");

  $("#fuckButton").click(function(){
    breed(sireId, dameId)
  })

  for (let i = 0; i < ownedKitties.length; i++) {
    let catDiv = createCatDiv(ownedKitties[i], true);

    $("#catalogBreedCats").prepend(catDiv);
    $(`#catBox${ownedKitties[i].tokenId}`).attr(
      "style",
      "padding-bottom: 175px !important"
    );

    let headColor = parseInt(ownedKitties[i].genes.substring(0, 2));
    let mouth = parseInt(ownedKitties[i].genes.substring(2, 4));
    let ears = parseInt(ownedKitties[i].genes.substring(4, 6));
    let tail = parseInt(ownedKitties[i].genes.substring(6, 8));
    let shape = parseInt(ownedKitties[i].genes.substring(8, 9));
    let decoration = parseInt(ownedKitties[i].genes.substring(9, 10));
    let decorationMid = parseInt(ownedKitties[i].genes.substring(10, 12));
    let dnadecorationSides = parseInt(ownedKitties[i].genes.substring(12, 14));
    let dnaanimation = parseInt(ownedKitties[i].genes.substring(14, 15));

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
      ownedKitties[i].tokenId,
      ownedKitties[i].generation
    );

    $(`#parentSelectionButton${ownedKitties[i].tokenId}`).click(
      { tokenId: ownedKitties[i].tokenId },
      function (e) {
        console.log(e.data.tokenId);
        selectParent(e.data.tokenId);
      }
    );
  }


});
