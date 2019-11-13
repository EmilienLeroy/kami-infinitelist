// polyfill
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'web-animations-js';

// import lib
import KamiSearchBar from './components/KamiSearchBar';
import KamiInfiniteList from './components/KamiInfiniteList';

// define the search if is not already define
if (!customElements.get(KamiSearchBar.tag)) {
    customElements.define(KamiSearchBar.tag, KamiSearchBar);
}

// export only the infinite list
export default KamiInfiniteList;
