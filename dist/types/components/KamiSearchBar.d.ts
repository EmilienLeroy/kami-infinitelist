import KamiComponent from 'kami-component';
import ISearchEvent from '../interfaces/ISearchEvent';
import ISortEvent from '../interfaces/ISortEvent';
declare class KamiSearchBar extends KamiComponent {
    private sortEvent;
    private searchEvent;
    private sort;
    private search;
    constructor();
    static readonly observedAttributes: string[];
    static readonly tag: string;
    setProperties(): void;
    connectedCallback(): void;
    initEventListener(): void;
    updateSortEvent(): CustomEvent<ISortEvent>;
    updateSearchEvent(): CustomEvent<ISearchEvent>;
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
