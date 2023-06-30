import { IElectives, ISelectionData } from "./elective-alloter-refactored";
const seatDistributorRefactored = (data: ISelectionData[]) => {
  const selections: { ELECTIVE_SELECTIONS: IElectives }[] = data.map(
    (student) => ({
      ELECTIVE_SELECTIONS: student.ELECTIVE_SELECTIONS,
    })
  );
  const electiveKeys: { [key: string]: any } = {};
  for (let selectionData of selections) {
    for (let key in selectionData.ELECTIVE_SELECTIONS) {
      if (!electiveKeys[key]) electiveKeys[key] = {};
    }
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
      }
    }
  }
  console.log(electiveKeys);
};

export default seatDistributorRefactored;
