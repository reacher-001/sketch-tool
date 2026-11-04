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

//to take user input for grid size
const setGridSize = document.querySelector("#grid-size-btn");
setGridSize.addEventListener('click', (e) => {
    const size = prompt("Enter your custom NxN grid size");
    //user clicked cancel or pressed esc
    if(size === null) {
        console.log("Aborted input operation");
        return;
    }
    //user entered a value
    else {
        const intSize = Number.parseInt(size, 10);
        //user entered a value but not a valid one
        if(isNaN(intSize)){
            alert("You have not entered a number, enter a number between 0 to 100");
            return;
        } 
        else if(intSize < 0 || intSize >= MAX_GRID_SIZE) {
            alert("Value out of range, enter a number between 0 and 100");
            return;
        }
        //user entered a valid size
        createGrid(intSize);
    }
});
//helper to create a grid of size  NxN
function createGrid(N) {
    //1. clear existing content from grid
    gridContainer.replaceChildren();
    //2. calculate grid sizing proportion
    let size = 100/N;
    //3. create grid
    for(let i = 0; i < N*N; i++) {
        let pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        gridContainer.appendChild(pixel);
    }
}

//bootstrap-default grid which is loaded initially
createGrid(DEFAULT_GRID_SIZE);