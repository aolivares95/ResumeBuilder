import { types, getSnapshot, applySnapshot, Instance } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { flow } from "mobx";
import * as UUID from "uuid";
import axios from "axios";

export const ResumeStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    selectedResume: types.maybe(types.reference(Resume)),
    resumeMap: types.optional(types.map(types.reference(Resume)), {}),
  })
  .actions((self) => {
    const addToMap = (array: IResume[]) => {
      self.resumeMap.clear();
      array.forEach((item) => {
        self.resumeMap.put(item);
      });
    };
    return { addToMap };
  })
  .actions((self) => {
    const fetchResumes = flow(function* fetchResumes() {
      yield fetch("http://localhost:5000/resume")
        .then((result) => result.json())
        .then((data) => {
          applySnapshot(self.resumes, data);
        });
      self.addToMap(self.resumes);
      return self.resumes;
    });

    function saveResume(currentRes: IResume) {
      const resSnap = getSnapshot(currentRes);
      axios
        .post("http://localhost:5000/addResume", resSnap)
        .catch(() => console.log("Post failed..."));
    }

    function updateResume(currentRes: IResume) {
      const resSnap = getSnapshot(currentRes);
      axios
        .post("http://localhost:5000/updateResume", resSnap)
        .catch(() => console.log("Post failed..."));
    }

    function addResume(newResume: string) {
      let current = Resume.create({ uuid: UUID.v4() });
      current.addName(newResume);
      self.resumeMap.put(current);
      self.resumes.push(current);
      saveResume(current);
      return current;
    }

    function getResume(uuid: string) {
      return self.resumeMap.get(uuid);
    }
    function itemsInResume() {
      if (self.resumes.length > 0) {
        return true;
      } else return false;
    }
    const setSelectedResume = (sel: string) => {
      self.selectedResume = self.resumeMap.get(sel);
    };
    return {
      setSelectedResume,
      saveResume,
      updateResume,
      addResume,
      getResume,
      itemsInResume,
      fetchResumes,
    };
  });
export type IResumeStore = Instance<typeof ResumeStore>;
