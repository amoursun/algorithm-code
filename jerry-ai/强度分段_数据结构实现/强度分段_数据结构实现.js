/**
 * 管理数值区间强度变化
 */
class IntensitySegments {
    list = [];

    get size() {
        return this.list.length;
    }
    /**
     * 在区间[from, to)上叠加指定的强度值amount
     *  特点: 累加操作，会保留原有的强度值基础上增加
     *  示例: 
     *      - 第一次add(10,30,1)后强度从10到30变为1
     *      - 第二次add(20,40,1)后20-30区间变为2(1+1)  (20, 40) 之间 + 1
     */
    add(from, to, amount) {
        // 保证需要在范围内
        if (from >= to) {
            throw Error('from 必须小于 to 设定值');
        }
        if (this.size === 0) {
            if (amount === 0) {
                // 空操作
                return;
            }
            this.list.push([from, amount], [to, 0])
            return;
        }

        let isFromInset = false;
        let isToInsert = false;
        for (let i = 0; i < this.size; i++) {
            const [point, value] = this.list[i];

            // 当前不在区间内
            if (point < from) {
                continue;
            }
            // 相等不插入新的, i 不内更新 
            if (point === from) {
                isFromInset = true;
                this.list[i][1] = value + amount;
                continue;
            }
            // 不相等插入新的, i 内更新 (需要在范围内)
            if (point > from && point < to) {
                if (!isFromInset) {
                    isFromInset = true;
                    this.list.splice(
                        i,
                        0,
                        [from, amount + (this.list[i - 1] ? this.list[i - 1][1] : 0)]
                    );
                    i++;
                }
                this.list[i][1] = value + amount;
                continue;
            }

            // 当前值不在范围中, 直接退出, 不需要插入 to 新内容
            if (point >= to) {
                // 立即结束: 可修改已经完成
                isToInsert = true;
                break;
            }
        }

        // to 范围没有插入, 代表 to 是大于当前最后一个数组点的
        if (!isToInsert) {
            this.list.push([to, 0]);
        }

        this._mergeZeroPoint();
    }
    
    /**
     * 将区间[from, to)上的强度值设置为指定值amount
     *   特点：是覆盖操作，会清除原有强度值
     *   示例：如果调用set(10,30,5)，无论之前值是多少，都会直接设为5
     */
    set(from, to, amount) {
        // 保证需要在范围内
        if (from >= to) {
            throw Error('from 必须小于 to 设定值');
        }
        if (this.size === 0) {
            if (amount === 0) {
                // 空操作
                return;
            }
            this.list.push([from, amount], [to, 0])
            return;
        }
        // [[10,1], [30,0]]  20, 40, 1
        // 最后一个不能修改
        for (let i = 0; i < this.size - 1; i++) {
            const [point] = this.list[i];

            // 当前不在区间内
            if (point < from) {
                continue;
            }
            // 在范围内
            if (point >= from && point < to) {
                this.list[i][1] = amount;
                continue;
            }

            // 当前值不在范围中, 直接退出, 不需要跟新 to 内容
            if (point >= to) {
                break;
            }
        }

        this._mergeZeroPoint();
    }

    /**
     * 合并连续的0点
     */
    _mergeZeroPoint() {
        const result = [];
        let i = 0;
        let j = this.size - 1;
        while (j > i) {
            if (j === 0 && this.list[j][1] === 0) {
                // 结束运行
                this.list = [];
                return;
            }
            else if (this.list[j][1] === 0 && this.list[j - 1][1] === 0) {
                j--;
            }
            else {
                break;
            }
        }
        while (i <= j) {
            const [point, value] = this.list[i];
            if (!(value === 0 && result.length === 0)) {
                result.push([point, value])
            }
            i++;
        }
        this.list = result;
    }
    /**
    * 返回当前所有分段的数组表示，格式为[[point1,value1],[point2,value2],...]
    */
    toString() {
        // const value = this.list.reduce((res, item, index) => {
        //     const [point, value] = item;
        //     if (index === 0) {
        //         return `[${point},${value}]`;
        //     }
        //     return `${res},[${point},${value}]`;
        // }, '');
        // const result = `[${value}]`;
        // console.log('toString:', result);
        // return result;
        const result = JSON.stringify(this.list);
        console.log('toString:', result)
        return result;
    }
}
/**
    add方法：
        是增量操作，在指定区间上叠加值
        会保留原有的强度分布，只做加法
        示例中add(10,30,1)后[10,30)区间值变为1
        再次add(20,40,1)后：
            [10,20)保持1
            [20,30)变为1+1=2
            [30,40)从0变为1
    
    set方法：
        是覆盖操作，重置指定区间的值
        会清除原有强度分布，设为新值
        如果调用set(20,40,5)：
            [20,40)区间值直接设为5
            不管之前是2还是1都会被覆盖

    关键区别：
        add适合"逐渐增强/减弱"场景
        set适合"重置强度"场景
        两者都会自动合并相邻相同值的区间

    数据结构特点：
        使用断点表示法存储区间强度
        自动处理区间重叠和合并
        支持正负强度值
        示例展示了复杂的叠加效果
 */

// console.log('1============================================================');
// const segments = new IntensitySegments();
// segments.toString(); // Should be "[]"
// segments.add(10, 30, 1);
// segments.toString(); // Should be: "[[10,1],[30,0]]"
// segments.add(20, 40, 1);
// segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
// segments.add(10, 40, -2);
// segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
// console.log('2============================================================');
// const segments1 = new IntensitySegments();
// segments1.toString(); // Should be "[]"
// segments1.add(10, 30, 1);
// segments1.toString(); // Should be "[[10,1],[30,0]]"
// segments1.add(20, 40, 1);
// segments1.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
// segments1.add(10, 40, -1);
// // [[10,0],[20,1],[30,0],[40,0]]
// // [10,20)和[30,40)的值变为0后被合并
// // [[20,1],[30,0]]
// segments1.toString(); // Should be "[[20,1],[30,0]]"
// segments1.add(10, 40, -1);
// segments1.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"
console.log('3============================================================');
const segments3 = new IntensitySegments();
segments3.toString(); // Should be "[]"
segments3.set(10, 30, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(20, 40, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(10, 40, -2);
segments3.toString(); // Should be: "[[10,-2],[30,0]]"
console.log('4============================================================');
const segments4 = new IntensitySegments();
segments4.toString(); // Should be "[]"
segments4.set(10, 30, 1);
segments4.toString(); // Should be "[[10,1],[30,0]]"
segments4.set(20, 40, 1);
segments4.toString(); // Should be "[[10,1],[30,0]]"
segments4.set(10, 40, -1);
segments4.toString(); // Should be "[[10,-1],[30,0]]"
segments4.set(10, 40, -4);
segments4.toString(); // Should be "[[10,-4],[30,0]]"