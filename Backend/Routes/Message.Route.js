import express from 'express';
import { getMessagesForSideBar, getMessages, markMessageAsSeen, sendMessage } from '../Controllers/Message.Controller.js';
import { proctedRoute } from '../Middleware/Auth.Middleware.js';

const router = express.Router();

router.get('/Users', proctedRoute, getMessagesForSideBar);
router.get('/:id', proctedRoute, getMessages);
router.put('/mark/:id', proctedRoute, markMessageAsSeen);
router.post('/send/:id', proctedRoute, sendMessage);

export default router;
