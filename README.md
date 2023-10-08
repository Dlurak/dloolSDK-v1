# Dlool

## A digital and colloborative homework book

### What is Dlool?

Dlool is the digital version of a homework book. And it is collaborative.
Classical homework books have a lot of problems, also a lot of people use tablets in school and don't have any folders but still an analog homework book. With Dlool there is a good solution to this problem. There are even more problems here is a table with some problems:

| Problem                                    | Solution                                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Everyone in a class writes down the same   | Dlool is collaborative, all entries from one class are available for everyone                                               |
| They are not very good for the environment | Dlool is digital, no paper is needed.                                                                                       |
| They are not very practical                | Dlool is available on all devices.                                                                                          |
| Entries are not very structured            | Dlool has a structured entry system.                                                                                        |
| When you lose your homework book           | Dlool is digital, you can't lose it.                                                                                        |
| Every year you need a new homework book    | Dlool can be used for multiple years.                                                                                       |
| You are locked into a specific brand       | Dlool is free and open source. With dlool you can export your data to ical or todo.txt.                                     |
| Homework, tests and notes are not separate | Dlool has a different system for homework, tests and notes. Everything is sperated but still in one place and easy to find. |

### SDK

This is the new Dlool SDK for JavaScript and TypeScript. As it is still very early you may encounter some bugs, not all features are implemented and the documentation is not complete. If you find a bug or have a feature request please open an issue.
Also note that the SDK isn't stable yet and may change in the future.

### Usage

1. Install the SDK with `npm install dlool-sdk` or `yarn add dlool-sdk`
2. Import the SDK with `import { Dlool } from "dlool-sdk";`
3. Create a new Dlool instance like this:
    ```js
    const dlool = new Dlool({
        baseUrl: 'https://dlool-backend.onrender.com',
    });
    const homework = await dlool.homework.getAllHomework({
        class: '1a',
        school: 'Hogwarts',
    });
    ```

### Documentation

I plan to document the SDK with GitHub Wiki. But as it is still very early there is no documentation yet.
