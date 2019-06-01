/**
 * CanvasCirclularAudio 音频可视化
 */
class CanvasCirclularAudio {

    // 构造函数
    constructor (options) {
        const DEFAULT = {
            audioNode: null,
            canvasNode: null,
            partNumber: 6,
            partEvenReverse: true,
            canvasWidth: 400,
            canvasHeight: 200,
            picture: null,
            rotatable: false,
            rotateStep: 0.2,
            lineWidth: 2,
            lineCap: 'round',
            fillStyle: '#e91e63',
            strokeStyle: '#e91e63',
            backgroundColor: null
        }
        this.center = {
            x: 0,
            y: 0
        }
        this.audioData = {
            source: {},
            analyser: {},
            fftSize: 1024,
            frequencyData: []
        }
        this.playing = false
        this.rotateAngle = 0
        this.img = new Image()
        this.imgLoaded = false
        Object.assign(this, Object.assign({}, DEFAULT, options))
        this.ctx = this.canvasNode.getContext('2d')
    }

    // 画布宽度
    get canvasWidth () {
        return this.canvasNode.width
    }

    set canvasWidth (value) {
        let tempType = typeof value
        if (tempType === 'number') {
            this.canvasNode.width = value
            this.center.x = value / 2
        } else {
            window.console.warn(`Type of width should be number, detected ${tempType}.`)
        }
    }

    // 画布高度
    get canvasHeight () {
        return this.canvasNode.height
    }

    set canvasHeight (value) {
        let tempType = typeof value
        if (tempType === 'number') {
            this.canvasNode.height = value
            this.center.y = value / 2
        } else {
            window.console.warn(`Type of width should be number, detected ${tempType}.`)
        }
    }

    // 是否旋转
    get rotatable () {
        return this._rotatable
    }

    set rotatable (value) {
        let tempType = typeof value
        if (tempType !== 'boolean') {
            window.console.warn(`Type of width should be boolean, detected ${tempType}.`)
            this._rotatable = false
        } else {
            this._rotatable = value
        }
    }

    // 旋转步进
    get rotateStep () {
        return this._rotateStep
    }

    set rotateStep (value) {
        this._rotateStep = 0.2
        let tempType = typeof value
        if (tempType !== 'number') {
            window.console.warn(`Type of width should be number, detected ${tempType}.`)
        } else if (value < 0 || value > 1) {
            window.console.warn('The range of rotateStep should be [0, 1].')
        } else {
            this._rotateStep = value
        }
    }

    // 图片路径
    get picture () {
        return this.img.src
    }

    set picture (value) {
        this.imgLoaded = false
        if (value) {
            this.img.src = value
        }
    }

    // 音频处理
    processAudio () {
        let audioCtx = new AudioContext()
        let source = audioCtx.createMediaElementSource(this.audioNode)
        let analyser = audioCtx.createAnalyser()
        source.connect(analyser)
        analyser.connect(audioCtx.destination)
        analyser.fftSize = this.audioData.fftSize
        this.audioData.source = source
        this.audioData.analyser = analyser
        this.audioData.frequencyData = new Uint8Array(analyser.frequencyBinCount)
    }

    // 绘制帧
    drawFrame () {
        // 一些变量
        let { analyser, frequencyData } = this.audioData
        analyser.getByteFrequencyData(frequencyData)
        let { width, height } = this.canvasNode
        let maxRadius = Math.min(width, height) / 2
        let radiusRing = maxRadius * 0.56
        let radius0 = maxRadius * 0.7
        let scale = maxRadius * 0.2 / 255
        let angle = 360 / this.partNumber
        let average = frequencyData.slice(0, angle)
            .reduce((sum, value) => {
                return sum + value
            }) / angle
        let ctx = this.ctx
        // 清空画布
        ctx.clearRect(0, 0, this.canvasNode.width, this.canvasNode.height)
        // 显示图片
        if (this.picture && this.imgLoaded) {
            // 中心图片
            let origWidth = this.img.width
            let origHeight = this.img.height
            let newWidth = 0
            let newHeight = 0
            let scale = 0
            if (origWidth > origHeight) {
                newWidth = radius0 * 2 * 0.8
                scale = newWidth / origWidth
                newHeight = origHeight * scale
            } else {
                newHeight = radius0 * 2 * 0.8
                scale = newHeight / origWidth
                newWidth = origWidth * scale
            }
            let coordX = this.center.x - newWidth / 2
            let coordY = this.center.y - newHeight / 2
            // 图片背景
            ctx.fillStyle = 'white'
            ctx.beginPath()
            ctx.arc(this.center.x, this.center.y, radiusRing, 0, 2 * Math.PI)
            ctx.fill()
            // 旋转背景
            if (this.rotatable && this.playing) {
                this.rotateAngle += this.rotateStep
            }
            ctx.save()
            ctx.translate(this.center.x, this.center.y)
            ctx.rotate(this.rotateAngle / 180 * Math.PI)
            ctx.translate(-this.center.x, -this.center.y)
            ctx.drawImage(this.img, coordX, coordY, newWidth, newHeight)
            ctx.restore()
            // 截取图片
            ctx.globalCompositeOperation = 'destination-in'
            ctx.beginPath()
            ctx.arc(this.center.x, this.center.y, radiusRing, 0, 2 * Math.PI)
            ctx.fill()
        // 默认文字
        } else {
            ctx.fillStyle = '#2196f3'
            ctx.beginPath()
            ctx.arc(this.center.x, this.center.y, radiusRing * 0.9, 0, 2 * Math.PI)
            ctx.fill()
            ctx.fillStyle = '#42a5f5'
            ctx.beginPath()
            ctx.arc(this.center.x, this.center.y, radiusRing * 0.7, 0, 2 * Math.PI)
            ctx.fill()
            ctx.font = `${radiusRing}px Arial`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'white'
            ctx.fillText('M', this.center.x, this.center.y, radiusRing)
        }
        // 渐变背景
        if (this.backgroundColor) {
            ctx.globalCompositeOperation = 'destination-over'
            let grd = ctx.createRadialGradient(this.center.x, this.center.y, radius0,
                this.center.x, this.center.y, Math.max(width, height) / 2)
            grd.addColorStop(0, this.backgroundColor)
            grd.addColorStop(1, 'white')
            ctx.fillStyle = grd
            ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        }
        // 动态频谱
        ctx.lineCap = this.lineCap
        ctx.lineWidth = this.lineWidth
        ctx.fillStyle = this.fillStyle
        ctx.strokeStyle = this.strokeStyle
        ctx.globalCompositeOperation = 'source-over'
        let drawPart = (reverse = false) => {
            for (let i = 0; i < angle; i += 2) {
                let value = reverse && this.partEvenReverse ? frequencyData[angle - 1 - i] : frequencyData[i]
                let radius1 = radius0 + value * scale
                let radius2 = radius0 - Math.max(value - average, 0) * scale
                let radian = i / 180 * Math.PI
                // 设置圆心
                ctx.beginPath()
                ctx.moveTo(this.center.x, this.center.y)
                let x0 = this.center.x - radius0 * Math.cos(radian)
                let y0 = this.center.y - radius0 * Math.sin(radian)
                ctx.moveTo(x0, y0)
                // 外层效果
                let x1 = this.center.x - radius1 * Math.cos(radian)
                let y1 = this.center.y - radius1 * Math.sin(radian)
                ctx.lineTo(x1, y1)
                ctx.stroke()
                // 内层效果
                ctx.beginPath()
                ctx.moveTo(this.center.x, this.center.y)
                let x2 = this.center.x - radius2 * Math.cos(radian)
                let y2 = this.center.y - radius2 * Math.sin(radian)
                ctx.arc(x2, y2, ctx.lineWidth, 0, 2 * Math.PI)
                ctx.fill()
            }
        }
        // 重复区域
        for (let j = 0; j < this.partNumber; j++) {
            ctx.translate(this.center.x, this.center.y)
            ctx.rotate(angle / 180 * Math.PI)
            ctx.translate(-this.center.x, -this.center.y)
            drawPart(this.partNumber % 2 === 0 && j % 2 !== 0)
        }
        // 持续绘图
        requestAnimationFrame(this.drawFrame.bind(this))
    }

    // 事件监听
    listenEvents () {
        // 音频事件监听
        let audio = this.audioNode
        audio.addEventListener('play', () => {
            this.playing = true
        }, false)
        audio.addEventListener('pause', () => {
            this.playing = false
        }, false)
        audio.addEventListener('ended', () => {
            this.playing = false
            this.rotateAngle = 0
        }, false)
        audio.addEventListener('abort', () => {
            this.picture = null
            this.playing = false
            this.rotateAngle = 0
        }, false)
        // 图像事件监听
        let cover = this.img
        cover.addEventListener('load', () => {
            this.imgLoaded = true
        }, false)
    }

    // 设置画布尺寸
    sizeCanvas (newWidth, newHeight) {
        this.canvasWidth = newWidth
        this.canvasHeight = newHeight
    }

    // 设置画布属性
    setContext ({
        lineCap = this.lineCap,
        lineWidth = this.lineWidth,
        fillStyle = this.fillStyle,
        strokeStyle = this.strokeStyle,
        backgroundColor = this.backgroundColor
    }) {
        Object.assign(this, {
            lineCap,
            lineWidth,
            fillStyle,
            strokeStyle,
            backgroundColor
        })
    }

    // 初始化
    init () {
        this.listenEvents()
        this.processAudio()
        this.drawFrame()
    }

}

// 暴露接口
export default CanvasCirclularAudio