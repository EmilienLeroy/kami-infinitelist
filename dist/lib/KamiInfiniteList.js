"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//polyfill
require("@webcomponents/webcomponentsjs/custom-elements-es5-adapter");
require("@webcomponents/webcomponentsjs/webcomponents-bundle");
require("web-animations-js");
var kami_component_1 = require("kami-component");
var KamiInfiniteList = /** @class */ (function (_super) {
    __extends(KamiInfiniteList, _super);
    function KamiInfiniteList() {
        var _this = _super.call(this) || this;
        console.log('ok');
        return _this;
    }
    KamiInfiniteList.prototype.initEventListener = function () {
    };
    KamiInfiniteList.prototype.setProperties = function () {
    };
    KamiInfiniteList.prototype.renderHtml = function () {
        return "";
    };
    KamiInfiniteList.prototype.renderStyle = function () {
        return "";
    };
    return KamiInfiniteList;
}(kami_component_1.default));
exports.default = KamiInfiniteList;
//# sourceMappingURL=KamiInfiniteList.js.map