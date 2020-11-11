// /*
// 初始化
//  */
// function init(){}
// /*
// 初始化场景
//  */
// function initScene(){
//     var scene = new THREE.Scene()
//     return scene
// }
// /*
// 初始化相机
//  */
// function initCamera(){
//     var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000)
//     camera.position.set(200, 100, 200)
//     camera.lookAt(new THREE.Vectos(0, 0, 0))
//     return camera
//
// }
// // 初始化渲染器
// function initRenderer() {
//     var renderer = new THREE.WebGLRenderer();
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMapSoft = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//
//     renderer.setClearColor(new THREE.Color(0x000000)); //设置渲染区域背景颜色
//     renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
//     renderer.shadowMap.enabled = true;
//     document.getElementById("entryNode").appendChild(renderer.domElement);
//     return renderer
// }


function tubiao(shape, x, y, z){
    var caddots = [{'x':0,'y':0},{'x':10,'y':20},{'x':150,'y':30},{'x':30,'y':40},{'x':10,'y':150},{'x':0,'y':0}];
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    var axis = new THREE.AxisHelper(250)
    scene.add(axis)
    if(shape == 'BoxGeometry'){
        var geometry = new THREE.BoxGeometry(x, y, z); //创建一个立方体几何对象Geometry
    }else if(shape == 'SphereGeometry'){
        var geometry = new THREE.SphereGeometry(x, y, z); //创建一个球体几何对象Geometry
    }else if(shape == 'CylinderGeometry'){
        var geometry = new THREE.CylinderGeometry(x); //创建一个球体几何对象Geometry
    }else if(shape == 'OctahedronGeometry'){
        var geometry = new THREE.OctahedronGeometry(x); //创建一个球体几何对象Geometry
    }else if(shape == 'DodecahedronGeometry'){
        var geometry = new THREE.DodecahedronGeometry(x); //创建一个球体几何对象Geometry
    }


    var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    scene.add(mesh); //网格模型添加到场景中
    /**
     * 光源设置
     */
        //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中

    var point = new THREE.PointLight(0xffffff);
    point.position.set(-400, -200, -300); //点光源位置
    scene.add(point); //点光源添加到场景中
//环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
// console.log(scene)
// console.log(scene.children)
    /**
     * 相机设置
     */
    var width = 800; //窗口宽度
    var height = 500; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 300, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    var div = document.getElementById('canvasId')
    div.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
    function render(){
        renderer.render(scene, camera);
        // mesh.rotateY(0.01)
        requestAnimationFrame(render)
    }
// setInterval("render()",20)
// var controls = new OrbitControls(scene)
    render()
    var controls = new THREE.OrbitControls(camera)//创建控件对象
    // 监听窗口变化
    window.addEventListener('resize', onResize, false)
    function onResize(){
        camera.aspect = window.innerWidth/window.innerHeight;//相机视角长宽比
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
    }
}