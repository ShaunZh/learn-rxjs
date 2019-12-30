import { fromEvent, of } from "rxjs";
import { map, filter, tap, merge } from "rxjs/operators";
import { createTodoItem } from "./lib";

const $input = document.querySelector(".todo-val");
const $list = document.querySelector(".list-group");
const $addBtn = document.querySelector(".btn-add");

const observableBtn = fromEvent($addBtn, "click");

//Observable: 可观察的
// observableInput也是一个Observable
const observableEnter = fromEvent($input, "keydown").pipe(
  filter(val => val.keyCode === 13)
);

// merge： 合并两个Observable(https://github.com/btroncone/learn-rxjs/blob/master/operators/combination/merge.md)
const observableAdd = observableEnter.pipe(merge(observableBtn));
console.log(observableAdd);

// app 也是一个Observable
const app = observableAdd.pipe(
  map(() => $input.value), // 获取输入的值
  filter(r => r !== ""), // 过滤空值
  map(createTodoItem), // 使用输入的值生成一个结点
  tap(el => {
    // 将结点添加到list中，注意：tap主要用于数据流存在副作用的操作
    $list.appendChild(el);
  })
);

// subscription: 订阅器-主要用于订阅Observable
const subscription = app.subscribe(e => {
  console.log(e);
});

const dataSource = of(1, 2, 3, 4, 5);
const subscription2 = dataSource
  .pipe(map(val => val + 1))
  .subscribe(val => console.log("val: " + val));
