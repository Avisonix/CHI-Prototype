const sqlhandler = require('../model/sqlhandler.js');
const { User } = require('./userController');

//admin class
class Admin extends User {
    constructor(email, password) {
        super(email, password);
    }
    //approve new case
    //req body must include title, description, max_students, case_master_id, status
    //subselect for status_id
    async approveCase(req, res) {
        //todo implement check for role. Express session?
        const userId = req.body.userId;
        if (!userId) {
            return res.send('userId not found');
        }
        //check req.body for caseid
        const caseId = req.body.caseId;
        if (!caseId) {
            return res.send('caseId not found');
        }
        //update valid_to for specific case which makes the row invalid/historic
        sqlhandler(`UPDATE cases SET valid_to = strftime('%Y%m%d', 'now') WHERE case_id = ${caseId} `).then(()=>{
        //insert same case data with
        sqlhandler(`INSERT INTO cases (title, description, max_students, valid_from, fk_case_master, fk_status, valid_to) 
                    SELECT title, description, max_students, /*today*/ strftime('%Y%m%d', 'now'), fk_case_master, 1, 29991231
                    FROM cases 
                    WHERE case_id = ${caseId}`);
        });
        return res.send("Case approved");
    }
    //approve new user to a case
    //might be implemented
    async approveConnections(req, res) {
        const { case_id, user_id } = req.body;
        const insert = await sqlhandler(`INSERT INTO case_connections (fk_case, fk_student) VALUES (?, ?)`, [case_id, user_id]);
        if (insert) {
            res.send('Connection approved');
        } else {
            res.send('Connection failed');
        }
    }
}
module.exports = { Admin }; // Export the Admin class