let tasks = [
    { name: 'algfriday', depends: [] },
    { name: 'dinner', depends: [] },
    { name: 'sweep', depends: [] },
    { name: 'interview', depends: ['dinner', 'algfriday'] },
    { name: 'mop', depends: ['sweep', 'dinner'] },
    { name: 'chores', depends: ['mop', 'interview'] },
]

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

