module.exports = {
    extends: 'airbnb',
    rules: {
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