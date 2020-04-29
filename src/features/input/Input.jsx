import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  runStarted,
  selectInput,
  selectBoardSize,
  selectAlgorithm,
} from "./inputSlice";
import { runFinished } from "../board/boardSlice";
import Puzzle from "../Puzzle";
import styles from "./Input.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export function Input() {
  const input = useSelector(selectInput);
  const boardSize = useSelector(selectBoardSize);
  const algorithm = useSelector(selectAlgorithm);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        boardSize,
        algorithm,
        input,
      }}
      validationSchema={Yup.object({
        boardSize: Yup.number()
          .integer()
          .min(2, "Board size must be greater than 2")
          .max(5, "Board size must be less than 5")
          .required("Required"),
        algorithm: Yup.string()
          .oneOf(["bfs", "dfs", "ast"], "Please choose an algorithm")
          .required("Required"),
        input: Yup.array()
          .transform(function (value, originalValue) {
            if (this.isType(originalValue) && originalValue) {
              return originalValue;
            }

            return originalValue ? toArray(originalValue) : [];
          })
          .of(Yup.number("Invalid number").integer().min(0))
          .test("isValidArrangement", "Arrangement is not valid", function (
            value
          ) {
            const numOfElements = Math.pow(
              this.resolve(Yup.ref("boardSize")),
              2
            );

            if (value.length !== numOfElements) return false;

            for (let i = 0; i < numOfElements; i++) {
              if (value.indexOf(i) === -1) return false;
            }

            return true;
          })
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        values.input = toArray(values.input);

        dispatch(runStarted(values));

        // Call algorithm
        const puzzle = new Puzzle(
          values.boardSize,
          values.input,
          values.algorithm
        );

        // const steps = puzzle.getPath();

        const steps = [
          {
            arrangement: ["1", "4", "0", "5", "2", "7", "3", "8", "6"],
            spaceRow: 0,
            spaceCol: 2,
          },
          {
            arrangement: ["1", "4", "0", "5", "2", "3", "7", "8", "6"],
            spaceRow: 0,
            spaceCol: 2,
          },
          {
            arrangement: ["1", "4", "0", "5", "2", "3", "8", "7", "6"],
            spaceRow: 0,
            spaceCol: 2,
          },
          {
            arrangement: ["1", "4", "0", "5", "2", "3", "8", "6", "7"],
            spaceRow: 0,
            spaceCol: 2,
          },
        ];

        dispatch(runFinished({ steps }));
        setSubmitting(false);
      }}
    >
      <Form className={styles.form}>
        <div>
          <label htmlFor="boardSize" className={styles.label}>
            Board size
          </label>
          <Field
            name="boardSize"
            type="text"
            className={styles["board-size"]}
          />
        </div>
        <ErrorMessage
          name="boardSize"
          component="div"
          className={styles.error}
        />
        <div>
          <label
            htmlFor="input"
            placeholder="Comma separated"
            className={styles.label}
          >
            Input
          </label>
          <Field name="input" type="text" className={styles["board-input"]} />
        </div>
        <ErrorMessage name="input" component="div" className={styles.error} />
        <div>
          <label htmlFor="algorithm" className={styles.label}>
            Algorithm
          </label>
          <Field
            name="algorithm"
            as="select"
            className={styles["board-algorithm"]}
          >
            <option value=""></option>
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
            <option value="ast">A star</option>
          </Field>
        </div>
        <ErrorMessage
          name="algorithm"
          component="div"
          className={styles.error}
        />
        <button type="submit" className={styles.button}>
          Run
        </button>
      </Form>
    </Formik>
  );
}

function toArray(string) {
  if (Array.isArray(string)) return string;
  return string.split(/[\s,]+/).filter((v) => v);
}
