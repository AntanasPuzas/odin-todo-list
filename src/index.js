// @ts-check

import './styles.css'
import { v4 as uuidv4 } from 'uuid';

/**
 * @param {String} text 
 */
const ChecklistItem = (text) => {
    const _id = uuidv4()

    const getId = () => _id;

    let completed = false;

    const getCompleted = () => completed;

    const toggleCompleted = () => completed = !completed;

    return { text, getCompleted, toggleCompleted, getId }
}

const Checklist = () => {
    const _checklistContainer = {};

    const get = () => _checklistContainer;

    /**
     * @param {ChecklistItem} checklistItem 
     */
    const add = (checklistItem) => _checklistContainer[checklistItem.getId()] = checklistItem;

    const remove = (checklistItemId) => delete _checklistContainer[checklistItemId];

    return { get, add, remove }
}

/**
 * @param {String[] | String} labels
 */
const Labels = (labels) => {
    const _labelContainer = new Set();
    labels instanceof Array
        ? labels.forEach(el => _labelContainer.add(el))
        : labels !== undefined && labels !== null
            ? _labelContainer.add(labels)
            : _labelContainer;

    const get = () => _labelContainer;
    /**
     * @param {String[] | String} newLabels
     */
    const add = (newLabels) => newLabels instanceof Array
        ? newLabels.forEach(el => _labelContainer.add(el))
        : _labelContainer.add(newLabels);

    const remove = (label) => _labelContainer.delete(label);

    return { get, add, remove }
}

/** 
 * @param {String} title 
 * @param {String} description
 * @param {Date} dueDate
 * @param {Number} priority
 * @param {Labels} labels
 */
const Todo = (title, description, dueDate, priority, labels) => {
    const _id = uuidv4();
    const getId = () => _id;

    if (priority > 4) {
        priority = 4;
    } else if (priority < 1) {
        priority = 1;
    }

    const checklist = Checklist();

    const toString = () => {
        return {
            title,
            description,
            dueDate,
            priority,
            id: getId(),
            labels: labels.get(),
            checklist: checklist.get()
        };
    }

    return { title, description, dueDate, priority, getId, labels, checklist, toString };
}

/** 
 * @param {String} title
 */
const Project = (title) => {
    const _id = uuidv4();

    const getId = () => _id;

    const _todos = {};

    /**
     * @param {Todo} todo 
     */
    const add = (todo) => _todos[todo.getId()] = todo;

    /**
     * @param {String} todoId 
     */
    const remove = (todoId) => delete _todos[todoId];

    const get = () => _todos;

    return { title, getId, add, remove, get };
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