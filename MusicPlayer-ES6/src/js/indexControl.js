class IndexControl {
    constructor(len) {
        this.index = 0;
        this.len = len;
    }
    prev() {        // 用来获取上一个索引
        return this.get(-1);
    }
    next() {        // 用来获取下一个索引
        return this.get(1);
    }
    get(val) {      // 用来获取索引，参数为+1或者-1
        this.index = (this.index + val + this.len) % this.len;
        return this.index;
    }
}
export default IndexControl;