// fetch('/api/progetti')
//     .then(res => res.json())
//     .then(data => {
//         const container = document.getElementById('progetti-container');
//         data.forEach(progetto => {
//             const progettoDiv = document.createElement('div');
//             progettoDiv.classList.add('progetto');
//             progettoDiv.innerHTML = `
//                 <h2>${progetto.Nome_P}</h2>
//                 <p>Descrizione: ${progetto.Descrizione_P}</p>
//                 <p>Data: ${progetto.Data_P}</p>
//                 <p>Repository Git: ${progetto.Repo_Git}</p>
//             `
//             container.appendChild(progettoDiv);
//         })
//     })

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
                <p>Repository Git: <a href="${progetto.Repo_Git}" target="_blank">${progetto.Repo_Git}</a></p>
            `;

            container.appendChild(progettoDiv);
        });
    });
