// Import all necessary react and testing components
import React from "react";
import renderer from "react-test-renderer";
import {render, fireEvent, act} from "@testing-library/react-native";
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

// Import all necessary files and custom components
import AppButton from "./app/components/AppButton";
import AppCard from "./app/components/AppCard";
import AppIcon from "./app/components/AppIcon";
import AppListItem from "./app/components/AppListItem";
import AppPicker from "./app/components/AppPicker";
import AppPickerItem from "./app/components/AppPickerItem";
import AppScreen from "./app/components/AppScreen";
import AppText from "./app/components/AppText";
import AppTextInput from "./app/components/AppTextInput";
import SigninScreen from "./app/screens/SigninScreen";
import App from "./App";

// Configure the adapter and mock the animation for testing
configure({adapter: new Adapter()});
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

// Test the 'changed' status of every component
describe("<AppButton />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppCard />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppCard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppIcon />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppIcon />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppListItem />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppListItem />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppPicker />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppPicker />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppPickerItem />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppPickerItem />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppScreen />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppText />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppText />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
describe("<AppTextInput />", () => {
    test('renders unchanged', () => {
        const tree = renderer.create(<AppTextInput />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

// Test that the app runs without crash or errors
describe("<App />", () => {
    test('renders without crash', () => {
        const snap = shallow(<App />);
        expect(snap).toMatchSnapshot();
    });
});

// Test the signin function with valid or right input credentials
describe("SigninScreen />", () => {
    test('input fields render correctly and navigation works with valid or right inputs', async() => {
        const onSubmit = jest.fn();
        const navigate = jest.fn();
        const {getByPlaceholderText, getByTestId} = render(<SigninScreen onClick = {onSubmit} navigation = {{navigate}} />);
        const emailInput = getByPlaceholderText('Email Address');
        const passwordInput = getByPlaceholderText('Password');
        const signinButton = getByTestId("signin");

        await act(async() => {
        fireEvent.changeText(emailInput, 'm@gmail.com');
        });
        expect(emailInput.props.value).toBe('m@gmail.com');

        await act(async() => {
        fireEvent.changeText(passwordInput, '1234');
        });
        expect(passwordInput.props.value).toBe('1234');

        await act(async() => {
            fireEvent(signinButton, 'press');
        });

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledTimes(1);

    });

    // Test the signin function with invalid or wrong input credentials
    test('input fields render correctly and navigation does not work with invalid or wrong inputs', async() => {
        const onSubmit = jest.fn();
        const navigate = jest.fn();
        const {getByPlaceholderText, getByTestId} = render(<SigninScreen onClick = {onSubmit} navigation = {{navigate}} />);
        const emailInput = getByPlaceholderText('Email Address');
        const passwordInput = getByPlaceholderText('Password');
        const signinButton = getByTestId("signin");

        await act(async() => {
        fireEvent.changeText(emailInput, 'm@gmail');
        });
        expect(emailInput.props.value).toBe('m@gmail');
        
        await act(async() => {
        fireEvent.changeText(passwordInput, '1234');
        });
        expect(passwordInput.props.value).toBe('1234');

        await act(async() => {
            fireEvent(signinButton, 'press');
        });

        expect(onSubmit).toHaveBeenCalledTimes(0);
        expect(navigate).toHaveBeenCalledTimes(0);
    });
});


