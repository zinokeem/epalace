/**
 *
 */
function pageManager() {
    this.sumCount;
    this.sumPage;
    this.startPage;
    this.startCount;
    this.offset;
    this.init();
};
pageManager.prototype.init = function() {
    this.sumCount = 0;
    this.sumPage = 0;
    this.startPage = 0;
    this.startCount = 0;
    this.offset = 10;
}
pageManager.prototype.setSumCount = function(value) {
    this.sumCount = value;
    this.changeOffset(this.offset);
}
pageManager.prototype.changeOffset = function(value) {
    if (value == undefined || value < 1) {
        return;
    } else {
        this.offset = value;
        this.sumPage = this.convertPage(this.sumCount);
        this.movePage(0);
    }
}
pageManager.prototype.prevPage = function() {
    this.startCount -= this.offset;
    if (this.startCount < 0) {
        this.startCount = 0;
    }
    this.startPage = this.convertPage(this.startCount);
    return this.startCount;
}
pageManager.prototype.nextPage = function() {
    this.startCount += this.offset;
    if (this.startCount > this.sumCount) {
        this.startCount = (this.sumCount - (this.sumCount % this.offset));
    } else if (this.startCount == this.sumCount) {
        this.startCount = this.startCount - this.offset;
    }
    this.startPage = this.convertPage(this.startCount);
    return this.startCount;
}
pageManager.prototype.movePage = function(value) {
    if (value <= (this.sumPage - 1)) {
        this.startPage = value;
        this.startCount = ((value + 1) * this.offset) - this.offset;
    }
}
pageManager.prototype.getPageList = function() {
    var list = new Array();
    for (var loop = 0; loop < this.sumPage; loop++) {
        list.push(loop);
    }
    return list;
}

pageManager.prototype.convertPage = function(value) {
    return Math.floor((value / this.offset) + (value % this.offset > 0 ? 1 : 0));
}

