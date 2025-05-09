/**
 * 
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

示例 1：

输入：nums = [1,2,0]
输出：3

示例 2：

输入：nums = [3,4,-1,1]
输出：2

示例 3：

输入：nums = [7,8,9,11,12]
输出：1

 */

function firstMissingPositive(nums) {
    if (!nums.length) {
        return 1;
    }
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        set.add(nums[i]);
    }
    for (let i = 1; i <= nums.length + 1; i++) {
        if (!set.has(i)) {
            return i;
        }
    }
}
console.log(firstMissingPositive([1,2,0]));
console.log(firstMissingPositive([3,4,-1,1]));
console.log(firstMissingPositive([7,8,9,11,12]));