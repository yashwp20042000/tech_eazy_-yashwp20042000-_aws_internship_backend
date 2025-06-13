
import mongoose from 'mongoose';
import logger from './logger';

export const ensureIndexes = async () => {
  try {
    const models = mongoose.modelNames();
    
    for (const modelName of models) {
      const model = mongoose.model(modelName);
      await model.createIndexes();
      logger.info(`Indexes verified for model: ${modelName}`);
    }
  } catch (error) {
    logger.error('Error ensuring indexes:', error);
    throw error;
  }
};

// Run on server startup
export const initializeDatabase = async () => {
  await ensureIndexes();
  // Add other DB initialization logic here
};
