const electiveData = require("./4thAllotment.json");
const json2xls = require("json2xls");
const fs = require("fs");

const _4thSemAllotment = electiveData._4thSemAllotment.map((student) => ({
  REGNO: student.REGNO,
  NAME: student.NAME,
  CGPA: student.CGPA,
  ELECTIVE_1: student.ELECTIVE_1.CODE.replace("/", "_") + " " + student.ELECTIVE_1.TITLE,
}));

// const _6thSemAllotment = electiveData._6thSemAllotment.map((student) => ({
//   REGNO: student.REGNO,
//   NAME: student.NAME,
//   CGPA: student.CGPA,
//   ELECTIVE_4: student.ELECTIVE_4.CODE + " " + student.ELECTIVE_4.TITLE,
//   ELECTIVE_5: student.ELECTIVE_5.CODE + " " + student.ELECTIVE_5.TITLE,
// }));

const _4thSemSubjectwise = _4thSemAllotment.reduce((prev, cur) => {
  if (!prev[cur.ELECTIVE_1]) {
    prev[cur.ELECTIVE_1] = [
      { REGNO: cur.REGNO, NAME: cur.NAME, CGPA: cur.CGPA },
    ];
  } else if (prev[cur.ELECTIVE_1]) {
    prev[cur.ELECTIVE_1].push({
      REGNO: cur.REGNO,
      NAME: cur.NAME,
      CGPA: cur.CGPA,
    });
  }

  return prev;
}, {});

// const _6thSemSubjectwise = _6thSemAllotment.reduce((prev, cur) => {
//     if (!prev[cur.ELECTIVE_4]) {
//       prev[cur.ELECTIVE_4] = [
//         { REGNO: cur.REGNO, NAME: cur.NAME, CGPA: cur.CGPA },
//       ];
//     } else if (prev[cur.ELECTIVE_4]) {
//       prev[cur.ELECTIVE_4].push({
//         REGNO: cur.REGNO,
//         NAME: cur.NAME,
//         CGPA: cur.CGPA,
//       });
//     }

//     if (!prev[cur.ELECTIVE_5]) {
//         prev[cur.ELECTIVE_5] = [
//           { REGNO: cur.REGNO, NAME: cur.NAME, CGPA: cur.CGPA },
//         ];
//       } else if (prev[cur.ELECTIVE_5]) {
//         prev[cur.ELECTIVE_5].push({
//           REGNO: cur.REGNO,
//           NAME: cur.NAME,
//           CGPA: cur.CGPA,
//         });
//       }
  
//     return prev;
//   }, {});

for (let key in _4thSemSubjectwise) {
  console.log(_4thSemSubjectwise[key])
    const xlsData = json2xls(_4thSemSubjectwise[key]);
    fs.writeFileSync(`./test/${key.substring(0, 18)}.xlsx`, xlsData, "binary");
}

// for (let key in _6thSemSubjectwise) {
//   console.log(_6thSemSubjectwise[key])
//     const xlsData = json2xls(_6thSemSubjectwise[key]);
//     fs.writeFileSync(`./test/${key.substring(0, 20)}.xlsx`, xlsData, "binary");
// }

// console.log(_4thSemAllotment);

const _xlsData_4thSem = json2xls(_4thSemAllotment);
// const _xlsData_6thSem = json2xls(_6thSemAllotment);

fs.writeFileSync(
  "./test/Elective1_Allotment_4th.xlsx",
  _xlsData_4thSem,
  "binary"
);
// fs.writeFileSync(
//   "./test/Elective_Allotment_6th.xlsx",
//   _xlsData_6thSem,
//   "binary"
// );
