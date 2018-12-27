
import { shallow }          from 'enzyme';
import * as React           from 'react';
import { Billboard }        from 'ui/billboard/billboard';

describe('Billboard', () => {

    it('has base class', () => {
        const component = shallow(<Billboard></Billboard>);

        expect(component.hasClass('billboard')).toBeTruthy();
    });

    it('applies arbitrary class', () => {
        const className = 'test-class';
        const component = shallow(<Billboard className={ className }></Billboard>);

        expect(component.hasClass(className)).toBeTruthy();
    });

    it('renders header', () => {
        const header = "a header";
        const component = shallow(
            <Billboard header={ header }></Billboard>,
        );

        expect(component).toContain(<h1>{ header }</h1>);
    });

    it('renders children', () => {
        const children = (<p>Toddler</p>);
        const component = shallow(
            <Billboard>{ children }</Billboard>,
        );

        expect(component).toContain(children);
    });
});
