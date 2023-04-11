import {Types, Document} from 'mongoose';

interface ShoppingItem extends Document{
  title: string;
  type: 'food' | 'beverage' | 'other';
  description?: string;
}

interface ShoppingItemTest {
  id?: string;
  title?: string;
  type?: 'food' | 'beverage' | 'other';
  description?: string;
}

export {ShoppingItem, ShoppingItemTest}