import mongoose from 'mongoose';

import {
  postShoppingListItem,
  getShoppingListItemById,
  getShoppingListItems,
  sortShoppingListByType,
  safeShoppingList,
  deleteShoppingListById,
  deleteShoppingListItemByID,
  loadShoppingListById,
  createPurchaseAfterCompletingAList,
  
} from './shoppingListFunctions'
describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /*
    Shopping list tests
  */
  it('should create a new item',async () => {
    await postShoppingListItem();
  });
  it('should be possible to get a specific item',async () => {
    await getShoppingListItemById();
  })
  it('list should be not empty',async () => {
    await getShoppingListItems();
  });
  it('sort the list by type', async () => {
    await postShoppingListItem();
    await postShoppingListItem();
    await sortShoppingListByType();
  })
  it('should be possible to safe the list',async () => {
    await safeShoppingList();
  })
  it('should delete a specific item',async () => {
    await deleteShoppingListItemByID();
  })
  it('should delete the whole list',async () => {
    await deleteShoppingListById();
  })
  it('should be possible to load the list',async () => {
    await loadShoppingListById();
  })
  it('should create a purchase after completing a list',async () => {
    await createPurchaseAfterCompletingAList();
  })
})