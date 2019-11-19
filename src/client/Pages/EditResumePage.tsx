import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { context } from "../../App";

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
  const currentRes = store.selectedResume!;

  function handleInput(event: any) {
    const target = event.target;
    const name = target.name;

    if (name === "enterName") {
      currentRes.addName(target.value);
    } else if (name === "enterNumber") {
      currentRes.addPhoneNumber(target.value);
    } else {
      currentRes.addEducation(target.value);
    }
  }

  function displayInput() {
    let items;
    if (currentRes) {
      items = currentRes.educationArray.map((item: string) => (
        <li style={{ listStyleType: "none" }}>{item}</li>
      ));
    } else {
      items = <li></li>;
    }

    if (currentRes) {
      return (
        <>
          <ul>
            <h1>Your name:</h1>
            <label>{currentRes.name}</label>
            <h1>Your number:</h1>
            <label>{currentRes.phoneNumber}</label>
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
    if (currentRes.education !== "") {
      currentRes.saveEducation();
    }
    currentRes.addEducation(event.target.value);
    store.setIsEducationSubmitted(!store.isEducationSubmitted);
  }

  function handleClearResume(event: any) {
    event.preventDefault();
    currentRes.clearResume();
  }

  function saveResume(event: any) {
    event.preventDefault();
    store.saveResume(currentRes);
  }

  let items;
  if (currentRes) {
    items = currentRes.educationArray.map((item: string) => <li>{item}</li>);
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