import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'web-animations-js';
import KamiComponent from 'kami-component';
declare class KamiInfiniteList extends KamiComponent {
    components: any[];
    inLoad: boolean;
    end: boolean;
    container: any;
    component: any;
    componentAttributes: any[];
    data: any;
    constructor();
    static readonly observedAttributes: string[];
    setProperties(): void;
    initEventListener(): void;
    connectedCallback(): void;
    /**
     * This methode get the data from the datasource.
     * After it will create all the dom and append this into the infinite list.
     * @returns {InfiniteList} this
     */
    getData(): this;
    /**
     * Update the url query and reload all the data.
     * @param {Object} object
     * @param {String} object.param - param for the url
     * @param {String} object.value - the value of the param
     * @returns {InfiniteList} this
     */
    updateData(param: string, value: string): this;
    /**
     * Reset all the property of list to reload new data.
     * @returns {InfiniteList} this
     */
    resetList(): this;
    /**
     * Convert your data
     * @param {Object} obj - Object to convert
     * @param {String} path - path
     * @param {String} separator
     */
    convertData(obj: Window | undefined, path: any, separator?: string): any;
    /**
     * Add a new component into the main container
     * @param {HTMLElement} component - add
     */
    addComponent(component: any): void;
    /**
     * Get all attribute for a dom
     * @param {HTMLElement} el - an html element this attr
     * @returns {Array.<String>} - all attribute in a array
     */
    getAttributes(el: any): any[];
    renderSearch(): string;
    renderHtml(): string;
    renderStyle(): string;
}
export default KamiInfiniteList;
