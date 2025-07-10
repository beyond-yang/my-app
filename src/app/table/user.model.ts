export interface User {
  id: number;
  name: string;
  age: number;
  isDeleted: boolean; // 逻辑删除标志
}
