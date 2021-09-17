// 监控区域模块制作，tab栏切换
// 使用立即执行函数，防止变量污染
(function() {
    // tab栏切换
    $(".monitor .tabs").on("click", "a", function() {
        // 点击对应的tab栏
        $(this).addClass("active").siblings("a").removeClass("active");
        // 选取对应的索引号的content
        $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
    })

    // 动画功能
    $(".marquee-view .marquee").each(function() {
        // console.log($(this));
        let rows = $(this).children().clone();
        $(this).append(rows);
    })
})();

// 引入图表，点位分布统计模块
(function() {
    // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".pie"));
    // 2.指定配置项和数据
    let option = {
        // 提示框组件
        tooltip: {
            // trigger 触发方式。  非轴图形，使用item的意思是放到数据对应图形上触发提示
            trigger: 'item',
            // 格式化提示内容：
            // a 代表series系列图表名称  
            // b 代表series数据名称 data 里面的name    
            // c 代表series数据值 data 里面的value   
            // d代表  当前数据/总数据的比例
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图表颜色，与数据一一对应
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        // 控制图表
        series: [{
            // 图表名称
            name: '面积模式',
            // 图表类型
            type: 'pie',
            // 南丁格尔玫瑰图 有两个圆  内圆半径10%  外圆半径70%
            // 饼形图半径。 可以是像素。也可以是百分比（ 基于DOM容器大小）第一项是内半径，第二项是外半径（通过它可以实现饼形图大小）
            radius: ['10%', '60%'],
            // 图表中心位置 left 50%  top 50%  距离图表DOM容器
            center: ['50%', '50%'],
            // radius 半径模式，另外一种是 area 面积模式
            roseType: 'radius',
            // 文字调整
            label: {
                fontSize: 10
            },
            // 引导线调整
            labelLine: {
                // 连接到图形的线长度
                length: 6,
                // 连接到文字的线长度
                length2: 8
            },
            // 数据集 value 数据的值 name 数据的名称
            data: [
                { value: 20, name: '云南' },
                { value: 26, name: '北京' },
                { value: 24, name: '山东' },
                { value: 25, name: '河北' },
                { value: 20, name: '江苏' },
                { value: 25, name: '浙江' },
                { value: 30, name: '四川' },
                { value: 42, name: '湖北' }
            ]
        }]
    };
    // 3.配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4.当浏览器进行缩放的时候，图表等比例缩放
    window.addEventListener('resize', function() {
        // 监听浏览器缩放，图表对象调用resize缩放函数
        myChart.resize();
    })
})();
// 引入图表，用户模块
(function() {
    // 中间省略的数据  准备三项
    let item = {
            name: '',
            value: 1200,
            // 柱子颜色
            itemStyle: {
                color: '#254065'
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0'
            },
        }
        // 1.实例化对象
    let myChart = echarts.init(document.querySelector(".bar"));
    // 2.指定配置和数据
    let option = {
        // 线性渐变颜色
        color: new echarts.graphic.LinearGradient(
            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            0, 0, 0, 1, [
                { offset: 0, color: '#00fffb' }, // 0 起始颜色
                { offset: 1, color: '#0061ce' } // 1 结束颜色
            ]
        ),
        // 工具提示
        tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: 'item',
            // // 轴触发提示才有效
            // axisPointer: {
            //     // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果       
            //     type: 'shadow'
            // }
        },
        // 图表边界控制
        grid: {
            // 距离 上右下左 的距离
            left: '0%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            // 是否包含文本
            containLabel: true,
            // 是否显示直角坐标系网格
            show: true,
            // grid 四条边框的颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        // 控制x轴
        xAxis: [{
            // 使用类目，必须有data属性
            type: 'category',
            // 使用 data 中的数据设为刻度文字
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            // 刻度设置
            axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: false,
                // 不显示刻度
                show: false
            },
            // x坐标轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd'
            },
            // x坐标轴颜色设置
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            }
        }],
        // 控制y轴
        yAxis: [{
            // 使用数据的值设为刻度文字
            type: 'value',
            axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: false,
                // 不显示刻度
                show: false
            },
            // x坐标轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd'
            },
            // x坐标轴颜色设置
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            },
            // y轴 分割线的样式
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)'
                }
            }

        }],
        // 控制x轴
        series: [{
            // 图表数据名称
            name: '用户统计',
            // 图表类型
            type: 'bar',
            // 柱子宽度
            barWidth: '60%',
            // 数据
            data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }]
    };
    // 3.把配置给实例对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

// 销售统计模块
(function() {
    // 1.tab栏切换数据准备
    let data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        }
        // 1. 实例化对象
    let myChart = echarts.init(document.querySelector(".line"));
    // 2. 指定配置和数据
    let option = {
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            // 通过坐标轴来触发
            trigger: "axis"
        },
        legend: {
            // 位置
            right: '10%',
            // 如果series里面的name值已经写好了，则图例组件的data可以不用写
            // data: ["邮件营销", "联盟广告"],
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            }
        },
        // 设置网格样式
        grid: {
            top: '20%',
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true, //显示边框
            borderColor: '#012f4a', //边框颜色
            containLabel: true //包含刻度文字在内
        },

        xAxis: {
            type: "category",
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            // 去除轴内间距
            boundaryGap: false,
            axisTick: {
                show: false //去除刻度线
            },
            axisLine: {
                show: false //去除轴线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            }

        },
        yAxis: {
            type: "value",
            axisTick: {
                show: false // 去除刻度
            },
            axisLabel: {
                color: '#4c9bfd' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        series: [{
                name: "预期销售额",
                type: "line",
                data: data.year[0],
                smooth: true
            },
            {
                name: "实际销售额",
                type: "line",
                data: data.year[1],
                smooth: true
            }
        ]
    };

    // 3. 把配置和数据给实例对象
    myChart.setOption(option);

    // 4.tab切换效果制作
    // 1.准备数据
    // 2.点击切换效果
    $(".sales .caption").on("click", "a", function() {
        // 自动播放及点击时，要注意索引号的问题
        index = $(this).index() - 1;
        // 点击当前a，高亮显示
        $(this).addClass('active').siblings("a").removeClass("active");
        // 拿到当前a的自定义属性值
        // console.log(this.dataset.type);
        //根据拿到的值去找数据
        let arr = data[this.dataset.type];
        // 根据拿到的数据重新渲染series，重新渲染图表
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        myChart.setOption(option);
    });

    // 5.tab栏自动切换效果
    // 开启定时器，每隔3s，自动让a触发点击事件即可
    let as = $(".sales .caption a");
    let index = 0;
    let timer = setInterval(function() {
            index++;
            if (index >= 4) {
                index = 0;
            }
            as.eq(index).click();
        }, 1000)
        // 鼠标经过sales，关闭定时器，离开则启动定时器
    $('.sales').hover(function() {
            clearInterval(timer);
        },
        function() {
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                if (index >= 4) {
                    index = 0;
                }
                as.eq(index).click();
            }, 1000);
        });

    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

// 雷达图
(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".radar"));
    // 2.指定配置
    var dataBJ = [
        [90, 19, 56, 11, 34]
    ];
    var option = {
        // 鼠标经过显示提示框组件
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ['60%', '10%']
        },
        radar: {
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 }
            ],
            // 修改雷达图的大小
            radius: "65%",
            shape: "circle",
            // 分割的圆圈的个数
            splitNumber: 4,
            name: {
                // 修饰雷达图文字的颜色
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            // 分割圆圈线条的样式
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.5)"
                }
            },
            splitArea: {
                show: false
            },
            // 坐标轴的线修改为白色半透明
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.5)"
                }
            }
        },
        series: [{
            name: "北京",
            type: "radar",
            // 填充区域的线条颜色
            lineStyle: {
                color: "#FFF",
                width: 1,
                opacity: 0.5
            },
            data: dataBJ,
            // 设置图像标记（拐点 ，小圆点）
            symbol: "circle",
            // 拐点的大小
            symbolSize: 5,
            itemStyle: {
                color: "#fff"
            },
            // 让小圆点显示数据
            label: {
                show: true,
                fontSize: 10
            },
            // 修饰我们区域填充的背景颜色
            areaStyle: {
                color: "rgba(238, 197, 102, 0.6)"
            }
        }]
    };
    // 3.把配置和数据给对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

// 销售模块---半圆形的饼形图设置
(function() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".gauge"));
    // 2. 指定数据和配置
    var option = {
        series: [{
            name: "销售进度",
            type: "pie",
            // 放大饼图
            radius: ["130%", "150%"],
            // 移动下位置，套住50%文字
            center: ['48%', '80%'],
            // 鼠标经过饼图不变大
            hoverOffset: 0,
            //是否启用防止标签重叠策略
            // avoidLabelOverlap: false,
            labelLine: {
                normal: {
                    show: false
                }
            },
            // 起始角度，支持范围[0,360],设置起始角度为180
            startAngle: 180,
            data: [{
                    value: 100,
                    itemStyle: {
                        // 颜色渐变#00c9e0->#005fc1
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0,
                            0,
                            0,
                            1, [
                                { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                { offset: 1, color: "#005fc1" } // 1 结束颜色
                            ]
                        )
                    }
                },
                { value: 100, itemStyle: { color: '#12274d' } },
                // 第三个值透明隐藏
                { value: 200, itemStyle: { color: 'transparent' } }
            ]
        }]
    };
    // 3. 把数据和配置给实例对象
    myChart.setOption(option);
    // 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function() {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();

(function() {
    // 1.准备相关数据
    var hotData = [{
            city: '北京', // 城市
            sales: '25, 179', // 销售额
            flag: true, //  上升还是下降
            brands: [ //  品牌种类数据
                { name: '可爱多', num: '9,086', flag: true },
                { name: '娃哈哈', num: '8,341', flag: true },
                { name: '喜之郎', num: '7,407', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '6,724', flag: false },
                { name: '好多鱼', num: '2,170', flag: true },
            ]
        },
        {
            city: '河北',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '3,457', flag: false },
                { name: '娃哈哈', num: '2,124', flag: true },
                { name: '喜之郎', num: '8,907', flag: false },
                { name: '八喜', num: '6,080', flag: true },
                { name: '小洋人', num: '1,724', flag: false },
                { name: '好多鱼', num: '1,170', flag: false },
            ]
        },
        {
            city: '上海',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '2,345', flag: true },
                { name: '娃哈哈', num: '7,109', flag: true },
                { name: '喜之郎', num: '3,701', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '2,724', flag: false },
                { name: '好多鱼', num: '2,998', flag: true },
            ]
        },
        {
            city: '江苏',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '2,156', flag: false },
                { name: '娃哈哈', num: '2,456', flag: true },
                { name: '喜之郎', num: '9,737', flag: true },
                { name: '八喜', num: '2,080', flag: true },
                { name: '小洋人', num: '8,724', flag: true },
                { name: '好多鱼', num: '1,770', flag: false },
            ]
        },
        {
            city: '山东',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '9,567', flag: true },
                { name: '娃哈哈', num: '2,345', flag: false },
                { name: '喜之郎', num: '9,037', flag: false },
                { name: '八喜', num: '1,080', flag: true },
                { name: '小洋人', num: '4,724', flag: false },
                { name: '好多鱼', num: '9,999', flag: true },
            ]
        }
    ];
    // 2.根据数据渲染各省热销sup模块内容
    // 2.1遍历数据对象
    let supHtml = "";
    $.each(hotData, function(index, item) {
        supHtml += `
            <li>
            <span>${item.city}</span>
            <span>${item.sales}<s class=${item.flag?"icon-up":"icon-down"} ></s></span>
            </li>
            `
    });
    $('.sup').html(supHtml);
    // 3.当鼠标进入tab时，鼠标经过当前的小li要高亮显示
    $('.province .sup').on('mouseenter', 'li', function() {
        index = $(this).index();
        render($(this));
    });
    // 声明一个函数，里面设置sup当前小li高亮还有对应的品牌对象渲染
    function render(that) {
        that.addClass('active').siblings().removeClass();
        // 拿到当前城市的品牌对象
        // 拿到当前城市的index索引号
        // console.log($(this).index());
        // console.log(hotData[($(this).index())].brands);
        // 开始遍历我们的数据品牌
        let subHtml = "";
        $.each(hotData[(that.index())].brands, function(index, item) {
            subHtml += `<li><span>${item.name}</span><span>${item.num}<s class=${item.flag?"icon-up":"icon-down"}></s></span></li>`
        });
        $('.sub').html(subHtml);
    }
    // 4.默认激活第一个tab
    let lis = $('.province .sup li');
    lis.eq(0).mouseenter();
    // 5.开启定时器
    var index = 0;
    let timer = setInterval(function() {
        index++;
        if (index >= 5) {
            index = 0;
        }
        // lis.eq(index).mouseenter();
        render(lis.eq(index));
    }, 2000);
    $('.province .sup').hover(
        // 鼠标经过事件
        function() {
            clearInterval(timer);
        },
        // 鼠标离开事件
        function() {
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                if (index >= 5) {
                    index = 0;
                }
                // lis.eq(index).mouseenter();
                render(lis.eq(index));
            }, 2000);
        });
})()