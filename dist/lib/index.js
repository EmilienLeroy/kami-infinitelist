"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// polyfill
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter");
require("@webcomponents/webcomponentsjs/webcomponents-bundle");
require("web-animations-js");
// import lib
var KamiSearchBar_1 = require("./components/KamiSearchBar");
var KamiInfiniteList_1 = require("./components/KamiInfiniteList");
// define the search if is not already define
if (!customElements.get(KamiSearchBar_1.default.tag)) {
    customElements.define(KamiSearchBar_1.default.tag, KamiSearchBar_1.default);
}
// export only the infinite list
exports.default = KamiInfiniteList_1.default;
//# sourceMappingURL=index.js.map