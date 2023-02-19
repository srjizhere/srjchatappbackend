const express = require('express');
const { accessChat, fetchchats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatcontroller');
const { protect } = require('../middelware/authmiddelware');
const router = express.Router();

router.route("/").post(protect,accessChat)
router.route("/").get(protect,fetchchats)
router.route("/group").post(protect,createGroupChat)
router.route("/rename").put(protect,renameGroup)
router.route("/groupadd").put(protect,addToGroup)
router.route("/groupremove").put(protect,removeFromGroup)


module.exports = router
