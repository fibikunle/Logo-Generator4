const inquirer = require('inquirer');
const { writeFile } = require('fs/promises');
const SVG = require('./lib/svg');
const { Circle, Triangle, Square } = require('./lib/shape');

const questions = [
  {
    type: 'input',
    message: 'Enter text for the logo. (Must not be more than 3 characters.)',
    name: 'text',
    validate: (text) => {
      return text.length <= 3 || 'Must not be more than 3 characters.';
    }
  },
  {
    type: 'input',
    message: 'Enter a text color',
    name: 'textColor',
  },
  {
    type: 'list',
    message: 'Select a shape for the logo',
    choices: ['Triangle', 'Circle', 'Square'],
    name: 'shape',
  },
  {
    type: 'input',
    message: 'Enter a shape color',
    name: 'shapeColor',
  },
];

function writeToFile(fileName, data) {
  writeFile(fileName, data, (err) => {
    err ? console.error(err) : console.log('Success!');
  });
}

function init() {
  inquirer.prompt(questions).then((response) => {
    let selectedShape;
    if (response.shape === 'Triangle') {
      selectedShape = new Triangle();
    } else if (response.shape === 'Circle') {
      selectedShape = new Circle();
    } else if (response.shape === 'Square') {
      selectedShape = new Square();
    }
    selectedShape.selectedColor(response.shapeColor);
    let svg = new SVG();
    svg.selectedShape(selectedShape);
    svg.setText(response.text, response.textColor);
    return writeToFile('./output/logo.svg', svg.render());
  }).then(() => {
    console.log('Logo generated!');
  });
}

init();
