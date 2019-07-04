import KamiComponent from 'kami-component';
declare class KamiSearchBar extends KamiComponent {
    sortEvent: any;
    searchEvent: any;
    sort: any;
    search: any;
    constructor();
    static readonly observedAttributes: string[];
    static readonly tag: string;
    setProperties(): void;
    connectedCallback(): void;
    initEventListener(): void;
    /**
     * Init the sort arrow
     * @returns {SearchBar} this
     */
    initSort(): this;
    /**
     * Toggle the sort ascending/descending
     * @returns {SearchBar} this
     */
    toggleSort(): this;
    renderHtml(): string;
    renderStyle(): string;
}
export default KamiSearchBar;
