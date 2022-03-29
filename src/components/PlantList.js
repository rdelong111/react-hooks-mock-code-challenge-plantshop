import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, searchText, onPriceUpdate, onPlantDelete}) {
  const plantList = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchText.toLowerCase());
  })
    .map((plant) => (
      <PlantCard
        key={plant.name}
        plant={plant}
        onPriceUpdate={onPriceUpdate}
        onPlantDelete={onPlantDelete}
      />
    ));

  return (
    <ul className="cards">
      {plantList}
    </ul>
  );
}

export default PlantList;
