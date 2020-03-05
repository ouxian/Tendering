function setTreeView(data) {
    $('#treeview1').treeview({
        data: data,
        showIcon: false,
        showCheckbox: true,
        levels: 1,
        onNodeChecked: function (event, node) {
            //选中父节点，则自动选择子节点
            var selectNodes = getChildNodeIdArr(node); //获取所有子节点
            if (selectNodes) { //子节点不为空，则选中所有子节点
                $('#treeview1').treeview('checkNode', [selectNodes, {silent: true}]);
            }
            //获取父节点
            var parentNode = $("#treeview1").treeview("getNode", node.parentId);
            setParentNodeCheck(node);
        },
        onNodeUnchecked: function (event, node) { //取消选中节点
            var selectNodes = getChildNodeIdArr(node); //获取所有子节点
            if (selectNodes) { //子节点个数不为空，则取消选中所有子节点
                $('#treeview1').treeview('uncheckNode', [selectNodes, {silent: true}]);
            }
            setParentNodeUnceck(node);
        }
    });
};

function setParentNodeUnceck(node) {
    var parentNode = $("#treeview1").treeview("getNode", node.parentId);
    var chiledNodes = getChildNodeIdArr(parentNode);  //获取父节点的所有子节点
    if (parentNode.nodes) {
        var checkCount = 0;
        for (x in parentNode.nodes) {
            if (parentNode.nodes[x].state.checked) {
                checkCount++;
            }
        }
        if (checkCount === 0) {
            $('#treeview1').treeview('uncheckNode', [parentNode, {silent: true}]);
            setParentNodeUnceck(parentNode);
        }
    }
}

function getChildNodeIdArr(node) {
    var ts = [];
    if (node.nodes) {
        for (x in node.nodes) {
            ts.push(node.nodes[x].nodeId);
            if (node.nodes[x].nodes) {
                var getNodeDieDai = getChildNodeIdArr(node.nodes[x]);
                for (j in getNodeDieDai) {
                    ts.push(getNodeDieDai[j]);
                }
            }
        }
    } else {
        ts.push(node.nodeId);
    }
    return ts;
}

function setParentNodeCheck(node) {
    var parentNode = $("#treeview1").treeview("getNode", node.parentId);
    if (parentNode.nodes) {
        var checkedCount = 0;
        for (x in parentNode.nodes) {
            if (parentNode.nodes[x].state.checked) {
                checkedCount++;
            } else {
                break;
            }
        }
        if (checkedCount === parentNode.nodes.length) {
            $("#treeview1").treeview("checkNode", parentNode.nodeId);
            setParentNodeCheck(parentNode);
        }

    }
}

/*
* 构建图层树
* */
function layerToTree(layers) {
    var nodes = [];
    var ind = 0;
    for(var i=0;i<layers.length;i++)
    {
        var layerInfor = layers[i].layerInfos;
        var layerName = layers[i]._attrs.name;
        var proNode = {};
        proNode["text"] = layerName;
        proNode["id"] = ind;

        if (layerInfor.length > 1) {

            proNode["nodes"] = [];
            searchNode(proNode,layerInfor);
        }
        for(var j=i+1;j<layers.length;j++)
        {
            if(layers[j]._attrs.name == layerName)
            {
                var layerIn = layers[j].layerInfos;
                if (layerIn.length > 0) {

                    searchNode(proNode,layerIn);
                }
            }
            else {
                i = j-1;
                break;
            }
        }
        nodes.push(proNode);
    }
    setTreeView(nodes);
}

function getTree(paranode, layer,index) {
    var ind = index;
    var childNode = {};
    childNode["text"] = layer[index].name;
    childNode["id"] = index;

    if (layer[index].subLayerIds != null)
    {
        childNode["nodes"] = [];
        paranode["nodes"].push(childNode);
        $.each(layer[index].subLayerIds,function (i,obj) {

            ind = getTree(childNode, layer,obj);
        })
    }
    else
    {
        paranode["nodes"].push(childNode);
        return ind;
    }
    return ind;
}
function searchNode(paranode, layer) {
    for(var i=0;i<layer.length;i++)
    {
        var index = getTree(paranode, layer,i);
        i = index;
    }

}


