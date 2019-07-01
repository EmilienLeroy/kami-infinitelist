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
