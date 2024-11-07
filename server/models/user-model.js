const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // confirmPassword: {type: String, required: true},
});

userSchema.pre("save", async function(next) {
    const user = this;
  
    console.log('Password before hashing:', user.password);
  
    if (!user.isModified("password")) {
      next();
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
      // user.confirmPassword = hash_password;
      
      console.log('Password after hashing:', user.password);
      // console.log('Password after hashing:', user.confirmPassword);
    } catch (error) {
      next(error);
    }
  });
  

 userSchema.methods.generateToken = async function() {
    // const token = jwt.sign({userId: this._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h' });
    // return token;
    // res.cookie("jwttoken", token, {
    //   expiresIn:'30days',
    //   httpOnly: true,
    // })
    try {
      return jwt.sign({userId: this._id.toString(),email: this.email}, process.env.JWT_SECRET, { expiresIn: '30d'});
    } catch (error) {
      console.log(error);
    }
  };
  

  userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (error) {
      throw error;
    }
  };

const User=new model("User", userSchema);
module.exports=User;