const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function addManger() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name?",
            validate: (user_input) => {
                return !user_input.length ? 'You must enter at least one character.' : true;
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the team manager's id?",
            validate: (user_input) => {
                return (typeof user_input !== "number") ? true : "Input is not a number";
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email?",
            validate: (email) => {
                // Check if the user input is a valid email
                let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(email) ? true : "Invalid email";
            }
        },
        {
            type: 'input',
            name: 'office_number',
            message: "What is the team manager's office number?",
            validate: (user_input) => {
                return !user_input.length ? 'You must enter at least one character.' : true;
            }
        }
    ]).then(res => {
        const newManager = new Manager(res.name, res.id, res.email, res.office_number);
        team.push(newManager);
        addTeamMember();
    })
}

function addTeamMember() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which type of team member would you like to add?',
            choices: ["Engineer", "Intern", "I don't want to add any more team members"]
        }
    ]).then(res => {
        if (res.role === "Engineer") {
            addEngineer();
        } else if (res.role === "Intern") {
            addIntern();
        } else {
            console.log(team);
            writeToFile(outputPath, render(team));
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your engineer's name?",
            validate: (user_input) => {
                return !user_input.length ? 'You must enter at least one character.' : true;
            }

        },
        {
            type: 'input',
            name: 'id',
            message: "What is your engineer's id?",
            validate: (user_input) => {
                return (typeof user_input !== "number") ? true : "Input is not a number";
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your engineer's email?",
            validate: (email) => {
                // Check if the user input is a valid email
                let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(email) ? true : "Invalid email";
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is your engineer's GitHub username?",
            validate: (user_input) => {
                return !user_input.length ? 'You must enter at least one character.' : true;
            }
        }
    ]).then(res => {
        const newEngineer = new Engineer(res.name, res.id, res.email, res.github);
        team.push(newEngineer);
        addTeamMember();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your intern's name?",
            validate: (user_input) => {
                return !user_input.length ? 'You must enter at least one character.' : true;
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your intern's id?",
            validate: (user_input) => {
                return (typeof user_input !== "number") ? true : "Input is not a number";
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your intern's email?",
            validate: (email) => {
                // Check if the user input is a valid email
                let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(email) ? true : "Invalid email";
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What is your intern's school?",
            validate: (user_input) => {
                return !user_input.length ? 'You must enter at least one character.' : true;
            }
        }
    ]).then(res => {
        const newIntern = new Intern(res.name, res.id, res.email, res.school);
        team.push(newIntern);
        addTeamMember();
    })
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data,
        (err) => err ? console.error(err) : console.log("\nYour team has been created!"))
}

addManger();