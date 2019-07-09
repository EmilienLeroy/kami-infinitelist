"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//polyfill
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter");
require("@webcomponents/webcomponentsjs/webcomponents-bundle");
require("web-animations-js");
//import lib
var KamiSearchBar_1 = require("./KamiSearchBar");
var KamiInfiniteList_1 = require("./KamiInfiniteList");
//define the iron-icon component if is not already define
if (!customElements.get('iron-icon')) {
    Promise.resolve().then(function () { return require('@polymer/iron-icons'); });
    Promise.resolve().then(function () { return require('@polymer/iron-icon'); });
}
//define the search if is not already define
if (!customElements.get(KamiSearchBar_1.default.tag)) {
    customElements.define(KamiSearchBar_1.default.tag, KamiSearchBar_1.default);
}
//export only the infinite list
exports.default = KamiInfiniteList_1.default;
//# sourceMappingURL=index.js.map