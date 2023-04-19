import React, {useEffect, useState} from 'react';

function PresentationForm () {
    const [conferences, setConferences] = useState([]);
    const [presenter_name, setName] = useState('');
    const [presenter_email, setEmail] = useState('');
    const [company_name, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [conference, setConference] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }

    const handleCompanyChange = (event) => {
        const value = event.target.value;
        setCompany(value);
    }

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const handleSynopsisChange = (event) => {
        const value = event.target.value;
        setSynopsis(value);
    }

    const handleConferenceChange = (event) => {
        const value = event.target.value;
        setConference(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setConferences(data.conferences)

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.presenter_name = presenter_name;
        data.presenter_email = presenter_email;
        data.company_name = company_name;
        data.title = title;
        data.synopsis = synopsis;


        console.log(data);
        const PresentationUrl = `http://localhost:8000/api/conferences/${conference}/presentations/`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(PresentationUrl, fetchConfig);
        if (response.ok) {
          const newPresentation = await response.json();
          console.log(newPresentation);

          setName("")
          setEmail("");
          setCompany("");
          setTitle("");
          setSynopsis("");
          setConference("");

        }
    }

      useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new presentation</h1>
              <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={handleNameChange}
                    value = {presenter_name}
                    placeholder="Presenter name"
                    required
                    type="text"
                    name="presenter_name"
                    id="presenter_name"
                    className="form-control"
                  />
                  <label htmlFor="presenter_name">Presenter name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={presenter_email}
                    onChange={handleEmailChange}
                    placeholder="Presenter email"
                    required
                    type="email"
                    name="presenter_email"
                    id="presenter_email"
                    className="form-control"
                  />
                  <label htmlFor="presenter_email">Presenter email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    value={company_name}
                    onChange={handleCompanyChange}
                    placeholder="Company name"
                    type="text"
                    name="company_name"
                    id="company_name"
                    className="form-control"
                  />
                  <label htmlFor="company_name">Company name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={handleTitleChange}
                    value={title}
                    placeholder="Title"
                    required
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                  />
                  <label htmlor="title">Title</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="synopsis">Synopsis</label>
                  <textarea
                    onChange={handleSynopsisChange}
                    value={synopsis}
                    className="form-control"
                    id="synopsis"
                    rows="3"
                    name="synopsis"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <select
                    onChange={handleConferenceChange}
                    value={conference}
                    required name="conference"
                    id="conference"
                    className="form-select"
                  >
                    <option value="">Choose a conference</option>
                    {conferences.map(conference => {
                                return (
                                    <option key={conference.href} value={conference.id}>
                                    {conference.name}
                                    </option>
                                );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    );
}

export default PresentationForm;
