// Licence GPLv3
// https://alvarotrigo.com/fullPage/extensions/requestKey.html

// pro ucely POC si nadefinujeme anchors, ve kterem roce se dany clanek nachazi, v realite bychom tohle mohli dostat i z databaze
/* const anchors = {
  2010: ['1', '2', '3'],
  2011: ['4', '5', '6'],
  2012: ['7', '8', '9'],
  2013: ['10', '11', '12'],
};
 */

const anchors = {
  1: ["1"],
  2024: [
    "2401",
    "2402",
    "2403",
    "2404",
    "2405",
    "2406",
    "2407",
    "2408",
    "2409",
    "2410",
    "2411",
    "2412",
  ],
  2025: ["2501", "2502"],
};

// instance fullpage.js - definujeme do global scope, abychom ji mohli pouzit v jinych funkcich
let fullpageInstance = null;

// pokazde vim odkud prichazim (origin) a kam jdu (destination), pripadne i smer pohybu (direction)
function handleSectionChange(origin, destination, direction) {
  // chytneme si navigaci ve strance pomoci selektoru
  const navbar = document.querySelector("nav > ul");

  // pokud nenajdeme navigaci, tak return
  if (navbar === null) {
    return;
  }

  // pokud neni definovany destination anchor, tak return
  if (typeof destination.anchor === "undefined") {
    return;
  }

  // pokud neni definovany origin anchor, tak return
  if (typeof origin.anchor === "undefined") {
    return;
  }

  // najdeme si vsehcny elementy v navigaci, ktere maji tridu active, abychom ji mohli pripadne odstranit, pokud dojde ke zmene sekce
  let activeSection = navbar.querySelectorAll(".active");

  // zjistim si, ve kterem roce se nachazi origin anchor a destination anchor
  let originAnchor = null;
  let destinationAnchor = null;

  Object.keys(anchors).forEach((anchor) => {
    const index = anchors[anchor].indexOf(origin.anchor);

    if (index !== -1) {
      originAnchor = anchor;
    }
  });

  Object.keys(anchors).forEach((anchor) => {
    const index = anchors[anchor].indexOf(destination.anchor);

    if (index !== -1) {
      destinationAnchor = anchor;
    }
  });

  // pokud se zmenil rok, tak odstranime tridu active z navigace
  if (originAnchor !== destinationAnchor) {
    // jeste si pro jistotu zkontroluju, ze activeSection neni null, aby nedoslo k chybe v JS
    if (activeSection !== null) {
      // activeSection je NodeList (querySelectorAll) viz vyse, takze musime pouzit forEach
      activeSection.forEach((section) => {
        section.classList.remove("active");
      });
    }
  }

  // najdu si pomoci data atributu v navigaci, ktery odkazuje na dany rok a pridam mu tridu active
  const anchorGroup = navbar.querySelector(
    `[data-anchor-group="${destinationAnchor}"] > a`
  );
  if (anchorGroup !== null && !anchorGroup.classList.contains("active")) {
    anchorGroup.classList.add("active");
  }
}

// az je nacteny obsah cele stranky, tak spustime fullpage
// ukladame si instanci do promenne, abychom mohli volat metody, pokud by bylo potreba - my jsme to nepotrebovali
document.addEventListener("DOMContentLoaded", () => {
  fullpageInstance = new fullpage("#fullpage", {
    // povolime scrollovani uvnitr sekce
    // tj. pokud nam content te sekce pretece, tak se nam zobrazi scrollbar a scollujeme nejdrive v ramci sekce a az pak se posuneme na dalsi clanek
    scrollOverflow: true,
    navigation: true,
    slidesNavigation: true,
    // po opusteni a po nacteni sekce pouzivame vlastni callback viz vyse
    onLeave: handleSectionChange,
    afterLoad: handleSectionChange,
  });
});
