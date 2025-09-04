import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "auditoria" })
export class AuditoriaEntity {
  @PrimaryGeneratedColumn()
  id_log!: number;


  usuario!: UserEntity;

  @Column({ type: "varchar", length: 100 })
  tabla_afectada!: string;

  @Column({ type: "int" })
  registro_id!: number;

  @Column({ type: "varchar", length: 50 })
  accion!: string;  

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "int", default: 1 })
  estado!: number;

  @Column({ type: "timestamptz" })
  fecha!: Date;
}
