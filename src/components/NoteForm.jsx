import { useState } from "react";
import db from "../appwrite/databases";
import { BarLoader } from "react-spinners";

const NoteForm = ({ setNotes }) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    const noteBody = e.target.body.value;
    e.target.reset();
    if (noteBody === "") return;
    setLoading(true);
    try {
      const payload = {
        body: noteBody,
      };

      const response = await db.notes.create(payload);
      setNotes((prevState) => [response, ...prevState]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleAdd} id="todo-form">
      {loading && <BarLoader />}
      <input name="body" type="text" placeholder="🤔 What's on the agenda?" />
      <button type="submit">crear</button>
    </form>
  );
};

export default NoteForm;
