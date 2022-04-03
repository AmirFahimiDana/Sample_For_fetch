async function getData(param) {
  let response = await fetch(`https://swapi.dev/api/${param}/`, {
    method: "GET",
  });

  if (response.status == 200) {
    let data = await response.json();
    return data;
  } else {
    throw new Error(response.status);
  }
}

function createMainSection() {
  let mainDiv = document.getElementById("mainSection");
  let main = document.createElement("main");
  main.id = "main";
  mainDiv.appendChild(main);
}

createMainSection();

const hamburgerMenu = document.getElementById("h-menu");
hamburgerMenu.addEventListener("click", () => {
  const hamburgerMenuPanel = document.getElementById("h-menu-panel");

  let bars = document.getElementById("bars");
  let xmark = document.getElementById("xmark");

  if (bars.style.display == "none") {
    xmark.style.display = "none";
    bars.style.display = "block";
    hamburgerMenuPanel.style.display = "none";
  } else if (bars.style.display == "block" || bars.style.display == "") {
    xmark.style.display = "block";
    bars.style.display = "none";
    hamburgerMenuPanel.style.display = "flex";
  }
});

const peopleMenuItem = document.getElementById("People");
peopleMenuItem.addEventListener("click", () => {
  resetForm();
  fillGrid("people");
});

const hPeopleMenuItem = document.getElementById("h-People");
hPeopleMenuItem.addEventListener("click", () => {
  resetForm();
  resetHamburgerMenuPanel();
  fillGrid("people");
});

const filmsMenuItem = document.getElementById("Films");
filmsMenuItem.addEventListener("click", () => {
  resetForm();
  fillGrid("films");
});

const hFilmsMenuItem = document.getElementById("h-Films");
hFilmsMenuItem.addEventListener("click", () => {
  resetForm();
  resetHamburgerMenuPanel();
  fillGrid("films");
});

const planetsMenuItem = document.getElementById("Planets");
planetsMenuItem.addEventListener("click", () => {
  resetForm();
  fillGrid("planets");
});

const hPlanetsMenuItem = document.getElementById("h-Planets");
hPlanetsMenuItem.addEventListener("click", () => {
  resetForm();
  resetHamburgerMenuPanel();
  fillGrid("planets");
});

function resetForm() {
  let gridContainer = document.getElementById("grid-header");
  gridContainer ? gridContainer.remove() : 1 == 1;
}

function resetHamburgerMenuPanel() {
  const hamburgerMenuPanel = document.getElementById("h-menu-panel");
  hamburgerMenuPanel.style.display = "none";
  let bars = document.getElementById("bars");
  let xmark = document.getElementById("xmark");
  bars.style.display = "block";
  xmark.style.display = "none";
}

function fillGrid(dataType) {
  let dataList = getData(dataType);

  let gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";
  gridContainer.id = "grid-header";

  let tableHeader = dataList.then((data) =>
    Object.keys(data.results[0])
      .slice(0, 8)
      .forEach((th) => {
        let gridItem = document.createElement("div");
        gridItem.className = "grid-header-item";
        gridItem.textContent = th;
        gridContainer.appendChild(gridItem);
      })
  );

  dataList
    .then((data) =>
      data.results.forEach((element) => {
        let i = 0;
        for (const key in element) {
          if (i === 8) break;
          i++;
          let gridItem = document.createElement("div");
          gridItem.className = "grid-item";
          gridItem.id = "item";
          gridItem.textContent = element[key];
          gridContainer.appendChild(gridItem);
        }
      })
    )
    .then((d) => {
      let gridItems = document.querySelectorAll(".grid-item");
      let detailSection = document.getElementById("detail-section");
      let ul = document.createElement("ul");

      for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].onclick = function clicked() {
          dataList.then((data) => {
            console.log(data.results[Math.floor(i / 8)]);
            data.results[Math.floor(i / 8)].forEach((detail) => {
              let li = document.createElement("li");
            })

          });
        };
      }
    });

  let main = document.getElementById("main");
  main.appendChild(gridContainer);
}