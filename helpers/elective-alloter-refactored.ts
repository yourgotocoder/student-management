import seatDistributorRefactored from "./seat-distributor-refactored";

interface ISubjectData {
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
  REGNO: number;
  CGPA: number;
  ELECTIVE_SELECTIONS: IElectives;
}

export interface IElectiveData {
  REGNO: number;
  CGPA: number;
  elective_1?: ISubjectData;
  elective_2?: ISubjectData;
  elective_3?: ISubjectData;
  elective_4?: ISubjectData;
  elective_5?: ISubjectData;
  elective_6?: ISubjectData;
  elective_7?: ISubjectData;
  elective_8?: ISubjectData;
}
/**
 *Takes an array of @type ISelectionData that is sorted in the descending order based on CGPA and returns an array of @type IElectiveData that contains the elective subjects allocated to a student.
 */
const allocateSubjects = (data: ISelectionData[]): IElectiveData[] => {
  const result: IElectiveData[] = [];
  const seats = seatDistributorRefactored(data);
  return result;
};

export default allocateSubjects;
