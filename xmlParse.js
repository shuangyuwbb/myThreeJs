// 获取文档
function getData(url){
    let xmltext = new XMLHttpRequest
    xmltext.open('GET', url, false)
    xmltext.send()
    return xmltext.responseXML
}

//从xml中获取节点内容
function getXmlNode(url){
    xmlDoc = getData(url)

    //提取数据
    let LwPolylines = xmlDoc.getElementsByTagName('LwPolyline')
    // var Circles = xmlDoc.getElementsByTagName('Circle')


    let arrPoints = [];

    for (let i = 0; i < LwPolylines.length; i++) {
        let points = []
        var poly = LwPolylines[i].attributes.PolyFlag // 是否闭合  undefined不闭合
        var isFill = LwPolylines[1].attributes.IsFill // 是否填充  undefined不填充
        for (let j=0; j<LwPolylines[i].children.length; j++){
            points.push(LwPolylines[i].children[j]);
        }
        arrPoints.push(points)
        let positions = getPointPosition(points)
        // if(poly === undefined && isFill === undefined){
        //     init(positions, poly = false, isFill = false)
        // }else if(poly === undefined){
        //     init(positions, poly = false)
        // }else if(isFill === undefined){
        //     init(positions, isFill = false)
        // }else{
        //     init(positions)
        // }
        init(positions)

    }
    // console.log(arrPoints)
    // if(poly === undefined){
    //     return { arrPoints, poly:false }
    // }else if(isFill === undefined){
    //     return { arrPoints, isFill:false }
    // }
    // return { arrPoints }
}

//获取Point对应的坐标
function getPointPosition(arrPoints){
    // console.log(arrPoints)
    let positions = []
    for (let i=0; i<arrPoints.length; i++){
        if(arrPoints[i].attributes[0] !== undefined){
            if(arrPoints[i].attributes[1] === undefined){
                positions.push({x:arrPoints[i].attributes[0].textContent, y:0})
            }else{
                positions.push({x:arrPoints[i].attributes[0].textContent, y:arrPoints[i].attributes[1].textContent})
            }
        }
    }
    return positions;
    // console.log(positions);
}


