import { Router, Request, Response } from 'express';
import teamService from '../services/teamService';
import { asyncHandler } from '../utils/errorHandler';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/problem-statements
 * Get all problem statements with availability status
 */
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const problemStatements = await teamService.getAllProblemStatements();

    res.json({
      success: true,
      message: 'Problem statements retrieved successfully',
      data: problemStatements,
    });
  })
);

export default router;
