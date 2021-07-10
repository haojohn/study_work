(function flexible(window, document) {
    // 获取html的根元素
    var docEl = document.documentElement
        // dpr 物理像素比，获取物理像素比，如果没有，就为1  
    var dpr = window.devicePixelRatio || 1

    // adjust body font size  设置我们body的字体大小
    function setBodyFontSize() {
        // 如果页面中有body元素，就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            // 如果页面中没有body，则等待页面主要的DOM元素加载完毕，再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10  设置我们html元素的文字大小
    function setRemUnit() {
        // 把html的宽度分为10等分
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize 当我们页面尺寸大小发生变化时，重新设置rem大小
    window.addEventListener('resize', setRemUnit)
        // 重新加载页面的事件,无论哪种情况都可以重新加载,比load更强一些,重新加载页面时,重新设置rem大小
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) { //返回true,代表这个页面是从缓存取过来的页面,也需要重新计算rem大小,照顾了各个浏览器
            setRemUnit()
        }
    })

    // detect 0.5px supports 解决某些移 动端浏览器不支持0.5像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))