import User from '../model/User.js'


export const getUsers = async (req,res,next) =>{
    const query = req.query.new;
    try {
        const users = query
        ? await User.find().sort({ _id: -1 }).limit(5).populate([{
            path: 'products', select: 'title'
        }]).exec()
        : await User.find().populate([{
            path: 'products', select: 'title'
        }]).exec();
        res.status(200).json(users);
    } catch (error) {
        next(error)

    }   
}

export const getSingleUser = async (req,res,next) =>{
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)

    } catch (error) {
        next(error)
    }
}