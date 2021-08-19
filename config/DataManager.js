//File for the managing of the user data within the app
export default class DataManager {
    static myInstance = null;
    //UserID value for each one in the user data
    userID = "";

    //List of all the data for each user 
    userData = [
        {
            userid: 1,
            placeid:1,
            title: "Firedoor",
            subtitle: "23-33 Mary St, Surry Hills NSW 2010, Australia",
            image: require('../assets/Firedoor.jpg'),
            category:"Restaurant",
            country:"Australia",
            city:"Sydney",
        },
        {
            userid: 1,
            placeid:2,
            title: "Art Gallery NSW",
            subtitle: "Art Gallery Rd, Sydney NSW 2000, Australia",
            image: require('../assets/Art-GalleryNSW.jpg'),
            category:"Museum",
            country:"Australia",
            city:"Sydney",
        },
        {
            userid: 2,
            placeid:1,
            title: "Park Hyatt Sydney",
            subtitle: "7 Hickson Road, The Rocks, Sydney NSW 2000, Australia",
            image: require('../assets/Park-Hyatt-Sydney.jpg'),
            category:"Hotel",
            country:"Australia",
            city:"Sydney",
        },
    ]
    
    //Get an instance of user data
    static getInstance() {
        if(DataManager.myInstance == null) {
            DataManager.myInstance = new DataManager();
        }
        return this.myInstance;
    }

    //Get the userid for any specified one
    getUserID() {
        return this.userID;
    }

    //Set a userid for any specified one
    setUserID(id) {
        this.userID = id;
    }

    //Get places of a specific user based on the given userid
    getPlaces(id) {
        return this.userData.filter((place) => place.userid === id);
    }

    //Add a new place to a list of existing places of any specified user
    addPlace(place) {
        this.userData.push(place);
    }
}