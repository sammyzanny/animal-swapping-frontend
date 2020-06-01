

export default (state = {items: [], customItems: [], currentUser: null}, action) => {
    

    switch (action.type) {
      
      case 'FETCH_ITEMS':
        return {
          ...state,
          items: action.items,
          customItems: action.customItems,  
        };

        case 'LOG_IN':
            return {
                ...state,
                currentUser: action.user
            };

        case 'SIGN_OUT':
          return {
            ...state,
            currentUser: null
          }

        case 'EDIT_PROFILE':
          return {
            ...state,
            currentUser: action.user
          }
        
  
      case 'CREATE_ITEM':
        return {...state,
        customItems: [...state.customItems, action.item],
        currentUser: {
          ...state.currentUser,
          customs: [...state.currentUser.customs, action.item],
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
          currentUser: {...state.currentUser, 
            wishlist: [...state.currentUser.wishlist, action.item],
          }
      };

      case 'REMOVE_WISHLIST':
        const newWishlist = [...state.currentUser.wishlist.filter(wish => wish.wishId !== action.wishId)];
        return {
              ...state,
              currentUser: {
                ...state.currentUser,
                wishlist: newWishlist
              }
            };
  
      case 'ADD_INVENTORY':
        
        return {
            ...state,
            currentUser: {...state.currentUser, 
              inventory: [...state.currentUser.inventory, action.item]
            }
        };
  
      case 'REMOVE_INVENTORY':
        const newInventory = [...state.currentUser.inventory.filter(sale => sale.saleId !== action.saleId)];
        return {
              ...state,
              currentUser: {
                ...state.currentUser,
                inventory: newInventory,
              }
            };

      case 'REQUEST_TRADE':
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            pending_purchases: [...state.currentUser.pending_purchases, action.request],
          }
        }

      case 'ACCEPT_TRADE':
            const newPendingExchanges = state.currentUser.pending_exchanges.filter(pe => pe.id !== action.exchange.id)
            return {
              ...state,
              currentUser: {
                ...state.currentUser,
                exchanges: [...state.currentUser.exchanges, action.exchange],
                pending_exchanges: newPendingExchanges
              }
            }


      case 'DECLINE_TRADE':
        const filteredPendingExchanges = state.currentUser.pending_exchanges.filter(pe => pe.id != action.exchangeId)
        return {
          ...state,
          currentUser: {
            ...state.currentUser,
            pending_exchanges: filteredPendingExchanges
          }
        }

      default: 
        return state;
    }
  }