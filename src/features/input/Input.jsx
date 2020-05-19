import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  runStarted,
  selectInput,
  selectBoardSize,
  selectAlgorithm,
  selectGoal,
  selectHeuristic,
} from "./inputSlice";
import { runFinished } from "../board/boardSlice";
import Puzzle from "../Puzzle";
import styles from "./Input.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export function Input() {
  const input = useSelector(selectInput);
  const goal = useSelector(selectGoal);
  const boardSize = useSelector(selectBoardSize);
  const algorithm = useSelector(selectAlgorithm);
  const heuristic = useSelector(selectHeuristic);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        boardSize,
        algorithm,
        input,
        goal,
        heuristic,
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
        heuristic: Yup.mixed().when("algorithm", {
          is: "ast",
          then: Yup.string().oneOf(["manhattan", "euclidean"]).required(),
        }),
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
        goal: Yup.array()
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
        values.goal = toArray(values.goal);

        dispatch(runStarted(values));

        let puzzle = new Puzzle(
          values.boardSize,
          values.input,
          undefined,
          values.goal,
          0
        );

        const solve = (puzzle) => {
          const t0 = performance.now();
          switch (values.algorithm) {
            case "dfs":
              puzzle = puzzle.dfs();
              break;
            case "bfs":
              puzzle = puzzle.bfs();
              break;
            case "ast":
              puzzle = puzzle.ast(values.heuristic);
              break;

            default:
              break;
          }
          const t1 = performance.now();

          const runningTime = t1 - t0;
          const path = puzzle.getPath();
          path.pop();
          const expanded = puzzle.getExpanded();
          const searchCost = puzzle.getTotalCost();
          const searchDepth = puzzle.getDepth();

          const results = {
            runningTime,
            steps: path,
            expanded,
            searchCost,
            searchDepth,
            numExpanded: expanded.length,
          };

          dispatch(runFinished(results));
          setSubmitting(false);
        };

        if ("requestIdleCallback" in window) {
          // requestIdleCallback supported
          requestIdleCallback(solve(puzzle));
        } else {
          // no support - do something else
          setTimeout(solve(puzzle), 1);
        }
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
          <Field
            name="input"
            type="text"
            className={styles["board-arrangement"]}
          />
        </div>
        <ErrorMessage name="input" component="div" className={styles.error} />

        <div>
          <label
            htmlFor="goal"
            placeholder="Comma separated"
            className={styles.label}
          >
            Goal
          </label>
          <Field
            name="goal"
            type="text"
            className={styles["board-arrangement"]}
          />
        </div>
        <ErrorMessage name="goal" component="div" className={styles.error} />

        <div>
          <label htmlFor="algorithm" className={styles.label}>
            Algorithm
          </label>
          <Field
            name="algorithm"
            as="select"
            className={styles["board-select"]}
          >
            <option className={styles["board-select-option"]} value=""></option>
            <option className={styles["board-select-option"]} value="bfs">
              BFS
            </option>
            <option className={styles["board-select-option"]} value="dfs">
              DFS
            </option>
            <option className={styles["board-select-option"]} value="ast">
              A star
            </option>
          </Field>
        </div>
        <ErrorMessage
          name="algorithm"
          component="div"
          className={styles.error}
        />
        {true && (
          <div>
            <label htmlFor="heuristic" className={styles.label}>
              Heuristic
            </label>
            <Field
              name="heuristic"
              as="select"
              className={styles["board-select"]}
            >
              <option
                className={styles["board-select-option"]}
                value=""
              ></option>
              <option
                className={styles["board-select-option"]}
                value="manhattan"
              >
                Manhattan
              </option>
              <option
                className={styles["board-select-option"]}
                value="euclidean"
              >
                Euclidean
              </option>
            </Field>
          </div>
        )}
        {true && (
          <ErrorMessage
            name="heuristic"
            component="div"
            className={styles.error}
          />
        )}

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
