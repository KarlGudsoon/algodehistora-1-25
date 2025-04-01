import PhotoSwipeLightbox from "/photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "/photoswipe/photoswipe.esm.js";

const lightbox = new PhotoSwipeLightbox({
  gallery: "#gallery--no-dynamic-import",
  children: "a",
  pswpModule: PhotoSwipe,
});

lightbox.init();
