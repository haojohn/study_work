window.addEventListener('load', function() {
    // 获取元素
    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    let ol = focus.children[1];
    let flag = false; //当flag为true时，代表手指移动了，才去做手指离开的判断
    // 获得focus的宽度
    let w = focus.offsetWidth;
    // 利用定时器自动轮播图片
    let index = 0;
    let timer = setInterval(function() {
        index++;
        let translateX = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = `translateX(${translateX}px)`;
    }, 2000);
    // 等我们过渡完成之后，再去判断 监听过渡完成的事件transitionend
    ul.addEventListener('transitionend', function() {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果，这样让我们的ul 快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度，去滚动图片
            translateX = -index * w;
            ul.style.transform = `translateX(${translateX}px)`;
        } else if (index < 0) {
            index = 2;
            // 去掉过渡效果，这样让我们的ul 快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度，去滚动图片
            translateX = -index * w;
            ul.style.transform = `translateX(${translateX}px)`;
        }
        // 小圆点跟随变化
        // 把ol里面li带有current类名的选出来去掉类名
        ol.querySelector('li.current').classList.remove('current');
        // 让当前索引号的小li加上current
        ol.children[index].classList.add('current');
    });

    // 手指滑动轮播图
    // 触摸元素 touchstart：获取手指初始坐标
    let startX = 0; //滑动只有水平滑动
    let moveX = 0; //移动的距离
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸清除定时器
        clearInterval(timer);
    });
    // 移动手指 touchmove ：计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function(e) {
        // 移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子：盒子原来的位置+手指移动的距离
        let translateX = -index * w + moveX;
        // 
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${translateX}px)`;
        flag = true; //手指移动过我们再去判断否则不做判断效果
        e.preventDefault(); //记得写这句，阻止滚动屏幕的行为
    });
    // 手指离开 根据移动距离去判断是回弹还是播放下一张
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            flag = false;
            // 如果移动距离大于50px，就播放上一张或下一张
            if (Math.abs(moveX) > 50) {
                // 如果右滑就是播放上一张 ，moveX是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果左滑就是播放下一张 ，moveX是负值
                    index++;
                }
                let translateX = -index * w;
                ul.style.transition = 'all 0.3s';
                ul.style.transform = `translateX(${translateX}px)`;
            } else {
                // 拖动距离小于50px，我们就回弹
                let translateX = -index * w;
                ul.style.transition = 'all 0.1s';
                ul.style.transform = `translateX(${translateX}px)`;
            }
        }
        // 重新开启定时器
        clearInterval(timer); //开启定时器之前，先清除定时器，确保只有一个定时器
        timer = setInterval(function() {
            index++;
            let translateX = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translateX}px)`;
        }, 2000);
    });



    // 返回顶部事件
    let goBack = document.querySelector('.goBack');
    let nav = document.querySelector('nav');
    // 滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });

    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})