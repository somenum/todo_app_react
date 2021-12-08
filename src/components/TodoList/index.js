import React, { useState, useEffect } from "react";
import TodoForm from "../TodoForm";
import Todo from "../Todo";
import Header from "../Header";
import css from "./TodoList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {
  const stored = localStorage.getItem("myList");
  const initial = stored ? JSON.parse(stored) : [];
  const [todos, setTodos] = useState(initial);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(todos));
  }, [todos]);

  //поиск
  const [filtered, setFiltered] = useState([]);

  useEffect(
    (_) => {
      setFiltered(todos);
    },
    [todos]
  );

  const search = (val) => {
    let currentTodos = [],
      newList = [];
    if (val !== "") {
      currentTodos = todos;
      //фильтруем стейт в поисках совпадений
      newList = currentTodos.filter((todo) => {
        // значение которое пользователь ввел и которое у нас
        // в стейте делаем строчными буквами
        const lc = todo.text.toLowerCase();
        const filter = val.toLowerCase();
        // проверяем есть ли у нас этот элемент если есть возвращаем его
        return lc.includes(filter);
      });
    } else {
      // если в input ничего нету то есть пользователь стер то
      // что ввел тогда возвращаем все задачи
      newList = todos;
    }
    setFiltered(newList);
  };
  //работа с задачами

  //добавление
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  //редактирование
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  //удаление
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  //проверка завершена задача или нет
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //проверка отмечена как приоритетная или нет
  const priorityTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isPriority = !todo.isPriority;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  //отметить все как сделанные
  const isAllTodosChecked = todos.every((todo) => todo.isComplete);

  const checkAllTodos = () => {
    [...todos].forEach((todo) => {
      if (!todo.isComplete) {
        todo.isComplete = !isAllTodosChecked;
      }
    });

    setTodos([...todos]);
  };

  return (
    <div>
      <Header {...{ search }} />
      <TodoForm onSubmit={addTodo} />
      <TransitionGroup component="ul" className={css.todosContainer}>
        {filtered.map((todos) => (
          <CSSTransition
            key={todos.id}
            classNames={{
              enterActive: css.todoEnterActive,
              exitActive: css.todoExitActive,
            }}
            timeout={500}
          >
            <Todo
              todo={todos}
              priorityTodo={priorityTodo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className={css.checkAll}>
        <input
          id="checkAll"
          type="checkbox"
          checked={isAllTodosChecked}
          onChange={checkAllTodos}
        />
        <label htmlFor="checkAll"> Все задачи выполнены</label>
      </div>
    </div>
  );
}

export default TodoList;
