// 获取文档
function getData(url){
    let xmltext = new XMLHttpRequest
    xmltext.open('GET', url, false)
    xmltext.send()
    return xmltext.responseXML
}


function getXmlNode(url){
    xmlDoc = getData(url)

    //提取数据
    let lwPolyLines = xmlDoc.getElementsByTagName('LwPolyline')
    var circles = xmlDoc.getElementsByTagName('Circle')

    let arrPoints = [];

    for (let i = 0; i < lwPolyLines.length; i++) {
        let points = []
        var poly = lwPolyLines[i].attributes.PolyFlag // 是否闭合  undefined不闭合
        var isFill = lwPolyLines[1].attributes.IsFill // 是否填充  undefined不填充
        for (let j=0; j<lwPolyLines[i].children.length; j++){
            points.push(lwPolyLines[i].children[j]);
        }
        arrPoints.push(points)
        let positions = getPointPosition(points)
        init(positions, isFill, polyFlag)
    }
}

//获取Point对应的坐标
function getPointPosition(arrPoints){
    // console.log(arrPoints)
    let positions = []
    for (let i=0; i<arrPoints.length; i++){
        if(arrPoints[i].attributes[0] !== undefined){
            positions.push({x:0, y:0})
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


