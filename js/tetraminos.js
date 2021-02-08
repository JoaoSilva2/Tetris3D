let camera;
let scene;
let renderer;
let current;
let wait = false;
let time = 0;
let delta = 0;
let clock = new THREE.Clock();

const geometry = new THREE.BoxGeometry(5, 5, 5);
const edges = new THREE.BoxGeometry(5, 0.2, 0.2);
let controls;
const axes = new THREE.AxesHelper(10);

class Cube extends THREE.Object3D {
  constructor(material) {
    super();
    let edge_mat = new THREE.MeshBasicMaterial({color: 0xffffff});

    const cube = new THREE.Mesh(geometry, material);
    let edges1 = new THREE.Mesh(edges, edge_mat);
    let edges2 = new THREE.Mesh(edges, edge_mat);
    let edges3 = new THREE.Mesh(edges, edge_mat);
    let edges4 = new THREE.Mesh(edges, edge_mat);
    let edges5 = new THREE.Mesh(edges, edge_mat);
    let edges6 = new THREE.Mesh(edges, edge_mat);
    let edges7 = new THREE.Mesh(edges, edge_mat);
    let edges8 = new THREE.Mesh(edges, edge_mat);
    let edges9 = new THREE.Mesh(edges, edge_mat);
    let edges10 = new THREE.Mesh(edges, edge_mat);
    let edges11 = new THREE.Mesh(edges, edge_mat);
    let edges12 = new THREE.Mesh(edges, edge_mat);

    edges1.position.set(0, 2.5, 2.5);
    edges2.position.set(0, 2.5, -2.5);
    edges3.position.set(0, -2.5, 2.5);
    edges4.position.set(0, -2.5, -2.5);
    cube.add(edges1);
    cube.add(edges2);
    cube.add(edges3);
    cube.add(edges4);

    edges5.rotation.set(0, Math.PI / 2, 0);
    edges6.rotation.set(0, Math.PI / 2, 0);
    edges7.rotation.set(0, Math.PI / 2, 0);
    edges8.rotation.set(0, Math.PI / 2, 0);
    edges5.position.set(2.5, 2.5, 0);
    edges6.position.set(2.5, -2.5, 0);
    edges7.position.set(-2.5, 2.5, 0);
    edges8.position.set(-2.5, -2.5, 0);
    cube.add(edges5);
    cube.add(edges6);
    cube.add(edges7);
    cube.add(edges8);

    edges9.rotation.set(0, 0, Math.PI / 2);
    edges10.rotation.set(0, 0, Math.PI / 2);
    edges11.rotation.set(0, 0, Math.PI / 2);
    edges12.rotation.set(0, 0, Math.PI / 2);
    edges9.position.set(2.5, 0, 2.5);
    edges10.position.set(2.5, 0, -2.5);
    edges11.position.set(-2.5, 0, 2.5);
    edges12.position.set(-2.5, 0, -2.5);
    cube.add(edges9);
    cube.add(edges10);
    cube.add(edges11);
    cube.add(edges12);

    this.add(cube);
  }
}

//--------------------------Class Tetramino-------------------------------------
class Tetramino extends THREE.Object3D {
  constructor() {
    super();
    const shape = Math.floor(Math.random() * 7);

    /*switch (Math.floor(Math.random() * 4)) {
      case 0:
        this.IShape();
        break;
      case 1:
        this.LShape();
        break;
      case 2:
        this.Square();
        break;
      case 3:
        this.ASShape();
        break;
    }*/
    this.PShape();
  }

  //ISHAPE tetramino
  IShape() {
    this.material = new THREE.MeshBasicMaterial({color: 0x0DDBEC});

    const cube1 = new Cube(this.material);
    const cube2 = new Cube(this.material);
    const cube3 = new Cube(this.material);
    const cube4 = new Cube(this.material);

    cube1.position.set(-2.5, 2.5, 2.5);
    cube2.position.set(2.5, 2.5, 2.5);
    cube3.position.set(-7.5, 2.5, 2.5);
    cube4.position.set(7.5, 2.5, 2.5);

    this.add(cube1);
    this.add(cube2);
    this.add(cube3);
    this.add(cube4);
  }

  //LSHAPE tetramino
  LShape() {
    this.material = new THREE.MeshBasicMaterial({color: 0xFF971C});

    const cube1 = new Cube(this.material);
    const cube2 = new Cube(this.material);
    const cube3 = new Cube(this.material);
    const cube4 = new Cube(this.material);

    cube1.position.set(0, 0, 0);
    cube2.position.set(-5, 0, 0);
    cube3.position.set(5, 0, 0);
    cube4.position.set(-5, 5, 0);

    this.add(cube1);
    this.add(cube2);
    this.add(cube3);
    this.add(cube4);

    this.position.set(2.5, 2.5, 2.5);
  }

  Square() {
    this.material = new THREE.MeshBasicMaterial({color: 0xFFD500});

    const cube1 = new Cube(this.material);
    const cube2 = new Cube(this.material);
    const cube3 = new Cube(this.material);
    const cube4 = new Cube(this.material);

    cube1.position.set(2.5, 2.5, 0);
    cube2.position.set(-2.5, 2.5, 0);
    cube3.position.set(-2.5, -2.5, 0);
    cube4.position.set(2.5, -2.5, 0);

    this.add(cube1);
    this.add(cube2);
    this.add(cube3);
    this.add(cube4);

    this.position.set(0, 5, 2.5);
  }

  ASShape(){
    this.material = new THREE.MeshBasicMaterial({color: 0x72CB3B});

    const cube1 = new Cube(this.material);
    const cube2 = new Cube(this.material);
    const cube3 = new Cube(this.material);
    const cube4 = new Cube(this.material);

    cube1.position.set(-2.5, 2.5, 0);
    cube2.position.set(2.5, 2.5, 0);
    cube3.position.set(2.5, 7.5, 0);
    cube4.position.set(7.5, 7.5, 0);

    this.add(cube1);
    this.add(cube2);
    this.add(cube3);
    this.add(cube4);

    this.position.set(0, 0, 2.5);
  }

  check_colision() {
    let collides = false;
    this.traverse(function(node) {
      if(node instanceof Cube) {
        let pos = new THREE.Vector3();
        node.getWorldPosition(pos);
        console.log(pos.y);
        if(pos.y <= 2.5) {
          collides = true;
        }
      }
    });
    return collides;
  }

  PShape(){
    this.material = new THREE.MeshBasicMaterial({color: 0x72CB3B});

    const cube1 = new Cube(this.material);
    const cube2 = new Cube(this.material);
    const cube3 = new Cube(this.material);
    const cube4 = new Cube(this.material);
    const cube5 = new Cube(this.material);

    cube1.position.set(0, 0, 0);
    cube2.position.set(-5, 0, 0);
    cube3.position.set(5, 0, 0);
    cube4.position.set(0, 5, 0);
    cube5.position.set(0, 10, 0);

    this.add(cube1);
    this.add(cube2);
    this.add(cube3);
    this.add(cube4);
    this.add(cube5);

    this.position.set(0, 0, 2.5);
  }
}
//------------------------------------------------------------------------------

//Grid that composes the grid map
function gridMap(){
  const gridHelper1 = new THREE.GridHelper(50, 10);
  const gridHelper2 = new THREE.GridHelper(50, 10);
  const gridHelper3 = new THREE.GridHelper(50, 10);
  const gridHelper4 = new THREE.GridHelper(50, 10);
  const gridHelper5 = new THREE.GridHelper(50, 10);
  gridHelper2.rotateX(THREE.Math.degToRad(90));
  gridHelper3.rotateX(THREE.Math.degToRad(90));
  gridHelper2.position.set(0,25,25);
  gridHelper3.position.set(0,25,-25);
  gridHelper4.rotateZ(THREE.Math.degToRad(90));
  gridHelper5.rotateZ(THREE.Math.degToRad(90));
  gridHelper4.position.set(25,25,0);
  gridHelper5.position.set(-25,25,0);
  scene.add(gridHelper1);
  scene.add(gridHelper2);
  scene.add(gridHelper3);
  scene.add(gridHelper4);
  scene.add(gridHelper5);
}




function init(){
  renderer = new THREE.WebGLRenderer();

  scene = new THREE.Scene();
  scene.add(axes);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 300);
  camera.position.set(0,0,50);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene.add(new Tetramino());
  gridMap();
}

function animate() {
  requestAnimationFrame(animate);
  delta = clock.getDelta()
  /*if(wait){
    time += delta
    if(time > 1){
      current.position.y -= 5;
      time = 0;
      console.log(wait);
      if(current.check_colision()){
        wait = false;
      }
    }
  }
  else{
    current = new Tetramino();
    current.position.set(0,50,2.5);
    scene.add(current);
    wait = true;
  }*/

  controls.update();
  renderer.render(scene, camera);
}
