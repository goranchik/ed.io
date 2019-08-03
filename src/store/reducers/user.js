import {
    LOGIN,
    LOGOUT,
    SAVE_COURSE_PARTICIPANTS, SAVE_PROFESSOR_COURSE,
    SAVE_STUDENT_GRADE,
    SAVE_STUDENT_PROGRESS
} from "../actions/actionTypes";

const initialState = {
    users: [
        {
            id: 1,
            email: 'testStudent@test.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'student',
            level: 6,
            grade: 80.7,
            courses: [
                {
                    id: 1,
                    progress: 30,
                    grade: 43
                },
                {
                    id: 2,
                    progress: 47,
                    grade: 80
                },
                {
                    id: 3,
                    progress: 12,
                    grade: 55
                },
                {
                    id: 4,
                    progress: 67,
                    grade: 40
                },
                {
                    id: 5,
                    progress: 47,
                    grade: 80
                },
                {
                    id: 6,
                    progress: 80,
                    grade: 90
                }
            ]
        },
        {
            id: 2,
            email: 'testStudent2@test.com',
            firstName: 'Jack',
            lastName: 'Snow',
            role: 'student',
            level: 4,
            grade: 63.2,
            courses: [
                {
                    id: 1,
                    progress: 30,
                    grade: 33
                },
                {
                    id: 3,
                    progress: 22,
                    grade: 56
                },
                {
                    id: 5,
                    progress: 89,
                    grade: 70
                },
                {
                    id: 7,
                    progress: 20,
                    grade: 30
                }
            ]
        },
        {
            id: 3,
            email: 'testProfessor@test.com',
            firstName: 'Dr. Albert',
            lastName: 'Einstein',
            role: 'professor',
            courses: [
                {id: 1, progress: 10},
                {id: 2, progress: 20},
                {id: 3, progress: 30},
                {id: 4, progress: 40},
                {id: 5, progress: 50},
                {id: 6, progress: 60},
                {id: 7, progress: 70}
            ]
        }
    ],
    userId: 1,
    isAuthenticated: false
};


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.token,
                isAuthenticated: true,
                userId: state.users.filter(u => u.email === action.email)[0].id
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                userId: null
            };
        case SAVE_COURSE_PARTICIPANTS:
            return {
                ...state,
                users: [
                    ...state.users.filter(u => !action.participants.filter(p => p === u.id)[0])
                        .map(user => (
                            {
                                ...user,
                                courses: user.courses.filter(c => c.id !== action.courseId)
                            })),
                    ...state.users.filter(u => action.participants.filter(p => p === u.id)[0])
                        .map(user => (
                            {
                                ...user,
                                courses: [
                                    ...user.courses,
                                    !user.courses.filter(c => c.id === action.courseId).length
                                        ? {id: action.courseId, progress: 0, grade: 0}
                                        : null
                                ].filter(c => !!c)
                            }))
                ]
            };
        case SAVE_STUDENT_GRADE:
            return {
                ...state,
                users: [
                    ...state.users.filter(u => u.id !== action.userId),
                    {
                        ...state.users.filter(u => u.id === action.userId)
                            .map(user => ({
                                ...user,
                                courses: [
                                    ...user.courses.filter(c => c.id !== action.courseId),
                                    {
                                        ...user.courses.filter(c => c.id === action.courseId)[0],
                                        grade: action.grade
                                    }
                                ]
                            }))[0]
                    }
                ]
            };
        case SAVE_STUDENT_PROGRESS:
            return {
                ...state,
                users: [
                    ...state.users.filter(u => u.id !== action.userId),
                    {
                        ...state.users.filter(u => u.id === action.userId)
                            .map(user => ({
                                ...user,
                                courses: [
                                    ...user.courses.filter(c => c.id !== action.courseId),
                                    {
                                        ...user.courses.filter(c => c.id === action.courseId)[0],
                                        progress: action.progress
                                    }
                                ]
                            }))[0]
                    }
                ]
            };
        case SAVE_PROFESSOR_COURSE:
            return {
                ...state,
                users: [
                    ...state.users.filter(u => u.id !== action.professorId),
                    {
                        ...state.users.filter(u => u.id === action.professorId)
                            .map(user => ({
                                ...user,
                                courses: [
                                    ...user.courses,
                                    !user.courses.filter(c => c.id === action.courseId).length
                                        ? {id: action.courseId, progress: 0}
                                        : null
                                ].filter(c => !!c)
                            }))[0]
                    }
                ]
            };
        default:
            return state
    }
}
