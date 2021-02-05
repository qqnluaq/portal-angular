import {ValidationError} from "../store/application/application.state";
import * as moment from "moment";
import {DATE_FORMATS} from "./index";
import {getCodeOptions, getDescriptionForCode, getScheduleCodeOptions} from "./code-table-utils";

const digits = () => `must contain only numbers`;
const required = () => `is required`;
const invalid = () => `is invalid`;
const invalidCode = (code) => `is invalid: ${code}`;
const notFound = () => `not found`;
const min = ([message, minVal]: any[]) => `cannot be less than ${minVal}`;
const max = ([message, maxVal]: any[]) => `cannot be more than ${maxVal}`;
const minMax = ([message, minVal, maxVal]: any[]) => `must be between ${minVal} and ${maxVal} characters`;
const formatDate = (value) => `${moment(value).format(DATE_FORMATS.API_DATE)}`;
const formatTime = (value) => `${moment(value).format(DATE_FORMATS.timePickerInput)}`;

export const ErrorMessages = {
    "required": () => "Value is required",
    "incorrectTime": () => "Time must be between 00:00 and 24:00. ",
    "mask": (x) => `Format must be ${x}`,
    "max": (x) => `Value cannot be more than ${x}`,
    "min": (x) => `Value cannot be less than ${x}`,
    "maxlength": (x) => `Value cannot exceed ${x} characters`,
    "minlength": (x) => `Value must be at least ${x} characters`,
    "email": () => "Invalid email format",
    "weight": () => "Value cannot have more than one decimal",
    "startAfterEnd": () => "Start Date cannot be after End Date",
    "dutyDateFirstAfterLast": () => "First Duty Date cannot be after Last Duty Date",
    "operationalDateFirstAfterLast": () => "First Operational Date cannot be after Last Operational Date",
    "assignmentDepartureAfterArrival": () => "Planned Departure to Assignment cannot be after Planned Arrival at Assignment",
    "homeDepartureAfterArrival": () => "Planned Departure to Home cannot be after Planned Arrival at Home",
    "assignmentDepartureAfterHomeDeparture": () => "Planned Departure to Assignment cannot be after Planned Departure to Home",

    "error.resource.communication.method.type.unique": ({messageArguments}: ValidationError) => `There are multiple communications of type '${getDescriptionForCode(messageArguments[0], getCodeOptions("COMMUNICATION_METHOD_TYPE_CODE"))}'. There can be only one communication of each type.`,
    "error.resource.group.duplicate": ({messageArguments}: ValidationError) => `A group with name ${messageArguments[0]} and type ${messageArguments[1]} already exists.`,

    // ASSIGNMENT_MEMBER_PERIOD_CONFLICT = "error.assignment.member.period.conflict
    // "Conflict found with assignment - {1} for {2} - {4}.");
    // 0: assignmentId
    // 1: assignmentName
    // 2: assignMemberResourceTypeCode
    // 3: resourceId
    // 4: resourceDisplayName
    "error.assignment.member.period.conflict": ({messageArguments}: ValidationError) => `${messageArguments[4]} is currently assigned to ${messageArguments[1]} during dates selected.`,

    // ASSIGNMENT_MEMBER_GROUP_PERIOD_CONFLICT = "error.assignment.member.group.period.conflict
    // "Conflict found with group - {2} on {3} with status {4}-{5}."
    // 0: assignmentId
    // 1: groupId
    // 2: groupName
    // 3: day
    // 4: availabilityStatus
    // 5: allocationTypeCode

    "error.assignment.member.group.period.conflict": ({messageArguments}: ValidationError) => `${messageArguments[2]} has a status of ${getDescriptionForCode(messageArguments[4], getScheduleCodeOptions("AVAILABILITY_STATUS_CODE"))}-${getDescriptionForCode(messageArguments[5], getScheduleCodeOptions("ALLOCATION_TYPE_CODE"))} on ${messageArguments[3]}.`,

    // ASSIGNMENT_MEMBER_GROUP_MEMBER_PERIOD_CONFLICT = "error.assignment.member.group.member.period.conflict";
    // "Conflict found with group  member - {2} on {3} with status {4}-{5}."
    // 0: assignmentId
    // 1: resourceUnitId
    // 2: resourceDisplayName
    // 3: day
    // 4: availabilityStatus
    // 5: allocationTypeCode

    "error.assignment.member.group.member.period.conflict": ({messageArguments}: ValidationError) => `${messageArguments[2]} has a status of ${getDescriptionForCode(messageArguments[4], getScheduleCodeOptions("AVAILABILITY_STATUS_CODE"))}-${getDescriptionForCode(messageArguments[5], getScheduleCodeOptions("ALLOCATION_TYPE_CODE"))} on ${messageArguments[3]}.`,

    // ASSIGNMENT_MEMBER_RESOURCE_UNIT_PERIOD_CONFLICT = "error.assignment.member.resource.unit.period.conflict";
    // "Conflict found with resource unit - {2} on {3} with status {4}-{5}."
    // 0: assignmentId
    // 1: resourceUnitId
    // 2: resourceDisplayName
    // 3: day
    // 4: availabilityStatus
    // 5: allocationTypeCode

    "error.assignment.member.resource.unit.period.conflict": ({messageArguments}: ValidationError) => `${messageArguments[2]} has a status of ${getDescriptionForCode(messageArguments[4], getScheduleCodeOptions("AVAILABILITY_STATUS_CODE"))}-${getDescriptionForCode(messageArguments[5], getScheduleCodeOptions("ALLOCATION_TYPE_CODE"))} on ${messageArguments[3]}.`,
};

export function getDisplayErrorMessage(err: ValidationError) {

    if (err && ErrorMessages[err.message]) {
        return ErrorMessages[err.message](err);
    } else if (err && err.messageTemplate && err.messageTemplate != err.message) {
        let msg: string = err.messageTemplate;
        let args = err.messageArguments;
        if (args && args.length > 0) {
            err.messageArguments.forEach(function (arg, index) {
                let paramLookup = "{" + index + "}";
                msg = msg.replace(paramLookup, arg);
            });
        }
        return msg;
    } else {
        return err.message;
    }
}
