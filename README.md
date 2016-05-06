#自用验证小组件
经常要写表单验证，每次写的时候都到处找组件，最后找到了然后不合适结果还是得自己写真是够了。
于是想想还是自己写一个吧。
嘛，算是初稿吧，先放上来，督促自己修改跟优化~

##用法
因为是初稿吧所以用法有点复杂，过段时间想好了我再优化。
###javascript
```javascript
/*
 * valid方法参数必须要传，只有tip和box两个可选择，tip是页内提示，box是浮层提示
 * 然后调用这个valid方法之后会返回一个布尔值
 * 全部通过验证了返回true，任何一项没通过就返回false
 * 同时会出现提示信息
 */
var myValid = new Validation()；
myValid.valid('box')
```
###html
为了方便和兼容html5的验证，我这里也使用了html5里面的写法
不过如果是要使用我这个验证的话，要把html5自带的验证给禁用，不然会有很多问题的。本来就是这么想的，如果以后html5的验证好用了，就能够以这种格式直接兼容了，但是现在的h5验证实在是不好用。
需要验证的要加上required这个属性，然后验证规则用正则写在pattern的属性里面，需要的提示写在data-tip的属性里面。
暂时只能单提示。晚点我再补上多提示的。
```html
<form novalidate>
    <input type="number" name="number" id="number" required pattern="^[0-9]{8}$" data-tip="这里应该填8位数字学号">
</form>
```
###css
```css
/* 这一段是浮层提示的样式，请务必加进去 */
.shadow {
  width: 100%;
  height: 100%;
  font-size: 0;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.shadow::after {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 100%;
  content: '';
}
.shadow .tips {
  font-size: 14px;
  padding: 10px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  background: #fff;
  border-radius: 10px;
}
/* 然后如果是用页内提示的话，你需要写这些样式。样式自己写，但是一定要用下面这几个名字 */
/* 提示文字的样式 */
.error {
	color: red;
	font-size: 12px;
}
/* 验证失败的input的样式 */
.warn {
    border: 1px solid red;
}
/* 正常的input样式 */
.normal {
	border: 1px solid #eee;
}
```

##最后
好吧这么写完下来发现问题真的挺多了，让我稍微冷静下再优化吧。
2016/05/06 Miumiu