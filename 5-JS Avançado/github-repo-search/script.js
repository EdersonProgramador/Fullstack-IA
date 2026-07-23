// script.js

const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const loadingIndicator = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

searchInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            await fetchRepositories(query);
        }
    }
});

async function fetchRepositories(query) {
    loadingIndicator.style.display = 'block';
    resultsContainer.innerHTML = '';
    emptyState.style.display = 'none';

    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=10`);
        
        if (!response.ok) {
            throw new Error('Erro ao buscar repositórios');
        }

        const data = await response.json();
        
        if (data.items.length === 0) {
            emptyState.style.display = 'block';
        } else {
            displayResults(data.items);
        }
    } catch (error) {
        resultsContainer.innerHTML = `<p>${error.message}</p>`;
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function displayResults(repositories) {
    repositories.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>Autor: <img src="${repo.owner.avatar_url}" alt="${repo.owner.login}" width="30" height="30"> ${repo.owner.login}</p>
            <p>${repo.description || 'Sem descrição'}</p>
            <p>Linguagem: ${repo.language || 'N/A'}</p>
            <a href="${repo.html_url}" target="_blank">Ver repositório</a>
        `;
        resultsContainer.appendChild(repoCard);
    });
}