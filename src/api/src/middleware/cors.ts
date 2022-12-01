import cors from 'cors';
export default cors({
    origin: "http://localhost:3000",
    methods: [
        "POST",
        "PUT",
        "GET",
        "OPTIONS",
        "HEAD"
    ],
    credentials: true
})
