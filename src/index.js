import { fromEvent, of, merge } from "rxjs";
import { map, filter, tap, mergeMap, mapTo } from "rxjs/operators";
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
// merge有两种引入方式：一、从rxjs中引入-表示作为静态方法使用；二、从rxjs/operators中引入-表示作为实例方法使用；具体可查看文档使用方法
const observableAdd = merge(observableEnter, observableBtn);
console.log(observableAdd);

// app 也是一个Observable
const app = observableAdd.pipe(
  map(() => $input.value), // 获取输入的值
  filter(r => r !== ""), // 过滤空值
  map(createTodoItem), // 使用输入的值生成一个结点
  // tap: tap主要用于数据流存在副作用的操作
  tap(el => {
    // 将结点添加到list中，注意：
    $list.appendChild(el);
    $input.value = "";
  }),
  // 遍历每个新添加的todo标签，
  // 并为其添加click事件，然后通过mapTo将传入的todo原样输出
  mergeMap(el => {
    return fromEvent(el, "click").pipe(
      // 表示只有点击todo文字，才处理点击操作
      filter(e => e.target === el),
      mapTo(el)
    );
  }),
  tap(el => {
    if (el.classList.contains("done")) {
      el.classList.remove("done");
    } else {
      el.classList.add("done");
    }
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
