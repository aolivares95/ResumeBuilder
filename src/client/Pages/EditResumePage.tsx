import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { context } from "../../App";
import { getSnapshot } from "mobx-state-tree";
import Resume from "../Models/Resume";
import axios from "axios";

let style = {
  padding: "10px",
  marginTop: "35px"
};

let buttonStyle = {
  padding: "20px"
};

//add more fields for things to match real resume
//add styles
//add backend
//add tests

function EditResumePage() {
  const store = React.useContext(context);
  function handleInput(event: any) {
    const target = event.target;
    const name = target.name;

    if (name === "enterName") {
      store.getResume(store.selectedResume).addName(target.value);
    } else if (name === "enterNumber") {
      store.getResume(store.selectedResume).addPhoneNumber(target.value);
    } else {
      store.getResume(store.selectedResume).addEducation(target.value);
    }
  }

  function displayInput() {
    let items;
    if (store.getResume(store.selectedResume)) {
      items = store
        .getResume(store.selectedResume)
        .educationArray.map((item: string) => (
          <li style={{ listStyleType: "none" }}>{item}</li>
        ));
    } else {
      items = <li></li>;
    }

    if (store.getResume(store.selectedResume)) {
      return (
        <>
          <ul>
            <h1>Your name:</h1>
            <label>{store.getResume(store.selectedResume).name}</label>
            <h1>Your number:</h1>
            <label>{store.getResume(store.selectedResume).phoneNumber}</label>
            <h1>Your education: </h1>
            {items}
          </ul>
        </>
      );
    } else {
      return <p>empty</p>;
    }
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    store.setIsSubmitted(!store.isSubmitted);
  }
  function handleAddEducation(event: any) {
    event.preventDefault();
    if (store.getResume(store.selectedResume).education !== "") {
      store.getResume(store.selectedResume).saveEducation();
    }
    store.getResume(store.selectedResume).addEducation(event.target.value);
    store.setIsEducationSubmitted(!store.isEducationSubmitted);
  }

  function handleClearResume(event: any) {
    event.preventDefault();
    store.getResume(store.selectedResume).clearResume();
  }

  function saveResume() {
    const resSnap = getSnapshot(store.getResume(store.selectedResume));
    axios.post("http://localhost:5000/api/addResume", { resSnap });
  }

  let items;
  if (store.getResume(store.selectedResume)) {
    items = store
      .getResume(store.selectedResume)
      .educationArray.map((item: string) => <li>{item}</li>);
  } else {
    items = <li></li>;
  }
  return !store.isSubmitted ? (
    <>
      <form
        style={{ display: "grid", justifyItems: "center", minHeight: "50vh" }}
      >
        <label style={style}>Please enter your name</label>
        <input
          id="name-input"
          onChange={handleInput}
          name="enterName"
          type="text"
        />
        <label style={style}>Please enter your phone number</label>

        <input
          id="number-input"
          name="enterNumber"
          type="text"
          onChange={handleInput}
        />
        <label style={style}>Please enter your education history</label>

        {!store.isEducationSubmitted ? (
          <input
            id="edu-input"
            name="enterEducation"
            type="text"
            onChange={handleInput}
          />
        ) : (
          <ul id="view-education">{items}</ul>
        )}

        <button
          id="submit-education"
          onClick={handleAddEducation}
          style={{ marginTop: "30px" }}
        >
          Add/view education
        </button>
        <div style={buttonStyle}>
          <button id="preview-button" type="submit" onClick={handleSubmit}>
            Preview resume
          </button>
          <button onClick={saveResume}>Save Resume</button>
          <Link to="/">
            <button>Go back</button>
          </Link>
        </div>
      </form>
    </>
  ) : (
    <div style={{ display: "grid", justifyContent: "center" }}>
      <p id="user-input">{displayInput()}</p>
      <button id="go-back" onClick={handleSubmit}>
        Go back
      </button>
      <button id="clear-resume" onClick={handleClearResume}>
        Clear resume
      </button>
    </div>
  );
}

export default observer(EditResumePage);
