var camera
var scene
var renderer

// 初始化对象，
function initObject(arr, depth){
    // 二维样条曲线  Catmull-Rom算法
    arr.push(arr[0])
    let arrVectors = []
    for (let i=0; i<arr.length; i++){
        // 2D样条曲线
        arrVectors.push(new THREE.Vector2(arr[i].x, arr[i].y))
    }
    let curve = new THREE.SplineCurve(arrVectors)
    let points = curve.getPoints(1000); //分段数100，返回101个顶点
    let shape = new THREE.Shape(points);
    return stretch(shape, depth)
}

// 拉伸
function stretch(shape, depth){
    // 拉伸相关配置
    console.log('depth: ' + depth )
    let extrudeSettings = {
        steps: 1,
        depth: depth || 1, // 拉伸厚度
        bevelEnabled: false,// 拉伸的图形是否为斜角
    };
    // 创建立体模型
    let geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    let material = new THREE.MeshBasicMaterial( { color: 0x210B61 } ); // 材质设置
    let mesh = new THREE.Mesh( geometry, material ) ;
    // scene.add()
    return mesh
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
}

function render(){
    renderer.render(scene, camera);
    result.rotateY(0.01)
    requestAnimationFrame(render)
}

//窗口大小变化监听
window.addEventListener('resize',onResize,false);

function init(arr1, arr2, depth){
    scene = new THREE.Scene()
    camera = initCamera()
    let axios = new  THREE.AxesHelper(90);
    new THREE.OrbitControls(camera)//创建控件对象
    // initDefaultLighting(scene)
    scene.add(axios)
    renderer = initRenderer()
    let object1 = initObject(arr1, depth)
    let object2 = initObject(arr2, depth)
    subtract(object1, object2)
    render()
}
