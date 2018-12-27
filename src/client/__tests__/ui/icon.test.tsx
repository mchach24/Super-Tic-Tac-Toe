
import { shallow }          from 'enzyme';
import { StandardColor }            from 'lib/globals/colors';
import * as React           from 'react';
import { Icon }             from 'ui/Icon/Icon';
import { Icons }            from 'ui/icon/icons';

describe('Icon', () => {

    it('has base class', () => {
        const component = shallow(<Icon icon={Icons.ArrowDown} />);

        expect(component.hasClass('icon')).toBeTruthy();
    });

    it('applies arbitrary class', () => {
        const className = 'test-class';
        const component = shallow(<Icon className={ className } icon={ Icons.ArrowDown } />);

        expect(component.hasClass(className)).toBeTruthy();
    });

    it('renders svg', () => {
        const component = shallow(<Icon icon={ Icons.ArrowDown } />);

        expect(component.is('svg')).toBeTruthy();
    });

    it('contains color class', () => {
        const color = StandardColor.Gray;
        const component = shallow(<Icon color={ color } icon={ Icons.ArrowDown }/>);

        expect(component.hasClass(`color-${color}`)).toBeTruthy();
    });
});
