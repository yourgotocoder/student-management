const electiveData = require("./Allotment.json");
const json2xls = require("json2xls");
const fs = require("fs");

const _4thSemAllotment = electiveData._4thSemAllotment.map((student) => ({
  REGNO: student.REGNO,
  NAME: student.NAME,
  CGPA: student.CGPA,
  ELECTIVE_1: student.ELECTIVE_1.CODE + " " + student.ELECTIVE_1.TITLE,
}));

const _6thSemAllotment = electiveData._6thSemAllotment.map((student) => ({
    REGNO: student.REGNO,
    NAME: student.NAME,
    CGPA: student.CGPA,
    ELECTIVE_4: student.ELECTIVE_4.CODE + " " + student.ELECTIVE_4.TITLE,
    ELECTIVE_5: student.ELECTIVE_5.CODE + " " + student.ELECTIVE_5.TITLE
}))

console.log(_4thSemAllotment)

const _xlsData_4thSem = json2xls(_4thSemAllotment);
const _xlsData_6thSem = json2xls(_6thSemAllotment);

fs.writeFileSync("./test/Elective_Allotment_4th.xlsx", _xlsData_4thSem, "binary");
fs.writeFileSync("./test/Elective_Allotment_6th.xlsx", _xlsData_6thSem, "binary");
