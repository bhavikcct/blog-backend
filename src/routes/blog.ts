import { Router } from "express";
import { BlogController } from "../controller/blog";
import { upload } from "../middlewares/multer";
import { validateApiKey } from "../middlewares/apikey";

const router = Router();
const blogController = new BlogController();

router.post(
  "/",
  validateApiKey,
  upload.array("images", 5),
  blogController.createBlogHandler
);

router.get("/", blogController.getAll);
router.get("/:id", blogController.getOne);

router.put(
  "/:id",
  validateApiKey,
  upload.array("images", 5),

  blogController.updateBlogHandler
);

router.delete("/:id", validateApiKey, blogController.delete);

export default router;
