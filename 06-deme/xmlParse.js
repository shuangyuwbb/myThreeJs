// 获取文档
function getData(url){
    let xmltext = new XMLHttpRequest
    xmltext.open('GET', url, false)
    xmltext.send()
    return xmltext.responseXML
}

/**形参url， 返回一个具有isfill，polyflag标识的point数组*/
function getXmlNode(url){
    xmlDoc = getData(url)

    //提取数据
    let lwPolyLines = xmlDoc.getElementsByTagName('LwPolyline')
    var circles = xmlDoc.getElementsByTagName('Circle')
    console.log(circles)

    // 处理曲线（园）


    // 处理直接
    let arrPoints = [];
    for (let i = 0; i < lwPolyLines.length; i++) {
        let points = []
        var polyFlag = lwPolyLines[i].attributes.PolyFlag// 是否闭合  undefined不闭合
        var isFill = lwPolyLines[i].attributes.IsFill // 是否填充  undefined不填充
        for (let j=0; j<lwPolyLines[i].children.length; j++){
            points.push(lwPolyLines[i].children[j]);
        }
        if(polyFlag === undefined && isFill === undefined){
            // 不闭合不填充
            points.unshift({polyFlag: false})
            points.unshift({isFill: false})
        }else if(polyFlag === undefined){
            // 不闭合
            points.unshift({polyFlag: false})
            points.unshift({isFill: true})
        }else if(isFill === undefined){
            // 不填充
            points.unshift({polyFlag: true})
            points.unshift({isFill: false})
        }else{
            // 填充闭合
            points.unshift({polyFlag: true})
            points.unshift({isFill: true})
        }

        arrPoints.push(points)
    }
    return arrPoints
}

//获取Point对应的坐标
/** 形参getXmlNode返回的点的信息， 返回各个点的坐标*/
function getPointPosition(arrPoints){

    let information = []
    let positions
    for (let i=0; i<arrPoints.length; i++){
        positions = []
        for (let j=1; j<arrPoints[i].length;j++){
            if(j < 2){
                positions.push(arrPoints[i][0],arrPoints[i][1])
                continue
            }
            if(arrPoints[i][j].attributes.Y === undefined && arrPoints[i][j].attributes.X === undefined){
                positions.push({x:0, y:0})
            }else if(arrPoints[i][j].attributes.X === undefined){
                positions.push({x:0, y:Number(arrPoints[i][j].attributes[0].textContent)})
            }else if(arrPoints[i][j].attributes.Y === undefined){
                positions.push({x:Number(arrPoints[i][j].attributes[0].textContent), y:0})
            }else{
                positions.push({x:Number(arrPoints[i][j].attributes[0].textContent), y:Number(arrPoints[i][j].attributes[1].textContent)})
            }
        }
        information.push(positions)
    }
    return information
}


