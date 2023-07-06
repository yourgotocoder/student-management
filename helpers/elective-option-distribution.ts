import {
  IElectiveData,
  ISelectionData,
  ISubjectData,
} from "./elective-alloter-refactored";

/**
 * For example, it can look like:
 * {
 *  ELECTIVE_1: {
 *    OPTION_1: 20,
 *    OPTION_2: 20,
 *    OPTION_3: 20,
 *    OPTION_4: 20,
 *  }
 * }
 */
export interface IElectiveOptionDistribution {
  [key: string]: {
    [key: string]: number;
  };
}

const distributionStats = (
  selectionData: ISelectionData[],
  electiveData: IElectiveData[]
): IElectiveOptionDistribution => {
  const result: IElectiveOptionDistribution = {};
  for (let student of selectionData) {
    for (let key in student.ELECTIVE_SELECTIONS) {
      if (!result[key]) {
        result[key] = {};
      }
      for (let option in student.ELECTIVE_SELECTIONS[key]) {
        const studentElective = electiveData.find(
          (studentObj) => studentObj.REGNO === student.REGNO
        );
        if (studentElective) {
          setOptionValue(studentElective, student, key, option, "ELECTIVE_1");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_2");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_3");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_4");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_5");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_6");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_7");
          setOptionValue(studentElective, student, key, option, "ELECTIVE_8");
        }
      }
    }
  }
  return result;

  function setOptionValue(
    studentElective: IElectiveData,
    student: ISelectionData,
    key: string,
    option: string,
    elective_category: string
  ) {
    if (studentElective[elective_category]) {
      if (
        (studentElective[elective_category] as ISubjectData)["TITLE"] ===
        student.ELECTIVE_SELECTIONS[key][option]["TITLE"]
      ) {
        if (!result[key][option]) result[key][option] = 0;
        result[key][option]++;
      }
    }
  }
};

export default distributionStats;
