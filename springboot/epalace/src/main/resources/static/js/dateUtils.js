/**
 *
 */

function DateUtils() {
    this.privar = 0;
}
DateUtils.prototype.toString = function(property) {
    var date = new Date();
        date.setTime(property);
    var text = '';
        text += date.getFullYear()+"/"
        text += (date.getMonth() + 1) + "/"
        text += date.getDate()+" "
        text += date.getHours()+":"
        text += date.getMinutes();
    return text;
}