import inquirer from "inquirer";

let todos = new Map<number, string>();
let id = 0;

async function createTodo() {
  let continueFlag: boolean;

  do {
    let answers = await inquirer.prompt({
      type: "list",
      message: "Select an operation",
      name: "select",
      choices: ["add", "update", "view", "delete", "exit"],
    });

    if (answers.select === "add") {
      let addTodo = await inquirer.prompt({
        type: "input",
        message: "Add item to the list",
        name: "todo",
      });
      todos.set(id++, addTodo.todo);
      console.log(Array.from(todos.values()));
    } else if (answers.select === "update") {
      let updatetodo = await inquirer.prompt({
        type: "list",
        message: "Select an item to update",
        name: "todo",
        choices: Array.from(todos.entries()).map(([key, value]) => ({
          name: value,
          value: key,
        })),
      });
      let newTodo = await inquirer.prompt({
        type: "input",
        message: "Enter the new item",
        name: "todo",
      });
      todos.set(updatetodo.todo, newTodo.todo);
      console.log(Array.from(todos.values()));
    } else if (answers.select === "view") {
      console.log("*** TO DO LIST ***");
      console.log(Array.from(todos.values()));
      console.log("******************");
    } else if (answers.select === "delete") {
      let deletetodo = await inquirer.prompt({
        type: "list",
        message: "Select an item to delete",
        name: "todo",
        choices: Array.from(todos.entries()).map(([key, value]) => ({
          name: value,
          value: key,
        })),
      });
      todos.delete(deletetodo.todo);
      console.log(Array.from(todos.values()));
    } else if (answers.select === "exit") {
      continueFlag = false;
      break;
    }

    let continueAnswer = await inquirer.prompt({
      type: "confirm",
      message: "Do you want to continue?",
      name: "continue",
    });
    continueFlag = continueAnswer.continue;
  } while (continueFlag);
}

createTodo();
