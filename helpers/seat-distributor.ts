import Student from "../models/student.model";

const seatDistributor = (data: Student[]) => {
  const _5thSemData = data
    .filter(
      (student) =>
        student.CURRENT_SEM === 5 &&
        student.ELECTIVE_SELECTIONS &&
        student.ELECTIVE_SELECTIONS.ELECTIVE_3
    )
    .map((student) => ({
      REGNO: student.REGNO,
      ELECTIVE_3: student.ELECTIVE_SELECTIONS?.ELECTIVE_3,
      ELECTIVE_4: student.ELECTIVE_SELECTIONS?.ELECTIVE_4,
    }));
  const _7thSemData = data
    .filter(
      (student) =>
        student.CURRENT_SEM === 6 &&
        student.ELECTIVE_SELECTIONS &&
        student.ELECTIVE_SELECTIONS.ELECTIVE_7
    )
    .map((student) => ({
      REGNO: student.REGNO,
      ELECTIVE_7: student.ELECTIVE_SELECTIONS?.ELECTIVE_7,
      ELECTIVE_8: student.ELECTIVE_SELECTIONS?.ELECTIVE_8,
    }));

  const subjectsSelectionCount = _7thSemData.reduce(
    (subjectsCount: any, currentOption) => {
      for (let key in currentOption.ELECTIVE_7) {
        const subjectTitle = currentOption.ELECTIVE_7[`${key}`].TITLE;
        const subjectCode = currentOption.ELECTIVE_7[`${key}`].CODE;
        const subjectName = `${subjectCode} ${subjectTitle}`;
        if (!subjectsCount.elective_4[subjectName]) {
          subjectsCount.elective_4[subjectName] = 1;
        } else if (subjectsCount.elective_4[subjectName]) {
          subjectsCount.elective_4[subjectName] += 1;
        }
      }

      for (let key in currentOption.ELECTIVE_8) {
        const subjectTitle = currentOption.ELECTIVE_8[`${key}`].TITLE;
        const subjectCode = currentOption.ELECTIVE_8[`${key}`].CODE;
        const subjectName = `${subjectCode} ${subjectTitle}`;
        if (!subjectsCount.elective_5[subjectName]) {
          subjectsCount.elective_5[subjectName] = 1;
        } else if (subjectsCount.elective_5[subjectName]) {
          subjectsCount.elective_5[subjectName]++;
        }
      }

      return subjectsCount;
    },
    {
      elective_4: {},
      elective_5: {},
    }
  );

  let elective_4_total_submission = 0;
  let elective_5_total_submission = 0;

  for (let key in subjectsSelectionCount.elective_4) {
    elective_4_total_submission += subjectsSelectionCount.elective_4[key];
  }

  const elective_4_seats: any = {};
  const elective_5_seats: any = {};

  for (let key in subjectsSelectionCount.elective_4) {
    elective_4_seats[key] = Math.ceil(
      (subjectsSelectionCount.elective_4[key] / elective_4_total_submission) *
      _7thSemData.length
    );
  }

  for (let key in subjectsSelectionCount.elective_5) {
    elective_5_total_submission += subjectsSelectionCount.elective_5[key];
  }

  for (let key in subjectsSelectionCount.elective_5) {
    elective_5_seats[key] = Math.ceil(
      (subjectsSelectionCount.elective_5[key] / elective_5_total_submission) *
      _7thSemData.length
    );
  }

  const seats_4th_sem = Math.ceil(_5thSemData.length / 4);
  return {
    _4thSemSeats: seats_4th_sem,
    _6thSemData: { elective_4_seats, elective_5_seats },
  };
};

export default seatDistributor;
