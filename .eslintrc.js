module.exports = {
    extends: 'airbnb',
    rules: {
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'react/jsx-filename-extension': 0,
        'react/no-danger': 0,
    },
    globals: {
        describe: true,
        document: true,
        expect: true,
        fetch: true,
        it: true,
        window: true,
    },
    parser: 'babel-eslint',
};