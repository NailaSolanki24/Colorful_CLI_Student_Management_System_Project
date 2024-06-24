#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.italic.redBright("\n\t<------------WELCOME TO NAILA SOLANKI'S CLI-STUDENT MANAGEMENT SYSTEM PROJECT------------>\n"));


const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "students",
    type: "input",
    message: (chalk.bold.greenBright("Enter Student Name")),
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please Enter a Non-Empty Value.";
    },
  },
  {
    name: "courses",
    type: "list",
    message: (chalk.bold.greenBright("Select The Course To Enrolled")),
    choices: ["MS.Office", "HTML", "JavaScript", "TypeScript", "Python"],
  },
]);

const tuitionFee: { [key: string]: number } = {
  "MS.Office": 2000,
  "HTML": 4000,
  "JavaScript": 6000,
  "TypeScript": 8000,
  "Python": 10000,
};
console.log(`\nTuition Fees: ${tuitionFee[answer.courses]}.\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: (chalk.bold.greenBright("Select Payment Method :")),
    choices: ["Bank Transfer", "Jazzcash", "Easypaisa"],
  },
  {
    name: "amount",
    type: "input",
    message: (chalk.bold.blueBright("Transfer Money:")),
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please Enter a Non-Empty Value.";
    },
  },
]);
console.log(chalk.bold.greenBright((`\nYou Select Payment Method ${paymentType.payment}\n`)));

const tuitionFees = tuitionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (tuitionFees === paymentAmount) {
  console.log(chalk.bold.magentaBright(
    `Congratulations, Yoy have Successfully Enrolled in ${answer.courses}.\n`
  ));

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: (chalk.bold.greenBright("What Would You Like TO Do Next?")),
      choices: ["VIEW STATUS", "EXIT"],
    }
  ]);

  if (ans.select === "VIEW STATUS") {
    console.log(chalk.bold.italic.red("\n----------Status----------\n"));
    console.log(chalk.bold.italic.blue(`Student Name: ${answer.students}`));
    console.log(chalk.bold.italic.blue(`Student ID: ${randomNumber}`));
    console.log(chalk.bold.italic.blue(`Course: ${answer.courses}`));
    console.log(chalk.bold.italic.blue(`Tuition Fee Paid: ${paymentAmount}`));
    console.log(chalk.bold.italic.blue(`Balance: ${(myBalance += paymentAmount)}`));
  } else {
    console.log(chalk.bold.yellowBright("\nExiting Student Management System\n"));
  }
} else {
  console.log(chalk.bold.redBright("Invalid Amount Due To Course\n"));
}
