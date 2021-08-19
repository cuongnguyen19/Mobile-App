//File for the managing of the countries within the app
export default class CountryManager {
    static myInstance = null;
    //Country value for each one in the countries
    countryValue = "";

    //List of countries
    countries = [
        {label: "Australia", value:1, image: require("../assets/Australia-Flag-Icon.jpg")},
        {label: "America", value:2, image: require("../assets/America-Flag-Icon.jpg")},
        {label: "England", value:3, image: require("../assets/England-Flag-Icon.jpg")},
    ];

    //Get an instance of countries
    static getInstance() {
        if(CountryManager.myInstance == null) {
            CountryManager.myInstance = new CountryManager();
        }
        return this.myInstance;
    }

    //Get all the countries
    getAllCountries() {
        return this.countries;
    }

    //Get the country value for any specified one
    getCountryValue() {
        return this.countryValue;
    }

    //Set a country value for any specified one
    setCountryValue({value}) {
        this.countryValue = value;
    }
}