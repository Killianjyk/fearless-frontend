console.log("hello")

window.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8000/api/locations/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("ERROR")
        } else {
            const data = await response.json();

            const selectTag = document.getElementById('locations')
            for (let location of data.locations) {
                const newoption = document.createElement('option');
                newoption.value = location.id;
                newoption.innerHTML = location.name;
                selectTag.appendChild(newoption);

            }
        }
    } catch (e) {
        console.log("ERROR")
    };

    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const locationUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json();
            console.log(newConference);
        }
    });

});
