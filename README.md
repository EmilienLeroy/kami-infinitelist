# `<kami-infinitelist>`

An infinite scroller. Just add a datasource provider and a delegate web components and it's work !

<p align="center">
  <img  src="">
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

Or:

```js
// ES6 Modules or TypeScript
import KamiInfiniteList from 'kami-infinitelist'

// register the component with the name you want
window.customElements.define('kami-infinitelist', KamiInfiniteList);
```


## Examples


For use the infinite list you need two prerequire.
 * a datasource
 * a delegate

 ### Datasource

 The datasource should be an JSON endpoint with query pagination.
 For exemple see the [jsonplaceholder](http://jsonplaceholder.typicode.com/posts?_start=10&_limit=10) api work as well.

 ### Delegate

 The delegate should be a web component. The property of this component will be map to the data by the infinte list component.

<p align="center">
  <img  src="">
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

<!-- infinite list lib -->
<script src="../../dist/KamiInfiniteList.umd.js"></script>

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
        this.wrapper.style.position = 'relative';
        this.wrapper.animate(
            [
                {  transform: 'translateY(20px)', opacity: '0'  },
                {  transform: 'translateY(0px)', opacity: '1' }
            ], {
                duration: 1000,
                easing: 'ease'
            }
        );

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

## Contribute

We would love you for the contribution to ``kami-infinitelist`` project, check the ``CONTRIBUTING`` file for more info.