import render from "./render.js";
import music from './audio.js';
import IndexControl from './indexControl.js';
import listControl from './listControl.js';
import { progress, Drag } from './progress.js';

class MusicPlayer {
    constructor(dom) {
        this.wrap = dom;      // 播放器容器
        this.dataList = [];   // 存储请求到的数据
        this.indexObj = null; // 索引值对象 
        this.rotateTimer = null;
        this.curIndex = 0;    // 当前播放歌曲的索引值
        this.list = null;     // 列表切割对象
    }
    init() {     // 初始化            
        this.getDom();    // 获取元素
        this.getData('../mock/data.json')  // 请求数据
    }
    getDom() {   // 获取页面里的元素
        this.record = document.querySelector('.songImg img');    // 旋转图片
        this.controlBtns = document.querySelectorAll('.control li');   // 底部导航按钮
    }
    getData(url) {
        $.ajax({
            url,
            method: 'get',
            success: data => {
                // console.log(data);
                this.dataList = data;      // 存储请求来的数据 
                this.listPlay();
                this.indexObj = new IndexControl(data.length);  // 给索引值对象赋值
                this.loadMusic(this.indexObj.index);  // 加载音乐
                this.musicControl();       // 音乐操作功能
                this.dragProgress();
            },
            error: () => {
                console.log('数据请求失败');
            }
        })
    }
    loadMusic(index) {   // 加载音乐
        render(this.dataList[index]);    // 渲染图片、歌曲信息···
        music.load(this.dataList[index].audioSrc);
        progress.renderAlltime(this.dataList[index].duration)

        if (music.status == 'play') {    // 播放音乐
            music.play();
            this.controlBtns[2].className = 'playing';
            this.imageRotate(0);
            progress.move(0);
        }
        this.list.changeSelect(index);  // 改变列表里歌曲的选中状态
        this.curIndex = index;   // 存储当前歌曲索引值
        
    }
    musicControl() {     // 控制音乐（上一首、下一首）
        // 上一首
        this.controlBtns[1].addEventListener('touchend', () => {
            music.status = 'play';
            this.loadMusic(this.indexObj.prev());
        }),
        // 暂停和播放
        this.controlBtns[2].addEventListener('touchend', () => {
            if (music.status == 'play') {
                music.pause();
                this.controlBtns[2].className = '';
                this.imageStop();
                progress.stop();
            } else {
                music.play();
                this.controlBtns[2].className = 'playing';
                let deg = this.record.dataset.rotate;
                this.imageRotate(deg);
                progress.move();
            }

        }),
        // 下一首
        this.controlBtns[3].addEventListener('touchend', () => {
            music.status = 'play';
            this.loadMusic(this.indexObj.next());
        })
        music.end(() => {
            music.status = 'play';
            this.loadMusic(this.indexObj.next());
        })
    }
    // 旋转唱片图片
    imageRotate(deg = 0) {
        clearInterval(this.rotateTimer);
        this.rotateTimer = setInterval(() => {
            deg = +deg + 0.2;
            this.record.style.transform = `rotate(${deg}deg)`;
            this.record.dataset.rotate = deg;   // 把旋转的角度存在标签上
        }, 1000 / 60);
    }
    // 暂停旋转唱片图片
    imageStop() {
        clearInterval(this.rotateTimer);
    }
    // 列表切歌
    listPlay() {
        this.list = listControl(this.dataList, this.wrap);
        this.controlBtns[4].addEventListener('touchend', () => {
            this.list.slideUp();
        })
        // 歌曲列表添加事件
        this.list.musicList.forEach((item, index) => {
            item.addEventListener('touchend', () => {
                if (this.curIndex == index) {
                    return;
                }
                music.status = 'play';
                this.indexObj.index = index;    // 索引值对象身上的当前索引值要更新 
                this.loadMusic(index);
                this.list.slideDown();
            })
        })
    }
    dragProgress() {
        let circle = new Drag(document.querySelector('.circle'));
        circle.start = () => {
            progress.stop();
        }
        circle.move = per => {

            progress.update(per, true);
        }
        circle.end = per => {
            let cutTime = per * this.dataList[this.indexObj.index].duration;

            music.play();
            music.playTo(cutTime);
            progress.move(per, false);

            let deg = this.record.dataset.rotate;
            this.imageRotate(deg);
            this.controlBtns[2].className = 'playing';
        }
    }
}



let musicPlayer = new MusicPlayer(document.getElementById('wrap'));
musicPlayer.init();
