// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let setSize;

const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  createControls();
  //createSkybox();
  manualSkyBox();
  createLights();
  loadModels();
  // loadModels2();
  createRenderer();

  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 10000 );
  camera.position.set( 15, 44, 65);

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}
function createSkybox(){
SkyboxTexture = new THREE.CubeTextureLoader()
  					.setPath('../textures/dystopian/')
  					.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
//SkyboxTexture.encoding = THREE.sRGBEncoding;
SkyboxTexture.mapping = THREE.CubeRefractionMapping;
//other mappings to try:
/*
THREE.UVMapping
THREE.CubeReflectionMapping
THREE.CubeRefractionMapping
THREE.EquirectangularReflectionMapping
THREE.EquirectangularRefractionMapping
THREE.CubeUVReflectionMapping
THREE.CubeUVRefractionMapping
*/
scene.background = SkyboxTexture;
}
function manualSkyBox() {

var texture0 = new THREE.TextureLoader().load( 'textures/mayhem2/flame_bk.jpg' );
var texture1 = new THREE.TextureLoader().load( 'textures/mayhem2/flame_lf.jpg' );
var texture2 = new THREE.TextureLoader().load( 'textures/mayhem2/flame_up.jpg' );
var texture3 = new THREE.TextureLoader().load( 'textures/mayhem2/flame_dn.jpg' );
var texture4 = new THREE.TextureLoader().load( 'textures/mayhem2/flame_rt.jpg' );
var texture5 = new THREE.TextureLoader().load( 'textures/mayhem2/flame_ft.jpg' );
var materials = [
    new THREE.MeshBasicMaterial( { map: texture0, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture1, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture2, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture3, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture4, side: THREE.BackSide } ),
    new THREE.MeshBasicMaterial( { map: texture5, side: THREE.BackSide } )
];
  // var faceMaterial = new THREE.MeshFaceMaterial( materials );
  // faceMaterial.side = THREE.DoubleSide;
  // var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  var geometry = new THREE.BoxBufferGeometry(8500, 8500, 8500);
  var ManualSkyBox = new THREE.Mesh( geometry, materials );
  // ManualSkyBox.scale.set(1000, 1000, 1000);
  scene.add( ManualSkyBox );
}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

    model.rotation.x = 90;
    model.rotation.y = 120;


  const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();

    //var newMesh = new THREE.MESH()

    scene.add( model );
		scene.add(gltf.animations);

};
// the loader will report the loading progress to this function
const onProgress = () => {};

// the loader will send any error messages to this function, and we'll log
// them to to console
const onError = errorMessage => { console.log(errorMessage); };

// load the first model. Each model is loaded asynchronously,
// so don't make any assumption about which one will finish loading first
// const parrotPosition2 = new THREE.Vector3(-1.5, -1.7, 0);
// loader.load( '../models/Ameythst_Cleaned.glb', gltf => onLoad( gltf, parrotPosition2 ), onProgress, onError );
// const parrotPosition = new THREE.Vector3( 0, 0, 0 );
// loader.load( '../models/monster_circus/scene.gltf', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );
const parrotPosition2 = new THREE.Vector3(-1.5, -1.7, -2);
loader.load( 'models/cherry_tree13_mesh/scene.gltf', gltf => onLoad( gltf, parrotPosition2 ), onProgress, onError );
}

  function loadModels2() {

    const loader = new THREE.GLTFLoader();

    // A reusable function to set up the models. We're passing in a position parameter
    // so that they can be individually placed around the scene
    const onLoad = ( gltf, position ) => {

      const model = gltf.scene.children[ 0 ];
      model.position.copy( position );


    /*const animation = gltf.animations[ 0 ];

      const mixer = new THREE.AnimationMixer( model );
      mixers.push( mixer );

      const action = mixer.clipAction( animation );
      action.play();

      //var newMesh = new THREE.MESH()
      */
      scene.add( model );
  		scene.add(gltf.animations);

    };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = errorMessage => { console.log(errorMessage); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  const parrotPosition = new THREE.Vector3( 0, 0, 0 );
	const parrotPosition2 = new THREE.Vector3(-1.5, -1.7, 0);
  //loader.load( '../models/dancing_running_man/Dancing_trump.glb', gltf => onLoad( gltf, parrotPosition2 ), onProgress, onError );
	loader.load( '../models/monster_circus/scene.gltf', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );


  //const flamingoPosition = new THREE.Vector3( 7.5, 0, -10 );
  //loader.load( 'models/Flamingo.glb', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );

  //const storkPosition = new THREE.Vector3( 0, -2.5, -10 );
  //loader.load( 'models/Stork.glb', gltf => onLoad( gltf, storkPosition ), onProgress, onError );

}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;



  container.appendChild( renderer.domElement );

}

function update() {

  const delta = clock.getDelta();

  for ( const mixer of mixers ) {

     mixer.update( delta );
   }


}

function render() {

  //console.log(camera.position);

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

init();
