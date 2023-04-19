import mongoose from 'mongoose';
import randomstring from 'randomstring';
import {
  postShoppingListItem,
  getShoppingListItemById,
  getShoppingListItemsByUser,
  //sortShoppingListByType,
  safeShoppingList,
  deleteShoppingListById,
  deleteShoppingListItemByID,
  loadShoppingListById,
  createPurchaseAfterCompletingAList,
  
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
import {UserTest} from '../app/interfaces/User';
import jwt from 'jsonwebtoken';
import { ShoppingItemTest } from '../app/interfaces/ShoppingItem';
import app from '../app/app'
import LoginMessageResponse from '../app/interfaces/LoginMessageResponse'
import { ShoppingItemListTest } from '../app/interfaces/ShoppingItemList';
describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /*
    User tests
  */
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
  
  // create first user
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

  /*
    Shopping list tests
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
  
  //not a backend function?
  // it('sort the list by type', async () => {
  //   await sortShoppingListByType();
  // })
  let shoppingListTestItem1: ShoppingItemListTest = {
    title: 'Test shopping item' + randomstring.generate(7),
  };
  it('should be possible to safe the list',async () => {
    let itemIdArray = [itemID1, itemID2];
    await safeShoppingList(app, shoppingListTestItem1.title!, itemIdArray, userData.token!);
  })
  /*
  it('should be possible to load a safed list',async () => {
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
  })*/
})