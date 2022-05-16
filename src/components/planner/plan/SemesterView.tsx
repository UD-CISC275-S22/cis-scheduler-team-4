import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Semester } from "../../../interfaces/Semester";
import { Course } from "../../../interfaces/Course";
import { CourseList } from "./CourseList";

export const SemesterView = ({
    semester,
    idx,
    deleteSemester,
    editSemester,
    modifiedCourses,
    selected,
    coursePool,
    addToPool,
    removeFromPool
}: {
    semester: Semester;
    idx: number;
    deleteSemester: (id: number) => void;
    editSemester: (id: number, newSemester: Semester) => void;
    modifiedCourses: Record<string, Course>;
    selected: boolean;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    const [courseInput, setCourseInput] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    const numToSemester: Record<number, string> = {
        0: "Fall",
        1: "Winter",
        2: "Spring",
        3: "Summer"
    };

    function addCourse(code: string) {
        //event.target.value (course.code) --> map to Course in the datafile --> that Course feeds into this fn arg
        //other way is to pass the course.code into this function and then inside the function find the Course from datafile
        editSemester(semester.id, {
            ...semester,
            courses: [...semester.courses, code]
        });
        setCourseInput("");
    }

    function deleteCourse(code: string) {
        editSemester(semester.id, {
            ...semester,
            courses: semester.courses.filter(
                (course: string): boolean => course !== code
            )
        });
    }

    function clearCourses() {
        editSemester(semester.id, {
            ...semester,
            courses: []
        });
    }

    function courseExist(): boolean {
        if (modifiedCourses[courseInput] !== undefined) {
            //course exists in catalog
            return true;
        } else {
            setErrorMsg("Course does not exist");
            return false;
        }
    }

    function courseRepeat(): boolean {
        if (semester.courses.includes(courseInput)) {
            //course already exists in the semester
            setErrorMsg("Course is already in the semester");
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit() {
        if (courseExist() && !courseRepeat()) {
            addCourse(courseInput);
            setErrorMsg("");
        }
    }

    function handlePoolSubmit() {
        if (courseExist() && !courseRepeat()) {
            addCourse(courseInput);
            removeFromPool(modifiedCourses[courseInput]);
            setErrorMsg("");
        }
    }

    function semesterCreds(courses: string[]): number {
        const mappedCourses = courses.map(
            (code: string): Course => modifiedCourses[code]
        );
        return mappedCourses.reduce(
            (totalCreds: number, course: Course) => totalCreds + course.credits,
            0
        );
    }

    return (
        <div
            style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            {selected === false ? (
                <>
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: ".5rem"
                            }}
                        >
                            <h4 className="d-inline">{numToSemester[idx]}</h4>
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => deleteSemester(semester.id)}
                            >
                                ❌
                            </div>
                        </div>

                        <CourseList
                            courses={semester.courses}
                            deleteCourse={deleteCourse}
                            modifiedCourses={modifiedCourses}
                            semSelected={selected}
                            addToPool={addToPool}
                        ></CourseList>
                    </div>
                    <i style={{ marginLeft: "auto" }}>
                        Semester Credits: {semesterCreds(semester.courses)}
                    </i>
                </>
            ) : (
                <div>
                    <div style={{ marginBottom: ".5rem" }}>
                        <h4 className="d-inline float-left">
                            {numToSemester[semester.id]}
                        </h4>
                        <i style={{ float: "right" }}>
                            Semester Credits: {semesterCreds(semester.courses)}
                        </i>
                    </div>
                    <CourseList
                        courses={semester.courses}
                        deleteCourse={deleteCourse}
                        modifiedCourses={modifiedCourses}
                        semSelected={selected}
                        addToPool={addToPool}
                    ></CourseList>
                    <Form.Group controlId="addCourse" className="mt-2">
                        <Form.Label className="d-block">
                            Add Course by Code
                        </Form.Label>
                        <Form.Control
                            placeholder="Enter course code (e.g. CISC 108)"
                            value={courseInput}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                setCourseInput(event.target.value.toUpperCase())
                            }
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            style={{ display: "inline", width: "80%" }}
                        ></Form.Control>
                        <Button
                            className="d-inline"
                            type="submit"
                            onClick={handleSubmit}
                            style={{ width: "20%", float: "right" }}
                        >
                            Add
                        </Button>
                        {errorMsg ? (
                            <div
                                className="error-msg"
                                style={{ fontSize: "0.9rem", color: "red" }}
                            >
                                *{errorMsg}
                            </div>
                        ) : null}
                    </Form.Group>
                    <Form.Group controlId="addFromPool" className="mt-2">
                        <Form.Label className="d-block">
                            Add Course from Pool
                        </Form.Label>
                        <Form.Select
                            value={courseInput}
                            onChange={(
                                event: React.ChangeEvent<HTMLSelectElement>
                            ) => setCourseInput(event.target.value)}
                            style={{ display: "inline", width: "80%" }}
                        >
                            <option value="">Select a class</option>
                            {coursePool.map((course: string) => (
                                <option
                                    key={modifiedCourses[course].code}
                                    value={modifiedCourses[course].code}
                                >
                                    {modifiedCourses[course].code}
                                </option>
                            ))}
                        </Form.Select>
                        <Button
                            className="d-inline"
                            type="submit"
                            onClick={handlePoolSubmit}
                            style={{ width: "20%", float: "right" }}
                        >
                            Add
                        </Button>
                    </Form.Group>
                    <Button
                        className="btn-secondary m-1 mt-4"
                        onClick={clearCourses}
                    >
                        Clear Courses
                    </Button>
                </div>
            )}
        </div>
    );
};
