let that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);

        // 获取添加按钮
        this.add = this.main.querySelector('.tabadd');
        // 获取firstnav下的第一个为ul的元素
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        this.tabscon = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
            this.updateNode();
            // 初始化添加tab栏的操作
            this.add.onclick = this.addTab;
            // 初始化操作让相关的元素绑定事件
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        // 动态添加元素，需要反复更新
    updateNode() {
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
        }
        // 1.切换功能
    toggleTab() {
            // console.log(this.index);
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }
        // 清除类名的方法
    clearClass() {
            for (let i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        // 2.添加功能
    addTab() {
            // 清空class
            that.clearClass();
            let radom = Math.random();
            // 2.1创建li和section
            let li = ' <li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            let sction = ' <section class="conactive">测试' + radom + '</section>';
            // 2.2把创建的li和section追加到父类中
            that.ul.insertAdjacentHTML('beforeend', li);
            that.tabscon.insertAdjacentHTML('beforeend', sction);
            that.init();
        }
        // 3.删除功能
    removeTab(e) {
            e.stopPropagation(); //阻止冒泡，防止触发li的切换点击事件
            let index = this.parentNode.index;
            // 根据索引号删除对应的li和section
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当我们删除的不是选中状态下的li时，则删除后，选中的那个保持不变
            if (document.querySelector('.liactive')) {
                return;
            }
            // 当我们删除选中状态的li时，让它前一个li处于选中状态
            index--;
            // 手动调用我们的点击事件， 不需要鼠标触发
            that.lis[index] && that.lis[index].click();
        }
        // 4.修改功能
        // 双击文字，在里面生成一个文本框，当失去焦点或者按下回车时，把文本框输入的值给原先元素即可
    editTab() {
        let str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 在双击的span中生成文本框
        this.innerHTML = `<input type='text' />`;
        let input = this.children[0];
        input.value = str;
        input.select();
        // 当我们离开文本框就把文本框里面的值给span
        input.onblur = function() {
                this.parentNode.innerHTML = this.value;
            }
            // 按下回车也可以把文本框的内容给父亲span
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用表单失去焦点事件，不需要鼠标离开操作
                this.blur();
            }
        }
    }
}

new Tab('#tab');