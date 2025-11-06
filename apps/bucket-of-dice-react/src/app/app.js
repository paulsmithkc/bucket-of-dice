"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = App;
var nx_welcome_1 = __importDefault(require("./nx-welcome"));
var react_router_dom_1 = require("react-router-dom");
function App() {
    return (<div>
      <nx_welcome_1.default title="bucket-of-dice-react"/>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <react_router_dom_1.Link to="/">Home</react_router_dom_1.Link>
          </li>
          <li>
            <react_router_dom_1.Link to="/page-2">Page 2</react_router_dom_1.Link>
          </li>
        </ul>
      </div>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<div>
              This is the generated root route.{' '}
              <react_router_dom_1.Link to="/page-2">Click here for page 2.</react_router_dom_1.Link>
            </div>}/>
        <react_router_dom_1.Route path="/page-2" element={<div>
              <react_router_dom_1.Link to="/">Click here to go back to root page.</react_router_dom_1.Link>
            </div>}/>
      </react_router_dom_1.Routes>
      {/* END: routes */}
    </div>);
}
exports.default = App;
