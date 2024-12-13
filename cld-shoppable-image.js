//use parcel: npx parcel index.html

import {html, render} from 'lit-html';
import {LitElement} from 'lit-element';

export class CldShoppableImage extends LitElement {
    createRenderRoot() {
  return this;
}
    render(){
        const img = this.querySelector('img');
        return html`
        
<style>
@layer base {
  cld-shoppable-image { display: contents; }
cld-shoppable-image .photo {
  anchor-name: --image;
}
cld-shoppable-image .productsButton {
  position: absolute;
  position-anchor: --image;
  inset-block-start: anchor(start);
  margin: 0.25em;
  anchor-name: --button;
}

cld-shoppable-image .productsList[popover] {
  position: absolute;
  position-anchor: --button;
  inset-block-start: anchor(end);
  inset-inline-start: anchor(start);
  margin: 0;
  padding: 0;
}

cld-shoppable-image .productsButtonText:before { content: "Show "; }
cld-shoppable-image:has([popover]:popover-open) button[popovertarget] .productsButtonText:before { content: "Hide " }

cld-shoppable-image .product a {
  display: grid;
  grid-template-columns: 0.33fr 1fr;
  margin: 0;
  padding: 0;
  border: none;
}
cld-shoppable-image .productThumb {
  width: 100%;
}
  cld-shoppable-image .hotspot {
    position: absolute;
    position-anchor: --image;
    --diameter: 2rem;
    inset-inline-start: calc( (anchor(end) * var(--x)) - (var(--diameter) / 2) );
    inset-block-start: calc( (anchor(end) * var(--y)) - (var(--diameter) / 2) );
    width: var(--diameter);
    aspect-ratio: 1;
    border-radius: 100%;
    visibility: hidden;
    cursor: pointer;
  }
  cld-shoppable-image:hover .hotspot {
    visibility: visible;
  }
}
</style>
        

<button
  class="productsButton"
  popovertarget=photo1234_products
>
    <span class="productsButtonText">Products</span>
</button>
<ul
  class="productsList"
  popover
  id=photo1234_products
>
  <li class="product" id="product2">
    <a href="#">
    <img class="productThumb" src="https://assets.thenorthface.com/image/upload/q_auto,f_auto/v1725637817/summit-pro-120-crew">
    <div class="productText">
      <p class=productCategory>Base Layer</p>
      <h2 class=productName>Summit Pro 120 Crew</h2>
    </div>
    </a>
  </li>
  <li class="product" id="product1">
    <a href="#">
    <img class="productThumb" src="https://assets.thenorthface.com/image/upload/q_auto,f_auto/v1725637819/summit-series-goretex-bibs">
    <div class="productText">
      <p class=productCategory>Shell Layer</p>
      <h2 class=productName>Summit Series Verbier Bibs</h2>
    </div>
    </a>
  </li>
</ul>
  <button class="hotspot" id="product2_hotspot" style="--x: 0.55; --y: 0.35;" popovertarget=photo1234_products></button>
  <button class="hotspot" id="product1_hotspot" style="--x: 0.5; --y: 0.75;" popovertarget=photo1234_products></button>
        `;
    }

}


customElements.define('cld-shoppable-image', CldShoppableImage);