/* 二叉树节点类 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val); // 节点值
    this.left = (left === undefined ? null : left); // 左子节点指针
    this.right = (right === undefined ? null : right); // 右子节点指针
}

/* 初始化二叉树 */
// 初始化节点
let n1 = new TreeNode(1),
    n2 = new TreeNode(2),
    n3 = new TreeNode(3),
    n4 = new TreeNode(4),
    n5 = new TreeNode(5);
// 构建引用指向（即指针）
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;

/* 插入与删除节点 */
let P = new TreeNode(0);
// 在 n1 -> n2 中间插入节点 P
n1.left = P;
P.left = n2;
// 删除节点 P
n1.left = n2;
