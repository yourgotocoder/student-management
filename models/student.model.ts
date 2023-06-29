import { Document, ObjectId } from "mongodb";

type Subject = {
  CODE: string;
  TITLE: string;
};

interface Student extends Document {
  _id: ObjectId;
  REGNO: number | undefined;
  NAME: string | undefined;
  CGPA: number | undefined;
  CURRENT_SEM: number | undefined;
  EMAIL_ID: string | undefined;
  DEFAULT_PASSWORD: string | undefined;
  ELECTIVE_1?: Subject;
  ELECTIVE_2?: Subject;
  ELECTIVE_1_OPTIONS?: Subject[];
  ELECTIVE_2_OPTIONS?: Subject[];
  ELECTIVE_4_OPTIONS?: Subject[];
  ELECTIVE_5_OPTIONS?: Subject[];
  ELECTIVE_7_OPTIONS?: Subject[];
  ELECTIVE_8_OPTIONS?: Subject[];
  ELECTIVE_SELECTIONS?: {
    ELECTIVE_1?: {
      OPTION_1: Subject;
      OPTION_2: Subject;
      OPTION_3: Subject;
      OPTION_4: Subject;
    };
    ELECTIVE_2?: {
      OPTION_1: Subject;
      OPTION_2: Subject;
      OPTION_3: Subject;
      OPTION_4: Subject;
    };
    ELECTIVE_4?: {
      [key: string]: Subject;
    };
    ELECTIVE_5?: {
      [key: string]: Subject;
    };
  };
}

export default Student;
