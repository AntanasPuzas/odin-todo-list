import './styles.css'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const ChecklistItem = (text) => {
    const _id = uuidv4()

    const getId = () => _id;

    let completed = false;

    const getCompleted = () => completed;

    const toggleCompleted = () => completed = !completed;

    return { text, getCompleted, toggleCompleted, getId }
}

const Checklist = () => {
    const _checklistContainer = [];

    const get = () => _checklistContainer;

    const add = (checklistItem) => _checklistContainer.push(checklistItem);

    const _getIndex = (checklistItemId) => _.findIndex(_checklistContainer, (el) => {
        return el.getId() === checklistItemId;
    });

    const remove = (checklistItemId) => {
        const index = _getIndex(checklistItemId);

        _checklistContainer.splice(index, 1);
    }

    const moveItemUp = (checklistItemId) => {
        const index = _getIndex(checklistItemId);
        if (index > 0) {
            [_checklistContainer[index], _checklistContainer[index - 1]] =
                [_checklistContainer[index - 1], _checklistContainer[index]];
        }
    }

    const moveItemDown = (checklistItemId) => {
        const index = _getIndex(checklistItemId);
        if (index < _checklistContainer.length - 1) {
            [_checklistContainer[index], _checklistContainer[index + 1]] =
                [_checklistContainer[index + 1], _checklistContainer[index]];
        }
    }

    const getItem = (checklistItemId) => _checklistContainer[_getIndex(checklistItemId)];

    return { get, add, remove, moveItemUp, moveItemDown, getItem }
}

const Labels = (labels) => {
    const _labelContainer = new Set();
    labels instanceof Array
        ? labels.forEach(el => _labelContainer.add(el))
        : labels !== undefined && labels !== null
            ? _labelContainer.add(labels)
            : _labelContainer;

    const get = () => _labelContainer;

    const add = (newLabels) => newLabels instanceof Array
        ? newLabels.forEach(el => _labelContainer.add(el))
        : _labelContainer.add(newLabels);

    const remove = (label) => _labelContainer.delete(label);

    return { get, add, remove }
}

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

const Project = (title) => {
    const _id = uuidv4();

    const getId = () => _id;

    const _todos = {};

    const add = (todo) => _todos[todo.getId()] = todo;

    const remove = (todoId) => delete _todos[todoId];

    const get = () => _todos;

    return { title, getId, add, remove, get };
}

const ProjectContainer = (projects) => {
    const _projectContainer = [];
    projects instanceof Array
        ? _projectContainer.push(...projects)
        : _projectContainer.push(projects);

    const getProjects = () => _projectContainer;

    const addProjects = (newProjects) => newProjects instanceof Array
        ? _projectContainer.push(...newProjects)
        : _projectContainer.push(newProjects);

    return { getProjects, addProjects }
}