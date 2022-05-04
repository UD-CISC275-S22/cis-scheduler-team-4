import React from "react";
import { Plan } from "../../../interfaces/Plan";
import { Year } from "../../../interfaces/Year";
import { Semester } from "../../../interfaces/Semester";
import { Requirement } from "../../../interfaces/Requirement";
import styled from "styled-components";
import { Course } from "../../../interfaces/Course";

const FixedRequirements = styled.div`
    @media only screen and (max-width: 768px) {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    @media only screen and (min-width: 769px) {
        text-align: center;
        border-radius: 8px;
        border: 1px solid var(--tertiary-color);
        display: block;
        position: fixed;
        top: 25vh;
        right: 0;
        padding: 1rem;
        margin-right: 0.75rem;
    }

    @media only screen and (min-width: 1530px) {
        left: 50%;
        right: auto;
        transform: translate(590px, 0);
    }
`;

const MobileHeader = styled.hr`
    @media only screen and (min-width: 769px) {
        display: none;
    }
`;

const CoursesListDiv = styled.div`
    @media only screen and (max-width: 768px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;

export const ReqCoursePlan = ({
    plan,
    reqs,
    modifiedCourses
}: {
    plan: Plan;
    reqs: Requirement;
    modifiedCourses: Record<string, Course>;
}) => {
    let userCourses: string[] = [];
    let techCredits = 0;
    let creativeCredits = 0;
    let historyCredits = 0;
    let socialCredits = 0;
    let mathCredits = 0;

    const normalStyle = { color: "black" };
    const completedStyle = {
        color: "green",
        textDecorationLine: "line-through"
    };

    plan.years.forEach((year: Year) =>
        year.semesters.forEach((sem: Semester) =>
            sem.courses.forEach((course: string) => {
                userCourses = [...userCourses, course];
                const myCourse = modifiedCourses[course];
                if (myCourse.tech) {
                    techCredits += myCourse.credits;
                }
                if (
                    myCourse.subjectArea !== "CISC" &&
                    !reqs.courses.includes(myCourse.code)
                ) {
                    if (myCourse.breadth === "Creative Arts and Humanities") {
                        creativeCredits += myCourse.credits;
                    } else if (
                        myCourse.breadth === "History and Cultural Change"
                    ) {
                        historyCredits += myCourse.credits;
                    } else if (
                        myCourse.breadth === "Social and Behavioral Sciences"
                    ) {
                        socialCredits += myCourse.credits;
                    } else if (
                        myCourse.breadth ===
                        "Mathematics, Natural Sciences and Technology"
                    ) {
                        mathCredits += myCourse.credits;
                    }
                }
            })
        )
    );

    return (
        <FixedRequirements>
            <h5>Requirements</h5>
            <CoursesListDiv>
                {reqs.courses.map((req: string) => (
                    <div
                        key={req}
                        style={
                            userCourses.includes(req)
                                ? completedStyle
                                : normalStyle
                        }
                    >
                        {req}
                    </div>
                ))}
            </CoursesListDiv>
            <CoursesListDiv>
                <div
                    style={
                        techCredits >= reqs.tech ? completedStyle : normalStyle
                    }
                >
                    T: {techCredits + "/" + reqs.tech}
                </div>
                <div
                    style={
                        creativeCredits >= reqs.creative
                            ? completedStyle
                            : normalStyle
                    }
                >
                    C: {creativeCredits + "/" + reqs.creative}
                </div>
                <div
                    style={
                        socialCredits >= reqs.social
                            ? completedStyle
                            : normalStyle
                    }
                >
                    S: {socialCredits + "/" + reqs.social}
                </div>
                <div
                    style={
                        historyCredits >= reqs.history
                            ? completedStyle
                            : normalStyle
                    }
                >
                    H: {historyCredits + "/" + reqs.history}
                </div>
                <div
                    style={
                        mathCredits >= reqs.math ? completedStyle : normalStyle
                    }
                >
                    M: {mathCredits + "/" + reqs.math}
                </div>
            </CoursesListDiv>

            <MobileHeader></MobileHeader>
        </FixedRequirements>
    );
};
