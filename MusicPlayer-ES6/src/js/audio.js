class AudioManage {
    constructor() {
        this.audio = new Audio();    // 创建一个Audio实例
        this.status = 'pause';       // 歌曲的状态默认为暂停
    }
    load(src) {     // 加载音乐
        this.audio.src = src;    // 设置音乐路径
        this.audio.load();       // 加载音乐
    }
    play() {        // 播放音乐
        this.audio.play();
        this.status = 'play';
    }
    pause() {       // 暂停音乐
        this.audio.pause();
        this.status = 'pause';
    }
    end(fn) {   // 音乐播放完成事件
        this.audio.onended = fn;
    }
    playTo(time) {  // 跳转到音乐的某个时间点
        this.audio.currentTime = time;   // 单位为秒
    }
}
export default new AudioManage();