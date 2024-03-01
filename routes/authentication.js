import jwt from 'jsonwebtoken';
import User from './models/users_model.js';

const useAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }
  
  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, 'dadauntsisbromebrobrosisbrobrosisbaga')

    req.user = await User.findOne({ _id }).select('_id');
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized,login or signup'})
  }
}

export default useAuth;
