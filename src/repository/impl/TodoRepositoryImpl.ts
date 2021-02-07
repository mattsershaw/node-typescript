import { Todo } from "../../model/Todo";
import { TodoRepository} from "../TodoRepository";
import { Connection } from "mysql";
import { resolve } from "path";

export class TodoRepositoryImpl implements TodoRepository {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }
    getAll(): Promise<Todo[]> {
        const sql = 'select * from todosss';
        return new Promise<Todo[]>((resolve, reject) => {
            this.connection.query(sql, (err, results: Todo[]) => { // resultsはany型になっている

                if (err) {
                    return reject(err.message);
                } // getAllとgetだけ

                const todos = results.map((todo: Todo) => {
                    return {
                        id: todo.id,
                        title: todo.title,
                        description: todo.description,
                    } as Todo;
                });
                return resolve(todos); // if (err) throw err; /////////// err ? reject() : 
            });
        });
    }

    get(id: number): Promise<Todo> {
        const sql = 'select * from todos where ?';
        return new Promise<Todo>((resolve, reject) => {
            this.connection.query(sql, {id: id }, (err, results) => { // resultsはany型になっている
                
                if (err) {
                    return reject(err.message);
                } // getAllとgetだけ
                
                
                
                
                
                const todos = results.map((todo: Todo) => {
                    return {
                        id: todo.id,
                        title: todo.title,
                        description: todo.description,
                    } as Todo;
                });
                return resolve(todos[0]); // if (err) throw err;  /////////// err ? reject(err.message) : 
            });

        });
        // this.connection.query(sql, {id: id}, (err, results) => {
        //     if (err) throw err;

        //     const todos = results.map((todo: Todo) => {
        //         return {
        //             id: todo.id,
        //             title: todo.title,
        //             description: todo.description,
        //         } as Todo;
        //     });
        // });
    }

    create(todo: Todo): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const sql = 'insert into todos set ?';
            this.connection.query(sql, todo, (err, result) => {
                return err ? reject(err.message) : resolve(result.insertId as string); // as stringはなくてもok
            });
        });
    }

    update(id: number, todo: Todo): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const sql = 'update todos set ? where ?';
            this.connection.query(sql, [todo, {id: id}], (err) => {
                return err ? reject(err.message) : resolve('');
            });
        });
    }

    delete(id: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const sql = 'delete from todos where ?';
            this.connection.query(sql, {id: id}, (err) => {
                return err ? reject(err.message) : resolve('');
            });
        });
    }
}