"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    displayName: 'bucket-of-dice-react',
    preset: '../../jest.preset.js',
    transform: {
        '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
        '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/apps/bucket-of-dice-react',
};
