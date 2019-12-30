export const createTodoItem = val => {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  const innerHtml = `
  ${val}
  <button type="button" class="btn btn-default button-remove" aria-label="right Align">
    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
  </button>`;
  li.innerHTML = innerHtml;
  return li;
};
