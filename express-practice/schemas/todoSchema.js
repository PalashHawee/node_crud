const mongoose = require('mongoose');

const todoSchema =  mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:String,
    status:{
        type: String,
        enum: ['active','inactive']
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

//intance custom methods
todoSchema.methods={
    findActive:function(){
        return mongoose.model('Todo').find({status: 'inactive'})
    }
}

//static methods
todoSchema.statics={
    findByJs:function(){
        return this.find({title:/js/i})
    }
}

// query helper methods
todoSchema.query={
    byLanguage:function(language){
        return this.find({title: new RegExp(language,'i')})
    }
}

module.exports=todoSchema;