import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/server/mailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {firstName, lastName, email, role, password, orgId} = await req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectDB();
      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        orgId: '6541e36d04b6d9f3ddc81ef6', // TODO - remove hard-coded value
        role: 'org_member', // TODO - remove hard-coded value (?)
      });
      const emailMessage =
        `Aloha ${firstName},
        <br/><br/>
        Your CMDR account has been created. Account details:
        <br/>
        <ul>
          <li>Name: <b>${lastName}, ${firstName}</b></li>
          <li>Email: <b>${email}</b></li>
        </ul>
        Mahalo!<br/><br/>
        Center for Marine Debris Research
        <br/><br/>
        <hr/>
        <i>This is an automated message. Please do not reply to this email.</i>`;
      await sendEmail('Account Created', email, emailMessage);
      res.status(200).json({msg: 'User added successfully!'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Unable to add user to database.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
