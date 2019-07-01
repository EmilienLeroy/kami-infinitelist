//polyfill
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'web-animations-js';

import KamiComponent from 'kami-component'

class KamiInfiniteList extends  KamiComponent
{
    
    constructor()
    {
        super()
        console.log('ok')
    }

    initEventListener(): void {
        
    }

    setProperties(): void {
   
    }

    renderHtml(): string {
        return ``;
    }
    
    renderStyle(): string {
        return ``;
    }
}

export default KamiInfiniteList
