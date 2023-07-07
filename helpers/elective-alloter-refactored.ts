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
const allocateSubjects = (
  data: ISelectionData[],
  sem: number
): IElectiveData[] => {
  let result: IElectiveData[] = [];
  const seats = seatDistributorRefactored(data);
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

  let seatInitialzer = 1;
  switch (sem) {
    case 5:
      while (
        result.some((student) => !student.ELECTIVE_3) ||
        result.some((student) => !student.ELECTIVE_4)
      ) {
        result = [];
        let seats_5 = seatDistributorRefactored(data, seatInitialzer);
        for (let student of data) {
          const object: IElectiveData = {
            REGNO: student.REGNO,
            CGPA: student.CGPA,
            NAME: student.NAME,
          };
          for (let key in student["ELECTIVE_SELECTIONS"]) {
            for (let option in student["ELECTIVE_SELECTIONS"][key]) {
              const subject = student["ELECTIVE_SELECTIONS"][key][option].TITLE;
              if (seats_5[key][subject] > 0) {
                object[key] = {
                  TITLE: subject,
                  CODE: student["ELECTIVE_SELECTIONS"][key][option].CODE,
                };
                seats_5[key][subject]--;
                break;
              }
            }
          }
          result.push(object);
        }
        seatInitialzer++;
      }
      break;
    case 7:
      while (
        result.some((student) => !student.ELECTIVE_8) ||
        result.some((student) => !student.ELECTIVE_7)
      ) {
        result = [];
        let seats_7 = seatDistributorRefactored(data, seatInitialzer);
        for (let student of data) {
          const object: IElectiveData = {
            REGNO: student.REGNO,
            CGPA: student.CGPA,
            NAME: student.NAME,
          };
          for (let key in student["ELECTIVE_SELECTIONS"]) {
            for (let option in student["ELECTIVE_SELECTIONS"][key]) {
              const subject = student["ELECTIVE_SELECTIONS"][key][option].TITLE;
              if (seats_7[key][subject] > 0) {
                object[key] = {
                  TITLE: subject,
                  CODE: student["ELECTIVE_SELECTIONS"][key][option].CODE,
                };
                seats_7[key][subject]--;
                break;
              }
            }
          }
          result.push(object);
        }
        seatInitialzer++;
      }
      break;
  }
  /*
   * Worst case will be N * c * k, where N is total number of students in the selection data, c is the number of elective categories and k is the number of options.
   *
   **/

  return result;
};

export default allocateSubjects;
