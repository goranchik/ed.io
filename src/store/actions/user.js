import {
    LOGIN,
    LOGOUT,
    SAVE_COURSE_PARTICIPANTS,
    SAVE_PROFESSOR_COURSE,
    SAVE_STUDENT_GRADE,
    SAVE_STUDENT_PROGRESS
} from "./actionTypes";
import axios from 'axios'

const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const loginPath = 'verifyPassword';
const regPath = 'signupNewUser';
const key = 'type here key';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        };

        const url = `${baseUrl}${(isLogin ? loginPath : regPath)}${key}`;

        const response = await axios.post(url, authData);

        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(login(data.idToken, email));
        dispatch(autoLogout(data.expiresIn));
    }
}

export function login(token, email) {
    return {
        type: LOGIN,
        token,
        email
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const email = localStorage.getItem('email');
                dispatch(login(token, email));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => dispatch(logout()), time * 1000)
    }
}

export function saveProfessorCourse(professorId, courseId) {
    return {
        type: SAVE_PROFESSOR_COURSE,
        professorId,
        courseId
    }
}

export function saveCourseParticipants(courseId, participants) {
    return {
        type: SAVE_COURSE_PARTICIPANTS,
        courseId,
        participants
    }
}

export function saveStudentCourseGrade(userId, courseId, grade) {
    return {
        type: SAVE_STUDENT_GRADE,
        userId,
        courseId,
        grade
    }
}

export function saveStudentCourseProgress(userId, courseId, progress) {
    return {
        type: SAVE_STUDENT_PROGRESS,
        userId,
        courseId,
        progress
    }
}