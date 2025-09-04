fetch('http://localhost:3000/gallery')
  .then(res => res.json())
  .then(gallery => {
    // Populate images
    document.querySelector(".gallery__image--left").src = gallery.images.left.src;
    document.querySelector(".gallery__image--left").alt = gallery.images.left.alt;

    document.querySelector(".gallery__image--top").src = gallery.images.right[0].src;
    document.querySelector(".gallery__image--top").alt = gallery.images.right[0].alt;

    document.querySelector(".gallery__image--bottom").src = gallery.images.right[1].src;
    document.querySelector(".gallery__image--bottom").alt = gallery.images.right[1].alt;

    // Populate text
    document.querySelector(".gallery__content-heading").textContent = gallery.content.heading;
    document.querySelector(".gallery__content-text").textContent = gallery.content.paragraph;
  })
  .catch(err => console.error('Error fetching gallery:', err));
