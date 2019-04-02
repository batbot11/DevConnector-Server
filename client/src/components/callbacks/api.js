import axios from "axios";

export default {
    user: {
        register: (userData) => axios.post("/api/users/register", userData)
        .then((res) => res.newUser)
    }
}