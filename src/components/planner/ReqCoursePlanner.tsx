import React from "react";
import { Requirement } from "../../interfaces/Requirement";

export const ReqCoursePlanner = ({ reqs }: { reqs: Requirement }) => {
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h3>Requirements</h3>
            </div>
            <h4>Courses:</h4>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    textAlign: "left"
                }}
            >
                {reqs.courses.join(", ")}
            </div>
            <br></br>
            <h4>Breadth credits:</h4>
            <div
                style={{
                    textAlign: "left"
                }}
            >
                <div>Technical Elective Credits: {reqs.tech}</div>
                <div>Creative Arts and Humanities Credits: {reqs.creative}</div>
                <div>History and Cultural Change Credits: {reqs.history}</div>
                <div>Social and Behavioral Sciences Credits: {reqs.social}</div>
                <div>
                    Mathematics, Natural Sciences and Technology Credits:{" "}
                    {reqs.math}
                </div>
            </div>
        </div>
    );
};
