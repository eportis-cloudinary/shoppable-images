# <cld-shoppable-image>

Cloudinary Echo Hackathon project. Wrap an `<img>` in a `<cld-shoppable-image>` custom element, and give it some `<cld-product>` siblings, like this:

```
</cld-shoppable-image>

	<cld-product
		href="https://www.thenorthface.com/en-us/womens/collections/summit-series-c324773/womens-summit-series-pro-120-crew-pNF0A880A"
		thumb="https://assets.thenorthface.com/image/upload/q_auto,f_auto/v1725637817/summit-pro-120-crew"
		category="Base Layer"
		name="Summit Pro 120 Crew"
		x=55%
		y=35%
	></cld-product>

	<cld-product
		href="https://www.thenorthface.com/en-us/womens/collections/summit-series-c324773/womens-summit-series-verbier-gore-tex-bibs-pNF0A880D"
		thumb="https://assets.thenorthface.com/image/upload/q_auto,f_auto/v1725637819/summit-series-goretex-bibs"
		category="Shell Layer"
		name="Summit Series Verbier Bibs"
		x=50%
		y=75%
	></cld-product>
	
	<img class="photo" src="https://assets.thenorthface.com/image/upload/q_auto,f_auto/v1725637803/ss-baselayer-image-t-d-xl" alt="A man sitting at the entrance of an orange tent on a snowy day, either donning or removing his backpack. He is wearing a black base layer on top, and some thick black snowpants." />

</cld-shoppable-image>
```

The custom element then transforms that into this on the rendered page: 

![The image has a “Show Products” button in the upper left, and has two clickable “hotspot” circles within it; Clicking any of these toggles a drop down menu of products which appears below the “Show Products” button. If a hotspot was clicked or is hovered, that product is highlighted.](https://o.img.rodeo/video/upload/fl_animated,f_gif/v1734101948/Screen_Recording_2024-12-13_at_06.57.04)

## Installation

Requires [Lit](https://lit.dev). Running `npm i` within your cloned repo will install it locally for you, otherwise you can change your import map to pull it from a CDN.

## Usage

Tell the browser where to find lit with an import map, and then include `cld-shoppable-image.js` as `type=module`. Like this:

```
<script type="importmap">
{
	"imports": {
		"lit-html": "../node_modules/lit-html/lit-html.js",
		"lit-element": "../node_modules/lit-element/lit-element.js",
		"@lit/reactive-element": "../node_modules/@lit/reactive-element/reactive-element.js"
	}
}
</script>
<script type="module"
	src="../cld-shoppable-image.js"
></script>
```

Then you can wrap `<img>` elements with `</cld-shoppable-image>` and you're off.

Here are the `<cld-product>` attributes:

- `href`: URL of the product detail page. Required.
- `thumb`: URL of a thumbnail image of the product.
- `category`: String which describes the product category.
- `name`: String; product name.
- `x`: Percentage of the image width, which determines the hotspot’s horizontal position, relative to the left side of the image.
- `y`: Percentage of the image height, which determines the hotspot’s vertical position, relative to the top side of the image.

## Browser support

Used this as an excuse to try lots of new shiny CSS, so until all the browsers support:

- [Anchor positioning](https://caniuse.com/css-anchor-positioning)
- [popover](https://caniuse.com/mdn-api_htmlelement_popover)
- [:has()](https://caniuse.com/css-has)

this is Chrome-only!

