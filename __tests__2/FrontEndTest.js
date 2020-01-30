import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import App from '../client/App.jsx';


configure({ adapter: new Adapter() });

// shallow wrapper for testing
// mount to inspect its behavior
describe('Testing App Page', ()=> {
    describe('Testing App Component', () => {
        let wrapper;
        const state = {
            name : "test",
            login : "test1",
            followers : 2
        };

        beforeAll(() => {
            wrapper = shallow(<App {...state} />);
        })

        it('Check to see if App renders Div', () => {
            wrapper = shallow(<App/>);
            expect(wrapper.type()).toEqual("div")
        });

        it('Check to see if Apps user profile div has a img', () => {
            wrapper = shallow(<App/>);
            expect(wrapper.find('div').at(2).find('img').type()).toEqual("img")
        });

        it('Check to see if Apps user profile div have 3 p tags', () => {
            wrapper = shallow(<App/>);
            expect(wrapper.find('div').at(3).find('div')).toHaveLength(3)
        });

        it('Check to see if Apps user profile div third p tag is for followers', () => {
            expect(wrapper.find('div')
                    .at(3)
                    .find('div')
                    .find('p')
                    .at(2)
                    .shallow()
                    .text()
                    .includes('Followers:'))
                    .toEqual(true)
        });

        it('Check to see if Apps has two buttons', () => {
            wrapper = shallow(<App/>);
            expect(wrapper.find('div').at(5).find("button").at(0).type()).toEqual("button")
            expect(wrapper.find('div').at(5).find("button").at(1).type()).toEqual("button")
        });
    })
});

describe('Test feed page', ()=> {
    describe('Testing App Component', () => {
        let wrapper;
        const props = {
          userInfo : {
              
          }
        }
    })
})