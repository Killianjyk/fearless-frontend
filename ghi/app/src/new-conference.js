import React, {useEffect, useState} from 'react';

function ConferenceForm () {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [max_presentations, setPresentations] = useState('');
    const [max_attendees, setAttendees] = useState('');
    const [location, setLocation] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleStartChange = (event) => {
        const value = event.target.value;
        setStarts(value);
    }
    const handleEndChange = (event) => {
        const value = event.target.value;
        setEnds(value);
    }
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }
    const handlePresentationChange = (event) => {
        const value = event.target.value;
        setPresentations(value);
    }
    const handleAttendeeChange = (event) => {
        const value = event.target.value;
        setAttendees(value);
    }
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setLocations(data.locations)

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.location = location;
        data.name = name;
        data.description = description;
        data.max_presentations = max_presentations;
        data.max_attendees = max_attendees;
        data.starts = starts;
        data.ends = ends;

        console.log(data);
        const ConferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(ConferenceUrl, fetchConfig);
        if (response.ok) {
          const newConference = await response.json();
          console.log(newConference);

          setName('');
          setStarts('');
          setEnds('');
          setDescription('');
          setPresentations('');
          setAttendees('');
          setLocation('');
        }
    }


    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleStartChange} placeholder="mm/dd/yy" required type="date" name="starts" id="starts" className="form-control" />
                        <label htmlFor="room_count">Starts</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEndChange} placeholder="mm/dd/yy" required type="date" name="ends" id="ends" className="form-control" />
                        <label htmlFor="ends">Ends</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea onChange={handleDescriptionChange} className="form-control" name='description' id="description" rows="3"></textarea>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handlePresentationChange} placeholder="Maximum presentations" required type="text" name="max_presentations" id="max_presentations" className="form-control" />
                        <label htmlFor="max_presentations">Maximum presentations</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleAttendeeChange} placeholder="Maximum attendees" required type="text" name="max_attendees" id="max_attendees" className="form-control" />
                        <label htmlFor="max_attendees">Maximum attendees</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleLocationChange} required name="location" id="locations" className="form-select">
                        <option value="">Choose a location</option>
                        {locations.map(location => {
                                return (
                                    <option key={location.id} value={location.id}>
                                    {location.name}
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

export default ConferenceForm;
