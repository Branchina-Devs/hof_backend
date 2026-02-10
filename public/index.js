fetch('/api/progetti')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('progetti-container');

        data.forEach(progetto => {
            const progettoDiv = document.createElement('div');
            progettoDiv.classList.add('progetto');
            console.log(progetto);

            progettoDiv.innerHTML = `
                <h2>${progetto.Nome_P}</h2>
                <p>Descrizione: ${progetto.Descrizione_P}</p>
                <p>Data: ${progetto.Data_P}</p>
                <p>Repository Git: <a href="${progetto.repo_git}" target="_blank">${progetto.repo_git}</a></p>
            `;

            container.appendChild(progettoDiv);
        });
    });
