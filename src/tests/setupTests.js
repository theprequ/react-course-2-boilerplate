import DotEnv from "dotenv"; // S15 L155
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
    adapter: new Adapter()
});

DotEnv.config({ path: ".env.test" }); // S15 L155