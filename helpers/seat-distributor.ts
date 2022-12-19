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
            console.log(subjectsCount)
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
          console.log(subjectsCount.elective_5[subjectName]);
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

  const seats_4th_sem = Math.ceil(_4thSemData.length / 4);
  return {
    _4thSemSeats: seats_4th_sem,
    _6thSemData: subjectsSelectionCount,
  };
};

export default seatDistributor;
