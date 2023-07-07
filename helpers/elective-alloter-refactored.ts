import seatDistributorRefactored from "./seat-distributor-refactored";

export interface ISubjectData {
  CODE: string;
  TITLE: string;
}

interface IOptionsData {
  [key: string]: ISubjectData;
}

export interface IElectives {
  [key: string]: IOptionsData;
}

export interface ISelectionData {
  NAME: string;
  REGNO: number;
  CGPA: number;
  ELECTIVE_SELECTIONS: IElectives;
}

export interface IElectiveData {
  REGNO: number;
  CGPA: number;
  NAME: string;
  [key: string]: ISubjectData | number | string;
}
/**
 *Takes an array of @type ISelectionData that is sorted in the descending order based on CGPA and returns an array of @type IElectiveData that contains the elective subjects allocated to a student.
 */
const allocateSubjects = (data: ISelectionData[]): IElectiveData[] => {
  let result: IElectiveData[] = [];
  let seats = seatDistributorRefactored(data, 5);
  console.log(seats);
  /*
   * Worst case will be N * c * k, where N is total number of students in the selection data, c is the number of elective categories and k is the number of options.
   *
   **/
  for (let student of data) {
    const object: IElectiveData = {
      REGNO: student.REGNO,
      CGPA: student.CGPA,
      NAME: student.NAME,
    };
    for (let key in student["ELECTIVE_SELECTIONS"]) {
      for (let option in student["ELECTIVE_SELECTIONS"][key]) {
        const subject = student["ELECTIVE_SELECTIONS"][key][option].TITLE;
        if (seats[key][subject] > 0) {
          object[key] = {
            TITLE: subject,
            CODE: student["ELECTIVE_SELECTIONS"][key][option].CODE,
          };
          seats[key][subject]--;
          break;
        }
      }
    }
    result.push(object);
  }
  return result;
};

export default allocateSubjects;
