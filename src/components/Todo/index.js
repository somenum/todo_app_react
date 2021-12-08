import React, { useState } from "react";
import TodoForm from "../TodoForm";
import css from "./Todo.module.css";
import classNamesBind from "classnames/bind";
import { GrClose } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const cx = classNamesBind.bind(css);

function Todo({ todo, priorityTodo, completeTodo, removeTodo, updateTodo }) {
  const className = cx({
    todoRow: true,
    complete: todo.isComplete,
    priority: todo.isPriority,
  });

  //режим редактирования

  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  //выход из режима редактирования по кнопке escape

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      return setEdit({
        id: null,
        value: "",
      });
    }
  });

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <li className={className}>
      <div
        onClick={() => completeTodo(todo.id)}
        className={css.checkboxContainer}
      >
        {todo.isComplete ? (
          <MdCheckBox className={css.checkbox} />
        ) : (
          <MdCheckBoxOutlineBlank className={css.checkbox} />
        )}
        {todo.text}
      </div>
      <div className={css.icons}>
        <span onClick={() => priorityTodo(todo.id)}>
          {!todo.isPriority ? (
            <BsStar />
          ) : (
            <BsFillStarFill className={css.fillStar} />
          )}
        </span>

        <FiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className={css.editIcon}
        />
        <GrClose onClick={() => removeTodo(todo.id)} />
      </div>
    </li>
  );
}

export default Todo;
