document.addEventListener('DOMContentLoaded', () => {
  axios.get('http://localhost:3000/gallery')
    .then(res => {
      const gallery = res.data;
      console.log('Images after Axios:', document.querySelectorAll('.gallery__image-wrapper img'));


      // Content
      document.getElementById('gallery-heading').textContent = gallery.content.heading;
      document.getElementById('gallery-paragraph').textContent = gallery.content.paragraph;
      document.getElementById('gallery-caption').textContent = gallery.content.caption;
      document.getElementById('gallery-suggestion').textContent = gallery.content.suggestion;

      // Images
      document.getElementById('gallery-image-left').src = gallery.images.left.src;
      document.getElementById('gallery-image-left').alt = gallery.images.left.alt;
        document.getElementById('gallery-image-left').dataset.modalSrc = gallery.images.left.modalSrc; // Set high-res image for modal

      document.getElementById('gallery-image-top').src = gallery.images.right[0].src;
      document.getElementById('gallery-image-top').alt = gallery.images.right[0].alt;
      document.getElementById('gallery-image-top').dataset.modalSrc = gallery.images.right[0].modalSrc; // Set high-res image for modal

      document.getElementById('gallery-image-bottom').src = gallery.images.right[1].src;
      document.getElementById('gallery-image-bottom').alt = gallery.images.right[1].alt;
      document.getElementById('gallery-image-bottom').dataset.modalSrc = gallery.images.right[1].modalSrc; // Set high-res image for modal

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
  axios.get('http://localhost:3000/card-block')
    .then(res => {
      const cardBlockData = res.data.cards;
      const grid = document.getElementById('card-block-grid');
       
      document.getElementById('card-block-heading').textContent = res.data.heading;

      if (cardBlockData && cardBlockData.length) {
        cardBlockData.forEach((card, index) => {
          // Use <a> as the clickable card container
          const cardEl = document.createElement('a');
          cardEl.classList.add('card-block__card','margin-bottom-lg');
          cardEl.href = card.link || "#"; // Use real link if available, otherwise "#"

          // Unique heading ID
          const headingId = `card-heading-${index}`;
          const paragraphId = `card-paragraph-${index}`;

          cardEl.innerHTML = `
            <div class="card-block__card-image ">
              <img src="${card.image.src}" alt="${card.image.alt}" />
            </div>
            <p id="${headingId}" class="p--bold margin-top-lg margin-bottom-sm padding-left-lg padding-right-lg card-heading">
              ${card.heading}
            </p>
            <p id="${paragraphId}" class="padding-left-lg padding-right-lg">${card.paragraph}</p>
          `;

          grid.appendChild(cardEl);

          // Get this card's heading
          const heading = cardEl.querySelector(`#${headingId}`);

          // // Hover underline effect
          // cardEl.addEventListener("mouseenter", () => heading.classList.add("is-hover"));
          // console.log(heading.classList );
          // cardEl.addEventListener("mouseleave", () => heading.classList.remove("is-hover"));
          //    console.log(heading.classList );

          // Click event
          cardEl.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent navigation for testing
            console.log("Card clicked:", cardEl); // ✅ Logs the <a> element
          
          });

            cardEl.addEventListener("mouseenter", () => {
          console.log("Card hover in");
          
          heading.classList.add("is-hover");
          console.log("heading classlist", heading.classList);
        });

        cardEl.addEventListener("mouseleave", () => {
          console.log("Card hover out");
          heading.classList.remove("is-hover");
          console.log("heading classlist", heading.classList);
        });
      });
        
      }
    })
    .catch(err => console.error("Error loading card block:", err));
});






