import React from "react";
import { shallow, mount } from "enzyme";

import OptionsBox from './OptionsBox';

describe("OptionsBox tests", () => {
    const boxOption = "audit";
    const title = "Audit Organization";
    const data = [{name: "Naboo", enabled: true}, {name: "Tatooine", enabled: false}, {name: "Endor", enabled: true}];
    const handler = (admin, clickedList) => {return true};
    const clear=false;

    it("Should render OptionsBox", () => {
        const wrapper = shallow(<OptionsBox boxOption={boxOption} title={title} data={data} handler={handler} clear={clear} />);

        // console.log(wrapper.debug());
        
        expect(wrapper.exists('#audit_panel_body')).toEqual(true);
        expect(wrapper.find("Option")).toHaveLength(data.length);
    });

    it("Should render OptionsBox and Options", () => {
        const wrapper = mount(<OptionsBox boxOption={boxOption} title={title} data={data} handler={handler} clear={clear} />);
        
        // console.log(wrapper.debug());
        
        data.forEach((element, index) => {
            expect(wrapper.find("[data-test='option-button']").at(index).instance().value).toEqual(element.name);
        });
    });
})