import { types, getSnapshot, applySnapshot } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { observable, flow } from "mobx";
import { EducationStore } from "./EducationStore";
import * as UUID from "uuid";
import axios from "axios";

export const ResumeStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    id: 0,
    isSubmitted: false,
    isEducationSubmitted: false,
    selectedResume: types.maybe(types.reference(Resume)),
    resumeMap: types.map(types.reference(Resume))
    //EducationStore: types.model("EducationStore")
  })
  .actions(self => {
    return {
      fetchResumes: flow(function* fetchResumes() {
        let temp: any[] = [];
        yield fetch("http://localhost:5000/resume")
          .then(result => result.json())
          .then(data => {
            data.map((item: any) => temp.push(item));
          });
        console.log("Fetched resumes:" + JSON.stringify(temp));
        return temp;
      }),
      add(newRes: IResume) {
        self.resumes.push(newRes);
        self.resumeMap.put(newRes);

        console.log("Resume map:%%%$%$%%$% " + JSON.stringify(self.resumeMap));
      },
      fetchRes() {
        self.resumes.clear();
        self.resumeMap.clear();
        this.fetchResumes().then(data => {
          applySnapshot(self.resumes, data);
        });
        console.log("Resume map:%%%$%$%%$% " + JSON.stringify(self.resumes));
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
        // self.id++;
        return current;
      },

      getResume(uuid: string) {
        return self.resumeMap.get(uuid);
      },
      setIsSubmitted(newIsSubmitted: boolean) {
        self.isSubmitted = newIsSubmitted;
      },
      setIsEducationSubmitted(newIsEducationSubmitted: boolean) {
        self.isEducationSubmitted = newIsEducationSubmitted;
      },
      setSelectedResume(sel: IResume) {
        console.log("Selected resume$$$$$: " + JSON.stringify(sel));
        self.selectedResume = sel;
      }
    };
  });
const rootStore = ResumeStore.create();

export default observable(rootStore);
