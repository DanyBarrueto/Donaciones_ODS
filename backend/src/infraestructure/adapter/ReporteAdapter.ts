import { Reporte } from "../../domain/Reporte";
import { ReportePort } from "../../domain/ReportePort";
import { ReporteEntity } from "../entities/ReporteEntity";
import { AppDataSource } from "../config/data-base";
import { Repository } from "typeorm";

export class ReporteAdapter implements ReportePort {
    private reporteRepository: Repository<ReporteEntity>;

    constructor() {
        this.reporteRepository = AppDataSource.getRepository(ReporteEntity);
    }

    private toDomain(entity: ReporteEntity): Reporte {
        return {
            id: entity.id_reporte,
            descripcion: entity.descripcion,
            estado: entity.estado,
            fecha: entity.fecha,
        };
    }

    private toEntity(reporte: Omit<Reporte, "id">): ReporteEntity {
        const entity = new ReporteEntity();
        entity.descripcion = reporte.descripcion!;
        entity.estado = reporte.estado;
        entity.fecha = reporte.fecha!;
        return entity;
    }

    async createReporte(reporte: Omit<Reporte, "id">): Promise<number> {
        try {
            const newReporte = this.toEntity(reporte);
            const saved = await this.reporteRepository.save(newReporte);
            return saved.id_reporte;
        } catch (error) {
            console.error("Error al crear reporte", error);
            throw new Error("Error al crear reporte");
        }
    }

    async getReporteById(id: number): Promise<Reporte | null> {
        try {
            const entity = await this.reporteRepository.findOne({ where: { id_reporte: id } });
            return entity ? this.toDomain(entity) : null;
        } catch (error) {
            console.error("Error al obtener reporte por id", error);
            throw new Error("Error al obtener reporte por id");
        }
    }

    async getAllReportes(): Promise<Reporte[]> {
        try {
            const entities = await this.reporteRepository.find();
            return entities.map(entity => this.toDomain(entity));
        } catch (error) {
            console.error("Error al obtener todos los reportes", error);
            throw new Error("Error al obtener todos los reportes");
        }
    }

    async updateReporte(id: number, reporte: Partial<Reporte>): Promise<boolean> {
        try {
            const existing = await this.reporteRepository.findOne({ where: { id_reporte: id } });
            if (!existing) {
                throw new Error("Reporte no encontrado");
            }
            existing.descripcion = reporte.descripcion ?? existing.descripcion;
            existing.estado = reporte.estado ?? existing.estado;
            existing.fecha = reporte.fecha ?? existing.fecha;
            await this.reporteRepository.save(existing);
            return true;
        } catch (error) {
            console.error("Error al actualizar reporte", error);
            throw new Error("Error al actualizar reporte");
        }
    }

    async deleteReporte(id: number): Promise<boolean> {
        try {
            const existing = await this.reporteRepository.findOne({ where: { id_reporte: id } });
            if (!existing) {
                throw new Error("Reporte no encontrado");
            }
            existing.estado = 0;
            await this.reporteRepository.save(existing);
            return true;
        } catch (error) {
            console.error("Error al eliminar reporte", error);
            throw new Error("Error al eliminar reporte");
        }
    }
}