import {CHANGE_VIEW_TYPE, EDIT_COURSE, FILTER_VIEW, LOAD_COURSE, SAVE_COURSE, SORT_VIEW} from "../actions/actionTypes";

const initialState = {
    courses: [
        {
            id: 1,
            name: 'Digital Literacy',
            desc: 'Introducing the concept of Digital Literacy. Optimised for mobile.',
            start: '20190712',
            end: '20190802',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: [1]
                },
                {
                    id: 2,
                    name: 'Pass Test',
                    assignees: [1]
                },
                {
                    id: 3,
                    name: 'Read Book',
                    assignees: []
                },
                {
                    id: 4,
                    name: 'Audition',
                    assignees: [2]
                },
            ],
            participants: [1, 2, 3]
        },
        {
            id: 2,
            name: 'Celebrating Cultures',
            desc: 'Mount Orange is proud to have in its community students, teachers, parents and helpers from a wide variety of different cultures. This course, open to anyone, showcases the diversity of our traditions, our language and our landscapes. Please join',
            start: '20190701',
            end: '20190808',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: [1]
                },
                {
                    id: 2,
                    name: 'Prepare project',
                    assignees: [1]
                },
                {
                    id: 3,
                    name: 'Audition',
                    assignees: [1]
                },
                {
                    id: 4,
                    name: 'Write essay',
                    assignees: [1]
                },
            ],
            participants: [1, 3]
        },

        {
            id: 3,
            name: 'History: Russia in Revolution',
            desc: 'This course is designed for students studying Russian history. While it is aimed at British students working towards an examination, the content is suitable for any class studying the subject.',
            start: '20190710',
            end: '20190805',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: []
                },
                {
                    id: 2,
                    name: 'Do homework',
                    assignees: []
                },
                {
                    id: 3,
                    name: 'Read essay',
                    assignees: []
                },
                {
                    id: 4,
                    name: 'Audition',
                    assignees: [1,2]
                },
            ],
            participants: [1, 2, 3]
        },
        {
            id: 4,
            name: 'Psychology in Cinema',
            desc: 'In this course we study three films: Spider, A Beautiful Mind, and Fight Club. The main focus of the course will be the ways in which psychosis is represented in the films in terms of macro, plot, narrative structure and micro etc. We consider the wider cultural meaning and implication of films dealing with psychology.',
            start: '20190802',
            end: '20190812',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: []
                },
                {
                    id: 2,
                    name: 'Audition',
                    assignees: []
                },
                {
                    id: 3,
                    name: 'Lab2',
                    assignees: [1]
                },
                {
                    id: 4,
                    name: 'Coding',
                    assignees: []
                },
            ],
            participants: [1, 3]
        },
        {
            id: 5,
            name: 'Types of Sport',
            desc: 'A course in which you will be introduced to different types of sport and get a feel for how you might enjoy participating in them. Uses the Show one section per page layout.',
            start: '20190715',
            end: '20190727',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: [1]
                },
                {
                    id: 2,
                    name: 'Audition',
                    assignees: [1]
                },
                {
                    id: 3,
                    name: 'Lab1',
                    assignees: [1, 2]
                },
                {
                    id: 4,
                    name: 'File upload',
                    assignees: [2]
                },
            ],
            participants: [1, 2, 3]
        },
        {
            id: 6,
            name: 'CS50\'s Introduction to Computer Science',
            desc: 'An introduction to the intellectual enterprises of computer science and the art of programming.',
            start: '20190713',
            end: '20190827',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: []
                },
                {
                    id: 2,
                    name: 'Audition',
                    assignees: [1]
                },
                {
                    id: 3,
                    name: 'Read wiki',
                    assignees: [1]
                },
                {
                    id: 4,
                    name: 'Analyse news',
                    assignees: []
                },
            ],
            participants: [1, 3]
        },
        {
            id: 7,
            name: 'CS50\'s Mobile App Development with React Native',
            desc: 'Learn about mobile app development with React Native, a popular framework maintained by Facebook that enables cross-platform native apps using JavaScript without Java or Swift.',
            start: '20190813',
            end: '20190829',
            items: [
                {
                    id: 1,
                    name: 'Workshop',
                    assignees: []
                },
                {
                    id: 2,
                    name: 'Audition',
                    assignees: [2]
                },
                {
                    id: 3,
                    name: 'Go to library',
                    assignees: [2]
                },
                {
                    id: 4,
                    name: 'Brainstorm',
                    assignees: []
                },
            ],
            participants: [2, 3]
        }
    ],
    course: null,
    view: {
        filter: 'In progress',
        sort: 'Course name',
        type: 'Card'
    }
};


export default function courseReducer(state = initialState, action) {
    switch (action.type) {
        case FILTER_VIEW:
            return {
                ...state,
                view: {
                    ...state.view,
                    filter: action.filter
                }
            };
        case SORT_VIEW:
            return {
                ...state,
                view: {
                    ...state.view,
                    sort: action.sort
                }
            };
        case CHANGE_VIEW_TYPE:
            return {
                ...state,
                view: {
                    ...state.view,
                    type: action.viewType
                }
            };
        case LOAD_COURSE:
            return {
                ...state,
                course: action.course
            };
        case EDIT_COURSE:
            return {
                ...state,
                course: {...state.course, isEdit: !state.course.isEdit}
            };
        case SAVE_COURSE:
            return {
                ...state,
                course: {
                    ...state.course,
                    ...action.course,
                    isEdit: !state.course.isEdit,
                    isNew: !!state.course.isNew ? false : null
                },
                courses: [
                    ...state.courses.filter(c => c.id !== action.course.id),
                    {
                        ...state.courses.filter(c => c.id === action.course.id)[0],
                        ...action.course
                    }
                ]
            };
        default:
            return state
    }
}