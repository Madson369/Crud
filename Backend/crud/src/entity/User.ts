import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Nome: string;

  @Column()
  login: string;

  @Column()
  CPF: string;

  @Column()
  Email: string;

  @Column()
  AgentCode: string;
}
