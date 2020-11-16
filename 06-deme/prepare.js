//初始化相机
function initCamera() {
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 0.1; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(10, 10, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    return camera
}
//初始化默认灯光
function initDefaultLighting(scene) {

    let point = new THREE.PointLight();
    point.position.set(100, 100, 100) //点光源位置
    scene.castShadow = true
    point.castShadow = true
    scene.add(point); //点光源添加到场景中
    // 环境光设置
    var ambient = new THREE.AmbientLight(0x003300);
    scene.add(ambient);
}
// 初始化渲染器
function initRenderer() {

    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMapType=THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    return renderer
}

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