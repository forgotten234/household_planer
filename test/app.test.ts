import mongoose, {Types} from 'mongoose';
import randomstring from 'randomstring';
import {
  postShoppingListItem,
  getShoppingListItemById,
  getShoppingListItemsByUser,
  //sortShoppingListByType,
  safeShoppingList,
  deleteShoppingListByUser,
  deleteShoppingListItemByUser,
  loadShoppingListsByUser,
  createPurchaseAfterCompletingAList,
  updateShoppingListByUser,
  loadShoppingListById,
  updateShoppingItem
} from './shoppingListFunctions'
import {
  adminDeleteUser,
  deleteUser,
  getSingleUser,
  getUser,
  loginBrute,
  loginUser,
  postUser,
  putUser,
} from './userFunctions';
import {
  postBankbalance,
  updateBankBalanceFromUser,
  deleteBankBalanceFromUser,
  getBankBalanceFromUser
} from './bankBalanceFunctions';
import {
  postCalenderItem,
  updateBCalenderItemFromUser,
  deleteCalenderItemFromUser,
  getAllCalenderItemsFromUser
} from './calenderItemFunctions'
import {UserTest} from '../src/interfaces/User';
import jwt from 'jsonwebtoken';
import { ShoppingItemTest } from '../src/interfaces/ShoppingItem';
import app from '../src/app'
import LoginMessageResponse from '../src/interfaces/LoginMessageResponse'
import { ShoppingItemListTest } from '../src/interfaces/ShoppingItemList';
import { BankBalanceTest } from '../src/interfaces/BankBalance';
import { CalenderItemTest } from '../src/interfaces/CalenderItem';
import { PurchaseItemTest } from '../src/interfaces/PurchaseItem';
import { deletePurchaseItemFromUser, getAllPurchaseItemsFromUser, postPurchaseItem, updatePurchaseItemFromUser } from './purchaseItemFunctions';
describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

//#region User tests
  let userData: LoginMessageResponse;
  let userData2: LoginMessageResponse;
  let adminData: LoginMessageResponse;

  const testUser: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const testUser2: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    email: randomstring.generate(9) + '@user.fi',
    password: 'testpassword',
  };

  const adminUser: UserTest = {
    user_name: 'Admin',
    email: 'admin@metropolia.fi',
    password: '12345',
  };

  
  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });
  
  // //create first user
  // it('should create a new user', async () => {
  //   await postUser(app, adminUser);
  // });
  //create second user to try to modify someone else's cats and userdata
  it('should create second user', async () => {
    await postUser(app, testUser2);
  });

  // test login
  it('should login user', async () => {
    userData = await loginUser(app, testUser);
  });

  // test login with second user
  it('should login second user', async () => {
    userData2 = await loginUser(app, testUser2);
  });

  //test login with admin
  it('should login admin', async () => {
    adminData = await loginUser(app, adminUser);
  });

  // make sure token has role (so that we can test if user is admin or not)
  it('token should have role', async () => {
    const dataFromToken = jwt.verify(
      userData.token!,
      process.env.JWT_SECRET as string
    );
    expect(dataFromToken).toHaveProperty('role');
  });

  // test get all users
  it('should return array of users', async () => {
    await getUser(app);
  });

  // test get single user
  it('should return single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  // test update user
  it('should update user', async () => {
    await putUser(app, userData.token!);
  });
//#endregion
//#region Shopping list tests
  /*
    The delete item test is after the updateing lists test
  */

  let shoppingTestItem1: ShoppingItemTest = {
    title: 'Test shopping item' + randomstring.generate(7),
    type: 'food',
    description: randomstring.generate(25)
  };

  //create two more items to sort for example
  let shoppingTestItem2: ShoppingItemTest = {
    title: 'Test shopping item' + randomstring.generate(7),
    type: 'other',
    description: randomstring.generate(25)
  };
  let shoppingTestItem3: ShoppingItemTest = {
    title: 'Test shopping item' + randomstring.generate(7),
    type: 'beverage',
    description: randomstring.generate(25)
  };

  // to get the id's from the items
  let itemID1: string;
  it('should create a new shopping list item',async () => {
    const item = await postShoppingListItem(app, shoppingTestItem1, userData.token!);
    itemID1 = item.id!;
  });
  let itemID2: string;
  it('should create a new shopping list item',async () => {
    const item = await postShoppingListItem(app, shoppingTestItem2, userData.token!);
    itemID2 = item.id!;
  });  let itemID3: string;
  it('should create a new shopping list item',async () => {
    const item = await postShoppingListItem(app, shoppingTestItem3, userData.token!);
    itemID3 = item.id!;
  });
  it('should be possible to get a specific item',async () => {
    await getShoppingListItemById(app, itemID1, userData.token!);  
  })
  
  it('items from a user shouldnt be empty',async () => {
    await getShoppingListItemsByUser(app, userData.user.id!, userData.token!);
  });
  
  let newItem: ShoppingItemTest = {
    title: "newTitle",
    type: "beverage",
    description: "agfsdfgafadf"
  }
  it('should be possible to update a item', async () => {
    await updateShoppingItem(app, newItem, itemID1, userData.token!);
  });
  

  //not a backend function?
  // it('sort the list by type', async () => {
  //   await sortShoppingListByType();
  // })
  let shoppingListTestItem1: ShoppingItemListTest = {
    title: 'Test shopping item list' + randomstring.generate(7),
  };
  let listId1: string;
  let listId2: string;
  let oldListLength: number; // to compare if more items are added
  it('should be possible to safe the list',async () => {
    let itemIdArray = [itemID1, itemID2];
    const list = await safeShoppingList(app, shoppingListTestItem1.title!, itemIdArray, userData.token!);
    listId1 = list.id!;
    oldListLength = list.items?.length === undefined ? 0 : list.items?.length;
  })
  it('should load a specific list', async () => {
    await loadShoppingListById(app ,listId1, userData.token!);
  })
  it('should update the list ', async () => {
    let newItemIdArray= [itemID1,itemID2, itemID3];     
    await updateShoppingListByUser(app, newItemIdArray, "newName", listId1, oldListLength, userData.token!)
  })
  it('should be possible to safe a second list',async () => {
    let itemIdArray = [itemID1, itemID2];
    const list = await safeShoppingList(app, shoppingListTestItem1.title!, itemIdArray, userData.token!);
    listId2 = list.id!;
    oldListLength = list.items?.length === undefined ? 0 : list.items?.length;
  })
  //the delete method for the item is placed here, because we use some items for the lists. so we dont have to create a fourth item
  it('should be possible to delete a item',async () => {
    await deleteShoppingListItemByUser(app, itemID3, userData.token!)
  })
  it('should get all lists from a user', async () => {
    console.log(userData)
    await loadShoppingListsByUser(app, userData.user.id!, userData.token!);
  })
  it('should delete the whole first list',async () => {
    await deleteShoppingListByUser(app, listId1, userData.token!);
  })
  it('should delete the whole second list',async () => {
    await deleteShoppingListByUser(app, listId2, userData.token!);
  })
  /*
  it('should create a purchase after completing a list',async () => {
    await createPurchaseAfterCompletingAList();
  })*/
//#endregion
//#region Bank Balance tests
  let newBankBalance: BankBalanceTest = {
    accountName: "Super Name",
    balance: 12323.23,
    iban: "DE1372934027390"
  }
  let bankBalanceId: string;
  it('should create a bank balance',async () => {
    const returnedBalance = await postBankbalance(app, newBankBalance, userData.token!);
    bankBalanceId = returnedBalance.id!;
  })
  it('should not create a second bank balance for the same user',async () => {
    await postBankbalance(app, newBankBalance, userData.token!);
  })
  it('should be possible to get the bank balance from a user',async () => {
    await getBankBalanceFromUser(app, bankBalanceId, userData.token!);
  })
  let updatedBankBalance: BankBalanceTest = {
    accountName: "NEWWWWWWW Super Name",
    balance: 99999999999,
    iban: "DE12345"
  }
  it('should be possible to update a bank balance',async () => {
    await updateBankBalanceFromUser(app, updatedBankBalance, bankBalanceId, userData.token!)
  })
  it('should be possible to delete a bank balance',async () => {
    await deleteBankBalanceFromUser(app, bankBalanceId, userData.token!)
  })
//#endregion
//#region Calender Item tests
let newCalenderItem: CalenderItemTest = {
  title: "Super Calender item",
  description: "today is the da to ....",
  date: new Date('2022-01-01'),
}
let calenderItemId: string;
it('should create a calender item',async () => {
  const returnedCalenderItem = await postCalenderItem(app, newCalenderItem, userData.token!);
  calenderItemId = returnedCalenderItem.id!;
})
let toUpdateCalenderItem: CalenderItemTest = {
  title: "NEW Super Calender item",
  description: "NEW today is the da to ....",
  date: new Date('2022-01-02'),
}
it('should update a calender item',async () => {
  await updateBCalenderItemFromUser(app, toUpdateCalenderItem, calenderItemId, userData.token!);
})
let secondCalenderItem: CalenderItemTest = {
  title: "SECOND Super Calender item",
  description: "today is the second day to ....",
  date: new Date('2022-01-07'),
}
let calenderItemId2: string;
it('should create a second calender item',async () => {
  const returnedSecondCalenderItem = await postCalenderItem(app, secondCalenderItem, userData.token!);
  calenderItemId2 = returnedSecondCalenderItem.id!;
})
it('should return all calender items from a user',async () => {
  await getAllCalenderItemsFromUser(app, userData.user.id, userData.token!);
})
it('should delete a calender item',async () => {
  await deleteCalenderItemFromUser(app, calenderItemId, userData.token!);
})
//#endregion
//#region purchase item test
let newPurchaseItem: PurchaseItemTest = {
  title: "Super Purchase item",
  type: "Food",
  price: 200000,
}
let purchaseItemId: string;
it('should create a purchase item',async () => {
  const returnedpurchaseItem = await postPurchaseItem(app, newPurchaseItem, userData.token!);
  purchaseItemId = returnedpurchaseItem.id!;
})
let toUpdatePurchaseItem: PurchaseItemTest = {
  title: "NEWWWWW Super purchase item",
  type: "NEWWWWW Food",
  price: 120000,
}
it('should update a purchase item',async () => {
  await updatePurchaseItemFromUser(app, toUpdatePurchaseItem, purchaseItemId, userData.token!);
})
let secondPurchaseITEM: PurchaseItemTest = {
  title: "SECOND Super purchase item",
  type: "SECOND Food",
  price: 120000,
}
let purchaseItemId2: string;
it('should create a second purchase item',async () => {
  const returnedSecondPurchaseItem = await postPurchaseItem(app, secondPurchaseITEM, userData.token!);
  purchaseItemId2 = returnedSecondPurchaseItem.id!;
})
it('should return all calender items from a user',async () => {
  await getAllPurchaseItemsFromUser(app, userData.user.id, userData.token!);
})
it('should delete a calender item',async () => {
  await deletePurchaseItemFromUser(app, purchaseItemId, userData.token!);
})
//#endregion
})