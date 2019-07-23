import KamiComponent from 'kami-component';
import ISearchEvent from '../interfaces/ISearchEvent';
import ISortEvent from '../interfaces/ISortEvent';
declare class KamiSearchBar extends KamiComponent {
    static readonly observedAttributes: string[];
    static readonly tag: any;
    /**
     * @returns {HTMLElement} the sort dom
     */
    private readonly sort;
    /**
     * @returns {HTMLInputElement} the search dom
     */
    private readonly search;
    /**
     * This is emit when the sort btn is clicked.
     * @property {CustomEvent<ISortEvent>} sortEvent - sort event
     */
    private sortEvent;
    /**
     * This is emit when the key enter is press and the search bar is focus.
     * @property {CustomEvent<ISearchEvent>} searchEvent - seach event
     */
    private searchEvent;
    constructor();
    setProperties(): void;
    connectedCallback(): void;
    initEventListener(): void;
    /**
     * Update data and create a new sort event with this.
     * @returns {CustomEvent<ISortEvent>} a sort event
     */
    updateSortEvent(): CustomEvent<ISortEvent>;
    /**
     * Update data and create a new search event with this.
     * @returns {CustomEvent<ISearchEvent>} a search event
     */
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
