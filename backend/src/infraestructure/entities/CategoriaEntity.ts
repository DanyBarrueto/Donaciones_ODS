import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "categoria" })
export class CategoriaEntity {
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "int", default: 1 })
  estado!: number;
}
