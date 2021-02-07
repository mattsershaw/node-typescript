import { Todo } from "../model/Todo";

export interface TodoRepository {
    getAll(): Promise<Todo[]>;
    get(id: number): Promise<Todo>;
    create(todo: Todo): Promise<string>;
    update(id: number, todo: Todo): Promise<string>;
    delete(id: number): Promise<string>;
}
// 設計図のようなもの(インターフェイス)
// チーム開発に便利 (元ができてなくてもテストができる)