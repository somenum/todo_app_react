import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import css from "./TodoForm.module.css";
// import classNames from 'classnames';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  // const inputRef = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };
  return (
    <form className={css.todoForm} onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Измените задачу"
            value={input}
            name="text"
            className={css.todoInput}
            onChange={handleChange}
            maxLength="50"
          />
          <button className={css.todoBtn}>Изменить задачу</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Описание моей новой задачи"
            value={input}
            name="text"
            className={css.todoInput}
            onChange={handleChange}
            maxLength="50"
          />
          <button className={css.todoBtn}>
            <AiOutlinePlus />
            Добавить задачу
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
