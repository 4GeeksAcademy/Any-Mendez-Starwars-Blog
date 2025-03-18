export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  console.log("---->"+action.type);
  switch (action.type) {
    case 'set_people':
      return {
        ...store,
        people: [...action.payload]
      };
    
    case 'set_planets':
      return {
        ...store,
        planets: [...action.payload]
      };
      
    case 'set_vehicles':
      return {
        ...store,
        vehicles: [...action.payload]
      };
    
    case 'add_to_favorite':
      const {uid, name}= action.payload;

      if (store.favorites.some(fav => fav.name === name)) {
        return store;
      }

      return{
        ...store,
        favorites:[...store.favorites,{uid: uid, name: name}]
      };

      case 'remove_from_favorite':
        return {
          ...store,
          favorites: store.favorites.filter(fav => fav.name !== action.payload)
        };

    default:
      throw new Error("Unknown action");
      
  }
}
