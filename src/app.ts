import express, { Request, Response, NextFunction } from 'express';
import mysql from 'mysql';
import { AddressInfo } from 'net';
import bodyParser from 'body-parser';
import cors from 'cors'
// import { Todo } from "./model/Todo";
import { TodoRepositoryImpl } from "./repository/impl/TodoRepositoryImpl"; // インポート方法を見直す
import { TodoServiceImpl } from "./service/impl/TodoServiceImpl";
import { TodoController } from "./controller/TodoController";

const app = express();

//#region expressでWebサーバーの設定

// expressで4000ポートにサーバー起動
const server = app.listen(4000, () => {
  const address = server.address() as AddressInfo;
  console.log("Node.js is listening to PORT:" + address.port);
});

// expressの設定 (cors method header 許可の設定)
app.disable('x-powered-by');
app.use(cors()).use(bodyParser.json());

// cors を使用せず手動で設定すると以下のような感じになる
// app.use((req: Request, res: Response, next:NextFunction ) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Content-Type, Authorization, access_token'
//   );

//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

//#endregion

//#region mysqlに接続

const connection = mysql.createConnection({
  host: '',
  port: 3306,
  user: 'user',
  password: 'password',
  database: 'sample_database',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('connected mysql');
});

//#endregion

const todoRepository = new TodoRepositoryImpl(connection);
const todoService = new TodoServiceImpl(todoRepository);
const todoController = new TodoController(todoService);

app.use('/api/', todoController.router);

// //#region APIのエンドポイント(APIに接続するためのURL)を設定



// // todoすべてを取得する
// // app.get("/api/todos", async (req: Request, res: Response, next: NextFunction) => {
// //   const todos = await todoService.getAll();
// //   // const sql = 'select * from todos';
// //   // connection.query(sql, (err, results: Todo[]) => { // resultsはany型になっている
// //   //   if (err) throw err;

// //   //   const todos = results.map((todo: Todo) => {
// //   //     return {
// //   //       id: todo.id,
// //   //       title: todo.title,
// //   //       description: todo.description,
// //   //     } as Todo;
// //   //   });

// //   res.json(todos);
// // });

// // todo1件を取得する
// app.get("/api/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
//   const id = parseInt(req.params.id);
//   const todo = await todoService.get(id);
//   res.json(todo);
//   // const sql = 'select * from todos where ?';
//   // connection.query(sql, {id: id}, (err, results) => {
//   //   if (err) throw err;

//   //   const todos = results.map((todo: Todo) => {
//   //     return {
//   //       id: todo.id,
//   //       title: todo.title,
//   //       description: todo.description,
//   //     } as Todo;
//   //   });

//   //   res.json(todos[0]);
//   // });
// });

// // todo1件を作成する
// app.post("/api/todos", async (req: Request, res: Response, next: NextFunction) => {
//   const todo = req.body;
//   const result = await todoService.create(todo);
//   // const sql = 'insert into todos set ?';
//   // connection.query(sql, todo, (err, result) => {
//   //   if (err) throw err;
//     res.status(201).json(result);
//   //});
// });

// // todo1件を更新する
// app.put("/api/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
//   const id = parseInt(req.params.id);
//   const todo = req.body;
//   await todoService.update(id, todo)

//   // const sql = 'update todos set ? where ?';
//   // connection.query(sql, [todo, {id: id}], (err) => {
//   //   if (err) throw err;
//     res.status(200).send();
//   //});
// });

// // todo1件を削除する
// app.delete("/api/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
//   const id = parseInt(req.params.id);
//   await todoService.delete(id);
//   res.status(204).send();
//   // const sql = 'delete from todos where ?';
//   // connection.query(sql, {id: id}, (err) => {
//   //   if (err) throw err;
//   //   res.status(204).send();
//   // });
// });

//#endregion
