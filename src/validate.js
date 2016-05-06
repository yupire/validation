/**
 * validate
 * @authors Miumiu (yupire@live.cn)
 * @date    2016-05-04 21:29:50
 * @version $Id$
 * 想写一个零依赖的移动端验证表单的组件
 * 先统一用querySelector吧
 */
/*var validate = (function(){   //2016/05/05
    //private
    //这个是浮层提示
    function box(el) {
        var body = document.querySelector('body'),
            shadow = document.createElement('div'),
            tips = document.createElement('div'),
            tipstext = document.createTextNode(el.dataset.tip || '请按照格式填写');

        shadow.className = 'shadow';
        tips.className = 'tips';
        tips.appendChild(tipstext);
        shadow.appendChild(tips);
        body.appendChild(shadow);
        shadow.addEventListener('click', function(e){
            e.preventDefault();
            body.removeChild(shadow);
        });
    }
    //这个是跟着input的提示
    function tips(el) {
        var pa = el.parentNode.childNodes,
            error = el.parentNode.querySelector('.error'),
            tiptext = document.createTextNode(el.dataset.tip || '请按照格式填写');

        if(error.childNodes.length == 0) {
            error.appendChild(tiptext)
        }
    }
    //验证主体
    function valid(type) {
        var items = document.querySelectorAll('[required]'),
            len = items.length,
            current, text, re, isfilled = false, blank = [];

        for(var i=0; i<len; i++) {
            current = items[i];
            current.addEventListener('focus', function(e){
                text = this.parentNode.querySelector('.error').childNodes[0];
                this.removeAttribute('class');
                if(text) {
                    this.parentNode.querySelector('.error').removeChild(text);
                }
            });
            if(!current.value) {
                current.className = 'warn';
                blank.push(current)
            } else {
                re = new RegExp(current.pattern);
                if(!re.test(current.value)) {
                   switch(type){
                        case 'box': box(current); break;
                        case 'tip': tips(current); break;
                    }
                   blank.push(current)
                }
            }
        }
        if(blank.length) {
            isfilled = false
        } else {
            isfilled = true;
        }
        return isfilled;
    }
    //public
    return {
        isvalid: function(type) {
            return valid(type);
        }
    }
})();*/

/**
 * 重构重构
 * 想来想去就这么随意的一个名字也太容易重名了
 * 还是写成一个类吧
 * 现在是单功能的，就是只接受正则的验证
 */
 function Validation() {  //2016/05/06
    this.valid = function(type) {
        var items = document.querySelectorAll('[required]'),
            len = items.length,
            current, text, re, isfilled = false, blank = [];

        for(var i=0; i<len; i++) {
            current = items[i];
            current.addEventListener('focus', function(e){
                text = this.parentNode.querySelector('.error').childNodes[0];
                //this.removeAttribute('class');
                this.className = 'normal';
                if(text) {
                    this.parentNode.querySelector('.error').removeChild(text);
                }
            });
            if(!current.value) {
                current.className = 'warn';
                blank.push(current)
            } else {
                re = new RegExp(current.pattern);
                if(!re.test(current.value)) {
                   switch(type){
                        case 'box': this.box(current); break;
                        case 'tip': this.tips(current); break;
                    }
                    blank.push(current)
                }
            }
        }
        if(blank.length) {
            isfilled = false
        } else {
            isfilled = true;
        }
        return isfilled;
    }
    Validation.prototype.box = function(el) {
        var body = document.querySelector('body'),
            shadow = document.createElement('div'),
            tips = document.createElement('div'),
            tipstext = document.createTextNode(el.dataset.tip || '请按照格式填写');

        shadow.className = 'shadow';
        tips.className = 'tips';
        tips.appendChild(tipstext);
        shadow.appendChild(tips);
        body.appendChild(shadow);
        shadow.addEventListener('click', function(e){
            e.preventDefault();
            body.removeChild(shadow);
        });
    }
    Validation.prototype.tips = function(el) {
        var pa = el.parentNode.childNodes,
            error = el.parentNode.querySelector('.error'),
            tiptext = document.createTextNode(el.dataset.tip || '请按照格式填写');

        if(error.childNodes.length == 0) {
            error.appendChild(tiptext)
        }
    }
 }


//这个是引用示例
function submit() {
    var isvalid;
    var btn = document.querySelector('button[type=submit]');
    var currentform = document.querySelector('#new');

    currentform.addEventListener('submit', function(e) {
        e.preventDefault();
        //这里引用这个组件 成功验证就返回true，没有验证成功就返回false
        /*isvalid = validate.isvalid('box');  //有两个提示样式，一个是浮层的box，另一个是页内的tip*/
        var myvalid = new Validation();
        isvalid = myvalid.valid('tip');
        if (isvalid) {
            console.log('这个表单可以被提交');
        } else {
            console.log('这个表单没有被提交');
        }
    })
}
submit();