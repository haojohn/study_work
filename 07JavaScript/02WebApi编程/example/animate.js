function animate(obj, target, callback) {
    // 当我们不断点击按钮,这个元素的速度会越来越快,因为开启了太多的定时器
    // 解决方案就是 让我们元素只有一个定时器执行
    // 先清除以前的定时器,只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长写到定时器里面,不要出现小数
        let step = (target - obj.offsetLeft) / 10;
        // 如果step为正,则向上取整,为负则向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft === target) {
            // 停止动画,本质停止计时器
            clearInterval(obj.timer);
            // 定时器结束之后，执行回调函数
            // if (callback) {
            //     callback();
            // }
            // 高级写法
            callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值,
        // 步长公式=(目标值-元素现在的位置)/10,一直在变化,所以写在定时器里面
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
};