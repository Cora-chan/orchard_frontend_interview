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
      console.log('Images for modal:', images); // Debug log

     images.forEach(img => {
          console.log('Image', img); // Debug log
        img.addEventListener('click', () => {
            console.log('Image clicked:', img.src); // Debug log
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
