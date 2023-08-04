import { IElectives, ISelectionData } from "./elective-alloter-refactored";
const seatDistributorRefactored = (
  data: ISelectionData[],
  initializer: number = 0
) => {
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
      electiveKeys[key][subject] =
        Math.ceil(
          (electiveKeys[key][subject] / electiveMaxSeats[key]) *
            maxStudentCount[key]
        ) + initializer;
      if (key === "OPEN_ELECTIVE") {
        electiveKeys[key][subject] =
          Math.ceil(
            Math.min(
              Math.max(electiveKeys[key][subject], 195 * 0.15),
              200 * 0.15
            )
          ) + initializer;
      }
      if (subject === "Distributed System") {
        electiveKeys[key][subject] =
          Math.ceil(
            Math.min(Math.max(electiveKeys[key][subject], 195 * 0.2), 195 * 0.2)
          ) + initializer;
      }
      if (subject === "Fundamental of Remote Sensing and GIS") {
        electiveKeys[key][subject] = 10;
      }
    }
  }
  console.log(electiveKeys);
  return electiveKeys;
};

export default seatDistributorRefactored;
