import NumberLottery from "@/modules/numbers/infrastructure/entities/numbers.model";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

mongoose.connect(`${process.env.MONGO_URI}`);

const seedNumbers = async () => {
  try {
    // Primero, elimina cualquier número existente
    await NumberLottery.deleteMany({});

    // Genera y guarda los números de 0000 a 4999
    const numbers = [];
    for (let i = 0; i <= 4999; i++) {
      const number = i.toString().padStart(4, "0"); // Formato con 4 cifras
      numbers.push({ number });
    }

    await NumberLottery.insertMany(numbers);

    console.log("Seed completada con éxito");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error al realizar el seed:", error);
    mongoose.connection.close();
  }
};

seedNumbers();
