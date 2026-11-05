const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;
let currGridRes = DEFAULT_GRID_SIZE;
let drawMode = "shader";

const gridContainer = document.querySelector("#grid-container");
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
    //return if opacity is max
    if(currOpacity == 1.0) return;
    if(drawMode === "rainbow") {
        //pixel not already shaded
        if(currOpacity == 0) {
            //generate random rgb values 
            target.style.setProperty("--r", Math.floor(Math.random()*256));
            target.style.setProperty("--g", Math.floor(Math.random()*256));
            target.style.setProperty("--b", Math.floor(Math.random()*256));
        }
    }
    else if(drawMode === "shader") {
        //generate black rgb values 
        target.style.setProperty("--r", 0);
        target.style.setProperty("--g", 0);
        target.style.setProperty("--b", 0);
    }
    //for both modes, increase opacity
    currOpacity += 0.1;
    //limit float to one decimal place to tackle float arthmetic accuracy issues
    currOpacity = Number(currOpacity.toFixed(1));
    //set the opacity
    target.style.setProperty("--shade-level", currOpacity);
});

const ctrlBar = document.querySelector(".control-bar");
ctrlBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    //click was not registered on a button
    if(!btn) return;
    //click was on a button
    switch(btn.id) {
        case "grid-size-btn": setGridSize();
        break;
        case "reset-grid-size-btn": resetGridSize();
        break;
        case "color-mode-btn": toggleColorMode(btn);
        break;
        case "clear-canvas-btn": clearCanvas();
        break;
    }
});
//1. Grid-size button 
//to take user input for grid size
function setGridSize() {
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
}

//2. Reset Grid Size button
//to reset grid size to default
function resetGridSize() {
    let cnf = confirm("Do you want to reset the grid size to default?");
    if(cnf) {
        currGridRes = DEFAULT_GRID_SIZE;
        createGrid(currGridRes);
    }
    else {
        console.log("Reset grid size operation aborted by user!");
    }
}

//3. Color Mode button
//to switch b/w the two available color modes
function toggleColorMode(btn) {
    //change from shader to rainbow
    if(drawMode === "shader") {
        drawMode = "rainbow";
        btn.textContent = "Mode: Rainbow";
    }
    //change from rainbow to shader
    else {
        drawMode = "shader";
        btn.textContent = "Mode: Shader";
    }
}

//4. Clear Canvas button
//to clear the canvas
function clearCanvas() {
    //select all the pixel(grids) in the grid container
    const grid = gridContainer.querySelectorAll(".pixel");
    //iterate over each pixel and reset shade-level and BG color
    grid.forEach((pixel) => {
        pixel.style.setProperty("--shade-level", "0");
        pixel.style.backgroundColor = "";
    });
}

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