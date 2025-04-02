// In this Challenge i need to draw Crossmint Logo shape using SOLoons, POLYanet and comETHs
import { deletePolyanet, getAllCoordinates } from "../helpers/apis";
import { generateXPattern, placeEntitiesOnMap } from "../helpers/draw";

const drawLogo = async () => {
  // delete all previous entities
  await generateXPattern(deletePolyanet);

  // draw logo using SOLoons, POLYanet and comETHs
  let data = await getAllCoordinates();
  await placeEntitiesOnMap(data);
};

drawLogo();
