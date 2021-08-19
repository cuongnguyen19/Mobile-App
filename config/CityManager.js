//File for the managing of the cities within the app
export default class CityManager {
    static myInstance = null;
    //City value for each one in the cities
    cityValue = "";

    //List of cities
    cities = [
        {label: "Sydney", value:1, image: require("../assets/Sydney-Icon.jpg"), country: "Australia"},
        {label: "Melbourne", value:2, image: require("../assets/Melbourne-Icon.jpg"), country: "Australia"},
        {label: "Adelaide", value:3, image: require("../assets/Adelaide-Icon.jpg"), country: "Australia"},
        {label: "New York", value:4, image: require("../assets/New-York-Icon.jpg"), country: "America"},
        {label: "Los Angeles", value:5, image: require("../assets/LA-Icon.jpg"), country: "America"},
        {label: "Chicago", value:6, image: require("../assets/Chicago-Icon.jpg"), country: "America"},
        {label: "London", value:7, image: require("../assets/London-Icon.jpg"), country: "England"},
        {label: "Birmingham", value:8, image: require("../assets/Birmingham-Icon.jpg"), country: "England"},
        {label: "Liverpool", value:9, image: require("../assets/Liverpool-Icon.jpg"), country: "England"},
    ];

    //Get an instance of cities
    static getInstance() {
        if(CityManager.myInstance == null) {
            CityManager.myInstance = new CityManager();
        }
        return this.myInstance;
    }

    //Get all the cities
    getAllCities() {
        return this.cities;
    }

    //Get the city value for any specified one
    getCityValue() {
        return this.cityValue;
    }

    //Set a city value for any specified one
    setCityValue({value}) {
        this.cityValue = value;
    }
}