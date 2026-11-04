const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;

const gridContainer = document.querySelector("#grid-container");
const ctrlBar = document.querySelector(".control-bar");

//to detect mouse movement over pixels
gridContainer.addEventListener("mouseover", (e) => {
    const target = e.target.closest(".pixel");
    //target which triggered the event is not a pixel
    if(!target) return;
    //else
    //read current opacity value
    const currPixel = window.getComputedStyle(target);
    //convert string to float
    let currOpacity = Number.parseFloat(currPixel.getPropertyValue("--shade-level"));
    if(currOpacity < 1.0) {
        //increase current opacity
        currOpacity += 0.1;
        //limit float tp one decimal place to tackle float arthmetic accuracy issues
        currOpacity = Number(currOpacity.toFixed(1));
        //set the opacity
        target.style.setProperty("--shade-level", currOpacity);
    }
});

//helper to create a grid of size  NxN
function createGrid(N) {
    //1. clear existing content from grid
    gridContainer.innerHTML = "";
    //2. calculate grid sizing proportion
    let size = 100/N;
    //3. create grid
    for(let i = 0; i < N*N; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.flexBasis = `${size}%`;
        gridContainer.appendChild(pixel);
    }
}

//bootstrap-default grid which is loaded initially
createGrid(DEFAULT_GRID_SIZE);