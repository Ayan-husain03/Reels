import Comment from "../models/comment.model.js";

// ? Add comment

async function addComment(req, res) {
  try {
    const { foodId } = req.params;
    const userId = req.user?._id;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "text field is required",
      });
    }
    const comment = await Comment.create({
      text,
      user: userId,
      food: foodId,
    });
    return res.status(201).json({
      success: true,
      message: "comment added",
      data: comment,
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "error in adding comment",
      error: error.message,
    });
  }
}

// * getAll comments controller
async function getAllComment(req, res) {
  try {
    const { foodId } = req.params;
    const comments = await Comment.find({ food: foodId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error in fetching comments",
      error: error.message,
    });
  }
}

export { addComment, getAllComment };
