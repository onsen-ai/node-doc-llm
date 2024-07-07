const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const _ = require('lodash');
const OpenAI = require('openai');

// Load environment variables from .env file
require('dotenv').config();

/**
 * Parses a JavaScript file and extracts its dependencies.
 *
 * @param {string} fullPath - The full path to the JavaScript file to parse.
 * @returns {string[]} - An array of dependencies.
 */
function parseFileDependencies(fullPath) {
    const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];

    // if extension is not valid, return empty array
    if (!validExtensions.includes(path.extname(fullPath))) {
        return [];
    }

    try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const ast = babelParser.parse(content, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'], // Add other plugins as needed
        });
        const dependencies = [];

        // Traverse the AST to find import/require/export statements
        ast.program.body.forEach((node) => {
            if (node.type === 'ImportDeclaration' || (node.type === 'ExportNamedDeclaration' && node.source)) {
                dependencies.push(node.source.value);
            } else if (node.type === 'VariableDeclaration') {
                node.declarations.forEach((declaration) => {
                    if (
                        declaration.init &&
                        declaration.init.type === 'CallExpression' &&
                        declaration.init.callee.name === 'require'
                    ) {
                        dependencies.push(declaration.init.arguments[0].value);
                    }
                });
            }
        });

        return _.uniq(dependencies.filter((dep) => dep.startsWith('.'))); // Filter external paths;
    } catch (e) {
        console.error(`Error parsing file: ${fullPath}: ${e}`);
        return [];
    }
}
/**
 * Recursively builds a dependency graph starting from the root file.
 * @param {object} options - The options object.
 * @param {string} options.rootFile - The root JavaScript file to start from.
 * @param {string} options.basePath - The directory to resolve paths relative to.
 * @returns {Object} - An array representing the dependency graph.
 */
function buildDependencyGraphRecursive({ basePath, rootFile }) {
    const filesObj = {};
    const visited = new Set();
    const rootFullPath = path.resolve(basePath, rootFile);
    const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];
    // console.log(`Processing root file: ${rootFile}`);

    function traverse(fullPath) {
        let fullPath2 = fullPath;

        // Skip files in node_modules
        if (fullPath.includes('node_modules')) {
            // console.log(`Skipping ${fullPath} (node_modules library)`);
            return;
        }
        // Skip files outside the project directory
        if (!fullPath.startsWith(basePath)) {
            // console.log(`Skipping ${fullPath} (outside project directory)`);
            return;
        }
        // Check if fullPath is a directory
        else if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
            // Attempt to parse index.js file
            fullPath2 = path.join(fullPath, 'index.js');
            if (!fs.existsSync(fullPath2)) {
                // console.log(`Skipping ${fullPath} (directory without index.js)`);
                return;
            }
        }
        // If fullPath does not exist then check valid extensions
        else if (!fs.existsSync(fullPath)) {
            const extension = validExtensions.find((ext) => fs.existsSync(fullPath + ext));
            if (!extension) {
                // console.log(`Skipping ${fullPath} (could not find file)`);
                return;
            }
            fullPath2 = fullPath + extension;
        }

        if (!visited.has(fullPath2)) {
            visited.add(fullPath2);

            let dependencies = parseFileDependencies(fullPath2).map((_dep) => {
                const dep = path.resolve(path.dirname(fullPath2), _dep);

                // Skip files in node_modules or outside the project directory
                if (dep.includes('node_modules')) {
                    return null;
                }
                // Check if fullPath is a directory
                else if (fs.existsSync(dep) && fs.lstatSync(dep).isDirectory()) {
                    // Attempt to parse index.js file
                    const dep2 = path.join(dep, 'index.js');
                    if (fs.existsSync(dep2)) {
                        return dep2;
                    } else {
                        return null;
                    }
                }
                // If fullPath does not exist then check valid extensions
                else if (!fs.existsSync(dep)) {
                    // console.log(`Could not find file: ${dep}`);
                    const extension = validExtensions.find((ext) => fs.existsSync(dep + ext));
                    if (!extension) {
                        // if we can't find the file, return null so we can filter it out later
                        console.log(`Could not find file: ${dep}`);
                        return null;
                    }
                    return dep + extension;
                }
                // Check that the extension is valid
                else if (!validExtensions.includes(path.extname(dep))) {
                    return null;
                }
                return dep;
            });
            // console.log(`\nFound dependencies for ${fullPath2}: ${JSON.stringify(dependencies, null, 2)}`);

            // Remove null values from dependencies
            dependencies = dependencies.filter((dep) => dep !== null);
            // Add file and its dependencies to the graph, using relative paths
            filesObj[path.relative(basePath, fullPath2)] = dependencies.map((dep) => path.relative(basePath, dep));
            dependencies.forEach((dep) => {
                // console.log(`\nProcessing dependency: ${dep}`);
                traverse(dep);
            });
        } else {
            // console.log(`Skipping ${fullPath2} (already processed)`);
        }
    }

    traverse(rootFullPath);
    return filesObj;
}

async function getAiDescription(fullPath, dependencies, level, relativePath) {
    const code = fs.readFileSync(fullPath, 'utf-8');

    // calculate words like this: log(E3)*400+150 (use log with base 10)
    const words = Math.round(Math.log10(level) * 400 + 150);
    const systemMessage = `You are an experienced developer capable of generating README.me content for large code repositories.`;
    const userMessage = `You are given the code for file ${relativePath} enclosed in <CODE></CODE> tags.

Your task is to write a summary of this code, focusing on its purpose and functionality.

Additionally, you have descriptions for the dependencies used in ${relativePath}. Use the descriptions of the dependencies to enhance your summary if necessary, but avoid delving into the implementation details of the dependencies.

Here are the dependencies used in ${relativePath}:
<DEPENDENCIES>
${dependencies ?? 'None'}
</DEPENDENCIES>

Guidelines for the summary:

- It should be suitable for inclusion in a README.md file as a standalone section.
- Write in markdown format.
- Limit your response to ${words} words
- Use concise paragraphs.
- Do not include headings, code snippets
- Limit implementation details of the dependencies unless they are needed to explain the code in the file.

Here is the code for file ${relativePath}:
<CODE>
${code}
</CODE>

Format the response as follows:

### [Brief 20-word summary]
[Detailed description of the code in the file using ${words} words]
`;

    // console.log(`User message: ${userMessage}`);
    // return {
    //     description: `### Summary: Placeholder summary

    // This is a placeholder description for the file ${path.basename(fullPath)}.`,
    //     promptTokens: 0,
    //     completionTokens: 0,
    //     totalTokens: 0,
    //     totalCost: 0,
    // };

    const model = 'gpt-3.5-turbo';
    // const model = 'gpt-4o';

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: systemMessage,
            },
            {
                role: 'user',
                content: userMessage,
            },
        ],
        model: model,
        temperature: 0.2,
    });

    const inputCost = {
        'gpt-4o': 0.005,
        'gpt-3.5-turbo': 0.0005,
    };

    const outputCost = {
        'gpt-4o': 0.015,
        'gpt-3.5-turbo': 0.0015,
    };

    const description = chatCompletion.choices[0].message.content;
    const promptTokens = chatCompletion.usage.prompt_tokens;
    const completionTokens = chatCompletion.usage.completion_tokens;
    const totalTokens = chatCompletion.usage.total_tokens;
    const totalCost =
        Math.round((10000 * (inputCost[model] * promptTokens)) / 1000 + (outputCost[model] * completionTokens) / 1000) /
        10000;

    // log usage and cost
    console.log(
        `Generation stats: Input tokens: ${promptTokens}, Output tokens: ${completionTokens}, Total tokens: ${totalTokens}, Total cost: $${totalCost}`
    );

    // sleep 5 seconds to avoid rate limiting
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return { description, promptTokens, completionTokens, totalTokens, totalCost };
}

async function generateDescriptions(dependencyGraph, basePath, maxGenerations = 5) {
    const descriptions = _.mapValues(dependencyGraph, () => null);
    let promptTokens = 0;
    let completionTokens = 0;
    let totalTokens = 0;
    let totalCost = 0;
    let num = 0;

    // traverse dependencyGraph until you find a leaf node or a node for which you have already generated a description
    const traverse = async (file) => {
        // console.log(`\nTraversing ${file}`);

        // check if we have already generated a description for this file
        if (descriptions[file] !== null) {
            // console.log(`Returning cached description ${descriptions[file]} for ${file}`);
            return descriptions[file];
        }

        if (num > maxGenerations) {
            descriptions[file] = {
                description: 'Exceeded maximum number of generations',
                level: 0,
            };
            return descriptions[file];
        }

        // get dependencies for the file
        const dependencies = dependencyGraph[file];

        // check if file has no dependencies
        if (dependencies.length === 0) {
            num++;
            const progressPerc = num / Object.keys(dependencyGraph).length;

            console.log(`\n${num}. Generating description for ${file} (level 1) [%d%]`, Math.round(progressPerc * 100));
            const {
                description,
                promptTokens: _promptTokens,
                completionTokens: _completionTokens,
                totalTokens: _totalTokens,
                totalCost: _totalCost,
            } = await getAiDescription(path.resolve(basePath, file), null, 1, file);
            descriptions[file] = {
                description: description,
                level: 1,
            };
            promptTokens += _promptTokens;
            completionTokens += _completionTokens;
            totalTokens += _totalTokens;
            totalCost += _totalCost;
            totalCost = Math.round(totalCost * 10000) / 10000;
            // log usage and cost
            console.log(
                `Cumluative stats: Input tokens: ${promptTokens}, Output tokens: ${completionTokens}, Total tokens: ${totalTokens}, Total cost: $${totalCost}, Projected cost: $${
                    Math.round((totalCost / progressPerc) * 10000) / 10000
                }`
            );
            return descriptions[file];
        } else {
            // console.log(`Traversing dependencies of ${file}`);
            const dependencyDescriptions = [];
            let level = 0;
            for (const dep of dependencies) {
                const res = await traverse(dep);
                // console.log(`\n\n---\n\nResult for ${dep}: `, JSON.stringify(res, null, 2));
                const { description, level: _level } = res;
                dependencyDescriptions.push(`
File: ${dep}
Description: ${description}
`);
                level = Math.max(level, _level);
            }
            level += 1;
            num++;
            const progressPerc = num / Object.keys(dependencyGraph).length;
            console.log(
                `\n${num}. Generating description for ${file} (level ${level}) [%d%]`,
                Math.round(progressPerc * 100)
            );
            const {
                description,
                promptTokens: _promptTokens,
                completionTokens: _completionTokens,
                totalTokens: _totalTokens,
                totalCost: _totalCost,
            } = await getAiDescription(path.resolve(basePath, file), dependencyDescriptions.join('\n\n'), level, file);
            descriptions[file] = {
                description: description,
                level: level,
            };
            promptTokens += _promptTokens;
            completionTokens += _completionTokens;
            totalTokens += _totalTokens;
            totalCost += _totalCost;
            totalCost = Math.round(totalCost * 10000) / 10000;
            // log usage and cost
            console.log(
                `Cumluative stats: Input tokens: ${promptTokens}, Output tokens: ${completionTokens}, Total tokens: ${totalTokens}, Total cost: $${totalCost}, Projected cost: $${
                    Math.round((totalCost / progressPerc) * 10000) / 10000
                }`
            );
            return descriptions[file];
        }
    };

    for (const file in dependencyGraph) {
        if (num <= maxGenerations) {
            await traverse(file);
        }
    }

    console.log(`\nNumber of generations: ${num}`);

    return descriptions;
}

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

// Entry point of the script
(async () => {
    const rootFileArg = process.argv[2];
    const outFileArg = process.argv[3];

    // provide usage instructions
    if (!rootFileArg) {
        console.log(`Usage: node index.js <rootFilePath> [outFile]`);
        console.log(`Example: node index.js app/src/index.js DOCUMENTATION.md\n`);
        process.exit(1);
    }

    let rootFilePath;
    try {
        rootFilePath = path.resolve(rootFileArg);
        // try to read file
        fs.readFileSync(rootFilePath);
    } catch (e) {
        console.error(`Error resolving root file path: ${rootFileArg}\n${e}`);
        process.exit(1);
    }

    const basePath = path.dirname(rootFilePath);
    const rootFile = path.basename(rootFilePath);

    console.log(`Root file: ${rootFilePath}`);

    const dependencyGraph = buildDependencyGraphRecursive({
        basePath,
        rootFile,
    });

    // console.log(`\n\n---\n\nResult: `, JSON.stringify(dependencyGraph, null, 2));
    // console.log(Object.keys(dependencyGraph).length);

    // log unique list of dependency extensions
    // const extensions = _.uniq(
    //     _.flatMap(Object.values(dependencyGraph), (deps) => deps.map((dep) => path.extname(dep)))
    // );
    // console.log(`\n\n---\n\nExtensions: `, extensions);

    const descriptions = await generateDescriptions(dependencyGraph, basePath);

    // get section headers
    const sections = _.uniq(Object.keys(dependencyGraph).map((file) => path.dirname(file))).sort();
    // console.log(`\n\n---\n\nRelative paths: `, JSON.stringify(sections, null, 2));

    // organize the descriptions by section
    const descriptionsBySection = {};
    for (const file in descriptions) {
        const section = path.dirname(file);
        if (!descriptionsBySection[section]) {
            descriptionsBySection[section] = [];
        }
        descriptionsBySection[section].push({
            file: file,
            description: descriptions[file]?.description ?? 'No description available',
            level: descriptions[file]?.level ?? 0,
        });
    }

    let markdown = '';
    // add table of contents for sections
    markdown += `# Table of Contents\n\n`;
    sections.forEach((section) => {
        // use snake case for section names - replace spaces with -, and special characters with ''
        const sectionName = (section === '.' ? '(root)' : section).replace(/[^a-zA-Z0-9 ]/g, '');
        markdown += `- [${section === '.' ? '(root)' : section} (${
            descriptionsBySection[section].length
        } files)](#${_.kebabCase(sectionName.toLowerCase())})\n`;
    });
    // iterate over sections and construct markdown
    for (const section of sections) {
        markdown += `# ${section === '.' ? '(root)' : section}\n\n`;
        // add section table of contents
        markdown += `## Section Contents\n\n`;
        descriptionsBySection[section].forEach((file) => {
            const fileName = file.file.replace(/[^a-zA-Z0-9 ]/g, '');
            markdown += `- [${file.file}](#${_.kebabCase(fileName.toLowerCase())})\n`;
        });
        // add back to top link
        markdown += `\n[Back to top](#table-of-contents)\n\n`;
        descriptionsBySection[section].forEach((file) => {
            markdown += `## ${file.file}\n\n${file.description}\n\n`;
            // add back to section link
            const sectionName = (section === '.' ? '(root)' : section).replace(/[^a-zA-Z0-9 ]/g, '');
            markdown += `[Back to ${section === '.' ? '(root)' : section}](#${_.kebabCase(
                sectionName.toLowerCase()
            )}) | `;
            // add back to top link
            markdown += `[Back to top](#table-of-contents)\n\n`;
        });
    }

    // console.log(`\n\n---\n\nMarkdown: `, markdown);

    // save markdown to file
    fs.writeFileSync(outFileArg ?? 'DOCUMENTATION.md', markdown);

    console.log(`\nDocumentation saved to ${outFileArg ?? 'DOCUMENTATION.md'}`);

    console.log(`\nHappy coding!`);
})();
