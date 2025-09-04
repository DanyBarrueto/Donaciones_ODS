import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "reporte" })
export class ReporteEntity {
  @PrimaryGeneratedColumn()
  id_reporte!: number;

  @Column({ type: "character varying" })
  descripcion!: string;

  @Column({ type: "int", default: 1 })
  estado!: number;

  @Column({ type: "timestamptz" })
  fecha!: Date;
}
