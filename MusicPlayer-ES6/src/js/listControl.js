function listControl(data, wrap) {
    let list = document.createElement('div'),
        dl = document.createElement('dl'),
        dt = document.createElement('dt'),
        close = document.createElement('div'),
        musicList = [];

    list.className = 'list';
    dt.innerHTML = '播放列表';
    close.className = 'close';
    close.innerHTML = '关闭';

    dl.appendChild(dt);
    data.forEach((item, index) => {
        let dd = document.createElement('dd');
        dd.innerHTML = item.name;
        dd.addEventListener('touchend',() => {
            changeSelect(index);
        });
        dl.appendChild(dd);
        musicList.push(dd);
    })

    list.appendChild(dl);
    list.appendChild(close);
    wrap.appendChild(list);

    let disY = list.offsetHeight;
    list.style.transform = `translateY(${disY}px)`;

    close.addEventListener('touchend', slideDown);

    function slideUp() {   // 列表滑动显示
        list.style.transform = `translateY(0)`;
        list.style.transition = 'all 0.3s';
    }
    function slideDown() { // 列表滑动隐藏
        list.style.transform = `translateY(${disY}px)`;
        list.style.transition = 'all 0.3s';
    }
    function changeSelect(index) {
        for (let i = 0; i < musicList.length; i++) {
            musicList[i].className = '';
        }
        musicList[index].className = 'active';
    }
    changeSelect(0);
    return {
        dom: list,
        musicList,
        slideUp,
        slideDown,
        changeSelect,
    }
}
export default listControl;