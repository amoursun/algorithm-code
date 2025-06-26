/**
 * This function finds the lower bound of the value k in the array a with n elements
 * @param {Array<number>} a - the array of numbers
 * @param {number} n - the number of elements in the array
 * @param {number} k - the value to find the lower bound of
 * @returns {number} - the index of the lower bound of k in the array a
 */
/**
 * 该函数求n个元素的数组a中k值的下界
 * @param {Array<number>} arr - 数字数组
 * @param {number} n - 数组中元素的数量
 * @param {number} k - 查找下限的值
 * @returns {number} - k 下界在数组 arr 中的索引
 */
function lowerBound(arr, n, k) {
    let l = 0;
    let r = n - 1;
    while (l + 1 < r) {
        let mid = l + r >> 1;

        if (arr[mid] <= k) {
            l = mid;
        } else {
            r = mid;
        }
    }
    return l;
}

class IntensitySegments {
    /**
     * This is the constructor for the IntensitySegments class
     * @constructor
     * @param {void}
     * @return {void}
     */
    constructor() {
        // first we initialize the map with -Infinity and Infinity set to 0
        this.map = new Map();
        this.map.set(-Infinity, 0);
        this.map.set(Infinity, 0);
        this.keys = [-Infinity, Infinity];

    }
    /**
     * This function adds the amount to the intensity of the range from `from` to `to`
     * @param {number} from - the start of the range
     * @param {number} to - the end of the range (not inclusive)
     * @param {number} amount - the amount to add to the intensity
     * @return {void}
     */
    add(from, to, amount) {
        // find lower bound of from and to that is the range that we need to update
        let keys = this.keys;

        let start = lowerBound(keys, keys.length, from);
        let end = lowerBound(keys, keys.length, to);

        // update the from 
        let start_value = this.map.get(keys[start]);
        this.map.set(from, start_value + amount);
        // update the to
        let end_value = this.map.get(keys[end]);
        this.map.set(to, end_value);


        // update the range between from and to
        for (let i = start + 1; i <= end; i++) {
            if (keys[i] === from || keys[i] === to) {
                continue;
            }
            let value = this.map.get(keys[i]);
            this.map.set(keys[i], value + amount);
        }
        this.addNewKeys(from, to, start, end);

        // merge same values
        this.mergeSameValues();

    }
    /**
     * This function sets the intensity of the range from `from` to `to` to the amount
     * @param {number} from
     * @param {number} to
     * @param {number} amount
     * @return {void}
     */
    set(from, to, amount) {
        // same operation as add
        let keys = this.keys;
        let start = lowerBound(keys, keys.length, from);
        let end = lowerBound(keys, keys.length, to);

        this.map.set(from, amount);

        let end_value = this.map.get(keys[end]);
        this.map.set(to, end_value);


        for (let i = start + 1; i <= end; i++) {
            if (keys[i] === from || keys[i] === to) {
                continue;
            }
            this.map.set(keys[i], amount);
        }
        this.addNewKeys(from, to, start, end);


        // merge same values
        this.mergeSameValues();


    }

    /**
     * This function adds new keys to the keys array
     * @param {number} from - the from value trying to add
     * @param {number} to - the to value trying to add
     * @param {number} start - the index of the lower bound of from
     * @param {number} end - the index of the lower bound of to
     * @return {void}
     */
    addNewKeys(from, to, start, end) {
        let new_keys = [];
        let keys = this.keys;
        for (let i = 0; i <= start; i++) {
            new_keys.push(keys[i]);
        }
        if (keys[start] !== from) {
            new_keys.push(from);
        }
        for (let i = start + 1; i <= end; i++) {
            new_keys.push(keys[i]);
        }
        if (keys[end] !== to) {
            new_keys.push(to);
        }
        for (let i = end + 1; i < keys.length; i++) {
            new_keys.push(keys[i]);
        }
        this.keys = new_keys;
    }

    /**
     * This function merges the same values in the map
     * @return {void}
     */
    mergeSameValues() {
        let keys = this.keys;
        let new_keys = [];
        // console.log('keys', keys);
        let prev = keys[0];
        new_keys.push(prev);
        let prev_value = this.map.get(prev);
        for (let i = 1; i < keys.length - 1; i++) {
            let key = keys[i];
            let value = this.map.get(key);
            if (value === prev_value) {
                this.map.delete(key);
            } else {
                new_keys.push(key);
            }
            prev = key;
            prev_value = value;
        }
        new_keys.push(keys[keys.length - 1]);
        this.keys = new_keys;

    }

    /**
     * This function returns the string representation of the segments
     * @return {string} - the string representation of the segments
     * @override
     */
    toString() {
        let keys = this.keys;
        // console.log('keys', keys);
        let result = [];
        for (let key of keys) {
            if (key === -Infinity || key === Infinity) {
                continue;
            }
            result.push([key, this.map.get(key)]);
        }

        console.log(JSON.stringify(result));

        return JSON.stringify(result);
    }
};

const segments = new IntensitySegments();
segments.toString(); // Should be "[]"
segments.add(10, 30, 1);
segments.toString(); // Should be: "[[10,1],[30,0]]"
segments.add(20, 40, 1);
segments.toString(); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
segments.add(10, 40, -2);
segments.toString(); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"
// Another example sequence:
const segments2 = new IntensitySegments();
segments2.toString(); // Should be "[]"
segments2.add(10, 30, 1);
segments2.toString(); // Should be "[[10,1],[30,0]]"
segments2.add(20, 40, 1);
segments2.toString(); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[20,1],[30,0]]"
segments2.add(10, 40, -1);
segments2.toString(); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"

const segments3 = new IntensitySegments();
segments3.toString(); // Should be "[]"
segments3.set(10, 30, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(20, 40, 1);
segments3.toString(); // Should be: "[[10,1],[30,0]]"
segments3.set(10, 40, -2);
segments3.toString(); // Should be: "[[10,-2],[30,0]]"

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