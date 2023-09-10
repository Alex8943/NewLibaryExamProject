import { Router} from "express";
import express from "express";
import CreateReminderDto from "../Dtos/CreateReminderDto";
const router = Router(); 

router.use(express.json());


export class Reminder {
    id: number;
    isCompolete: boolean;

    constructor(public title: string) {
        this.id = Date.now();
        this.isCompolete = false;
    }
}

const reminders: Reminder[] = [];

router.get("/", (req, res) => {
    res.send(reminders);
});
  
router.post("/", (req, res) => {
    const { title } = req.body as CreateReminderDto;
    res.json(title);
});

router.post("/", (req, res) => {
    
    const { title } = req.body as CreateReminderDto;
    const reminder = new Reminder(title);
    reminders.push(reminder);
    res.status(201).send(reminder);

});

export default router;
