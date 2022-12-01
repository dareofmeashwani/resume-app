import {readFile} from "fs";
import {User} from '../models/userModel';
import {ROLES} from "../utils/constants";
import {join} from "path";
export default function () {
    return new Promise((resolve, reject) => {
        readFile(join(__dirname, "admin.json"), "utf8", (err, jsonString) => {
            if (err) {
                return;
            }
            const json = JSON.parse(jsonString)as any;
            Promise.all(json.map(async (admin : any) => {
                const emailTaken = await((User as any).emailTaken(admin.email));
                if (emailTaken) {
                    await User.deleteOne({email: admin.email});
                }
                const user = new User({
                    ...admin,
                    role: ROLES.ADMIN
                });
                return user.save();
            })).then(resolve, reject);
        });
    });
}
