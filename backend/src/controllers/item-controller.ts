import { AppDataSource } from "../data-source";
import { Item } from "../entity/Item";
import { Controller } from "./base-controller";

export class ItemController extends Controller {
    repository = AppDataSource.getRepository(Item);

    getAll = async (req, res) => {
        try {
            const prouduct = await this.repository.find({
                relations: { member: true }
            });
            res.json(prouduct);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getFree = async (req, res) => {
        try {
            const prouduct = await this.repository.find({
                where: { status: 'Szabad' },
                relations: { member: true }
            });
            res.json(prouduct);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getOne = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOne({
                where: { id: entityId},
                relations: { member: true }
            });
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
                return
            }
            res.json(entity);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}