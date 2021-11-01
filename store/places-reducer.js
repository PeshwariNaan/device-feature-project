import { ADD_PLACE } from "./places-actions"
import Place from "../models/place"

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
        const newPlace = new Place(new Date().toString(), action.placeData.title)
        return {
            places: state.places.concat(newPlace) // using concat creates a new array where we add the new place - We don't need the old state here
        }
    }
    return state
}