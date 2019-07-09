import KamiComponent from 'kami-component';
import KamiSearchBar from './KamiSearchBar';

class KamiInfiniteList extends KamiComponent {
    /**
     * @property {Array<Object>} - store all the component get form the datasource
     */
    private components: any[];

    /**
     * is true if the list is in loading
     * @property {Boolean} - loading stat
     */
    private inLoad: boolean;

    /**
     * This property is at true if the datasource is at the end
     * @property {Boolean} - stat of the datasource
     */
    private end: boolean;

    /**
     * @property {any} - the main dom container
     */
    private container: any;

    /**
     * @property {any} - the delegate component dom
     */
    private component: any;

    /**
     * @property {any[]} componentAttributes - attribute of your delegate components
     */
    private componentAttributes: any[];

    /**
     * @property {any} data - current data load
     */
    private data: any;

    /**
     * @property {CustomEvent<{element: HTMLElement, index: number }>} clickElementEvent - event when an element of the list is clicked.
     */
    private clickElementEvent: CustomEvent<{element: HTMLElement, index: number }>;

    /**
     * @property {HTMLElement} clickElement - the last clicked element into the list
     */
    private clickElement: HTMLElement | null;

    /**
     * @property {number} index - number of element into the list.
     */
    private index: number;

    constructor() {
        super();

        this.components = [];
        this.inLoad = false;
        this.end = false;
        this.componentAttributes = [];
        this.index = 0;
        this.clickElement = null;
        this.clickElementEvent = this.updateClickElementEvent(this.index);
    }


    static get observedAttributes() {
        return [
            'datasource',
            'delegate',
            'width',
            'height',
            'useSearch',
            'searchQuery',
            'sortQuery',
            'page',
            'limit',
            'flex'
        ];
    }

    public setProperties(): void {
        let datasource: string | null = this.getAttribute('datasource');
        let delegate: string | null = this.getAttribute('delegate');

        if (datasource && delegate) {
            this.props = this.observe({
                datasource: datasource,
                delegate: delegate,
                width: this.getAttribute('width') || '100%',
                height: this.getAttribute('height') || '100vh',
                useSearch: this.toBoolean(this.getAttribute('useSearch')) || false,
                searchQuery: this.getAttribute('searchQuery') || 'search',
                sortQuery: this.getAttribute('sortQuery') || 'sort',
                pageQuery: this.getAttribute('pageQuery') || 'page',
                limitQuery: this.getAttribute('limitQuery') || 'limit',
                page: this.getAttribute('page') || '1',
                flex: this.toBoolean(this.getAttribute('flex')) || false,
                query: {}
            });
        } else {
            throw new Error('You need a datasource and delegate !');
        }

        this.props.query[this.props.pageQuery] = this.getAttribute('page') || '1';
        this.props.query[this.props.limitQuery] = this.getAttribute('limit') || '10';

        if (this.props.useSearch) {
            //update the query with url query
            if (this.getUrlParam(this.props.searchQuery)) {
                this.props.query[this.props.searchQuery] = this.getUrlParam(this.props.searchQuery);
            }

            this.props.query[this.props.sortQuery] = this.getUrlParam(this.props.sortQuery);
        }
    }

    public initEventListener(): void { }

    public connectedCallback(): void {
        //init dom.
        this.container = this.wrapper.querySelector('.infinitelist');

        //clone the delegate element from the root element.
        this.component = this.querySelector(this.props.delegate).cloneNode();

        //get all attribute from the delegate element.
        this.componentAttributes = this.getAttributes(this.component);

        //get the data from the data source
        this.getData();

        //init scroll listener
        this.container.addEventListener('scroll', () => {
            if (
                Math.round(this.container.scrollTop + 20) >
                this.container.scrollHeight - this.container.offsetHeight
            ) {
                if (!this.inLoad && !this.end) {
                    //increment the page
                    this.props.query.page++;

                    //set the state inLoad at true
                    this.inLoad = true;

                    //get the new data
                    this.getData();
                }
            }
        });

        //add event listener on the searchbar
        //only if the useSearch property is set at true
        if (this.props.useSearch) {
            //event listener for the sort event
            this.wrapper
                .querySelector(KamiSearchBar.tag)!
                .addEventListener('sort', (event: any) => {
                    console.log(event.detail);
                    //update the query
                    this.props.query[this.props.sortQuery] = event.detail.isAscending;

                    //update the data
                    this.updateData(this.props.sortQuery, event.detail.isAscending);
                });

            //event listener for the search event
            this.wrapper
                .querySelector(KamiSearchBar.tag)!
                .addEventListener('search', (event: any) => {
                    //update the query
                    this.props.query[this.props.searchQuery] = event.detail.search;

                    //update the data
                    this.updateData(this.props.searchQuery, event.detail.search);
                });
        }
    }

    /**
     * Generate a request with the current datasource and query.
     * @returns {Request} the generate request
     */
    public generateRequest(): Request {
        try {
            //generate an url this the datasource
            let url: URL;
            try {
                url = new URL(this.props.datasource);
            } catch (error) {
                url = new URL(`${window.location.origin}${this.props.datasource}`);
            }

            //add query params
            for (let key in this.props.query) {
                url.searchParams.append(key, this.props.query[key]);
            }

            //generate the request
            let requestInfo: RequestInfo = url.toString();
            let request = new Request(requestInfo);

            //return the request
            return request;
        } catch (error) {
            throw new Error('Invalid datasource !');
        }
    }

    /**
     * This methode get the data from the datasource.
     * After it will create all the dom and append this into the infinite list.
     * @returns {KamiInfiniteList} this
     */
    public getData(): this {
        let request: Request = this.generateRequest();

        //set the inLoad state a true
        this.inLoad = true;

        //get the data from the endpoint
        fetch(request)
            .then(response => response.json())
            .then(json => {
                //check if data are array else throw an error
                if (Array.isArray(json)) {
                    //if the data length are not the same as the limit property
                    //the end state is set at true and stop the get data methode
                    if (json.length != this.props.query[this.props.limitQuery]) {
                        this.end = true;
                    }

                    //for each data it will convert and create a component
                    //all component are set into the components property
                    //and the create dom are append to the main dom
                    for (this.data in json) {
                        let data = json[this.data];

                        if (data instanceof Object && !Array.isArray(data)) {
                            let component = this.component.cloneNode();

                            this.componentAttributes.forEach(atts => {
                                let dataProvide = this.convertData(
                                    data,
                                    component.getAttribute(atts.toString())
                                );

                                atts != 'slots'
                                    ? component.setAttribute(atts, dataProvide)
                                    : (component.innerHTML = dataProvide);
                            });

                            //store the component
                            this.components.push(component);

                            //store the component index
                            component.setAttribute('index', this.index);

                            //update the component index
                            this.index ++;

                            //dispatch a new event with the clicked component
                            component.addEventListener('click',()=>{ this.clickedEvent(component, parseInt(component.getAttribute('index'))); });

                            this.addComponent(component);
                        } else {
                            throw new Error('Data should be an array of object !');
                        }
                    }
                } else {
                    throw new Error('Data should be an array of object !');
                }

                //at the end the inload state is set as false
                this.inLoad = false;
            })
            .catch(error => {
                //error handling
                console.log(error.message);
            });

        return this;
    }

    /**
     * Update the url query and reload all the data.
     * @param {Object} object
     * @param {String} object.param - param for the url
     * @param {String} object.value - the value of the param
     * @returns {KamiInfiniteList} this
     */
    public updateData(param: string, value: string): this {
        this
            //update the url browser
            .setUrlParam(param, value)
            //reset the list
            .resetList()
            //add the new data with the new query
            .getData();

        return this;
    }

    /**
     * Reset all the property of list to reload new data.
     * @returns {KamiInfiniteList} this
     */
    public resetList(): this {
        //remove all component store
        this.components = [];

        //remove all component from the ui
        this.container.innerHTML = '';

        //reset the page number
        this.props.query.page = this.props.page;

        //reset the end property
        this.end = false;

        return this;
    }

    /**
     * Dispatch the custom event clickElement with the component clicked
     * and the index into the list. 
     * @param component {HTMLElement} - the component clicked
     * @param index {number} - the component index
     * @returns {KamiInfiniteList} this
     */
    public clickedEvent(component : HTMLElement, index: number) : this
    {
        //update click element
        this.clickElement = component;
        
        //reset the data send
        this.clickElementEvent = this.updateClickElementEvent(index);
        
        //send the event
        this.dispatchEvent(this.clickElementEvent);
        
        return this;
    }

    /**
     * Create a new custom event with the new click element value
     * @param index {number} - index position of the element click
     * @returns {CustomEvent<{element: HTMLElement, index: number }>} the custom event
     */
    public updateClickElementEvent(index: number)
    {
        return new CustomEvent('clickElement', {
            detail: {
                element: this.clickElement!,
                index: index
            }
        });
    }

    /**
     * Convert your data
     * @param {Object} obj - Object to convert
     * @param {String} path - path
     * @param {String} separator
     */
    public convertData(obj = self, path: any, separator = '.'): any {
        let properties = Array.isArray(path) ? path : path.split(separator);
        return properties.reduce((prev: any, curr: any) => prev && prev[curr], obj);
    }

    /**
     * Add a new component into the main container
     * @param {HTMLElement} component - add
     */
    public addComponent(component: HTMLElement): this {
        this.container.append(component);
        return this;
    }

    /**
     * Get all attribute for a dom
     * @param {HTMLElement} el - an html element this attr
     * @returns {Array.<String>} - all attribute in a array
     */
    public getAttributes(el: any): any[] {
        for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++) {
            arr.push(atts[i].nodeName);
        }

        return arr;
    }

    public renderSearch(): string {
        return `
            <${KamiSearchBar.tag}
                searchprops="${this.getUrlParam(this.props.searchQuery) || ''}"
                ascendingprops="${this.getUrlParam(this.props.sortQuery) || false}"
            >
            </${KamiSearchBar.tag}>
        `;
    }

    public renderHtml(): string {
        return `
            ${this.props.useSearch ? this.renderSearch() : ''}
            <div class="infinitelist ${this.props.flex ? 'infinitelist--flex' : ''}"></div>
        `;
    }

    public renderStyle(): string {
        return `
            .infinitelist{
                width: ${this.props.width};
                height : ${this.props.height};
                overflow-y: scroll;
            }

            .infinitelist--flex{
                display: flex;
                justify-content: start;
                align-items: center;
                flex-wrap: wrap;
                align-content: start;
            }
        `;
    }
}

export default KamiInfiniteList;
