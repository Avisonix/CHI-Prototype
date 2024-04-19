document.addEventListener('DOMContentLoaded', () => {
    getOngoingCases();
    getNotStartedCases();
    getApprovalCases();
    getCasesWithUsers();
});
function getCasesWithUsers() {
    fetch('/api/cases-with-users')
        .then(response => response.json())
        .then(cases => {
            updateCasesView(cases, 'case-list');
        })
        .catch(error => {
            console.error('Error fetching cases with users:', error);
        });
}
// Function to fetch ongoing cases from the API
function getOngoingCases() {
    fetch('/api/ongoing-cases')
        .then(response => response.json())
        .then(cases => {
            updateCasesView(cases, 'ongoing-cases');
        })
        .catch(error => {
            console.error('Error fetching ongoing cases:', error);
        });
}

// Function to fetch not started cases from the API
function getNotStartedCases() {
    fetch('/api/not-started-cases')
        .then(response => response.json())
        .then(cases => {
            updateCasesView(cases, 'not-started-cases');
        })
        .catch(error => {
            console.error('Error fetching not started cases:', error);
        });
}

// Function to fetch approval cases from the API
function getApprovalCases() {
    fetch('/api/approval-cases')
        .then(response => response.json())
        .then(cases => {
            updateCasesView(cases, 'approval-cases');
        })
        .catch(error => {
            console.error('Error fetching approval cases:', error);
        });
}

// Function to update the view with the retrieved cases
function updateCasesView(cases, targetId) {
    const caseListDiv = document.getElementById(targetId);

    caseListDiv.innerHTML = '';

    cases.forEach(caseItem => {
        const caseElement = document.createElement('div');
        caseElement.classList.add('case');
        caseElement.innerHTML = `
            <div class="cell">
                <h3>${caseItem.Name}</h3>
                <p>Status: ${caseItem.Status}</p>
            </div>
            <div class="cell">
                <p>Description: ${caseItem.Description}</p>
                <p>Assigned Users:</p>
                <ul>
                    ${caseItem.FirstName && caseItem.LastName ?
                        `<li>${caseItem.FirstName} ${caseItem.LastName}</li>` :
                        '<li>No assigned users</li>'}
                </ul>
                <a href="#">View Full Case</a>
            </div>
            <div class="cell">
                <button class="connect-users">Connect Users</button>
                <button class="connect-courses">Connect Courses</button>
            </div>
        `;
        caseListDiv.appendChild(caseElement);
    });
}