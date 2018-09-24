let tasks = [
    { name: 'algfriday', depends: [] },
    { name: 'dinner', depends: [] },
    { name: 'sweep', depends: [] },
    { name: 'interview', depends: ['dinner', 'algfriday'] },
    { name: 'mop', depends: ['sweep', 'dinner'] },
    { name: 'chores', depends: ['mop', 'interview'] },
];

let orderByDependencies = tasks => {
    let results = [];
    let testNode = node => {
        let match = true;
        node.depends.forEach(depend => {
            if (results.includes(depend) === false) {
                match = false
            }
        })
        return match;
    };
    while (tasks.length > 0) {
        tasks = tasks.filter(node => {
            if (testNode(node)) {
                results.push(node.name);
                return false
            } else { return true }
        })  
    };
    return results;
};
console.log(orderByDependencies(tasks))


//Jonathan's solution:

let newTasks = {
    algfriday: [], 
    sweep: [], 
    interview: ['dinner', 'algfriday'], 
    mop: ['sweep', 'dinner'], 
    dinner: [], 
    chores: ['mop', 'interview'] 
}

let order = (tasks) => {
    let visited = [];
    let taskNames = Object.keys(tasks);
    let taskCount = taskNames.length;

    for (let i = 0; i < taskCount; i++) {
        let taskToDo = taskNames.find(task => 
            tasks[task].every(subtask =>
            visited.includes(subtask))
        );
        visited.push(taskToDo);
        taskNames = taskNames.filter(task => task !== taskToDo);
    };
    return visited;
}

console.log(order(newTasks))


let recursiveOrder = (tasks, start) => {
    let done = new Set();
    let doer = task => {
        console.log(1)
        tasks[task].forEach(subtask => doer(subtask));
        done.add(task);
    };
    doer(start);
    return done;
};

console.log(recursiveOrder(newTasks, "chores"))