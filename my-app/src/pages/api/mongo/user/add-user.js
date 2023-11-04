import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/server/mailService';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { firstName, lastName, email, role, password, orgId } =
        await req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectDB();
      await User.create({
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
        orgId,
      });
    }
    let emailMessage =
      'The following user was added to the system.<br/><ul><li> name:' +
      lastName +
      ',' +
      firstName +
      '</li><li>email:' +
      email +
      '</li><li>role:' +
      role +
      '</li> <br/><hr/> Thank you and have a nice day.';

    await sendEmail('A New User Added', email, emailMessage);
    res.status(200).json({ msg: 'User added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to add user to database.' });
  }
}
