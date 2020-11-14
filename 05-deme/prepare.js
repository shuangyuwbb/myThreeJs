//初始化相机
function initCamera() {
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 10; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(10, 10, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    return camera
}
//初始化默认灯光
function initDefaultLighting(scene) {
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    // 环境光设置
    var ambient = new THREE.AmbientLight(0xff00ff);
    scene.add(ambient);
}
// 初始化渲染器
function initRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x002200));// 设置环境色
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvasId").appendChild(renderer.domElement);
    return renderer
}
//初始化控制器
// function initControls() {
//     //定义控制器核心
//     var obtControls = new THREE.OrbitControls(camera, renderer.domElement);
//     //以下都是为了满足各种需求的各种控制器配置参数
//     obtControls.enableDampling = true; //使动画循环使用时阻尼或自转 意思是否有惯性
//     obtControls.enableZoom = true; //是否允许缩放
//     obtControls.enablePan = true; //是否开启鼠标右键拖拽
//     obtControls.autoRotate = false; //是否允许自动旋转
//     obtControls.dampingFactor = 0.25; //动态阻尼系数：就是鼠标拖拽旋转灵敏度
//     obtControls.minDistance = 200; //设置相机距离原点的最近距离；
//     obtControls.maxDistance = 1000; //设置相机距离原点的最远距离；
// }
// 差集计算
// 差集计算
function subtract(obj1, obj2){
    var sphere1BSP = new ThreeBSP(obj1);
    var cube2BSP = new ThreeBSP(obj2);

    resultBSP = cube2BSP.subtract(sphere1BSP);// 减掉
    /**
     * union 并集
     * subtract  差集
     * intersect 交集
     */
    result = resultBSP.toMesh();
    result.material.shading = THREE.FlatShading;
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();
    result.material.needsUpdate = true;
    result.geometry.buffersNeedUpdate = true;
    result.geometry.uvsNeedUpdate = true;
    scene.add(result);
}