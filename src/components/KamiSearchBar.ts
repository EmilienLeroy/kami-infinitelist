import KamiComponent from 'kami-component';
import ISearchEvent from '../interfaces/ISearchEvent';
import ISortEvent from '../interfaces/ISortEvent';
import Order from '../enum/order';

class KamiSearchBar extends KamiComponent {
    static get observedAttributes() {
        return ['search', 'sort', 'order'];
    }

    static get tag(): any {
        return 'kami-searchbar';
    }

    /**
     * @returns {HTMLElement} the sort dom
     */
    private get sort(): HTMLElement {
        return this.wrapper.querySelector('#sort') as HTMLElement;
    }

    /**
     * @returns {HTMLInputElement} the search dom
     */
    private get search(): HTMLInputElement {
        return this.wrapper.querySelector('#search') as HTMLInputElement;
    }

    /**
     * This is emit when the sort btn is clicked.
     * @property {CustomEvent<ISortEvent>} sortEvent - sort event
     */
    private sortEvent: CustomEvent<ISortEvent>;

    /**
     * This is emit when the key enter is press and the search bar is focus.
     * @property {CustomEvent<ISearchEvent>} searchEvent - seach event
     */
    private searchEvent: CustomEvent<ISearchEvent>;

    constructor() {
        super();
        this.sortEvent = this.updateSortEvent();
        this.searchEvent = this.updateSearchEvent();
    }

    setProperties() {
        let order: any = this.getAttribute('order');
        //init the observed props
        this.props = this.observe({
            sortIcone: 'arrow_drop_down',
            order: Order[order] || Order.ASC,
            sort: this.getAttribute('sort') || 'id',
            search: this.getAttribute('search') || 'name'
        });
    }

    connectedCallback() {
        //init the sort state
        this.initSort();
    }

    initEventListener() {
        //create the sort event
        this.sortEvent = this.updateSortEvent();

        //create the search event
        this.searchEvent = this.updateSearchEvent();

        //add sort event listener
        this.sort.addEventListener('click', (event: Event) => {
            event.preventDefault();
            this.toggleSort();
        });

        //add search evenet listener
        this.search.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.keyCode == 13) {
                //reload the search props with the input value
                //this is necessary for the template reloard
                this.props.search = this.search.value;

                //send the search event
                this.dispatchEvent(this.searchEvent);
            }
        });
    }

    /**
     * Update data and create a new sort event with this.
     * @returns {CustomEvent<ISortEvent>} a sort event
     */
    public updateSortEvent(): CustomEvent<ISortEvent> {
        return new CustomEvent('sort', {
            detail: {
                order: this.props.order,
                sort: this.props.sort
            } as ISortEvent
        });
    }

    /**
     * Update data and create a new search event with this.
     * @returns {CustomEvent<ISearchEvent>} a search event
     */
    public updateSearchEvent(): CustomEvent<ISearchEvent> {
        return new CustomEvent('search', {
            detail: {
                search: this.props.search
            } as ISearchEvent
        });
    }

    /**
     * Init the sort arrow
     * @returns {SearchBar} this
     */
    initSort() {
        this.props.order == Order.ASC
            ? (this.props.sortIcone = 'arrow-drop-down')
            : (this.props.sortIcone = 'arrow-drop-up');

        return this;
    }

    /**
     * Toggle the sort ascending/descending
     * @returns {SearchBar} this
     */
    toggleSort() {
        //if is already ascending
        if (this.props.order == Order.ASC) {
            //set the sort into descending
            this.props.order = Order.DESC;
            this.props.sortIcone = 'arrow-drop-up';
        } else {
            //set the sort into ascending
            this.props.order = Order.ASC;
            this.props.sortIcone = 'arrow-drop-down';
        }

        //send the sort event
        this.dispatchEvent(this.sortEvent);

        return this;
    }

    renderHtml() {
        return `
            <div class="searchbar">
                <iron-icon icon="search"></iron-icon>  
                <input 
                    value="${this.props.search}" 
                    id="search" 
                    class="searchbar__input ${
                        this.props.search ? 'searchbar__input--insearch' : ''
                    }" 
                    type="text" 
                    placeholder="Search"
                >
                <div id="sort" class="searchbar__sort">
                    <iron-icon icon="${this.props.sortIcone}"></iron-icon>    
                </div>
            </div>
        `;
    }

    renderStyle() {
        return `

            iron-icon{
                color: #8080809e;
            }

            .searchbar{
                padding: 10px;
                display: flex;
                margin: 0px 0px 7px 0px;
                justify-content: space-between;
                border-radius: 5px;
                box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
                align-items: center;
            }
  
            .searchbar__input{
                flex-grow: 1;
                border-radius: 2px;
                margin: 0 10px;
                border: none;
                padding: 10px;
            }
            
            .searchbar__input--insearch{
                background-color: #80808014;
            }

            .searchbar__sort{
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

        `;
    }
}

//export the component
export default KamiSearchBar;
