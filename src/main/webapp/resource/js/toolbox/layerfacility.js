/*
* 根据节点查找对应的名称
* */
function findNameByNode(layerData, name, node, type) {
    for (var i = 0; i < node.nodes.length; i++) {
        var tmp = node.nodes[i];
        if (tmp.nodes) {
            findLayerByName(layerData, name, tmp, type);
             findNameByNode(layerData, name, tmp, type);

        }
        else {
            findLayerByName(layerData, name, tmp, type);
        }
    }
}
/*
* 设置图层的可见或者隐藏
* */
function findLayerByName(layerData, layername, node, type) {

    for (var i = 0; i < layerData.length; i++) {
        if (layerData[i]._attrs.name == layername) {
            var visible = layerData[i].visibleLayers;
            findLayer(layerData[i], node, type, visible);
            layerData[i].setVisibleLayers(visible);
            if (visible.length > 0) {
                layerData[i].setVisibility(true);
            }
            else
                layerData[i].setVisibility(false);
        }
    }
};
/*
* 根据传入的图层名称，将匹配到的图层，加入到可见图层数组中*/
function findLayer(node, cnode, type, visible) {
    if (node.layerInfos.length < 1) {
        return;
    }
    for (var i = 0; i < node.layerInfos.length; i++) {
        var tmp = node.layerInfos[i];
        if (tmp.layerInfos == undefined) {
            if (tmp.name == cnode.text && tmp.id == cnode.id) {
                if (type == "check") {
                    if (visible.indexOf(tmp.id) <= -1)
                        visible.push(tmp.id);
                    if(tmp.subLayerIds !=undefined)
                    {//匹配上的节点有子图岑，将所有自图层id加入数组
                        for(id in tmp.subLayerIds)
                        {
                            if (visible.indexOf(tmp.subLayerIds[id]) <= -1)
                                visible.push(tmp.subLayerIds[id]);
                            findSubLayeridByID(tmp.subLayerIds[id],node,visible,type);
                        }
                    }
                }
                else {
                    removeFromArr(visible, tmp.id);
                    if(tmp.subLayerIds !=undefined)
                    {//匹配上的节点有子图岑，将所有图层id加入数组
                        for(id in tmp.subLayerIds)
                        {
                                removeFromArr(visible, tmp.subLayerIds[id]);
                            findSubLayeridByID(tmp.subLayerIds[id],node,visible,type);
                        }
                    }
                }
                return;
            }
        }
        else {
             findLayer(tmp, name, type, visible);
        }
    }

}
/*
* 根据图层id检索改图层下面是否还有自图层*/
function findSubLayeridByID(id,node,visible,type) {
    for(var i=id;i<node.layerInfos.length;i++)
    {
        var tmp = node.layerInfos[i];
        if(tmp.id == id)
        {
            if(tmp.subLayerIds != undefined)
            {
                for(id in tmp.subLayerIds)
                {
                    if(type == "check")
                    {
                        if (visible.indexOf(tmp.subLayerIds[id]) <= -1)
                            visible.push(tmp.subLayerIds[id]);
                        findSubLayeridByID(tmp.subLayerIds[id],node,visible,type);
                    }
                    else {
                        removeFromArr(visible, tmp.subLayerIds[id]);
                        findSubLayeridByID(tmp.subLayerIds[id],node,visible,type);
                    }


                }
            }
            break;
        }
    }
}
/*
* 查找节点的最顶层父节点名称*/
function searchNodeParentName(node) {
    var text;
    if (node.parentId == undefined) {
        text= node.text;
    }
    else {
        var parentNode = $("#treeview1").treeview("getNode", node.parentId)
        text = searchNodeParentName(parentNode);
    }
    return text;
}
//删除数组中指定的元素
function removeFromArr(arr,num) {
    //找到指定元素的位置
    var index = arr.indexOf(num);
    if(index>-1)
    {//若存在，则删除元素
        arr.splice(index,1);
    }
}