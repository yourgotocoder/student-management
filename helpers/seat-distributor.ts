import Student from "../models/student.model";

const seatDistributor = (data: Student[]) => {
  const _4thSemData = data
    .filter(
      (student) => student.CURRENT_SEM === 4 && student.ELECTIVE_SELECTIONS
    )
    .map((student) => ({
      ELECTIVE_2: student.ELECTIVE_SELECTIONS?.ELECTIVE_2,
    }));
  const _6thSemData = data
    .filter(
      (student) => student.CURRENT_SEM === 6 && student.ELECTIVE_SELECTIONS
    )
    .map((student) => ({
      REGNO: student.REGNO,
      ELECTIVE_4: student.ELECTIVE_SELECTIONS?.ELECTIVE_4,
      ELECTIVE_5: student.ELECTIVE_SELECTIONS?.ELECTIVE_5,
    }));

  const subjectsSelectionCount = _6thSemData.reduce(
    (subjectsCount: any, currentOption) => {
      for (let key in currentOption.ELECTIVE_4) {
        const subjectTitle = currentOption.ELECTIVE_4[`${key}`].TITLE;
        const subjectCode = currentOption.ELECTIVE_4[`${key}`].CODE;
        const subjectName = `${subjectCode} ${subjectTitle}`;
        if (!subjectsCount.elective_4[subjectName]) {
          subjectsCount.elective_4[subjectName] = 1;
        } else if (subjectsCount.elective_4[subjectName]) {
          subjectsCount.elective_4[subjectName] += 1;
        }
      }

      for (let key in currentOption.ELECTIVE_5) {
        const subjectTitle = currentOption.ELECTIVE_5[`${key}`].TITLE;
        const subjectCode = currentOption.ELECTIVE_5[`${key}`].CODE;
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
        _6thSemData.length
    );
  }

  for (let key in subjectsSelectionCount.elective_5) {
    elective_5_total_submission += subjectsSelectionCount.elective_5[key];
  }

  for (let key in subjectsSelectionCount.elective_5) {
    elective_5_seats[key] = Math.ceil(
      (subjectsSelectionCount.elective_5[key] / elective_5_total_submission) *
        _6thSemData.length
    );
  }

  console.log(elective_4_total_submission, elective_5_total_submission);

  const seats_4th_sem = Math.ceil(_4thSemData.length / 4);
  return {
    _4thSemSeats: seats_4th_sem,
    _6thSemData: { elective_4_seats, elective_5_seats },
  };
};

export default seatDistributor;
