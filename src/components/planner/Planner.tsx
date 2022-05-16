import React, { useState } from "react";
import { Course } from "../../interfaces/Course";
import { PlanList } from "./PlanList";
import { Requirement } from "../../interfaces/Requirement";
import { DefaultRequirement } from "../../data/TestData";
import { Plan } from "../../interfaces/Plan";

export const Planner = ({
    modifiedCourses,
    coursePool,
    addToPool,
    removeFromPool,
    updateUserMetadataPlans
}: {
    modifiedCourses: Record<string, Course>;
    coursePool: string[];
    addToPool: (course: Course) => boolean;
    removeFromPool: (course: Course) => void;
    updateUserMetadataPlans: (plans: Plan[]) => void;
}) => {
    const [reqs, setReqs] = useState<Requirement>(DefaultRequirement);

    return (
        <div>
            <PlanList
                modifiedCourses={modifiedCourses}
                coursePool={coursePool}
                addToPool={addToPool}
                removeFromPool={removeFromPool}
                reqs={reqs}
                updateUserMetadataPlans={updateUserMetadataPlans}
                setReqs={setReqs}
            ></PlanList>
        </div>
    );
};
