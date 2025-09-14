
function loadGallery() {
  axios.get("/data/gallery.json")
    .then((res) => {
      const gallery = res.data;
      populateGalleryContent(gallery.content);
      populateGalleryImages(gallery.images);
      setupModal();
    })
    .catch((err) => console.error("Error loading gallery data:", err));
}

function populateGalleryContent(content) {
  document.getElementById("gallery-heading").textContent = content.heading;
  document.getElementById("gallery-paragraph").innerHTML = content.paragraph;
}

function populateGalleryImages(images) {
  const imgLeft = document.getElementById("gallery-image-left");
  imgLeft.src = images.left.src;
  imgLeft.alt = images.left.alt;
  imgLeft.dataset.modalSrc = images.left.modalSrc;

  const imgTop = document.getElementById("gallery-image-top");
  imgTop.src = images.right[0].src;
  imgTop.alt = images.right[0].alt;
  imgTop.dataset.modalSrc = images.right[0].modalSrc;

  const imgBottom = document.getElementById("gallery-image-bottom");
  imgBottom.src = images.right[1].src;
  imgBottom.alt = images.right[1].alt;
  imgBottom.dataset.modalSrc = images.right[1].modalSrc;
}

function setupModal() {
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-image");
  const closeBtn = modal.querySelector(".modal__close");
  const caption = modal.querySelector(".modal__caption");
  const thumbnailsContainer = document.getElementById("modal-thumbnails");
  const prevBtn = modal.querySelector(".modal__nav--prev");
  const nextBtn = modal.querySelector(".modal__nav--next");
  const images = Array.from(document.querySelectorAll(".gallery__image-wrapper img"));

  let currentIndex = 0;

  // Build thumbnails dynamically
  thumbnailsContainer.innerHTML = images
    .map((img, index) => `
      <img src="${img.src}" 
           data-index="${index}" 
           alt="${img.alt}">
    `)
    .join("");

  const thumbnails = thumbnailsContainer.querySelectorAll("img");

  function openModal(index) {
    currentIndex = index;
    updateModalImage();
    modal.classList.add("is-active");
    modal.classList.remove("is-closing");
  }

  function closeModal() {
    modal.classList.add("is-closing");
    modal.classList.remove("is-active");
    setTimeout(() => modal.classList.remove("is-closing"), 300); // matches fade-out animation
  }

  function updateModalImage() {
    const img = images[currentIndex];
    modalImg.src = img.dataset.modalSrc || img.src;
    modalImg.alt = img.alt;

    // Highlight active thumbnail
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnails[currentIndex].classList.add("active");

    caption.textContent = currentIndex + 1 + " / " + images.length;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImage();
  }

  function updateCaption() {
    caption.textContent = currentIndex + 1 + " / " + images.length;
  }

  // Event listeners
  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => openModal(Number(thumb.dataset.index)));
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("is-active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // Swipe support for mobile
  let startX = 0;
  modalImg.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
  modalImg.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) showNext();
    if (endX - startX > 50) showPrev();
  });
}

document.addEventListener("DOMContentLoaded", setupModal);

function loadCardBlock() {
  axios.get("/data/cardBlock.json")
    .then((res) => {
      document.getElementById("card-block-heading").textContent = res.data.heading;
      populateCardBlock(res.data.cards);
      console.log("Card block data loaded:", res.data.cards);
    })
    .catch((err) => console.error("Error loading card block:", err));
}

function populateCardBlock(cards) {
  const grid = document.getElementById("card-block-grid");
  if (!cards || !cards.length) return;

  cards.forEach((card, index) => {
    const cardEl = document.createElement("a");
    cardEl.className = "card-block__card margin-bottom-lg";
    cardEl.href = card.link || "#";

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "card-block__card-image";
    const img = document.createElement("img");
    img.src = card.image.src;
    img.alt = card.image.alt;
    imgWrapper.appendChild(img);

    const heading = document.createElement("p");
    heading.id = `card-heading-${index}`;
    heading.className = "p--bold padding-top-lg padding-bottom-sm padding-left-lg padding-right-lg card-heading";
    heading.textContent = card.heading;

    const paragraph = document.createElement("p");
    paragraph.id = `card-paragraph-${index}`;
    paragraph.className = "padding-left-lg padding-right-lg padding-bottom-lg card-paragraph";
    paragraph.textContent = card.paragraph;

    cardEl.append(imgWrapper, heading, paragraph);
    grid.appendChild(cardEl);

    cardEl.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("Card clicked:", cardEl);
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
  loadCardBlock();
});














// document.addEventListener("DOMContentLoaded", () => {
//   axios
//     .get("/data/gallery.json")
//     .then((res) => {
//       const gallery = res.data;

//       // Content
//       document.getElementById("gallery-heading").textContent =
//         gallery.content.heading;
//       document.getElementById("gallery-paragraph").textContent =
//         gallery.content.paragraph;
//       document.getElementById("gallery-caption").textContent =
//         gallery.content.caption;
//       document.getElementById("gallery-suggestion").textContent =
//         gallery.content.suggestion;

//       // Images
//       document.getElementById("gallery-image-left").src =
//         gallery.images.left.src;
//       document.getElementById("gallery-image-left").alt =
//         gallery.images.left.alt;
//       document.getElementById("gallery-image-left").dataset.modalSrc =
//         gallery.images.left.modalSrc; // Set high-res image for modal

//       document.getElementById("gallery-image-top").src =
//         gallery.images.right[0].src;
//       document.getElementById("gallery-image-top").alt =
//         gallery.images.right[0].alt;
//       document.getElementById("gallery-image-top").dataset.modalSrc =
//         gallery.images.right[0].modalSrc; // Set high-res image for modal

//       document.getElementById("gallery-image-bottom").src =
//         gallery.images.right[1].src;
//       document.getElementById("gallery-image-bottom").alt =
//         gallery.images.right[1].alt;
//       document.getElementById("gallery-image-bottom").dataset.modalSrc =
//         gallery.images.right[1].modalSrc; // Set high-res image for modal

//       // ✅ Attach modal listeners here, after images are set
//       const modal = document.getElementById("gallery-modal");
//       const modalImg = document.getElementById("modal-image");
//       const closeBtn = document.querySelector(".modal__close");

//       const images = document.querySelectorAll(".gallery__image-wrapper img");

//       images.forEach((img) => {
//         img.addEventListener("click", () => {
//           modal.classList.add("is-active");
//           modalImg.src = img.dataset.modalSrc || img.src; // Use data attribute for high-res if available
//           modalImg.alt = img.alt;
//         });
//       });

//       closeBtn.addEventListener("click", () => {
//         modal.classList.remove("is-active");
//       });

//       modal.addEventListener("click", (e) => {
//         if (e.target === modal) {
//           modal.classList.remove("is-active");
//         }
//       });

//       document.addEventListener("keydown", (e) => {
//         if (e.key === "Escape") {
//           modal.classList.remove("is-active");
//         }
//       });
//     })
//     .catch((err) => console.error("Error loading gallery data:", err));
// });

// document.addEventListener("DOMContentLoaded", () => {
//   axios
//     .get("/data/cardBlock.json")
//     .then((res) => {
//       const cardBlockData = res.data.cards;
//       const grid = document.getElementById("card-block-grid");

//       document.getElementById("card-block-heading").textContent =
//         res.data.heading;

//       if (cardBlockData && cardBlockData.length) {
//         cardBlockData.forEach((card, index) => {
//           // Use <a> as the clickable card container
//           const cardEl = document.createElement("a");
//           cardEl.classList.add("card-block__card", "margin-bottom-lg");
//           cardEl.href = card.link || "#"; // Use real link if available, otherwise "#"

//           // Unique heading ID
//           const headingId = `card-heading-${index}`;
//           const paragraphId = `card-paragraph-${index}`;

//           cardEl.innerHTML = `
//             <div class="card-block__card-image ">
//               <img src="${card.image.src}" alt="${card.image.alt}" />
//             </div>
//             <p id="${headingId}" class="p--bold padding-top-lg padding-bottom-sm padding-left-lg padding-right-lg card-heading">
//               ${card.heading}
//             </p>
//             <p id="${paragraphId}" class="padding-left-lg padding-right-lg padding-bottom-lg card-paragraph">${card.paragraph}</p>
//           `;

//           grid.appendChild(cardEl);

//           // Click event
//           cardEl.addEventListener("click", (event) => {
//             event.preventDefault(); // Prevent navigation for testing
//             console.log("Card clicked:", cardEl); // ✅ Logs the <a> element
//           });
//         });
//       }
//     })
//     .catch((err) => console.error("Error loading card block:", err));
// });
