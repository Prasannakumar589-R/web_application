const container = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cpHeading = document.getElementById('cp-heading');
const cpElement = document.getElementById('checkpoint-data').dataset.cp;
const lang = document.getElementById('lang').dataset.lang;

let cards = [];
let currentIndex = 0;

// Fetch data from backend API
async function fetchCards() {
try {
    console.log('checkpoint:', cpElement);
const response = await fetch("/get_content", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({ 'lsn': 'lsn1', 'cp': cpElement })
});
if (!response.ok) throw new Error('Failed to fetch cards');
    data = await response.json();
    cards = data.cards;
    cpHeading.textContent = await changeLanguage(data.heading);
    renderCard(currentIndex);
} catch (err) {
console.error('Error loading cards:', err);
container.innerHTML = '<p style="color:white">Failed to load content</p>';
}
}

// Render a single card by index
async function renderCard(index) {
const card = cards[index];
if (!card) return;

    const translatedText = await changeLanguage(card.info);  // Await here
    const translatedheading = await changeLanguage(card.heading);

container.innerHTML = `
<div class="card">
<img src="data:image/jpeg;base64,${card.image_base64}" alt="${card.heading}" />
<div class="card-content">
    <h3>${translatedheading}</h3>
    <p>${translatedText}</p>
</div>
</div>
`;
}

// Animate and navigate to another card
function navigate(direction) {
if ((direction === 'next' && currentIndex >= cards.length - 1) ||
(direction === 'prev' && currentIndex <= 0)) return;

container.classList.add('slide-down-fade-out');

container.addEventListener('animationend', function handler() {
container.classList.remove('slide-down-fade-out');

// Change card index
currentIndex += direction === 'next' ? 1 : -1;
renderCard(currentIndex);

container.classList.add('slide-up-fade-in');
container.removeEventListener('animationend', handler);

container.addEventListener('animationend', function handler2() {
container.classList.remove('slide-up-fade-in');
container.removeEventListener('animationend', handler2);
});
});
}

prevBtn.addEventListener('click', () => navigate('prev'));
nextBtn.addEventListener('click', () => navigate('next'));

// Initialize on page load
fetchCards();

async function changeLanguage(card) {
      const encodedText = encodeURIComponent(card);

      if (lang=='en'){
        return card;
      }

      console.log(lang)

      let email = 'chat241289@gmail.com';

      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${'en'}|${lang}&de=${email}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        let translatedText = data.responseData.translatedText;

        // Return modified card
        return translatedText;
      } catch (error) {
        console.error("Translation error:", error);
        return card; // Fallback to original
      }
    }
