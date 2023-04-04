
function createCard(title, description, pictureUrl, startdate, enddate, subtitle) {
    return `
    <div class="col">
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">"${title}"</h5>
          <h6 class="card-subtitle mb-2 text-muted">${subtitle}</h6>
          <p class="card-text">${description}</p>
          <footer class="card-date">${startdate} - ${enddate}</footer>
        </div>
      </div>
    </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Figure out what to do when the response is bad
        return showError("Failed to fetch conference")
      } else {
        const data = await response.json();

        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            let startdate = new Date(details.conference.starts);
            startdate = startdate.toLocaleDateString();
            let enddate = new Date(details.conference.ends);
            enddate = enddate.toLocaleDateString();
            const subtitle = details.conference.location.name;
            const html = createCard(title, description, pictureUrl, startdate, enddate, subtitle);
            const col = document.querySelector('.row');
            col.innerHTML += html;
          }
        }

      }
    } catch (e) {
        showError("Failed to load data");
      // Figure out what to do if an error is raised
    }

});

function showError(message) {
    const alertHTML = `
        <div class="alert alert-primary" role="alert">
        ${message}
        </div>
        `;
    document.body.innerHTML += alertHTML;
}
