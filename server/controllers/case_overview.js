function getUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            updateUsersView(users);
        })
        .catch(error => {
            console.error('Fejl ved hentning af brugerdata:', error);
        });
}

function getCases() {
    fetch('/api/cases')
        .then(response => response.json())
        .then(cases => {
            updateCasesView(cases);
        })
        .catch(error => {
            console.error('Fejl ved hentning af sagsdata:', error);
        });
}
function updateUsersView(users) {
    const userListDiv = document.getElementById('user-list');

    userListDiv.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = `${user.firstName} ${user.lastName}`;
        userListDiv.appendChild(userElement);
    });
}
function updateCasesView(cases) {
    const caseListDiv = document.getElementById('case-list');

    caseListDiv.innerHTML = '';

    cases.forEach(case => {
        const caseElement = document.createElement('div');
        caseElement.textContent = case.name;
        caseListDiv.appendChild(caseElement);
    });
}