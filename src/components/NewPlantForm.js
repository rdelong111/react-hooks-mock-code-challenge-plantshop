import React, {useState} from "react";

function NewPlantForm({onNewSubmit}) {
  const [formData, changeFormData] = useState({
    image: '',
    name: '',
    price: 0
  });

  function handleFormChange(e) {
    changeFormData({...formData, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onNewSubmit(newPlant);
        changeFormData({image: '', name: '', price: 0});
        e.target.reset();
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleFormChange} type="text" name="name" placeholder="Plant name" />
        <input onChange={handleFormChange} type="text" name="image" placeholder="Image URL" />
        <input onChange={handleFormChange} type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
