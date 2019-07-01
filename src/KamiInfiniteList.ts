//polyfill
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'web-animations-js';

import KamiComponent from 'kami-component';

class KamiInfiniteList extends KamiComponent
{
    
    components: any[];
    inLoad: boolean;
    end: boolean;
    container: any;
    component: any;
    componentAttributes: any[];
    data: any;

    constructor()
    {
        super();

        /**
         * @property {Array<Object>} - store all the component get form the datasource
         */
        this.components = [];
        
        /**
         * is true if the list is in loading
         * @property {Boolean} - loading stat
         */
        this.inLoad = false;

        /**
         * This property is at true if the datasource is at the end
         * @property {Boolean} - stat of the datasource
         */
        this.end = false;

        this.componentAttributes = [];
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
            'limit'
        ];
    }


    setProperties()
    {
        let datasource: string | null = this.getAttribute('datasource');
        let delegate: string | null = this.getAttribute('delegate');

        if(datasource && delegate){
            this.props = this.observe({
                datasource: new URL(datasource),
                delegate:  delegate,
                width: this.getAttribute('width') || '100%',
                height:  this.getAttribute('height') || '100vh',
                useSearch: this.toBoolean(this.getAttribute('useSearch')) || false,
                searchQuery: this.getAttribute('searchQuery') || 'search',
                sortQuery: this.getAttribute('sortQuery') || 'sort',
                pageQuery: this.getAttribute('pageQuery') || 'page',
                limitQuery: this.getAttribute('limitQuery') || 'limit',
                page:  this.getAttribute('page') || '1',
                query: {},
            })
        }else{
            throw new Error('You need a datasource and delegate !');
        }
        
        this.props.query[this.props.pageQuery] = this.getAttribute('page') || '1';
        this.props.query[this.props.limitQuery] = this.getAttribute('limit') || '10';
  
        if(this.props.useSearch){
            //update the query with url query
            this.props.query[this.props.searchQuery] = this.getUrlParam(this.props.searchQuery);
            this.props.query[this.props.sortQuery] = this.getUrlParam(this.props.sortQuery);
        }

    }

    initEventListener(): void { 
        //add your listnener here 
    }

    connectedCallback()
    {
        //init dom.
        this.container = this.wrapper.querySelector('.infiniteliste');
        
        //clone the delegate element from the root element.
        this.component = this.querySelector(this.props.delegate).cloneNode();
       
        //get all attribute from the delegate element.
        this.componentAttributes = this.getAttributes(this.component);
        
        //get the data from the data source
        this.getData();

        //init scroll listener
        this.container.addEventListener('scroll',()=>{
            if( Math.round(this.container.scrollTop + 20) > (this.container.scrollHeight - this.container.offsetHeight)){

                if(!this.inLoad && !this.end){
                    
                    console.log('load')
                    //increment the page
                    this.props.query.page ++;
                    
                    //set the state inLoad at true
                    this.inLoad = true;

                    //get the new data
                    this.getData();
                }
            }
        });

        //add event listener on the searchbar
        //only if the useSearch property is set at true
        if(this.props.useSearch){
            
            //event listener for the sort event
            this.wrapper.querySelector('searchbar-element')!.addEventListener('sort',(event: any)=>{

                //update the query
                this.props.query[this.props.sortQuery] = event.detail.isAscending;
    
                //update the data
                this.updateData(
                    this.props.sortQuery,
                    event.detail.isAscending
                );
                
            });
    
            //event listener for the search event
            this.wrapper.querySelector('searchbar-element')!.addEventListener('search',(event:any)=>{
                
                //update the query
                this.props.query[this.props.searchQuery] = event.detail.search;
                
                //update the data
                this.updateData(
                    this.props.searchQuery,
                    event.detail.search
                );
    
            });
        }
        
    }

    public generateRequest(): Request
    {
        let url: URL = new URL(this.props.datasource);
        
        for(let key in this.props.query){
            url.searchParams.append(key, this.props.query[key])
        }

        let requestInfo : RequestInfo = url.toString()
        let request = new Request(requestInfo);
        
        return request
    }
    /**
     * This methode get the data from the datasource.
     * After it will create all the dom and append this into the infinite list.
     * @returns {InfiniteList} this
     */
    getData()
    {
        
        let request : Request = this.generateRequest();
       
        //set the inLoad state a true
        this.inLoad = true;

        //get the data from the endpoint
        fetch(request)
            .then(response => response.json())
            .then(json => {
                //check if data are array else throw an error
                if(Array.isArray(json)){
                    
                    //if the data length are not the same as the limit property
                    //the end state is set at true and stop the get data methode
                    if(json.length != this.props.query[this.props.limitQuery]){
                        this.end = true;
                    }

                    //for each data it will convert and create a component
                    //all component are set into the components property
                    //and the create dom are append to the main dom
                    for(this.data in json){
                        let data = json[this.data];

                        if(data instanceof Object && !Array.isArray(data)){
                            let component = this.component.cloneNode();
        
                            this.componentAttributes.forEach(atts => {
                                let dataProvide = this.convertData(data,component.getAttribute(atts.toString()));

                                atts != 'slots' ?
                                    component.setAttribute(atts,dataProvide) :
                                    component.innerHTML = dataProvide;
                            });
            
                            this.components.push(component);
                            this.addComponent(component);
                            
                        }else{
                            throw new Error('Data should be an array of object !');
                        }
        
                    }
                }else{
                    throw new Error('Data should be an array of object !');
                }

                //at the end the inload state is set as false 
                this.inLoad = false;
            }).catch((error) => {
                //error handling
                console.log(error.message);
            })
     
        return this;
    }

    /**
     * Update the url query and reload all the data.
     * @param {Object} object
     * @param {String} object.param - param for the url
     * @param {String} object.value - the value of the param
     * @returns {InfiniteList} this 
     */
    updateData(param:string,value:string)
    {
        this
            //update the url browser
            .setUrlParam(param,value)
            //reset the list
            .resetList()
            //add the new data with the new query
            .getData();
        
        return this;
    }

    /**
     * Reset all the property of list to reload new data.
     * @returns {InfiniteList} this
     */
    resetList()
    {
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
     * Convert your data
     * @param {Object} obj - Object to convert 
     * @param {String} path - path 
     * @param {String} separator 
     */
    convertData(obj=self, path:any, separator='.')
    {
        
        let properties = Array.isArray(path) ? path : path.split(separator);
        return properties.reduce((prev:any, curr:any) => prev && prev[curr], obj);
    }

    /**
     * Add a new component into the main container
     * @param {HTMLElement} component - add  
     */
    addComponent(component:any)
    {
        this.container.append(component);
    }

    /**
     * Get all attribute for a dom
     * @param {HTMLElement} el - an html element this attr
     * @returns {Array.<String>} - all attribute in a array 
     */
    getAttributes(el:any)
    {
        for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
            arr.push(atts[i].nodeName);
        }

        return arr;
    }

    renderSearch()
    {
        return `
            <searchbar-element 
                searchprops="${this.getUrlParam(this.props.searchQuery) || ''}"
                ascendingprops="${this.getUrlParam(this.props.sortQuery) || false}"
            >
            </searchbar-element>
        `;
    }

    renderHtml()
    {
        return `
            ${this.props.useSearch ? this.renderSearch() : ''}
            <div class="infiniteliste"></div>
        `;        
    }

    renderStyle()
    {
        return `
            .infiniteliste{
                width: ${this.props.width};
                height : ${this.props.height};
                overflow-y: scroll;
            }
        `;
    }
}

export default KamiInfiniteList;
