import React, { useState } from 'react';

const AddEngineerForm = () => {
  const [name, setName] = useState('');
  const [photo, setPhotoUrl] = useState('');
  const [consultancyFee, setConsultancyFee] = useState('');
  const [speciality, setSpecialty] = useState('');
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Form validation
    if (!name || !photo || !consultancyFee || !speciality || !about) {
      setError('All fields are required');
      return;
    }
    // Call the API to submit the form data
    try {
      const response = await fetch('/api/v1/engineers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Include CSRF token in headers
        },
        body: JSON.stringify({
          name,
          photo,
          consultancyFee,
          speciality,
          about,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add engineer');
      }
      // Reset form fields and error state upon successful submission
      setName('');
      setPhotoUrl('');
      setConsultancyFee('');
      setSpecialty('');
      setAbout('');
      setError('');
      setSuccessMessage('Engineer added successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError('Failed to add engineer');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-sm-8">
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                id="photo"
                placeholder="Photo Url"
                value={photo}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Consultancy fee"
                id="consultancy_fee"
                value={consultancyFee}
                onChange={(e) => setConsultancyFee(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="speciality"
                placeholder="Speciality"
                value={speciality}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {' '}
              <textarea
                className="form-control"
                placeholder="About"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {' '}
            <button type="submit" className="btn btn-primary">Add Engineer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEngineerForm;
