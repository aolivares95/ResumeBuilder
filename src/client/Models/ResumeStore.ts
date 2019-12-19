import { types, getSnapshot, applySnapshot } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { observable, flow } from "mobx";
import * as UUID from "uuid";
import axios from "axios";

export const ResumeStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    id: types.maybe(types.number),
    isSubmitted: false,
    isEducationSubmitted: false,
    selectedResume: types.maybe(types.reference(Resume)),
    resumeMap: types.map(types.reference(Resume))
    //EducationStore: types.model("EducationStore")
  })
  .actions(self => {
    return {
      addToMap(array: IResume[]) {
        array.forEach(item => {
          self.resumeMap.put(item);
        });
      },
      fetchResumes: flow(function* fetchResumes() {
        yield fetch("http://localhost:5000/resume")
          .then(result => result.json())
          .then(data => {
            applySnapshot(self.resumes, data);
          });
        return self.resumes;
      }),
      add(newRes: IResume) {
        self.resumes.push(newRes);
        self.resumeMap.put(newRes);
      },

      saveResume(currentRes: IResume) {
        const resSnap = getSnapshot(currentRes);
        axios
          .post("http://localhost:5000/addResume", resSnap)
          .catch(() => console.log("Post failed..."));
      },

      addResume(newResume: string) {
        let current = Resume.create({ uuid: UUID.v4() });
        current.addName(newResume);
        this.add(current);
        this.saveResume(current);
        return current;
      },

      getResume(uuid: string) {
        return self.resumeMap.get(uuid);
      },
      itemsInResume() {
        if (self.resumes.length > 0) {
          return true;
        } else return false;
      },
      setIsSubmitted(newIsSubmitted: boolean) {
        self.isSubmitted = newIsSubmitted;
      },
      setIsEducationSubmitted(newIsEducationSubmitted: boolean) {
        self.isEducationSubmitted = newIsEducationSubmitted;
      },
      setSelectedResume(sel: IResume) {
        self.selectedResume = sel;
      }
    };
  });
const rootStore = ResumeStore.create();

export default observable(rootStore);
