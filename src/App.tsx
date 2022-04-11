import React, { useState } from "react";
import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { CourseSearch } from "./components/CourseSearch";
//import { PlansList } from "./components/PlansList";
import { NavBar } from "./components/NavBar";
import { Plan } from "./interfaces/Plan";
import { Planner } from "./components/Planner";

// const originalCourses: Course[] = [];

function App(): JSX.Element {
    // const [modifiedCourses, setModifiedCourses] =
    //     useState<Course[]>(originalCourses);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [search, setSearch] = useState<boolean>(false);
    const [landing, setLanding] = useState<boolean>(true);

    const addPlan = () => {
        const newPlan: Plan = {
            id: plans.length === 0 ? 0 : plans[plans.length - 1].id + 1,
            title: "New Plan",
            description: "Add description",
            Years: []
        };
        setPlans([...plans, newPlan]);
    };

    const editPlan = (id: number, newPlan: Plan) => {
        setPlans(
            plans.map((plan: Plan): Plan => (plan.id === id ? newPlan : plan))
        );
    };

    const deletePlan = (id: number) => {
        setPlans(plans.filter((plan: Plan): boolean => plan.id !== id));
    };

    const flipLanding = () => {
        setLanding(!landing);
    };

    const flipSearch = () => {
        setSearch(!search);
    };

    return (
        <div className="App">
            <NavBar
                landing={landing}
                flipLanding={flipLanding}
                search={search}
                flipSearch={flipSearch}
            ></NavBar>
            <div style={{ display: !search ? "block" : "none" }}>
                {landing && (
                    <LandingPage flipLanding={flipLanding}></LandingPage> // I unrender this component when I don't need it because it contains to state.
                )}
                <div style={{ display: !landing ? "block" : "none" }}>
                    {/*I only set this component to display none because I it to remain the same after switching to and from course search. */}
                    <Planner
                        plans={plans}
                        addPlan={addPlan}
                        editPlan={editPlan}
                        deletePlan={deletePlan}
                    ></Planner>
                </div>
            </div>
            <div style={{ display: search ? "block" : "none" }}>
                <CourseSearch></CourseSearch>
            </div>
        </div>
    );
}

export default App;
