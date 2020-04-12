

export default (state = {items: [], customItems: [], currentUser: null}, action) => {
    

    switch (action.type) {
      
      case 'FETCH_ITEMS':
        return {
          ...state,
          items: action.items,
          customItems: action.customItems,
          currentUser: state.currentUser
  
        };

        case 'LOG_IN':
            return {
                ...state,
                items: [...state.items],
                customItems: [...state.customItems],
                currentUser: action.user
            };

        case 'SIGN_OUT':
          return {
            ...state,
            items: [...state.items],
            customItems: [...state.customItems],
            currentUser: null
          }
        
  
      case 'CREATE_ITEM':
        return {...state,
        items: [...state.items],
        customItems: [...state.customItems, action.item],
        currentUser: {
          ...state.currentUser,
          inventory: [...state.currentUser.inventory],
          customs: [...state.currentUser.customs, action.item],
          wishlist: [...state.currentUser.wishlist]
        }
    };
  
      case 'DELETE_ITEM':
        const filteredItems = state.customItems.filter(item => item.id !== action.itemId);
        const filteredInventory = state.currentUser.inventory.filter(item => item.id !== action.itemId)
        const filteredWishlist = state.currentUser.wishlist.filter(item => item.id !== action.itemId)
        const filteredCustoms = state.currentUser.customs.filter(item => item.id !== action.itemId)


        return {
          ...state,
          items: [...state.items],
          customItems: filteredItems,
          currentUser: {
            ...state.currentUser,
            inventory: filteredInventory,
            wishlist: filteredWishlist,
            customs: filteredCustoms
          }
        };

      case 'ADD_WISHLIST':

        return {
          ...state,
          items: [...state.items],
          customItems: [...state.customItems],
          currentUser: {...state.currentUser, 
            inventory: [...state.currentUser.inventory],
            wishlist: [...state.currentUser.wishlist, action.item],
            customs: [...state.currentUser.customs]
          }
      };

      case 'REMOVE_WISHLIST':
        const newWishlist = [...state.currentUser.wishlist.filter(wish => wish.wishId !== action.wishId)];
        return {
              ...state,
              items: [...state.items],
              customItems: [...state.customItems],
              currentUser: {
                ...state.currentUser,
                inventory: [...state.currentUser.inventory],
                wishlist: newWishlist,
                customs: [...state.currentUser.customs]

              }
            };
  
      case 'ADD_INVENTORY':
        
        return {
            ...state,
            items: [...state.items],
            customItems: [...state.customItems],
            currentUser: {...state.currentUser, 
              inventory: [...state.currentUser.inventory, action.item],
              wishlist: [...state.currentUser.wishlist],
              customs: [...state.currentUser.customs]
            }
        };
  
      case 'REMOVE_INVENTORY':
        const newInventory = [...state.currentUser.inventory.filter(sale => sale.saleId !== action.saleId)];
        return {
              ...state,
              items: [...state.items],
              customItems: [...state.customItems],
              currentUser: {
                ...state.currentUser,
                inventory: newInventory,
                wishlist: [...state.currentUser.wishlist],
                customs: [...state.currentUser.customs]

              }
            };

      default: 
        return state;
    }
  }