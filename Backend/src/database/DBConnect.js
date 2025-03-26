import mongoose from "mongoose"

export const DBConnect = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}`)
    
        console.log(`MongoDB connected successfully ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("Can't connected to DataBase",error);
    }
}