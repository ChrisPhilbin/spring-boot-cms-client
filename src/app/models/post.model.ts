import { ICategory } from './category.model';
import { IUser } from './user.model';

export interface IPost {
  id: string;
  title: string;
  body: string;
  is_published: boolean;
  category: ICategory;
  user: IUser;
}
