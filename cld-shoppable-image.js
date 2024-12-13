import { html, render } from 'lit-html';
import { LitElement } from 'lit-element';

export class CldShoppableImage extends LitElement {

	createRenderRoot() {
		return this;
	}

	parseProducts() {
		const productEls = [ ...this.querySelectorAll( 'cld-product' ) ];
		return productEls.map( p => ({
			name: p.getAttribute( 'name' ),
			href: p.getAttribute( 'href' ),
			thumb: p.getAttribute( 'thumb' ),
			category: p.getAttribute( 'category' ),
			x: parseFloat( p.getAttribute( 'x' ) ) / 100,
			y: parseFloat( p.getAttribute( 'y' ) ) / 100
		}) );
	}

	productListItems( parsedProducts, id ) {
		return parsedProducts.map( ( p, index ) => html`
<li class="product" id="${ id }_product_${ index }">
	<a href="${ p.href }">
		${ p.thumb ? html`
		<img
			class="productThumb"
			src="${ p.thumb }">
		` : ''
		}
		<div class="productText">
			${ p.category ? html`<p class=productCategory>${ p.category }</p>` : '' }
			${ p.name ? html`<h2 class=productName>${ p.name }</h2>` : '' }
		</div>
	</a>
</li>
`
		);
	}

	productHotspots( parsedProducts, id ) {
		return parsedProducts.map( ( p, index ) => html`
	<button class="hotspot" id="${ id }_hotspot_${ index }" style="--x: ${ p.x }; --y: ${ p.y };" popovertarget="${ id }_products"></button>
`
		);
	}

	render() {

		const img = this.querySelector( 'img' );

		let id;
		if ( img.hasAttribute( 'id' ) ) {
			id = img.getAttribute( 'id' );
		} else {
			id = self.crypto.randomUUID();
			img.setAttribute( 'id', id );
		}

		const parsedProducts = this.parseProducts();

		// todo should the styles go in here?? repeated with every instance?
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
	popovertarget="${ id }_products"
>
	<span class="productsButtonText">Products</span>
</button>

<ul
	class="productsList"
	popover
	id="${ id }_products"
>
${ this.productListItems( parsedProducts, id ) }
</ul>

${ this.productHotspots( parsedProducts, id ) }
`;

	}

}

customElements.define('cld-shoppable-image', CldShoppableImage);
