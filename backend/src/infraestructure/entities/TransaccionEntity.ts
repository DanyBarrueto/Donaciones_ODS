import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "transaccion" })
export class TransaccionEntity {
  @PrimaryGeneratedColumn()
  id_transaccion!: number;

  @Column({ type: "numeric" })
  monto!: number;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "int", default: 1 })
  estado!: number;

  @Column({ type: "timestamptz" })
  fecha!: Date;
}
