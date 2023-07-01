import { IElectives, ISelectionData } from "./elective-alloter-refactored";
const seatDistributorRefactored = (data: ISelectionData[]) => {
  const selections: { ELECTIVE_SELECTIONS: IElectives }[] = data.map(
    (student) => ({
      ELECTIVE_SELECTIONS: student.ELECTIVE_SELECTIONS,
    })
  );
  const electiveKeys: {
    [key: string]: {
      [key: string]: number;
    };
  } = {};
  // Initializing the the keys for the electives in the elective selection data, i.e ELECTIVE_1 or ELECTIVE_2,....etc
  for (let selectionData of selections) {
    for (let key in selectionData.ELECTIVE_SELECTIONS) {
      if (!electiveKeys[key]) electiveKeys[key] = {};
    }
  }

  const electiveMaxSeats: { [key: string]: number } = {};
  for (let key in electiveKeys) {
    electiveMaxSeats[key] = 0;
  }

  for (let selectionData of selections) {
    for (let key in electiveKeys) {
      for (let option in selectionData.ELECTIVE_SELECTIONS[key]) {
        const subject = selectionData.ELECTIVE_SELECTIONS[key][option].TITLE;
        if (!electiveKeys[key][subject]) {
          electiveKeys[key][subject] = 1;
        } else {
          electiveKeys[key][subject]++;
        }
        electiveMaxSeats[key]++;
      }
    }
  }
  let maxStudentCount: { [key: string]: number } = {};
  for (let key in electiveKeys) {
    for (let subject in electiveKeys[key]) {
      if (!maxStudentCount[key]) maxStudentCount[key] = 0;
      maxStudentCount[key] = Math.max(
        maxStudentCount[key],
        electiveKeys[key][subject]
      );
    }
  }
  for (let key in electiveKeys) {
    for (let subject in electiveKeys[key]) {
      electiveKeys[key][subject] = Math.ceil(
        (electiveKeys[key][subject] / electiveMaxSeats[key]) *
        maxStudentCount[key]
      );
    }
  }

  return electiveKeys;
};

export default seatDistributorRefactored;
