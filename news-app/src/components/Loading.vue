<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>


<style scoped>
.loading{
    height: 40px;
    margin: 100px auto;
    display: flex;
    justify-content: center;
}
.loading span{
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background-color: lightgreen;
    animation: load 1s ease infinite;
    margin: 0 2px;
}
@keyframes load{
    0%,
    100% {
        transform: scaleY(1.5);
        background-color: lightgreen;
    }
    50% {
        transform: scaleY(1);
        background-color: lightblue;
    }
}
.loading span:nth-child(2){
    animation-delay: 0.2s;
}
.loading span:nth-child(3){
    animation-delay: 0.4s;
}
.loading span:nth-child(4){
    animation-delay: 0.6;
}
.loading span:nth-child(5){
    animation-delay: 0.8s;
}
</style>