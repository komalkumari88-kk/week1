const bccrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/User');
const JWT_SECRET ='your_jwt_secret';
 
const signup = async (req, res) => {
    try {
        const {email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json ({ message: 'Email and password are required' });
            }
            if (await user.findone({ email })){
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedpassword = await bccrypt.hash(password, 10);
            const user = new user({ email, password: hashedpassword });
            await user.save();

            res.status(201).json({ message: "User created" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
    }

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
    if (!email || !password) {
         return res.status(400).json({ message:'Email and password are required'});
         }

        const user = await  user.findone({ email });

        if (!user || !(await bccrypt.compare(password, user.password)))
            {
                 return res.status(400).json({ message :'Invalid credentials' });
            }
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    };
    module.exports = { signup, signin };

 
    