
// get user details 

const getuserData = async (req, res) => {
    try {
        const user = req.user;

        const role = user.role;
        const recentSearchCities = user.recentSearchCities;

        res.json({
            success: true,
            role,
            recentSearchCities 
        });
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    } 
}

// store Resent serached Cities
const storeResentSerachedCities = async (req,res) => {
    try {
        const { recentSearchCity } = req.body;

        if (!recentSearchCity) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }

        const user = req.user;
        const city = recentSearchCity.toLowerCase();
        // Remove duplicate if already exists
        user.recentSearchCities = user.recentSearchCities.filter(
            (city) => city !== recentSearchCity
        );

        if(user.recentSearchCities.length < 3){
            user.recentSearchCities.push(city);
        }
        else{
            user.recentSearchCities.shift();
            user.recentSearchCities.push(city);
        }
        await user.save();
        res.json({
            success: true,
            message: "City Added"
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}
export { getuserData , storeResentSerachedCities};