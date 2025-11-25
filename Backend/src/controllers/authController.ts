import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const register = async (req: Request, res: Response) => {
  await body('username').isLength({ min: 3 }).run(req)
  await body('email').isEmail().normalizeEmail().run(req)
  await body('password').isLength({ min: 6 }).run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { username, email, password } = req.body as {
      username: string
      email: string
      password: string
    }

    // check existing
    const existing = await User.findOne({ $or: [{ email }, { username }] }).lean()
    if (existing) {
      return res.status(409).json({ message: 'User with that email or username already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({ username, email, password: hash })
    await user.save()

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
    const token = jwt.sign({ id: user._id.toString(), email: user.email, role: user.role }, jwtSecret, {
      expiresIn: '7d',
    })

    const out = { id: user._id, username: user.username, email: user.email, role: user.role }
    return res.status(201).json({ user: out, token })
  } catch (err) {
    console.error('register error', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  await body('email').isEmail().run(req)
  await body('password').isLength({ min: 1 }).run(req)

  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const { email, password } = req.body as { email: string; password: string }
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: 'Invalid credentials' })

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'
    const token = jwt.sign({ id: user._id.toString(), email: user.email, role: user.role }, jwtSecret, {
      expiresIn: '7d',
    })

    const out = { id: user._id, username: user.username, email: user.email, role: user.role }
    return res.json({ user: out, token })
  } catch (err) {
    console.error('login error', err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export default { register, login }
