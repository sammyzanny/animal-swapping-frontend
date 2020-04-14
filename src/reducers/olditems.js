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
      case 'REQUEST_TRADE':
        return {
          ...state,
          items: [...state.items],
          customItems: [...state.customItems],
          currentUser: {
            ...state.currentUser,
            inventory: [...state.currentUser.inventory],
            wishlist: [...state.currentUser.wishlist],
            customs: [...state.currentUser.customs],
            exchanges: [...state.currentUser.exchanges],
            purchases: [...state.currentUser.purchases],
            pending_purchases: [...state.currentUser.pending_purchases, action.request],
            pending_exchanges: [...state.currentUser.pending_exchanges]
          }
        }

      case 'ACCEPT_TRADE':
            const newPendingExchanges = state.currentUser.pending_exchanges.filter(pe => pe.id !== action.exchange.id)
            return {
              ...state,
              items: [...state.items],
              customItems: [...state.customItems],
              currentUser: {
                ...state.currentUser,
                inventory: [...state.inventory],
                wishlist: [...state.currentUser.wishlist],
                customs: [...state.currentUser.customs],
                exchanges: [...state.currentUser.exchanges, action.exchange],
                purchases: [...state.currentUser.purchases],
                pending_purchases: [...state.currentUser.pending_purchases],
                pending_exchanges: newPendingExchanges
              }
            }


      case 'DECLINE_TRADE':
        const filteredPendingExchanges = state.currentUser.pending_exchanges.filter(pe => pe.id !== action.exchangeId)
        return {
          ...state,
          items: [...state.items],
          customItems: [...state.customItems],
          currentUser: {
            ...state.currentUser,
            inventory: [...state.inventory],
            wishlist: [...state.currentUser.wishlist],
            customs: [...state.currentUser.customs],
            exchanges: [...state.currentUser.exchanges],
            purchases: [...state.currentUser.purchases],
            pending_purchases: [...state.currentUser.pending_purchases],
            pending_exchanges: filteredPendingExchanges
          }
        }

      default: 
        return state;
    }
  }