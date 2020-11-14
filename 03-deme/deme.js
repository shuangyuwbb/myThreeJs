var camera
var scene
var renderer
var shape
function initObject(arr, depth){
    shape = new THREE.Shape();//shapes — 形状或者一个包含形状的数组。
    // 遍历数组将所有二维坐标连接成面
    for (let i=0; i<arr.length; i++){
        if(i === 0){
            shape.moveTo(arr[i].x, arr[i].y)
        }else if(i === arr.length - 1){
            shape.lineTo(arr[0].x, arr[0].y)
        }else{
            shape.lineTo(arr[i].x, arr[i].y)
        }
    }
    // 拉伸相关配置
    var extrudeSettings = {
        steps: 1,
        depth: depth || 1, // 拉伸厚度
        bevelEnabled: false,// 拉伸的图形是否为斜角
    };
    // 创建立体模型
    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var material = new THREE.MeshBasicMaterial( { color: 0xcccccc } ); // 材质设置
    var mesh = new THREE.Mesh( geometry, material ) ;
    // scene.add( mesh );
    return mesh
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
}

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}

//窗口大小变化监听
window.addEventListener('resize',onResize,false);

function init(arr1, arr2, depth){
    scene = new THREE.Scene()
    camera = initCamera()
    let axios = new  THREE.AxesHelper(90);
    new THREE.OrbitControls(camera)//创建控件对象
    initDefaultLighting(scene)
    scene.add(axios)
    renderer = initRenderer()
    if(arr2 !== undefined){
        var object1 = initObject(arr1, depth)
        var object2 = initObject(arr2, depth)
        subtract(object1, object2)
    }else{
        var object1 = initObject(arr1, depth)
    }
    render()
}
