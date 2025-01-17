// 给你一棵树，树上有 n 个节点，按从 0 到 n-1 编号。
// 树以父节点数组的形式给出，其中 parent[i] 是节点 i 的父节点。树的根节点是编号为 0 的节点。
// 树节点的第 k 个祖先节点是从该节点到根节点路径上的第 k 个节点。
// 实现 TreeAncestor 类：
// TreeAncestor（int n， int[] parent） 对树和父数组中的节点数初始化对象。
// getKthAncestor(int node, int k) 返回节点 node 的第 k 个祖先节点。如果不存在这样的祖先节点，返回 -1 。

//                       0
//         1                          2
// 3               4             5           6

// 输入：
// ["TreeAncestor","getKthAncestor","getKthAncestor","getKthAncestor"]
// [[7,[-1,0,0,1,1,2,2]],[3,1],[5,2],[6,3]]

// 输出：
// [null,1,0,-1]

// 解释：
// TreeAncestor treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);

/**
 * node 为 3, 第1个祖先节点是父节点 是 1  (3 => 1 => 0)
 * node 为 5, 第2个祖先节点是父节点 -> 父节点 是 0 (5 => 2 => 0)
 * node 为 6, 第3个祖先节点是父节点 -> 父节点 -> 父节点 是 -1 (6 => 2 => 0 => 不存在)
 */
// treeAncestor.getKthAncestor(3, 1);  // 返回 1，它是 3 的父节点
// treeAncestor.getKthAncestor(5, 2);  // 返回 0 ，它是 5 的祖父节点
// treeAncestor.getKthAncestor(6, 3);  // 返回 -1 因为不存在满足要求的祖先节点

const TreeAncestor = function(n, parent) {
    this.max = n;
    this.dp = new Array(n).fill(0).map(() => new Array(this.max).fill(-1));
    for (let i = 0; i < n; i++) {
        // 第一层父节点
        this.dp[i][1] = parent[i];
    };
    for (let i = 0; i < n; i++) {
        // 补充 this.dp[i][1 - this.max] 0 已经处理了
        for (let j = 2; j < this.max; j++) {
            if (this.dp[i][j - 1] === -1) {
                continue;
            }
            const p = this.dp[i][j - 1];
            this.dp[i][j] = this.dp[p][1];
        }
    }
    console.log(this.dp);
};

TreeAncestor.prototype.getKthAncestor = function(node, k) {
    if (k > this.max) {
        console.log(-1);
        return -1;
    };
    console.log(this.dp[node][k]);
    return this.dp[node][k];
}

// 0: [-1, -1, -1, -1, -1, -1, -1]
// 1: [-1, 0, -1, -1, -1, -1, -1]
// 2: [-1, 0, -1, -1, -1, -1, -1]
// 3: [-1, 1, 0, -1, -1, -1, -1]
// 4: [-1, 1, 0, -1, -1, -1, -1]
// 5: [-1, 2, 0, -1, -1, -1, -1]
// 6: [-1, 2, 0, -1, -1, -1, -1]
// 注意: [-1, 0, 0, 1, 1, 2, 2] => parent[i] 是节点 i 的父节点
const treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
treeAncestor.getKthAncestor(3, 1);  // 返回 1 ，它是 3 的父节点
treeAncestor.getKthAncestor(5, 2);  // 返回 0 ，它是 5 的祖父节点
treeAncestor.getKthAncestor(6, 3);  // 返回 -1 因为不存在满足要求的祖先节点
