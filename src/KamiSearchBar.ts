import KamiComponent from 'kami-component';

class KamiSearchBar extends KamiComponent {
    sortEvent: any;
    searchEvent: any;
    sort: any;
    search: any;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['searchprops', 'ascendingprops'];
    }

    static get tag(): string {
        return 'kami-searchbar';
    }

    setProperties() {
        //init the observed props
        this.props = this.observe({
            sortIcone: 'arrow_drop_down',
            isAscending: this.toBoolean(this.getAttribute('ascendingProps')),
            search: this.getAttribute('searchProps')
        });
    }

    connectedCallback() {
        //init the sort state
        this.initSort();
    }

    initEventListener() {
        //create the sort event
        this.sortEvent = new CustomEvent('sort', {
            detail: {
                isAscending: this.props.isAscending
            }
        });

        //create the search event
        this.searchEvent = new CustomEvent('search', {
            detail: {
                search: this.props.search
            }
        });

        //add sort event listener
        this.sort = this.wrapper.querySelector('#sort');
        this.sort.addEventListener('click', (event: Event) => {
            event.preventDefault();
            this.toggleSort();
        });

        //add search evenet listener
        this.search = this.wrapper.querySelector('#search');
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
     * Init the sort arrow
     * @returns {SearchBar} this
     */
    initSort() {
        this.props.isAscending
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
        if (this.props.isAscending) {
            //set the sort into descending
            this.props.isAscending = false;
            this.props.sortIcone = 'arrow-drop-up';
        } else {
            //set the sort into ascending
            this.props.isAscending = true;
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
                    placeholder="Rechercher"
                >
                <div id="sort" class="searchbar__sort">
                    <iron-icon icon="${this.props.sortIcone}"></iron-icon>    
                </div>
            </div>
        `;
    }

    renderStyle() {
        return `
            .searchbar{
                padding: 10px;
                display: flex;
                margin: 0px 0px 7px 0px;
                justify-content: space-between;
                border-radius: 10px;
                box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
                align-items: center;
            }
  

            .searchbar__input{
                flex-grow: 1;
                border-radius: 5px;
                margin: 0 5px;
                border: none;
                padding: 10px;
            }
            

            .searchbar__input--insearch{
                background-color: #80808029;
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
