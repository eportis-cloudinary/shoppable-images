class CldShoppableImage extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		console.log("Custom element added to page.");
	}
}

customElements.define("cld-shoppable-image", CldShoppableImage);