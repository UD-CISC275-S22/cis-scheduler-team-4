import React from "react";
import { Button /*, Form*/ } from "react-bootstrap";
import { Year } from "../../../interfaces/Year";
import { Semester } from "../../../interfaces/Semester";
import { Course } from "../../../interfaces/Course";
import { SemesterList } from "./SemesterList";

export const YearView = ({
    year,
    yearIdx,
    deleteYear,
    editYear,
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool
}: {
    year: Year;
    yearIdx: number;
    deleteYear: (id: number) => void;
    editYear: (id: number, newYear: Year) => void;
    modifiedCourses: Record<string, Course>;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    function addSemester(id: number) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    id === semester.id
                        ? { ...semester, active: true }
                        : semester
            )
        });
    }

    function deleteSemester(id: number) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    id === semester.id
                        ? { ...semester, active: false, courses: [] }
                        : semester
            )
        });
    }

    function editSemester(id: number, newSemester: Semester) {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester =>
                    semester.id === id ? newSemester : semester
            )
        });
    }

    function clearSemesters() {
        editYear(year.id, {
            ...year,
            semesters: year.semesters.map(
                (semester: Semester): Semester => ({
                    ...semester,
                    active: false,
                    courses: []
                })
            )
        });
    }

    function yearCreds(semesters: Semester[]): number {
        const filteredSemesters = semesters.filter(
            (semester: Semester) => semester.active === true
        );
        const mappedCourses = filteredSemesters.map((semester: Semester) =>
            semester.courses.map(
                (code: string): Course => modifiedCourses[code]
            )
        );
        return mappedCourses.reduce(
            (totalCreds: number, courses: Course[]) =>
                totalCreds +
                courses.reduce(
                    (intCreds: number, course: Course) =>
                        intCreds + course.credits,
                    0
                ),
            0
        );
    }

    return (
        <div>
            <h2 className="d-inline float-left">Year {yearIdx + 1}</h2>
            <i style={{ float: "right" }}>
                Year Credits: {yearCreds(year.semesters)}
            </i>
            <SemesterList
                semesters={year.semesters}
                addSemester={addSemester}
                deleteSemester={deleteSemester}
                editSemester={editSemester}
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
            ></SemesterList>
            <Button className="btn-secondary m-1 mt-3" onClick={clearSemesters}>
                Clear Semesters
            </Button>
            <Button
                className="btn-danger m-1 mt-3"
                onClick={() => deleteYear(year.id)}
            >
                Delete Year
            </Button>
        </div>
    );
};
