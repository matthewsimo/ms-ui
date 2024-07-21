import { exec } from "child_process";

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setActionType("runCommand", function (_answers, config) {
    return new Promise((resolve, reject) => {
      exec(config.command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          reject(error);
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          reject(new Error(stderr));
        }
        console.log(`Result: ${stdout}`);
        resolve(stdout);
      });
    });
  });

  plop.setGenerator("component", {
    description: "scaffold a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
      {
        type: "confirm",
        name: "hasVariants",
        message: "Does this component have variants?",
      },
      {
        type: "confirm",
        name: "isShadCN",
        message: "Is this a shadcn/ui component?",
      },
      {
        type: "input",
        name: "shadName",
        message: "What is the name of the shadcn/ui component?",
        default: (answers) => answers.name,
        when: (answers) => answers.isShadCN,
      },
    ],
    actions: (answers) => {
      const actions = [
        {
          type: "add",
          path: "./src/components/{{kebabCase name}}/index.ts",
          templateFile: "templates/component.index.hbs",
        },
        {
          type: "add",
          path: "./src/components/{{kebabCase name}}/{{kebabCase name}}.stories.ts",
          templateFile: "templates/component.stories.hbs",
        },
      ];

      if (answers.hasVariants) {
        actions.push({
          type: "add",
          path: "./src/components/{{kebabCase name}}/{{kebabCase name}}.cva.ts",
          templateFile: "templates/component.cva.hbs",
        });
      }

      if (!answers.isShadCN) {
        actions.push({
          type: "add",
          path: "./src/components/{{kebabCase name}}/{{kebabCase name}}.tsx",
          templateFile: "templates/component.hbs",
        });
      } else {
        actions.push({
          type: "runCommand",
          command: `bun run add:ui --path src/components/${answers.shadName} ${answers.shadName}`,
        });
      }

      return actions;
    },
  });
}
