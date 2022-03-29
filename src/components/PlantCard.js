import React, {useState} from "react";

function PlantCard({plant, onPriceUpdate, onPlantDelete}) {
  const [inStock, changeInStock] = useState(true);
  const [updateBtn, showBtn] = useState(true);
  const [newPrice, setNewPrice] = useState(plant.price);

  function handleUpdateBtn() {
    if (!updateBtn) {
      fetch(`http://localhost:6001/plants/${plant.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({price: parseFloat(newPrice)})
      })
        .then((r) => r.json())
        .then((updatedPlant) => {
          onPriceUpdate(updatedPlant);
          setNewPrice(parseFloat(newPrice));
          showBtn(!updateBtn);
        });
    }
    else {
      showBtn(!updateBtn);
    }
  }

  function handlePlantDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'DELETE'
    })
      .then(() => onPlantDelete(plant.id));
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {inStock ? (
        <button onClick={() => changeInStock(false)} className="primary">In Stock</button>
      ) : (
        <button onClick={() => changeInStock(true)}>Out of Stock</button>
      )}
      {updateBtn ? (
        <button onClick={handleUpdateBtn}>Update Price</button>
      ) : (
        <div>
          <button onClick={handleUpdateBtn}>Submit New Price</button>
          <input
            type="number"
            name="updatePrice"
            step="0.01"
            placeholder="New Price"
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
      )}
      <button onClick={handlePlantDelete}>Remove Plant</button>
    </li>
  );
}

export default PlantCard;
