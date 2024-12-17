import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { action, makeObservable, observable } from 'mobx'
import { Button, Input, List, Space } from 'antd';


class ToDoItem {
  id = Math.random();
   name: string  = '';

   isCompleted: boolean = false;
  constructor(name: string) {
    this.name = name;
    makeObservable(this, {
      name: observable,
      isCompleted: observable,
      onToggle: action
    })
  }

  onToggle = () => {

    this.isCompleted = !this.isCompleted;
  }


}


class ToDoList {
  list: ToDoItem[] = [];
  constructor() {
    makeObservable(this, {
      list: observable,
      onAdd: action,
      onDelete: action
    })
  }

  onAdd = (name: string) => {
    console.log('name', name)
    this.list.push(new ToDoItem(name));
  }

  onDelete = (id: number) => {
    this.list = this.list.filter(item => item.id !== id)
  }
}

const todoList = new ToDoList();
const TodoListView = observer(() => {
  const [title, setTitle] = useState('');
  console.log('todoList', todoList.list)
  const handleToggleCompleted = (todo: ToDoItem) => {
    todo.onToggle();
  }

  const handleRemoveTodo = (todo: ToDoItem) => {

    todoList.onDelete(todo.id)
  }
  return (<>
    <Space >
      <Input onChange={e => { setTitle(e.target.value) }} value={title} />
      <Button onClick={() => { 
        todoList.onAdd(title);
        setTitle('');
       }}>add</Button>
    </Space>
    <ul>
        {todoList.list.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggleCompleted(todo)}
            />
            <span style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
              {todo.name}
            </span>
            <button onClick={() => handleRemoveTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
  </>)
})



export default TodoListView;