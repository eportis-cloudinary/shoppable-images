//use parcel: npx parcel index.html

import {html,css,LitElement} from 'lit';

// Import the Cloudinary class.
import {Cloudinary} from "@cloudinary/url-gen";
import {scale} from "@cloudinary/url-gen/actions/resize";
import {outline, cartoonify} from "@cloudinary/url-gen/actions/effect";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import {outer} from "@cloudinary/url-gen/qualifiers/outlineMode";


import {
  lazyload,
  responsive,
  //accessibility,
  //placeholder,
  HtmlImageLayer
} from "@cloudinary/html";


export class CldShoppableImage extends LitElement {

    static styles = css`img {border: 1px solid blue}`;

    static properties = {
        cld: {},
        cldImage: {},
        publicId: {},
    }

    constructor() {
        super();
        this.cld = new Cloudinary({
            cloud: {
                cloudName: 'thenorthface-nora' 
            }
        });
 
        this.publicId = 'ss-baselayer-image-t-d-xl';
        this.cldImage = this.cld.image(this.publicId);
        this.cldImage
            .resize(scale().height(500))
            .format('auto')
            .quality('auto');
        console.log("image: ", this.cldImage.toURL());
    };
    
    render(){
        return html`
        <img src=${this.cldImage.toURL()} />
        `;
    }

	connectedCallback() {
		console.log("Custom element added to page.");
	}
}

export class CldProduct extends LitElement {
    
    constructor(){
        console.log("cldProduct");
    }

    render(){
        return html`
            <div></div>
        `;
    }

}

//kickstart here
var div = document.getElementById('shoppable-container');

//collection of asset list urls
const urls = [
"https://assets.thenorthface.com/any/list/v1733561493/NF0A52UU.json",
"https://assets.thenorthface.com/any/list/v1733561642/NF0A7W4X.json",
"https://assets.thenorthface.com/any/list/v1733560915/NF0A52S3926.json",
"https://assets.thenorthface.com/any/list/v1733561642/NF0A7W4X.json"
];

urls.forEach((url)=>{
    //fetch asset list 
    fetch(url)
        .then((res) => {
            if(!res.ok){
                throw new Error('HTTP Error!');
            }
            return res.json();
        })
         .then((data)=>{
            // set the cld-product element and cld-shoppable-image element
            data.resources.forEach((e)=>{
                var prodElem = document.createElement('cld-product');
                prodElem.setAttribute('cld-public-id',e.public_id);
                var shopElem = document.createElement('cld-shoppable-image');
                shopElem.setAttribute('cld-transformation','f_auto,q_auto');
                prodElem.appendChild(shopElem);
                //img not appearing
                //customElements.define("cld-shoppable-image", CldShoppableImage);
                //append to container
                div.appendChild(prodElem);
            });
         });
});

//do LitElement
customElements.define("cld-shoppable-image", CldShoppableImage);

