'use strict';

String.prototype.shuffle = function () {
    var array = this.split('');

    for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var holder = array[i];
        array[i] = array[j];
        array[j] = holder;
    }

    return array.join('');
};

Array.prototype.randomPick = function () {
    return this[Math.floor(Math.random()*this.length)];
};