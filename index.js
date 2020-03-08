const core = require('@actions/core');
const github = require('@actions/github');

const validEvent = ["pull_request"];

function validateTitlePrefix(body, regexString) {
    const regex = new RegExp(regexString);
    return regex.test(body);
}

async function exec() {
    try {
        const eventName = github.context.eventName;
        core.info(`Event name: ${eventName}`);
        if (validEvent.indexOf(eventName) < 0) {
            core.setFailed(`Invalid event: ${eventName}`);
            return;
        }

        const title = github.context.payload.pull_request.body;
        core.info(`Pull Request title: "${body}"`);

        const regexElements = core.getInput("regex_checks");
        core.info(`Regex check: ${regexElements}`);
        if (regexElements.length > 0 &&
            !regexElements.split(",").every(el => testRegex(body, el))) {
            core.setFailed(
                `Pull Request body did not match one of the regex rules - ${regexElements}`
            );
            return;
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

exec();