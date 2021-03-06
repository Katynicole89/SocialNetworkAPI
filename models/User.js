const { Schema, model} = require('mongoose');

const UserSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    Username: {
      type: String, 
      required: true, 
      unique: true, 
      trim: true
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        trim: true, 
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Please enter a valid email!'
          },
    },
     thoughts: [{
         type: Schema.Types.ObjectId, 
         ref: 'Thought'
     }],
     friends: [{
         type: Schema.Types.ObjectId, 
         ref: 'User'
     }],
},
{ 
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
  );



UserSchema.virtual('friendcount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;