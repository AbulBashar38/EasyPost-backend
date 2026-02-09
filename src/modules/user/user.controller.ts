import { Response } from "express";
import { AuthRequest } from "../../middleware/checkLogin";
import User from "../../models/User";

export const getLoginUserInfo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User info", user: user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const updateLoginUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { firstName, lastName } = req.body as any;

    const payload: any = {};
    if (typeof firstName === "string") payload.firstName = firstName;
    if (typeof lastName === "string") payload.lastName = lastName;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: payload },
      { new: true },
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
