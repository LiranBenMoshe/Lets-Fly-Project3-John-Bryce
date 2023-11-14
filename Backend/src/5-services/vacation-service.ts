import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import UserModel from "../3-models/user-model";
import VacationModel from "../3-models/vacation-model";
import imageHelper from "../2-utils/image-helper";
import appConfig from "../2-utils/app-config";

async function getAllUsers(): Promise<UserModel[]> {
    const sql = "SELECT * FROM users";
    const users = await dal.execute(sql);
    return users;
}

async function getAllVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
        SELECT DISTINCT
            V.*,
            CONCAT('${appConfig.domainName}/api/image-by-name/',V.imageName) as imageName,
            EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
            COUNT(F.userId) AS followersAmount
                FROM vacations as V LEFT JOIN followers as F
                ON V.vacationId = F.vacationId
                GROUP BY vacationId
                ORDER BY startDate
        `;
    const vacations = await dal.execute(sql, [userId]);

    return vacations;
}

// Add vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation:
    vacation.validate();

    // Image saving
    vacation.imageName = await imageHelper.saveImage(vacation.image);

    // create sql
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";

    // Execute sql, get back info object:
    const result: OkPacket = await dal.execute(sql,
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.imageName
    );

    // Extract new id, set it back in the given vacation:
    vacation.vacationId = result.insertId;

    // Return vacation
    return vacation;
}

// Get one vacation:
async function getOneVacation(vacationId: number): Promise<VacationModel[]> {

    // Create query:
    const sql = "SELECT * FROM vacations WHERE vacationId = ?";

    // Execute query:
    const vacations = await dal.execute(sql, [vacationId]);

    // Extract he single vacation:
    const vacation = vacations[0];

    // If vacation not found:
    if (!vacation) throw new ResourceNotFoundError(vacationId);

    // Return data:
    return vacation;
}

// Get one vacation:
async function getOneUser(userId: number): Promise<UserModel[]> {

    // Create query:
    const sql = "SELECT * FROM users WHERE userId = ?";

    // Execute query:
    const users = await dal.execute(sql, [userId]);

    // Extract he single vacation:
    const user = users[0];

    // If vacation not found:
    if (!user) throw new ResourceNotFoundError(userId);

    // Return data:
    return user;
}

// Follow vacation
async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?, ?)";
    await dal.execute(sql, userId, vacationId);
}

// Unfollow vacation
async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);
}

// Update vacation: 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validate:
    vacation.validate();

    // Remove apostrophes from the destination and description fields
    vacation.destination = vacation.destination.replace(/'/g, ''); // Remove all apostrophes
    vacation.description = vacation.description.replace(/'/g, ''); // Remove all apostrophes
    
    let sql = "", imageName = "";
    const oldImage = await getOldImage(vacation.vacationId);

    // If user send image to update: 
    if (vacation.image) {
        imageName = await imageHelper.updateImage(vacation.image, oldImage);
        sql = `UPDATE vacations SET destination = '${vacation.destination}', description = '${vacation.description}',
               startDate = '${vacation.startDate}', endDate = '${vacation.endDate}',
               price = ${vacation.price}, ImageName = '${imageName}' WHERE vacationId = ${vacation.vacationId}`
    }
    else {
        imageName = oldImage;
        sql = `UPDATE vacations SET destination = '${vacation.destination}', description = '${vacation.description}',
               startDate = '${vacation.startDate}', endDate = '${vacation.endDate}',
               price = ${vacation.price} WHERE vacationId = ${vacation.vacationId}`;
    }

    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql);

    // If vacation not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Get image url:
    vacation.imageName = `${appConfig.domainName}/api/vacations/${imageName}`;

    // Remove image from vacation object because we don't response it back:
    delete vacation.image;

    // Return added vacation:
    return vacation;
}

// Delete vacation: 
async function deleteVacation(id: number): Promise<void> {

    // Take old image: 
    const oldImage = await getOldImage(id);

    // Delete that image: 
    await imageHelper.deleteImage(oldImage);

    // Create sql:
    const sql = `DELETE FROM vacations WHERE vacationId = ${id}`;

    // Execute sql, get back info object:
    const info: OkPacket = await dal.execute(sql);

    // If vacation not exist (can also ignore this case):
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
}

// Get image name:
async function getOldImage(id: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE vacationId = ${id}`;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) return null;
    const imageName = vacation.imageName;
    return imageName;
}


export default {
    getAllUsers,
    getOneUser,
    follow,
    unfollow,
    getAllVacations,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
};