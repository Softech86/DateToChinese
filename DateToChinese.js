Date.prototype.toChinese = function (template) {
    var d = this
    template = template || '%y年%M月%d日 %H点%m分%s秒' // 填充模板
    var date = [
        {
            key: /%y/g,
            value: numberToChinese(d.getFullYear(), true)
        },
        {
            key: /%M/g,
            value: numberToChinese(d.getMonth() + 1)
        },
        {
            key: /%d/g,
            value: numberToChinese(d.getDate())
        },
        {
            key: /%H/g,
            value: numberToChinese(d.getHours())
        },
        {
            key: /%m/g,
            value: numberToChinese(d.getMinutes(), false, true)
        },
        {
            key: /%s/g,
            value: numberToChinese(d.getSeconds(), false, true)
        }
    ] // 替换规则
    return date
        .reduce(function (s, x) {
            return s.replace(x.key, x.value)
        }, template)
        .replace(/(零分)?零秒/g, '整')
}

function numberToChinese(num, simple, zero) { // 百位内数字转中文
    num = parseInt(num);
    simple = simple === true
    zero = zero === true

    var ch = '零一二三四五六七八九'.split('');
    var res = [].map.call('' + num, function (x) {
        return ch[x]
    })

    if (simple) {
        return res.join('')
    } else if (zero && num > 0 && num < 10) {
        return ch[0] + res[0]
    } else {
        if (num && num % 10 === 0) {
        res[res.length - 1] = ''
        }
        if (parseInt(num / 10) === 1) {
        res[0] = ''
        }
        return res.join('十')
    }
}

Date.prototype.toChineseShort = function (template) { // 一个代码长度压缩的版本，详见文档
    var d = new Date(this)
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60)
    var t = d.toISOString().split(/-|T|:|\./g).splice(0, 6)
    var ch = '零一二三四五六七八九'.split(''), after = '年,月,日 ,点,分,秒'.split(',')
    return t.map((x, i) => [].map.call('' + parseInt(x), y => ch[y]).join(i ? '十' : '') + after[i]).join('').replace(/一?十零?/g, '十').replace(/(零分)?零秒/g, '整').replace(/(时|分)([^零])(分|秒)/g, '$1零$2$3')
}

// test

console.log([0, 9, 10, 12, 40, 99].map(numberToChinese)) // ['零', '九', '十', '十二', '四十', '九十九' ]

console.log(new Date('2018-3-2 01:0:01').toChinese()) // 二零一八年三月二日 一点零分零一秒
console.log(new Date('2018-3-10 15:0:0').toChinese()) // 二零一八年三月十日 十五点整
console.log(new Date('2016-12-25 0:32:07').toChinese()) // 二零一六年十二月二十五日 零点三十二分零七秒
console.log(new Date('2016-1-1 0:0:0').toChinese()) // 二零一六年一月一日 零点整

console.log(new Date().toChinese('今天是%y年%M月%d日呀~')) // 今天是二零一八年四月十四日呀~

console.log(new Date('2018-3-2 01:0:01').toChineseShort()) // 二零一八年三月二日 一点零分零一秒
console.log(new Date('2018-3-10 15:0:0').toChineseShort()) // 二零一八年三月十日 十五点整
console.log(new Date('2016-12-25 0:32:07').toChineseShort()) // 二零一六年十二月二十五日 零点三十二分零七秒
console.log(new Date('2016-1-1 0:0:0').toChineseShort()) // 二零一六年一月一日 零点整
