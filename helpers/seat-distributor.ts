import Student from "../models/student.model";

const seatDistributor = (data: Student[]) => {
  const _4thSemData = data.filter((student) => student.CURRENT_SEM === 4 && student.ELECTIVE_SELECTIONS).map(student => ({
    ELECTIVE_2: student.ELECTIVE_SELECTIONS?.ELECTIVE_2
  }));
  const _6thSemData = data.filter(student => student.CURRENT_SEM === 6 && student.ELECTIVE_SELECTIONS).map(student => ({
    ELECTIVE_4: student.ELECTIVE_SELECTIONS?.ELECTIVE_4,
    ELECTIVE_5: student.ELECTIVE_SELECTIONS?.ELECTIVE_5
  }));
  const seats_4th_sem = Math.ceil(_4thSemData.length / 4);
  return {
    _4thSemSeats: seats_4th_sem,
    _6thSemData
  }
};

export default seatDistributor;
