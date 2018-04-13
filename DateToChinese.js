Date.prototype.toChinese = function (template) {
    var d = this
    template = template || '%y年%M月%d日 %H点%m分%s秒'
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
    ]
    return date
        .reduce(function (s, x) {
            return s.replace(x.key, x.value)
        }, template)
        .replace(/(零分)?零秒/g, '整')
}

function numberToChinese(num, simple, zero) {
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


// test

console.log([0, 9, 10, 12, 40, 99].map(numberToChinese))

console.log(new Date('2018-3-2 01:0:01').toChinese())
console.log(new Date('2018-3-10 15:0:0').toChinese())
console.log(new Date('2016-12-25 0:32:07').toChinese())
console.log(new Date('2016-1-1 0:0:0').toChinese())

console.log(new Date().toChinese('今天是%y年%M月%d日呀~'))
