// import { getSpecialization } from '../utils/index';
import { Request, Response } from 'express';

export const getListServices = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    // const objParams = req.query.params.split(',').map((el: number) => getSpecialization(Number(el)));
    const objParams = { };
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
