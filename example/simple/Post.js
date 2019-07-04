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
