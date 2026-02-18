import Comment from "../models/comment.model";

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

export { addComment };
