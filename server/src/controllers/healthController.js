/**
 * Health check controller
 * Endpoint: GET /api/health
 * Returns standard JSON health status
 */
export const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hostel and PG Finder API is running",
  });
};

