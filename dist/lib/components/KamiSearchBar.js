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
var kami_component_1 = require("kami-component");
var order_1 = require("../enum/order");
var KamiSearchBar = /** @class */ (function (_super) {
    __extends(KamiSearchBar, _super);
    function KamiSearchBar() {
        var _this = _super.call(this) || this;
        _this.sortEvent = _this.updateSortEvent();
        _this.searchEvent = _this.updateSearchEvent();
        return _this;
    }
    Object.defineProperty(KamiSearchBar, "observedAttributes", {
        get: function () {
            return ['search', 'sort', 'order'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KamiSearchBar, "tag", {
        get: function () {
            return 'kami-searchbar';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KamiSearchBar.prototype, "sort", {
        /**
         * @returns {HTMLElement} the sort dom
         */
        get: function () {
            return this.wrapper.querySelector('#sort');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KamiSearchBar.prototype, "search", {
        /**
         * @returns {HTMLInputElement} the search dom
         */
        get: function () {
            return this.wrapper.querySelector('#search');
        },
        enumerable: true,
        configurable: true
    });
    KamiSearchBar.prototype.setProperties = function () {
        // init the observed props
        this.props = this.observe({
            sortIcone: 'arrow_drop_down',
            order: this.getAttribute('order'),
            sort: this.getAttribute('sort') || 'id',
            search: this.getAttribute('search') || 'name'
        });
    };
    KamiSearchBar.prototype.connectedCallback = function () {
        // init the sort state
        this.initSort();
    };
    KamiSearchBar.prototype.initEventListener = function () {
        var _this = this;
        // create the sort event
        this.sortEvent = this.updateSortEvent();
        // create the search event
        this.searchEvent = this.updateSearchEvent();
        // add sort event listener
        this.sort.addEventListener('click', function (event) {
            event.preventDefault();
            _this.toggleSort();
        });
        // add search evenet listener
        this.search.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                // reload the search props with the input value
                // this is necessary for the template reloard
                _this.props.search = _this.search.value;
                // send the search event
                _this.dispatchEvent(_this.searchEvent);
            }
        });
    };
    /**
     * Update data and create a new sort event with this.
     * @returns {CustomEvent<ISortEvent>} a sort event
     */
    KamiSearchBar.prototype.updateSortEvent = function () {
        return new CustomEvent('sort', {
            detail: {
                order: this.props.order,
                sort: this.props.sort
            }
        });
    };
    /**
     * Update data and create a new search event with this.
     * @returns {CustomEvent<ISearchEvent>} a search event
     */
    KamiSearchBar.prototype.updateSearchEvent = function () {
        return new CustomEvent('search', {
            detail: {
                search: this.props.search
            }
        });
    };
    /**
     * Init the sort arrow
     * @returns {SearchBar} this
     */
    KamiSearchBar.prototype.initSort = function () {
        this.props.order === order_1.default.ASC
            ? (this.props.sortIcone = 'arrow-drop-down')
            : (this.props.sortIcone = 'arrow-drop-up');
        return this;
    };
    /**
     * Toggle the sort ascending/descending
     * @returns {SearchBar} this
     */
    KamiSearchBar.prototype.toggleSort = function () {
        // if is already ascending
        if (this.props.order === order_1.default.ASC) {
            // set the sort into descending
            this.props.order = order_1.default.DESC;
            this.props.sortIcone = 'arrow-drop-up';
        }
        else {
            // set the sort into ascending
            this.props.order = order_1.default.ASC;
            this.props.sortIcone = 'arrow-drop-down';
        }
        // send the sort event
        this.dispatchEvent(this.sortEvent);
        return this;
    };
    KamiSearchBar.prototype.renderHtml = function () {
        return "\n            <div class=\"searchbar\">\n                <iron-icon icon=\"search\"></iron-icon>  \n                <input \n                    value=\"" + this.props.search + "\" \n                    id=\"search\" \n                    class=\"searchbar__input " + (this.props.search ? 'searchbar__input--insearch' : '') + "\" \n                    type=\"text\" \n                    placeholder=\"Search\"\n                >\n                <div id=\"sort\" class=\"searchbar__sort\">\n                    <iron-icon icon=\"" + this.props.sortIcone + "\"></iron-icon>    \n                </div>\n            </div>\n        ";
    };
    KamiSearchBar.prototype.renderStyle = function () {
        return "\n\n            iron-icon{\n                color: #8080809e;\n            }\n\n            .searchbar{\n                padding: 10px;\n                display: flex;\n                margin: 0px 0px 7px 0px;\n                justify-content: space-between;\n                border-radius: 5px;\n                box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);\n                align-items: center;\n            }\n  \n            .searchbar__input{\n                flex-grow: 1;\n                border-radius: 2px;\n                margin: 0 10px;\n                border: none;\n                padding: 10px;\n            }\n            \n            .searchbar__input--insearch{\n                background-color: #80808014;\n            }\n\n            .searchbar__sort{\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                cursor: pointer;\n            }\n\n        ";
    };
    return KamiSearchBar;
}(kami_component_1.default));
// export the component
exports.default = KamiSearchBar;
//# sourceMappingURL=KamiSearchBar.js.map