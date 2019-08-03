import {CHANGE_VIEW_TYPE, EDIT_COURSE, FILTER_VIEW, LOAD_COURSE, SAVE_COURSE, SORT_VIEW} from "./actionTypes";


export function filterView(filter) {
    return {
        type: FILTER_VIEW,
        filter
    }
}

export function sortView(sort) {
    return {
        type: SORT_VIEW,
        sort
    }
}

export function changeViewType(type) {
    return {
        type: CHANGE_VIEW_TYPE,
        viewType: type
    }
}

export function loadCourse(course) {
    return {
        type: LOAD_COURSE,
        course
    }
}

export function editCourse() {
    return {
        type: EDIT_COURSE
    }
}

export function saveCourse(course) {
    return {
        type: SAVE_COURSE,
        course
    }
}