import axios from "axios";

class ReminderService {
    http = axios.create({ baseURL: "http://localhost:3000/" });
}