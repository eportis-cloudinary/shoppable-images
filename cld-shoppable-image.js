//use parcel: npx parcel index.html

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



class CldShoppableImage extends HTMLElement {
	constructor() {
		super();

        // Create a Cloudinary instance and set your cloud name.
        const cld = new Cloudinary({
            cloud: {
                cloudName: 'demo'
              }
        });

        // cld.image returns a CloudinaryImage with the configuration set.
        const myImage = cld.image('sample'); // sample is the public ID of the image.

        myImage
          .effect(cartoonify())
          .roundCorners(max())
          .effect(outline().mode(outer()).width(100).color('lightblue'))
          .backgroundColor('lightblue')
          .resize(scale().height(300));

        // This returns: https://res.cloudinary.com/demo/image/upload/sample
        const myURL = myImage.toURL();
        console.log("url-gen:", myURL);


        // Render the images in an 'img' element.
        const imgTag = document.createElement("img");
        //document.body.appendChild(imgTag);
        imgTag.height = 500;
        imgTag.src = myURL;


        var cld_shoppable = document.getElementsByTagName("cld-shoppable-image");
        cld_shoppable[0].appendChild(imgTag);
    }

	connectedCallback() {
		console.log("Custom element added to page.");
	}
}

customElements.define("cld-shoppable-image", CldShoppableImage);
