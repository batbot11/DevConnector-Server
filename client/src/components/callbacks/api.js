import axios from "axios";

export default {
    user: {
        register: (userData) => axios.post("/api/users/register", userData)
        .then((res) => res.newUser),

        login: (loginData) => axios.post("/api/users/login", loginData).then(res => res.data)
    }
}