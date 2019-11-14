# `<kami-infinitelist>`

An infinite scroller. Just add a datasource provider and a delegate web components and it's work !

* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Example](#example)
    * [Datasource](#datasource)
    * [Delegate](#delegate)
    * [Simple List](#simple-list)
* [Data Binding](#data-binding)
* [Icons](#icons)
* [Props](#props)
* [Events](#events)


## Demo

* [Simple](https://emilienleroy.fr/assets/infinite/simple/)
* [Flex](https://emilienleroy.fr/assets/infinite/flex/)
* [Search](https://emilienleroy.fr/assets/search/)

<p align="center">
  <img  src="https://emilienleroy.fr/assets/flex.gif">
</p>

## Installation


```sh
npm install --save kami-infinitelist
```

Or grab from the *dist* folder :


```html
<script src="KamiInfiniteList.umd.js"></script>
```


## Usage


```html
<script src="../dist/KamiInfiniteList.umd.js"></script>
<script>
    window.onload = function(){
        customElements.define('kami-infinitelist', KamiInfiniteList);
    }
</script>
```

*Or with webpack / rollup*

```js
// ES6 Modules or TypeScript
import KamiInfiniteList from 'kami-infinitelist'

// register the component with the name you want
window.customElements.define('kami-infinitelist', KamiInfiniteList);
```


## Example


For use the infinite list you need two prerequire.
 * a datasource
 * a delegate

 ### Datasource

 The datasource should be an JSON endpoint with query pagination.
 For exemple see the [jsonplaceholder](http://jsonplaceholder.typicode.com/posts?_start=10&_limit=10) api work as well.
 Into the request, the component will add a query with some paramters :

 * **page :** the number of the current page
 * **limit :** the number of item by page

 > You can update the param name with the properties *pageQuery* and *limiQuery*. For more information see the [Props](#Props) section.

 ### Delegate

 The delegate should be a web component. The property of this component will be map to the data by the infinte list component. This component should be into the main slot of the list. For more information see the [Data Binding](#data-binding) section.

 ### Simple list

 This the source code to create a simple list with this component. This is the final result.

<p align="center">
  <img  src="https://emilienleroy.fr/assets/simple.gif">
</p>

`index.html`
```html

<!-- infinite list component -->
<kami-infinitelist
    datasource="https://jsonplaceholder.typicode.com/posts/"
    delegate="post-custom"
    limitQuery="_limit"
    pageQuery="_start"
    limit='22'
    width="700px"
>
    <!-- delegate component -->
    <post-custom
        titleprops="title"
        bodyprops="body"
    >
    </post-custom>
</kami-infinitelist>

<!-- import iron icon if necessary -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@polymer/iron-icons@3.0.1/iron-icons.min.js"></script>

<!-- infinite list lib -->
<script src="./KamiInfiniteList.umd.js"></script>

<!-- base component lib -->
<script src="./KamiComponent.umd.js"></script>

<!-- delegate component lib -->
<script src="./Post.js"></script>

<script>
    window.onload = function(){
        //init component
        customElements.define('post-custom',Post);
        customElements.define('kami-infinitelist', KamiInfiniteList);
    }
</script>

```


`Post.js`
```js
class Post extends KamiComponent 
{
    constructor()
    {
        super();
    }

    static get observedAttributes() {
        return [
            'titleprops', 
            'bodyprops',
        ];
    }

    //set your properties to the parent
    //necessary for the render() method
    setProperties()
    {
        this.props = this.observe({
            titleprops: this.getAttribute('titleprops'),
            bodyprops: this.getAttribute('bodyprops')
        })
    }


    //init all your event listener
    initEventListener()
    {
        this.wrapper.querySelector('.post').addEventListener('click',()=>{
            alert(`title: ${this.props.titleprops} body: ${this.props.bodyprops}`)
        })
    }

    connectedCallback()
    {
        this.observeWindows = new IntersectionObserver(this.display.bind(this),{
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        this.observeWindows.observe(this)
        this.wrapper.style.position = 'relative';

    }

    display(changes)
    {
        changes.forEach(change => {
            if (change.intersectionRatio > 0) {
                this.wrapper.querySelector('.post').classList.add('post--display');
            }
        });
        
    }


    //render the dom structure
    renderHtml()
    {
        return `
            <div class="post">
                <div class="post__title">${this.props.titleprops}</div>
                <div class="post__body">${this.props.bodyprops}</div>
            </div>
        `;        
    }

    //render the style component
    renderStyle()
    {
        return `
            .post{
                margin: 5px;
                padding: 5px;
                background-color: ghostwhite;
                font-family: sans-serif;
                cursor: pointer;
                transform: translateY(20px);
                opacity: 0;
                transition: all 1s ease;
            }

            .post--display{
                transform: translateY(0px);
                opacity: 1;
                transition: all 1s ease;
            }

            .post:hover{
                color: white;
                background-color: grey;
            }

            .post__title{
                font-size: 20px;
                margin: 5px 0px;
            }

            .post__title:first-letter{
                text-transform: capitalize;
            }
            
        `;
    }

}

```
## Data Binding

To bind data to the infinite list you to have a [delegate](#delegate) component. Schema of the data should be write into the delegate props.

For example we have this data : 

```json
[
    {
        "username": "test",
        "fullname": {
            "firstname": "test",
            "lastname": "test"
        },
        "posts": [
            {
                "title": "post1",
                "content":"content1"
            },
            {
                "title": "post2",
                "content":"content2"
            },
        ]
    }
]
```

To bind this you can create a user component :

```html
<!-- infinite list component -->
<kami-infinitelist
    delegate="user-element"
    otherProps...
>
    <!-- delegate component -->
    <user-element
        username="username"
        firstname="fullname.firstname"
        lastname="fullname.lastname"
        posts="posts"
    >
    </user-element>
</kami-infinitelist>
```

To bind **array** the component will stringify your data. You should to **parse manually** into your delegate like this :

```js
// try catch are necessary if your delegate component extends KamiComponent.
try {
    return JSON.parse(this.getAttribute('posts'));
} catch (error) {
    return [];
}
```
> See also the **issues** example for more details.

## Icons 

Kami-infinitlist use [iron-icons](https://github.com/PolymerElements/iron-icons) for display icons.
If you want use this icone you need to import it manually. 

```
npm install --save @polymer/iron-icons
```

```html
<!-- import iron icon if necessary -->
<script type="module">
    import './node_modules/@polymer/iron-icon/iron-icon.js';
    import './node_modules/@polymer/iron-icons/iron-icons.js';
</script>

<!-- import before import kami infinite list -->
<script src="./KamiInfiniteList.umd.js"></script>
```

*Or with webpack / rollup*

```js
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

// import before init kami infinite list
import KamiInfiniteList from 'kami-infinitelist'
```

> See also **search** example into the example folder.

## Props

| name          |  type    | description                                | required| default value                   |
|-------------- |:--------:|--------------------------------------------|---------|---------------------------------|
| datasource    | String   | Datasource provider                        | true    |                                 |
| delegate      | String   | Delegate web component                     | true    |                                 |
| width         | String   | Width of the list                          | false   | 100%                            |
| height        | String   | Height of the list                         | false   | 100vh                           |
| useSearch     | Boolean  | Diplay the search bar                      | false   | false                           |
| searchQuery   | String   | Name of the *search* param in the query    | false   | search                          |
| sortQuery     | String   | Name of the *sort* param in the query      | false   | sort                            |
| pageQuery     | String   | Name of the *page* param in the query      | false   | page                            |
| limitQuery    | String   | Name of the *limit* param in the query     | false   | limit                           |
| page          | Number   | Number of the current page                 | false   | 1                               |
| limit         | Number   | Number of item display                     | false   | 10                              |
| flex          | Boolean  | Use the flex property                      | false   | false                           |


## Events


| name            |  trigger                                | event.detail                                   |
|---------------- |-----------------------------------------|------------------------------------------------|
| clickElement    | When a element of the list is clicked   |  { element: *HTMLElement*, index: *number* }   |



## Contribute

We would love you for the contribution to ``kami-infinitelist`` project, check the ``CONTRIBUTING`` file for more info.