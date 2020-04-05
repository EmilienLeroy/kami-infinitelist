window.onload = () => {
  customElements.define(Card.tag, Card);
  customElements.define('kami-infinitelist', KamiInfiniteList);
}

class Card extends KamiComponent {
    static get tag() {
        return 'card-component';
    }

    static get observedAttributes() {
        return [
            'name', 
            'img'
        ];
    }


    setProperties() {
        this.props = this.observe({
            name: this.getAttribute('name') || 'name',
            img: this.getAttribute('img') || 'img'
        })
    }

    connectedCallback()
    {
        this.previousY = 0
        this.previousRatio = 0
        this.observeWindows = new IntersectionObserver(this.display.bind(this),{
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        });

        this.observeWindows.observe(this)
        this.wrapper.style.position = 'relative';

    }

    display(changes)
    {
        changes.forEach(change => {
            const card = this.wrapper.querySelector('.card');
            this.currentY = change.boundingClientRect.y
            this.currentRatio = change.intersectionRatio
            this.isIntersecting = change.isIntersecting

            
            
            if (this.currentY < this.previousY) {
                card.style.transform = "rotate3d(1, 0, 0, 45deg) translateZ(-100px)";
            } else {
                card.style.transform = "rotate3d(1, 0, 0, -45deg) translateZ(-100px)";
            }

            if (change.intersectionRatio > 0) {
                card.style.opacity = '1';
                card.style.transform = "rotate3d(1, 0, 0, 0deg) translateZ(0px)";
            }

            if (change.intersectionRatio < 0.1) {
                card.style.opacity = '0';
            }

            this.previousY = this.currentY;
            this.previousRatio = this.currentRatio;

        });
        
    }

    renderHtml() {
        return `
            <div class="card">
                <div class="card__img"></div>
                <div class="card__content">${this.getProp('name')}</div>
            </div>
        `;
    }

    renderStyle() {
        return `
            .card {
                padding: 10px;
                font-family: sans-serif;
                display: flex;
                align-items: center;
                margin: 10px;
                border-radius: 10px;
                background-color: #a9d3e9;
                box-shadow: 0 8px 20px -10px #00000085;
                opacity: 0;
                transition: all 1s ease;
            } 

            .card__img {
                background-image: url('${this.getProp('img')}');
                width: 50px;
                height: 50px;
                background-size: contain;
                border-radius: 50px;
            }

            .card__content {
                margin: 15px;
            }
        `;
    }
}