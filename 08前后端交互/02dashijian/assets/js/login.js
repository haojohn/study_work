$(function() {
    // 点击去注册的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 点击去登录的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 自定义校验规则
    // 1.从layui中获取form对象


})