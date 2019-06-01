## Canvas可视化音频效果 ##

> 参考文章：[文章A](https://www.jianshu.com/p/14f1a5af6dd6) | [文章B](https://segmentfault.com/a/1190000017090438) | [文章C](https://www.cnblogs.com/axes/p/3842812.html)

#### 使用导航 ####

* [引入文件](#引入文件)
* [使用示例](#使用示例)
* [方法与属性](#方法与属性)
* [效果展示](#效果展示)

#### 引入文件 ####

1. 浏览器环境

    ```html
    <script src="path/to/canvas-circular-audio.min.js"></script>
    ```

2. ES6模块

    ```javascript
    import CanvasCirclularAudio from 'path/to/canvas-circular-audio.es.min.js'
    ```

[_回到顶部_](#使用导航)

#### 使用示例 ####

1. 添加 `<audio>` 与 `<canvas>` 元素

    ```html
    <body>
        <div id="app">
            <audio
                id="audio-sample"
                src="path/to/music.mp3"
                controls
            >
                您的浏览器不支持 audio 标签
            </audio>
            <canvas id="canvas-audio">
                您的浏览器不支持 canvas 标签
            </canvas>
        </div>
    </ body>
    ```

2. 生成并控制 `CanvasCirclularAudio` 实例

    ```javascript
    document.addEventListener('DOMContentLoaded', function () {

        // 获取节点
        var audioNode = document.querySelector('#audio-sample')
        var canvasNode = document.querySelector('#canvas-audio')

        // 实例化CanvasCirclularAudio
        var cca = new CanvasCirclularAudio({
            audioNode: audioNode,
            canvasNode: canvasNode,
            canvasWidth: canvasNode.clientWidth,
            canvasHeight: 400,
            picture: './cover.jpg',
            rotatable: true,
            rotateStep: 0.2,
            lineWidth: 1,
            lineCap: 'butt',
            fillStyle: '#f44336',
            strokeStyle: '#f44336',
            backgroundColor: 'rgba(0, 0, 0, .1)'
        })

        // 初始化实例
        cca.init()

        // 设置新的图片
        cca.picture = '新的图像地址'

        // 设置canvas新的宽度
        cca.canvasWidth = 600

        // 设置canvas新的高度
        cca.canvasHeight = 300

        // 或者，同时设置新的宽度和高度
        cca.sizeCanvas(600, 300)

        // 设置canvas新的属性
        cca.setContext({
            lineWidth: 1.5,
            lineCap: 'square',
            fillStyle: 'white',
            strokeStyle: '#2196f3',
            backgroundColor: '#ffeb3b'
        })

    })
    ```

[_回到顶部_](#使用导航)

#### 方法与属性 ####

1. 构造方法 `CanvasCirclularAudio()`

* 使用

    ```javascript
    let options = {
        // 一些参数
    }
    var cca = new CanvasCirclularAudio(options)
    ```

* options

    参数名 | 类型 | 默认值 | 是否必要 | 说明
    --- | --- | --- | --- | ---
    audioNode | 元素节点 | `undefined` | 是 | 实例关联的`<audio>`
    canvasNode | 元素节点 | `undefined` | 是 | 实例关联的`<canvas>`
    canvasWidth | `number` | `400` | 否 | 画布的初始化宽度
    canvasHeight | `number` | `200` | 否 | 画布的初始化高度
    picture | `string` | `null` | 否 | 画布中心显示的图像
    rotatable | `boolean` | `true` | 否 | 图像是否旋转显示
    rotateStep | `number` | `0.2` | 否 | 图像旋转角度间隔，范围为`[0-1]`
    lineWidth | `number` | `2` | 否 | 频谱线宽度
    lineCap | `string` | `round` | 否 | 频谱线末端线帽样式
    fillStyle | `string` | `#e91e63` | 否 | 频谱点填充样式
    strokeStyle | `string` | `#e91e63` | 否 | 频谱线线条样式
    backgroundColor | `string` | `null` | 否 | 画布背景渐变基色

[_回到顶部_](#使用导航)

2. 实例方法

* 初始化画布 `init()`

    + 使用
    
      ```javascript
      cca.init()
      ```

* 设置画布尺寸 `sizeCanvas()`

    + 使用
    
        ```javascript
        cca.sizeCanvas(width, height)
        ```

    + params

        参数名 | 类型 | 默认值 | 是否必要 | 说明
        --- | --- | --- | --- | ---
        width | `number` | 无 | 是 | 画布宽度，单位（px）
        height | `number` | 无 | 是 | 画布高度，单位（px）

* 设置画布上下文 `setContext()`

    + 使用

        ```javascript
        var options = {
            // 一些参数
        }
        cca.setContext(options)
        ```

    + options

        参数名 | 类型 | 默认值 | 是否必要 | 说明
        --- | --- | --- | --- | ---
        lineWidth | `number` | 上一次设置的值 | 否 | 频谱线宽度
        lineCap | `string` | 上一次设置的值 | 否 | 频谱线末端线帽样式
        fillStyle | `string` | 上一次设置的值 | 否 | 频谱点填充样式
        strokeStyle | `string` | 上一次设置的值 | 否 | 频谱线线条样式
        backgroundColor | `string` | 上一次设置的值 | 否 | 画布背景渐变基色

[_回到顶部_](#使用导航)

3. 实例属性

    属性名 | 类型 | 默认值 | 是否只读 | 说明
    --- | --- | --- | --- | ---
    picture | `string` | `null` | 否 | 设置或返回画布中心图像路径
    canvasWdith | `number` | `400` | 否 | 设置或返回画布宽度
    canvasHeight | `number` | `200` | 否 | 设置或返回画布高度
    lineWidth | `number` | `2` | 否 | 设置或返回频谱线宽度
    lineCap | `string` | `round` | 否 | 设置或返回频谱线末端线帽样式
    fillStyle | `string` | `#e91e63` | 否 | 设置或返回频谱点填充样式
    strokeStyle | `string` | `#e91e63` | 否 | 设置或返回频谱线线条样式
    backgroundColor | `string` | `null` | 否 | 设置或返回画布背景渐变基色
    
[_回到顶部_](#使用导航)

#### 效果展示 ####

![screenshot](/docs/0.jpg "0.jpg")
![screenshot](/docs/1.jpg "1.jpg")
![screenshot](/docs/2.jpg "2.jpg")
    
[_回到顶部_](#使用导航)