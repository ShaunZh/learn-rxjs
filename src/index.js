import { fromEvent } from "rxjs";

const $input = document.querySelector(".todo-val");

//Observable: 可观察的
const observable = fromEvent($input, "input");

// subscription: 订阅器
const subscription = observable.subscribe(e => {
  console.log(e);
});
