import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Semester } from "../../../interfaces/Semester";
import { Course } from "../../../interfaces/Course";
import { SemesterView } from "./SemesterView";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Expand } from "../PlanList";

export const SemesterList = ({
    semesters,
    addSemester,
    deleteSemester,
    editSemester,
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool
}: {
    semesters: Semester[];
    addSemester: (id: number) => void;
    deleteSemester: (id: number) => void;
    editSemester: (id: number, newSemester: Semester) => void;
    modifiedCourses: Record<string, Course>;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
}) => {
    const [selectedID, setSelectedID] = useState<number | null>(null);

    const changeSelectedID = (id: number) => {
        if (selectedID === null) {
            setSelectedID(id);
        } else {
            setSelectedID(null);
        }
    };
    if (selectedID === null) {
        return (
            <div>
                <Row>
                    {semesters.map((semester: Semester, idx: number) =>
                        idx % 2 === 0 && semester.active === true ? (
                            <Col
                                key={semester.id}
                                className="border m-2 text-white"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    backgroundColor: "var(--primary-color)",
                                    borderRadius: 8,
                                    padding: "1rem",
                                    paddingBottom: 0,
                                    paddingTop: "1rem"
                                }}
                            >
                                <SemesterView
                                    semester={semester}
                                    idx={idx}
                                    deleteSemester={deleteSemester}
                                    editSemester={editSemester}
                                    modifiedCourses={modifiedCourses}
                                    selected={false}
                                    coursePool={coursePool}
                                    addToPool={addToPool}
                                    removeFromPool={removeFromPool}
                                ></SemesterView>
                                <Expand
                                    data-testid="chevron"
                                    onClick={() =>
                                        changeSelectedID(semester.id)
                                    }
                                >
                                    <ChevronDownIcon
                                        style={{
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            width: "2rem",
                                            cursor: "pointer"
                                        }}
                                    ></ChevronDownIcon>
                                </Expand>
                            </Col>
                        ) : idx % 2 === 0 ? (
                            <Col
                                key={semester.id}
                                className="m-2 p-2"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    onClick={() => addSemester(semester.id)}
                                >
                                    + Add Semester
                                </Button>
                            </Col>
                        ) : (
                            <React.Fragment key={semester.id}></React.Fragment>
                        )
                    )}
                </Row>
                <Row>
                    {semesters.map((semester: Semester, idx: number) =>
                        idx % 2 === 1 && semester.active === true ? (
                            <Col
                                key={semester.id}
                                className="border m-2 text-white"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "stretch",
                                    backgroundColor: "var(--primary-color)",
                                    borderRadius: 8,
                                    padding: "1rem",
                                    paddingBottom: 0,
                                    paddingTop: "1rem"
                                }}
                            >
                                <SemesterView
                                    semester={semester}
                                    idx={idx}
                                    deleteSemester={deleteSemester}
                                    editSemester={editSemester}
                                    modifiedCourses={modifiedCourses}
                                    selected={false}
                                    coursePool={coursePool}
                                    addToPool={addToPool}
                                    removeFromPool={removeFromPool}
                                ></SemesterView>
                                <Expand
                                    data-testid="chevron"
                                    onClick={() =>
                                        changeSelectedID(semester.id)
                                    }
                                >
                                    <ChevronDownIcon
                                        style={{
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            width: "2rem",
                                            cursor: "pointer"
                                        }}
                                    ></ChevronDownIcon>
                                </Expand>
                            </Col>
                        ) : idx % 2 === 1 ? (
                            <Col
                                key={semester.id}
                                className="m-2 p-2"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Button
                                    onClick={() => addSemester(semester.id)}
                                >
                                    + Add Semester
                                </Button>
                            </Col>
                        ) : (
                            <React.Fragment key={semester.id}></React.Fragment>
                        )
                    )}
                </Row>
            </div>
        );
    } else {
        return (
            <div>
                <Row>
                    {semesters.map(
                        (semester: Semester, idx: number) =>
                            semester.id === selectedID && (
                                <Col
                                    key={semester.id}
                                    className="border m-2 text-white"
                                    style={{
                                        backgroundColor: "var(--primary-color)",
                                        borderRadius: 8,
                                        padding: "1rem",
                                        paddingTop: "0",
                                        paddingBottom: "1rem"
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Expand
                                            onClick={() =>
                                                changeSelectedID(semester.id)
                                            }
                                            data-testid="chevron"
                                        >
                                            <ChevronUpIcon
                                                style={{
                                                    width: "2rem",
                                                    cursor: "pointer"
                                                }}
                                            ></ChevronUpIcon>
                                        </Expand>
                                    </div>
                                    <SemesterView
                                        semester={semester}
                                        idx={idx}
                                        deleteSemester={deleteSemester}
                                        editSemester={editSemester}
                                        modifiedCourses={modifiedCourses}
                                        selected={true}
                                        coursePool={coursePool}
                                        addToPool={addToPool}
                                        removeFromPool={removeFromPool}
                                    ></SemesterView>
                                </Col>
                            )
                    )}
                </Row>
            </div>
        );
    }
};
