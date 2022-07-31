import './styles.css'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Collection = (collection) => {
    const get = () => collection;

    const add = (item) => collection.push(item);

    const _getIndex = (itemId) => _.findIndex(collection, (el) => {
        return el.getId() === itemId;
    });

    const shiftItemUp = (itemId) => {
        const index = _getIndex(itemId);
        if (index > 0) {
            [collection[index], collection[index - 1]] =
                [collection[index - 1], collection[index]];
        }
    }

    const shiftItemDown = (itemId) => {
        const index = _getIndex(itemId);
        if (index < collection.length - 1) {
            [collection[index], collection[index + 1]] =
                [collection[index + 1], collection[index]];
        }
    }

    const remove = (itemId) => {
        const index = _getIndex(itemId);

        collection.splice(index, 1);
    }

    const getItem = (itemId) => collection[_getIndex(itemId)];

    return { get, add, shiftItemUp, shiftItemDown, remove, getItem }
}

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

    const { get } = Collection(_checklistContainer);
    const { add } = Collection(_checklistContainer);
    const { shiftItemUp } = Collection(_checklistContainer);
    const { shiftItemDown } = Collection(_checklistContainer);
    const { remove } = Collection(_checklistContainer);
    const { getItem } = Collection(_checklistContainer);

    return { get, add, remove, shiftItemUp, shiftItemDown, getItem }
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

    const _todos = [];

    const { add } = Collection(_todos);
    const { remove } = Collection(_todos);
    const { get } = Collection(_todos);
    const { shiftItemUp } = Collection(_todos);
    const { shiftItemDown } = Collection(_todos);
    const { getItem } = Collection(_todos);

    return { title, getId, add, remove, get, getItem };
}

const ProjectContainer = () => {
    const _projects = [];

    const { get } = Collection(_projects);
    const { add } = Collection(_projects);
    const { remove } = Collection(_projects);
    const { getItem } = Collection(_projects);
    const { shiftItemDown } = Collection(_projects);
    const { shiftItemUp } = Collection(_projects)

    return { get, getItem, add, remove, shiftItemUp, shiftItemDown }
}