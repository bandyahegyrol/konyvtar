import { AppDataSource } from "../data-source";
import { Item } from "../entity/Item";
import { Member } from "../entity/Member";
import { Controller } from "./base-controller";

export class MemberController extends Controller {
    repository = AppDataSource.getRepository(Member);

    delete = async (req, res) => {
        const entityId = req.params.id;

        try {
            const entity = await this.repository.findOneBy({ id: entityId });
            if (!entity) {
                res.status(404).json({ message: 'Nem található' });
                return
            }

            entity.deleted = true
            await this.repository.save(entity);
            res.status(200).json({ message: 'Törölve'})
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    getAll = async (req, res) => {
        try {
            const prouduct = await this.repository.find({
                where: { deleted: false },
                relations: { items: true }
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
                relations: { items: true }
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

    update = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            const existingEntity = await this.repository.findOneBy({ id: entity.id });
            if (!existingEntity) {
                res.status(404).json({ message: 'Nem található' });
                return
            }

            const items = entity.items;
            for(let item of existingEntity.items) {
                if(items.filter(item2 => item2.id == item.id).length == 0)
                    items.push(item)
            }

            const tmp = Object.assign(existingEntity, entity)
            tmp.items = items

            await this.repository.save(tmp);
            const entityU = await this.repository.findOne({
                where: { id: entity.id},
                relations: { items: true }
            });
            res.json(entityU);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}