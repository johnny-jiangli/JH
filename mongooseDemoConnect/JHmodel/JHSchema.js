const mongoose = require("mongoose");

const jhBolg = new mongoose.Schema({
    // id:Number,
    title:String,
    subtitle:String,
    body:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

jhBolg.pre('save',function(next){
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next()
});

jhBolg.statics = {
    fetch:function(cb){
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById:function(id,cb){
        return this.findOne({_id:id}).exec(cb);
    }
};

const jh = mongoose.model('jh',jhBolg);

module.exports = jh;


