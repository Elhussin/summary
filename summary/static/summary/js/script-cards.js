// script.js
const cardsContainer = document.getElementById('cards-container');

const data = [
    {
        title: 'Course 1',
        description: 'This is a description of course 1.',
        image: 'https://via.placeholder.com/300x200?text=Course+1'
    },
    {
        title: 'Course 2',
        description: 'This is a description of course 2.',
        image: 'https://via.placeholder.com/300x200?text=Course+2'
    },
    {
        title: 'Course 3',
        description: 'This is a description of course 3.',
        image: 'https://via.placeholder.com/300x200?text=Course+3'
    }
];

const renderCards = (data) => {
    cardsContainer.innerHTML = data.map(item => `
        <div class="card">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-content">
                <h2 class="card-title">${item.title}</h2>
                <p class="card-description">${item.description}</p>
            </div>
        </div>
    `).join('');
};

renderCards(data);
