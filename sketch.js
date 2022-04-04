let snowman= class {

    constructor (name, height){
        this.name = name;
        this.height = height;
    }
    build(x,z){

        for(let i=0; i< this.height*1.5; i+=1.5){
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 4-i*0.75, segments: 32}, scene);
        sphere.position.y = -0.5+i;
        sphere.position.x = x;
        sphere.position.z = z;
        }

        var noseMaterial= new BABYLON.StandardMaterial("noseMaterial", scene);
        noseMaterial.diffuseColor = new BABYLON.Color3 (255, 200, 0);


        //nose
        var cone = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop:0, height: 3, tessellation: 96}, scene);
         cone.position.y= 2.85;
         cone.position.x= 0;
         cone.position.z= -0.7;
         cone.rotation = new BABYLON.Vector3(5, 0, 0);
         cone.material = noseMaterial;


        var eyeMaterial= new BABYLON.StandardMaterial("eyeMaterial", scene);
        eyeMaterial.diffuseColor = new BABYLON.Color3 (0,0,0);
        

        //eyes
        var eyeOne = BABYLON.MeshBuilder.CreateSphere("eyeOne", {diameter:.4, segments: 32}, scene);
        eyeOne.position.y = 3;
        eyeOne.position.x = -0.5;
        eyeOne.position.z = -0.7;
        eyeOne.material=eyeMaterial;     

        var eyeTwo= BABYLON.MeshBuilder.CreateSphere("eyeOne", {diameter:.4, segments: 32}, scene);
        eyeTwo.position.y = 3;
        eyeTwo.position.x = .5;
        eyeTwo.position.z = -0.7; 
        eyeTwo.material=eyeMaterial;

}
}
let scooter = new snowman('Scooter', 3);
console.log(scooter);


var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(5, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    for (i=0; i<1; i++){
    scooter.build(i,i);
}
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1, height: 3}, scene);

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});