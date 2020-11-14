var camera
var scene
var renderer
// var shape

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

function init(positions, isFill, polyFlag){
    let shape = drawLine(positions, isFill, polyFlag)
    stretch(shape)
    render()
}

function drawCircle(obj ,isFill){
    if(!isFill){
        let path = new THREE.Path()// path对象不会填充
        return path.arc(obj.x, obj.y, obj.radius, 0, 2*Math.PI)
    }else{
        let shape = new THREE.Shape();//shapes — 形状或者一个包含形状的数组,需要填充
        return shape.arc(obj.x, obj.y, obj.radius, 0, 2*Math.PI)
    }
}

function drawLine(arr, isFill, polyFlag){
    if(!isFill){
        let path = new THREE.Path()// path对象不会填充
        for (let i=0; i<arr.length; i++){
            if(i === 0){
                path.moveTo(arr[i].x, arr[i].y)
            }else if(i === arr.length - 1 && polyFlag !== undefined){
                path.lineTo(arr[0].x, arr[0].y)
            }else{
                path.lineTo(arr[i].x, arr[i].y)
            }
        }
        return path
    }else{
        let shape = new THREE.Shape();//shapes — 形状或者一个包含形状的数组,需要填充
        for (let i=0; i<arr.length; i++){
            if(i === 0){
                shape.moveTo(arr[i].x, arr[i].y)
            }else if(i === arr.length - 1 && polyFlag === true){
                shape.lineTo(arr[0].x, arr[0].y)
            }else{
                shape.lineTo(arr[i].x, arr[i].y)
            }
        }
        return shape
    }
    // 遍历数组将所有二维坐标连接成面
}

function stretch(shape){
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
    scene.add( mesh );
    // return mesh
}