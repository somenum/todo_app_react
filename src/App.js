import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import css from "./App.module.css";
import DotLoader from "react-spinners/DotLoader";

function App() {
  //загрузчик
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={css.app}>
      {loading ? (
        <DotLoader
          color="rgba(0, 136, 255, 0.84)"
          loading={loading}
          size={50}
        />
      ) : (
        <>
          <TodoList />
        </>
      )}
    </div>
  );
}

export default App;
