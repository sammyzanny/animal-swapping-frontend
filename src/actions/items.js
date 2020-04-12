export const createItem = (item) => {
    return {
      type: 'CREATE_ITEM',
      item: item
    }
}
  
export const deleteItem = itemId => {
    return {
      type: 'DELETE_ITEM',
      itemId
    }
}
  

export const addWishlist = item => {
  return {
    type: 'ADD_WISHLIST',
    item: item
  }
}

export const removeWishlist = wishId => {
  return {
    type: 'REMOVE_WISHLIST',
    wishId
  }
}

export const addInventory = item => {
    return {
      type: 'ADD_INVENTORY',
      item: item
    }
}
export const removeInventory = saleId => {
    return {
      type: 'REMOVE_INVENTORY',
      saleId
    }
}

export const login = user => {
    return {
      type: 'LOG_IN',
      user: user
    }
}

export const requestPurchase = itemId => {
  return {
    type: 'REQUEST_PURCHASE',
    itemId
  }
}
