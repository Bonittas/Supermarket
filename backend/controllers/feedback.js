const   Feedback = require("../models/feedback")

const createFeedback= async (req,res)=>{
    const {name,email,message}= req.body;
    try{
        const feedback = await Feedback.create({name,email,message});
        res.status(200).json(feedback)
    }
    catch(error){
        res.status(400).json({error:error})
    }
}

// const updateFeedback = async (req,res)=>{
//     const {id}= req.params;
//     try{
//         const feedback = await Feedback.findOneAndUpdate({_id,id},{
//             ...res.body
// });
//     }
//     catch(error){

//     }
// }

const deleteFeedback= async (req,res)=>{
    const {id}=req.params
    const feedback = await Feedback.findByIdAndDelete(id)
    if(!feedback){
        return res.status(200).json({mssg:"Feedback deleted successfully"})
    }
    res.statu(404).json({mssg:"Feedback not found"}) 
}
const getFeedback= async (req,res) =>{
    try{
    const feedback = await Feedback.find();
    res.json(feedback)
    }
    catch(error){
        res.status(404).json({error:error})

    }
}
module.exports = {getFeedback,createFeedback,deleteFeedback}