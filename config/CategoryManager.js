//File for the managing of the categories (kinds of places, such as restaurant, museum, etc.) within the app
export default class CategoryManager {
    static myInstance = null;
    //Category value for each one in the categories
    categoryValue = "";

    //List of categories
    categories = [
        {label: "Restaurant", value:1, icon:"silverware-fork-knife", backgroundColor:"red"},
        {label: "Museum", value:2, icon:"bank", backgroundColor:"blue"},
        {label: "Hotel", value:3,icon:"bed", backgroundColor:"brown"},
        {label: "Park", value:4,icon:"nature", backgroundColor:"green"},
        {label: "Library", value:5,icon:"library", backgroundColor:"gray"},
        {label: "Church", value:6,icon:"church", backgroundColor:"black"},
        {label: "Mall", value:7,icon:"shopping", backgroundColor:"purple"},
        {label: "Market", value:8,icon:"cart", backgroundColor:"pink"},
        {label: "Bar", value:9,icon:"glass-cocktail", backgroundColor:"orange"},
    ];

    //Get an instance of categories
    static getInstance() {
        if(CategoryManager.myInstance == null) {
            CategoryManager.myInstance = new CategoryManager();
        }
        return this.myInstance;
    }

    //Get all the categories
    getAllCategories() {
        return this.categories;
    }

    //Get the category value for any specified one
    getCategoryValue() {
        return this.categoryValue;
    }

    //Set a category value for any specified one
    setCategoryValue({value}) {
        this.categoryValue = value;
    }

    //Add a new category to the list
    addCategory(category) {
        this.categories.push(category);
    }
}