import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { IEducation } from "../Models/Education";
import { Context } from "../../Context";

let style = {
  padding: "10px",
  marginTop: "35px",
};

let buttonStyle = {
  padding: "20px",
};

const EditResumePage = () => {
  const {
    resumeStore,
    educationStore,
    isEducationSubmitted,
    setIsEducationSubmitted,
    setIsSubmitted,
    isSubmitted,
  } = React.useContext(Context);

  const currentRes = resumeStore.selectedResume!;

  function handleInput(event: any) {
    const target = event.target;
    const name = target.name;

    if (name === "enterName") {
      currentRes.addName(target.value);
    } else if (name === "enterNumber") {
      currentRes.addPhoneNumber(target.value);
    } else {
      educationStore.setCurrentEdu(target.value);
    }
  }

  function displayInput() {
    let items;
    if (currentRes) {
      items = educationStore
        .getEducationbyResId(currentRes.id!)
        .map((item: IEducation) => (
          <li key={item.uuid} id={item.uuid} style={{ listStyleType: "none" }}>
            {item.degree}
          </li>
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
  const resetSelected = () => {
    resumeStore.setSelectedResume("");
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    setIsSubmitted(!isSubmitted);
  }
  function handleAddEducation(event: any) {
    event.preventDefault();
    if (isEducationSubmitted === false) {
      resumeStore.selectedResume!.addEducation(
        educationStore.addEducation(
          resumeStore.selectedResume!.id!,
          resumeStore.selectedResume!.uuid!,
          educationStore.currentEdu
        )
      );
    }
    educationStore.setCurrentEdu("");
    setIsEducationSubmitted(!isEducationSubmitted);
  }

  function handleClearResume(event: any) {
    event.preventDefault();
    currentRes.clearResume();
  }

  function updateResume(event: any) {
    event.preventDefault();
    resumeStore.updateResume(currentRes);
  }

  let items;
  if (currentRes) {
    items = educationStore
      .getEducationbyResId(currentRes.id!)
      .map((item: IEducation) => (
        <li key={item.uuid} id={item.uuid}>
          {item.degree}
        </li>
      ));
  } else {
    items = <li></li>;
  }
  return !isSubmitted ? (
    <>
      <form
        style={{ display: "grid", justifyItems: "center", minHeight: "50vh" }}
      >
        <label style={style}>Please enter your name</label>
        <input
          id="name-input"
          onChange={handleInput}
          value={currentRes.name}
          name="enterName"
          type="text"
        />
        <label style={style}>Please enter your phone number</label>

        <input
          id="number-input"
          name="enterNumber"
          type="text"
          onChange={handleInput}
          value={currentRes.phoneNumber}
        />
        <label style={style}>Please enter your education history</label>

        {!isEducationSubmitted ? (
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
          <button onClick={updateResume}>Save Resume</button>
          <Link to="/">
            <button onClick={resetSelected}>Go back</button>
          </Link>
        </div>
      </form>
    </>
  ) : (
    <div style={{ display: "grid", justifyContent: "center" }}>
      {displayInput()}
      <button id="go-back" onClick={handleSubmit}>
        Go back
      </button>
      <button id="clear-resume" onClick={handleClearResume}>
        Clear resume
      </button>
    </div>
  );
};

export default observer(EditResumePage);
