import { spawn } from 'child_process';

const test = ''

export const renderMarkdown = async () => {




    return new Promise<string>((resolve, reject) => {
        const child = spawn("pandoc", ["README.md", "--to", "html"]);
    
        let output = "";
        let error = "";
    
        child.stdout.on("data", (data) => {
        output += data;
        });
    
        child.stderr.on("data", (data) => {
        error += data;
        });
    
        child.on("close", (code) => {
        if (code === 0) {
            resolve(output);
        } else {
            reject(new Error(`Failed to render markdown: ${error}`));
        }
        });
    });
}
