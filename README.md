# DateToChinese
Convert UTC time to Beijing Time in Chinese

## Basic
```
d2c = new Date('2018-3-10 15:0:0').toChinese() // 二零一八年三月十日 十五点整
```

## Using Template
```
d2c = new Date().toChinese('今天是%y年%M月%d日呀~') // 今天是二零一八年四月十三日呀~
```

## Shortern Version
```
Date.prototype.toChineseShort = function (template) {
    var d = new Date(this)
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60)
    var t = d.toISOString().split(/-|T|:|\./g).splice(0, 6) // 获取时间信息数组

    var ch = '零一二三四五六七八九'.split(''),
        after = '年,月,日 ,点,分,秒'.split(',')
    return t
        .map(function (x, i) {
            var res = [].map.call('' + parseInt(x), function (y) {
                return ch[y]
            }) // 数字转中文
            return 
                (i ? 
                    res.join('十').replace(/一?十零?/g, '十') : // 转为数字正常读法
                    res.join('')) // 年份直接连接数字
                 + after[i] // 加时间单位
        })
        .join('')
        .replace(/(零分)?零秒/g, '整') // 几点零分零秒 => 几点整
        .replace(/(时|分)([^零])(分|秒)/g, '$1零$2$3') // 几点几分 => 几点零几分
}
```

使用 es6 箭头函数缩写，稍微调整，有
```
Date.prototype.toChineseShort = function (template) {
    var d = new Date(this)
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60)
    var t = d.toISOString().split(/-|T|:|\./g).splice(0, 6)
    var ch = '零一二三四五六七八九'.split(''), after = '年,月,日 ,点,分,秒'.split(',')
    return t.map((x, i) => [].map.call('' + parseInt(x), y => ch[y]).join(i ? '十' : '') + after[i]).join('').replace(/一?十零?/g, '十').replace(/(零分)?零秒/g, '整').replace(/(时|分)([^零])(分|秒)/g, '$1零$2$3')
}
```