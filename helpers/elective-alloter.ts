import Student from "../models/student.model";

type Seats = {
  _4thSemSeats: number;
  _6thSemData: {
    elective_4_seats: any;
    elective_5_seats: any;
  };
};

const allotment = (seats: Seats, data: Student[]) => {
  const _4thSemSelectionData = [...data]
    .filter(
      (student) =>
        student.CGPA && student.ELECTIVE_SELECTIONS && student.ELECTIVE_SELECTIONS.ELECTIVE_1 && student.CURRENT_SEM === 4
    )
    .sort((a, b) => {
      if (b.CGPA && a.CGPA) return b.CGPA - a.CGPA;
      return 0;
    })
    .map((student) => ({
      REGNO: student.REGNO,
      NAME: student.NAME,
      CGPA: student.CGPA,
      ELECTIVE_SELECTION: student.ELECTIVE_SELECTIONS?.ELECTIVE_1,
    }));

  // const _6thSemSelectionData = [...data]
  //   .filter(
  //     (student) =>
  //       student.CGPA && student.ELECTIVE_SELECTIONS && student.CURRENT_SEM === 6
  //   )
  //   .sort((a, b) => {
  //     if (b.CGPA && a.CGPA) return b.CGPA - a.CGPA;
  //     return 0;
  //   })
  //   .map((student) => ({
  //     REGNO: student.REGNO,
  //     NAME: student.NAME,
  //     CGPA: student.CGPA,
  //     ELECTIVE_4_SELECTION: student.ELECTIVE_SELECTIONS?.ELECTIVE_4,
  //     ELECTIVE_5_SELECTION: student.ELECTIVE_SELECTIONS?.ELECTIVE_5,
  //   }));

  const _4thSemSeats: any = {
    "Microprocessors and Peripheral Devices": seats._4thSemSeats,
    " Enterprise Resource Planning": seats._4thSemSeats,
    "Internet, Technology and Society": seats._4thSemSeats,
    "Communication Techniques": seats._4thSemSeats,
  };

  // const _6thSemElective4Seats = { ...seats._6thSemData.elective_4_seats };
  // const _6thSemElective5Seats = { ...seats._6thSemData.elective_5_seats };

  const _4thSemAllotment = [];

  for (let student of _4thSemSelectionData) {
    if (
      student &&
      student.ELECTIVE_SELECTION &&
      student.ELECTIVE_SELECTION.OPTION_1 &&
      student.ELECTIVE_SELECTION.OPTION_1.TITLE &&
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_1.TITLE] > 0
    ) {
      _4thSemAllotment.push({
        REGNO: student.REGNO,
        NAME: student.NAME,
        CGPA: student.CGPA,
        ELECTIVE_1: {
          CODE: student.ELECTIVE_SELECTION.OPTION_1.CODE,
          TITLE: student.ELECTIVE_SELECTION.OPTION_1.TITLE,
        },
        SELECTION: student.ELECTIVE_SELECTION,
      });
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_1.TITLE]--;
    } else if (
      student &&
      student.ELECTIVE_SELECTION &&
      student.ELECTIVE_SELECTION.OPTION_2 &&
      student.ELECTIVE_SELECTION.OPTION_2.TITLE &&
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_2.TITLE] > 0
    ) {
      _4thSemAllotment.push({
        REGNO: student.REGNO,
        NAME: student.NAME,
        CGPA: student.CGPA,
        ELECTIVE_1: {
          CODE: student.ELECTIVE_SELECTION.OPTION_2.CODE,
          TITLE: student.ELECTIVE_SELECTION.OPTION_2.TITLE,
        },
        SELECTION: student.ELECTIVE_SELECTION,
      });
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_2.TITLE]--;
    } else if (
      student &&
      student.ELECTIVE_SELECTION &&
      student.ELECTIVE_SELECTION.OPTION_3 &&
      student.ELECTIVE_SELECTION.OPTION_3.TITLE &&
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_3.TITLE] > 0
    ) {
      _4thSemAllotment.push({
        REGNO: student.REGNO,
        NAME: student.NAME,
        CGPA: student.CGPA,
        ELECTIVE_1: {
          CODE: student.ELECTIVE_SELECTION.OPTION_3.CODE,
          TITLE: student.ELECTIVE_SELECTION.OPTION_3.TITLE,
        },
        SELECTION: student.ELECTIVE_SELECTION,
      });
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_3.TITLE]--;
    } else if (
      student &&
      student.ELECTIVE_SELECTION &&
      student.ELECTIVE_SELECTION.OPTION_4 &&
      student.ELECTIVE_SELECTION.OPTION_4.TITLE &&
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_4.TITLE] > 0
    ) {
      _4thSemAllotment.push({
        REGNO: student.REGNO,
        NAME: student.NAME,
        CGPA: student.CGPA,
        ELECTIVE_1: {
          CODE: student.ELECTIVE_SELECTION.OPTION_4.CODE,
          TITLE: student.ELECTIVE_SELECTION.OPTION_4.TITLE,
        },
        SELECTION: student.ELECTIVE_SELECTION,
      });
      _4thSemSeats[student.ELECTIVE_SELECTION.OPTION_4.TITLE]--;
    }
  }

  // const _6thSemAllotmentData = [];

  // for (let student of _6thSemSelectionData) {
  //   const returnValue = {
  //     REGNO: student.REGNO,
  //     NAME: student.NAME,
  //     CGPA: student.CGPA,
  //     ELECTIVE_4: { CODE: "", TITLE: "" },
  //     ELECTIVE_5: { CODE: "", TITLE: "" },
  //     ELECTIV_4_SELECTION: student.ELECTIVE_4_SELECTION,
  //     ELECTIVE_5_SELECTION: student.ELECTIVE_5_SELECTION,
  //   };

  //   if (
  //     student &&
  //     student.ELECTIVE_4_SELECTION &&
  //     student.ELECTIVE_4_SELECTION["OPTION_1"] &&
  //     student.ELECTIVE_4_SELECTION["OPTION_1"].TITLE &&
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_1"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_1"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_4.CODE =
  //       student.ELECTIVE_4_SELECTION["OPTION_1"].CODE;
  //     returnValue.ELECTIVE_4.TITLE =
  //       student.ELECTIVE_4_SELECTION["OPTION_1"].TITLE;
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_1"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_1"].TITLE}`
  //     ]--;
  //   } else if (
  //     student &&
  //     student.ELECTIVE_4_SELECTION &&
  //     student.ELECTIVE_4_SELECTION["OPTION_2"] &&
  //     student.ELECTIVE_4_SELECTION["OPTION_2"].TITLE &&
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_2"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_2"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_4.CODE =
  //       student.ELECTIVE_4_SELECTION["OPTION_2"].CODE;
  //     returnValue.ELECTIVE_4.TITLE =
  //       student.ELECTIVE_4_SELECTION["OPTION_2"].TITLE;
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_2"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_2"].TITLE}`
  //     ]--;
  //   } else if (
  //     student &&
  //     student.ELECTIVE_4_SELECTION &&
  //     student.ELECTIVE_4_SELECTION["OPTION_3"] &&
  //     student.ELECTIVE_4_SELECTION["OPTION_3"].TITLE &&
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_3"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_3"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_4.CODE =
  //       student.ELECTIVE_4_SELECTION["OPTION_3"].CODE;
  //     returnValue.ELECTIVE_4.TITLE =
  //       student.ELECTIVE_4_SELECTION["OPTION_3"].TITLE;
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_3"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_3"].TITLE}`
  //     ]--;
  //   } else if (
  //     student &&
  //     student.ELECTIVE_4_SELECTION &&
  //     student.ELECTIVE_4_SELECTION["OPTION_4"] &&
  //     student.ELECTIVE_4_SELECTION["OPTION_4"].TITLE &&
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_4"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_4"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_4.CODE =
  //       student.ELECTIVE_4_SELECTION["OPTION_4"].CODE;
  //     returnValue.ELECTIVE_4.TITLE =
  //       student.ELECTIVE_4_SELECTION["OPTION_4"].TITLE;
  //     _6thSemElective4Seats[
  //       `${student.ELECTIVE_4_SELECTION["OPTION_4"].CODE} ${student.ELECTIVE_4_SELECTION["OPTION_4"].TITLE}`
  //     ]--;
  //   }

  //   if (
  //     student &&
  //     student.ELECTIVE_5_SELECTION &&
  //     student.ELECTIVE_5_SELECTION["OPTION_1"] &&
  //     student.ELECTIVE_5_SELECTION["OPTION_1"].TITLE &&
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_1"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_1"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_5.CODE =
  //       student.ELECTIVE_5_SELECTION["OPTION_1"].CODE;
  //     returnValue.ELECTIVE_5.TITLE =
  //       student.ELECTIVE_5_SELECTION["OPTION_1"].TITLE;
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_1"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_1"].TITLE}`
  //     ]--;
  //   } else if (
  //     student &&
  //     student.ELECTIVE_5_SELECTION &&
  //     student.ELECTIVE_5_SELECTION["OPTION_2"] &&
  //     student.ELECTIVE_5_SELECTION["OPTION_2"].TITLE &&
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_2"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_2"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_5.CODE =
  //       student.ELECTIVE_5_SELECTION["OPTION_2"].CODE;
  //     returnValue.ELECTIVE_5.TITLE =
  //       student.ELECTIVE_5_SELECTION["OPTION_2"].TITLE;
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_2"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_2"].TITLE}`
  //     ]--;
  //   } else if (
  //     student &&
  //     student.ELECTIVE_5_SELECTION &&
  //     student.ELECTIVE_5_SELECTION["OPTION_3"] &&
  //     student.ELECTIVE_5_SELECTION["OPTION_3"].TITLE &&
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_3"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_3"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_5.CODE =
  //       student.ELECTIVE_5_SELECTION["OPTION_3"].CODE;
  //     returnValue.ELECTIVE_5.TITLE =
  //       student.ELECTIVE_5_SELECTION["OPTION_3"].TITLE;
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_3"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_3"].TITLE}`
  //     ]--;
  //   } else if (
  //     student &&
  //     student.ELECTIVE_5_SELECTION &&
  //     student.ELECTIVE_5_SELECTION["OPTION_4"] &&
  //     student.ELECTIVE_5_SELECTION["OPTION_4"].TITLE &&
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_4"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_4"].TITLE}`
  //     ] > 0
  //   ) {
  //     returnValue.ELECTIVE_5.CODE =
  //       student.ELECTIVE_5_SELECTION["OPTION_4"].CODE;
  //     returnValue.ELECTIVE_5.TITLE =
  //       student.ELECTIVE_5_SELECTION["OPTION_4"].TITLE;
  //     _6thSemElective5Seats[
  //       `${student.ELECTIVE_5_SELECTION["OPTION_4"].CODE} ${student.ELECTIVE_5_SELECTION["OPTION_4"].TITLE}`
  //     ]--;
  //   }

  //   _6thSemAllotmentData.push(returnValue);
  // }

  console.log(seats);

  return {
    _4thSemAllotment: _4thSemAllotment,
    // _6thSemAllotment: _6thSemAllotmentData,
  };
};

export default allotment;
