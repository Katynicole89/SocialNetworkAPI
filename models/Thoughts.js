//Moment used for date formatting
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionsSchema = new Schema(
  {
  reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxlength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      //Using Moment for dates
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  }
  },
  {
  toJSON: {
      getters: true
  } 
  }
);

const ThoughtsSchema = new Schema(
    {
      thoughtText: {
        type: String, 
        required: true,
        minlength: 1, 
        maxlength: 280 
       },
     createdAt: {
         type: Date, 
         default: Date.now,
         get: (createdAtVal) => moment(createdAtVal).format('MMM D, YYYY [at] hh:m A') 
     },
     username: {
         type: String, 
         required: true, 
         ref: 'User'
     },
     reactions: [ReactionsSchema]
  },
  { 
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
    );
  
  
  
  ThoughtsSchema.virtual('reactioncount').get(function() {
    return this.reactions.length;
  });
  
  const Thoughts = model('Thoughts', UserSchema);
  
  module.exports = Thoughts;