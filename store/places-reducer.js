import { ADD_PLACE, SET_PLACES } from "./places-actions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) => new Place(pl.id.toString(), pl.title, pl.imageUri)
        ),
      };
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      );
      return {
        places: state.places.concat(newPlace), // using concat creates a new array where we add the new place - We don't need the old state here
      };
  }
  return state;
};
