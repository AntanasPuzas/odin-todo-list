// @ts-check

import './styles.css'
import { v4 as uuidv4 } from 'uuid';

// 1 <= priority <= 4
/** 
 * @param {String} title 
 * @param {String} description
 * @param {Date} dueDate
 * @param {Number} priority
 * @param {String[] | String} labels
 */
const Todo = (title, description, dueDate, priority, labels) => {
    const _labelContainer = [];
    labels instanceof Array
        ? _labelContainer.push(...labels)
        : _labelContainer.push(labels);

    const _id = uuidv4();
    const getId = () => _id;

    const getLabels = () => _labelContainer;
    /**
     * @param {String[] | String} newLabels
     */
    const addLabels = (newLabels) => newLabels instanceof Array
        ? _labelContainer.push(...newLabels)
        : _labelContainer.push(newLabels);



    return { title, description, dueDate, priority, getLabels, addLabels, getId };
}

/** 
 * @param {String} title
 */
const Project = (title) => {
    const _todos = [];

    const getTitle = () => title;

    /** 
     * @param {String} newTitle
     */
    const setTitle = (newTitle) => title = newTitle;

    const getTodos = () => _todos;

    /**
     * @param {Todo} todo 
     */
    const addTodo = (todo) => { _todos.push(todo) }

    return { getTitle, setTitle, getTodos, addTodo };
}

/**
 * @param {Project[] | Project} projects 
 */
const ProjectContainer = (projects) => {
    const _projectContainer = [];
    projects instanceof Array
        ? _projectContainer.push(...projects)
        : _projectContainer.push(projects);

    const getProjects = () => _projectContainer;
    /**
     * @param {Project[] | Project} newProjects
     */
    const addProjects = (newProjects) => newProjects instanceof Array
        ? _projectContainer.push(...newProjects)
        : _projectContainer.push(newProjects);

    return { getProjects, addProjects }
}