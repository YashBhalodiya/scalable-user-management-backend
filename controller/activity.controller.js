const { getUserActivities } = require("../services/activity.service");

// GET /activities
// If user is admin, allow fetching activities for any query param `userId`, else fetch for req.user
const getActivitiesController = async (req, res) => {
  try {
    const { page = 1, limit = 10, userId } = req.query;
    
    // Determine target user
    let targetUserId = req.user.id; // from auth middleware
    if (req.user.role === 'admin' && userId) {
      targetUserId = userId;
    }

    const data = await getUserActivities(targetUserId, page, limit);

    return res.status(200).json({
      status: "Success",
      message: "Activities fetched successfully",
      data: data.activities,
      pagination: {
        totalRecords: data.totalCount,
        totalPages: data.totalPages,
        currentPage: data.currentPage
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch activities" });
  }
};

module.exports = {
  getActivitiesController
};
