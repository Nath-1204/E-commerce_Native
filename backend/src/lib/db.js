import mongoose from "mongoose";

export const connectDB = async () => {

  try {
    await mongoose.connect(`mongodb+srv://mamynatacha19:rH7keH0C2XZiK7HJ@cluster0.v1nnnlw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log(`Database connected `);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1); 
  }

};
