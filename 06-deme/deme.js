var camera
var scene
var renderer

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight)
}

function render(){
    renderer.render(scene, camera);
    mesh.rotateY(0.01)
    mesh.rotateZ(0.01)
    mesh.rotateX(0.001)
    requestAnimationFrame(render)
}

//窗口大小变化监听
window.addEventListener('resize',onResize,false);

function init(arr){
    let shapes = []
    let paths = []
    for (let item of arr){
        shape = drawLine(item)
        if(shape.type === 'Path'){
            paths.push(shape)
        }else{
            shapes.push(shape)
        }
    }
    if(paths[0]){
        shapes[0].holes.push(...paths)
        if(shapes.length>1) {
            alert('more than one shapes:'+ shapes.length)
        }
    }
    stretch(shapes)
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

function drawLine(arr){

    if(arr[0].isFill){
        let shape = new THREE.Shape();//shapes — 形状或者一个包含形状的数组,需要填充
        for (let i=2; i<=arr.length; i++){
            if(i === 2){
                shape.moveTo(arr[i].x, arr[i].y)
            }else if(i === arr.length && arr[1].polyFlag){
                shape.lineTo(arr[2].x, arr[2].y)
            }else{
                shape.lineTo(arr[i].x, arr[i].y)
            }
        }
        return shape
    }else{
        let path = new THREE.Path()// path对象不会填充
        for (let i=2; i<=arr.length; i++){
            if(i === 2){
                path.moveTo(arr[i].x, arr[i].y)
            }else if(i === arr.length && arr[1].polyFlag){
                path.lineTo(arr[2].x, arr[2].y)
            }else{
                path.lineTo(arr[i].x, arr[i].y)
            }
        }
        return path
    }
    // 遍历数组将所有二维坐标连接成面
}

function stretch(shapes, depth=20){
        // 拉伸相关配置
        var extrudeSettings = {
            steps: 1,
            depth: depth, // 拉伸厚度
            bevelEnabled: false,// 拉伸的图形是否为斜角
        };
        // 创建立体模型
        var geometry = new THREE.ExtrudeGeometry( shapes, extrudeSettings );
        geometry.center()// 几何体居中

        geometry.scale(0.001,0.001,0.001);//几何体缩放
        var material = new THREE.MeshLambertMaterial( { color: 0x088A85 } ); // 材质设置
        mesh = new THREE.Mesh( geometry, material ) ;
        mesh.castShadow = mesh.receiveShadow = true;

        scene.add( mesh );
    // return mesh
}