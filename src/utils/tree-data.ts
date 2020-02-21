/**
 * 线性数据树性化
 * @param list
 */

export const listConvertTree = (list) =>  {
    let root = null;
    if (list && list.length) {
        root = { id: 0, parentId: -1, children: [] };
        const group = {};
        for (let index = 0; index < list.length; index += 1) {
            if (list[index].parentId !== null && list[index].parentId !== undefined) {
                if (!group[list[index].parentId]) {
                    group[list[index].parentId] = [];
                }
                group[list[index].parentId].push(list[index]);
            }
        }
        const queue = [];
        queue.push(root);
        while (queue.length) {
            const node = queue.shift();
            node.children = group[node.id] && group[node.id].length ? group[node.id] : null;
            if (node.children) {
                queue.push(...node.children);
            }
        }
    }
    return root;
};

/**
 * 线性化数据树形话
 * @param source
 * @param id
 * @param parentId
 * @param children
 */
export const listToTree = (source: any, id?: any, parentId?: any, children?: any) => {
    const sortArr: any = source.sort((a: any, b: any) => {
        return a[parentId] - b[parentId];
    });
    let minParentId = Array.isArray(sortArr) && sortArr.length > 0 ? sortArr[0].parentId : -1;
    const cloneData = JSON.parse(JSON.stringify(source));
    return cloneData.filter((father: any) => {
        const branchArr = cloneData.filter((child: any) => father[id] === child[parentId]);
        branchArr.length > 0 ? father[children] = branchArr : '';
        return father[parentId] === minParentId;
    });
};

/**
 * 树形数据线性化
 * @param list
 */
export const treeConvertList = (root) =>  {
    const list = [];
    if (root) {
        const Root = JSON.parse(JSON.stringify(root));
        const queue = [];
        queue.push(Root);
        while (queue.length) {
            const node = queue.shift();
            if (node.children && node.children.length) {
                queue.push(...node.children);
            }
            delete node.children;
            if (node.parentId !== null && node.parentId !== undefined) {
                list.push(node);
            }
        }
    }
    return list;
};
