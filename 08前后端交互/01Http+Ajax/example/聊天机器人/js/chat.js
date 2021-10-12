$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    // 点击发送按钮，发送信息
    $('#btnSend').on('click', function() {
        let ipttext = $('#ipt').val().trim();
        if (ipt.length <= 0) {
            // 输入内容为空，则return，且输入框内容为空
            return $('#ipt').val('');
        }
        // 不为空，则把输入内容追加到聊天区域
        $('#talk_list').append(`<li class="right_word"><img src="img/person02.png" /> <span>${ipttext}</span></li>`);
        // 清空输入框
        $('#ipt').val('');
        // 重置化右侧滚动条位置
        resetui();
        // 机器人返回消息
        getMsg(ipttext);
    });

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                if (res.message === 'success') {
                    // 接收机器人传回来的消息
                    let robottext = res.data.info.text;
                    // 追加到聊天窗口
                    $('#talk_list').append(`<li class="left_word"><img src="img/person01.png" /> <span>${robottext}</span></li>`);
                    // 重置右侧滚动条位置
                    resetui();
                    // 转换成语音播放
                    getVoice(robottext);
                }
            }
        })
    };

    // 把文字转换成语音进行播放
    function getVoice(text) {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            },
            success: function(res) {
                if (res.status === 200) {
                    // 播放语音
                    // console.log(res.voiceUrl);
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        })
    };

    // 为文本框绑定keyup事件
    $('#ipt').on('keyup', function(e) {
        if (e.keyCode === 13) {
            // 触发按钮的点击事件
            $('#btnSend').click();
        }
    })
})