import express from 'express'
import { createSong, updateSong, deleteSong, upload } from '../../controllers/admin/songsController.js'
import { authenticate, requireAdmin } from '../../middleware/auth'

const router = express.Router()

router.post('/', authenticate, requireAdmin, upload.single('fileMp3'), createSong)
router.put('/:id', authenticate, requireAdmin, upload.single('fileMp3'), updateSong)
router.delete('/:id', authenticate, requireAdmin, deleteSong)

export default router
