import React, { useState, useEffect } from 'react';
import { Movie } from '../store';

interface CreateFormProps {
  onSave: (movie: Movie) => void;
  onCancel: () => void;
}

export default function CreateForm({ onSave, onCancel }: CreateFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(2020);
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [screenwriter, setScreenwriter] = useState('');
  const [image, setImage] = useState('');
  const [saveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {
    setSaveDisabled(title.length === 0);
  }, [title]);

  const getBase64Data = (file: File) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      if (!reader.result) return;
      setImage(btoa(reader.result as string));
    };
  };

  const saveMovie = () => {
    onSave({
      id: 0,
      title,
      description,
      year,
      director,
      producer,
      screenwriter,
      image,
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveMovie();
      }}
    >
      <h3>Add a new movie</h3>

      <img
        style={{ width: '100%' }}
        src={`data:image/png;base64,${image}`}
        alt=""
      />

      <div>
        <label>Title*</label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={({ target }) => {
            setDescription(target.value);
          }}
        />
      </div>

      <div>
        <label>Year*</label>
        <input
          type="number"
          value={year}
          onChange={({ target }) => {
            setYear(Number.parseInt(target.value));
          }}
        />
      </div>

      <div>
        <label>Director</label>
        <input
          type="text"
          value={director}
          onChange={({ target }) => {
            setDirector(target.value);
          }}
        />
      </div>

      <div>
        <label>Producer</label>
        <input
          type="text"
          value={producer}
          onChange={({ target }) => {
            setProducer(target.value);
          }}
        />
      </div>

      <div>
        <label>Screenwriter</label>
        <input
          type="text"
          value={screenwriter}
          onChange={({ target }) => {
            setScreenwriter(target.value);
          }}
        />
      </div>

      <div>
        <label>Poster</label>
        <input
          type="file"
          accept="image/*"
          onChange={({ target }) => {
            if (!target.files || target.files.length === 0) return;
            getBase64Data(target.files[0]);
          }}
        />
      </div>

      <div>
        <input
          className="primary"
          type="submit"
          value="Save"
          disabled={saveDisabled}
        />
        <input type="submit" value="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
}
