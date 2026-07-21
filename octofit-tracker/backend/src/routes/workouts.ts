import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout', error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Error creating workout', error });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workout', error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.json({ message: 'Workout deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error });
  }
});

export default router;
