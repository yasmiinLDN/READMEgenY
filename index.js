const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const path = require('path'); // Importing the path module

const writeFileAsync = util.promisify(fs.writeFile);

const init = () =>
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is your project name?',
        },
        {
            type: 'input',
            name: 'repo',
            message: 'enter your repository url.',
        },
        {
            type: 'input',
            name: 'ssh',
            message: 'enter the ssh url of you repository.',
        },
        {
            type: 'input',
            name: 'purpose',
            message: 'Describe the function of your project. What does it do?',
        },
        {
            type: 'input',
            name: 'usefulness',
            message: 'Describe why the project is useful?',
        },
        {
            type: 'input',
            name: 'credits',
            message: 'List any people or sources (including links) which contributed to your project.',
        },
        {
            type: 'checkbox',
            message: 'Which software license would you like to use for this project?',
            name: 'license',
            choices: ['MIT', 'Apache_2.0'],
        },
        {
            type: 'checkbox',
            message: 'Which languages did you use for this project?',
            name: 'language',
            choices: ['HTML', 'CSS', 'JS'],
            response: 'array',
        },
        {
            type: 'input',
            message: 'Provide a description of your project and its features',
            name: 'description',
        },
        {
            type: 'input',
            message: 'Describe the features of your project.',
            name: 'features',
        },
        {
            type: 'input',
            message: 'Include some test information for your project.',
            name: 'test',
        },
        {
            type: 'input',
            message: 'Include some code as well.',
            name: 'code',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username.',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address.',
        },
    ]);

// function to write README file
const writeToFile = (data) =>
    `# Module 11 Challenge: ${data.title}

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Badges](#badges)
* [Description](#description)
* [Tests](#tests)
* [Questions](#questions)

## Installation
<br>

1. Navigate to the repository using the link below: 

\`\`\`sh
${data.repo}
\`\`\`
<br>

2. Click the green "< > Code" button to copy the SSH key related to the repository
<br>

3. Clone the repository into your local machine using the below command entered into the command line (assuming you have set up your SSH connection correctly to connect your GitHub account to your local machine):
<br>
\`\`\`sh
git clone ${data.ssh}
\`\`\`


## Usage 

##### What the project does: ${data.purpose}

##### Why the project is useful: ${data.usefulness}


## Credits

This document was created with inspiration and assistance from the following people and/or sources: ${data.credits}


## License

This document is distributed under the following license:

[![License](https://img.shields.io/badge/License-${data.license}-blue.svg)](https://opensource.org/licenses/${data.license})

Please see LICENSE.txt for more information.

## Badges

| ${data.language[0]}            | ![${data.language[0]}](https://img.shields.io/badge/${data.language[0]}-bd7dbd?&style=for-the-badge&logo=${data.language[0]}&logoColor=white)   

## Description
- ${data.description}

#### Main website features:
* ${data.features}

## Tests
${data.test}
${data.code}

## Questions
If you have any questions about the project, feel free to contact the creator of the repo:

<a href="mailto:${data.email}" target="_blank">
<img src="https://img.shields.io/badge/Email-3F468F?&style=for-the-badge&logo=Email&logoColor=white" alt="${data.name}'s email" />
</a> 
<br>
<a href="https://github.com/${data.github}" target="_blank">
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="${data.name}'s  Github profile" />
</a> `;

const filename = path.basename('./README.md');

init().then((data) =>
    writeFileAsync(filename, writeToFile(data))
        .then(() => console.log('Successfully wrote a README.md file'))
        .catch((err) => console.error(err))
);