var scene;
function initScene(){
    scene = new THREE.Scene()
}

var shape
function initObject(){
    shape = new THREE.Shape();//shapes — 形状或者一个包含形状的数组。
    shape.moveTo( 0, 2 );
    shape.lineTo( 2, 3 );
    shape.lineTo( 3, 2 );
    shape.lineTo( 3, 1 );
    shape.lineTo( 1, 0 );
    shape.lineTo( 0, 2 );

    var extrudeSettings = {
        steps: 1,
        depth: 1, // 拉伸厚度
        bevelEnabled: false,// 拉伸的图形是否为斜角
        // bevelThickness: 1, //设置原始形状上斜角的厚度。默认值为6。
        // bevelSize: 1,// 斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-2。
        // bevelSegments: 1 //斜角的分段层数
    };

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var mesh = new THREE.Mesh( geometry, material ) ;
    scene.add( mesh );
}

var camera;
//初始化相机
function initCamera() {
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 15; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}


//初始化默认灯光
function initDefaultLighting(scene) {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-1000, 1000, 1000)
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.fov = 15;
    spotLight.castShadow = true;
    spotLight.decay = 2;
    spotLight.penumbra = 0.05;
    spotLight.name = "spotLight"

    scene.add(spotLight);

    var ambientLight = new THREE.AmbientLight(0x444444);
    ambientLight.name = "ambientLight";
    scene.add(ambientLight);

    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

}

var renderer;
function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById("canvasId").appendChild(renderer.domElement);
}

function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}

//初始化控制器
var obtControls; //定义控制器变量
function initControls() {
    //定义控制器核心
    obtControls = new THREE.OrbitControls(camera, renderer.domElement);

    // 如果使用animate方法时，将此函数删除
    // controls.addEventListener('change', render);
    //以下都是为了满足各种需求的各种控制器配置参数
    obtControls.enableDampling = true; //使动画循环使用时阻尼或自转 意思是否有惯性
    obtControls.enableZoom = true; //是否允许缩放
    obtControls.enablePan = true; //是否开启鼠标右键拖拽
    obtControls.autoRotate = false; //是否允许自动旋转
    obtControls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
    obtControls.minDistance = 200; //设置相机距离原点的最近距离；
    obtControls.maxDistance = 1000; //设置相机距离原点的最远距离；

}
//窗口大小变化监听
window.addEventListener('resize',onResize,false);

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
}

function init(){
    console.log('div')
    initScene()
    // initDefaultLighting(scene)
    initObject()
    initCamera()
    initRenderer()
    initControls()
    render()
}
