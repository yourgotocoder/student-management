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

export interface IElectiveRankData {
  [key: string]: {
    [key: string]: number;
  };
}
/**
 *Takes an array of @type ISelectionData that is sorted in the descending order based on CGPA and returns an array of @type IElectiveData that contains the elective subjects allocated to a student.
 */
const rankElectives = (data: ISelectionData[]): IElectiveRankData => {
  /**
   * result will be an object that has the elective category, i.e Elective_1 or Elective_2, bla bla. And each elective category will rank the subject based
   * on the percentage of some value, bla bla
   */
  const result: IElectiveRankData = {};
  for (let student of data) {
    for (let key in student.ELECTIVE_SELECTIONS) {
      // Setup elective categories
      if (!result[key]) {
        result[key] = {};
      }
      let points = Object.keys(student.ELECTIVE_SELECTIONS[key]).length;
      for (let option in student.ELECTIVE_SELECTIONS[key]) {
        const title = student.ELECTIVE_SELECTIONS[key][option].TITLE;
        if (!result[key][title]) {
          result[key][title] = 0;
          result[key][title] += points;
        } else {
          result[key][title] += points;
        }
        points--;
      }
    }
  }
  for (let electiveCategory in result) {
    let electiveTotal = 0;
    for (let subject in result[electiveCategory]) {
      electiveTotal += result[electiveCategory][subject];
    }
    for (let subject in result[electiveCategory]) {
      result[electiveCategory][subject] = +(
        result[electiveCategory][subject] / electiveTotal
      ).toFixed(2);
    }
  }
  return result;
};

export default rankElectives;
