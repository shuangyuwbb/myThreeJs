//初始化相机
function initCamera() {
    let width = window.innerWidth; //窗口宽度
    let height = window.innerHeight; //窗口高度
    let k = width / height; //窗口宽高比
    let s = 10; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(10, 10, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    return camera
}
//初始化默认灯光
// function initDefaultLighting(scene) {
//     var point = new THREE.PointLight(0xff00cc);
//     point.position.set(400, 200, 300); //点光源位置
//     scene.add(point); //点光源添加到场景中
//     // 环境光设置
//     var ambient = new THREE.AmbientLight(0xff0000);
//     scene.add(ambient);
// }
// 初始化渲染器
function initRenderer() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xffffff));// 设置环境色
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvasId").appendChild(renderer.domElement);
    return renderer
}

// 差集计算
function subtract(obj1, obj2){
    let sphere1BSP = new ThreeBSP(obj1);
    let cube2BSP = new ThreeBSP(obj2);

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