"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var react_router_dom_1 = require("react-router-dom");
var app_1 = __importDefault(require("./app"));
describe('App', function () {
    it('should render successfully', function () {
        var baseElement = (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <app_1.default />
      </react_router_dom_1.BrowserRouter>).baseElement;
        expect(baseElement).toBeTruthy();
    });
    it('should have a greeting as the title', function () {
        var getAllByText = (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <app_1.default />
      </react_router_dom_1.BrowserRouter>).getAllByText;
        expect(getAllByText(new RegExp('Welcome bucket-of-dice-react', 'gi')).length > 0).toBeTruthy();
    });
});
