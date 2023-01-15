import cors from 'cors';
import config from '../config';
export default cors({
    origin: config.DOMAIN_ADDRESS,
    methods: [
        "POST",
        "PUT",
        "GET",
        "OPTIONS",
        "HEAD",
        "PATCH",
        "DELETE"
    ],
    credentials: true
})
