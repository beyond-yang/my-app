import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../table/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { id: 1, name: '张三', age: 20, isDeleted: false },
    { id: 2, name: '李四', age: 25, isDeleted: false },
    { id: 3, name: '王五', age: 30, isDeleted: false },
  ];
  private usersSubject = new BehaviorSubject<User[]>(this.users);

  getUsers() {
    return this.usersSubject.asObservable();
  }

  addUser(user: User) {
    this.users.push(user);
    this.usersSubject.next(this.users);
  }

  updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index > -1) {
      this.users[index] = user;
      this.usersSubject.next(this.users);
    }
  }

  deleteUser(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      user.isDeleted = true;
      this.usersSubject.next(this.users);
    }
  }
}
