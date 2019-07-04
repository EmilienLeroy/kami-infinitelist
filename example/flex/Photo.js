class Photo extends KamiComponent 
{
    constructor()
    {
        super();
    }

    static get observedAttributes() {
        return [
            'titleprops', 
            'urlprops',
        ];
    }

    //set your properties to the parent
    //necessary for the render() method
    setProperties()
    {
        this.props = this.observe({
            titleprops: this.getAttribute('titleprops'),
            urlprops: this.getAttribute('urlprops')
        })
    }


    //init all your event listener
    initEventListener()
    {
        this.wrapper.querySelector('.photo').addEventListener('click',()=>{
            alert(`title: ${this.props.titleprops}`)
        })
    }

    connectedCallback()
    {
        this.wrapper.style.position = 'relative';

        this.observeWindows = new IntersectionObserver(this.display.bind(this),{
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        this.observeWindows.observe(this)
    }

    display(changes)
    {
        changes.forEach(change => {
            if (change.intersectionRatio > 0) {
                this.wrapper.querySelector('.photo').classList.add('photo--display');
            }
        });
    }


    //render the dom structure
    renderHtml()
    {
        return `
            <div class="photo">
                <div class="photo__title">${this.props.titleprops}</div>
                <div class="photo__image"></div>
            </div>
        `;        
    }

    //render the style component
    renderStyle()
    {
        return `
            *{
                margin: 0px;
                padding:0px;
            }

            .photo{
                margin: 5px;
                background-color: ghostwhite;
                font-family: sans-serif;
                cursor: pointer;
                position: relative;
                width: 200px;
                height: 200px;
                box-sizing: border-box;
                color:white;
                transform: translateY(20px);
                opacity: 0;
                transition: all 1s ease;
            }

            .photo--display{
                transform: translateY(0px);
                opacity: 1;
                transition: all 1s ease;
            }

            .photo__title:hover{
                color: grey;
            }

            .photo__title{
                font-size: 15px;
                position: absolute;
                bottom: 0px;
                z-index: 2;
                background-color: #00000040;
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
            }

            .photo__title:first-letter{
                text-transform: capitalize;
            }

            .photo__image{
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: url(${this.props.urlprops});
                background-size: cover;
                z-index:1;
            }
            
            `;
        }

}
