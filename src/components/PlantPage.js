import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [isLoaded, changeLoaded] = useState(false);
  const [plants, changePlants] = useState([]);
  const [searchText, changeSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((r) => r.json())
      .then((thePlants) => {
        changePlants(thePlants);
        changeLoaded(true);
      });
  }, []);

  function handleNewSubmit(newPlant) {
    changePlants([...plants, newPlant]);
  }

  function handlePriceUpdate(updatedPlant) {
    const newList = plants.map((plant) => {
      if (updatedPlant.id === plant.id) return updatedPlant;
      else return plant;
    });
    changePlants(newList);
  }

  function handlePlantDelete(ID) {
    const newList = plants.filter((plant) => plant.id !== ID);
    changePlants(newList);
  }

  if (!isLoaded) return <h3>Loading...</h3>
  return (
    <main>
      <NewPlantForm onNewSubmit={handleNewSubmit} />
      <Search onSearchChange={(e) => changeSearch(e.target.value)} />
      <PlantList
        plants={plants}
        searchText={searchText}
        onPriceUpdate={handlePriceUpdate}
        onPlantDelete={handlePlantDelete}
      />
    </main>
  );
}

export default PlantPage;
