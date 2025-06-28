"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scenarios = exports.config = void 0;
exports.config = {
    target: 'https://www.artillery.io',
    engines: {
        playwright: {}
    }
};
exports.scenarios = [{
        engine: 'playwright',
        testFunction: helloWorld
    }];
async function helloWorld(page) {
    await page.goto('http://localhost:3000');
}
//# sourceMappingURL=index.js.map