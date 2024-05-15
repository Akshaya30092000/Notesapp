import "./App.css";
import Header from "./components/Header";
import Note from "./components/Note";
import UserInput from "./components/Userinput";

import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [isValid, setIsValid] = useState({
    title: false,
    content: false,
  });
  const [data, setData] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    Axios.get("http://localhost:3000/read").then((response) => {
     
      setData(response.data);
    });
  }, [data]);

  function handleChange(event) {
    const { name, value } = event.target;
    if (value.length > 0) {
      setIsValid((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    } else {
      setIsValid((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleClick() {
    Axios.post("http://localhost:3000/insert", {
      title: note.title,
      content: note.content,
    }).then(() => {
      console.log("successfully inserted");
      setIsValid({
        title: false,
        content: false,
      });
      setNote({
        title: "",
        content: "",
      });
    });
  }

  return (
    <>
      <Header />
      <UserInput
        note={Note}
        onChanged={handleChange}
        onClicked={handleClick}
        isValid={isValid}
      />
      <div className="note-container-flex">
      {data.map((element, index) => 
          <Note
            key={index}
            title={element.title}
            content={element.content}
            onSetNote={setNote}
          />
       )}
      </div>
    </>
  );
}

export default App;
