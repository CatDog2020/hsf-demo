import blurImg from './gaussBlur.js';

// 渲染图片
function renderImg(src){
    blurImg(src);           // 给body添加背景图片     
    let img = document.querySelector('.songImg img');
    img.src = src;
}
// 渲染图片信息
function renderInfo(data){
    let songInfoChildren = document.querySelector('.songInfo').children;
    songInfoChildren[0].innerHTML = data.name; 
    songInfoChildren[1].innerHTML = data.singer; 
    songInfoChildren[2].innerHTML = data.album; 
}
// 渲染是否喜欢
function renderIsLike(isLike){
    let lis = document.querySelectorAll('.control li');
    lis[0].className = isLike ? 'liking' : '';
}

export default function render(data) {
    renderImg(data.image);
    renderInfo(data);
    renderIsLike(data.isLike);
}