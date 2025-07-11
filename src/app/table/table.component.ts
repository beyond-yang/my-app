import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { User } from './user.model';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-table',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    CommonModule,
    FormsModule,
    NzInputModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  users: User[] = [];
  displayUsers: User[] = [];
  pageIndex = 1;
  pageSize = 5;
  total = 0;
  searchValue: string = ''; // 搜索关键词
  filteredUsers: User[] = []; // 搜索后的数据

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.filter((u) => !u.isDeleted);
      this.total = this.users.length;
      this.applySearch();
    });
  }

  applySearch() {
    if (this.searchValue.trim()) {
      this.filteredUsers = this.users.filter((user) =>
        user.name.includes(this.searchValue.trim())
      );
    } else {
      this.filteredUsers = [...this.users];
    }
    this.total = this.filteredUsers.length;
    this.pageIndex = 1; // 搜索后回到第一页
    this.refreshDisplay();
  }

  refreshDisplay() {
    const start = (this.pageIndex - 1) * this.pageSize;
    this.displayUsers = this.filteredUsers.slice(start, start + this.pageSize);
  }

  onPageIndexChange(page: number) {
    this.pageIndex = page;
    this.refreshDisplay();
  }

  // 新增：搜索按钮点击事件
  onSearch() {
    this.applySearch();
  }

  // 新增：回车事件
  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.applySearch();
    }
  }

  addUser() {
    const id = Math.max(...this.users.map((u) => u.id), 0) + 1;
    this.userService.addUser({ id, name: '新用户', age: 18, isDeleted: false });
  }

  editUser(user: User) {
    const newName = prompt('请输入新名字', user.name);
    if (newName) {
      this.userService.updateUser({ ...user, name: newName });
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }
}
