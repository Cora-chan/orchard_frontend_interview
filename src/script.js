document.addEventListener('DOMContentLoaded', () => {
  axios.get('public/data/gallery.json')
    .then(res => {
      const gallery = res.data;
      console.log('Images after Axios:', document.querySelectorAll('.gallery__image-wrapper img'));
      console.log('Gallery data:', gallery.gallery.content.heading);


      // Content
      document.getElementById('gallery-heading').textContent = gallery.gallery.content.heading;
      document.getElementById('gallery-paragraph').textContent = gallery.gallery.content.paragraph;
      document.getElementById('gallery-caption').textContent = gallery.gallery.content.caption;
      document.getElementById('gallery-suggestion').textContent = gallery.gallery.content.suggestion;

      // Images
      document.getElementById('gallery-image-left').src = gallery.gallery.images.left.src;
      document.getElementById('gallery-image-left').alt = gallery.gallery.images.left.alt;
      document.getElementById('gallery-image-left').dataset.modalSrc = gallery.gallery.images.left.modalSrc; // Set high-res image for modal

      document.getElementById('gallery-image-top').src = gallery.gallery.images.right[0].src;
      document.getElementById('gallery-image-top').alt = gallery.gallery.images.right[0].alt;
      document.getElementById('gallery-image-top').dataset.modalSrc = gallery.gallery.images.right[0].modalSrc; // Set high-res image for modal

      document.getElementById('gallery-image-bottom').src = gallery.gallery.images.right[1].src;
      document.getElementById('gallery-image-bottom').alt = gallery.gallery.images.right[1].alt;
      document.getElementById('gallery-image-bottom').dataset.modalSrc = gallery.gallery.images.right[1].modalSrc; // Set high-res image for modal

      // ✅ Attach modal listeners here, after images are set
      const modal = document.getElementById('gallery-modal');
      const modalImg = document.getElementById('modal-image');
      const closeBtn = document.querySelector('.modal__close');

      const images = document.querySelectorAll('.gallery__image-wrapper img');

     images.forEach(img => {
          img.addEventListener('click', () => {
          modal.classList.add('is-active');
          modalImg.src = img.dataset.modalSrc || img.src; // Use data attribute for high-res if available
          modalImg.alt = img.alt;
        });
      });

      closeBtn.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('is-active');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          modal.classList.remove('is-active');
        }
      });
    })
    .catch(err => console.error('Error loading gallery data:', err));
});

document.addEventListener('DOMContentLoaded', () => {
  axios.get('public/data/cardBlock.json')
    .then(res => {
      const cardBlockData = res.data.cardBlock.cards;
      console.log("Card block data:", res.data.cardBlock);
      const grid = document.getElementById('card-block-grid');
       
      document.getElementById('card-block-heading').textContent = res.data.cardBlock.heading;

      if (cardBlockData && cardBlockData.length) {
        cardBlockData.forEach((card, index) => {
          const cardEl = document.createElement('a');
          cardEl.classList.add('card-block__card','margin-bottom-lg');
          cardEl.href = card.link || "#"; // focusable by default

          const headingId = `card-heading-${index}`;
          const paragraphId = `card-paragraph-${index}`;

          cardEl.innerHTML = `
            <div class="card-block__card-image">
              <img src="${card.image.src}" alt="${card.image.alt}" />
            </div>
            <p id="${headingId}" class="p--bold margin-top-lg margin-bottom-sm padding-left-lg padding-right-lg card-heading">
              ${card.heading}
            </p>
            <p id="${paragraphId}" class="padding-left-lg padding-right-lg padding-bottom-lg card-paragraph">${card.paragraph}</p>
          `;

          grid.appendChild(cardEl);

          // Mouse click
          cardEl.addEventListener("click", (event) => {
            event.preventDefault(); // prevent navigation for testing
            console.log("Card clicked:", cardEl);
          });

          // Keyboard access
          cardEl.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault(); // prevent scrolling for Space
              cardEl.click(); // trigger click event
            }
          });
        });
      }
    })
    .catch(err => console.error("Error loading card block:", err));
});







