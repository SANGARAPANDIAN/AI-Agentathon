import { Router, Request, Response } from 'express';
import teamService from '../services/teamService';
import { TeamRegistrationSchema } from '../types';
import { asyncHandler } from '../utils/errorHandler';
import { ApiResponse, TeamRegistrationResponse } from '../types';
import { logger } from '../utils/logger';

const router = Router();

/**
 * POST /api/teams/register
 * Register a new team
 */
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response<ApiResponse<TeamRegistrationResponse>>) => {
    logger.info('Team registration attempt', { body: req.body });

    // Validate request body
    const validatedData = TeamRegistrationSchema.parse(req.body);

    // Register team
    const result = await teamService.registerTeam(validatedData);

    res.status(201).json({
      success: true,
      message: result.message,
      data: result,
    });
  })
);

/**
 * GET /api/teams/:teamId
 * Get team details by ID
 */
router.get(
  '/:teamId',
  asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { teamId } = req.params;

    const team = await teamService.getTeamById(teamId);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.json({
      success: true,
      message: 'Team retrieved successfully',
      data: team,
    });
  })
);

/**
 * POST /api/teams/check-email
 * Check if email is available
 */
router.post(
  '/check-email',
  asyncHandler(async (req: Request, res: Response<ApiResponse>) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    const isAvailable = await teamService.checkEmailAvailability(email);

    res.json({
      success: true,
      message: isAvailable ? 'Email is available' : 'Email is already registered',
      data: { available: isAvailable },
    });
  })
);

export default router;
