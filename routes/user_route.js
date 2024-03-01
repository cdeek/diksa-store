import express from 'express';
//import bcrypt from 'bcrypt'; the package is'nt install
import validator from 'validator';
import jwt from 'jsonwebtoken';
import User from './models/users_model.js';

const router = express.Router();

// jwt
const createToken = (_id) => {
  return jwt.sign({ _id }, 'dadauntsisbromebrobrosisbrobrosisbaga', { expiresIn: '7d' })
};

///////////////////////////////////////////////////


// login
router.post('/login', async (req, res) => {
  const {
    email, password
  } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'all field must be filled' })
  } 
  try {
    const user = await User.findOne({email});
    if (!user) {
      throw Error('email does not exist')
    }

    // const matchPassword = bcrypt.compare(password, user.password)

    // if (!user.password) {
    //   throw Error('incorrect password')
    // }
    const hash = btoa(password);

    if (user.password !== hash) {
      throw Error('incorrect password')
    }
    // create token
    
    const token = createToken(user._id);
    res.status(200).json({name: user.name, token});
  }catch(error) {res.status(401).json({error: error.message})}
});


///////////////////////////////////////////////////////


// signup
router.post('/signup', async (req, res) => {
  const {
    name,
    country,
    email,
    password
  } = req.body;

  const errors = [];
  // validator
  if (!validator.isEmail(email)) {
    errors.push('Input a valid email');
  }
  if (!validator.isStrongPassword(password)) {
    errors.push('Password is not strong enough');
  }

  if (errors.length > 0) {
     res.status(400).json({
      errors
    });
    return;
  }

  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({
        errors: 'Email already exists'
      });
    }

    // hashing password
    //const salt = bcrypt.genSalt(10)
    //const hashedPassword = bcrypt.hash(password, salt)
    // the password will be password: hash
    const hashedPassword = btoa(password)
    const userEmail = email.toLowerCase();
    const user = await User.create({
      name,
      email: userEmail,
      password: hashedPassword
    });

    const token = await createToken(user._id);

    res.status(200).json({
      name,
      token
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err
    });
  }
});


export default router;