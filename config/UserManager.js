//File for the managing of the user information within the app
export default class UserManager {
    static myInstance = null;
    //UserID for each user in the app
    userID = "";

    //List of all users
    users = [
        {
          id: 1,
          name:"Male",
          email: "m@gmail.com",
          password: "1234",
          image: require('../assets/Male-Icon.jpg'),
        },
        {
          id: 2,
          name:"Female",
          email: "fm@gmail.com",
          password: "5678",
          image: require('../assets/Female-Icon.png'),
        },
    ];
    
    //Get an instance of users in the app
    static getInstance() {
        if(UserManager.myInstance == null) {
            UserManager.myInstance = new UserManager();
        }
        return this.myInstance;
    }

    //Get all users in the app
    getAllUsers() {
        return this.users;
    }

    //Get the userid for any specified one
    getUserID() {
        return this.userID;
    }

    //Set the userid for any specified one
    setUserID(id) {
        this.userID = id;
    }

    //Add a new user to a list of existing ones
    addUser(user) {
        this.users.push(user);
    }
}