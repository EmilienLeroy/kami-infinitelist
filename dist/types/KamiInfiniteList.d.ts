import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'web-animations-js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import KamiComponent from 'kami-component';
declare class KamiInfiniteList extends KamiComponent {
    /**
     * @property {Array<Object>} - store all the component get form the datasource
     */
    private components;
    /**
     * is true if the list is in loading
     * @property {Boolean} - loading stat
     */
    private inLoad;
    /**
     * This property is at true if the datasource is at the end
     * @property {Boolean} - stat of the datasource
     */
    private end;
    /**
     * @property {any} - the main dom container
     */
    private container;
    /**
     * @property {any} - the delegate component dom
     */
    private component;
    /**
     * @property {any[]} componentAttributes - attribute of your delegate components
     */
    private componentAttributes;
    /**
     * @property {any} data - current data load
     */
    private data;
    clickElementEvent: any;
    clickElement: any;
    constructor();
    static readonly observedAttributes: string[];
    setProperties(): void;
    initEventListener(): void;
    connectedCallback(): void;
    /**
     * Generate a request with the current datasource and query.
     * @returns {Request} the generate request
     */
    generateRequest(): Request;
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
    clickedEvent(component: HTMLElement): this;
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
    addComponent(component: HTMLElement): this;
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
