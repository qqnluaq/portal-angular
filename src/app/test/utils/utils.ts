import {AxeResults} from "axe-core";

export function logAxeViolations(results: AxeResults) {
    if (results.violations.length > 0) {
        results.violations.forEach((violation, index )  => {
            console.log("Accessibility violation " + (index + 1));
            console.log("\tImpact:" + violation.impact);
            console.log("\tTag:" + violation.tags.join(","));
            console.log("\tViolation:" + violation.help);
            violation.nodes.forEach(node => {
                console.log("\tSummary:" + node.failureSummary);
                console.log("\tHTML:" + node.html);
            });
        });
    }
}
