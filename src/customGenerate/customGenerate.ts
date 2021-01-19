import { TextEncoder } from "util";
import * as vscode from "vscode";
import { generateSCSSFile } from "../common/generateSCSSFile";
import { generateTSXFile } from "../common/generateTSXFile";

export const customGenerate = () =>
  vscode.commands.registerCommand(
    "react-component-generator.custom-generate",
    async (props) => {
      var enc = new TextEncoder();

      const folderName = vscode.workspace
        .asRelativePath(props)
        .split("/")
        .slice(-1)[0];

      let scss = await vscode.window.showQuickPick(["SCSS", "no-style"]);

      if (scss === undefined) {
        return;
      }

      let type = await vscode.window.showQuickPick(["with return", "direct"]);

      if (type === undefined) {
        return;
      }

      let componentName = await vscode.window.showInputBox({
        prompt: "Component name",
      });

      let folder = props.fsPath;

      if (componentName === undefined) {
        return;
      }
      if (!componentName) {
        componentName = folderName;
      } else {
        folder = `${folder}/${componentName}`;
      }

      const tsxFile = vscode.Uri.file(`${folder}/${componentName}.tsx`);

      await vscode.workspace.fs.writeFile(
        tsxFile,
        enc.encode(
          generateTSXFile(componentName, {
            includeSCSS: scss === "SCSS",
            structure: type,
          })
        )
      );

      if (scss === "SCSS") {
        const scssFile = vscode.Uri.file(`${folder}/${componentName}.scss`);
        await vscode.workspace.fs.writeFile(
          scssFile,
          enc.encode(generateSCSSFile(componentName))
        );
      }

      const doc = await vscode.workspace.openTextDocument(tsxFile);

      vscode.window.showTextDocument(doc);

      vscode.window.showInformationMessage(
        `Component ${componentName} created.`
      );
    }
  );
