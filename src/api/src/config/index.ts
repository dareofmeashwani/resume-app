import { ENV } from "../utils/constants";
import development from "./development";
import production from "./production";
const config = process.env.ENV === ENV.prod ? production : development;
export default {
    ... config,
    PORT: config.PORT || "3000",
    HASH_SALT: config.HASH_SALT || "12"
};
