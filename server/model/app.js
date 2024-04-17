// Case klasse
class Case {
    constructor(id, name, description, status, createdBy, maxStudents) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.createdBy = createdBy;
        this.maxStudents = maxStudents;
    }
}

// User klasse
class User {
    constructor(id, firstName, lastName, email, password, gender, role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.role = role;
    }
}
module.exports = { Case, User };

// Database klasse
class Database {
    constructor() {
        // Her kan du initialisere forbindelsen til din SQLite-database
    }

    // Metode til at hente sager fra databasen
    getCases() {
        // Implementer logikken for at hente sager fra databasen her
    }

    // Metode til at hente brugere fra databasen
    getUsers() {
        // Implementer logikken for at hente brugere fra databasen her
    }

    // Metode til at opdatere en sag i databasen
    updateCase(caseId, updatedData) {
        // Implementer logikken for at opdatere en sag i databasen her
    }

    // Metode til at opdatere en bruger i databasen
    updateUser(userId, updatedData) {
        // Implementer logikken for at opdatere en bruger i databasen her
    }
}

// UIController klasse
class UIController {
    constructor() {
        // Her kan du initialisere UI-elementer og lytte efter brugerinteraktioner
    }

    // Metode til at opdatere visningen med sager
    updateCasesView(cases) {
        // Implementer logikken for at opdatere visningen med sager her
    }

    // Metode til at opdatere visningen med brugere
    updateUsersView(users) {
        // Implementer logikken for at opdatere visningen med brugere her
    }

    // Metode til at håndtere brugerinteraktioner, f.eks. klik på en sag
    handleCaseClick(caseId) {
        // Implementer logikken for at håndtere klik på en sag her
    }

    // Metode til at håndtere brugerinteraktioner, f.eks. klik på en bruger
    handleUserClick(userId) {
        // Implementer logikken for at håndtere klik på en bruger her
    }
}