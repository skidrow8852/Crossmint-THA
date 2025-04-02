// In this Challenge i need to draw Crossmint Logo shape using SOLoons, POLYanet and comETHs
import { getAllCoordinates } from "../helpers/apis";
import { placeEntitiesOnMap } from "../helpers/draw";

const drawLogo = async () => {
  let data = await getAllCoordinates();
  await placeEntitiesOnMap(data);
};

drawLogo();
