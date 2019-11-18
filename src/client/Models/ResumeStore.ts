import { types } from "mobx-state-tree";
import Resume, { IResume } from "./Resume";
import { observable, flow } from "mobx";
import { EducationStore } from "./EducationStore";
import * as UUID from "uuid";

export const ResumeStore = types
  .model("ResumeStore", {
    resumes: types.array(Resume),
    id: 0,
    isSubmitted: false,
    isEducationSubmitted: false,
    selectedResume: types.maybe(Resume),
    resumeMap: types.map(Resume)
    //EducationStore: types.model("EducationStore")
  })
  .actions(self => {
    return {
      fetchResumes: flow(function* fetchResumes() {
        let temp: IResume[] = [];
        yield fetch("http://localhost:5000/resume")
          .then(result => result.json())
          .then(data => {
            data.map((item: IResume) => temp.push(item));
          });
        console.log("Fetched resumes:" + JSON.stringify(temp));
        return temp;
      }),
      add(newRes: IResume) {
        self.resumeMap.put(newRes);
        self.resumes.push(newRes);
      },
      fetchRes() {
        self.resumes.clear();
        self.resumeMap.clear();
        this.fetchResumes().then(data => {
          data.forEach((item: IResume) => {
            this.add(item);
          });
        });
      },
      addResume(newResume: string) {
        let current = Resume.create({ id: self.id, uuid: UUID.v4() });
        current.addName(newResume);
        this.add(current);
        self.id++;
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
        self.selectedResume = sel;
      }
    };
  });
const rootStore = ResumeStore.create();

export default observable(rootStore);
