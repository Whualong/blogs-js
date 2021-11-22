"use strict";

var list = ['11', '22'];
var pObj = new Proxy(list, {
  get: function get(target, propKey, receiver) {
    console.log("getting ".concat(propKey, "!"));
    return Reflect.get(target, propKey, receiver);
  },
  set: function set(target, propKey, value, receiver) {
    console.log("setting ".concat(propKey, "!"));
    return Reflect.set(target, propKey, value, receiver);
  }
});