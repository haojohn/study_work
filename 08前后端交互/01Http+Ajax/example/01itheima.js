// 手动实现一个jQuery的ajax封装函数

// 把传递过来的对象，转换为查询字符串
function resolveData(data) {
    let arr = [];
    for (const key in data) {
        let str = `${key}=${data[key]}`;
        arr.push(str);
    }
    return arr.join('&');
}

// console.log(resolveData({ name: '张三', age: 20 }));

// 封装函数
function itheima(options) {
    let xhr = new XMLHttpRequest();

    // 把外界传过来的对象转换为字符串
    let qs = resolveData(options.data);

    if (options.method.toUpperCase() === 'GET') {
        // 发起get请求
        xhr.open(options.method, options.url + '?' + qs);
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起post请求
        xhr.open(options.method, options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}