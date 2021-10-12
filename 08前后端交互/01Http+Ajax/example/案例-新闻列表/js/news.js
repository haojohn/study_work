$(function() {
    // 获取新闻列表函数
    function getNewsList() {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/news',
            success: function(res) {
                if (res.status !== 200) {
                    return alert('获取新闻列表数据失败');
                }
                console.log(res);
                for (let i = 0; i < res.data.length; i++) {
                    // 把每一项的tags属性，从字符串改造成字符数组
                    res.data[i].tags = res.data[i].tags.split(',');
                }
                console.log(res);
                let htmlStr = template('tpl-news', res);
                $('#news-list').html(htmlStr);

            }
        })
    }

    getNewsList();

    // 补零函数
    function padZero(n) {
        return n >= 10 ? n : ('0' + n);
    }

    // 定义格式化时间过滤器
    template.defaults.imports.dateFormate = function(dtStr) {
        let dt = new Date(dtStr);

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());
        let h = padZero(dt.getHours());
        let mn = padZero(dt.getMinutes());
        let s = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${h}:${mn}:${s}`;
    }
})