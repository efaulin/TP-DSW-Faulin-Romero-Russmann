//Create a Pixi Application
const app = new PIXI.Application({width: 256, height: 256});
//Rendering parameters
app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);