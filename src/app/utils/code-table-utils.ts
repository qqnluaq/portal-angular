import {CodeData, Option} from "../store/application/application.state";
import {CONSTANTS, DATE_FORMATS, getCodeTableCache} from "./index";
import * as moment from "moment";

export const sortByDisplayOrder = (a: CodeData, b: CodeData) => a.displayOrder - b.displayOrder;

export const sortByDescription = function (a, b) {
    let nameA = a.description.toUpperCase(); // ignore upper and lowercase
    let nameB = b.description.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
};


export function getCodeDataForCode(codeStr: string, options: (CodeData | Option)[]) {
    if (codeStr && options) {
        let code = options.find(obj => obj && obj.code === codeStr);
        return code ? code : null;
    } else {
        return null;
    }

}

export function getDescriptionForCodeData(value: CodeData | Option) {
    return value ? value.description : null;
}

export function getDescriptionForCode(codeStr: string, options: (CodeData | Option)[]) {
    return getDescriptionForCodeData(getCodeDataForCode(codeStr, options));
}

export function getCodeOptions(codeType: string): ((CodeData | Option)[]) {
    if (codeType == "YEARS") {
        let years: CodeData[] = [];
        let systemImplementedYear = 2020;
        let i = 0;
        let today = moment();
        for (let yearCode = systemImplementedYear; yearCode <= today.year() + 1; yearCode++) {
            years.push(
                {
                    "code": `${yearCode}`,
                    "description": `${yearCode}`,
                    "displayOrder": i + 1,
                    "effectiveDate": today.format(DATE_FORMATS.datePickerInput),
                    "expiryDate": "9999-12-31"
                }
            );
        }
        return years.slice().sort(sortByDisplayOrder);
    }
    let codes = getCodeTableCache()["codeTables"] ? getCodeTableCache()["codeTables"][codeType] : [];
    if (!codes) {
        return [];
    }
    if (codeType == "FIRE_CENTRE_CODE"
        || codeType == "ZONE_CODE"
        || codeType == "COMMUNICATION_METHOD_TYPE_CODE"
        || codeType == "CONTACT_TYPE_CODE") {
        return codes.slice().sort(sortByDescription);
    } else {
        return codes.slice().sort(sortByDisplayOrder);
    }
}


export function getScheduleCodeOptions(codeType: string): ((CodeData | Option)[]) {
    let codes: (CodeData | Option)[] = getCodeTableCache()["scheduleCodeTables"] ? getCodeTableCache()["scheduleCodeTables"][codeType] : [];
    if (!codes) {
        return [];
    }
    if (codeType == "SHIFT_TYPE_CODE") {
        return codes.slice().sort(sortByDescription);
    } else if (codeType == "ASSIGN_MEMBER_RSRC_TYPE_CODE") {
        let index = codes.findIndex(item => item.code == CONSTANTS.ASSIGNMENT_RESOURCE_TYPES.RSRC_GRP_MBR);
        if (index >= 0) {
            codes.splice(index, 1);
        }
        codes = codes.map(item => {
            if (item.code == CONSTANTS.ASSIGNMENT_RESOURCE_TYPES.RSRC_UNT) {
                item.description = "Personnel";
                return item;
            } else if (item.code == CONSTANTS.ASSIGNMENT_RESOURCE_TYPES.RSRC_GRP) {
                item.description = "Group";
                return item;
            } else {
                return item;
            }
        });
        return codes.slice().sort(sortByDescription);
    } else {
        return codes.slice().sort(sortByDisplayOrder);
    }
}


export function getClassificationCodeOptions(codeType: string): ((CodeData | Option)[]) {
    let codes: (CodeData | Option)[] = getCodeTableCache()["classificationCodeTables"] ? getCodeTableCache()["classificationCodeTables"][codeType] : [];
    if (!codes) {
        return [];
    }
    return codes.slice().sort(sortByDisplayOrder);
}

export function getIncidentCodeOptions(codeType: string): ((CodeData | Option)[]) {
    let codes = getCodeTableCache()["incidentsCodeTables"] ? getCodeTableCache()["incidentsCodeTables"][codeType] : [];
    if (!codes) {
        return [];
    }

    return codes.slice().sort(sortByDisplayOrder);
}

const codeNA = {
    "code": "NOT_ASSIGNED",
    "description": "Not Assigned",
    "displayOrder": 99999,
    "effectiveDate": moment("1999-01-01").format(DATE_FORMATS.datePickerInput),
    "expiryDate": "9999-12-31"
};

export function getOrgCodeOptions(codeType: string, includeNotAssigned: boolean = false): ((CodeData | Option)[]) {
    let codes = getCodeTableCache()["orgCodeTables"] ? getCodeTableCache()["orgCodeTables"][codeType] : [];
    if (!codes) {
        return [];
    }
    let codesSorted;
    if (codeType == "ZONE_CODE") {
        codesSorted = codes.slice().sort(sortByDescription);
    } else {
        codesSorted =  codes.slice().sort(sortByDisplayOrder);
    }
    if (includeNotAssigned && (codeType == "FIRE_CENTRE_CODE" || codeType == "ZONE_CODE")) {
        codesSorted.push(codeNA);
    }
    return codesSorted;
}

export function getOptionsCodeHierarchyIndex(codeType: string): string[] {
    let codes = getCodeTableCache()['orgCodeHierarchyIndex'] ? getCodeTableCache()['orgCodeHierarchyIndex'][codeType] : [];
    return codes;
}

export function getFCCodeForFZ(fzCode: string): string {
    let codeHierarchy = getOptionsCodeHierarchyIndex('FIRE_CENTRE_ZONE_XREF');
    let fcs = Object.keys(codeHierarchy);
    let fireCentre = null;
    fcs.forEach(fc => {
        if (codeHierarchy[fc].includes(fzCode)) {
            fireCentre = fc;
        }
    });
    return fireCentre;
}

export function getOptionsCodeHierarchyIndexForCode(codeType: string, code: string): string[] {
    let codes = getOptionsCodeHierarchyIndex(codeType);
    return codes && codes[code] ? codes[code].sort(sortByDisplayOrder) : [];
}

export function getScheduleCodeHierarchyIndex(codeType: string): string[] {
    let codes = getCodeTableCache()['scheduleCodeHierarchyIndex'] ? getCodeTableCache()['scheduleCodeHierarchyIndex'][codeType] : [];
    return codes;
}

export function getScheduleCodeHierarchyIndexForCode(codeType: string, code: string): string[] {
    let codes = getScheduleCodeHierarchyIndex(codeType);
    return codes && codes[code] ? codes[code].sort(sortByDisplayOrder) : [];
}

export function getZoneOptions(selectedFireCentre, includeNotAssigned: boolean = false) {
    let allZones = getOrgCodeOptions('ZONE_CODE', includeNotAssigned);
    let ret;
    if (selectedFireCentre) {
        const zoneIdsToDisplay = getOptionsCodeHierarchyIndexForCode('FIRE_CENTRE_ZONE_XREF', selectedFireCentre);
        const zones = allZones ? allZones.filter(zone => zone.code == 'NOT_ASSIGNED' || zoneIdsToDisplay.includes(zone.code)) : [];
        ret = zones;
    } else {
        ret = allZones;
    }
    return ret;
}

export function getAllocationOptions(selectedAvailabilityCode) {
    let allAllocations = getScheduleCodeOptions('ALLOCATION_TYPE_CODE');
    if (selectedAvailabilityCode) {
        const allocationCodesToDisplay = getScheduleCodeHierarchyIndexForCode('AVAIL_ST_ALLOC_TP_XREF', selectedAvailabilityCode);
        const allocations = allAllocations ? allAllocations.filter(allocation => allocationCodesToDisplay.includes(allocation.code)) : [];
        return allocations;
    } else {
        return allAllocations;
    }
}


