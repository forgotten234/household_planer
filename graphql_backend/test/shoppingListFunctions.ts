import request from 'supertest';
import expect from 'expect';
import {ShoppingItemTest} from '../app/interfaces/ShoppingItem';
require('dotenv').config();

const postShoppingListItem = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {

    })
  };

const getShoppingListItemById = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };
const getShoppingListItems = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const sortShoppingListByType = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const safeShoppingList = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const deleteShoppingListItemByID = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const deleteShoppingListById = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const loadShoppingListById = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

const createPurchaseAfterCompletingAList = (
  url: string | Function, 
  item: ShoppingItemTest): Promise<ShoppingItemTest> => {
    return new Promise((resolve, reject) => {
      
    })
  };

export {
  postShoppingListItem,
  getShoppingListItemById,
  getShoppingListItems,
  safeShoppingList,
  deleteShoppingListById,
  deleteShoppingListItemByID,
  loadShoppingListById,
  createPurchaseAfterCompletingAList,
  sortShoppingListByType
}