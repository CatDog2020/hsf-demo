class Progress {
    constructor() {
        this.durTime = 0;           // 存储总时间
        this.frameId = 0;           // 定时器
        this.startTime = 0;         // 开始播放的时间
        this.lastPercent = 0;       // 上一次播放的时间(百分比)
        this.init();
    }
    init() {
        this.getDom();
    }
    getDom() {
        this.curTime = document.querySelector('.curTime');
        this.circle = document.querySelector('.circle');
        this.frontBg = document.querySelector('.frontBg');
        this.totalTime = document.querySelector('.totalTime');
    }
    renderAlltime(time) {
        this.durTime = time;
        time = this.formatTime(time);
        this.totalTime.innerHTML = time;    // 渲染歌曲总时间
    }
    formatTime(time) {
        time = Math.round(time);
        let m = Math.floor(time / 60);
        let s = time % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return `${m}:${s}`;
    }
    move(per, isDrag) {
        this.lastPercent = per === undefined ? this.lastPercent : per;
        this.startTime = new Date().getTime();
        cancelAnimationFrame(this.frameId);
        const frame = () => {
            let curTime = new Date().getTime();
            let per = this.lastPercent + (curTime - this.startTime) / (this.durTime * 1000);
            if (per <= 1) {
                this.update(per, isDrag);
            } else {
                cancelAnimationFrame(this.frameId);
            }
            this.frameId = requestAnimationFrame(frame);
        }
        frame();
    }
    update(per, isDrag) {
        // console.log(per);
        let time = this.formatTime(per * this.durTime);
        this.curTime.innerHTML = time;                  // 更新当前播放时间
        this.frontBg.style.width = `${per * 100}%`;     // 更新进度条的位置
        if (isDrag) {   // 拖拽时不让原点自己走
            return;
        }
        let l = per * this.circle.parentNode.offsetWidth;
        // console.log(l);
        this.circle.style.transform = `translateX(${l}px)`;   // 更新小圆点的位置
    }
    stop() {
        cancelAnimationFrame(this.frameId);
        let stopTime = new Date().getTime();
        this.lastPercent += (stopTime - this.startTime) / (this.durTime * 1000);
    }
}
export class Drag {
    constructor(dom) {
        this.dom = dom;
        this.startPointX = 0;
        this.startLeft = 0;
        this.percent = 0;
        this.init();
    }
    init() {
        this.dom.style.transform = 'translateX(0)';
        this.dom.addEventListener('touchstart', e => {
            this.startPointX = e.changedTouches[0].pageX;
            this.startLeft = parseFloat(this.dom.style.transform.split('(')[1]);
            this.start && this.start();   // 对外暴露拖拽开始的方法，按下的时候要做的事情就交给用户了。
        })
        this.dom.addEventListener('touchmove', e => {
            this.disPointX = e.changedTouches[0].pageX - this.startPointX;    
            let l = this.startLeft + this.disPointX;
            if (l < 0) {
                l = 0;
            } else if (l > this.dom.offsetParent.offsetWidth) {
                l = this.dom.offsetParent.offsetWidth;
            }
            this.dom.style.transform = `translateX(${l}px)`;
            this.percent = l / this.dom.offsetParent.offsetWidth;
            this.move && this.move(this.percent);   // 对外暴露拖拽移动的方法，按下的时候要做的事情就交给用户了。
        })
        this.dom.addEventListener('touchend', e => {
            this.end && this.end(this.percent);   // 对外暴露拖拽结束的方法，按下的时候要做的事情就交给用户了。
        })
    }
}

export let progress = new Progress();


