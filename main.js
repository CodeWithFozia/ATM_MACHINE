import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 5000;
let myPin = 1234;
// Print welcome message
console.log(chalk.bold(chalk.yellowBright(chalk.italic("\n \tWelcome to ATM Machine\n"))));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: (chalk.red(chalk.italic("Enter your pin code: ")))
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green(chalk.italic("\nPin is correct,login successfully!\n")));
    console.log(chalk.green(chalk.italic(`current Account Balance is ${myBalance}`)));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: (chalk.italic(chalk.red("Select an operation:"))),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: (chalk.red(chalk.italic("Select a withdrawal method:"))),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: (chalk.red(chalk.italic("Select Amount:"))),
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.blueBright(chalk.italic("Insufficient Balance")));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.green(chalk.italic(`${fastCashAns.fastCash} withdraw Successfully`)));
                console.log(chalk.green(chalk.italic(`Your Remaining Balance is: ${myBalance}`)));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: (chalk.red(chalk.italic("Enter the amount to withdraw:")))
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.blueBright(chalk.italic("Insufficient Balance")));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.green(chalk.italic(`${amountAns.amount} withdraw successfully`)));
                console.log(chalk.green(chalk.italic(`your Remaining Balance is: ${myBalance}`)));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.green(chalk.italic(`Your Account Balance is ${myBalance}`)));
    }
}
else {
    console.log(chalk.green(chalk.italic("Pin is Incorrect, Try Again!")));
}
