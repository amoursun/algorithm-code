// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给你一个整数，将其转为罗马数字。

// 输入: num = 3
// 输出: "III"

// 输入: num = 4
// 输出: "IV"

// 输入: num = 9
// 输出: "IX"

// 输入: num = 58
// 输出: "LVIII"
// 解释: L = 50, V = 5, III = 3.

// 输入: num = 1994
// 输出: "MCMXCIV"
// 解释: M = 1000, CM = 900, XC = 90, IV = 4.

// 1 <= num <= 3999

const intToRoman = function(num) {
    const map = {
        1: 'I',
        4: 'IV',
        5: 'V',
        9: 'IX',
        10: 'X',
        40: 'XL',
        50: 'L',
        90: 'XC',
        100: 'C',
        400: 'CD',
        500: 'D',
        900: 'CM',
        1000: 'M',
    };
    let res = '';
    num = num.toString();
    for (let i = 0; i < num.length; i++) {
        const base = Math.pow(10, num.length - i - 1);
        const v = num[i] * base;
        if (map[v]) {
            res += map[v];
        }
        else {
            const midValue = map[base * 5];
            const baseValue = map[base];
            let n = v % (base * 5) / base;
            // 大于每个位数中间
            if (v / base > 5) {
                res += midValue;
            }
            while (n > 0) {
                res += baseValue;
                n--;
            }
        }
    }
    return res;
}
console.log(intToRoman(2233));

const romanToInt = function(s) {
    const map = {
        I: 1,
        IV: 4,
        V: 5,
        IX: 9,
        X: 10,
        XL: 40,
        L: 50,
        XC: 90,
        C: 100,
        CD: 400,
        D: 500,
        CM: 900,
        M: 1000,
    };
    let res = 0;
    let i = 0;
    while(i < s.length) {
        // 两位
        if (map[`${s[i]}${s[i + 1]}`]) {
            res += map[`${s[i]}${s[i + 1]}`];
            i += 2;
            continue;
        }
        // 1位
        res += map[s[i]];
        i++;
    }

    return res;
};

console.log(romanToInt('MMCCXXXIII'));
