import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

it("renders without crashing", () => {
  shallow(<Header />);
});

it("renders Header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
