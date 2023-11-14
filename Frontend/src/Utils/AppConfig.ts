class AppConfig {
    public vacationUrl = "http://localhost:4000/api/vacations/";
    public vacationById = "http://localhost:4000/api/vacation-by-id/";
    public userUrl = "http://localhost:4000/api/user/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public followingUrl = "http://localhost:4000/api/following/";
    public vacationImageUrl = "http://localhost:4000/api/image-by-name/"

}

const appConfig = new AppConfig();

export default appConfig;
