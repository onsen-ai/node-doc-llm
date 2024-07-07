# node-doc-llm

## Overview

This script is designed to automatically generate detailed documentation for a JavaScript/TypeScript codebase by parsing the dependencies of each file and using OpenAI's API to generate descriptions. The primary functionality includes parsing files to extract dependencies, building a dependency graph, and generating documentation sections for each file.

## Features

-   Parses JavaScript and TypeScript files to extract dependencies.
-   Builds a recursive dependency graph for the entire codebase.
-   Uses OpenAI's API to generate descriptive summaries for each file.
-   Generates a markdown document with a table of contents and detailed descriptions for each file.

## Prerequisites

-   Node.js
-   npm / yarn
-   OpenAI API key

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/onsen-ai/node-doc-llm.git
    cd yourrepository
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
    ```bash
    OPENAI_API_KEY=<your_openai_api_key>
    ```

## Usage

To generate the documentation, run the script with the root JavaScript file of your project:

```bash
node index.js <rootFilePath> [outFile]
```

-   `<rootFilePath>`: The path to the root JavaScript/TypeScript file of your project.
-   `[outFile]` (optional): The output file path for the generated documentation (default: `DOCUMENTATION.md`).

### Example

```bash
node index.js src/index.js DOCUMENTATION.md
```

## Script Details

### Functions

#### `parseFileDependencies(fullPath)`

-   **Description**: Parses a JavaScript file and extracts its dependencies.
-   **Parameters**: `fullPath` - The full path to the JavaScript file to parse.
-   **Returns**: An array of dependencies.

#### `buildDependencyGraphRecursive({ basePath, rootFile })`

-   **Description**: Recursively builds a dependency graph starting from the root file.
-   **Parameters**:
    -   `basePath`: The directory to resolve paths relative to.
    -   `rootFile`: The root JavaScript file to start from.
-   **Returns**: An object representing the dependency graph.

#### `getAiDescription(fullPath, dependencies, level, relativePath)`

-   **Description**: Uses OpenAI's API to generate a descriptive summary for a file.
-   **Parameters**:
    -   `fullPath`: The full path to the file.
    -   `dependencies`: Descriptions of the dependencies used in the file.
    -   `level`: The depth level of the file in the dependency graph.
    -   `relativePath`: The relative path to the file.
-   **Returns**: A summary of the file's code and statistics about the API usage.

#### `generateDescriptions(dependencyGraph, basePath, maxGenerations = 1000)`

-   **Description**: Generates descriptions for each file in the dependency graph.
-   **Parameters**:
    -   `dependencyGraph`: The dependency graph of the project.
    -   `basePath`: The base directory of the project.
    -   `maxGenerations`: The maximum number of files to generate descriptions for (default: 1000).
-   **Returns**: An object containing descriptions for each file.

### Environment Variables

-   `OPENAI_API_KEY`: Your OpenAI API key for accessing the GPT model.

## Prompt Details

### How the Prompt Works

The script generates descriptive summaries for each file in the codebase using OpenAI's API. It constructs a prompt with the following structure to guide the AI in creating meaningful and concise descriptions:

1. **System Message**: Establishes the role of the AI as an experienced developer generating README content.
2. **User Message**: Provides the file's code, a list of its dependencies, and guidelines for writing the summary. The user message is structured as follows:
    - **File Information**: Includes the file path and its content.
    - **Dependencies**: Lists descriptions of dependencies used in the file, if any.
    - **Guidelines**: Specifies the format, word limit, and focus for the summary.

### How Dependencies Are Used

Dependencies play a crucial role in creating accurate descriptions. For each file, the script identifies its dependencies and includes their descriptions in the prompt. This helps the AI understand the context and functionality of the file better, leading to more comprehensive summaries. Dependencies are extracted from import and require statements in the code and filtered to include only relevant local files.

### Understanding Dependency Levels

The concept of "level" in the script refers to the depth of a file within the dependency graph:

-   **Level 1**: Files with no dependencies.
-   **Higher Levels**: Files that depend on other files. The level increases with the depth of the dependency chain.

The level of a file determines the word count for the summary. The deeper a file is in the dependency graph, the more context it requires, and therefore, the longer the summary.

### Word Count Calculation

The word count for the summary is dynamically calculated based on the file's level in the dependency graph using the formula:

`words = log10(level) * 400 + 150`

This ensures that more complex files with deeper dependencies receive more detailed descriptions, while simpler files have shorter summaries. This approach balances the detail and length of the documentation, providing sufficient information based on the complexity of each file.

### Model Configuration

By default, the script uses OpenAI's `gpt-4o` model to generate the descriptive summaries. This model is specified in the `getAiDescription` function within the script. If you need to use a different model, such as `gpt-3.5-turbo`, you can change the model name in the script. The relevant section of the code is as follows:

```javascript
const model = 'gpt-4o'; // Default model
// const model = 'gpt-3.5-turbo'; // Uncomment this line to use gpt-3.5-turbo
```

Adjusting the model may impact the quality and cost of the generated descriptions. Be sure to review the token usage and pricing details provided by OpenAI for the chosen model.

## Output

The script generates a markdown file (`DOCUMENTATION.md` by default) with the following structure:

-   **Table of Contents**: Links to sections and files.
-   **Sections**: Grouped by directories.
-   **File Descriptions**: Detailed summaries for each file, including back links to the table of contents and sections.

## Logging

The script logs the following information to the console during execution:

-   Progress of dependency graph building.
-   Generation of descriptions for each file.
-   Cumulative usage statistics and costs for OpenAI API requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or issues, please open an issue on the repository or contact the maintainer.

Happy coding!
