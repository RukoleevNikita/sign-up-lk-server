import { getSpecialization } from '../utils/index.js';
import { Request, Response } from 'express';

export const getListServices = async (req: Request, res: Response) => {
  try {
    const objParams = req.query.params.split(',').map((el: number) => getSpecialization(Number(el)));
    res.status(200).json({
      msg: objParams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error,
    });
  }
};
