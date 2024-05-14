document.addEventListener('DOMContentLoaded', () => {
    userId = 1;
    getCasesWithUsers(); // Hent sager med tilknyttede brugere
});
// Funktion til at hente sager med tilknyttede brugere
function getCasesWithUsers() {
    fetch('http://localhost:3000/api/viewCases')
        .then(response => response.json())
        .then(data => {
            const getCases = data.cases.map(caseData => {
                return {
                    Name: caseData.title,
                    Description: caseData.description,
                    Status: caseData.status,
                    FirstName: caseData.case_master_name,
                    LastName: caseData.case_master_email,
                    CaseId: caseData.case_id
                };
            });
            isDataLoaded = true; // Angiv at data er blevet hentet
            updateCasesView(getCases);
        })
        .catch(error => {
            console.error('Error fetching cases:', error);
        });
}

// Funktion til at opdatere visningen af sager
function updateCasesView(cases) {
    cases.forEach(caseItem => {
        const caseElement = createCaseElement(caseItem);
        const targetId = getTargetId(caseItem.Status);
        const caseListDiv = document.getElementById(targetId);
        // Tilføj "Approve" og "Deny" knapper, hvis status er "Pending Approval"
        if (caseItem.Status === 'Pending Approval') {
            const approveButton = createButton('Approve', 'approve-btn');
            const denyButton = createButton('Deny', 'deny-btn');
            approveButton.addEventListener('click', () => {
                approveCase(userId, caseItem.CaseId); // Godkend sag ved at kalde approveCase-funktionen
            });
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('cell');
            buttonDiv.appendChild(approveButton);
            buttonDiv.appendChild(denyButton);
            caseElement.appendChild(buttonDiv);
        }

        // Tilføj "Connect" knapper, hvis status ikke er "Pending Approval"
        if (caseItem.Status !== 'Pending Approval') {
            const connectUsersButton = createButton('Connect Users', 'connect-users');
            const connectCoursesButton = createButton('Connect Courses', 'connect-courses');
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('cell');
            buttonDiv.appendChild(connectUsersButton);
            buttonDiv.appendChild(connectCoursesButton);
            caseElement.appendChild(buttonDiv);
        }

        caseListDiv.appendChild(caseElement);
    });
}

// Funktion til at oprette HTML-element for en sag
function createCaseElement(caseItem) {
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
    `;
    return caseElement;
}

// Funktion til at oprette en knap
function createButton(text, className) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    return button;
}

// Funktion til at godkende en sag
function approveCase(userId, caseId) {
    let body = JSON.stringify({ userId: userId, caseId: caseId })
    fetch('http://localhost:3000/api/admin/approveCase', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:body // Send both userId and caseId as JSON data
    })
    .then(response => {
        if (response.ok) {
            console.log('Case approved successfully');
            window.location.reload(); // Reload the page after successful approval
        } else {
            throw new Error('Failed to approve case');
        }
    })
    .catch(error => {
        console.error('Error approving case:', error);
    });
}

// Funktion til at bestemme målet for en sag baseret på dens status
function getTargetId(status) {
    switch (status) {
        case 'Not Started':
            return 'not-started-cases';
        case 'Pending Approval':
            return 'approval-cases';
        case 'In Progress':
            return 'ongoing-cases';
        default:
            return 'ongoing-cases'; // Standard til 'Ongoing Cases' hvis status er ukendt
    }
}